// GET/PUT /api/dashboard/profile?userId=... -> baca & update profil user.
import { json, requireDb, displayName } from '../_shared.js';

export const onRequestOptions = () => new Response(null, { status: 204 });

function publicUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    firstName: u.first_name,
    lastName: u.last_name,
    fullName: u.full_name,
    email: u.email,
    avatarUrl: u.avatar_url,
    displayName: displayName(u),
  };
}

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
    const { rows } = await db.execute(
      'SELECT id, first_name, last_name, full_name, email, avatar_url FROM users WHERE id = ?',
      [userId]
    );
    if (!rows.length) return json({ error: 'User tidak ditemukan.' }, 404);
    return json({ user: publicUser(rows[0]) });
  } catch (err) {
    console.error('[api/dashboard/profile]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};

export const onRequestPut = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body tidak valid.' }, 400);
  }

  const userId = body.userId || new URL(request.url).searchParams.get('userId');
  if (!userId) return json({ error: 'userId wajib.' }, 400);

  const { firstName, lastName } = body;
  if (firstName === undefined && lastName === undefined) {
    return json({ error: 'Tidak ada field yang diupdate.' }, 400);
  }

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    const sets = [];
    const params = [];
    if (firstName !== undefined) {
      sets.push('first_name = ?');
      params.push(firstName);
    }
    if (lastName !== undefined) {
      sets.push('last_name = ?');
      params.push(lastName);
    }
    params.push(userId);
    await db.execute(
      `UPDATE users SET ${sets.join(', ')} WHERE id = ?`,
      params
    );
    const { rows } = await db.execute(
      'SELECT id, first_name, last_name, full_name, email, avatar_url FROM users WHERE id = ?',
      [userId]
    );
    return json({ user: publicUser(rows[0]) });
  } catch (err) {
    console.error('[api/dashboard/profile]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
