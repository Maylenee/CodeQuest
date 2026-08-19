import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Play,
  Check,
  Facebook,
  Github,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";
import Logo from '../components/Logo';

/* ---------- data ---------- */

const TOP_NAV = ["Tutorials", "References", "Exercises", "Certificates"];

const LANG_TABS = [
  "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP",
  "W3.CSS", "C", "C++", "C#", "HOW TO", "BOOTSTRAP", "REACT",
  "MYSQL", "JQUERY", "EXCEL", "XML",
];

const SIDEBAR_ITEMS = [
  { label: "HTML HOME", active: true },
  { label: "HTML Introduction", hasChildren: true },
  { label: "HTML Editors" },
  { label: "HTML Basic", hasChildren: true },
  { label: "HTML Elements", hasChildren: true },
  { label: "HTML Attributes", hasChildren: true },
  { label: "HTML Headings", hasChildren: true },
  { label: "HTML Paragraphs", hasChildren: true },
  { label: "HTML Styles", hasChildren: true },
  { label: "HTML Formatting", hasChildren: true },
  { label: "HTML Quotations", hasChildren: true },
  { label: "HTML Comments", hasChildren: true },
  { label: "HTML Colors", hasChildren: true },
  { label: "HTML CSS" },
  { label: "HTML Links", hasChildren: true },
  { label: "HTML Images", hasChildren: true },
  { label: "HTML Project" },
  { label: "HTML Favicon", hasChildren: true },
  { label: "HTML Page Title" },
  { label: "HTML Tables", hasChildren: true },
  { label: "HTML Lists", hasChildren: true },
];

const REFERENCE_LINKS = [
  "HTML Elements", "Browser Support", "Attributes",
  "Global Attributes", "Event Attributes", "Color Names",
  "Canvas", "Audio/Video DOM", "Character Sets",
  "URL Encoding", "Language Codes", "Country Codes",
  "HTTP Messages", "Px to Em Converter", "Keyboard Shortcuts",
];

const PROGRESS_FEATURES = [
  "View your completed tutorials, exercises, and quizzes",
  "Keep an eye on your progress and daily streaks",
  "Join the leaderboard and compete with others",
  "Get your own avatar and unlock new skins",
  "Create your own personal website",
];

const EXAMPLE_CODE = [
  "<!DOCTYPE html>",
  "<html>",
  "<head>",
  "<title>Page Title</title>",
  "</head>",
  "<body>",
  "",
  "<h1>This is a Heading</h1>",
  "<p>This is a paragraph.</p>",
  "",
  "</body>",
  "</html>",
];

/* ---------- small components ---------- */

import Logo from '../components/Logo';

function AdCard() {
  return (
    <div className="bg-white border border-slate-200 rounded p-4 flex flex-col items-center text-center gap-2">
      <span className="text-lg font-black flex items-center gap-1">
        <Logo className="h-5 w-auto" />
      </span>
      <p className="text-xs text-slate-500">
        Sign in to track your progress and earn XP.
      </p>
      <button className="w-full bg-emerald-500 text-white text-sm font-semibold py-2 rounded hover:bg-emerald-600">
        Sign In
      </button>
      <div className="flex gap-2 mt-1">
        <span className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-xs font-bold">G</span>
        <Facebook size={16} className="text-slate-400 mt-1.5" />
        <Github size={16} className="text-slate-400 mt-1.5" />
      </div>
      <p className="text-[11px] text-slate-400 mt-1">No account? Register</p>
    </div>
  );
}

function VideoAdCard() {
  return (
    <div className="bg-[#1a2233] rounded overflow-hidden text-white">
      <div className="p-4 flex flex-col gap-2">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <Play size={14} />
        </div>
        <p className="text-xs font-semibold">Python Variables</p>
      </div>
    </div>
  );
}

function SidebarItem({ item }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer border-l-4 ${
        item.active
          ? "border-emerald-500 bg-slate-100 font-bold text-[#1a2233]"
          : "border-transparent text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span>{item.label}</span>
      {item.hasChildren && <ChevronDown size={14} className="text-slate-400" />}
    </div>
  );
}

/* ---------- main page ---------- */

export default function HtmlTutorialPage() {
  const [tab, setTab] = useState("HTML");

  return (
    <div className="font-sans text-[#1a2233] bg-white min-h-screen">
      {/* TOP NAVBAR */}
      <header className="border-b border-slate-200">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xl font-black">
              Dev<span className="text-emerald-500">Academy</span>
            </span>
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
              {TOP_NAV.map((l) => (
                <span key={l} className="flex items-center gap-1 hover:text-[#1a2233] cursor-pointer">
                  {l}
                  <ChevronDown size={13} />
                </span>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded px-3 py-1.5 w-64">
            <input
              placeholder="Search..."
              className="bg-transparent text-sm outline-none flex-1"
            />
            <Search size={15} className="text-slate-400" />
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <span className="hidden md:inline hover:text-[#1a2233] cursor-pointer">Get Certified</span>
            <span className="hidden md:inline hover:text-[#1a2233] cursor-pointer">Upgrade</span>
            <span className="hidden md:inline hover:text-[#1a2233] cursor-pointer">Academy</span>
            <span className="hidden md:inline hover:text-[#1a2233] cursor-pointer">Spaces</span>
            <button className="bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600">
              Sign In
            </button>
          </div>
        </div>

        {/* LANGUAGE TABS */}
        <div className="bg-[#1a2233] overflow-x-auto">
          <div className="flex text-xs font-semibold text-slate-300 whitespace-nowrap">
            {LANG_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 ${
                  tab === t
                    ? "bg-[#0f1420] text-white"
                    : "hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3-COLUMN LAYOUT: main content left, sidebar RIGHT */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 px-6 py-8">
        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 order-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <ArrowLeft size={14} /> Home
            </div>
            <button className="flex items-center gap-1 bg-emerald-500 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-emerald-600">
              Next <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black">HTML Tutorial</h1>
            <Bookmark size={20} className="text-slate-400" />
          </div>

          {/* two intro cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-emerald-50 rounded-lg p-5">
              <p className="text-emerald-700 font-bold text-sm mb-1">&lt;/&gt; Learn HTML</p>
              <p className="text-sm text-slate-600">
                HTML is the standard markup language for Web pages.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                With HTML you can create your own Website.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                HTML is easy to learn - You will enjoy it!
              </p>
              <button className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-600">
                Learn HTML now »
              </button>
            </div>
            <div className="bg-emerald-50 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <p className="font-bold text-sm mb-1">Become HTML Certified</p>
                <p className="text-sm text-slate-600">
                  Get certified with our HTML exam, includes a professionally
                  curated study kit to guide you from beginner to exam-ready.
                </p>
              </div>
              <button className="mt-4 self-start bg-white border border-slate-300 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-50">
                Get Certified »
              </button>
            </div>
          </div>

          {/* progress bar */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-[6%] bg-emerald-500 rounded-full" />
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              Sign in to track your progress
            </span>
          </div>

          {/* learning by examples */}
          <h2 className="text-2xl font-black mt-10">Learning by Examples</h2>
          <p className="text-sm text-slate-600 mt-2">
            With our "Try it Yourself" editor, you can edit the HTML code and
            view the result in the browser.
          </p>

          <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-200">
              Example
            </div>
            <pre className="p-4 text-[13px] font-mono leading-6 text-slate-700 bg-white overflow-x-auto">
              {EXAMPLE_CODE.map((line, i) => (
                <div key={i}>{line || "\u00A0"}</div>
              ))}
            </pre>
            <div className="px-4 pb-4">
              <button className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-600">
                Try it Yourself »
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Click on the "Try it Yourself" button to see how it works.
          </p>

          {/* examples */}
          <h2 className="text-2xl font-black mt-10">HTML Examples</h2>
          <p className="text-sm text-slate-600 mt-2">
            This tutorial supplements all explanations with clarifying
            examples.
          </p>
          <button className="mt-3 bg-slate-100 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-200">
            See all HTML Examples
          </button>

          {/* exercises */}
          <h2 className="text-2xl font-black mt-10">HTML Exercises</h2>
          <p className="text-sm text-slate-600 mt-2">
            Many chapters in this tutorial end with an exercise where you can
            check your level of knowledge.
          </p>

          <div className="mt-4 bg-[#0f1420] text-white rounded-lg p-6 text-center">
            <p className="text-lg font-bold">Exercise</p>
            <p className="text-sm text-slate-300 mt-2">
              What is the correct syntax for an HTML hyperlink?
            </p>
            <div className="mt-4 flex flex-col gap-2 max-w-sm mx-auto text-left">
              {[
                `<a href="/home.htm">Visit W3Schools.com!</a>`,
                `<link href="/home.htm">Visit W3Schools.com!</link>`,
                `<alink href="/home.htm">Visit W3Schools.com!</alink>`,
              ].map((code) => (
                <label
                  key={code}
                  className="flex items-center gap-2 bg-white/5 rounded px-3 py-2 text-xs font-mono cursor-pointer hover:bg-white/10"
                >
                  <span className="w-3 h-3 rounded-full border border-slate-400 inline-block" />
                  {code}
                </label>
              ))}
            </div>
            <button className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600">
              Submit Answer »
            </button>
          </div>
          <button className="mt-4 bg-slate-100 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-200">
            See all HTML Exercises
          </button>

          {/* quiz */}
          <h2 className="text-2xl font-black mt-10">HTML Quiz Test</h2>
          <p className="text-sm text-slate-600 mt-2">
            Test your HTML skills with our HTML Quiz!
          </p>
          <button className="mt-3 bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-sky-700">
            Start HTML Quiz!
          </button>

          {/* track progress */}
          <h2 className="text-2xl font-black mt-10">Track Your Progress</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-md">
            Create a CodeQuest account and get access to more features and
            learning materials:
          </p>
          <ul className="mt-4 space-y-2 max-w-md">
            {PROGRESS_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600">
            Sign Up »
          </button>

          <div className="mt-8 bg-amber-50 border-l-4 border-amber-300 p-4 text-sm text-slate-700">
            <span className="font-semibold">Note: </span>
            This is an optional feature. You can study at CodeQuest without
            creating an account.
          </div>

          {/* references */}
          <h2 className="text-2xl font-black mt-10">HTML References</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            At CodeQuest you will find complete references about HTML
            elements, attributes, events, color names, entities,
            character-sets, URL encoding, language codes, HTTP messages,
            browser support, and more.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {REFERENCE_LINKS.map((r) => (
              <div
                key={r}
                className="bg-slate-100 text-sm font-medium text-center py-3 rounded hover:bg-slate-200 cursor-pointer"
              >
                {r}
              </div>
            ))}
          </div>

          {/* certification */}
          <div className="mt-10 flex flex-col md:flex-row items-center gap-6 bg-emerald-50 rounded-lg p-6">
            <div className="flex-1">
              <p className="text-emerald-700 text-xs font-bold mb-1">HTML CERTIFICATION</p>
              <h3 className="text-2xl font-black">Get Certified in HTML</h3>
              <p className="text-sm text-slate-600 mt-2">
                Complete the CodeQuest HTML course, strengthen your
                knowledge, and earn a certificate you can add to your CV,
                portfolio, and LinkedIn profile.
              </p>
              <button className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600">
                Get Certified Today
              </button>
            </div>
            <div className="w-full md:w-56 h-36 bg-white border border-slate-200 rounded shrink-0" />
          </div>

          {/* video */}
          <div className="mt-10 bg-[#0f1420] rounded-lg p-10 text-center text-white">
            <p className="text-lg font-semibold text-slate-300">Video: HTML for Beginners</p>
            <h3 className="text-4xl font-black mt-4">
              HTML<br />for Beginners
            </h3>
            <p className="text-slate-400 mt-2">in just 47 minutes</p>
            <div className="mt-6 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto">
              <Play size={22} className="text-white ml-1" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#1a2233]">
              <ArrowLeft size={14} /> Home
            </button>
            <span className="text-sm text-slate-500">Sign in to track progress</span>
            <button className="flex items-center gap-1 bg-emerald-500 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-emerald-600">
              Next <ArrowRight size={14} />
            </button>
          </div>
        </main>

        {/* RIGHT SIDEBAR (chapter nav) */}
        <aside className="w-full lg:w-64 shrink-0 order-2">
          <div className="lg:sticky lg:top-4 flex flex-col gap-6">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <p className="px-4 py-3 text-xs font-bold text-slate-400 tracking-wide bg-slate-50 border-b border-slate-200">
                HTML TUTORIAL
              </p>
              <div className="max-h-[480px] overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => (
                  <SidebarItem key={item.label} item={item} />
                ))}
              </div>
            </div>

            <AdCard />
            <VideoAdCard />
          </div>
        </aside>
      </div>

      {/* FOOTER BANNER */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black flex items-center gap-2">Create a <Logo className="h-6 w-auto" /> Account</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Ad-free learning, track your progress, earn XP, streaks,
              compete in leagues, build and host websites, unlock coding
              challenges, and much more!
            </p>
            <button className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600">
              Sign Up for Free
            </button>
          </div>
          <div className="w-40 h-40 bg-white/60 rounded-full shrink-0" />
        </div>
      </section>

      <footer className="bg-[#0f1420] text-slate-300 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-black text-white flex items-center gap-1">
            <Logo className="h-5 w-auto" />
          </span>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Plus</span>
            <span className="hover:text-white cursor-pointer">Spaces</span>
            <span className="hover:text-white cursor-pointer">Get Certified</span>
            <span className="hover:text-white cursor-pointer">For Teachers</span>
            <span className="hover:text-white cursor-pointer">Practice</span>
            <span className="hover:text-white cursor-pointer">Contact Us</span>
          </div>
          <div className="flex gap-3">
            <Youtube size={16} />
            <Linkedin size={16} />
            <Instagram size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}
