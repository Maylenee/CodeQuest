import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Mascot } from "../ui/Mascot";
import { userInit } from "../../api";
import "./Onboarding.css";

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
    <div className="confirm-wrap">
      <Mascot size="lg" expression="celebrate" className="mb-4" />
      <h2 className="confirm-title">Siap Belajar!</h2>
      <p className="confirm-sub">Rekomendasi awal buat kamu</p>
      <div className="confirm-card">
        <div className="confirm-row">
          <div className="confirm-icon confirm-icon--primary">
            <span className="confirm-icon-text">🎯</span>
          </div>
          <div>
            <p className="confirm-field-label">Track</p>
            <p className="confirm-field-value">{selectedTrack ? trackNames[selectedTrack] : "-"}</p>
          </div>
        </div>
        <div className="confirm-row">
          <div className="confirm-icon confirm-icon--secondary">
            <span className="confirm-icon-text">⏱</span>
          </div>
          <div>
            <p className="confirm-field-label">Target harian</p>
            <p className="confirm-field-value">{dailyTarget} menit</p>
          </div>
        </div>
        <div className="confirm-row">
          <div className="confirm-icon confirm-icon--primary">
            <span className="confirm-icon-text">📘</span>
          </div>
          <div>
            <p className="confirm-field-label">Mulai dari</p>
            <p className="confirm-field-value">Unit 1: Dasar-dasar</p>
          </div>
        </div>
      </div>
      <div className="confirm-buttons">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth onClick={handleStart}>MULAI BELAJAR</Button>
      </div>
    </div>
  );
}
