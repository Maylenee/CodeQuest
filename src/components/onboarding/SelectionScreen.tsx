import { useState } from "react";
import { ChevronDown, Code, Globe, FileJson, Brain, Database, GitBranch, Layout, Smartphone } from "lucide-react";
import { Mascot } from "../ui/Mascot";
import "./Onboarding.css";

const tracks = [
  { id: "python", name: "Python Dasar", icon: Code, bg: "#E8F5E9", color: "#58CC02", students: "12.4rb" },
  { id: "web", name: "Web Development", icon: Globe, bg: "#E3F2FD", color: "#1CB0F6", students: "9.8rb" },
  { id: "js", name: "JavaScript", icon: FileJson, bg: "#FFF8E1", color: "#FFC800", students: "7.2rb" },
  { id: "algo", name: "Logika & Algoritma", icon: Brain, bg: "#F3E5F5", color: "#CE82FF", students: "8.1rb" },
  { id: "sql", name: "SQL & Database", icon: Database, bg: "#FFF3E0", color: "#FF9600", students: "5.6rb" },
  { id: "git", name: "Git & Version Control", icon: GitBranch, bg: "#FFEBEE", color: "#FF4B4B", students: "4.3rb" },
  { id: "ds", name: "Struktur Data", icon: Layout, bg: "#E8F5E9", color: "#58CC02", students: "6.7rb" },
  { id: "mobile", name: "Mobile Dev", icon: Smartphone, bg: "#E3F2FD", color: "#1CB0F6", students: "3.9rb" },
];

export function SelectionScreen({ onSelect }: { onSelect: (track: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="sel-landing">
      <header className="sel-header">
        <div className="sel-header-left">
          <Mascot size="sm" expression="happy" />
          <span className="sel-header-logo">CodeQuest</span>
        </div>
        <div className="sel-lang-wrap">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="sel-lang-btn"
          >
            ID
            <ChevronDown className="w-3 h-3" />
          </button>
          {langOpen && (
            <div className="sel-lang-dropdown">
              <button className="sel-lang-option">ID</button>
              <button className="sel-lang-option">EN</button>
            </div>
          )}
        </div>
      </header>

      <main className="sel-main">
        <h1 className="sel-main-title">
          Aku ingin belajar&hellip;
        </h1>
        <p className="sel-main-sub">
          Pilih topik yang paling menarik buat kamu, kita akan sesuaikan pengalaman belajarnya
        </p>

        <div className="sel-track-grid">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selected === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setSelected(track.id);
                  setTimeout(() => onSelect(track.id), 200);
                }}
                className={`sel-track-card ${isSelected ? "sel-track-card--selected" : ""}`}
              >
                <div className="sel-track-icon" style={{ backgroundColor: track.bg }}>
                  <Icon style={{ color: track.color }} />
                </div>
                <span className="sel-track-name">{track.name}</span>
                <span className="sel-track-students">{track.students} pelajar</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
