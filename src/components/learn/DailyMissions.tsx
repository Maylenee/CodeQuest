import { ProgressBar } from "../ui/ProgressBar";
import { Target, Zap, Trophy } from "lucide-react";

const missions = [
  { icon: Zap, label: "Selesaikan 3 soal", progress: 1, total: 3, xp: 20 },
  { icon: Target, label: "Streak 1 hari", progress: 1, total: 1, xp: 15 },
  { icon: Trophy, label: "Dapatkan 50 XP", progress: 30, total: 50, xp: 30 },
];

export function DailyMissions() {
  return (
    <div>
      <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Misi Harian</h3>
      <div className="flex flex-col gap-2">
        {missions.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-[var(--color-bg-primary)] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-[var(--color-accent-yellow)]" />
                <span className="text-xs font-semibold flex-1">{m.label}</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">+{m.xp} XP</span>
              </div>
              <ProgressBar value={m.progress} max={m.total} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
