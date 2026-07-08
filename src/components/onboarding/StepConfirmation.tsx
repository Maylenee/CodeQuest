import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Mascot } from "../ui/Mascot";
import { userInit } from "../../api";

const trackNames: Record<string, string> = {
  python: "Python Dasar",
  web: "Web Development",
  js: "JavaScript Lanjutan",
  algo: "Logika & Algoritma",
  sql: "SQL & Database",
  git: "Git & Version Control",
  ds: "Struktur Data",
  mobile: "Mobile Dev (Flutter/Dart)",
};

export function StepConfirmation({ onComplete }: { onComplete: () => void }) {
  const { selectedTrack, dailyTarget, prevStep } = useOnboardingStore();

  const handleStart = async () => {
    const userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("codequest_userId", userId);
    try {
      await userInit({
        id: userId,
        name: "Pengguna",
        selectedTrack: selectedTrack || "python",
        dailyTarget: dailyTarget || 20,
      });
    } catch (e) {
      // proceed anyway
    }
    onComplete();
  };

  return (
    <div className="text-center">
      <Mascot size="lg" expression="celebrate" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Siap Belajar!</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">Rekomendasi awal buat kamu</p>
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
            <span className="text-[var(--color-primary)] font-bold text-lg">🎯</span>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Track</p>
            <p className="font-bold">{selectedTrack ? trackNames[selectedTrack] : "-"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-light)] flex items-center justify-center">
            <span className="text-[var(--color-secondary)] font-bold text-lg">⏱</span>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Target harian</p>
            <p className="font-bold">{dailyTarget} menit</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
            <span className="text-[var(--color-primary)] font-bold text-lg">📘</span>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Mulai dari</p>
            <p className="font-bold">Unit 1: Dasar-dasar</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth onClick={handleStart}>MULAI BELAJAR</Button>
      </div>
    </div>
  );
}
