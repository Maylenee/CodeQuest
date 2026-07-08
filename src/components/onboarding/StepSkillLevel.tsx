import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import "./Onboarding.css";

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
      <h2 className="step-title">Seberapa jauh kemampuan codingmu sekarang?</h2>
      <div className="sel-grid sel-grid--single">
        {levels.map((lvl) => {
          const sel = skillLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSkillLevel(lvl.id)}
              className={`sel-card ${sel ? "sel-card--selected" : ""}`}
            >
              <div className="skill-bars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`skill-bar ${i < lvl.bars ? "skill-bar--filled" : "skill-bar--empty"}`} />
                ))}
              </div>
              <span className="sel-card-label">{lvl.label}</span>
              {sel && <span className="sel-card-check">✓</span>}
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!skillLevel} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
