// Scraper materi + references W3Schools per track.
// Usage: node --env-file=.env scripts/scrape-w3schools.js [track|all]
//   track: html | css | javascript | python | sql | java | php
// Lessons diambil dari section TUTORIAL pada sidebar (id='leftmenuinner'),
// references diambil dari halaman index reference per track.
import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env');
  process.exit(1);
}

const db = createClient({ url, authToken });
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const BASE = 'https://www.w3schools.com';

// Konfigurasi per track: folder W3Schools (dir), prefix penamaan file lesson,
// dan entry page ('' artinya root /{dir}/, 'default.asp' artinya /{dir}/default.asp).
const TRACK_CFG = {
  html: { dir: 'html', prefixes: ['html5', 'html'], entry: 'default.asp' },
  css: { dir: 'css', prefixes: ['css3', 'css'], entry: 'default.asp' },
  javascript: { dir: 'js', prefixes: ['js'], entry: 'default.asp' },
  python: { dir: 'python', prefixes: ['python'], entry: 'default.asp' },
  sql: { dir: 'sql', prefixes: ['sql'], entry: 'default.asp' },
  java: { dir: 'java', prefixes: ['java'], entry: 'default.asp' },
  php: { dir: 'php', prefixes: ['php'], entry: 'default.asp' },
  'w3-css': { dir: 'w3css', prefixes: ['w3css'], entry: '' },
  c: { dir: 'c', prefixes: ['c'], entry: '' },
  cpp: { dir: 'cpp', prefixes: ['cpp'], entry: '' },
  'c-sharp': { dir: 'cs', prefixes: ['cs'], entry: '' },
  'how-to': { dir: 'howto', prefixes: ['howto'], entry: '' },
  bootstrap: { dir: 'bootstrap', prefixes: ['bootstrap'], entry: '' },
  react: { dir: 'react', prefixes: ['react'], entry: '' },
  mysql: { dir: 'mysql', prefixes: ['mysql'], entry: '' },
  jquery: { dir: 'jquery', prefixes: ['jquery'], entry: '' },
  excel: { dir: 'excel', prefixes: ['excel'], entry: '' },
  xml: { dir: 'xml', prefixes: [], entry: '' },
};

// Track yang akan di-scrape saat argumen 'new' (bahasa yang belum ada datanya).
const NEW_TRACKS = [
  'w3-css', 'c', 'cpp', 'c-sharp', 'how-to', 'bootstrap',
  'react', 'mysql', 'jquery', 'excel', 'xml',
];

// Section sidebar yang BUKAN materi tutorial (dilewati).
// Catatan: 'how to' sengaja tidak di-exclude karena ada track 'how-to'.
const SECTION_EXCLUDE = /example|exercise|quiz|exam|cert|reference|challenge|old technologies/i;

// Link yang bukan lesson (challenges, halaman pendukung, reference, dll).
const LINK_EXCLUDE =
  /_challenges|_examples?\.asp|_examples?\.php|_exercises?\.asp|_exercises?\.php|_quiz\.asp|_quiz\.php|_exam\.asp|_exercise_embed|_bootcamp|_study_plan|_syllabus|_summary|_website|_interview|_editor|_tryit|_bootcamp|func_|ref_|keyword_|_refs?\.asp|_cert|_certificate/i;

// Halaman index reference per track (untuk tabel reference_links).
const REFERENCES = {
  html: [{ path: 'tags/default.asp', title: 'HTML Element Reference' }],
  css: [{ path: 'cssref/default.asp', title: 'CSS Reference' }],
  javascript: [{ path: 'jsref/default.asp', title: 'JavaScript Reference' }],
  python: [{ path: 'python/python_reference.asp', title: 'Python Reference' }],
  sql: [
    { path: 'sql/sql_ref_keywords.asp', title: 'SQL Keywords Reference' },
    { path: 'sql/sql_ref_mysql.asp', title: 'MySQL Functions' },
    { path: 'sql/sql_ref_sqlserver.asp', title: 'SQL Server Functions' },
    { path: 'sql/sql_ref_msaccess.asp', title: 'MS Access Functions' },
    { path: 'sql/sql_quickref.asp', title: 'SQL Quick Reference' },
    { path: 'sql/sql_datatypes.asp', title: 'SQL Data Types' },
  ],
  java: [{ path: 'java/java_ref_keywords.asp', title: 'Java Keywords' }],
  php: [{ path: 'php/php_ref_overview.asp', title: 'PHP Reference' }],
};

async function fetchHtml(path) {
  const res = await fetch(`${BASE}/${path}`, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.text();
}

// Ambil daftar lesson dari sidebar tutorial (id='leftmenuinner') mempertahankan urutan
// dan menandai section header (<h2 class="left">) sebagai lesson_group.
function extractLessonLinks(html) {
  const start = html.indexOf("id='leftmenuinner'");
  if (start === -1) return [];
  const mainIdx = html.indexOf("id='main'", start);
  const end = mainIdx === -1 ? html.length : mainIdx;
  const side = html.slice(start, end);

  const links = [];
  const seen = new Set();
  let group = '';
  for (const m of side.matchAll(/<h2 class="left">([\s\S]*?)<\/h2>/g)) {
    const header = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (SECTION_EXCLUDE.test(header)) continue;
    group = header;

    const from = m.index + m[0].length;
    const to = side.slice(m.index + m[0].length).indexOf('<h2 class="left">');
    const seg = to === -1 ? side.slice(from) : side.slice(from, from + to);

    const homeMatch = seg.match(/<a[^>]*href=["'](default\.asp|index\.asp|index\.php|default\.php)["'][^>]*>([^<]*)<\/a>/);
    if (homeMatch && !seen.has(homeMatch[1])) {
      seen.add(homeMatch[1]);
      links.push({ path: homeMatch[1], label: homeMatch[2].trim(), group });
    }

    for (const a of seg.matchAll(
      /<a[^>]*href=["']([a-z0-9]+[0-9]*_[a-z0-9_]*\.(?:asp|php))["'][^>]*>([^<]*)<\/a>/gi
    )) {
      const href = a[1];
      if (LINK_EXCLUDE.test(href)) continue;
      if (seen.has(href)) continue;
      seen.add(href);
      links.push({ path: href, label: a[2].trim(), group });
    }
  }

  return links;
}

function getSlug(path, track) {
  if (['default.asp', 'index.asp', 'index.php', 'default.php'].includes(path)) return 'home';
  const file = path.replace(/\.(asp|php)$/, '');
  let s = file;
  for (const p of TRACK_CFG[track]?.prefixes || [track]) {
    if (s === p || s.startsWith(`${p}_`)) {
      s = s.slice(p.length).replace(/^_+/, '');
      break;
    }
  }
  return s.replace(/_/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
}

function extractMainTitle(html) {
  const m = html.match(/<h1>((?:(?!<\/h1>).)*?)<\/h1>/s);
  if (!m) return '';
  return m[1]
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMainBody(html) {
  const clean = html.replace(/<!--[\s\S]*?-->/g, '');
  const m = clean.match(/<div[^>]*id='main'[^>]*>/);
  if (!m) return '';
  const from = clean.indexOf(m[0]) + m[0].length;
  const firstNav = clean.indexOf('class="w3-clear nextprev"', from);
  const secondNav = clean.indexOf('class="w3-clear nextprev"', firstNav + 10);
  const end = secondNav === -1 ? clean.length : secondNav;
  return clean.slice(from, end);
}

function htmlToMarkdown(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '');

  // buang area iklan + nav atas/bawah (Home/Next/Previous)
  s = s.replace(/<div id='mainLeaderboard'[^>]*>[\s\S]*?<\/div>/gi, '');
  s = s.replace(/<div class="w3-clear nextprev"[\s\S]*?<\/div>/gi, '');
  // buang h1 (judul sudah tampil di header halaman)
  s = s.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
  // buang tombol & link bergaya button (Try it Yourself, Learn now, dst)
  s = s.replace(/<a[^>]*class="[^"]*w3-btn[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  s = s.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');
  // inline code w3schools -> backtick (disimpan via placeholder agar isi <..> tidak ikut
  // terhapus oleh tahap pembersihan tag di akhir)
  const inlineCodes = [];
  s = s.replace(
    /<code class="w3-codespan"[^>]*>([\s\S]*?)<\/code>/gi,
    (_, c) => {
      inlineCodes.push('`' + c.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() + '`');
      return `\u0001${inlineCodes.length - 1}\u0001`;
    }
  );

  // 2) Proteksi code block (w3-code / pre) sebagai placeholder agar tidak
  //    ikut dihapus/di-collapse oleh pembersihan tag di bawah. Syntax-highlight
  //    span dibuang dan entitas di-decode sehingga kode kembali murni.
  const codeBlocks = [];
  const storeBlock = (raw, cls) => {
    const { code, lang } = cleanW3Code(raw, cls || '');
    codeBlocks.push(`\`\`\`${lang}\n${code}\n\`\`\``);
    return `\u0002${codeBlocks.length - 1}\u0002`;
  };
  s = s.replace(
    /<div class="w3-code([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi,
    (_, cls, code) => storeBlock(code, cls)
  );
  s = s.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => storeBlock(code, ''));

  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => '\n## ' + inlineText(c) + '\n');
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => '\n## ' + inlineText(c) + '\n');
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => '\n### ' + inlineText(c) + '\n');
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, c) => '\n#### ' + inlineText(c) + '\n');
  s = s.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, c) => '\n##### ' + inlineText(c) + '\n');

  s = s.replace(
    /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
    (_, inner) =>
      '\n' +
      Array.from(inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
        .map((m) => '- ' + blockText(m[1]))
        .join('\n') +
      '\n'
  );
  s = s.replace(
    /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
    (_, inner) =>
      '\n' +
      Array.from(inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
        .map((m) => '1. ' + blockText(m[1]))
        .join('\n') +
      '\n'
  );

  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => '\n' + blockText(c) + '\n');
  // div/blockquote adalah container blok — jangan collapse newline (itu yang
  // menyebabkan heading & code block menyatu dalam satu baris). Cukup buang
  // tag-nya dan pertahankan markdown di dalamnya.
  s = s.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, (_, c) => '\n' + c + '\n');
  s = s.replace(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
    (_, c) => '\n> ' + c.trim().split('\n').join('\n> ') + '\n'
  );

  s = s.replace(
    /<table[^>]*>([\s\S]*?)<\/table>/gi,
    (_, inner) => {
      const rows = Array.from(inner.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi))
        .map((rm) =>
          Array.from(rm[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)).map((cm) =>
            inlineText(cm[1])
          )
        )
        .filter((r) => r.length);
      if (!rows.length) return '';
      const out = [];
      rows.forEach((row, i) => {
        out.push('| ' + row.join(' | ') + ' |');
        if (i === 0) out.push('|' + row.map(() => '---').join('|') + '|');
      });
      return '\n' + out.join('\n') + '\n';
    }
  );

  // 4) Bersihkan sisa tag HTML dari teks narasi. Placeholder kode & inline
  //    tidak mengandung '<' sehingga aman; decode entitas pada teks narasi.
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = decodeHtml(s);
  s = s.replace(/<[^>]*>/g, '');
  s = s.replace(/<\/?[a-z][^>]*/gi, ' ');
  s = s.replace(/&#10094;|&#10095;/g, '');

  // 5) Kembalikan placeholder: inline code (plain text) lalu code block
  //    (berisi '<' asli — HARUS sesudah pembersihan tag di atas!).
  inlineCodes.forEach((code, i) => {
    s = s.replace(`\u0001${i}\u0001`, decodeHtml(code));
  });
  codeBlocks.forEach((code, i) => {
    s = s.replace(`\u0002${i}\u0002`, code);
  });

  // 6) Rapikan whitespace berlebih, TAPI pertahankan newline struktural markdown.
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.replace(/[ \t]+\n/g, '\n');
  s = s.split('\n').map((l) => l.trimEnd()).join('\n').trim();
  return s;
}

function decodeHtml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&raquo;/g, '»')
    .replace(/&laquo;/g, '«')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®');
}

// Bersihkan isi code block W3Schools agar jadi kode murni: buang span
// syntax-highlight, ubah <br> jadi newline, decode entitas, lalu deteksi bahasa.
function cleanW3Code(raw, cls) {
  let c = raw.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '');
  c = c.replace(/<br\s*\/?>/gi, '\n');
  c = decodeHtml(c);
  let lang = 'html';
  if (/csshigh/i.test(cls)) lang = 'css';
  else if (/jshigh|javascripthigh|jsxhigh/i.test(cls)) lang = 'js';
  else if (/xmlhigh/i.test(cls)) lang = 'xml';
  return { code: c.trim(), lang };
}

// Ambil code block pertama (w3-code / pre) sebagai example_code pelajaran.
function extractExampleCode(html) {
  let cls = '';
  let raw = '';
  const a = html.match(/<div class="w3-code([^"]*)"[^>]*>([\s\S]*?)<\/div>/i);
  if (a) {
    cls = a[1];
    raw = a[2];
  } else {
    const b = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (b) raw = b[1];
  }
  if (!raw) return null;
  const { code } = cleanW3Code(raw, cls);
  return code || null;
}

function inlineText(s) {
  s = s.replace(/<[^>]+>/g, ' ');
  s = decodeHtml(s);
  return s.replace(/\s+/g, ' ').trim();
}

function blockText(s) {
  return inlineText(s).trim();
}

const ulid = () =>
  `${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 10)}`;

async function scrapeTrack(track) {
  const { rows: trackRows } = await db.execute('SELECT id FROM tracks WHERE slug = ?', [track]);
  if (!trackRows.length) {
    console.error(`Track '${track}' tidak ada di DB.`);
    return;
  }
  const trackId = trackRows[0].id;
  const cfg = TRACK_CFG[track] || { dir: track, prefixes: [track], entry: 'default.asp' };
  const dir = cfg.dir;
  const entryPath = cfg.entry ? `${dir}/${cfg.entry}` : dir;
  const indexHtml = await fetchHtml(entryPath);
  const lessons = extractLessonLinks(indexHtml);
  console.log(`[${track}] ${lessons.length} lesson ditemukan di sidebar.`);

  // Resync: hapus lesson track yang slug-nya tidak ada di hasil scrape sekarang.
  const wanted = new Set(lessons.map((l) => getSlug(l.path, track)));
  if (wanted.size) {
    const slugs = [...wanted];
    const placeholders = slugs.map(() => '?').join(',');
    await db.execute(
      `DELETE FROM lessons WHERE track_id = ? AND slug NOT IN (${placeholders})`,
      [trackId, ...slugs]
    );
  }

  let ok = 0;
  for (const { path, label, group } of lessons) {
    const slug = getSlug(path, track);
    try {
      const html = await fetchHtml(`${dir}/${path}`);
      const title = path === 'default.asp' ? label : extractMainTitle(html) || label || slug;
      const body = extractMainBody(html);
      const contentMd = body ? htmlToMarkdown(body) : '';
      const exampleCode = body ? extractExampleCode(body) : null;
      const lessonId = ulid();
      await db.execute(
        `INSERT INTO lessons (id, track_id, slug, title, content_md, lesson_group, sort_order, example_code)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(track_id, slug) DO UPDATE SET
           title=excluded.title, content_md=excluded.content_md,
           lesson_group=excluded.lesson_group, sort_order=excluded.sort_order,
           example_code=excluded.example_code`,
        [lessonId, trackId, slug, title, contentMd, group || null, ok + 1, exampleCode]
      );
      ok++;
      process.stdout.write(`  [${ok}] ${slug} (${contentMd.length} chars)\n`);
    } catch (err) {
      process.stdout.write(`  [skip] ${path} -> ${err.message}\n`);
    }
    await new Promise((r) => setTimeout(r, 120));
  }

  // References
  let refOk = 0;
  for (const ref of REFERENCES[track] || []) {
    const slug = ref.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    try {
      const html = await fetchHtml(ref.path);
      const title = extractMainTitle(html) || ref.title;
      const body = extractMainBody(html);
      const contentMd = body ? htmlToMarkdown(body) : '';
      const refId = ulid();
      await db.execute(
        `INSERT INTO reference_links (id, track_id, slug, title, content_md, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(track_id, slug) DO UPDATE SET
           title=excluded.title, content_md=excluded.content_md, sort_order=excluded.sort_order`,
        [refId, trackId, slug, title, contentMd, refOk + 1]
      );
      refOk++;
      process.stdout.write(`  [ref] ${slug} (${contentMd.length} chars)\n`);
    } catch (err) {
      process.stdout.write(`  [ref-skip] ${ref.path} -> ${err.message}\n`);
    }
    await new Promise((r) => setTimeout(r, 120));
  }

  console.log(`[${track}] selesai: ${ok} lesson, ${refOk} references.`);
}

async function main() {
  const arg = process.argv[2] || 'new';
  let tracks;
  if (arg === 'all') tracks = Object.keys(TRACK_CFG);
  else if (arg === 'new') tracks = NEW_TRACKS;
  else tracks = [arg];
  for (const t of tracks) {
    await scrapeTrack(t);
  }
  console.log('Scrape selesai.');
  await db.close();
}

main().catch((err) => {
  console.error(err);
  db.close();
  process.exit(1);
});