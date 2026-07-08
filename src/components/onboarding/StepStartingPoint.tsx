import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Compass, ClipboardCheck } from "lucide-react";
import "./Onboarding.css";

export function StepStartingPoint() {
  const { startingPoint, setStartingPoint, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="step-title">Pilih Awal Perjalananmu</h2>
      <p className="step-sub">Mau mulai dari mana?</p>
      <div className="start-grid">
        <button
          onClick={() => setStartingPoint("beginner")}
          className={`start-card ${startingPoint === "beginner" ? "start-card--selected" : ""}`}
        >
          <Compass className="w-12 h-12 mb-3 text-[var(--color-primary)]" />
          <h3 className="start-card-title start-card-title--beginner">Mulai dari awal</h3>
          <p className="start-card-desc">Ambil materi paling dasar dari track yang dipilih</p>
        </button>
        <button
          onClick={() => setStartingPoint("placement")}
          className={`start-card start-card--placement ${startingPoint === "placement" ? "start-card--selected" : ""}`}
        >
          <ClipboardCheck className="w-12 h-12 mb-3 text-[var(--color-secondary)]" />
          <h3 className="start-card-title start-card-title--placement">Tes Penempatan</h3>
          <p className="start-card-desc">Kerjain beberapa soal, sistem tentuin level mulai otomatis</p>
        </button>
      </div>
      <div className="step-nav">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!startingPoint} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
