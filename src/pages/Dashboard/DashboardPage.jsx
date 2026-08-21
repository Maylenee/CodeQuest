import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AccountLayout from "../../components/AccountLayout";
import { fetchDashboard } from "../../lib/api";
import { LangLogo } from "../../components/icons";

const WD = ["S", "M", "T", "W", "T", "F", "S"];

function AccessibilityIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M6 9.5c2 .8 4 1.1 6 1.1s4-.3 6-1.1M12 10.6v3l-2 6M12 13.6l2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ className = "" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatChip({ value, label }) {
  return (
    <span className="text-[14px] text-slate-600">
      <span className="font-semibold text-slate-800">{value}</span> {label}
    </span>
  );
}

function AvatarCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-end p-6 relative overflow-hidden min-h-[290px]">
      <span className="absolute top-5 right-5 w-3 h-3 rounded-full bg-yellow-300" />
      <div className="flex-1 flex items-center justify-center w-full">
        <span className="text-8xl blur-sm select-none">🦊</span>
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-6 py-2.5 rounded-md mb-3">
        Get your avatar
      </button>
      <span className="h-3 w-24 bg-slate-100 rounded blur-[2px]" />
    </div>
  );
}

function StreakCard({ streakCurrent = 0, streakWeek = [] }) {
  const today = new Date();
  const labels = streakWeek.map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (streakWeek.length - 1 - i));
    return WD[d.getDay()];
  });
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl">🔥</span>
        <div>
          <p className="text-[15px] font-semibold text-slate-800">Current Streak</p>
          <p className="text-[22px] font-bold text-orange-500">
            {streakCurrent} <span className="text-[15px] font-medium text-slate-600">days</span>
          </p>
        </div>
      </div>
      <hr className="border-slate-100 my-4" />
      <div className="flex justify-between">
        {streakWeek.map((active, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className={`text-2xl ${active ? "" : "opacity-30 grayscale"}`}>🔥</span>
            <span
              className={`text-[12px] font-medium ${
                active ? "text-orange-500" : "text-slate-400"
              }`}
            >
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyLeagueCard({ weeklyXp = 0 }) {
  const pct = Math.min(100, Math.round((weeklyXp / 50) * 100));
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2l2.6 6.2L21 9l-5 4.5L17.5 20 12 16.7 6.5 20 8 13.5 3 9l6.4-.8L12 2z" />
        </svg>
      </div>
      <p className="text-[17px] font-bold text-slate-900 mb-2">Weekly League</p>
      <p className="text-[13px] text-slate-500 mb-4">
        {weeklyXp >= 50 ? "You're in! Keep earning XP." : `Earn 50 XP to join the league.`}
      </p>
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
        <div className="h-1.5 bg-violet-400 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[12px] text-slate-500 mb-4 self-end">{weeklyXp}/50XP</p>
      <Link
        to="/dashboard/league"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white text-[14px] font-semibold px-5 py-2.5 rounded-md flex items-center justify-center gap-1.5"
      >
        ⚡ Go to League
      </Link>
    </div>
  );
}

function MyLearningCard({ learning = [] }) {
  if (!learning.length) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <h2 className="text-[20px] font-bold text-slate-900 mb-5">My Learning</h2>
        <div className="flex flex-col items-center text-center py-8">
          <p className="text-[16px] font-semibold text-slate-800">You haven't started learning yet.</p>
          <p className="text-[14px] text-slate-500 mt-1 mb-4">
            Begin your first tutorial to start tracking your progress.
          </p>
          <Link
            to="/learn"
            className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-5 py-2.5 rounded-md"
          >
            Browse Tutorials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <h2 className="text-[20px] font-bold text-slate-900 mb-5">My Learning</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {learning.map((t) => (
          <Link
            key={t.trackId}
            to={`/learn/${t.slug}`}
            className="border border-slate-200 rounded-lg px-5 py-4 flex items-center gap-4 hover:border-green-400 transition-colors"
          >
            <LangLogo name={t.name} className="w-12 h-12 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-slate-900 truncate">{t.name}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-green-500 rounded-full"
                    style={{ width: `${t.percent}%` }}
                  />
                </div>
                <span className="text-[12px] text-slate-500 whitespace-nowrap">
                  {t.completedLessons}/{t.totalLessons} · {t.percent}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CodingWorkspaceCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 flex items-center justify-between">
      <h2 className="text-[20px] font-bold text-slate-900">Coding Workspace</h2>
      <button className="border border-slate-300 hover:bg-slate-50 text-[14px] font-semibold text-slate-800 px-5 py-2.5 rounded-md flex items-center gap-1.5">
        + Create Space
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null");
    } catch {
      return null;
    }
  });
  const userId = user?.id || null;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    fetchDashboard(userId)
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [userId]);

  const firstName = data?.user?.firstName || user?.first_name || "";
  const stats = data?.stats;
  const learning = data?.learning || [];
  const weeklyXp = data?.counts ? Math.min(50, stats?.total_xp || 0) : 0;

  const rightExtras = (
    <>
      <button className="hidden sm:flex items-center gap-2 border border-slate-200 rounded-full pl-2 pr-3 py-1.5 text-[14px] font-medium text-slate-700 hover:bg-slate-50">
        <span className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
          <AccessibilityIcon className="w-4 h-4 text-white" />
        </span>
        Accessibility
        <ChevronDown />
      </button>
      <a href="#" className="hidden sm:inline text-[14px] font-medium text-slate-700 hover:text-slate-900">
        Pricing
      </a>
    </>
  );

  return (
    <AccountLayout active="Dashboard" rightExtras={rightExtras}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold text-slate-900">Hi, {firstName || "there"}!</h1>
        </div>
        <div className="flex items-center gap-5 flex-wrap text-[14px]">
          <span className="font-semibold text-slate-800">Your Stats:</span>
          <StatChip value={stats?.total_xp ?? 0} label="Total XP" />
          <StatChip value={stats?.lessons_done ?? 0} label="Lessons" />
          <StatChip value={stats?.exercises_done ?? 0} label="Exercises" />
          <StatChip value={stats?.quizzes_done ?? 0} label="Quizzes" />
          <StatChip value={stats?.challenges_done ?? 0} label="Challenges" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <AvatarCard />
        <StreakCard
          streakCurrent={stats?.streak_current ?? 0}
          streakWeek={data?.streakWeek || []}
        />
        <WeeklyLeagueCard weeklyXp={weeklyXp} />
      </div>

      <div className="mb-6">
        <MyLearningCard learning={learning} />
      </div>

      <CodingWorkspaceCard />
    </AccountLayout>
  );
}
