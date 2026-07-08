# CodeQuest

Platform pembelajaran coding interaktif berbasis game — belajar Python & JavaScript melalui pelajaran interaktif, misi harian, dan pelacakan kemajuan. Dibangun dengan React + Vite + TypeScript, didukung backend EdgeOne Cloud Functions (Python).

## Ikhtisar

CodeQuest membantu pemula belajar coding melalui pelajaran interaktif yang ringkas dengan mekanisme gamifikasi:

- **Pelajaran Interaktif** — Pilihan ganda, isian singkat, tebak output, cari bug, menulis kode, dan drag-drop
- **Dua Jalur Belajar** — Python dan JavaScript, masing-masing dengan jalur pembelajaran terstruktur
- **Progresi Gamifikasi** — XP, level, streak, hati (nyawa), koin permata, league, dan target harian
- **Misi Harian** — Tantangan coding harian untuk membangun streak
- **Papan Peringkat** — Bersaing dengan pembelajar lain
- **Asisten AI** — Riwayat chat per pelajaran untuk petunjuk/penjelasan
- **Alur Onboarding** — Pemilihan jalur personal, penilaian kemampuan, target harian, dan notifikasi

## Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| State Management | Zustand |
| Styling | Tailwind CSS v4 + CSS Variables |
| Backend | EdgeOne Cloud Functions (Python) |
| Database | EdgeOne KV / D1 (via cloud functions) |
| Deployment | EdgeOne Pages / Makers |
| AI | OpenAI-compatible LLM via AI Gateway |

## Struktur Proyek

```
CodeQuest/
├── cloud-functions/              # EdgeOne Python cloud functions
│   ├── user/                     # Inisialisasi, get, streak pengguna
│   ├── progress/                 # Update kemajuan
│   ├── submissions/              # Pengiriman kode
│   ├── questions/                # Ambil & verifikasi soal
│   ├── leaderboard/              # Papan peringkat
│   ├── chat-history/             # Riwayat chat per pelajaran
│   ├── history/                  # Riwayat
│   └── seed/                     # Seeding database
├── public/prepare-rag/           # Persiapan data RAG (legacy)
├── src/
│   ├── api.ts                    # Klien API cloud functions
│   ├── App.tsx                   # Routing aplikasi (selection -> survey -> learn)
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles (Tailwind + custom theme)
│   ├── lib/
│   │   ├── store.ts              # Zustand store (onboarding + game state)
│   │   ├── types.ts              # TypeScript types
│   │   └── utils.ts              # Fungsi utilitas
│   └── components/
│       ├── ui/                   # Komponen reusable (Button, Card, Modal, ProgressBar, Mascot, Confetti)
│       ├── onboarding/           # Alur onboarding (SelectionScreen, SurveyFlow, steps)
│       ├── learn/                # Halaman belajar (LearnPage, LearningPath, DailyMissions, Sidebar, StatusBar)
│       └── questions/            # Komponen soal (MCQ, FillBlank, PredictOutput, LessonPage)
├── edgeone.json                  # Konfigurasi EdgeOne
├── vite.config.ts                # Konfigurasi Vite + Tailwind
└── package.json
```

## Memulai

### Prasyarat

- Node.js >= 18
- Python >= 3.10 (untuk cloud functions)
- EdgeOne CLI: `npm i -g edgeone`

### Pengembangan Lokal

```bash
# Install dependensi frontend
npm install

# Install dependensi cloud functions
pip install -r cloud-functions/requirements.txt

# Copy environment variables
cp .env.example .env
# Isi AI_GATEWAY_API_KEY dan AI_GATEWAY_BASE_URL

# Jalankan dev server (frontend saja)
npm run dev

# Atau dengan cloud functions
edgeone pages dev
```

### Environment Variables

| Variable | Wajib | Deskripsi |
|----------|-------|-----------|
| `AI_GATEWAY_API_KEY` | Ya | API key untuk LLM (OpenAI-compatible) |
| `AI_GATEWAY_BASE_URL` | Ya | Base URL endpoint LLM |
| `AI_GATEWAY_MODEL` | Tidak | Nama model (default: `@makers/deepseek-v4-flash`) |

## Cloud Functions

Setiap folder di `cloud-functions/` adalah EdgeOne Function (Python) terpisah:

| Fungsi | Route | Tujuan |
|--------|-------|--------|
| `user/init` | POST `/user/init` | Inisialisasi pengguna baru |
| `user/get` | GET `/user/get` | Ambil profil pengguna |
| `user/streak` | POST `/user/streak` | Update streak |
| `progress/update` | POST `/progress/update` | Update kemajuan pelajaran |
| `submissions/create` | POST `/submissions/create` | Simpan submission kode |
| `questions/get` | GET `/questions/get` | Ambil soal untuk pelajaran |
| `questions/verify` | POST `/questions/verify` | Verifikasi jawaban |
| `leaderboard/get` | GET `/leaderboard/get` | Ambil papan peringkat |
| `chat-history` | POST `/chat-history` | Ambil/simpan riwayat chat |
| `seed/init` | POST `/seed/init` | Seed database |
| `seed/get` | GET `/seed/get` | Ambil data seed |

## Fitur

### Jalur Belajar
- **Python** — Variabel, perulangan, fungsi, struktur data, OOP, modul
- **JavaScript** — Variabel, fungsi, DOM, async, ES6+, dasar framework

### Tipe Soal
| Tipe | Komponen | Deskripsi |
|------|----------|-----------|
| `mcq` | `MultipleChoice.tsx` | Pilihan ganda (satu/banyak) |
| `fill_blank` | `FillBlank.tsx` | Isian singkat kode |
| `predict_output` | `PredictOutput.tsx` | Tebak output kode |
| `spot_bug` | `SpotBug.tsx` | Cari bug pada kode |
| `write_code` | `WriteCode.tsx` | Tulis kode dari awal |
| `drag_drop` | `DragDrop.tsx` | Drag & drop urutan baris kode |
| `refactor` | `Refactor.tsx` | Refaktor kode |

### Gamifikasi
- **XP & Level** — Dapatkan XP tiap menjawab soal, naik level
- **Streak** — Login streak harian dengan hadiah
- **Hearts** — Sistem nyawa (berkurang jika salah menjawab)
- **Gems** — Mata uang untuk petunjuk/toko
- **Leagues** — Papan peringkat mingguan (Bronze -> Diamond)
- **Daily Target** — Target XP harian yang ditentukan pengguna
- **Daily Missions** — 3 misi harian untuk bonus

### Alur Onboarding
- **Pemilihan Jalur** — Pilih Python atau JavaScript
- **Survey Awal** — Sumber referral, motivasi, tingkat kemampuan
- **Target Harian** — Tentukan target belajar harian
- **Notifikasi** — Izin notifikasi pengingat belajar
- **Tes Penempatan** — Opsi placement test atau mulai dari dasar

## Deployment

```bash
# Build frontend
npm run build

# Deploy ke EdgeOne Pages
edgeone pages deploy dist
```

Cloud Functions deploy otomatis dengan `edgeone makers deploy` atau melalui dashboard EdgeOne.

## Lisensi

MIT
