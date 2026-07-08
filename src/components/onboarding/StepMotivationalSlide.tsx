import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Monitor, Brain, Flame, CheckCircle2 } from "lucide-react";

const points = [
  {
    icon: Monitor,
    title: "Coding dengan percaya diri",
    desc: "Latihan langsung di browser, real-time feedback",
    color: "#1CB0F6",
  },
  {
    icon: Brain,
    title: "Menguasai logika pemrograman",
    desc: "Dari dasar sampai problem solving",
    color: "#CE82FF",
  },
  {
    icon: Flame,
    title: "Bangun kebiasaan ngoding harian",
    desc: "Streak, reminder, tantangan seru",
    color: "#FF9600",
  },
];

export function StepMotivationalSlide() {
  const { nextStep } = useOnboardingStore();

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">Ini yang bisa kamu capai</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Dengan konsisten belajar, kamu akan...
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="flex items-start gap-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 text-left">
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${p.color}20` }}>
                <Icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div>
                <h3 className="font-bold text-sm">{p.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{p.desc}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] ml-auto shrink-0" />
            </div>
          );
        })}
      </div>
      <Button fullWidth onClick={nextStep}>LANJUTKAN</Button>
    </div>
  );
}
