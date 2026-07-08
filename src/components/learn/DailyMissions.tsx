import { useEffect, useState } from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Target, Zap, Trophy } from "lucide-react";
import { useGameStore } from "../../lib/store";
import { userGet, userUpdate } from "../../api";

const missionDefs = [
  { id: "lessons", icon: Zap, label: "Selesaikan 3 pelajaran", total: 3, xp: 20 },
  { id: "streak", icon: Target, label: "Streak 1 hari", total: 1, xp: 15 },
  { id: "xp_target", icon: Trophy, label: "Dapatkan 50 XP", total: 50, xp: 30 },
];

export function DailyMissions() {
  const { xp, streak, addXp } = useGameStore();
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
  const missions = missionDefs.map((m) => {
    let done = 0;
    if (m.id === "lessons") done = Math.min(lessonsDone, m.total);
    else if (m.id === "streak") done = Math.min(streak, m.total);
    else if (m.id === "xp_target") done = Math.min(xp, m.total);
    const isComplete = done >= m.total;
    const isClaimed = claimed.includes(m.id);
    return { ...m, done, isComplete, isClaimed };
  });

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
      <h3 className="missions-title">Misi Harian</h3>
      <div className="missions-list">
        {missions.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.id} className="missions-card">
              <div className="missions-row">
                <Icon className="missions-icon" />
                <span className="missions-label">{m.label}</span>
                <span className="missions-reward">+{m.xp} XP</span>
              </div>
              <ProgressBar value={m.done} max={m.total} />
              {m.isComplete && !m.isClaimed && (
                <button
                  onClick={() => claimReward(m.id, m.xp)}
                  className="sidebar-missions-claim"
                >
                  KLAIM +{m.xp} XP
                </button>
              )}
              {m.isClaimed && (
                <p className="missions-claimed">✓ Diklaim</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
