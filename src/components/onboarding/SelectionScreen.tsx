import { useState } from "react";
import { ChevronDown, Code, Globe, FileJson, Brain, Database, GitBranch, Layout, Smartphone } from "lucide-react";
import { Mascot } from "../ui/Mascot";

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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-2.5">
          <Mascot size="sm" expression="happy" />
          <span className="text-lg font-extrabold text-[#58CC02] tracking-tight">CodeQuest</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#9CA3AF] bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition-colors uppercase tracking-wider"
          >
            ID
            <ChevronDown className="w-3 h-3" />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-white border border-[#E5E5E5] rounded-lg shadow-lg overflow-hidden z-10">
              <button className="w-full px-3 py-2 text-xs font-semibold text-left hover:bg-[#F7F7F7] text-[#3C3C3C]">ID</button>
              <button className="w-full px-3 py-2 text-xs font-semibold text-left hover:bg-[#F7F7F7] text-[#3C3C3C]">EN</button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-[40px] leading-tight sm:text-5xl font-extrabold text-[#3C3C3C] text-center mt-16 mb-4">
          Aku ingin belajar&hellip;
        </h1>
        <p className="text-base text-[#9CA3AF] text-center mb-12 max-w-md">
          Pilih topik yang paling menarik buat kamu, kita akan sesuaikan pengalaman belajarnya
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
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
                className={`
                  flex flex-col items-center text-center p-6 rounded-2xl border-2 cursor-pointer
                  transition-all duration-200 ease-out
                  ${isSelected
                    ? "bg-[#F7F7F7] border-[#D1D1D1] scale-[1.02]"
                    : "bg-white border-[#E5E5E5] hover:bg-[#F7F7F7] hover:border-[#D1D1D1] hover:scale-[1.02]"
                  }
                  shadow-sm
                `}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: track.bg }}
                >
                  <Icon className="w-7 h-7" style={{ color: track.color }} />
                </div>
                <span className="text-[15px] font-extrabold text-[#3C3C3C] mb-1">{track.name}</span>
                <span className="text-xs font-semibold text-[#9CA3AF]">{track.students} pelajar</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
