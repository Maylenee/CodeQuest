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
import "./Onboarding.css";

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
    <div className="onboard-page">
      <div className="onboard-progress">
        <ProgressBar value={step + 1} max={TOTAL_STEPS} />
      </div>
      <div className="onboard-body">
        <div className="onboard-chat">
          <Mascot
            size="md"
            expression={step === 4 ? "happy" : step === 8 ? "celebrate" : "normal"}
          />
          <div className="onboard-bubble">
            <div className="onboard-bubble-arrow" />
            <p className="onboard-bubble-text">
              {stepMessages[step]}
            </p>
          </div>
        </div>
        <div className="onboard-content animate-fade-in" key={step}>
          {steps[step]}
        </div>
      </div>
    </div>
  );
}
