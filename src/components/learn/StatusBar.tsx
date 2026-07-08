import { ProgressBar } from "../ui/ProgressBar";

interface StatusBarProps {
  xp: number;
  level: number;
  streak: number;
  hearts: number;
}

export function StatusBar({ xp, level, streak, hearts }: StatusBarProps) {
  const xpInLevel = xp % 100;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
            <span className="text-[var(--color-primary)] font-bold text-sm">{level}</span>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Level</p>
            <p className="font-bold text-sm">{xp} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[var(--color-accent-red)] text-lg">❤️</span>
          <span className="font-bold text-sm">{hearts}</span>
        </div>
      </div>
      <ProgressBar value={xpInLevel} max={100} showLabel className="mb-3" />
      <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] rounded-lg px-3 py-2">
        <span className="text-lg">🔥</span>
        <span className="font-bold text-sm">{streak} hari streak</span>
      </div>
    </div>
  );
}
