// Shared helpers for api/dashboard endpoints.
import { createClient } from '@libsql/client';

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });

export const cors = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });

export const requireDb = (env) => {
  if (!env.TURSO_DATABASE_URL || !env.TURSO_AUTH_TOKEN) {
    throw Object.assign(new Error('TURSO_DATABASE_URL / TURSO_AUTH_TOKEN belum diset.'), {
      status: 500,
    });
  }
  return createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });
};

export const ulid = () =>
  `${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 10)}`;

export const ymd = (d) => {
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
};

// Senin (00:00 UTC) s.d. Minggu (23:59) minggu ini.
export function currentWeekRange(now = new Date()) {
  const d = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const dow = d.getUTCDay(); // 0 = Minggu
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { start: ymd(monday), end: ymd(sunday) };
}

export const displayName = (u) =>
  (u && [u.first_name, u.last_name].filter(Boolean).join(' ').trim()) ||
  (u && u.full_name) ||
  (u && u.email) ||
  'Anonymous';

// XP diberikan per tipe progres yang diselesaikan.
export const XP_PER = { lesson: 10, exercise: 15, quiz: 20 };

export const xpForKind = (kind) => XP_PER[kind] || 0;

// 'YYYY-MM-DD' (UTC) dari string ISO manapun.
export const ymdUTC = (s) => String(s).slice(0, 10);

// Hitung streak (beruntun hari) dari daftar tanggal progres yang diselesaikan.
// days: array string 'YYYY-MM-DD' (urutan bebas).
// Mengembalikan { current, best }.
export function computeStreak(days) {
  const set = new Set(days.map((d) => ymdUTC(d)));
  if (set.size === 0) return { current: 0, best: 0 };

  const toMs = (s) => {
    const [y, m, d] = s.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  const sorted = [...set].sort().map(toMs); // ascending ms

  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = Math.round((sorted[i] - sorted[i - 1]) / 86400000);
    if (diff === 1) {
      run += 1;
      best = Math.max(best, run);
    } else if (diff > 1) {
      run = 1;
    }
  }

  const today = toMs(ymdUTC(new Date().toISOString()));
  const last = sorted[sorted.length - 1];
  let current = 0;
  if (last === today || last === today - 86400000) {
    current = 1;
    for (let i = sorted.length - 2; i >= 0; i--) {
      if (sorted[i] === today - 86400000 * current) current += 1;
      else break;
    }
  }
  return { current, best };
}
