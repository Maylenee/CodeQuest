import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Monitor, Brain, Flame } from "lucide-react";
import "./Onboarding.css";

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
      <h2 className="step-title">Ini yang bisa kamu capai</h2>
      <p className="step-sub">Dengan konsisten belajar, kamu akan...</p>
      <div className="sel-grid sel-grid--single" style={{ marginBottom: 32 }}>
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="highlight-card">
              <div className="highlight-icon" style={{ backgroundColor: `${p.color}20` }}>
                <Icon style={{ color: p.color }} />
              </div>
              <div className="highlight-info">
                <h3 className="highlight-title">{p.title}</h3>
                <p className="highlight-desc">{p.desc}</p>
              </div>
              <span className="highlight-check">✓</span>
            </div>
          );
        })}
      </div>
      <Button fullWidth onClick={nextStep}>LANJUTKAN</Button>
    </div>
  );
}
