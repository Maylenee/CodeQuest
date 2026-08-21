// GET/POST /api/dashboard/bookmarks?userId=... -> daftar & simpan bookmark user.
import { json, requireDb, ulid } from '../_shared.js';

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
    const { rows } = await db.execute(
      `SELECT b.id, b.track_id, b.lesson_id, b.title, b.url, b.created_at,
              t.name AS trackName, t.slug AS trackSlug, t.color, t.icon_svg
       FROM bookmarks b
       LEFT JOIN tracks t ON t.id = b.track_id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );
    const bookmarks = rows.map((b) => ({
      id: b.id,
      trackId: b.track_id,
      lessonId: b.lesson_id,
      title: b.title,
      url: b.url,
      createdAt: b.created_at,
      trackName: b.trackName,
      trackSlug: b.trackSlug,
      color: b.color,
      iconSvg: b.icon_svg,
    }));
    return json({ bookmarks });
  } catch (err) {
    console.error('[api/dashboard/bookmarks]', err);
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
    return json({ error: 'Body tidak valid.' }, 400);
  }

  const userId = body.userId || new URL(request.url).searchParams.get('userId');
  if (!userId) return json({ error: 'userId wajib.' }, 400);

  const { trackId, lessonId, title, url } = body;
  if (!title) return json({ error: 'title wajib.' }, 400);

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    // Hindari duplikat: satu bookmark per (user, lesson) atau (user, track).
    const sameTarget =
      lessonId != null
        ? 'lesson_id = ?'
        : trackId != null
          ? 'lesson_id IS NULL AND track_id = ?'
          : '1 = 0';
    const sameParams = lessonId != null ? [lessonId] : trackId != null ? [trackId] : [];
    const { rows: existing } = await db.execute(
      `SELECT id FROM bookmarks WHERE user_id = ? AND ${sameTarget}`,
      [userId, ...sameParams]
    );
    if (existing.length) {
      return json({ id: existing[0].id, ok: true, already: true }, 200);
    }

    const id = ulid();
    await db.execute(
      `INSERT INTO bookmarks (id, user_id, track_id, lesson_id, title, url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, userId, trackId || null, lessonId || null, title, url || null]
    );
    return json({ id, ok: true }, 201);
  } catch (err) {
    console.error('[api/dashboard/bookmarks]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};

export const onRequestDelete = async ({ request, env }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId') || null;
  const lessonId = url.searchParams.get('lessonId') || null;
  const trackId = url.searchParams.get('trackId') || null;
  if (!userId) return json({ error: 'userId wajib.' }, 400);

  let db;
  try {
    db = requireDb(env);
  } catch (e) {
    return json({ error: e.message }, e.status || 500);
  }

  try {
    if (lessonId != null) {
      await db.execute('DELETE FROM bookmarks WHERE user_id = ? AND lesson_id = ?', [
        userId,
        lessonId,
      ]);
    } else if (trackId != null) {
      await db.execute(
        'DELETE FROM bookmarks WHERE user_id = ? AND lesson_id IS NULL AND track_id = ?',
        [userId, trackId]
      );
    } else {
      return json({ error: 'lessonId atau trackId wajib.' }, 400);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[api/dashboard/bookmarks]', err);
    return json({ error: 'Internal error' }, 500);
  } finally {
    await db.close();
  }
};
