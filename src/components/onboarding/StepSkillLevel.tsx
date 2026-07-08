import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const levels = [
  { id: 1, label: "Belum pernah coding sama sekali", bars: 1 },
  { id: 2, label: "Tahu syntax dasar (variabel, if-else, loop)", bars: 2 },
  { id: 3, label: "Bisa bikin program sederhana", bars: 3 },
  { id: 4, label: "Bisa bikin project kecil end-to-end", bars: 4 },
  { id: 5, label: "Udah lumayan jago, mau perdalam konsep spesifik", bars: 5 },
];

export function StepSkillLevel() {
  const { skillLevel, setSkillLevel, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">Seberapa jauh kemampuan codingmu sekarang?</h2>
      <div className="flex flex-col gap-2 mb-6">
        {levels.map((lvl) => (
          <Card
            key={lvl.id}
            hover
            selected={skillLevel === lvl.id}
            onClick={() => setSkillLevel(lvl.id)}
            className="flex items-center gap-4 p-4"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-2 rounded-full transition-colors ${i < lvl.bars ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold flex-1">{lvl.label}</span>
            {skillLevel === lvl.id && (
              <span className="text-[var(--color-primary)] text-lg">✓</span>
            )}
          </Card>
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!skillLevel} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
