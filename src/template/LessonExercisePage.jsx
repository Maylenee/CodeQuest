import React, { useState } from "react";

/**
 * Recreation of the W3Schools "HTML Introduction Exercises" page
 * (the html_exercise_embed.asp multiple-choice widget).
 */

const TOP_TABS = [
  "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP", "W3.CSS",
  "C", "C++", "C#", "HOW TO", "BOOTSTRAP", "REACT", "MYSQL", "JQUERY", "EXCEL", "XM",
];

const QUESTION = {
  index: 1,
  total: 3,
  prompt: "What does HTML stand for?",
  options: [
    "Hot Typing Markup Language",
    "Home Typing Modern Language",
    "Hyper Text Markup Language",
    "Home Testing Mixed Language",
  ],
  correct: 2,
};

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="inline-block ml-1">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TopNav() {
  return (
    <header className="border-b border-slate-200">
      <div className="flex items-center h-14 px-4 gap-6">
        <div className="flex items-center gap-1 text-green-600 font-bold text-xl">
          <span className="bg-green-600 text-white w-8 h-8 rounded flex items-center justify-center text-sm">
            W<sup className="text-[9px]">3</sup>
          </span>
          <span className="text-slate-800 text-[13px] leading-3 font-semibold">schools</span>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-[14px] text-slate-700 font-medium">
          {["Tutorials", "References", "Exercises", "Certificates"].map((l) => (
            <span key={l} className="flex items-center gap-0.5 hover:text-green-600 cursor-pointer">
              {l}
              <ChevronDown />
            </span>
          ))}
        </nav>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center border border-slate-300 rounded-full px-3 py-1.5 w-full max-w-xs text-[13px] text-slate-400">
            <span className="flex-1">Search...</span>
            <span>🔍</span>
          </div>
        </div>
        <span className="text-slate-500 cursor-pointer">⋮</span>
        <div className="hidden lg:flex items-center gap-5 text-[14px] text-slate-700 font-medium">
          <span className="hover:text-green-600 cursor-pointer">Get Certified</span>
          <span className="hover:text-green-600 cursor-pointer">Upgrade</span>
          <span className="hover:text-green-600 cursor-pointer">Academy</span>
          <span className="hover:text-green-600 cursor-pointer">Spaces</span>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2 rounded-sm">
          Sign In
        </button>
      </div>
      <div className="flex items-center bg-slate-800 text-white text-[13px] font-semibold overflow-x-auto">
        <span className="bg-slate-700 px-4 py-2.5 shrink-0">HTML</span>
        {TOP_TABS.slice(1).map((t) => (
          <span key={t} className="px-4 py-2.5 shrink-0 hover:bg-slate-700 cursor-pointer">
            {t}
          </span>
        ))}
        <span className="px-3 py-2.5 shrink-0">›</span>
      </div>
    </header>
  );
}

function Sidebar() {
  return <aside className="hidden lg:block w-[180px] shrink-0 bg-slate-100 min-h-full" />;
}

function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[180px] shrink-0 gap-3 py-4">
      <div className="bg-slate-800 text-white rounded-md p-3 text-[12px] text-center">
        <div className="flex items-center justify-center gap-1 font-bold text-[13px] mb-2">
          <span className="bg-white text-slate-800 w-5 h-5 rounded flex items-center justify-center text-[9px]">
            W<sup>3</sup>
          </span>
          schools
        </div>
        <p className="mb-2">Get Certified. Get Hired.</p>
        <p className="text-[10px] text-slate-300 mb-3">Turn your knowledge into credentials.</p>
        <div className="bg-white rounded-sm p-2 mb-3">
          <p className="text-[8px] font-bold text-slate-800">CERTIFICATE OF COMPLETION</p>
          <p className="text-[7px] text-slate-500 mt-1">Your Name</p>
          <p className="text-[7px] font-bold text-slate-700 mt-1">Certified HTML Developer</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 w-full text-[11px] font-semibold py-1.5 rounded-sm">
          Learn More
        </button>
      </div>
      <div className="flex gap-2 text-slate-500 justify-center text-base">
        <span>▶️</span><span>in</span><span>💬</span><span>f</span><span>📷</span>
      </div>
      <p className="text-center text-blue-600 text-[12px] cursor-pointer">REMOVE ADS</p>
      <div className="bg-slate-900 rounded-md overflow-hidden text-white">
        <div className="p-2 text-[11px]">
          Python Global Variables
          <div className="mt-2 flex items-center justify-center h-14 bg-slate-800 rounded">▶</div>
        </div>
      </div>
    </aside>
  );
}

function NextPrevBar({ label }) {
  return (
    <div className="flex items-center justify-between">
      <button className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50">
        ‹ Previous
      </button>
      {label ? (
        <span className="border border-slate-300 rounded-sm px-4 py-2 text-[13px] text-slate-500">
          {label}
        </span>
      ) : (
        <span />
      )}
      <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold">
        Next ›
      </button>
    </div>
  );
}

function ExerciseCard() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === QUESTION.correct;
  const isWrong = submitted && selected !== null && selected !== QUESTION.correct;

  function handleSubmit() {
    if (selected !== null) setSubmitted(true);
  }

  return (
    <div className="bg-slate-800 rounded-md px-8 py-10">
      <p className="text-center text-white text-[22px] font-semibold mb-4">
        HTML Exercise {QUESTION.index} of {QUESTION.total}
      </p>
      <div className="h-px bg-slate-600 w-52 mx-auto mb-6" />

      <p className="text-center text-white text-[16px] font-bold mb-6">{QUESTION.prompt}</p>

      <div className="space-y-2 max-w-xl mx-auto mb-6">
        {QUESTION.options.map((opt, i) => {
          let extra = "bg-slate-700 hover:bg-slate-600";
          if (submitted) {
            if (i === QUESTION.correct) extra = "bg-green-700";
            else if (i === selected) extra = "bg-red-700";
            else extra = "bg-slate-700 opacity-60";
          } else if (selected === i) {
            extra = "bg-slate-600 ring-2 ring-green-400";
          }
          return (
            <button
              key={opt}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              className={`w-full flex items-center gap-3 text-left text-white text-[14px] rounded-sm px-4 py-3 transition-colors ${extra}`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 border-white shrink-0 ${
                  selected === i ? "bg-white" : ""
                }`}
              />
              {opt}
            </button>
          );
        })}
      </div>

      {submitted && (
        <p
          className={`text-center text-[14px] font-semibold mb-4 ${
            isCorrect ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "Correct!" : "Not quite — try again."}
        </p>
      )}

      <div className="flex justify-center mb-8">
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-[14px] font-semibold px-5 py-2.5 rounded-sm"
        >
          Submit Answer »
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-1.5 bg-green-500 rounded-full transition-all"
            style={{ width: `${(QUESTION.index / QUESTION.total) * 33}%` }}
          />
        </div>
        <span className="text-[13px] text-slate-300 whitespace-nowrap">
          <span className="text-green-400">Sign in</span> to track your progress
        </span>
        <div className="flex gap-1.5">
          <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[11px]">G</span>
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[11px]">f</span>
          <span className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-[11px]">⌥</span>
        </div>
      </div>
    </div>
  );
}

export default function LessonExercisePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <TopNav />

      <div className="max-w-[1150px] mx-auto flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6 max-w-[870px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[32px] font-bold text-slate-900">HTML Introduction Exercises</h1>
            <span className="text-green-600 text-xl cursor-pointer">🔖</span>
          </div>

          <div className="mb-6">
            <NextPrevBar />
          </div>

          <p className="text-[15px] text-slate-700 mb-6">
            Test what you have learned about HTML introduction.
          </p>

          <ExerciseCard />

          <div className="mt-6">
            <NextPrevBar label="Sign in to track progress" />
          </div>
        </main>

        <RightRail />
      </div>

      <section className="bg-violet-100 mt-10 px-6 py-10">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-[24px] font-bold text-slate-900 mb-2">Create a W3Schools Account</h2>
            <p className="text-[14px] text-slate-700 max-w-md mb-4">
              Ad-free learning, track your progress, earn XP, streaks, compete in leagues, build
              and host websites, unlock coding challenges, and much more!
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["⚡ Earn XP", "🔥 Streaks", "🏅 Leagues", "🏠 Your Own Space"].map((t) => (
                <span key={t} className="bg-white text-[12px] px-3 py-1.5 rounded-full text-slate-700">
                  {t}
                </span>
              ))}
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-5 py-2.5 rounded-sm">
              Sign Up for Free
            </button>
          </div>
          <div className="w-56 shrink-0 bg-white rounded-md p-4 text-[12px]">
            <p className="flex justify-between mb-2 font-semibold">
              Your Progress <span className="text-blue-600">0%</span>
            </p>
            <div className="h-1.5 bg-slate-200 rounded-full mb-2">
              <div className="h-1.5 bg-green-500 rounded-full w-0" />
            </div>
            <p className="text-slate-500">0 / 50 lessons</p>
            <p className="text-slate-500">0 / 100 challenges</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 text-[13px] px-6 py-10">
        <div className="max-w-[1150px] mx-auto flex flex-wrap gap-6 mb-6 text-[13px] text-yellow-400 font-medium">
          {["PLUS", "SPACES", "GET CERTIFIED", "FOR TEACHERS", "PRACTICE", "CONTACT US"].map((l) => (
            <span key={l} className="cursor-pointer hover:text-yellow-300">
              {l}
            </span>
          ))}
        </div>
        <div className="max-w-[1150px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              h: "Top Tutorials",
              items: ["HTML Tutorial", "CSS Tutorial", "JavaScript Tutorial", "How To Tutorial", "SQL Tutorial", "Python Tutorial", "W3.CSS Tutorial", "Bootstrap Tutorial", "PHP Tutorial", "Java Tutorial", "C++ Tutorial", "jQuery Tutorial"],
            },
            {
              h: "Top References",
              items: ["HTML Reference", "CSS Reference", "JavaScript Reference", "SQL Reference", "Python Reference", "W3.CSS Reference", "Bootstrap Reference", "PHP Reference", "HTML Colors", "Java Reference", "AngularJS Reference", "jQuery Reference"],
            },
            {
              h: "Top Examples",
              items: ["HTML Examples", "CSS Examples", "JavaScript Examples", "How To Examples", "SQL Examples", "Python Examples", "W3.CSS Examples", "Bootstrap Examples", "PHP Examples", "Java Examples", "XML Examples", "jQuery Examples"],
            },
            {
              h: "Get Certified",
              items: ["HTML Certificate", "CSS Certificate", "JavaScript Certificate", "Front End Certificate", "SQL Certificate", "Python Certificate", "PHP Certificate", "jQuery Certificate", "Java Certificate", "C++ Certificate", "C# Certificate", "XML Certificate"],
            },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-white font-semibold mb-2">{col.h}</p>
              <ul className="space-y-1 text-slate-400">
                {col.items.map((i) => (
                  <li key={i} className="hover:text-white cursor-pointer">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-8 max-w-3xl mx-auto">
          W3Schools is optimized for learning and training. Examples might be simplified to
          improve reading and learning. Tutorials, references, and examples are constantly
          reviewed to avoid errors, but we cannot warrant full correctness of all content. While
          using W3Schools, you agree to have read and accepted our terms of use, cookies and
          privacy policy.
        </p>
        <p className="text-center text-slate-500 mt-4">
          Copyright 1999-2026 by Refsnes Data. All Rights Reserved. W3Schools is Powered by W3.CSS.
        </p>
      </footer>
    </div>
  );
}
