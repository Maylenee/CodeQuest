// POST /api/dashboard/progress -> catat/mutakhirkan progres (lesson/exercise/quiz).
// Menjadi satu-satunya sumber XP & streak: dashboard & league menghitung dari sini.
import { json, requireDb, ulid, computeStreak, XP_PER } from '../_shared.js';

export const onRequestOptions = () => new Response(null, { status: 204 });

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const lessonId = url.searchParams.get('lessonId');
  const kind = url.searchParams.get('kind') || 'lesson';
  if (!userId || !lessonId) return json({ error: 'userId & lessonId wajib.' }, 400);

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }
  try {
    const { rows } = await db.execute(
      'SELECT status, score, completed_at FROM progress WHERE user_id = ? AND kind = ? AND lesson_id = ?',
      [userId, kind, lessonId]
    );
    return json({ progress: rows[0] || null });
  } catch (err) {
    console.error('[api/dashboard/progress GET]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body JSON tidak valid.' }, 400);
  }

  const { userId, trackId, lessonId, kind = 'lesson', status, score } = body || {};
  if (!userId || !trackId || !lessonId)
    return json({ error: 'userId, trackId, lessonId wajib.' }, 400);
  if (!['lesson', 'exercise', 'quiz'].includes(kind))
    return json({ error: 'kind tidak valid.' }, 400);
  if (!['not_started', 'in_progress', 'completed'].includes(status))
    return json({ error: 'status tidak valid.' }, 400);

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    const { rows: exist } = await db.execute(
      'SELECT status, completed_at FROM progress WHERE user_id = ? AND kind = ? AND lesson_id = ?',
      [userId, kind, lessonId]
    );
    const prev = exist[0];
    const completedAt =
      status === 'completed' ? prev?.completed_at || new Date().toISOString() : null;

    await db.execute(
      `INSERT INTO progress (id, user_id, track_id, lesson_id, kind, status, score, completed_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
       ON CONFLICT(user_id, kind, lesson_id) DO UPDATE SET
         track_id = excluded.track_id,
         status = excluded.status,
         score = excluded.score,
         completed_at = excluded.completed_at,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`,
      [ulid(), userId, trackId, lessonId, kind, status, score ?? null, completedAt]
    );

    // Sinkronkan user_stats dari progres (total_xp, streak, counts).
    const { rows: agg } = await db.execute(
      `SELECT
         COUNT(CASE WHEN kind='lesson'   AND status='completed' THEN 1 END) AS lessons_done,
         COUNT(CASE WHEN kind='exercise' AND status='completed' THEN 1 END) AS exercises_done,
         COUNT(CASE WHEN kind='quiz'     AND status='completed' THEN 1 END) AS quizzes_done
       FROM progress WHERE user_id = ?`,
      [userId]
    );
    const a = agg[0] || {};
    const totalXp =
      Number(a.lessons_done || 0) * XP_PER.lesson +
      Number(a.exercises_done || 0) * XP_PER.exercise +
      Number(a.quizzes_done || 0) * XP_PER.quiz;

    const { rows: dayRows } = await db.execute(
      `SELECT DISTINCT substr(completed_at,1,10) AS day FROM progress
       WHERE user_id = ? AND status='completed' AND completed_at IS NOT NULL`,
      [userId]
    );
    const { current, best } = computeStreak(dayRows.map((d) => d.day));
    const lastActive = dayRows.length
      ? dayRows.map((d) => d.day).sort().pop()
      : null;

    await db.execute(
      `INSERT INTO user_stats (user_id, streak_current, streak_best, total_xp, lessons_done, exercises_done, quizzes_done, last_active_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
       ON CONFLICT(user_id) DO UPDATE SET
         streak_current = excluded.streak_current,
         streak_best = excluded.streak_best,
         total_xp = excluded.total_xp,
         lessons_done = excluded.lessons_done,
         exercises_done = excluded.exercises_done,
         quizzes_done = excluded.quizzes_done,
         last_active_at = excluded.last_active_at,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')`,
      [
        userId,
        current,
        best,
        totalXp,
        Number(a.lessons_done || 0),
        Number(a.exercises_done || 0),
        Number(a.quizzes_done || 0),
        lastActive,
      ]
    );

    return json({
      ok: true,
      status,
      completedAt,
      stats: { totalXp, streakCurrent: current, streakBest: best },
    });
  } catch (err) {
    console.error('[api/dashboard/progress]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
