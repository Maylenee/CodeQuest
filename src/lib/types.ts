export interface QuestionContent {
  options?: string[];
  starterCode?: string;
  correctAnswer?: number | string;
  blanks?: { id: string; answer: string }[];
  codeLines?: string[];
  bugLines?: number[];
  expectedOutput?: string;
  hints?: string[];
  solution?: string;
  code?: string;
}

export interface Question {
  id: string;
  type: "mcq" | "fill_blank" | "drag_drop" | "spot_bug" | "write_code" | "predict_output" | "refactor";
  prompt: string;
  content: QuestionContent;
  xpReward: number;
}

export interface LessonNode {
  id: string;
  title: string;
  order: number;
  status: "locked" | "in_progress" | "completed";
  isProject: boolean;
  type?: "lesson" | "project" | "bonus" | "milestone";
  questions?: Question[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  selectedTrack: string;
  dailyTarget: number;
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  gems: number;
  league: string;
  onboardingComplete: boolean;
}
