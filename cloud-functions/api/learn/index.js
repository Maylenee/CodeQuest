// EdgeOne Cloud Function (Node.js, route-as-a-service).
// GET /api/learn            -> daftar semua tracks beserta jumlah lesson/exercise/quiz.
// GET /api/learn?slug=html  -> detail satu track: track, lessons, exercises (grup), quizzes, references.
import { createClient } from '@libsql/client';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!env.TURSO_DATABASE_URL || !env.TURSO_AUTH_TOKEN) {
    return json({ error: 'TURSO_DATABASE_URL / TURSO_AUTH_TOKEN belum diset.' }, 500);
  }

  const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });
  try {
    if (slug) return await getTrackDetail(db, slug);
    return await getTracks(db);
  } catch (err) {
    console.error('[api/learn]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};

async function getTracks(db) {
  const { rows } = await db.execute(`
    SELECT t.id, t.slug, t.name, t.tagline, t.color, t.icon_svg, t.sort_order,
      (SELECT COUNT(*) FROM lessons l WHERE l.track_id = t.id)     AS lesson_count,
      (SELECT COUNT(*) FROM exercises e WHERE e.track_id = t.id)   AS exercise_count,
      (SELECT COUNT(*) FROM quizzes q WHERE q.track_id = t.id)     AS quiz_count
    FROM tracks t
    ORDER BY t.sort_order
  `);
  return json({ tracks: rows });
}

async function getTrackDetail(db, slug) {
  const { rows: trackRows } = await db.execute(
    'SELECT id, slug, name, tagline, color, icon_svg FROM tracks WHERE slug = ?',
    [slug]
  );
  if (!trackRows.length) return json({ error: 'Track not found' }, 404);
  const track = trackRows[0];

  const [{ rows: lessons }, { rows: exercises }, { rows: quizzes }, { rows: references }] =
    await Promise.all([
      db.execute(
        'SELECT id, slug, title, lesson_group, content_md, example_code, sort_order FROM lessons WHERE track_id = ? ORDER BY sort_order',
        [track.id]
      ),
      db.execute(
        'SELECT id, slug, title, group_name, prompt_md, starter_code, expected_output, difficulty, sort_order FROM exercises WHERE track_id = ? ORDER BY sort_order',
        [track.id]
      ),
      db.execute(
        'SELECT id, question, options, answer_index, explanation, sort_order FROM quizzes WHERE track_id = ? ORDER BY sort_order',
        [track.id]
      ),
      db.execute(
        'SELECT id, slug, title, content_md, sort_order FROM reference_links WHERE track_id = ? ORDER BY sort_order',
        [track.id]
      ),
    ]);

  const grouped = [];
  for (const ex of exercises) {
    let g = grouped.find((x) => x.name === ex.group_name);
    if (!g) {
      g = { name: ex.group_name, exercises: [] };
      grouped.push(g);
    }
    g.exercises.push(ex);
  }

  return json({
    track,
    lessons,
    exercises: grouped,
    quizzes: quizzes.map(({ options, ...q }) => ({
      ...q,
      options: JSON.parse(options || '[]'),
    })),
    references,
  });
}