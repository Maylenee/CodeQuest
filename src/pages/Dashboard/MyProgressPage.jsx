import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountLayout from "../../components/AccountLayout";
import { fetchMyProgress } from "../../lib/api";
import { LangLogo } from "../../components/icons";

function SpiderWebIllustration() {
  return (
    <svg viewBox="0 0 140 130" className="w-32 h-28 text-slate-300" fill="none">
      <rect x="45" y="10" width="70" height="55" rx="4" stroke="currentColor" strokeWidth="3" />
      <rect x="55" y="70" width="50" height="10" fill="currentColor" opacity="0.3" />
      <path d="M115 15 L135 5 M115 15 L138 15 M115 15 L132 30" stroke="currentColor" strokeWidth="1.5" />
      <path d="M115 15 L125 8 M115 15 L128 20 M115 15 L120 28" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="95" r="6" fill="#1e293b" />
      <circle cx="14" cy="90" r="2" fill="#1e293b" />
      <circle cx="26" cy="90" r="2" fill="#1e293b" />
      <path d="M20 60 L20 95" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-2 bg-green-500 rounded-full" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default function MyProgressPage() {
  const [userId] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null")?.id || null;
    } catch {
      return null;
    }
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    fetchMyProgress(userId)
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [userId]);

  const tracks = data?.tracks || [];
  const overall = data?.overall;

  if (!data || !tracks.length) {
    return (
      <AccountLayout active="My Progress">
        <div>
          <div className="bg-white rounded-lg border border-slate-200 p-8 flex items-center justify-between gap-6">
            <div>
              <h1 className="text-[24px] font-bold text-slate-900 mb-2">My Progress</h1>
              <p className="text-[14px] text-slate-600">You haven't started learning yet.</p>
              <p className="text-[14px] text-slate-600 mb-5">
                Begin your first tutorial to start tracking your progress.
              </p>
              <Link
                to="/learn"
                className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-5 py-2.5 rounded-md"
              >
                Browse Tutorials
              </Link>
            </div>
            <div className="hidden sm:block shrink-0">
              <SpiderWebIllustration />
            </div>
          </div>
        </div>
      </AccountLayout>
    );
  }

  const overallPercent = (() => {
    const total =
      (overall?.completedLessons || 0) +
      (overall?.completedExercises || 0) +
      (overall?.completedQuizzes || 0);
    const all =
      (overall?.totalLessons || 0) +
      (overall?.totalExercises || 0) +
      (overall?.totalQuizzes || 0);
    return all ? Math.round((total / all) * 100) : 0;
  })();

  return (
    <AccountLayout active="My Progress">
      <div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-[24px] font-bold text-slate-900 mb-1">My Progress</h1>
              <p className="text-[14px] text-slate-600">
                You've completed {overallPercent}% of all available content.
              </p>
            </div>
            <div className="flex items-center gap-5 text-[14px] text-slate-600">
              <span><b className="text-slate-800">{overall?.completedLessons || 0}</b>/{overall?.totalLessons || 0} Lessons</span>
              <span><b className="text-slate-800">{overall?.completedExercises || 0}</b>/{overall?.totalExercises || 0} Exercises</span>
              <span><b className="text-slate-800">{overall?.completedQuizzes || 0}</b>/{overall?.totalQuizzes || 0} Quizzes</span>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar percent={overallPercent} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks.map((t) => (
            <div key={t.trackId} className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <LangLogo name={t.name} className="w-10 h-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-bold text-slate-900 truncate">{t.name}</p>
                  <p className="text-[12px] text-slate-500">{t.percent}% complete</p>
                </div>
                <Link
                  to={`/learn/${t.slug}`}
                  className="text-green-600 text-[13px] font-semibold hover:underline whitespace-nowrap"
                >
                  {t.completedLessons > 0 ? "Continue" : "Start"}
                </Link>
              </div>
              <ProgressBar percent={t.percent} />
              <div className="grid grid-cols-3 gap-2 mt-3 text-[12px] text-slate-500">
                <span>{t.completedLessons}/{t.totalLessons} Lessons</span>
                <span>{t.completedExercises}/{t.totalExercises} Exercises</span>
                <span>{t.completedQuizzes}/{t.totalQuizzes} Quizzes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
