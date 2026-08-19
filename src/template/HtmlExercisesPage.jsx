import React, { useState } from "react";

/**
 * Recreation of the W3Schools "HTML Exercises" page layout.
 */

const TOP_TABS = [
  "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP", "W3.CSS",
  "C", "C++", "C#", "HOW TO", "BOOTSTRAP", "REACT", "MYSQL", "JQUERY", "EXCEL", "XM",
];

const EXERCISES = [
  { name: "Introduction", count: 8 },
  { name: "Basic", count: 4 },
  { name: "Elements", count: 3 },
  { name: "Attributes", count: 6 },
  { name: "Headings", count: 3 },
  { name: "Paragraphs", count: 6 },
  { name: "Styles", count: 7 },
  { name: "Formatting", count: 6 },
  { name: "Quotations", count: 6 },
  { name: "Comments", count: 3 },
  { name: "Colors", count: 5 },
  { name: "RGB Colors", count: 3 },
  { name: "Hex Colors", count: 2 },
  { name: "HSL Colors", count: 3 },
  { name: "CSS", count: 8 },
  { name: "Links", count: 5 },
  { name: "Link Colors", count: 3 },
  { name: "Bookmarks", count: 3 },
  { name: "Images", count: 7 },
  { name: "Image Map", count: 3 },
  { name: "Background Images", count: 3 },
  { name: "Picture", count: 3 },
  { name: "Favicon", count: 3 },
  { name: "Title", count: 3 },
  { name: "Tables", count: 5 },
  { name: "Table Borders", count: 5 },
  { name: "Table Sizes", count: 3 },
  { name: "Table Headers", count: 3 },
  { name: "Table Padding/Spacing", count: 6 },
  { name: "Table Colspan and Rowspan", count: 3 },
  { name: "Lists", count: 3 },
  { name: "Unordered Lists", count: 4 },
  { name: "Ordered Lists", count: 4 },
  { name: "Description Lists", count: 3 },
  { name: "Block and Inline", count: 3 },
  { name: "Div element", count: 3 },
  { name: "Classes", count: 4 },
  { name: "Id", count: 3 },
  { name: "Iframes", count: 6 },
  { name: "Scripts", count: 6 },
  { name: "Head", count: 3 },
  { name: "Responsive", count: 3 },
  { name: "Computercode", count: 4 },
  { name: "Semantic Elements", count: 3 },
  { name: "Entities", count: 3 },
  { name: "Forms", count: 6 },
  { name: "Form Attributes", count: 3 },
  { name: "Form Elements", count: 4 },
  { name: "Input Types", count: 6 },
  { name: "Input Attributes", count: 6 },
  { name: "Input Form Attributes", count: 3 },
];

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

function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[180px] shrink-0 gap-3 py-4">
      <div className="bg-slate-800 text-white rounded-md p-3 text-[12px] text-center">
        <p className="mb-2">Get Certified. Get Hired.</p>
        <p className="text-[10px] text-slate-300 mb-3">Turn your knowledge into credentials.</p>
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

function ExerciseRow({ name, count }) {
  return (
    <div className="flex items-center border-l-4 border-green-500 bg-white shadow-sm rounded-sm mb-2">
      <div className="flex-1 px-4 py-3">
        <p className="text-[15px] font-semibold text-slate-800">{name}</p>
        <p className="text-[12px] text-slate-500">{count} exercises</p>
      </div>
      <button className="mr-3 border border-slate-300 hover:bg-slate-50 text-[13px] text-slate-700 px-4 py-1.5 rounded-sm">
        Open
      </button>
    </div>
  );
}

export default function HtmlExercisesPage() {
  const [query, setQuery] = useState("");
  const filtered = EXERCISES.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <TopNav />

      <div className="max-w-[1150px] mx-auto flex">
        <main className="flex-1 px-6 py-6 max-w-[860px]">
          {/* ad banner */}
          <div className="border border-slate-200 rounded-md flex items-center gap-4 p-3 mb-6">
            <div className="w-14 h-14 bg-slate-100 rounded shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-slate-800">100+ Templat Estetik</p>
              <p className="text-[12px] text-slate-500">PPT AI Gratis 2026</p>
              <p className="text-[11px] text-slate-400">Buat audiens dengan visual menawan. AI TeraBox atur desain, kamu santai.</p>
            </div>
            <button className="bg-blue-600 text-white text-[12px] font-semibold px-4 py-2 rounded-sm shrink-0">
              OPEN ›
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[30px] font-bold text-slate-900">HTML Exercises</h1>
            <span className="text-green-600 text-xl cursor-pointer">🔖</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50">
              ‹ Previous
            </button>
            <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold">
              Next ›
            </button>
          </div>

          <p className="text-[15px] text-slate-700 mb-4">
            Test your HTML skills with exercises from all categories:
          </p>

          <div className="bg-slate-100 rounded-md p-5">
            <h2 className="text-[22px] font-bold text-slate-900 mb-1">Exercises</h2>
            <p className="text-[13px] text-slate-500 mb-4">
              Tip: <span className="text-green-600">Sign in</span> to track your progress.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Filter categories (e.g. heading, table, form, etc.)"
                className="flex-1 text-[13px] border border-slate-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <span className="text-[12px] text-slate-500 whitespace-nowrap">0/51 done</span>
            </div>

            {filtered.map((ex) => (
              <ExerciseRow key={ex.name} name={ex.name} count={ex.count} />
            ))}
          </div>

          <h2 className="text-[22px] font-bold text-slate-900 mt-8 mb-2">Log in to track your progress</h2>
          <p className="text-[14px] text-slate-700 mb-2">
            If you haven't already, <span className="text-green-600">sign up</span> to become a
            W3Schooler, and get points for every exercise you complete.
          </p>
          <p className="text-[14px] text-slate-700 mb-6">
            As a logged-in W3Schools user you will have access to many features like{" "}
            <span className="text-green-600">your own web page</span>,{" "}
            <span className="text-green-600">track your learning progress</span>,{" "}
            <span className="text-green-600">receive personal guided paths</span>, and more.
          </p>

          <h2 className="text-[22px] font-bold text-slate-900 mb-2">The Exercise</h2>
          <p className="text-[14px] text-slate-700 mb-2">
            The exercises are a mix of "multiple choice" and "fill in the blanks" questions.
          </p>
          <p className="text-[14px] text-slate-700 mb-2">
            There are between 3 and 9 questions in each category.
          </p>
          <p className="text-[14px] text-slate-700 mb-2">
            The answer can be found in the corresponding tutorial chapter.
          </p>
          <p className="text-[14px] text-slate-700 mb-8">
            If you're stuck, or answer wrong, you can try again or hit the "Show Answer" button
            to see the correct answer.
          </p>

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
                <p className="text-[11px] font-semibold mb-2">Your Name</p>
                <p className="text-[9px] text-slate-500">Certified HTML Developer</p>
              </div>
            </div>
          </div>

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
          reviewed to avoid errors, but we cannot warrant full correctness of all content.
        </p>
        <p className="text-center text-slate-500 mt-4">
          Copyright 1999-2026 by Refsnes Data. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
