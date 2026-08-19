-- ============================================================
-- CodeQuest — Turso / libSQL schema
-- Arsitektur: users, tracks, lessons, exercises, quizzes,
-- progress, certificates, references, conversations, messages
-- ============================================================

PRAGMA foreign_keys = ON;

-- ---------- Users ----------
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  full_name     TEXT,                          -- nama lengkap utk sertifikat
  avatar_url    TEXT,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- ---------- Tracks (materi per bahasa: HTML, CSS, JS, ...) ----------
CREATE TABLE IF NOT EXISTS tracks (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,             -- 'html', 'css', ...
  name        TEXT NOT NULL,                    -- 'HTML'
  tagline     TEXT,
  color       TEXT,                             -- hex untuk bg section
  icon_svg    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- ---------- Lessons (sub menu sidebar per track) ----------
CREATE TABLE IF NOT EXISTS lessons (
  id            TEXT PRIMARY KEY,
  track_id      TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug          TEXT NOT NULL,                  -- 'html-introduction'
  title         TEXT NOT NULL,                  -- 'HTML Introduction'
  content_md    TEXT,
  example_code  TEXT,                           -- sample kode (JSON array / md block)
  lesson_group  TEXT,                           -- section sidebar W3Schools ('HTML Tutorial', ...)
  sort_order    INTEGER NOT NULL DEFAULT 0,
  UNIQUE (track_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_lessons_track ON lessons(track_id, sort_order);

-- ---------- Exercises ----------
CREATE TABLE IF NOT EXISTS exercises (
  id              TEXT PRIMARY KEY,
  track_id        TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  group_name      TEXT,                          -- 'Introduction', 'Basic', ...
  slug            TEXT NOT NULL,
  title           TEXT NOT NULL,
  prompt_md       TEXT,
  starter_code    TEXT,
  expected_output TEXT,
  difficulty      TEXT NOT NULL DEFAULT 'easy',  -- easy | medium | hard
  sort_order      INTEGER NOT NULL DEFAULT 0,
  UNIQUE (track_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_exercises_track ON exercises(track_id, sort_order);

-- ---------- Quizzes ----------
CREATE TABLE IF NOT EXISTS quizzes (
  id            TEXT PRIMARY KEY,
  track_id      TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  question      TEXT NOT NULL,
  options       TEXT NOT NULL,                  -- JSON array string
  answer_index  INTEGER NOT NULL,
  explanation   TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_quizzes_track ON quizzes(track_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_quizzes_track_question ON quizzes(track_id, question);

-- ---------- References ----------
CREATE TABLE IF NOT EXISTS reference_links (
  id            TEXT PRIMARY KEY,
  track_id      TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug          TEXT NOT NULL,
  title         TEXT NOT NULL,
  content_md    TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  UNIQUE (track_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_reference_links_track ON reference_links(track_id, sort_order);

-- ---------- User progress ----------
CREATE TABLE IF NOT EXISTS progress (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id      TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  lesson_id     TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  kind          TEXT NOT NULL DEFAULT 'lesson', -- lesson | exercise | quiz
  status        TEXT NOT NULL DEFAULT 'not_started', -- not_started | in_progress | completed
  score         INTEGER,                          -- untuk quiz/exercise
  completed_at  TEXT,
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE (user_id, kind, lesson_id)
);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id, track_id);

-- ---------- Certificates (digenerate AI dari Nama Lengkap + hasil quiz) ----------
CREATE TABLE IF NOT EXISTS certificates (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id      TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  full_name     TEXT,                          -- nama di sertifikat (snapshot)
  quiz_id       TEXT,                          -- quiz terakhir yang jadi dasar
  quiz_score    INTEGER,                        -- nilai kelulusan
  certificate_text TEXT,                       -- konten sertifikat hasil AI
  issued_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE (user_id, track_id)
);

-- ---------- AI Tutor conversations ----------
CREATE TABLE IF NOT EXISTS conversations (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT,
  lesson_id   TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id, created_at);

-- ---------- Chat messages ----------
CREATE TABLE IF NOT EXISTS messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role            TEXT NOT NULL,             -- user | assistant | tool
  content         TEXT NOT NULL,
  meta            TEXT,                      -- JSON (tool result, etc)
  created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at);

-- ---------- User stats (streak, XP) ----------
CREATE TABLE IF NOT EXISTS user_stats (
  user_id        TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  streak_current INTEGER NOT NULL DEFAULT 0,       -- streak berjalan (hari)
  streak_best    INTEGER NOT NULL DEFAULT 0,       -- streak terpanjang
  total_xp       INTEGER NOT NULL DEFAULT 0,
  lessons_done   INTEGER NOT NULL DEFAULT 0,
  exercises_done INTEGER NOT NULL DEFAULT 0,
  quizzes_done   INTEGER NOT NULL DEFAULT 0,
  certs_done     INTEGER NOT NULL DEFAULT 0,
  last_active_at TEXT,                              -- untuk hitung streak harian
  created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- ---------- Daily activity (untuk streak & rekap harian) ----------
CREATE TABLE IF NOT EXISTS daily_activity (
  user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day             TEXT NOT NULL,                -- 'YYYY-MM-DD'
  xp_earned       INTEGER NOT NULL DEFAULT 0,
  completed_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user ON daily_activity(user_id, day);

-- ---------- Achievements (master badge) ----------
CREATE TABLE IF NOT EXISTS achievements (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,                    -- 'First Streak'
  description TEXT,
  icon_svg    TEXT,
  xp_reward   INTEGER NOT NULL DEFAULT 0
);

-- ---------- User achievements (badge yang diraih user) ----------
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY (user_id, achievement_id)
);