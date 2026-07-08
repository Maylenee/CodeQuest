const BASE = import.meta.env.DEV
  ? "/api"
  : "/api";

async function cf(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

function qs(params: Record<string, string>) {
  return "?" + new URLSearchParams(params).toString();
}

// Seed
export const seedInit = () => cf("/seed/init", { method: "POST" });
export const seedGet = () => cf("/seed/get");

// User
export const userInit = (data: {
  id: string;
  name?: string;
  email?: string;
  selectedTrack?: string;
  dailyTarget?: number;
}) => cf("/user/init", { method: "POST", body: JSON.stringify(data) });

export const userGet = (id: string) => cf(`/user/get${qs({ id })}`);

export const userStreak = (id: string) =>
  cf("/user/streak", { method: "POST", body: JSON.stringify({ id }) });

// Progress
export const progressUpdate = (data: {
  userId: string;
  lessonId: string;
  status: string;
  score?: number;
  xpReward?: number;
}) => cf("/progress/update", { method: "POST", body: JSON.stringify(data) });

// Submissions
export const submissionCreate = (data: {
  userId: string;
  questionId: string;
  code: string;
  result: any;
  score: number;
}) => cf("/submissions/create", { method: "POST", body: JSON.stringify(data) });

// Leaderboard
export const leaderboardGet = () => cf("/leaderboard/get");

// Questions
export const questionsGet = (lessonId: string) =>
  cf(`/questions/get${qs({ lessonId })}`);

export const questionVerify = (data: { questionId: string; answer: any }) =>
  cf("/questions/verify", { method: "POST", body: JSON.stringify(data) });

// Chat history
export const chatHistoryGet = (userId: string, lessonId: string) =>
  cf("/chat-history", {
    method: "POST",
    body: JSON.stringify({ userId, lessonId }),
  });

export const chatHistorySave = (
  userId: string,
  lessonId: string,
  messages: any[]
) =>
  cf("/chat-history", {
    method: "POST",
    body: JSON.stringify({ userId, lessonId, messages }),
  });
