import React from "react";

/**
 * Recreation of the W3Schools "HTML Quiz" page layout.
 */

const TOP_TABS = [
  "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP", "W3.CSS",
  "C", "C++", "C#", "HOW TO", "BOOTSTRAP", "REACT", "MYSQL", "JQUERY", "EXCEL", "XM",
];

const NAV_LINKS = ["Tutorials", "References", "Exercises", "Certificates"];

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
          {NAV_LINKS.map((l) => (
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
  return <aside className="hidden lg:block w-[190px] shrink-0 bg-slate-100 min-h-full" />;
}

function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[210px] shrink-0 gap-3 py-4">
      <div className="border border-slate-200 rounded-md p-4 text-center">
        <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-lg mb-1">
          <span className="bg-green-600 text-white w-6 h-6 rounded flex items-center justify-center text-[10px]">
            W<sup className="text-[7px]">3</sup>
          </span>
          <span className="text-slate-800 text-[11px] leading-3 font-semibold">schools</span>
        </div>
        <p className="text-[13px] text-slate-600 mb-3">Sign in to track your progress and earn XP!</p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold py-2 rounded-sm mb-2">
          Sign In
        </button>
        <p className="text-[12px] text-slate-400 mb-2">or</p>
        <div className="flex justify-center gap-2 mb-2">
          <span className="w-7 h-7 border rounded flex items-center justify-center text-[13px]">G</span>
          <span className="w-7 h-7 border rounded bg-blue-600 text-white flex items-center justify-center text-[13px]">f</span>
          <span className="w-7 h-7 border rounded flex items-center justify-center text-[13px]">⌥</span>
        </div>
        <p className="text-[12px] text-slate-500">
          No account? <span className="text-green-600 font-medium">Register</span>
        </p>
      </div>

      <div className="flex gap-3 text-slate-500 justify-center text-lg">
        <span>▶️</span><span>in</span><span>💬</span><span>f</span><span>📷</span>
      </div>
      <p className="text-center text-blue-600 text-[13px] cursor-pointer">REMOVE ADS</p>

      <div className="bg-slate-900 rounded-md overflow-hidden text-white">
        <div className="bg-white text-slate-800 text-[11px] font-bold px-2 py-1">
          W<sup>3</sup>schools
        </div>
        <div className="p-3 text-[12px]">
          Python Global Variables
          <div className="mt-2 flex items-center justify-center h-16 bg-slate-800 rounded">▶</div>
        </div>
      </div>
    </aside>
  );
}

function NextPrevBar() {
  return (
    <div className="flex items-center justify-between">
      <button className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50">
        ‹ Previous
      </button>
      <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold">
        Next ›
      </button>
    </div>
  );
}

export default function HtmlQuizPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <TopNav />

      <div className="max-w-[1200px] mx-auto flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6 max-w-[740px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[34px] font-bold text-slate-900">HTML Quiz</h1>
            <span className="text-green-600 text-xl cursor-pointer">🔖</span>
          </div>

          <div className="mb-6">
            <NextPrevBar />
          </div>

          <p className="text-[15px] text-slate-700 mb-6">
            You can test your HTML skills with W3Schools' Quiz.
          </p>

          <h2 className="text-[24px] font-bold text-slate-900 mb-2">The Test</h2>
          <p className="text-[15px] text-slate-700 mb-2">
            The test contains 40 questions and there is no time limit.
          </p>
          <p className="text-[15px] text-slate-700 mb-6">
            The test is not official, it's just a nice way to see how much you know, or don't
            know, about HTML.
          </p>

          <h2 className="text-[24px] font-bold text-slate-900 mb-2">Count Your Score</h2>
          <p className="text-[15px] text-slate-700 mb-6">
            You will get 1 point for each correct answer. At the end of the Quiz, your total
            score will be displayed. Maximum score is 40 points.
          </p>

          <div className="bg-slate-100 rounded-md p-6 mb-6">
            <h3 className="text-[22px] font-bold text-slate-900 mb-1">Start the Quiz</h3>
            <p className="text-[15px] text-slate-700 mb-4">Good luck!</p>
            <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-semibold px-4 py-2.5 rounded-sm">
              Start the HTML Quiz ›
            </button>
          </div>

          <div className="bg-yellow-100 rounded-md px-5 py-4 text-[14px] text-slate-800 mb-8">
            If you don't know HTML, we suggest that you read our{" "}
            <span className="underline">HTML Tutorial</span> from scratch.
          </div>

          <div className="border border-slate-200 rounded-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="text-green-600 text-[12px] font-bold mb-1">HTML CERTIFICATION</p>
                <h3 className="text-[22px] font-bold text-slate-900 mb-2">Get Certified in HTML</h3>
                <p className="text-[14px] text-slate-600 mb-4">
                  Complete the W3Schools HTML course, strengthen your knowledge, and earn a
                  certificate you can add to your CV, portfolio, and LinkedIn profile.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-sm">
                  Get Certified Today
                </button>
              </div>
              <div className="w-full sm:w-52 shrink-0 border border-slate-200 rounded-md p-3 text-center">
                <p className="text-[10px] font-bold text-slate-700 mb-1">CERTIFICATE OF COMPLETION</p>
                <p className="text-[8px] text-slate-500 mb-2">This certifies that</p>
                <p className="text-[11px] font-semibold mb-2">Your Name</p>
                <p className="text-[9px] text-slate-500">Certified HTML Developer</p>
              </div>
            </div>
          </div>

          <p className="text-center text-blue-600 text-[13px] mb-4 cursor-pointer">REMOVE ADS</p>

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50">
              ‹ Previous
            </button>
            <span className="border border-slate-300 rounded-sm px-4 py-2 text-[13px] text-slate-500">
              Sign in to track progress
            </span>
            <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold">
              Next ›
            </button>
          </div>
        </main>

        <RightRail />
      </div>

      <section className="bg-violet-100 mt-10 px-6 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-[26px] font-bold text-slate-900 mb-2">Create a W3Schools Account</h2>
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
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
          reviewed to avoid errors, but we cannot warrant full correctness of all content.
        </p>
        <p className="text-center text-slate-500 mt-4">
          Copyright 1999-2026 by Refsnes Data. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
