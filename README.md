# CodeQuest

A gamified coding learning platform — interactive lessons, daily missions, and progress tracking for Python & JavaScript. Built with React + Vite + TypeScript, backed by EdgeOne cloud functions (Python).

## Overview

CodeQuest helps beginners learn programming through interactive, bite-sized lessons with gamification:

- **Interactive Lessons** — Multiple choice, fill-in-the-blank, predict output, spot the bug, write code, and drag-drop questions
- **Two Learning Tracks** — Python and JavaScript, each with structured learning paths
- **Gamified Progression** — XP, levels, streaks, hearts (lives), gems, leagues, and daily targets
- **Daily Missions** — Daily coding challenges to build streaks
- **Leaderboards** — Compete with other learners
- **AI Chat Assistant** — Chat history per lesson for hints/explanations
- **Onboarding Flow** — Personalized track selection, skill assessment, daily targets, and notifications

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React 18 + TypeScript + Vite |
| State | Zustand |
| Styling | CSS Variables + CSS Modules |
| Backend | EdgeOne Cloud Functions (Python) |
| Database | EdgeOne KV / D1 (via cloud functions) |
| Deployment | EdgeOne Pages / Makers |

## Project Structure

```
CodeQuest/
├── cloud-functions/              # EdgeOne Python cloud functions
│   ├── user/                     # User init, get, streak
│   ├── progress/                 # Progress updates
│   ├── submissions/              # Code submissions
│   ├── questions/                # Question fetching & verification
│   ├── leaderboard/              # Leaderboard
│   ├── chat-history/             # Chat history per lesson
│   ├── history/                  # History
│   └── seed/                     # Database seeding
├── public/prepare-rag/           # RAG data prep (legacy/unused)
├── src/
│   ├── api.ts                    # Cloud function API client
│   ├── App.tsx                   # App routing (selection → survey → learn)
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles (CSS variables)
│   ├── lib/
│   │   ├── store.ts              # Zustand store (user, progress, UI state)
│   │   ├── types.ts              # TypeScript types (UserData, Question, LessonNode)
│   │   └── utils.ts              # Utilities
│   └── components/
│       ├── ui/                   # Reusable UI (Button, Card, Modal, ProgressBar, Mascot, Confetti)
│       ├── onboarding/           # Onboarding flow (SelectionScreen, SurveyFlow, steps)
│       ├── learn/                # Learning pages (LearnPage, LearningPath, DailyMissions, Sidebar, StatusBar)
│       └── questions/            # Question components (MCQ, FillBlank, PredictOutput, LessonPage)
├── agents/                       # Legacy RAG agent (unused)
├── edgeone.json                  # EdgeOne config
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10 (for cloud functions)
- EdgeOne CLI: `npm i -g edgeone`

### Local Development

```bash
# Install frontend deps
npm install

# Install cloud function deps
pip install -r cloud-functions/requirements.txt  # if exists, or per-function

# Copy env and configure
cp .env.example .env
# Fill in EdgeOne credentials

# Start dev server (frontend + cloud functions)
edgeone pages dev
```

Or run frontend only:

```bash
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `EDGEONE_API_TOKEN` | Yes | EdgeOne API token for cloud function deployment |
| `EDGEONE_PROJECT_NAME` | Yes | EdgeOne project name |

## Cloud Functions

Each folder under `cloud-functions/` is a separate EdgeOne Function (Python):

| Function | Route | Purpose |
|----------|-------|---------|
| `user/init` | POST `/user/init` | Initialize new user |
| `user/get` | GET `/user/get` | Get user profile |
| `user/streak` | POST `/user/streak` | Update streak |
| `progress/update` | POST `/progress/update` | Update lesson progress |
| `submissions/create` | POST `/submissions/create` | Save code submission |
| `questions/get` | GET `/questions/get` | Fetch questions for lesson |
| `questions/verify` | POST `/questions/verify` | Verify answer |
| `leaderboard/get` | GET `/leaderboard/get` | Get leaderboard |
| `chat-history` | POST `/chat-history` | Get/save chat history |
| `seed/init` | POST `/seed/init` | Seed database |
| `seed/get` | GET `/seed/get` | Get seed data |

## Features Overview

### Learning Tracks
- **Python** — Variables, loops, functions, data structures, OOP, modules
- **JavaScript** — Variables, functions, DOM, async, ES6+, frameworks basics

### Question Types
| Type | Component | Description |
|------|-----------|-------------|
| `mcq` | `MultipleChoice.tsx` | Single/multiple choice |
| `fill_blank` | `FillBlank.tsx` | Fill in code blanks |
| `predict_output` | `PredictOutput.tsx` | Predict code output |
| `spot_bug` | *(planned)* | Find the bug |
| `write_code` | *(planned)* | Write code from scratch |
| `drag_drop` | *(planned)* | Drag & drop code blocks |
| `refactor` | *(planned)* | Refactor code |

### Gamification
- **XP & Levels** — Earn XP per question, level up
- **Streaks** — Daily login streaks with rewards
- **Hearts** — Lives system (lose on wrong answer)
- **Gems** — Currency for hints/shop
- **Leagues** — Weekly leaderboards (Bronze → Diamond)
- **Daily Target** — User-set daily XP goal
- **Daily Missions** — 3 daily tasks for bonus rewards

## Deployment

```bash
# Build frontend
npm run build

# Deploy to EdgeOne Pages
edgeone pages deploy dist
```

Cloud functions deploy automatically with `edgeone makers deploy` or via the EdgeOne dashboard.

## Script / Makers console.

## License

MIT