import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Briefcase, GraduationCap, HeartHandshake, Laptop, Trophy, MoreHorizontal } from "lucide-react";
import "./Onboarding.css";

const motivations = [
  { id: "karier", label: "Karier/Pekerjaan", icon: Briefcase },
  { id: "kuliah", label: "Tugas Kuliah", icon: GraduationCap },
  { id: "hobi", label: "Hobi/Proyek Pribadi", icon: HeartHandshake },
  { id: "freelance", label: "Freelance", icon: Laptop },
  { id: "lomba", label: "Persiapan Lomba", icon: Trophy },
  { id: "lainnya", label: "Lainnya", icon: MoreHorizontal },
];

export function StepMotivation() {
  const { motivation, setMotivation, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="step-title">Kenapa kamu mau belajar coding?</h2>
      <div className="sel-grid">
        {motivations.map((m) => {
          const Icon = m.icon;
          const sel = motivation === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMotivation(m.id)}
              className={`sel-card ${sel ? "sel-card--selected" : ""}`}
            >
              <Icon className={`sel-card-icon ${sel ? "sel-card-icon--selected" : ""}`} />
              <span className="sel-card-label">{m.label}</span>
              {sel && <span className="sel-card-check">✓</span>}
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!motivation} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
