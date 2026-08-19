// Verifikasi lokal handler EdgeOne Cloud Function /api/learn tanpa CLI.
// Membuat mock Request + env lalu memanggil onRequestGet langsung.
import { onRequestGet } from '../cloud-functions/api/learn/index.js';

const env = {
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
};

const call = async (path, label) => {
  const req = new Request(`http://127.0.0.1/api/learn${path}`, { method: 'GET' });
  const res = await onRequestGet({ request: req, env });
  const body = await res.json();
  console.log(`\n=== ${label} -> status ${res.status} ===`);
  if (res.status !== 200) {
    console.log('response:', body);
    return;
  }
  if (path === '') {
    console.table(body.tracks.map((t) => ({
      slug: t.slug, name: t.name, color: t.color,
      lessons: t.lesson_count, exercises: t.exercise_count, quizzes: t.quiz_count,
    })));
  } else {
    console.log('track:', body.track);
    console.log('lessons:', body.lessons.length, '| contoh:', body.lessons[0]?.title, `(content ${body.lessons[0]?.content_md?.length} chars)`);
    console.log('exercises:', body.exercises.length, 'grup | contoh:', body.exercises[0]?.name, '->', body.exercises[0]?.exercises?.length, 'soal');
    console.log('quizzes:', body.quizzes.length, '| contoh:', JSON.stringify(body.quizzes[0]).slice(0, 120));
    console.log('references:', body.references.length);
  }
};

await call('', 'TRACKS');
await call('?slug=html', 'TRACK DETAIL html');
await call('?slug=nonexistent', 'TRACK NOT FOUND');