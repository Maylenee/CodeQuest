import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Search, Music, Users, Share2, Youtube, BookOpen } from "lucide-react";

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
      <h2 className="text-xl font-bold text-center mb-6">Dari mana kamu tahu tentang platform ini?</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {sources.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.id}
              hover
              selected={referralSource === s.id}
              onClick={() => setReferralSource(s.id)}
              className="flex items-center gap-3 p-4"
            >
              <Icon className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
              <span className="text-sm font-semibold">{s.label}</span>
              {referralSource === s.id && (
                <span className="ml-auto text-[var(--color-primary)] text-lg">✓</span>
              )}
            </Card>
          );
        })}
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={!referralSource} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
