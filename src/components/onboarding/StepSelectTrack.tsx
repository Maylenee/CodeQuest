import { useOnboardingStore } from "../../lib/store";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Code, Globe, FileJson, Brain, Database, GitBranch, Layout, Smartphone } from "lucide-react";

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
      <h2 className="text-xl font-bold text-center mb-2">Pilih Track Belajar</h2>
      <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">
        Pilih satu track untuk memulai perjalanan coding-mu
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {tracks.map((track) => {
          const Icon = track.icon;
          return (
            <Card
              key={track.id}
              hover
              selected={selectedTrack === track.id}
              onClick={() => setSelectedTrack(track.id)}
              className="flex flex-col items-center text-center p-4"
            >
              <Icon className="w-8 h-8 mb-2" style={{ color: track.color }} />
              <span className="text-sm font-bold">{track.name}</span>
              <span className="text-xs text-[var(--color-text-muted)] mt-1">
                {track.students} siswa
              </span>
            </Card>
          );
        })}
      </div>
      <Button fullWidth disabled={!selectedTrack} onClick={nextStep}>
        LANJUTKAN
      </Button>
    </div>
  );
}
