import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Search, Music, Users, Share2, Youtube, BookOpen } from "lucide-react";
import "./Onboarding.css";

const sources = [
  { id: "google", label: "Google", icon: Search },
  { id: "tiktok", label: "TikTok", icon: Music },
  { id: "teman", label: "Teman/Keluarga", icon: Users },
  { id: "sosmed", label: "Media sosial", icon: Share2 },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "sekolah", label: "Sekolah/Kampus", icon: BookOpen },
];

export function StepReferralSource() {
  const { referralSource, setReferralSource, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="step-title">Dari mana kamu tahu tentang platform ini?</h2>
      <div className="sel-grid">
        {sources.map((s) => {
          const Icon = s.icon;
          const sel = referralSource === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setReferralSource(s.id)}
              className={`sel-card ${sel ? "sel-card--selected" : ""}`}
            >
              <Icon className="sel-card-icon" />
              <span className="sel-card-label">{s.label}</span>
              {sel && <span className="sel-card-check">✓</span>}
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!referralSource} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
