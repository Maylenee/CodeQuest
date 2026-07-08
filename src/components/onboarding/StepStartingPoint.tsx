import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Compass, ClipboardCheck } from "lucide-react";

export function StepStartingPoint() {
  const { startingPoint, setStartingPoint, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-2">Pilih Awal Perjalananmu</h2>
      <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Mau mulai dari mana?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card hover selected={startingPoint === "beginner"} onClick={() => setStartingPoint("beginner")} className="flex flex-col items-center text-center p-6">
          <Compass className="w-12 h-12 mb-3 text-[var(--color-primary)]" />
          <h3 className="font-bold text-base mb-1">Mulai dari awal</h3>
          <p className="text-xs text-[var(--color-text-muted)]">Ambil materi paling dasar dari track yang dipilih</p>
        </Card>
        <Card hover selected={startingPoint === "placement"} onClick={() => setStartingPoint("placement")} className="flex flex-col items-center text-center p-6">
          <ClipboardCheck className="w-12 h-12 mb-3 text-[var(--color-secondary)]" />
          <h3 className="font-bold text-base mb-1">Tes Penempatan</h3>
          <p className="text-xs text-[var(--color-text-muted)]">Kerjain beberapa soal, sistem tentuin level mulai otomatis</p>
        </Card>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!startingPoint} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
