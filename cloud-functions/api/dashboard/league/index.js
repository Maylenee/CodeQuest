// GET /api/dashboard/league?userId=... -> leaderboard Weekly League (XP minggu ini).
// XP dihitung otomatis dari progres yang diselesaikan (lesson=10, exercise=15, quiz=20),
// konsisten dengan perhitungan di dashboard.
import { json, requireDb, currentWeekRange, displayName } from '../_shared.js';

// Ekspresi SQL untuk XP per baris progres (harus sama dengan XP_PER di _shared.js).
const XP = `(CASE kind WHEN 'lesson' THEN 10 WHEN 'exercise' THEN 15 WHEN 'quiz' THEN 20 ELSE 0 END)`;

export const onRequestOptions = () => new Response(null, { status: 204 });

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId') || null;

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    const { start, end } = currentWeekRange();
    const { rows: board } = await db.execute(
      `SELECT u.id AS userId,
              u.first_name, u.last_name, u.full_name, u.email, u.avatar_url,
              COALESCE(SUM(CASE WHEN p.status='completed'
                AND substr(p.completed_at,1,10) BETWEEN ? AND ? THEN ${XP} ELSE 0 END), 0) AS weekly_xp,
              COALESCE(SUM(CASE WHEN p.status='completed' THEN ${XP} ELSE 0 END), 0) AS total_xp
       FROM users u
       LEFT JOIN progress p ON p.user_id = u.id
       GROUP BY u.id
       ORDER BY weekly_xp DESC, total_xp DESC
       LIMIT 20`,
      [start, end]
    );

    const leaderboard = board.map((r, i) => ({
      rank: i + 1,
      userId: r.userId,
      name: displayName(r),
      avatarUrl: r.avatar_url,
      totalXp: Number(r.total_xp) || 0,
      weeklyXp: Number(r.weekly_xp) || 0,
      isCurrentUser: userId ? r.userId === userId : false,
    }));

    let currentUser = null;
    if (userId) {
      const { rows: me } = await db.execute(
        `SELECT
           COALESCE(SUM(CASE WHEN status='completed'
             AND substr(completed_at,1,10) BETWEEN ? AND ? THEN ${XP} ELSE 0 END), 0) AS weekly_xp,
           COALESCE(SUM(CASE WHEN status='completed' THEN ${XP} ELSE 0 END), 0) AS total_xp
         FROM progress WHERE user_id = ?`,
        [start, end, userId]
      );
      const myWeekly = Number(me[0]?.weekly_xp) || 0;
      const myTotal = Number(me[0]?.total_xp) || 0;
      const { rows: rankRows } = await db.execute(
        `SELECT COUNT(*) AS cnt FROM (
            SELECT p.user_id, COALESCE(SUM(CASE WHEN p.status='completed'
              AND substr(p.completed_at,1,10) BETWEEN ? AND ? THEN ${XP} ELSE 0 END), 0) AS wxp
            FROM progress p
            GROUP BY p.user_id
          ) t WHERE t.wxp > ?`,
        [start, end, myWeekly]
      );
      currentUser = {
        weeklyXp: myWeekly,
        totalXp: myTotal,
        rank: Number(rankRows[0]?.cnt || 0) + 1,
      };
    }

    return json({
      leaderboard,
      currentUser,
      week: { start, end },
    });
  } catch (err) {
    console.error('[api/dashboard/league]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
