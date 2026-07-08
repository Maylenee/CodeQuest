import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Zap, Trophy, Gift, Flame, Heart, Gem, BookOpen, X, User } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { LearningPath } from "./LearningPath";
import { useGameStore } from "../../lib/store";
import { userGet } from "../../api";
import "./LearnPage.css";

const missions = [
  { icon: Zap, label: "Selesaikan 3 soal", done: 1, total: 3, xp: 20 },
  { icon: Trophy, label: "Streak 1 hari", done: 1, total: 1, xp: 15 },
  { icon: Zap, label: "Dapatkan 50 XP", done: 30, total: 50, xp: 30 },
];

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-box animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button onClick={onClose} className="modal-close">
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LearnPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { streak, hearts, gems, loadFromUser } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    async function load() {
      const uid = localStorage.getItem("codequest_userId") || "user-default";
      try {
        const data = await userGet(uid);
        if (data.user) loadFromUser(data.user);
      } catch { /* fallback */ }
      setLoading(false);
    }
    load();
  }, [loadFromUser]);

  if (loading) {
    return (
      <div className="learn-loading">
        <span>Memuat...</span>
      </div>
    );
  }

  return (
    <div className="learn-page">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((p) => !p)} activeSection={activeSection} onNavClick={setActiveSection} />

      <div className="learn-middle">
        <div className="learn-top">
          <div className="header-card">
            <div className="header-card-content">
              <div className="header-card-top">
                <div className="header-card-left">
                  <button className="header-back" onClick={() => window.history.back()}>
                    <ArrowLeft />
                  </button>
                  <span className="header-breadcrumb">BAGIAN 1, UNIT 1</span>
                </div>
                <button className="header-guide-btn" onClick={() => setShowGuide(true)}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  BUKU PANDUAN
                </button>
              </div>
              <h1 className="header-title">Python Dasar</h1>
              <p className="header-sub">Dasar-dasar pemrograman Python untuk pemula</p>
            </div>
          </div>

          <div className="status-row">
            <div className="status-pill">
              <span className="status-pill-flag">🇮🇩</span>
            </div>
            <div className="status-pill status-pill--orange">
              <Flame />
              <span className="status-pill-text">{streak}</span>
            </div>
            <div className="status-pill status-pill--blue">
              <Gem />
              <span className="status-pill-text">{gems}</span>
            </div>
            <div className="status-pill status-pill--red">
              <Heart />
              <span className="status-pill-text">{hearts}</span>
            </div>
          </div>
        </div>

        <div className="learn-scroll">
          <div className="learn-scroll-inner">
            {activeSection === "home" && <LearningPath />}
            {activeSection === "alphabet" && (
              <div className="section-placeholder">
                <BookOpen />
                <h2>Modul Referensi</h2>
                <p>Coming soon</p>
              </div>
            )}
            {activeSection === "leaderboard" && (
              <div className="section-placeholder">
                <Trophy />
                <h2>Papan Skor</h2>
                <p>Selesaikan 5 pelajaran untuk membuka papan skor</p>
              </div>
            )}
            {activeSection === "missions" && (
              <div className="section-placeholder">
                <Flag />
                <h2>Misi Harian</h2>
                <p>Selesaikan misi untuk dapatkan XP dan reward</p>
              </div>
            )}
            {activeSection === "shop" && (
              <div className="section-placeholder">
                <Store />
                <h2>Toko</h2>
                <p>Coming soon</p>
              </div>
            )}
            {activeSection === "profile" && (
              <div className="section-placeholder">
                <User />
                <h2>Profil</h2>
                <p>Lengkapi profil untuk pengalaman lebih personal</p>
              </div>
            )}
            {activeSection === "more" && (
              <div className="section-placeholder">
                <h2>Lainnya</h2>
                <p>Pengaturan dan informasi aplikasi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="learn-right">
        <div className="r-card">
          <div className="leaderboard-top">
            <div className="leaderboard-icon">
              <Lock />
            </div>
            <div className="leaderboard-info">
              <p className="leaderboard-title">Papan Skor</p>
              <p className="leaderboard-desc">Buka dengan menyelesaikan 5 pelajaran</p>
            </div>
          </div>
          <div className="leaderboard-progress">
            <div className="leaderboard-progress-top">
              <span>Progress</span>
              <strong>2 / 5</strong>
            </div>
            <div className="leaderboard-bar">
              <div className="leaderboard-bar-fill leaderboard-bar-fill--animated" style={{ width: "40%" }} />
            </div>
          </div>
        </div>

        <div className="r-card">
          <h3 className="missions-title">Misi Harian</h3>
          <div className="missions-list">
            {missions.map((m, i) => {
              const Icon = m.icon;
              const pct = Math.min((m.done / m.total) * 100, 100);
              return (
                <div key={i}>
                  <div className="mission-top">
                    <Icon className="mission-icon" />
                    <span className="mission-label">{m.label}</span>
                    <div className="mission-reward">
                      <Trophy />
                      <span>+{m.xp}</span>
                    </div>
                  </div>
                  <div className="mission-bar-wrap">
                    <div className="mission-bar-fill mission-bar-fill--animated" style={{ width: `${pct}%`, animationDelay: `${i * 0.15}s` }} />
                    <div className="mission-gift"><Gift /></div>
                  </div>
                  <div className="mission-count">
                    <span>{m.done} / {m.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cta-card">
          <div className="cta-avatar">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <p className="cta-title">Lengkapi Profilmu</p>
          <p className="cta-desc">Dapatkan pengalaman belajar yang lebih personal</p>
          <div className="cta-buttons">
            <button className="cta-btn cta-btn--primary" onClick={() => setShowProfile(true)}>BUAT PROFIL</button>
            <button className="cta-btn cta-btn--secondary" onClick={() => setShowLogin(true)}>MASUK</button>
          </div>
        </div>
      </div>

      {/* GUIDE MODAL */}
      <Modal open={showGuide} onClose={() => setShowGuide(false)} title="Buku Panduan">
        <p className="guide-text">
          Selamat datang di <strong>CodeQuest</strong>! Panduan ini akan membantu kamu memulai.
        </p>
        <div className="guide-card">
          <p className="guide-card-title">📚 Belajar</p>
          <p className="guide-card-desc">Ikuti learning path dari dasar sampai mahir. Setiap pelajaran berisi materi interaktif dan soal latihan.</p>
        </div>
        <div className="guide-card">
          <p className="guide-card-title">🔥 Streak & XP</p>
          <p className="guide-card-desc">Belajar setiap hari untuk menjaga streak dan mengumpulkan XP. Makin konsisten, makin cepat naik level!</p>
        </div>
        <div className="guide-card">
          <p className="guide-card-title">❤️ Nyawa</p>
          <p className="guide-card-desc">Kamu punya 5 nyawa. Setiap jawaban salah akan mengurangi 1 nyawa. Nyawa akan pulih setiap beberapa jam.</p>
        </div>
      </Modal>

      {/* PROFILE MODAL */}
      <Modal open={showProfile} onClose={() => setShowProfile(false)} title="Buat Profil">
        <div className="form-stack">
          <div className="form-group">
            <label className="form-label">Nama</label>
            <input className="form-input" placeholder="Masukkan nama kamu" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="Masukkan email" type="email" />
          </div>
          <button className="form-submit form-submit--primary">SIMPAN</button>
        </div>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Masuk">
        <div className="form-stack">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="Masukkan email" type="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Kata Sandi</label>
            <input className="form-input" placeholder="Masukkan kata sandi" type="password" />
          </div>
          <button className="form-submit form-submit--secondary">MASUK</button>
          <p className="form-footer">
            Belum punya akun?{" "}
            <button className="form-link" onClick={() => { setShowLogin(false); setShowProfile(true); }}>
              Daftar
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
}
