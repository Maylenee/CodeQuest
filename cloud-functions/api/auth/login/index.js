// EdgeOne Cloud Function — POST /api/auth/login
// Body (JSON): { email, password }
import { json, cors, requireDb, verifyPassword } from '../_shared.js';

const publicUser = (u) => ({
  id: u.id,
  email: u.email,
  first_name: u.first_name,
  last_name: u.last_name,
  full_name: u.full_name,
});

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
    if (!email || !password) {
      return json({ error: 'Email dan password wajib diisi.' }, 400);
    }

    const db = requireDb(env);
    try {
      const { rows } = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (!rows.length) {
        return json({ error: 'Email atau password salah.' }, 401);
      }
      const user = rows[0];
      const ok = await verifyPassword(password, user.password_hash);
      if (!ok) return json({ error: 'Email atau password salah.' }, 401);

      return json({ user: publicUser(user) });
    } catch (err) {
      console.error('[api/auth/login]', err);
      throw err;
    } finally {
      await db.close();
    }
  } catch (err) {
    if (err.status) return json({ error: err.message }, err.status);
    console.error('[api/auth/login]', err);
    return json({ error: 'Internal error' }, 500);
  }
};

export const onRequestGet = () => json({ error: 'Method not allowed. Gunakan POST.' }, 405);