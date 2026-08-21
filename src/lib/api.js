const LEARN_API = '/api/learn';
const AUTH_API = '/api/auth';

export async function fetchTracks() {
  const res = await fetch(LEARN_API);
  if (!res.ok) throw new Error(`/api/learn ${res.status}`);
  return (await res.json()).tracks || [];
}

export async function fetchTrack(slug) {
  const res = await fetch(`${LEARN_API}?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`/api/learn?slug=${slug} ${res.status}`);
  return res.json();
}

async function postJson(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan.');
  return data;
}

export async function registerUser(payload) {
  const data = await postJson(`${AUTH_API}/register`, payload);
  return data.user;
}

export async function loginUser(payload) {
  const data = await postJson(`${AUTH_API}/login`, payload);
  return data.user;
}

const DASHBOARD_API = '/api/dashboard';

export async function fetchDashboard(userId) {
  const res = await fetch(`${DASHBOARD_API}?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`/api/dashboard ${res.status}`);
  return res.json();
}

export async function fetchMyProgress(userId) {
  const res = await fetch(`${DASHBOARD_API}/my-progress?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`/api/dashboard/my-progress ${res.status}`);
  return res.json();
}

export async function fetchLeague(userId) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`${DASHBOARD_API}/league${q}`);
  if (!res.ok) throw new Error(`/api/dashboard/league ${res.status}`);
  return res.json();
}

export async function recordProgress(payload) {
  return postJson(`${DASHBOARD_API}/progress`, payload);
}

export async function fetchLessonProgress(userId, { lessonId, kind = 'lesson' }) {
  const res = await fetch(
    `${DASHBOARD_API}/progress?userId=${encodeURIComponent(userId)}&lessonId=${encodeURIComponent(
      lessonId
    )}&kind=${encodeURIComponent(kind)}`
  );
  if (!res.ok) throw new Error(`/api/dashboard/progress ${res.status}`);
  return res.json();
}

export async function fetchBookmarks(userId) {
  const res = await fetch(`${DASHBOARD_API}/bookmarks?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`/api/dashboard/bookmarks ${res.status}`);
  return res.json();
}

export async function addBookmark(payload) {
  return postJson(`${DASHBOARD_API}/bookmarks`, payload);
}

export async function removeBookmark({ userId, lessonId, trackId }) {
  const q = new URLSearchParams();
  q.set('userId', userId);
  if (lessonId) q.set('lessonId', lessonId);
  if (trackId) q.set('trackId', trackId);
  const res = await fetch(`${DASHBOARD_API}/bookmarks?${q.toString()}`, {
    method: 'DELETE',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Gagal menghapus bookmark.');
  return data;
}

export async function fetchCertificates(userId) {
  const res = await fetch(`${DASHBOARD_API}/certificates?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`/api/dashboard/certificates ${res.status}`);
  return res.json();
}

export async function fetchProfile(userId) {
  const res = await fetch(`${DASHBOARD_API}/profile?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`/api/dashboard/profile ${res.status}`);
  return res.json();
}

export async function updateProfile(payload) {
  const res = await fetch(`${DASHBOARD_API}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Gagal update profil.');
  return data.user;
}