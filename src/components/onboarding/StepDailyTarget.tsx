import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Coffee, Zap, Target, Rocket } from "lucide-react";
import "./Onboarding.css";

const targets = [
  { id: 10, label: "Santai", icon: Coffee, desc: "10 menit" },
  { id: 20, label: "Biasa", icon: Zap, desc: "20 menit" },
  { id: 30, label: "Serius", icon: Target, desc: "30 menit" },
  { id: 45, label: "Intensif", icon: Rocket, desc: "45 menit" },
];

export function StepDailyTarget() {
  const { dailyTarget, setDailyTarget, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="step-title">Berapa lama target belajar harianmu?</h2>
      <p className="step-sub">Kamu bisa ubah kapan aja</p>
      <div className="target-grid">
        {targets.map((t) => {
          const Icon = t.icon;
          const sel = dailyTarget === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setDailyTarget(t.id)}
              className="sel-card sel-card--center"
              style={sel ? { borderColor: "var(--color-primary)", background: "var(--color-primary-light)" } : {}}
            >
              <Icon className="sel-card-icon" style={{ color: sel ? "var(--color-primary)" : "var(--color-text-muted)" }} />
              <span className="text-lg font-bold">{t.desc}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{t.label}</span>
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!dailyTarget} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
