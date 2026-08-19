import React from "react";

/**
 * Recreation of the W3Schools "HTML Introduction" tutorial page layout.
 */

const TOP_TABS = [
  "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP", "W3.CSS",
  "C", "C++", "C#", "HOW TO", "BOOTSTRAP", "REACT", "MYSQL", "JQUERY", "EXCEL", "XM",
];

const CODE_LINES = [
  { text: "<!DOCTYPE html>", tag: false },
  { text: "<html>", tag: true },
  { text: "<head>", tag: true, indent: 1 },
  { text: "<title>Page Title</title>", tag: true, indent: 1 },
  { text: "</head>", tag: true, indent: 1 },
  { text: "<body>", tag: true },
  { text: "", blank: true },
  { text: "<h1>My First Heading</h1>", tag: true, indent: 1 },
  { text: "<p>My first paragraph.</p>", tag: true, indent: 1 },
  { text: "", blank: true },
  { text: "</body>", tag: true },
  { text: "</html>", tag: true },
];

const EXPLAIN_ITEMS = [
  { tag: "<!DOCTYPE html>", text: "declaration defines that this document is an HTML5 document" },
  { tag: "<html>", text: "element is the root element of an HTML page" },
  { tag: "<head>", text: "element contains meta information about the HTML page" },
  { tag: "<title>", text: "element specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab)" },
  { tag: "<body>", text: "element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc." },
  { tag: "<h1>", text: "element defines a large heading" },
  { tag: "<p>", text: "element defines a paragraph" },
];

const ELEMENT_TABLE = [
  { start: "<h1>", content: "My First Heading", end: "</h1>" },
  { start: "<p>", content: "My first paragraph.", end: "</p>" },
  { start: "<br>", content: "none", end: "none", italic: true },
];

const HISTORY = [
  ["1989", "Tim Berners-Lee invented www"],
  ["1991", "Tim Berners-Lee invented HTML"],
  ["1993", "Dave Raggett drafted HTML+"],
  ["1995", "HTML Working Group defined HTML 2.0"],
  ["1997", "W3C Recommendation: HTML 3.2"],
  ["1999", "W3C Recommendation: HTML 4.01"],
  ["2000", "W3C Recommendation: XHTML 1.0"],
  ["2008", "WHATWG HTML5 First Public Draft"],
  ["2012", "WHATWG HTML5 Living Standard", true],
  ["2014", "W3C Recommendation: HTML5"],
  ["2016", "W3C Candidate Recommendation: HTML 5.1"],
  ["2017", "W3C Recommendation: HTML5.1 2nd Edition"],
  ["2017", "W3C Recommendation: HTML5.2"],
];

function Code({ children }) {
  return (
    <code className="bg-slate-100 text-pink-600 text-[13px] px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

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
        <div className="flex items-center justify-center gap-1 font-bold text-[13px] mb-2">
          <span className="bg-white text-slate-800 w-5 h-5 rounded flex items-center justify-center text-[9px]">
            W<sup>3</sup>
          </span>
          schools
        </div>
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
          <div className="flex items-center justify-center h-16 bg-slate-800 rounded">▶</div>
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

function H2({ children }) {
  return <h2 className="text-[24px] font-bold text-slate-900 mt-8 mb-3">{children}</h2>;
}

function CodeBlock() {
  return (
    <div className="bg-slate-100 rounded-md p-5 mb-4">
      <p className="text-[15px] font-bold text-slate-700 mb-3">Example</p>
      <div className="bg-white rounded-sm p-4 font-mono text-[13px] leading-6">
        {CODE_LINES.map((line, i) =>
          line.blank ? (
            <div key={i}>&nbsp;</div>
          ) : (
            <div key={i} style={{ paddingLeft: (line.indent || 0) * 20 }}>
              <span className="text-blue-700">{line.text}</span>
            </div>
          )
        )}
      </div>
      <button className="mt-4 bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-sm">
        Try it Yourself »
      </button>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="border border-slate-300 rounded-md overflow-hidden mb-2 max-w-md">
      <div className="bg-slate-100 border-b border-slate-300 px-3 py-1.5 flex items-center gap-2">
        <span className="text-[11px] text-slate-600">index.htm</span>
        <span className="ml-auto text-slate-400 text-[11px]">— ▢ ✕</span>
      </div>
      <div className="bg-slate-50 border-b border-slate-300 px-3 py-1.5 flex items-center gap-2 text-[10px] text-slate-500">
        <span>‹</span><span>›</span><span>⟳</span>
        <span className="flex-1 bg-white border border-slate-300 rounded-sm px-2 py-0.5">
          file:///C:/Users/myuser/Desktop/index.htm
        </span>
      </div>
      <div className="p-4 bg-white">
        <p className="text-[18px] font-bold text-slate-900">My First Heading</p>
        <p className="text-[13px] text-slate-700 mt-1">My first paragraph.</p>
      </div>
    </div>
  );
}

function StructureBox({ label, children, className = "" }) {
  return (
    <div className={`border border-slate-300 rounded-sm bg-white px-3 py-2 text-[13px] font-mono text-slate-700 ${className}`}>
      {children}
    </div>
  );
}

function PageStructureDiagram() {
  return (
    <div className="bg-slate-100 rounded-md p-4 mb-2">
      <div className="border-2 border-slate-300 rounded-sm bg-slate-50 p-3">
        <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;html&gt;</p>
        <div className="border-2 border-slate-300 rounded-sm bg-slate-100 p-3 mb-3">
          <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;head&gt;</p>
          <StructureBox className="mb-2">&lt;title&gt;Page title&lt;/title&gt;</StructureBox>
          <p className="font-mono text-[13px] text-slate-700">&lt;/head&gt;</p>
        </div>
        <div className="border-2 border-slate-300 rounded-sm bg-slate-100 p-3 mb-2">
          <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;body&gt;</p>
          <div className="border-2 border-slate-300 rounded-sm bg-white p-3 space-y-2">
            <StructureBox>&lt;h1&gt;This is a heading&lt;/h1&gt;</StructureBox>
            <StructureBox>&lt;p&gt;This is a paragraph.&lt;/p&gt;</StructureBox>
            <StructureBox>&lt;p&gt;This is another paragraph.&lt;/p&gt;</StructureBox>
          </div>
          <p className="font-mono text-[13px] text-slate-700 mt-2">&lt;/body&gt;</p>
        </div>
        <p className="font-mono text-[13px] text-slate-700">&lt;/html&gt;</p>
      </div>
    </div>
  );
}

function NoteBox({ children }) {
  return (
    <div className="bg-yellow-100 rounded-md px-5 py-4 text-[14px] text-slate-800 mb-6">
      {children}
    </div>
  );
}

export default function LessonPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <TopNav />

      <div className="max-w-[1150px] mx-auto flex">
        <main className="flex-1 px-6 py-6 max-w-[760px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[32px] font-bold text-slate-900">HTML Introduction</h1>
            <span className="text-green-600 text-xl cursor-pointer">🔖</span>
          </div>

          <div className="mb-6">
            <NextPrevBar />
          </div>

          <p className="text-[15px] text-slate-700 mb-6">
            HTML is the standard markup language for creating Web pages.
          </p>

          <H2>What is HTML?</H2>
          <ul className="list-disc pl-5 text-[15px] text-slate-700 space-y-1">
            <li>HTML stands for Hyper Text Markup Language</li>
            <li>HTML is the standard markup language for creating Web pages</li>
            <li>HTML describes the structure of a Web page</li>
            <li>HTML consists of a series of elements</li>
            <li>
              HTML elements tell the browser how to display the content
            </li>
            <li>
              HTML elements label pieces of content such as "this is a heading", "this is a
              paragraph", "this is a link", etc.
            </li>
          </ul>

          <H2>A Simple HTML Document</H2>
          <CodeBlock />

          <H2>Example Explained</H2>
          <ul className="list-disc pl-5 text-[15px] text-slate-700 space-y-1.5">
            {EXPLAIN_ITEMS.map((it) => (
              <li key={it.tag}>
                The <Code>{it.tag}</Code> {it.text}
              </li>
            ))}
          </ul>

          <H2>What is an HTML Element?</H2>
          <p className="text-[15px] text-slate-700 mb-3">
            An HTML element is defined by a start tag, some content, and an end tag:
          </p>
          <p className="font-mono text-[14px] text-slate-700 mb-4">
            &lt;tagname&gt; Content goes here... &lt;/tagname&gt;
          </p>
          <p className="text-[15px] text-slate-700 mb-3">
            The HTML <strong>element</strong> is everything from the start tag to the end tag:
          </p>
          <p className="font-mono text-[14px] text-slate-700 mb-1">
            &lt;h1&gt;My First Heading&lt;/h1&gt;
          </p>
          <p className="font-mono text-[14px] text-slate-700 mb-4">
            &lt;p&gt;My first paragraph.&lt;/p&gt;
          </p>

          <table className="w-full text-[14px] text-left border-t border-slate-200 mb-6">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-semibold">Start tag</th>
                <th className="py-2 pr-4 font-semibold">Element content</th>
                <th className="py-2 font-semibold">End tag</th>
              </tr>
            </thead>
            <tbody>
              {ELEMENT_TABLE.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50" : ""}`}>
                  <td className="py-2 pr-4 font-mono">{row.start}</td>
                  <td className={`py-2 pr-4 ${row.italic ? "italic text-slate-500" : ""}`}>{row.content}</td>
                  <td className="py-2 font-mono">{row.end}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <NoteBox>
            <strong>Note:</strong> Some HTML elements have no content (like the <Code>&lt;br&gt;</Code>{" "}
            element). These elements are called empty elements. Empty elements do not have an end
            tag!
          </NoteBox>

          <p className="text-center text-blue-600 text-[13px] mb-8 cursor-pointer">REMOVE ADS</p>

          <H2>Web Browsers</H2>
          <p className="text-[15px] text-slate-700 mb-2">
            The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML
            documents and display them correctly.
          </p>
          <p className="text-[15px] text-slate-700 mb-4">
            A browser does not display the HTML tags, but uses them to determine how to display
            the document:
          </p>
          <BrowserMock />

          <H2>HTML Page Structure</H2>
          <p className="text-[15px] text-slate-700 mb-4">
            Below is a visualization of an HTML page structure:
          </p>
          <PageStructureDiagram />

          <NoteBox>
            <strong>Note:</strong> The content inside the <Code>&lt;body&gt;</Code> section will
            be displayed in a browser. The content inside the <Code>&lt;title&gt;</Code> element
            will be shown in the browser's title bar or in the page's tab.
          </NoteBox>

          <H2>HTML History</H2>
          <p className="text-[15px] text-slate-700 mb-4">
            Since the early days of the World Wide Web, there have been many versions of HTML:
          </p>
          <table className="w-full text-[14px] text-left border-t border-slate-200 mb-6">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 font-semibold">Year</th>
                <th className="py-2 font-semibold">Version</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50" : ""}`}>
                  <td className="py-2 pr-4">{row[0]}</td>
                  <td className={`py-2 ${row[2] ? "text-blue-600 underline cursor-pointer" : ""}`}>
                    {row[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <NoteBox>This tutorial follows the latest HTML5 standard.</NoteBox>

          <div className="bg-slate-900 rounded-md p-6 text-center mb-6">
            <p className="text-white text-[15px] font-semibold mb-4">Video: HTML Introduction</p>
            <div className="bg-slate-800 rounded-md h-40 flex items-center justify-center">
              <span className="text-white text-3xl">▶</span>
            </div>
          </div>

          <NextPrevBar label="Sign in to track progress" />
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
