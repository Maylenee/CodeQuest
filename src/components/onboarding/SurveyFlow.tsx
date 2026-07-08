import { useState, useCallback } from "react";
import { ArrowLeft, ChevronDown, Search, Music, Users, Share2, Youtube, BookOpen, Briefcase, GraduationCap, HeartHandshake, Laptop, Trophy, MoreHorizontal, Monitor, Brain, Flame, Bell, BellOff, X, Pencil } from "lucide-react";
import { Mascot } from "../ui/Mascot";
import { cn } from "../../lib/utils";
import { userInit } from "../../api";
import "./Onboarding.css";

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
    <div className="onboard-page">
      <div className="progress-inline">
        {step > 0 && (
          <button onClick={prevStep} className="shrink-0 p-1 rounded-lg hover:bg-[var(--color-bg-card)] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        )}
        <div className="progress-inline-track">
          <div className="progress-inline-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="onboard-body">
        <div className="onboard-chat">
          <div className="relative shrink-0">
            <Mascot size="md" expression={mascotExpressions[step]} />
            <div className="absolute -right-1 bottom-1">
              <Pencil className="w-4 h-4 text-[var(--color-accent-orange)] rotate-45" />
            </div>
          </div>
          <div className="onboard-bubble">
            <div className="onboard-bubble-arrow" />
            <p className="onboard-bubble-text">{stepMessages[step]}</p>
          </div>
        </div>

        <div className="onboard-content">
          <div key={step} className="animate-slide-in-right">
            {step === 0 && (
              <div>
                <h2 className="step-title">Dari mana kamu tahu tentang platform ini?</h2>
                <div className="sel-grid">
                  {sources.map((s) => {
                    const Icon = s.icon;
                    const sel = source === s.id;
                    return (
                      <button key={s.id} onClick={() => setSource(s.id)} className={cn("sel-card", sel && "sel-card--selected")}>
                        {sel ? (
                          <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        ) : (
                          <Icon className="sel-card-icon" />
                        )}
                        <span className="sel-card-label">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="step-title">Kenapa kamu mau belajar coding?</h2>
                <div className="sel-grid">
                  {motivations.map((m) => {
                    const Icon = m.icon;
                    const sel = motivation === m.id;
                    return (
                      <button key={m.id} onClick={() => setMotivation(m.id)} className={cn("sel-card", sel && "sel-card--selected")}>
                        <Icon className={cn("sel-card-icon", sel && "sel-card-icon--selected")} />
                        <span className="sel-card-label">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="step-title">Seberapa jauh kemampuan codingmu sekarang?</h2>
                <div className="sel-grid sel-grid--single">
                  {levels.map((lvl) => {
                    const sel = skillLevel === lvl.id;
                    return (
                      <button key={lvl.id} onClick={() => setSkillLevel(lvl.id)} className={cn("sel-card", sel && "sel-card--selected")}>
                        <div className="skill-bars">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={`skill-bar ${i < lvl.bars ? "skill-bar--filled" : "skill-bar--empty"}`} />
                          ))}
                        </div>
                        <span className="sel-card-label">{lvl.label}</span>
                        {sel && <span className="sel-card-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="step-title">Ini yang bisa kamu capai</h2>
                <p className="step-sub">Dengan konsisten belajar, kamu akan&hellip;</p>
                <div className="sel-grid sel-grid--single">
                  {highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <div key={i} className="highlight-card">
                        <div className="highlight-icon" style={{ backgroundColor: `${h.color}20` }}>
                          <Icon style={{ color: h.color }} />
                        </div>
                        <div className="highlight-info">
                          <h3 className="highlight-title">{h.title}</h3>
                          <p className="highlight-desc">{h.desc}</p>
                        </div>
                        <span className="highlight-check">✓</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="step-title">Berapa lama target belajar harianmu?</h2>
                <p className="step-sub">Kamu bisa ubah kapan aja</p>
                <div className="target-grid">
                  {targets.map((t) => {
                    const sel = dailyTarget === t.id;
                    return (
                      <button key={t.id} onClick={() => setDailyTarget(t.id)} className={cn("target-card", sel && "target-card--selected")}>
                        <span className="target-time">{t.desc}</span>
                        <span className="target-label">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="step-title">Dapatkan Pengingat Harian</h2>
                <p className="step-sub">Kami akan kirim notifikasi buat ngingetin kamu belajar tiap hari</p>
                <div className="notif-stack">
                  <button onClick={() => setNotifGranted(true)} className={cn("notif-btn", notifGranted === true ? "notif-btn--active" : "")}>
                    <Bell className="w-5 h-5" /> Izinkan Notifikasi
                  </button>
                  <button onClick={() => setNotifGranted(false)} className={cn("notif-btn notif-btn--ghost", notifGranted === false ? "notif-btn--ghost-active" : "")}>
                    <BellOff className="w-5 h-5" /> Nanti Aja
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="step-title">Pilih Awal Perjalananmu</h2>
                <p className="step-sub">Mau mulai dari mana?</p>
                <div className="start-grid">
                  <button onClick={() => setStartingPoint("beginner")} className={cn("start-card", startingPoint === "beginner" && "start-card--selected")}>
                    <div className="start-icon-wrap start-icon-wrap--beginner">
                      <span className="start-icon-num">1</span>
                    </div>
                    <h3 className="start-card-title start-card-title--beginner">Mulai dari awal</h3>
                    <p className="start-card-desc">Ambil materi paling dasar dari track yang dipilih</p>
                  </button>
                  <button onClick={() => setStartingPoint("placement")} className={cn("start-card start-card--placement", startingPoint === "placement" && "start-card--selected")}>
                    <div className="start-icon-wrap start-icon-wrap--placement">
                      <span className="start-icon-qmark">?</span>
                    </div>
                    <h3 className="start-card-title start-card-title--placement">Temukan levelku</h3>
                    <p className="start-card-desc">Kerjain beberapa soal, sistem tentuin level mulai otomatis</p>
                  </button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col items-center text-center pt-4">
                <div className="confirm-mascot">
                  <Mascot size="lg" expression="celebrate" />
                  <Pencil className="confirm-mascot-pencil" />
                </div>
                <div className="onboard-bubble" style={{ maxWidth: "384px", margin: "0 auto" }}>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-bg-card)] border-t border-l border-[var(--color-border)] rotate-45" />
                  <p className="onboard-bubble-text">
                    Rekomendasi buat kamu: mulai dari <span className="text-[var(--color-primary)]">Unit 1: Dasar-dasar</span> dengan target <span className="text-[var(--color-primary)]">{dailyTarget || 20} menit</span> per hari. Siap?
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {notifModalOpen && (
          <div className="notif-popup-overlay">
            <div className="notif-popup-backdrop" onClick={() => setNotifModalOpen(false)} />
            <div className="notif-popup animate-fade-in-up">
              <div className="notif-popup-arrow" />
              <button onClick={() => setNotifModalOpen(false)} className="notif-popup-close">
                <X />
              </button>
              <div className="notif-popup-body">
                <p className="notif-popup-domain">codequest.app</p>
                <div className="notif-popup-bell">
                  <Bell />
                </div>
                <p className="notif-popup-title">Izinkan notifikasi?</p>
                <p className="notif-popup-desc">codequest.app ingin mengirim pemberitahuan</p>
                <div className="notif-popup-buttons">
                  <button onClick={handleNotifBlock} className="notif-popup-btn notif-popup-btn--block">BLOKIR</button>
                  <button onClick={handleNotifAllow} className="notif-popup-btn notif-popup-btn--allow">IZINKAN</button>
                </div>
              </div>
              <div className="notif-popup-footer">
                <div className="notif-popup-footer-inner">
                  <ChevronDown />
                  <span>codequest.app</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="onboard-bottom">
          <button
            onClick={nextStep}
            disabled={!canProceed}
            className="onboard-btn onboard-btn--primary"
          >
            {step === TOTAL_STEPS - 1 ? "MULAI BELAJAR" : "LANJUTKAN"}
          </button>
        </div>
      </div>
    </div>
  );
}
