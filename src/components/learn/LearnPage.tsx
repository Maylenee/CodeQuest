import { useEffect, useState } from "react";
import {
  ArrowLeft, Lock, Zap, Trophy, Gift, Flame, Heart, Gem, BookOpen, X, User,
  Flag, Store, Settings, Star, ShoppingBag, Award, Clock, Calendar, ChevronRight,
  Sparkles, Target, Shield, HelpCircle, LogOut, Code, Check, Plus, Minus,
  Snowflake, Lightbulb, GitBranch, Repeat, List, BookKey, Type, FileText,
  Box, Package, Bell, Volume2
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { LearningPath } from "./LearningPath";
import { LessonPage } from "../questions/LessonPage";
import { useGameStore } from "../../lib/store";
import { getTrackContent } from "../../lib/trackContent";
import { userGet, userUpdate, leaderboardGet, referenceGet } from "../../api";
import "./LearnPage.css";

const shopItems = [
  { id: "heart_refill", icon: Heart, name: "Isi Nyawa", desc: "Isi penuh 5 nyawa", price: 50, color: "var(--color-accent-red)" },
  { id: "streak_freeze", icon: Snowflake, name: "Streak Freeze", desc: "Lindungi streak 1 hari", price: 30, color: "var(--color-secondary)" },
  { id: "xp_boost", icon: Zap, name: "XP Boost", desc: "2x XP selama 30 menit", price: 80, color: "var(--color-accent-orange)" },
  { id: "hint_unlock", icon: Lightbulb, name: "Hint Pack", desc: "5 hint tambahan", price: 20, color: "var(--color-accent-yellow)" },
];

function getFallbackRefs(track: string) {
  return getTrackContent(track).references;
}

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

function LeaderboardSection() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await leaderboardGet();
        setEntries(data.entries || []);
      } catch {
        setEntries([
          { rank: 1, name: "CodeMaster", xp: 2840, level: 28 },
          { rank: 2, name: "PixelWizard", xp: 2150, level: 21 },
          { rank: 3, name: "ByteRider", xp: 1920, level: 19 },
          { rank: 4, name: "LogicQueen", xp: 1650, level: 16 },
          { rank: 5, name: "DevNinja", xp: 1430, level: 14 },
          { rank: 6, name: "SyntaxHero", xp: 1200, level: 12 },
          { rank: 7, name: "Kamu", xp: 980, level: 9 },
          { rank: 8, name: "DataDiver", xp: 750, level: 7 },
          { rank: 9, name: "LoopMaster", xp: 520, level: 5 },
          { rank: 10, name: "CraftCoder", xp: 300, level: 3 },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="loading-text">Memuat papan skor...</div>;

  return (
    <div>
      <div className="sec-header">
        <Trophy className="text-[var(--color-accent-yellow)]" />
        <h2 className="sec-title">Papan Skor Minggu Ini</h2>
      </div>
      <div className="lb-list">
        {entries.map((e, i) => (
          <div key={i} className="sec-card-row">
            <span className={`lb-rank ${i < 3 ? "lb-rank--top3" : "lb-rank--rest"}`}>
              {e.rank}
            </span>
            <div className="lb-info">
              <p className="lb-name">{e.name}</p>
              <p className="lb-level">Level {e.level}</p>
            </div>
            <span className="lb-xp">{e.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionsSection() {
  const { xp, streak, addXp, userId } = useGameStore();
  const [progress, setProgress] = useState<any[]>([]);
  const [claimed, setClaimed] = useState<string[]>(() => {
    const today = new Date().toDateString();
    try {
      const stored = JSON.parse(localStorage.getItem("codequest_claimed") || "{}");
      return stored[today] || [];
    } catch { return []; }
  });

  useEffect(() => {
    async function load() {
      const uid = localStorage.getItem("codequest_userId") || "user-default";
      try {
        const data = await userGet(uid);
        setProgress(data.progress || []);
      } catch {}
    }
    load();
  }, []);

  const lessonsDone = progress.filter((p: any) => p.status === "completed").length;
  const dailyMissions = [
    { id: "lessons", icon: Zap, label: "Selesaikan 3 pelajaran", done: Math.min(lessonsDone, 3), total: 3, xp: 20 },
    { id: "streak", icon: Trophy, label: "Streak 1 hari", done: Math.min(streak, 1), total: 1, xp: 15 },
    { id: "xp_target", icon: Zap, label: "Dapatkan 50 XP", done: Math.min(xp, 50), total: 50, xp: 30 },
  ];

  const claimReward = (missionId: string, xpReward: number) => {
    if (claimed.includes(missionId)) return;
    addXp(xpReward);
    const newClaimed = [...claimed, missionId];
    setClaimed(newClaimed);
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem("codequest_claimed") || "{}");
    stored[today] = newClaimed;
    localStorage.setItem("codequest_claimed", JSON.stringify(stored));
    const uid = localStorage.getItem("codequest_userId") || "user-default";
    userUpdate({ id: uid, xp: xp + xpReward }).catch(() => {});
  };

  return (
    <div>
      <div className="sec-header">
        <Flag className="text-[var(--color-accent-orange)]" />
        <h2 className="sec-title">Misi Harian</h2>
      </div>
      <p className="sec-desc">Selesaikan misi untuk dapatkan XP dan reward spesial!</p>
      <div className="mission-list">
        {dailyMissions.map((m) => {
          const Icon = m.icon;
          const pct = Math.min((m.done / m.total) * 100, 100);
          const isComplete = m.done >= m.total;
          const isClaimed = claimed.includes(m.id);
          return (
            <div key={m.id} className="mission-item">
              <div className="mission-item-top">
                <div className="mission-item-icon">
                  <Icon />
                </div>
                <div className="mission-item-info">
                  <p className="mission-item-label">{m.label}</p>
                  <p className="mission-item-progress-text">{m.done}/{m.total} selesai</p>
                </div>
                <div className="mission-item-reward">
                  <Trophy />
                  <span>+{m.xp}</span>
                </div>
              </div>
              <div className="mission-bar-track">
                <div className="mission-bar-fill--orange" style={{ width: `${pct}%` }} />
              </div>
              {isComplete && !isClaimed && (
                <button
                  onClick={() => claimReward(m.id, m.xp)}
                  className="mission-claim-btn"
                >
                  KLAIM HADIAH +{m.xp} XP
                </button>
              )}
              {isClaimed && (
                <p className="mission-claimed-text">✓ Sudah diklaim</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mission-footer">
        <p>Misi baru akan datang besok!</p>
      </div>
    </div>
  );
}

function ShopSection() {
  const { gems, setGems } = useGameStore();
  const [msg, setMsg] = useState("");
  const [buys, setBuys] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("codequest_purchases") || "{}");
      setBuys(stored);
    } catch {}
  }, []);

  const buy = async (item: typeof shopItems[0]) => {
    if (gems >= item.price) {
      const newGems = gems - item.price;
      setGems(newGems);
      const uid = localStorage.getItem("codequest_userId") || "user-default";
      await userUpdate({ id: uid, gems: newGems }).catch(() => {});

      const newBuys = { ...buys, [item.id]: (buys[item.id] || 0) + 1 };
      setBuys(newBuys);
      localStorage.setItem("codequest_purchases", JSON.stringify(newBuys));

      setMsg(`${item.name} berhasil dibeli!`);
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg("Gems tidak mencukupi!");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return (
    <div>
      <div className="sec-header">
        <ShoppingBag className="text-[var(--color-accent-purple)]" />
        <h2 className="sec-title">Toko</h2>
      </div>
      <div className="shop-balance">
        <Gem />
        <span>Saldo: {gems} Gems</span>
      </div>
      {msg && <div className="shop-msg">{msg}</div>}
      <div className="shop-grid">
        {shopItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="shop-item">
              <div className="shop-item-icon" style={{ background: `${item.color}20` }}>
                <Icon style={{ color: item.color }} />
              </div>
              <p className="shop-item-name">{item.name}</p>
              <p className="shop-item-desc">{item.desc}</p>
              <button onClick={() => buy(item)} className="shop-btn">
                <Gem /> {item.price}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileSection() {
  const { xp, level, streak, hearts, gems, league, userName, userId, loadFromUser } = useGameStore();
  const [name, setName] = useState(userName);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const leagues = [
    { name: "Bronze", icon: Shield, color: "var(--color-accent-orange)", min: 0 },
    { name: "Silver", icon: Shield, color: "var(--color-text-muted)", min: 300 },
    { name: "Gold", icon: Award, color: "var(--color-accent-yellow)", min: 800 },
    { name: "Sapphire", icon: Award, color: "var(--color-secondary)", min: 1500 },
    { name: "Ruby", icon: Award, color: "var(--color-accent-red)", min: 2500 },
    { name: "Diamond", icon: Star, color: "var(--color-accent-purple)", min: 4000 },
  ];
  const nextLeague = leagues.find((l) => l.min > xp) || leagues[leagues.length - 1];
  const currentLeague = [...leagues].reverse().find((l) => xp >= l.min) || leagues[0];
  const LeagueIcon = currentLeague.icon;

  return (
    <div>
      <div className="sec-header">
        <User className="text-[var(--color-secondary)]" />
        <h2 className="sec-title">Profil</h2>
      </div>
      <div className="profile-avatar-card">
        <div className="profile-avatar">
          <User />
        </div>
        <p className="profile-name">{name}</p>
        <div className="profile-league">
          <LeagueIcon style={{ color: currentLeague.color }} />
          <span style={{ color: currentLeague.color }}>{currentLeague.name}</span>
        </div>
      </div>
      <div className="profile-stats">
        <div className="profile-stat profile-stat--xp">
          <Trophy />
          <p className="profile-stat-value">{xp}</p>
          <p className="profile-stat-label">Total XP</p>
        </div>
        <div className="profile-stat profile-stat--level">
          <Star />
          <p className="profile-stat-value">{level}</p>
          <p className="profile-stat-label">Level</p>
        </div>
        <div className="profile-stat profile-stat--streak">
          <Flame />
          <p className="profile-stat-value">{streak}</p>
          <p className="profile-stat-label">Streak</p>
        </div>
        <div className="profile-stat profile-stat--gems">
          <Gem />
          <p className="profile-stat-value">{gems}</p>
          <p className="profile-stat-label">Gems</p>
        </div>
      </div>
      <div className="profile-league-progress">
        <p className="profile-league-label">LIGA SELANJUTNYA: {nextLeague.name}</p>
        <div className="profile-league-bar">
          <div className="profile-league-fill" style={{ width: `${Math.min((xp / (nextLeague as any).min) * 100, 100)}%` }} />
        </div>
        <p className="profile-league-xp">{xp} / {(nextLeague as any).min} XP</p>
      </div>
      <div className="profile-edit">
        <label className="profile-edit-label">Nama Pengguna</label>
        <div className="profile-edit-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-edit-input"
          />
          <button
            onClick={async () => {
              if (saving) return;
              setSaving(true);
              try {
                const uid = localStorage.getItem("codequest_userId") || "user-default";
                const res = await userUpdate({ id: uid, name });
                if (res.user) loadFromUser(res.user);
                setSaved(true);
              } catch {}
              setSaving(false);
              setTimeout(() => setSaved(false), 2000);
            }}
            className="profile-save-btn"
          >
            {saving ? "..." : saved ? "✓" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreSection() {
  return (
    <div>
      <div className="sec-header">
        <Settings className="text-[var(--color-text-muted)]" />
        <h2 className="sec-title">Lainnya</h2>
      </div>
      <div className="more-list">
        <div className="more-item">
          <Bell className="more-item-icon" />
          <div className="more-item-info">
            <p className="more-item-title">Notifikasi</p>
            <p className="more-item-desc">Pengingat belajar harian</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <div className="toggle-track">
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>
        <div className="more-item">
          <Volume2 className="more-item-icon" />
          <div className="more-item-info">
            <p className="more-item-title">Efek Suara</p>
            <p className="more-item-desc">Suara saat menjawab soal</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <div className="toggle-track">
              <div className="toggle-thumb" />
            </div>
          </label>
        </div>
      </div>
      <div className="more-list" style={{ marginTop: 16 }}>
        <button className="more-nav-item">
          <HelpCircle className="more-nav-icon" />
          <div className="more-item-info">
            <p className="more-nav-title">Pusat Bantuan</p>
            <p className="more-item-desc">FAQ & panduan</p>
          </div>
          <ChevronRight className="more-nav-arrow" />
        </button>
        <button className="more-nav-item more-nav-item--logout">
          <LogOut />
          <div className="more-item-info">
            <p className="more-nav-title">Keluar</p>
            <p className="more-item-desc">Hapus data lokal dan kembali</p>
          </div>
        </button>
      </div>
      <div className="more-version">
        <p>CodeQuest v0.1.0</p>
      </div>
    </div>
  );
}

function AlphabetSection({ onOpenLesson }: { onOpenLesson: (lessonId: string) => void }) {
  const [refs, setRefs] = useState<any[]>([]);
  const [openRef, setOpenRef] = useState<string | null>(null);
  const selectedTrack = useGameStore((s) => s.selectedTrack);

  useEffect(() => {
    async function load() {
      try {
        const data = await referenceGet();
        if (data.references?.length) {
          setRefs(data.references);
          return;
        }
      } catch {}
      setRefs(getFallbackRefs(selectedTrack));
    }
    load();
  }, [selectedTrack]);

  const activeRef = refs.find((r) => r.lessonId === openRef);

  if (activeRef) {
    return (
      <div>
        <button onClick={() => setOpenRef(null)} className="ref-back">
          ← Kembali ke daftar
        </button>
        <h2 className="ref-title">{activeRef.title}</h2>
        <div className="ref-body">
          {activeRef.sections.map((sec: any, i: number) => (
            <div key={i}>
              {sec.type === "text" && (
                <p className="ref-text">{sec.content}</p>
              )}
              {sec.type === "code" && (
                <div className="ref-code">
                  {sec.caption && <p className="ref-code-caption">{sec.caption}</p>}
                  <pre>{sec.code}</pre>
                </div>
              )}
              {sec.type === "bullet" && (
                <ul className="ref-bullet">
                  {sec.items.map((item: string, j: number) => (
                    <li key={j}>
                      <span className="ref-bullet-dot">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {sec.type === "table" && (
                <div className="ref-table-wrap">
                  <table className="ref-table">
                    <thead>
                      <tr>
                        {sec.columns.map((col: string, j: number) => (
                          <th key={j}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.rows.map((row: string[], j: number) => (
                        <tr key={j}>
                          {row.map((cell: string, k: number) => (
                            <td key={k}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => { onOpenLesson(activeRef.lessonId); setOpenRef(null); }}
          className="ref-btn"
        >
          LANJUTKAN KE SOAL
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="sec-header">
        <BookOpen className="text-[var(--color-secondary)]" />
        <h2 className="sec-title">Modul Referensi</h2>
      </div>
      <p className="sec-desc">Pelajari materi, lalu lanjutkan ke soal latihan</p>
      <div className="alpha-grid">
        {refs.map((ref, i) => {
          const sectionCount = ref.sections.length;
          return (
            <div
              key={i}
              className="alpha-card"
              onClick={() => setOpenRef(ref.lessonId)}
              role="button"
              tabIndex={0}
            >
              <div className="alpha-card-icon">
                <BookOpen />
              </div>
              <p className="alpha-card-title">{ref.title}</p>
              <p className="alpha-card-desc">{sectionCount} topik materi</p>
            </div>
          );
        })}
        {refs.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-muted)] col-span-2">
            <p>Memuat materi referensi...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function LearnPage({ onBackToSelection }: { onBackToSelection?: () => void }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const { streak, hearts, gems, loadFromUser, xp, userName, selectedTrack } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    async function load() {
      const uid = localStorage.getItem("codequest_userId") || "user-default";
      try {
        const data = await userGet(uid);
        if (data.user) loadFromUser(data.user);
      } catch {
        const storedTrack = localStorage.getItem("codequest_track");
        if (storedTrack) useGameStore.getState().setSelectedTrack(storedTrack);
        const storedSkill = localStorage.getItem("codequest_skillLevel");
        if (storedSkill) useGameStore.getState().setSkillLevel(Number(storedSkill));
      }
      setLoading(false);
    }
    load();
  }, [loadFromUser]);

  const handleCreateProfile = async () => {
    const uid = localStorage.getItem("codequest_userId") || "user-default";
    try {
      const res = await userUpdate({ id: uid, name: profileName, email: profileEmail });
      if (res.user) loadFromUser(res.user);
      else loadFromUser({ id: uid, name: profileName, email: profileEmail });
    } catch {
      loadFromUser({ id: uid, name: profileName, email: profileEmail });
    }
    setShowProfile(false);
    setProfileName("");
    setProfileEmail("");
  };

  const handleLogin = async () => {
    const uid = localStorage.getItem("codequest_userId") || "user-default";
    try {
      const data = await userGet(uid);
      if (data.user) loadFromUser(data.user);
    } catch {}
    setShowLogin(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  if (activeLesson) {
    return <LessonPage lessonId={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

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
                  <button className="header-back" onClick={() => onBackToSelection?.()}>
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
              <h1 className="header-title">{getTrackContent(selectedTrack).name}</h1>
              <p className="header-sub">{getTrackContent(selectedTrack).desc}</p>
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
            <div style={{ display: activeSection !== "home" ? "none" : undefined }}><LearningPath /></div>
            <div style={{ display: activeSection !== "alphabet" ? "none" : undefined }}><AlphabetSection onOpenLesson={setActiveLesson} /></div>
            <div style={{ display: activeSection !== "leaderboard" ? "none" : undefined }}><LeaderboardSection /></div>
            <div style={{ display: activeSection !== "missions" ? "none" : undefined }}><MissionsSection /></div>
            <div style={{ display: activeSection !== "shop" ? "none" : undefined }}><ShopSection /></div>
            <div style={{ display: activeSection !== "profile" ? "none" : undefined }}><ProfileSection /></div>
            <div style={{ display: activeSection !== "more" ? "none" : undefined }}><MoreSection /></div>
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
              <strong>{(() => {
                const uid = localStorage.getItem("codequest_userId") || "user-default";
                const p = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
                return `${p.filter((x: any) => x.status === "completed").length} / 5`;
              })()}</strong>
            </div>
            <div className="leaderboard-bar">
              <div className="leaderboard-bar-fill leaderboard-bar-fill--animated" style={{ width: `${(() => {
                const uid = localStorage.getItem("codequest_userId") || "user-default";
                const p = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
                return (p.filter((x: any) => x.status === "completed").length / 5) * 100;
              })()}%` }} />
            </div>
          </div>
        </div>

        <div className="r-card">
          <h3 className="missions-title">Misi Harian</h3>
          <div className="missions-list">
            {(() => {
              const uid = localStorage.getItem("codequest_userId") || "user-default";
              const progress = JSON.parse(localStorage.getItem(`codequest_progress_${uid}`) || "[]");
              const lessonsDone = progress.filter((p: any) => p.status === "completed").length;
              const sidebarMissions = [
                { icon: Zap, label: "Selesaikan 3 pelajaran", done: Math.min(lessonsDone, 3), total: 3, xp: 20 },
                { icon: Trophy, label: "Streak 1 hari", done: Math.min(streak, 1), total: 1, xp: 15 },
                { icon: Zap, label: "Dapatkan 50 XP", done: Math.min(xp, 50), total: 50, xp: 30 },
              ];
              return sidebarMissions.map((m, i) => {
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
              });
            })()}
          </div>
        </div>

        {userName === "Pengguna" && (
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
        )}
      </div>

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

      <Modal open={showProfile} onClose={() => setShowProfile(false)} title="Buat Profil">
        <div className="form-stack">
          <div className="form-group">
            <label className="form-label">Nama</label>
            <input className="form-input" placeholder="Masukkan nama kamu" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="Masukkan email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
          </div>
          <button className="form-submit form-submit--primary" onClick={handleCreateProfile}>SIMPAN</button>
        </div>
      </Modal>

      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Masuk">
        <div className="form-stack">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" placeholder="Masukkan email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Kata Sandi</label>
            <input className="form-input" placeholder="Masukkan kata sandi" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </div>
          <button className="form-submit form-submit--secondary" onClick={handleLogin}>MASUK</button>
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
