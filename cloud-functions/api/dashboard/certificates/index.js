// GET /api/dashboard/certificates?userId=... -> sertifikat user + daftar exam (tracks).
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
    const [{ rows: certs }, { rows: exams }] = await Promise.all([
      db.execute(
        `SELECT c.id, c.track_id, c.full_name, c.quiz_score, c.issued_at,
                t.name AS trackName, t.slug AS trackSlug, t.color, t.icon_svg
         FROM certificates c
         LEFT JOIN tracks t ON t.id = c.track_id
         WHERE c.user_id = ?
         ORDER BY c.issued_at DESC`,
        [userId]
      ),
      db.execute(
        `SELECT t.id AS trackId, t.slug, t.name, t.color, t.icon_svg,
                EXISTS(SELECT 1 FROM certificates c WHERE c.track_id = t.id AND c.user_id = ?) AS earned
         FROM tracks t
         ORDER BY t.sort_order`,
        [userId]
      ),
    ]);

    return json({
      certificates: certs.map((c) => ({
        id: c.id,
        trackId: c.track_id,
        trackName: c.trackName,
        trackSlug: c.trackSlug,
        fullName: c.full_name,
        quizScore: c.quiz_score,
        issuedAt: c.issued_at,
        color: c.color,
        iconSvg: c.icon_svg,
      })),
      exams: exams.map((e) => ({
        trackId: e.trackId,
        slug: e.slug,
        name: e.name,
        color: e.color,
        iconSvg: e.icon_svg,
        earned: Boolean(e.earned),
      })),
    });
  } catch (err) {
    console.error('[api/dashboard/certificates]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
