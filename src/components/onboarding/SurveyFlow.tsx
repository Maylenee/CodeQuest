import { useState, useCallback } from "react";
import { ArrowLeft, ChevronDown, Search, Music, Users, Share2, Youtube, BookOpen, Briefcase, GraduationCap, HeartHandshake, Laptop, Trophy, MoreHorizontal, Monitor, Brain, Flame, Bell, BellOff, X, Pencil } from "lucide-react";
import { Mascot } from "../ui/Mascot";
import { cn } from "../../lib/utils";
import { userInit } from "../../api";

const TOTAL_STEPS = 8;

const stepMessages = [
  "Cerita dong, dari mana tahu platform ini?",
  "Kenapa kamu tertarik belajar coding?",
  "Sejauh mana kemampuan coding kamu sekarang?",
  "Lihat apa yang bisa kamu capai di sini!",
  "Biar belajarnya konsisten, atur target harian yuk!",
  "Minta izin buat ngirim pengingat belajar, ya!",
  "Mau mulai dari mana?",
  "Oke, siap! Ini rekomendasi awal buat kamu.",
];

const mascotExpressions: Array<"normal" | "happy" | "thinking" | "celebrate"> = [
  "happy", "thinking", "thinking", "happy",
  "happy", "normal", "thinking", "celebrate",
];

const sources = [
  { id: "google", label: "Google", icon: Search },
  { id: "tiktok", label: "TikTok", icon: Music },
  { id: "teman", label: "Teman/Keluarga", icon: Users },
  { id: "sosmed", label: "Media sosial", icon: Share2 },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "sekolah", label: "Sekolah/Kampus", icon: BookOpen },
];

const motivations = [
  { id: "karier", label: "Karier/Pekerjaan", icon: Briefcase },
  { id: "kuliah", label: "Tugas Kuliah", icon: GraduationCap },
  { id: "hobi", label: "Hobi/Proyek Pribadi", icon: HeartHandshake },
  { id: "freelance", label: "Freelance", icon: Laptop },
  { id: "lomba", label: "Persiapan Lomba", icon: Trophy },
  { id: "lainnya", label: "Lainnya", icon: MoreHorizontal },
];

const levels = [
  { id: 1, label: "Belum pernah coding", bars: 1 },
  { id: 2, label: "Tahu syntax dasar", bars: 2 },
  { id: 3, label: "Bisa bikin program sederhana", bars: 3 },
  { id: 4, label: "Bisa bikin project kecil end-to-end", bars: 4 },
];

const highlights = [
  { icon: Monitor, title: "Coding dengan percaya diri", desc: "Latihan langsung di browser, real-time feedback", color: "#1CB0F6" },
  { icon: Brain, title: "Menguasai logika pemrograman", desc: "Dari dasar sampai problem solving", color: "#CE82FF" },
  { icon: Flame, title: "Bangun kebiasaan ngoding harian", desc: "Streak, reminder, tantangan seru", color: "#FF9600" },
];

const targets = [
  { id: 10, label: "Santai", desc: "10 menit" },
  { id: 20, label: "Biasa", desc: "20 menit" },
  { id: 30, label: "Serius", desc: "30 menit" },
  { id: 45, label: "Intensif", desc: "45 menit" },
];

export function SurveyFlow({ onComplete, selectedTrack }: { onComplete: () => void; selectedTrack: string }) {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<number | null>(null);
  const [dailyTarget, setDailyTarget] = useState<number | null>(null);
  const [notifGranted, setNotifGranted] = useState<boolean | null>(null);
  const [startingPoint, setStartingPoint] = useState<"beginner" | "placement" | null>(null);
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  const nextStep = useCallback(() => {
    if (step === 5) {
      setNotifModalOpen(true);
      return;
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      const userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem("codequest_userId", userId);
      userInit({
        id: userId,
        name: "Pengguna",
        selectedTrack,
        dailyTarget: dailyTarget || 20,
      }).catch(() => {});
      onComplete();
    }
  }, [step, selectedTrack, dailyTarget, onComplete]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const handleNotifAllow = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setNotifGranted(result === "granted");
    } else {
      setNotifGranted(false);
    }
    setNotifModalOpen(false);
    setStep((s) => s + 1);
  };

  const handleNotifBlock = () => {
    setNotifGranted(false);
    setNotifModalOpen(false);
    setStep((s) => s + 1);
  };

  const canProceed = (() => {
    switch (step) {
      case 0: return source !== null;
      case 1: return motivation !== null;
      case 2: return skillLevel !== null;
      case 3: return true;
      case 4: return dailyTarget !== null;
      case 5: return notifGranted !== null;
      case 6: return startingPoint !== null;
      case 7: return true;
      default: return false;
    }
  })();

  const pct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      {/* Progress bar + back button */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-3">
        {step > 0 && (
          <button onClick={prevStep} className="shrink-0 p-1 rounded-lg hover:bg-[var(--color-bg-card)] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        )}
        <div className="flex-1 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 py-2 max-w-2xl mx-auto w-full">
        {/* Mascot + speech bubble */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative shrink-0">
            <Mascot size="md" expression={mascotExpressions[step]} />
            <div className="absolute -right-1 bottom-1">
              <Pencil className="w-4 h-4 text-[var(--color-accent-orange)] rotate-45" />
            </div>
          </div>
          <div className="flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-4 relative">
            <div className="absolute left-[-8px] top-4 w-4 h-4 bg-[var(--color-bg-card)] border-l border-b border-[var(--color-border)] rotate-45" />
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">{stepMessages[step]}</p>
          </div>
        </div>

        {/* Step content with slide-in animation */}
        <div className="flex-1">
          <div key={step} className="animate-slide-in-right">
            {step === 0 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-5 text-[var(--color-text-primary)]">Dari mana kamu tahu tentang platform ini?</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {sources.map((s) => {
                    const Icon = s.icon;
                    const sel = source === s.id;
                    return (
                      <button key={s.id} onClick={() => setSource(s.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200", sel ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)]")}>
                        {sel ? (
                          <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        ) : (
                          <Icon className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
                        )}
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-5 text-[var(--color-text-primary)]">Kenapa kamu mau belajar coding?</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {motivations.map((m) => {
                    const Icon = m.icon;
                    const sel = motivation === m.id;
                    return (
                      <button key={m.id} onClick={() => setMotivation(m.id)} className={cn("flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200", sel ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)]")}>
                        <Icon className={cn("w-5 h-5 shrink-0", sel ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]")} />
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-5 text-[var(--color-text-primary)]">Seberapa jauh kemampuan codingmu sekarang?</h2>
                <div className="flex flex-col gap-3 mb-6">
                  {levels.map((lvl) => {
                    const sel = skillLevel === lvl.id;
                    return (
                      <button key={lvl.id} onClick={() => setSkillLevel(lvl.id)} className={cn("flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 w-full", sel ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)]")}>
                        <div className="flex gap-1 shrink-0">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={cn("w-3 h-5 rounded-sm transition-colors", i < lvl.bars ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]")} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-[var(--color-text-primary)] text-left flex-1">{lvl.label}</span>
                        {sel && <span className="text-[var(--color-primary)] text-lg font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-2 text-[var(--color-text-primary)]">Ini yang bisa kamu capai</h2>
                <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Dengan konsisten belajar, kamu akan&hellip;</p>
                <div className="flex flex-col gap-3 mb-6">
                  {highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${h.color}20` }}>
                          <Icon className="w-5 h-5" style={{ color: h.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-[var(--color-text-primary)]">{h.title}</h3>
                          <p className="text-xs text-[var(--color-text-muted)]">{h.desc}</p>
                        </div>
                        <span className="text-[var(--color-primary)] text-lg font-bold shrink-0">✓</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-1 text-[var(--color-text-primary)]">Berapa lama target belajar harianmu?</h2>
                <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Kamu bisa ubah kapan aja</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {targets.map((t) => {
                    const sel = dailyTarget === t.id;
                    return (
                      <button key={t.id} onClick={() => setDailyTarget(t.id)} className={cn("flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200", sel ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)]")}>
                        <span className="text-2xl font-extrabold text-[var(--color-text-primary)]">{t.desc}</span>
                        <span className="text-sm font-bold text-[var(--color-text-muted)]">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-2 text-[var(--color-text-primary)]">Dapatkan Pengingat Harian</h2>
                <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Kami akan kirim notifikasi buat ngingetin kamu belajar tiap hari</p>
                <div className="flex flex-col gap-3 mb-6">
                  <button onClick={() => setNotifGranted(true)} className={cn("flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 font-bold text-sm transition-all duration-200", notifGranted === true ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card-hover)]")}>
                    <Bell className="w-5 h-5" /> Izinkan Notifikasi
                  </button>
                  <button onClick={() => setNotifGranted(false)} className={cn("flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 font-bold text-sm transition-all duration-200", notifGranted === false ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]")}>
                    <BellOff className="w-5 h-5" /> Nanti Aja
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="text-lg font-bold text-center mb-1 text-[var(--color-text-primary)]">Pilih Awal Perjalananmu</h2>
                <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">Mau mulai dari mana?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button onClick={() => setStartingPoint("beginner")} className={cn("flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all duration-200", startingPoint === "beginner" ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-light)]")}>
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                      <span className="text-2xl font-extrabold text-[var(--color-primary)]">1</span>
                    </div>
                    <h3 className="font-extrabold text-base text-[var(--color-text-primary)] mb-1">Mulai dari awal</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">Ambil materi paling dasar dari track yang dipilih</p>
                  </button>
                  <button onClick={() => setStartingPoint("placement")} className={cn("flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all duration-200", startingPoint === "placement" ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-secondary)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)]")}>
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary-light)] flex items-center justify-center mb-4">
                      <span className="text-2xl font-extrabold text-[var(--color-secondary)]">?</span>
                    </div>
                    <h3 className="font-extrabold text-base text-[var(--color-secondary)] mb-1">Temukan levelku</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">Kerjain beberapa soal, sistem tentuin level mulai otomatis</p>
                  </button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col items-center text-center pt-4">
                <div className="relative mb-6">
                  <Mascot size="lg" expression="celebrate" />
                  <div className="absolute -right-1 bottom-2">
                    <Pencil className="w-5 h-5 text-[var(--color-accent-orange)] rotate-45" />
                  </div>
                </div>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5 mb-2 max-w-sm mx-auto relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-bg-card)] border-t border-l border-[var(--color-border)] rotate-45" />
                  <p className="text-sm font-bold text-[var(--color-text-secondary)]">
                    Rekomendasi buat kamu: mulai dari <span className="text-[var(--color-primary)]">Unit 1: Dasar-dasar</span> dengan target <span className="text-[var(--color-primary)]">{dailyTarget || 20} menit</span> per hari. Siap?
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification browser-style popup */}
        {notifModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pb-16">
            <div className="absolute inset-0 bg-black/40" onClick={() => setNotifModalOpen(false)} />
            <div className="animate-fade-in-up relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white" />
              <button onClick={() => setNotifModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">codequest.app</p>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-bold text-gray-800 mb-1">Izinkan notifikasi?</p>
                <p className="text-xs text-gray-500 mb-5">codequest.app ingin mengirim pemberitahuan</p>
                <div className="flex gap-3">
                  <button onClick={handleNotifBlock} className="flex-1 py-2.5 rounded-lg text-sm font-bold text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors">BLOKIR</button>
                  <button onClick={handleNotifAllow} className="flex-1 py-2.5 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors">IZINKAN</button>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <div className="flex items-center gap-1 text-blue-500">
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-[10px] font-bold">codequest.app</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom button */}
        <div className="sticky bottom-0 py-4 bg-[var(--color-bg-primary)]">
          <button
            onClick={nextStep}
            disabled={!canProceed}
            className={cn(
              "w-full py-3.5 rounded-xl font-extrabold text-sm tracking-wider transition-all duration-200",
              canProceed
                ? "bg-[var(--color-primary)] text-white active:scale-[0.98] shadow-lg shadow-[var(--color-primary)]/20"
                : "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed"
            )}
          >
            {step === TOTAL_STEPS - 1 ? "MULAI BELAJAR" : "LANJUTKAN"}
          </button>
        </div>
      </div>
    </div>
  );
}
