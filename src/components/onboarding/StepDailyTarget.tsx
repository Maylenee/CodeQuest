import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Coffee, Zap, Target, Rocket } from "lucide-react";

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
      <h2 className="text-xl font-bold text-center mb-2">Berapa lama target belajar harianmu?</h2>
      <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Kamu bisa ubah kapan aja</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {targets.map((t) => {
          const Icon = t.icon;
          return (
            <Card
              key={t.id}
              hover
              selected={dailyTarget === t.id}
              onClick={() => setDailyTarget(t.id)}
              className="flex flex-col items-center text-center p-6"
            >
              <Icon className="w-8 h-8 mb-2" style={{ color: dailyTarget === t.id ? "var(--color-primary)" : "var(--color-text-muted)" }} />
              <span className="text-lg font-bold">{t.desc}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{t.label}</span>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!dailyTarget} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
