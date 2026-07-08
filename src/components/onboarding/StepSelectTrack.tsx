import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Code, Globe, FileJson, Brain, Database, GitBranch, Layout, Smartphone } from "lucide-react";
import "./Onboarding.css";

const tracks = [
  { id: "python", name: "Python Dasar", icon: Code, color: "#58CC02", students: "12.4rb" },
  { id: "web", name: "Web Development", icon: Globe, color: "#1CB0F6", students: "9.8rb" },
  { id: "js", name: "JavaScript Lanjutan", icon: FileJson, color: "#FFC800", students: "7.2rb" },
  { id: "algo", name: "Logika & Algoritma", icon: Brain, color: "#CE82FF", students: "8.1rb" },
  { id: "sql", name: "SQL & Database", icon: Database, color: "#FF9600", students: "5.6rb" },
  { id: "git", name: "Git & Version Control", icon: GitBranch, color: "#FF4B4B", students: "4.3rb" },
  { id: "ds", name: "Struktur Data", icon: Layout, color: "#58CC02", students: "6.7rb" },
  { id: "mobile", name: "Mobile Dev (Flutter/Dart)", icon: Smartphone, color: "#1CB0F6", students: "3.9rb" },
];

export function StepSelectTrack() {
  const { selectedTrack, setSelectedTrack, nextStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="step-title">Pilih Track Belajar</h2>
      <p className="step-sub">Pilih satu track untuk memulai perjalanan coding-mu</p>
      <div className="sel-grid sel-grid--4col">
        {tracks.map((track) => {
          const Icon = track.icon;
          const sel = selectedTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`sel-card sel-card--center ${sel ? "sel-card--selected" : ""}`}
            >
              <Icon className="sel-card-icon" style={{ color: track.color }} />
              <span className="sel-card-label">{track.name}</span>
              <span className="text-xs text-[var(--color-text-muted)] mt-1">{track.students} siswa</span>
            </button>
          );
        })}
      </div>
      <Button fullWidth disabled={!selectedTrack} onClick={nextStep}>LANJUTKAN</Button>
    </div>
  );
}
