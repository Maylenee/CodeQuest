import { create } from "zustand";

interface OnboardingState {
  step: number;
  selectedTrack: string | null;
  referralSource: string | null;
  motivation: string | null;
  skillLevel: number | null;
  dailyTarget: number | null;
  notificationPermission: boolean | null;
  startingPoint: "beginner" | "placement" | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedTrack: (track: string) => void;
  setReferralSource: (source: string) => void;
  setMotivation: (motivation: string) => void;
  setSkillLevel: (level: number) => void;
  setDailyTarget: (minutes: number) => void;
  setNotificationPermission: (allowed: boolean) => void;
  setStartingPoint: (point: "beginner" | "placement") => void;
  reset: () => void;
}

const initialOnboarding = {
  step: 0,
  selectedTrack: null,
  referralSource: null,
  motivation: null,
  skillLevel: null,
  dailyTarget: null,
  notificationPermission: null,
  startingPoint: null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialOnboarding,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  setSelectedTrack: (track) => set({ selectedTrack: track }),
  setReferralSource: (source) => set({ referralSource: source }),
  setMotivation: (motivation) => set({ motivation }),
  setSkillLevel: (level) => set({ skillLevel: level }),
  setDailyTarget: (minutes) => set({ dailyTarget: minutes }),
  setNotificationPermission: (allowed) => set({ notificationPermission: allowed }),
  setStartingPoint: (point) => set({ startingPoint: point }),
  reset: () => set(initialOnboarding),
}));

interface GameState {
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  gems: number;
  league: string;
  showConfetti: boolean;
  userId: string;
  userName: string;
  setXp: (xp: number) => void;
  addXp: (amount: number) => void;
  setLevel: (level: number) => void;
  setStreak: (streak: number) => void;
  setHearts: (hearts: number) => void;
  setGems: (gems: number) => void;
  setLeague: (league: string) => void;
  setShowConfetti: (show: boolean) => void;
  setUserId: (id: string) => void;
  setUserName: (name: string) => void;
  loadFromUser: (user: any) => void;
}

export const useGameStore = create<GameState>((set) => ({
  xp: 0,
  level: 1,
  streak: 0,
  hearts: 5,
  gems: 0,
  league: "bronze",
  showConfetti: false,
  userId: "user-default",
  userName: "Pengguna",
  setXp: (xp) => set({ xp }),
  addXp: (amount) => set((s) => ({ xp: s.xp + amount })),
  setLevel: (level) => set({ level }),
  setStreak: (streak) => set({ streak }),
  setHearts: (hearts) => set({ hearts }),
  setGems: (gems) => set({ gems }),
  setLeague: (league) => set({ league }),
  setShowConfetti: (show) => set({ showConfetti: show }),
  setUserId: (id) => set({ userId: id }),
  setUserName: (name) => set({ userName: name }),
  loadFromUser: (user) =>
    set({
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
      hearts: user.hearts || 5,
      gems: user.gems || 0,
      league: user.league || "bronze",
      userId: user.id || "user-default",
      userName: user.name || "Pengguna",
    }),
}));
