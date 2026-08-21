import React, { useState } from "react";
import { LangLogo } from "../icons";

/**
 * Recreation of the W3Schools "HTML Tutorial" mega-menu modal.
 * Render <HtmlTutorialModal onClose={...} /> wherever you need the popup.
 */

const MORE_TUTORIALS = [
  { name: "HTML", desc: "The building blocks of every webpage", icon: "🟧", color: "text-orange-600" },
  { name: "CSS", desc: "Style and layout for web pages", icon: "🟦", color: "text-blue-600" },
  { name: "JavaScript", desc: "Interactive and dynamic web pages", icon: "🟨", color: "text-yellow-500" },
  { name: "SQL", desc: "Query and manage databases", icon: "🗄️", color: "text-indigo-600" },
  { name: "Python", desc: "Popular language for beginners & data", icon: "🐍", color: "text-blue-500" },
  { name: "Java", desc: "Widely-used, object-oriented language", icon: "☕", color: "text-red-500" },
  { name: "C", desc: "Foundation of modern programming", icon: "🅲", color: "text-slate-500" },
  { name: "C#", desc: "Modern language for Windows & apps", icon: "🅒", color: "text-purple-600" },
];

function TutorialIcon({ name }) {
  return <LangLogo name={name} size={36} />;
}

function MainCard() {
  return (
    <div className="border border-slate-200 rounded-lg p-6 flex-1 flex flex-col items-center text-center">
      <div className="w-14 h-14 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-2xl mb-3">
        5
      </div>
      <h3 className="text-[18px] font-bold text-slate-900 mb-2">HTML Tutorial</h3>
      <p className="text-[13px] text-slate-500 mb-4">
        Learn HTML with our tutorial. Free, and easy to follow
      </p>
      <button className="mt-auto bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm w-full max-w-[180px]">
        Learn HTML
      </button>
    </div>
  );
}

function CertifyCard() {
  return (
    <div className="border-2 border-green-500 rounded-lg p-6 flex-1 flex flex-col md:flex-row gap-4 md:col-span-2">
      <div className="flex-1">
        <h3 className="text-[19px] font-bold text-slate-900 mb-2">
          Become <span className="text-green-600">HTML</span> Certified
        </h3>
        <p className="text-[13px] text-slate-600 mb-4">
          Get certified with our HTML exam, includes a professional study kit to guide you from
          beginner to exam-ready.
        </p>
        <p className="mb-4">
          <span className="text-[13px] font-bold text-slate-500">Free</span>
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm">
          Get HTML Certified
        </button>
      </div>
      <div className="w-full md:w-56 shrink-0 border border-slate-200 rounded-md p-3 relative overflow-hidden">
        <span className="absolute -right-2 -top-2 text-[70px] font-black text-slate-100 select-none leading-none">
          3
        </span>
        <div className="relative text-center">
          <p className="text-[10px] font-bold text-slate-800 tracking-wide mb-2">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="text-[8px] text-slate-500">This certifies that</p>
          <p className="text-[13px] font-semibold text-slate-900 my-1">Your Name</p>
          <p className="text-[7px] text-slate-500 mb-2 px-2">
            has passed the W3Schools HTML Certification exam and is hereby declared a
          </p>
          <div className="w-6 h-6 bg-orange-600 rounded-sm mx-auto flex items-center justify-center text-white text-[10px] font-bold mb-1">
            5
          </div>
          <p className="text-[10px] font-bold text-slate-900">Certified HTML Developer</p>
          <p className="text-[7px] text-slate-400 mt-1">The candidate has passed the exam at the Professional level.</p>
          <div className="flex justify-between text-[6px] text-slate-400 mt-3">
            <span>Verify at<br />verify.w3schools.com</span>
            <span>Stale Refsnes<br />for w3schools.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorialTile({ name, desc, active }) {
  return (
    <div
      className={`border rounded-lg p-4 flex flex-col items-center text-center cursor-pointer transition-colors ${
        active ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <TutorialIcon name={name} />
      <p className="text-[15px] font-bold text-slate-900 mt-2">{name}</p>
      <p className="text-[12px] text-slate-500 mt-1">{desc}</p>
    </div>
  );
}

export default function HtmlTutorialModal({ onClose = () => {} }) {
  const [filter, setFilter] = useState("");

  const filtered = MORE_TUTORIALS.filter((t) =>
    t.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-[900px] mt-10 shadow-2xl">
        <div className="flex items-center justify-between px-7 pt-6">
          <p className="text-green-600 text-[13px] font-bold tracking-wide">HTML TUTORIAL</p>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-7 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MainCard />
          <CertifyCard />
        </div>

        <div className="px-7 pb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-slate-500 tracking-wide">MORE TUTORIALS:</p>
          <div className="relative w-56">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              type="text"
              placeholder="Filter..."
              className="w-full text-[13px] border border-slate-300 rounded-sm pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="px-7 pb-7 max-h-72 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((t, i) => (
              <TutorialTile key={t.name} {...t} active={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}