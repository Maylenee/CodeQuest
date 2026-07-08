import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Briefcase, GraduationCap, HeartHandshake, Laptop, Trophy, MoreHorizontal } from "lucide-react";

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
      <h2 className="text-xl font-bold text-center mb-6">Kenapa kamu mau belajar coding?</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {motivations.map((m) => {
          const Icon = m.icon;
          return (
            <Card
              key={m.id}
              hover
              selected={motivation === m.id}
              onClick={() => setMotivation(m.id)}
              className="flex items-center gap-3 p-4"
            >
              <Icon className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
              <span className="text-sm font-semibold">{m.label}</span>
              {motivation === m.id && (
                <span className="ml-auto text-[var(--color-primary)] text-lg">✓</span>
              )}
            </Card>
          );
        })}
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!motivation} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
