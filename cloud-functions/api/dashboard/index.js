// GET /api/dashboard?userId=... -> ringkasan stats, streak, dan progres belajar user.
import { json, requireDb, displayName, computeStreak, XP_PER } from './_shared.js';

export const onRequestOptions = () => new Response(null, { status: 204 });

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  if (!userId) return json({ error: 'userId wajib.' }, 400);

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    const [{ rows: users }, { rows: prog }, { rows: certs }, { rows: days }] =
      await Promise.all([
        db.execute(
          'SELECT id, first_name, last_name, full_name, email, avatar_url FROM users WHERE id = ?',
          [userId]
        ),
        db.execute(
          `SELECT
             COUNT(CASE WHEN kind='lesson'   AND status='completed' THEN 1 END) AS lessons_done,
             COUNT(CASE WHEN kind='exercise' AND status='completed' THEN 1 END) AS exercises_done,
             COUNT(CASE WHEN kind='quiz'     AND status='completed' THEN 1 END) AS quizzes_done
           FROM progress WHERE user_id = ?`,
          [userId]
        ),
        db.execute('SELECT COUNT(*) AS certs_done FROM certificates WHERE user_id = ?', [userId]),
        db.execute(
          `SELECT DISTINCT substr(completed_at,1,10) AS day
           FROM progress WHERE user_id = ? AND status='completed' AND completed_at IS NOT NULL`,
          [userId]
        ),
      ]);

    if (!users.length) {
      return json({
        user: null,
        stats: {
          total_xp: 0,
          streak_current: 0,
          streak_best: 0,
          lessons_done: 0,
          exercises_done: 0,
          quizzes_done: 0,
          certs_done: 0,
          challenges_done: 0,
        },
        learning: [],
        streakWeek: Array(7).fill(false),
        counts: { bookmarks: 0, certificates: 0 },
      });
    }

    const user = users[0];
    const p = prog[0] || {};
    const c = certs[0] || { certs_done: 0 };
    const dayList = days.map((d) => d.day);
    const { current: streakCurrent, best: streakBest } = computeStreak(dayList);
    const totalXp =
      Number(p.lessons_done || 0) * XP_PER.lesson +
      Number(p.exercises_done || 0) * XP_PER.exercise +
      Number(p.quizzes_done || 0) * XP_PER.quiz;

    // Progres belajar per track.
    const { rows: tracks } = await db.execute(
      `SELECT
         t.id AS trackId, t.slug, t.name, t.color, t.icon_svg, t.tagline,
         (SELECT COUNT(*) FROM lessons l WHERE l.track_id = t.id) AS totalLessons,
         (SELECT COUNT(*) FROM progress p
            WHERE p.track_id = t.id AND p.user_id = ? AND p.kind='lesson' AND p.status='completed'
         ) AS completedLessons
       FROM tracks t
       ORDER BY (completedLessons > 0) DESC, t.sort_order`,
      [userId]
    );

    const learning = tracks.map((t) => {
      const total = Number(t.totalLessons) || 0;
      const done = Number(t.completedLessons) || 0;
      return {
        trackId: t.trackId,
        slug: t.slug,
        name: t.name,
        color: t.color,
        iconSvg: t.icon_svg,
        tagline: t.tagline,
        completedLessons: done,
        totalLessons: total,
        percent: total ? Math.round((done / total) * 100) : 0,
      };
    });

    // 7 hari aktivitas terakhir untuk streak week (dari progres yang diselesaikan).
    const today = new Date();
    const days7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days7.push(d.toISOString().slice(0, 10));
    }
    const activeSet = new Set(dayList);
    const streakWeek = days7.map((d) => activeSet.has(d));

    const { rows: bk } = await db.execute(
      'SELECT COUNT(*) AS bookmarks FROM bookmarks WHERE user_id = ?',
      [userId]
    );

    return json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        fullName: user.full_name,
        email: user.email,
        avatarUrl: user.avatar_url,
        displayName: displayName(user),
      },
      stats: {
        total_xp: totalXp,
        streak_current: streakCurrent,
        streak_best: streakBest,
        lessons_done: Number(p.lessons_done) || 0,
        exercises_done: Number(p.exercises_done) || 0,
        quizzes_done: Number(p.quizzes_done) || 0,
        certs_done: Number(c.certs_done) || 0,
        challenges_done: 0,
      },
      learning,
      streakWeek,
      counts: {
        bookmarks: Number(bk[0]?.bookmarks) || 0,
        certificates: Number(c.certs_done) || 0,
      },
    });
  } catch (err) {
    console.error('[api/dashboard]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
