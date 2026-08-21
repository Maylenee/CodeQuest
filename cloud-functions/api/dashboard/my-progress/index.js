// GET /api/dashboard/my-progress?userId=... -> progres per track (lesson/exercise/quiz).
import { json, requireDb } from '../_shared.js';

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
    const { rows: tracks } = await db.execute(
      `SELECT
         t.id AS trackId, t.slug, t.name, t.color, t.icon_svg, t.tagline,
         (SELECT COUNT(*) FROM lessons l   WHERE l.track_id = t.id) AS totalLessons,
         (SELECT COUNT(*) FROM progress p
            WHERE p.track_id = t.id AND p.user_id = ? AND p.kind='lesson'   AND p.status='completed'
         ) AS completedLessons,
         (SELECT COUNT(*) FROM exercises e  WHERE e.track_id = t.id) AS totalExercises,
         (SELECT COUNT(*) FROM progress p
            WHERE p.track_id = t.id AND p.user_id = ? AND p.kind='exercise' AND p.status='completed'
         ) AS completedExercises,
         (SELECT COUNT(*) FROM quizzes q    WHERE q.track_id = t.id) AS totalQuizzes,
         (SELECT COUNT(*) FROM progress p
            WHERE p.track_id = t.id AND p.user_id = ? AND p.kind='quiz'     AND p.status='completed'
         ) AS completedQuizzes
       FROM tracks t
       ORDER BY t.sort_order`,
      [userId, userId, userId]
    );

    const tracksOut = tracks.map((t) => {
      const totalLessons = Number(t.totalLessons) || 0;
      const completedLessons = Number(t.completedLessons) || 0;
      const totalExercises = Number(t.totalExercises) || 0;
      const completedExercises = Number(t.completedExercises) || 0;
      const totalQuizzes = Number(t.totalQuizzes) || 0;
      const completedQuizzes = Number(t.completedQuizzes) || 0;
      const itemsTotal = totalLessons + totalExercises + totalQuizzes;
      const itemsDone =
        completedLessons + completedExercises + completedQuizzes;
      return {
        trackId: t.trackId,
        slug: t.slug,
        name: t.name,
        color: t.color,
        iconSvg: t.icon_svg,
        tagline: t.tagline,
        totalLessons,
        completedLessons,
        lessonPercent: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
        totalExercises,
        completedExercises,
        totalQuizzes,
        completedQuizzes,
        itemsTotal,
        itemsDone,
        percent: itemsTotal ? Math.round((itemsDone / itemsTotal) * 100) : 0,
      };
    });

    const overall = tracksOut.reduce(
      (acc, t) => {
        acc.totalLessons += t.totalLessons;
        acc.completedLessons += t.completedLessons;
        acc.totalExercises += t.totalExercises;
        acc.completedExercises += t.completedExercises;
        acc.totalQuizzes += t.totalQuizzes;
        acc.completedQuizzes += t.completedQuizzes;
        return acc;
      },
      {
        totalLessons: 0,
        completedLessons: 0,
        totalExercises: 0,
        completedExercises: 0,
        totalQuizzes: 0,
        completedQuizzes: 0,
      }
    );

    return json({ tracks: tracksOut, overall });
  } catch (err) {
    console.error('[api/dashboard/my-progress]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
