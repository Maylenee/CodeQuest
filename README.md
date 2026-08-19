# CodeQuest 🧭

Platform belajar coding interaktif (konsep mirip web3school) — full serverless di atas
**EdgeOne Makers (Pages Functions)**, dengan AI Tutor, sandbox eksekusi kode, dan Turso
sebagai database.

## Arsitektur

```
codequest/
├── src/                     # Frontend: React + Vite + ESLint (SPA)
│   ├── pages/               # Home, Track, Lesson, Playground
│   ├── components/          # Navbar, TrackCard, CodeRunner, ChatWidget, LessonSidebar
│   ├── hooks/useChatStream.js
│   └── lib/{api,user}.js
│
├── agents/                  # Runtime SESI (LLM / tool loop / sandbox) — context punya
│   │                        # request/env/store/tools/sandbox/tracer
│   ├── tutor/index.js       # POST /tutor          — chat AI streaming (SSE) + tool run_code
│   ├── tutor-stop/index.js  # POST /tutor-stop      — titik stop eksplisit
│   └── code-runner/index.js # POST /code-runner     — jalankan kode tanpa LLM (tombol Run)
│
├── cloud-functions/         # Runtime REQUEST (stateless) — context: request/env/agent.store
│   ├── tracks/index.js               # GET  /tracks
│   ├── track-detail/index.js         # GET  /track-detail?slug=
│   ├── lesson-detail/index.js        # GET  /lesson-detail?slug=
│   ├── progress/index.js             # GET/POST /progress
│   ├── conversations/index.js        # GET  /conversations?userId=
│   └── conversation-messages/index.js# GET  /conversation-messages?conversationId=
│
├── lib/                     # Shared module (auxiliary, bukan route): db.js, http.js,
│                             # ai-gateway.js, sandbox-tools.js
├── db/schema.sql            # Skema Turso
├── scripts/seed.js          # Isi data contoh
└── edgeone.json             # Konfigurasi project EdgeOne Makers
```

**Kenapa dipisah `agents/` vs `cloud-functions/`?** Menurut dokumentasi resmi
(pages.edgeone.ai/document/agents), `context.sandbox` (eksekusi kode) hanya di-inject
di runtime `agents/` (session mode, sticky per `conversation_id`). Data materi/progress
yang sifatnya CRUD biasa cukup di `cloud-functions/` (request mode, stateless, auto-scale).

Setiap folder function di `agents/` dan `cloud-functions/` sengaja **hanya berisi satu
`index.js`** — konsisten dengan konvensi "route as a service" EdgeOne Node Functions:
route dibentuk dari path folder, dan `index.js` di dalam sebuah folder menjadi root path
folder tersebut (mis. `cloud-functions/tracks/index.js` → `/tracks`).

## Setup

### 1. Install dependency

```bash
npm install
```

### 2. Buat database Turso

```bash
turso db create codequest
turso db shell codequest < db/schema.sql
turso db show codequest --url
turso db tokens create codequest
```

Salin `.env.example` → `.env`, isi `TURSO_DATABASE_URL` dan `TURSO_AUTH_TOKEN`.

### 3. Isi data contoh materi

```bash
npm run seed
```

### 4. Ambil AI Gateway API Key

Buka **Makers Console → Models → API Key**, isi `AI_GATEWAY_API_KEY` di `.env`.
Model bawaan gratis (kuota terbatas): `@makers/deepseek-v4-flash`.

### 5. Jalankan lokal

Functions (agents + cloud-functions) dijalankan lewat EdgeOne CLI, frontend lewat Vite —
dua proses terpisah, sudah di-proxy otomatis lewat `vite.config.js`:

```bash
npm install -g edgeone
edgeone pages link      # hubungkan ke project Makers (untuk sandbox lokal)
edgeone pages dev       # jalankan functions di :8089
npm run dev             # jalankan frontend di :5173 (proxy ke :8089)
```

Buka `http://localhost:5173`.

> Catatan: `context.sandbox.runCode` (dipakai `/code-runner` dan tool `run_code` di AI Tutor)
> memerlukan project ter-link ke Makers (`edgeone pages link`) supaya sandbox lokal aktif.
> Signature persis parameter `runCode` sebaiknya dicek ulang di dokumentasi
> **Agents → Sandbox Tool → Sandbox Atomic API** karena detail API level ini bisa berubah
> antar rilis platform dan belum sempat saya verifikasi 100% saat proyek ini dibuat.

## Deploy

```bash
edgeone pages link
edgeone pages deploy
```

Atau pakai EdgeOne Makers Deploy Skill (jika pakai Claude Code / Cursor / CodeBuddy):

```
help me deploy this project to EdgeOne Makers
```

Set environment variables di **Makers Console → Project Settings → Environment Variables**:
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AI_GATEWAY_API_KEY` (biasanya auto-inject),
`AI_GATEWAY_BASE_URL`, `AI_GATEWAY_MODEL`.

## Alur fitur utama

1. **Materi (Home → Track → Lesson)** — dibaca dari Turso via `cloud-functions/*`.
2. **Sandbox "Run"** — `CodeRunner` component → `POST /code-runner` (agents/, tanpa LLM)
   → `context.sandbox.runCode`.
3. **AI Tutor (ChatWidget)** — `POST /tutor` (agents/, streaming SSE):
   - Riwayat & isi materi diambil dari Turso, dijadikan system prompt supaya jawaban
     nyambung dengan materi yang sedang dibuka murid.
   - Kalau murid minta kode dicek, model memanggil tool `run_code` → dieksekusi lewat
     `context.sandbox.runCode` → hasil dikirim balik ke murid & disimpan ke Turso.
   - Cancel: frontend `AbortController.abort()` memutus fetch, `context.request.signal`
     di server meneruskan sinyal itu ke request ke AI Gateway.
4. **Riwayat chat** — `cloud-functions/conversations` & `conversation-messages` membaca
   tabel `conversations`/`messages` di Turso (disimpan sendiri, sebagai alternatif yang
   lebih mudah di-query daripada bergantung bentuk objek `context.store` yang spesifik
   per-framework; platform juga menyediakan `context.store` bawaan bila ingin dipakai
   langsung — lihat dokumentasi **Agents → Conversation Storage**).

## Rujukan dokumentasi yang dipakai

- Pages Functions Overview — https://pages.edgeone.ai/document/pages-functions-overview
- Cloud Functions / Node.js — https://pages.edgeone.ai/document/node-functions
- Agents Overview — https://pages.edgeone.ai/document/agents
- Agent Authentication (contoh pola middleware, opsional untuk fitur login) —
  https://pages.edgeone.ai/document/agents-authentication
- edgeone.json — https://pages.edgeone.ai/document/edgeone-json

## TODO lanjutan (belum termasuk di scaffold ini)

- Autentikasi user sungguhan (saat ini pakai `userId` anonim di `localStorage`).
- Markdown renderer penuh (`react-markdown`) untuk `content_md`, saat ini masih renderer minimal.
- Editor kode yang lebih baik (Monaco/CodeMirror) menggantikan `<textarea>`.
- Validasi otomatis quest (bandingkan `stdout` sandbox dengan expected output).
