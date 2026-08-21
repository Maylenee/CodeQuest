import React, { useState, useEffect, useMemo } from "react";
import AccountLayout from "../../components/AccountLayout";
import OnboardingCarousel from "../../components/OnboardingCarousel";
import { fetchLeague } from "../../lib/api";
import { Clock, Info, Lock, Trophy, ArrowUp, ArrowDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static decorative data                                             */
/* ------------------------------------------------------------------ */

const LEAGUES = [
  { name: "Wood", icon: "💠", unlocked: true },
  { name: "Bronze", icon: "🔺", unlocked: false },
  { name: "Silver", icon: "🔺", unlocked: false },
];

const HALL_OF_FAME = {
  intro:
    "The Hall of Fame highlights standout learners across weeks — whether you've climbed fast, finished strong, or kept showing up.",
  sections: [
    {
      key: "highest-xp",
      title: "Highest weekly XP",
      icon: "🅆",
      unit: "XP",
      entries: [
        { rank: 1, name: "MichaelK", avatar: "🏴‍☠️", boosted: true, value: 56710 },
        { rank: 2, name: "pilotini", avatar: "🦊", boosted: true, value: 37045 },
      ],
    },
    {
      key: "top10-finishes",
      title: "Top 10 finishes",
      icon: "🥇",
      unit: "",
      entries: [
        { rank: 1, name: "ThorstenBylicki", avatar: "🥷", badge: "🎯", boosted: true, value: 5 },
        { rank: 2, name: "BinaryCat44BBB", avatar: "🦊", boosted: true, value: 4 },
        { rank: 3, name: "CyberDebugger7375", avatar: "🦊", boosted: false, value: 4 },
        { rank: 4, name: "pilotini", avatar: "🦊", boosted: true, value: 3 },
      ],
    },
    {
      key: "weekly-streaks",
      title: "Weekly streaks",
      icon: "⚡",
      unit: "weeks",
      entries: [
        { rank: 1, name: "yatishmadhav", avatar: "🦊", badge: "💪", boosted: true, value: 57 },
        { rank: 2, name: "NiteCoder18", avatar: "🏴‍☠️", boosted: true, value: 57 },
        { rank: 3, name: "LogicTiger88", avatar: "🧙", boosted: true, value: 57 },
        { rank: 4, name: "Fatih", avatar: "🥷", badge: "😎", boosted: true, value: 57 },
        { rank: 5, name: "CleverTiger94", avatar: "🏴‍☠️", boosted: true, value: 57 },
        { rank: 6, name: "angelcrsq", avatar: "🥷", badge: "🎯", boosted: false, value: 56 },
        { rank: 7, name: "PixelHacker76", avatar: "🐱", badge: "😎", boosted: false, value: 56 },
        { rank: 8, name: "Eikinskjaldi", avatar: "🧝", boosted: true, value: 55 },
        { rank: 9, name: "AyeshaArshadHussain", avatar: "🥷", badge: "🎯", boosted: false, value: 54 },
        { rank: 10, name: "Rodney", avatar: "🦉", boosted: true, value: 53 },
      ],
    },
    {
      key: "breakout-stars",
      title: "Breakout stars",
      icon: "⭐",
      unit: "XP",
      entries: [
        { rank: 1, name: "MichaelK", avatar: "🏴‍☠️", boosted: true, value: 42180 },
        { rank: 2, name: "pilotini", avatar: "🦊", boosted: true, value: 30660 },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Avatar({ emoji, size = "w-9 h-9 text-lg" }) {
  return (
    <span
      className={`${size} rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0`}
    >
      {emoji}
    </span>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-[15px] font-semibold transition-colors ${
        active ? "bg-green-100 text-green-700" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Weekly League view                                                 */
/* ------------------------------------------------------------------ */

function LeagueAvatar({ name, isYou }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white shrink-0 ${
        isYou ? "bg-green-600" : "bg-slate-400"
      }`}
    >
      {initial}
    </span>
  );
}

function WeeklyLeagueView({ rows = [], currentUser }) {
  const data = rows.length ? rows : [];
  return (
    <>
      {/* League switcher */}
      <div className="flex items-center justify-center gap-16 mb-3">
        {LEAGUES.map((league) => (
          <div key={league.name} className="flex flex-col items-center gap-2">
            {league.unlocked ? (
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center text-4xl shadow-inner">
                💠
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 relative">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                    background: "#E5E8EB",
                  }}
                />
                <Lock className="w-5 h-5 text-slate-400 relative z-10" />
              </div>
            )}
            <span
              className={`text-[15px] font-semibold ${
                league.unlocked ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {league.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-500 text-[14px] mb-1">
        Top 5 advance to the next league
      </p>
      <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[13px] mb-8">
        <Clock className="w-3.5 h-3.5" />
        <span>This week</span>
      </div>

      {/* Ranked list */}
      <div className="max-w-lg mx-auto space-y-2">
        {data.length === 0 && (
          <p className="text-center text-slate-400 text-[14px] py-12">
            No activity yet this week. Earn XP to climb the league!
          </p>
        )}
        {data.map((row) => {
          const showPromotionDivider = row.rank === 6 && data.length > 6;
          const showDemotionDivider = row.rank === 16 && data.length >= 16;

          return (
            <React.Fragment key={row.userId || row.rank}>
              {showPromotionDivider && (
                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 text-[13px] font-semibold rounded-md py-2 my-3">
                  <ArrowUp className="w-3.5 h-3.5" /> Promotion Zone <ArrowUp className="w-3.5 h-3.5" />
                </div>
              )}
              {showDemotionDivider && (
                <div className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 text-[13px] font-semibold rounded-md py-2 my-3">
                  <ArrowDown className="w-3.5 h-3.5" /> Demotion Zone <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`flex items-center gap-4 rounded-lg px-4 py-3 border ${
                  row.isCurrentUser ? "bg-green-50 border-green-100" : "border-slate-100"
                }`}
              >
                <span className="w-4 text-[14px] text-slate-400 shrink-0">{row.rank}</span>
                <LeagueAvatar name={row.name} isYou={row.isCurrentUser} />
                <span className="text-[15px] text-slate-800 flex-1">{row.name}</span>
                {row.isCurrentUser && (
                  <span className="bg-slate-100 text-slate-600 text-[12px] font-semibold px-2 py-0.5 rounded">
                    You
                  </span>
                )}
                <span className="text-[14px] text-slate-500 whitespace-nowrap">
                  {Number(row.weeklyXp || 0).toLocaleString()} XP
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {currentUser && (
        <div className="max-w-lg mx-auto mt-4 flex items-center justify-center gap-2 bg-slate-50 border border-slate-100 rounded-lg py-3 text-[14px] text-slate-600">
          <Trophy className="w-4 h-4 text-amber-400" />
          Your rank: <span className="font-semibold text-slate-800">#{currentUser.rank}</span>
          <span className="text-slate-400">·</span>
          {Number(currentUser.weeklyXp || 0).toLocaleString()} XP this week
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hall of Fame view                                                  */
/* ------------------------------------------------------------------ */

function HallOfFameSection({ section }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden mb-5">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[13px]">
          {section.icon}
        </span>
        <h3 className="text-[15px] font-semibold text-slate-900">{section.title}</h3>
        <Info className="w-3.5 h-3.5 text-slate-300" />
      </div>
      <div>
        {section.entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center gap-4 px-5 py-3 border-b last:border-b-0 border-slate-50"
          >
            <span className="w-4 text-[14px] text-slate-400 shrink-0">{entry.rank}</span>
            <div className="relative shrink-0">
              <Avatar emoji={entry.avatar} />
              {entry.badge && (
                <span className="absolute -top-1 -right-1 text-[11px]">{entry.badge}</span>
              )}
            </div>
            <span className="text-[15px] text-slate-800">{entry.name}</span>
            {entry.boosted && (
              <span className="text-[11px] font-bold italic text-violet-600 bg-violet-50 px-2 py-0.5 rounded">
                ⚡ BOOSTED
              </span>
            )}
            <span className="flex-1" />
            <span className="text-[14px] text-slate-500 whitespace-nowrap">
              {entry.value.toLocaleString()}
              {section.unit ? ` ${section.unit}` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HallOfFameView() {
  return (
    <>
      <div className="flex flex-col items-center text-center mb-8">
        <Trophy className="w-14 h-14 text-amber-400 mb-3" />
        <h2 className="text-[26px] font-bold text-slate-900 mb-2">Hall of Fame</h2>
        <p className="text-[14px] text-slate-500 max-w-md">{HALL_OF_FAME.intro}</p>
      </div>

      <div className="max-w-lg mx-auto">
        {HALL_OF_FAME.sections.map((section) => (
          <HallOfFameSection key={section.key} section={section} />
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LeaguePage() {
  const [tab, setTab] = useState("weekly"); // "weekly" | "hall-of-fame"
  const [onboarded, setOnboarded] = useState(false);
  const [league, setLeague] = useState(null);

  const userId = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null")?.id || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!onboarded || !userId) return;
    let alive = true;
    fetchLeague(userId)
      .then((d) => alive && setLeague(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [onboarded, userId]);

  return (
    <AccountLayout active="League">
      <div className="max-w-3xl mx-auto pt-6">
        {!onboarded ? (
          <OnboardingCarousel embedded onFinish={() => setOnboarded(true)} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex bg-slate-50 rounded-xl p-1">
                <TabButton
                  label="Weekly League"
                  active={tab === "weekly"}
                  onClick={() => setTab("weekly")}
                />
                <TabButton
                  label="Hall of Fame"
                  active={tab === "hall-of-fame"}
                  onClick={() => setTab("hall-of-fame")}
                />
              </div>
              <a href="#" className="text-[14px] font-semibold text-green-600 hover:text-green-700">
                League Explained
              </a>
            </div>

            {tab === "weekly" ? (
              <WeeklyLeagueView rows={league?.leaderboard || []} currentUser={league?.currentUser} />
            ) : (
              <HallOfFameView />
            )}
          </>
        )}
      </div>
    </AccountLayout>
  );
}
