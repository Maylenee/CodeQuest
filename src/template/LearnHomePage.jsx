import React from "react";
import {
  Search,
  ChevronDown,
  Menu,
  Play,
  Award,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ---------- data ---------- */

const NAV_LINKS = [
  "Tutorials",
  "Exercises",
  "Certificates",
  "Services",
  "Spaces",
  "Plus",
];

const LANG_CARDS = [
  {
    name: "HTML",
    tag: "The language for building web pages",
    bg: "bg-[#c8492b]",
    btn: "bg-[#1a2233]",
    example: [
      "<!DOCTYPE html>",
      "<html>",
      "<body>",
      "",
      "<h1>My First Heading</h1>",
      "<p>My first paragraph.</p>",
      "",
      "</body>",
      "</html>",
    ],
  },
  {
    name: "CSS",
    tag: "The language for styling web pages",
    bg: "bg-[#f2cf4a]",
    btn: "bg-[#1a2233]",
    example: [
      "body {",
      "  background-color: linen;",
      "}",
      "",
      "h1 {",
      "  color: maroon;",
      "  margin-left: 40px;",
      "}",
    ],
  },
  {
    name: "JavaScript",
    tag: "The language for programming web pages",
    bg: "bg-[#1a2233]",
    btn: "bg-[#f2cf4a] text-[#1a2233]",
    dark: true,
    example: [
      "function myFunction(p1, p2) {",
      "  return p1 * p2;",
      "}",
      "",
      "document.getElementById('demo')",
      "  .innerHTML =",
      "  myFunction(4, 3);",
    ],
  },
  {
    name: "Python",
    tag: "A popular programming language",
    bg: "bg-[#efe7d8]",
    text: "text-[#1a2233]",
    btn: "bg-[#1a2233]",
    example: [
      "if 5 > 2:",
      "  print('Five is greater than two!')",
      "",
      "x = 5",
      "y = 'John'",
      "print(x)",
      "print(y)",
    ],
  },
  {
    name: "SQL",
    tag: "A language for accessing databases",
    bg: "bg-[#a9ddd6]",
    text: "text-[#1a2233]",
    btn: "bg-[#1a2233]",
    example: [
      "SELECT * FROM Customers",
      "WHERE Country = 'Mexico';",
    ],
  },
];

const SMALL_LANG_CARDS = [
  { name: "PHP", tag: "A server-side programming language", bg: "bg-[#f3c6cf]" },
  { name: "jQuery", tag: "A JS library for developing web pages", bg: "bg-[#a7dedb]" },
  { name: "Java", tag: "A popular programming language", bg: "bg-[#bfe3cf]" },
  { name: "C++", tag: "A powerful programming language", bg: "bg-[#f3c6cf]" },
  { name: "W3.CSS", tag: "A CSS framework for faster & responsive design", bg: "bg-[#a7dedb]" },
  { name: "Bootstrap", tag: "A CSS framework for designing better web pages", bg: "bg-[#1a2233]", dark: true },
];

const TAG_COLORS = ["bg-[#f3c6cf]", "bg-[#f2cf4a]", "bg-[#a7dedb]", "bg-[#1a2233]"];

const TAGS = [
  "C", "Kotlin", "Node.js", "React",
  "JSON", "Vue", "MySQL", "XML",
  "Sass", "Icons", "R", "Graphics",
  "SVG", "Canvas", "Raspberry Pi", "Cyber Security",
  "Colors", "Git", "Matplotlib", "NumPy",
  "Pandas", "SciPy", "ASP", "AngularJS",
  "AppML", "Go", "TypeScript", "Django",
  "MongoDB", "Statistics", "Data Science", "PostgreSQL",
  "HowTo", "Excel", "DSA", "Rust",
  "Machine Learning", "Artificial Intelligence", "Spaces", "Typing Speed",
  "Intro to Programming", "Bash", "Swift", "Angular",
];

/* ---------- small building blocks ---------- */

function CodePanel({ dark, lines }) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg w-full max-w-sm ${
        dark ? "bg-[#0f1420]" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-black/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <pre
        className={`p-4 text-[11px] leading-5 font-mono overflow-x-auto ${
          dark ? "text-slate-200" : "text-slate-700"
        }`}
      >
        {lines.join("\n")}
      </pre>
      <div className="px-3 pb-3">
        <button className="text-xs font-semibold px-3 py-1.5 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
          Try it Yourself »
        </button>
      </div>
    </div>
  );
}

function PillButton({ children, variant = "solid", className = "" }) {
  const base =
    "text-sm font-semibold px-5 py-2.5 rounded transition-colors inline-block";
  const styles =
    variant === "solid"
      ? "bg-emerald-500 text-white hover:bg-emerald-600"
      : "bg-transparent border border-current hover:bg-white/10";
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

function BigLangSection({ card }) {
  const textColor = card.dark ? "text-white" : card.text || "text-white";
  return (
    <section className={`${card.bg} ${textColor}`}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-6xl font-black tracking-tight">{card.name}</h2>
          <p className="mt-3 text-lg opacity-90 max-w-xs">{card.tag}</p>
          <div className="mt-6 flex gap-3">
            <PillButton>Learn {card.name.split(" ")[0]}</PillButton>
            <PillButton variant="outline">
              {card.name} Reference
            </PillButton>
          </div>
          <p className="mt-4 text-sm font-semibold underline underline-offset-2 cursor-pointer">
            {card.name} Certificate »
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <CodePanel dark={card.dark || card.bg.includes("1a2233")} lines={card.example} />
        </div>
      </div>
    </section>
  );
}

function SmallLangCard({ card }) {
  const textColor = card.dark ? "text-white" : "text-[#1a2233]";
  return (
    <div className={`${card.bg} ${textColor} p-8 flex flex-col justify-between h-full`}>
      <div>
        <h3 className="text-3xl font-black">{card.name}</h3>
        <p className="mt-2 text-sm opacity-90 max-w-[220px]">{card.tag}</p>
      </div>
      <div className="mt-8 flex gap-3">
        <PillButton className="!py-2 !px-4 !text-xs">Learn {card.name.split(".")[0]}</PillButton>
      </div>
    </div>
  );
}

/* ---------- main page ---------- */

export default function LearnHomePage() {
  return (
    <div className="font-sans text-[#1a2233] bg-white">
      {/* NAVBAR */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black">
              Dev<span className="text-emerald-500">Academy</span>
            </span>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              {NAV_LINKS.map((l) => (
                <span key={l} className="flex items-center gap-1 hover:text-[#1a2233] cursor-pointer">
                  {l}
                  <ChevronDown size={14} />
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Search size={18} className="text-slate-500" />
            <button className="hidden sm:block text-sm font-semibold px-4 py-1.5 rounded border border-slate-300 hover:bg-slate-50">
              Log in
            </button>
            <button className="hidden sm:block text-sm font-semibold px-4 py-1.5 rounded bg-emerald-500 text-white hover:bg-emerald-600">
              Sign Up
            </button>
            <Menu className="lg:hidden" size={22} />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#1a2233] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h1 className="text-5xl font-black leading-tight">Learn to Code</h1>
            <p className="mt-3 text-slate-300 max-w-md">
              Free tutorials, courses and references. We do our best to keep
              things fair and balanced, in order to help you make the best
              choice for you.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-10 text-sm max-w-md text-slate-300">
              <span>Free Tutorials</span>
              <span>References</span>
              <span>Exercises</span>
              <span>Certificates</span>
              <span>Videos</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-full border-2 border-slate-500 flex items-center justify-center">
              <Play size={20} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-300 font-semibold">No Upcoming Event</p>
          </div>
        </div>
      </section>

      {/* BIG LANGUAGE SECTIONS */}
      {LANG_CARDS.map((c) => (
        <BigLangSection key={c.name} card={c} />
      ))}

      {/* SMALL LANG GRID (PHP/jQuery/Java/C++/W3.CSS/Bootstrap) */}
      <section className="grid md:grid-cols-2">
        {SMALL_LANG_CARDS.map((c) => (
          <SmallLangCard key={c.name} card={c} />
        ))}
      </section>

      {/* TAG MOSAIC */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {TAGS.map((t, i) => {
          const color = TAG_COLORS[i % TAG_COLORS.length];
          const dark = color.includes("1a2233");
          return (
            <div
              key={t}
              className={`${color} ${
                dark ? "text-white" : "text-[#1a2233]"
              } h-20 flex items-center justify-center text-sm font-semibold text-center px-2 cursor-pointer hover:opacity-90`}
            >
              {t}
            </div>
          );
        })}
      </section>

      {/* LOGIN / SIGN UP */}
      <section className="bg-[#1a2233] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Log in / Sign Up</h2>
          <p className="mt-2 text-slate-300 text-sm max-w-lg mx-auto">
            Create an account to track your progress, get your own website,
            and access other features and learning material.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {["My Profile", "My Website", "My Certificates"].map((label) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-slate-600" />
                <span className="text-xs text-slate-300">{label}</span>
              </div>
            ))}
          </div>
          <PillButton className="mt-8">Sign Up for Free</PillButton>
        </div>
      </section>

      {/* CODE EDITOR */}
      <section className="bg-[#0f1420] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Code Editor</h2>
          <p className="mt-2 text-slate-300 text-sm max-w-lg mx-auto">
            With our online code editor, you can edit code and view the
            result in your browser.
          </p>
          <div className="mt-8 bg-[#1a2233] rounded-lg overflow-hidden max-w-2xl mx-auto text-left shadow-xl">
            <div className="flex text-xs">
              <div className="px-4 py-2 bg-emerald-600 font-semibold">index.html</div>
              <div className="px-4 py-2 text-slate-400">Result</div>
            </div>
            <pre className="p-4 text-[11px] font-mono text-slate-300 leading-5">
{`<h2>My First Web Page</h2>
<p>My first paragraph.</p>`}
            </pre>
          </div>
          <PillButton className="mt-6">Try the Editor »</PillButton>
        </div>
      </section>

      {/* SPACES */}
      <section className="bg-[#a7dedb] text-[#1a2233]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Web Spaces</h2>
          <p className="mt-2 text-sm max-w-lg mx-auto opacity-80">
            If you want to build your own website, check out Web Spaces.
            No installation required, get your own website up and running
            in minutes.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            <div className="bg-white rounded-lg p-5 shadow">
              <div className="h-24 rounded bg-slate-100 mb-3 flex items-center justify-center">
                <Code2 className="text-slate-400" />
              </div>
              <p className="text-xs font-semibold">Editor with live preview</p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow flex flex-col justify-between">
              <p className="text-sm font-semibold">Learn Coding &amp; Build a Site</p>
              <p className="text-xs opacity-70 mt-2">
                Combine learning with hands-on building.
              </p>
            </div>
          </div>
          <PillButton className="mt-8">Learn More</PillButton>
        </div>
      </section>

      {/* PLUS USER */}
      <section className="bg-[#1a2233] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Become a Plus User</h2>
          <p className="mt-2 text-slate-300 text-sm">And unlock powerful features</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-300 inline-block text-left">
            {[
              "Ad free version",
              "Build and host websites",
              "Unlimited practice tests",
              "Get certified",
              "And much more",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Sparkles size={14} className="text-emerald-400" /> {f}
              </li>
            ))}
          </ul>
          <div>
            <PillButton className="mt-8">Learn More</PillButton>
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="bg-[#efe7d8] text-[#1a2233]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">For Teachers</h2>
          <p className="mt-2 text-sm opacity-80 max-w-md mx-auto">
            Streamline your teaching with tools to manage classrooms, assign
            homework, and monitor student progress, all in one place.
          </p>
          <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto h-32 flex items-center justify-center">
            <Award className="text-slate-300" size={40} />
          </div>
          <PillButton className="mt-8">Learn More</PillButton>
        </div>
      </section>

      {/* DEV TOOLS */}
      <section className="bg-[#f3c6cf] text-[#1a2233]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Developer Tools</h2>
          <p className="mt-2 text-sm opacity-80">
            Free online tools for your everyday development tasks.
          </p>
          <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto flex items-center justify-between">
            <span className="text-sm font-semibold">Circle Crop Image</span>
            <div className="w-12 h-12 rounded-full bg-slate-200" />
          </div>
          <PillButton className="mt-8">Browse Tools</PillButton>
        </div>
      </section>

      {/* WEEKLY PROBLEM */}
      <section className="bg-[#1a2233] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Weekly Problem</h2>
          <p className="mt-2 text-slate-300 text-sm">
            A new coding challenge every week — solve for the win.
          </p>
          <div className="mt-8 bg-[#0f1420] rounded-lg p-5 max-w-md mx-auto text-left">
            <p className="text-emerald-400 text-xs font-semibold">Palindrome Number</p>
            <p className="text-xs text-slate-400 mt-1">Easy</p>
          </div>
          <PillButton className="mt-8">Start Solving</PillButton>
        </div>
      </section>

      {/* BUILD A PROJECT */}
      <section className="bg-[#bfe3cf] text-[#1a2233]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Build a Project</h2>
          <p className="mt-2 text-sm opacity-80">
            Step-by-step guides to help you build in your favorite language.
          </p>
          <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto text-left">
            <p className="text-sm font-semibold">Build a Personal Page</p>
          </div>
          <PillButton className="mt-8">Browse Projects</PillButton>
        </div>
      </section>

      {/* CODE GAME */}
      <section className="bg-[#3b2e5a] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Code Game</h2>
          <p className="mt-2 text-slate-300 text-sm">
            Help the fox collect the coins while learning to code.
          </p>
          <PillButton className="mt-8">Play Game</PillButton>
        </div>
      </section>

      {/* EXERCISES AND QUIZZES */}
      <section className="bg-[#1a2233] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Exercises and Quizzes</h2>
          <p className="mt-2 text-slate-300 text-sm">Test your skills.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-emerald-500 text-white text-sm font-semibold px-8 py-3 rounded hover:bg-emerald-600">
              Exercises
            </button>
            <button className="bg-[#f2cf4a] text-[#1a2233] text-sm font-semibold px-8 py-3 rounded hover:brightness-95">
              Quizzes
            </button>
          </div>
        </div>
      </section>

      {/* WEB TEMPLATES */}
      <section className="bg-[#a7dedb] text-[#1a2233]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black">Web Templates</h2>
          <p className="mt-2 text-sm opacity-80">
            Browse our selection of free responsive HTML templates.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 bg-white rounded shadow" />
            ))}
          </div>
          <PillButton className="mt-8">Browse Templates</PillButton>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="bg-[#0f1420] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-black">Kickstart your career</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Get certified by completing a course today!
          </p>
          <button className="mt-8 bg-emerald-500 text-white text-sm font-semibold px-8 py-3 rounded hover:bg-emerald-600 inline-flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
