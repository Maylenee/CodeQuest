import { useOnboardingStore } from "../../lib/store";
import { ProgressBar } from "../ui/ProgressBar";
import { Mascot } from "../ui/Mascot";
import { StepSelectTrack } from "./StepSelectTrack";
import { StepReferralSource } from "./StepReferralSource";
import { StepMotivation } from "./StepMotivation";
import { StepSkillLevel } from "./StepSkillLevel";
import { StepMotivationalSlide } from "./StepMotivationalSlide";
import { StepDailyTarget } from "./StepDailyTarget";
import { StepNotification } from "./StepNotification";
import { StepStartingPoint } from "./StepStartingPoint";
import { StepConfirmation } from "./StepConfirmation";

const TOTAL_STEPS = 9;

const stepMessages = [
  "Pilih track yang mau kamu pelajari!",
  "Keren! Cerita dong, dari mana tahu platform ini?",
  "Kenapa kamu tertarik belajar coding?",
  "Sejauh mana kemampuan coding kamu sekarang?",
  "Lihat apa yang bisa kamu capai di sini!",
  "Biar belajarnya konsisten, atur target harian yuk!",
  "Minta izin buat ngirim pengingat belajar, ya!",
  "Mau mulai dari mana?",
  "Oke, siap! Ini rekomendasi awal buat kamu.",
];

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const { step } = useOnboardingStore();

  const steps = [
    <StepSelectTrack key="track" />,
    <StepReferralSource key="referral" />,
    <StepMotivation key="motivation" />,
    <StepSkillLevel key="skill" />,
    <StepMotivationalSlide key="slide" />,
    <StepDailyTarget key="daily" />,
    <StepNotification key="notif" />,
    <StepStartingPoint key="start" />,
    <StepConfirmation key="confirm" onComplete={onComplete} />,
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      <div className="px-6 pt-4 pb-2">
        <ProgressBar value={step + 1} max={TOTAL_STEPS} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="flex items-start gap-4 mb-6 w-full">
          <Mascot
            size="md"
            expression={step === 4 ? "happy" : step === 8 ? "celebrate" : "normal"}
          />
          <div className="flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-4 relative">
            <div className="absolute left-[-8px] top-4 w-4 h-4 bg-[var(--color-bg-card)] border-l border-b border-[var(--color-border)] rotate-45" />
            <p className="text-sm text-[var(--color-text-secondary)]">
              {stepMessages[step]}
            </p>
          </div>
        </div>
        <div className="w-full animate-fade-in" key={step}>
          {steps[step]}
        </div>
      </div>
    </div>
  );
}
