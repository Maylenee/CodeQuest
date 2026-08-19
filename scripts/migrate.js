import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createClient } from '@libsql/client';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env');
  process.exit(1);
}

const db = createClient({ url, authToken });
const schemaPath = resolve(__dirname, '../db/schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

function splitStatements(sql) {
  const lines = sql
    .split('\n')
    .map((l) => l.replace(/--.*$/, '').trim())
    .filter((l) => l.length > 0)
    .join('\n');
  return lines
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function main() {
  console.log(`Migrating ${url} ...`);
  for (const stmt of splitStatements(schema)) {
    await db.execute(stmt);
  }
  console.log('Schema applied.');

  const { rows } = await db.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  console.log('Tables:', rows.map((r) => r.name).join(', '));

  await db.close();
}

main().catch((err) => {
  console.error(err);
  db.close();
  process.exit(1);
});