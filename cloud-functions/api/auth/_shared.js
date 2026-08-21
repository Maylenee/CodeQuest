// Shared helpers for api/auth endpoints (register / login).
import { createClient } from '@libsql/client';

const enc = new TextEncoder();

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });

export const cors = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });

export const requireDb = (env) => {
  if (!env.TURSO_DATABASE_URL || !env.TURSO_AUTH_TOKEN) {
    throw Object.assign(new Error('TURSO_DATABASE_URL / TURSO_AUTH_TOKEN belum diset.'), { status: 500 });
  }
  return createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN });
};

export const ulid = () =>
  `${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 10)}`;

const abToHex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

export async function hashPassword(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return abToHex(bits);
}

export async function encodePassword(password) {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = abToHex(saltBytes);
  const hash = await hashPassword(password, salt);
  return `pbkdf2:${salt}:${hash}`;
}

export async function verifyPassword(password, stored) {
  if (!stored || !stored.startsWith('pbkdf2:')) return false;
  const [, salt, expected] = stored.split(':');
  if (!salt || !expected) return false;
  const hash = await hashPassword(password, salt);
  return hash === expected;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;