# CodeQuest

一个游戏化的编程学习平台 —— 面向 Python 与 JavaScript 的互动课程、每日任务与进度追踪。基于 React + Vite + TypeScript，后端使用 EdgeOne 云函数。

## 概述

CodeQuest 通过互动、小步快跑的课程和游戏化机制帮助初学者学编程：

- **互动课程** — 单选/多选、填空、预测输出、找 Bug、编写代码、拖拽排序等题型
- **双学习赛道** — Python 与 JavaScript，各自拥有结构化学习路径
- **游戏化进阶** — XP、等级、连胜、生命值（爱心）、宝石、段位、每日目标
- **每日任务** — 每日编程挑战，建立学习连胜
- **排行榜** — 与其他学习者竞争
- **AI 聊天助手** — 每节课专属聊天历史，用于提问/获取提示
- **引导流程** — 个性化赛道选择、技能评估、每日目标、通知设置

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 18 + TypeScript + Vite |
| 状态管理 | Zustand |
| 样式 | CSS Variables + CSS Modules |
| 后端 | EdgeOne 云函数 |
| 数据库 | EdgeOne KV / D1（通过云函数） |
| 部署 | EdgeOne Pages / Makers |

## 项目结构

```
CodeQuest/
├── cloud-functions/              # EdgeOne Python 云函数
│   ├── user/                     # 用户初始化、获取、连胜
│   ├── progress/                 # 进度更新
│   ├── submissions/              # 代码提交
│   ├── questions/                # 题目获取与验证
│   ├── leaderboard/              # 排行榜
│   ├── chat-history/             # 每课聊天历史
│   ├── history/                  # 历史记录
│   └── seed/                     # 数据库种子
├── public/prepare-rag/           # RAG 数据预处理（旧版/未使用）
├── src/
│   ├── api.ts                    # 云函数 API 客户端
│   ├── App.tsx                   # 应用路由（选择 → 问卷 → 学习）
│   ├── main.tsx                  # 入口
│   ├── index.css                 # 全局样式（CSS 变量）
│   ├── lib/
│   │   ├── store.ts              # Zustand store（用户、进度、UI 状态）
│   │   ├── types.ts              # TS 类型（UserData, Question, LessonNode）
│   │   └── utils.ts              # 工具函数
│   └── components/
│       ├── ui/                   # 通用 UI（Button, Card, Modal, ProgressBar, Mascot, Confetti）
│       ├── onboarding/           # 引导流程（SelectionScreen, SurveyFlow, 各步骤）
│       ├── learn/                # 学习页面（LearnPage, LearningPath, DailyMissions, Sidebar, StatusBar）
│       └── questions/            # 题目组件（MCQ, FillBlank, PredictOutput, LessonPage）
├── agents/                       # 旧版 RAG Agent（未使用）
├── edgeone.json                  # EdgeOne 配置
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 快速开始

### 前置依赖

- Node.js ≥ 18
- Python ≥ 3.10（云函数用）
- EdgeOne CLI：`npm i -g edgeone`

### 本地开发

```bash
# 安装前端依赖
npm install

# 安装云函数依赖
pip install -r cloud-functions/requirements.txt  # 若存在，或各函数单独安装

# 复制环境变量并配置
cp .env.example .env
# 填入 EdgeOne 凭证

# 启动开发服务器（前端 + 云函数）
edgeone pages dev
```

或仅运行前端：

```bash
npm run dev
```

### 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `EDGEONE_API_TOKEN` | 是 | EdgeOne API Token，用于云函数部署 |
| `EDGEONE_PROJECT_NAME` | 是 | EdgeOne 项目名称 |

## 云函数

`cloud-functions/` 下每个文件夹是一个独立的 EdgeOne Function（Python）：

| 函数 | 路由 | 用途 |
|------|------|------|
| `user/init` | POST `/user/init` | 初始化新用户 |
| `user/get` | GET `/user/get` | 获取用户档案 |
| `user/streak` | POST `/user/streak` | 更新连胜 |
| `progress/update` | POST `/progress/update` | 更新课程进度 |
| `submissions/create` | POST `/submissions/create` | 保存代码提交 |
| `questions/get` | GET `/questions/get` | 获取课程题目 |
| `questions/verify` | POST `/questions/verify` | 验证答案 |
| `leaderboard/get` | GET `/leaderboard/get` | 获取排行榜 |
| `chat-history` | POST `/chat-history` | 获取/保存聊天历史 |
| `seed/init` | POST `/seed/init` | 初始化种子数据 |
| `seed/get` | GET `/seed/get` | 获取种子数据 |

## 功能概览

### 学习赛道
- **Python** — 变量、循环、函数、数据结构、面向对象、模块
- **JavaScript** — 变量、函数、DOM、异步、ES6+、框架基础

### 题目类型
| 类型 | 组件 | 说明 |
|------|------|------|
| `mcq` | `MultipleChoice.tsx` | 单选/多选 |
| `fill_blank` | `FillBlank.tsx` | 代码填空 |
| `predict_output` | `PredictOutput.tsx` | 预测代码输出 |
| `spot_bug` | *(规划中)* | 找 Bug |
| `write_code` | *(规划中)* | 从零编写代码 |
| `drag_drop` | *(规划中)* | 拖拽代码块排序 |
| `refactor` | *(规划中)* | 代码重构 |

### 游戏化机制
- **XP 与等级** — 答题得 XP，升级
- **连胜** — 每日登录连胜，有奖励
- **生命值** — 答错扣心，耗尽需等待/用宝石恢复
- **宝石** — 货币，可买提示/商店道具
- **段位** — 周排行榜段位（青铜 → 钻石）
- **每日目标** — 用户自定义每日 XP 目标
- **每日任务** — 每日 3 个任务，完成得额外奖励

## 部署

```bash
# 构建前端
npm run build

# 部署到 EdgeOne Pages
edgeone pages deploy dist
```

云函数随 `edgeone makers deploy` 自动部署，或在 EdgeOne 控制台手动部署。

## 许可证

MIT