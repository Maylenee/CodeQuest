// EdgeOne Cloud Function — POST /api/auth/register
// Body (JSON): { email, password, first_name?, last_name?, full_name? }
import { json, cors, requireDb, ulid, encodePassword, EMAIL_RE } from '../_shared.js';

export const onRequestPost = async ({ request, env }) => {
  if (request.method === 'OPTIONS') return cors();

  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Body harus berupa JSON.' }, 400);
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const firstName = String(body.first_name || '').trim();
    const lastName = String(body.last_name || '').trim();
    const fullName = String(body.full_name || '').trim() || `${firstName} ${lastName}`.trim();

    if (!EMAIL_RE.test(email)) return json({ error: 'Format email tidak valid.' }, 400);
    if (password.length < 6) return json({ error: 'Password minimal 6 karakter.' }, 400);
    if (!fullName) return json({ error: 'Nama wajib diisi.' }, 400);

    const db = requireDb(env);
    try {
      const { rows: existing } = await db.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );
      if (existing.length) return json({ error: 'Email sudah terdaftar.' }, 409);

      const id = `user-${ulid()}`;
      const passwordHash = await encodePassword(password);
      await db.execute(
        'INSERT INTO users (id, email, password_hash, first_name, last_name, full_name) VALUES (?, ?, ?, ?, ?, ?)',
        [id, email, passwordHash, firstName || null, lastName || null, fullName]
      );
      await db.execute(
        "INSERT INTO user_stats (user_id, streak_current, streak_best, total_xp, lessons_done, exercises_done, quizzes_done, last_active_at) VALUES (?, 0, 0, 0, 0, 0, 0, ?)",
        [id, new Date().toISOString()]
      );

      return json(
        { user: { id, email, first_name: firstName || null, last_name: lastName || null, full_name: fullName } },
        201
      );
    } catch (err) {
      console.error('[api/auth/register]', err);
      throw err;
    } finally {
      await db.close();
    }
  } catch (err) {
    if (err.status) return json({ error: err.message }, err.status);
    console.error('[api/auth/register]', err);
    return json({ error: 'Internal error' }, 500);
  }
};

export const onRequestGet = () => json({ error: 'Method not allowed. Gunakan POST.' }, 405);