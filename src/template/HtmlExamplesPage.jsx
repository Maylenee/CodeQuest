import React, { useState } from "react";

/**
 * Recreation of the W3Schools "HTML Examples" page layout.
 * Green = W3Schools brand green (#04AA6D).
 */

const SECTIONS = [
  {
    title: "HTML Basic",
    items: [
      "HTML document",
      "HTML headings",
      "HTML paragraphs",
      "HTML links",
      "HTML images",
      "HTML buttons",
      "HTML lists",
      "HTML tables",
    ],
  },
  {
    title: "HTML Attributes",
    items: [
      "The href attribute",
      "The src attribute",
      "Width and height attributes",
      "The alt attribute",
      "Attribute quotes",
      "Lowercase attributes",
    ],
  },
  {
    title: "HTML Headings",
    items: ["HTML headings", "Horizontal rules"],
  },
  {
    title: "HTML Paragraphs",
    items: [
      "HTML paragraphs",
      "How to display paragraphs",
      "Poem problem, solved with the <pre> tag",
    ],
  },
  {
    title: "HTML Styles",
    items: [
      "HTML style attribute",
      "Background color",
      "Text color",
      "Fonts",
      "Text size",
      "Text alignment",
    ],
  },
  {
    title: "HTML Text Formatting",
    items: [
      "HTML formatting elements",
      "HTML <b> and <strong> elements",
      "HTML <i> and <em> elements",
      "HTML <small> element",
      "HTML <mark> element",
      "HTML <del> element",
      "HTML <ins> element",
      "HTML <sub> element",
      "HTML <sup> element",
    ],
  },
  {
    title: "HTML Quotations and Citations",
    items: [
      "HTML formatting quotation elements",
      "The quoted section with <q> tag",
      "A section quoted from another source",
      "Working with abbreviations",
      "Contact information with the <address> tag",
      "Text direction with <bdo> tag",
    ],
  },
  {
    title: "HTML Comments",
    items: ["HTML comments", "Conditional comments"],
  },
  {
    title: "HTML CSS",
    items: [
      "HTML styling with CSS",
      "Internal CSS",
      "External CSS",
      "CSS colors, fonts and sizes",
      "CSS border",
      "CSS padding",
      "CSS margin",
      "CSS Style Precedence",
    ],
  },
  {
    title: "HTML Links",
    items: [
      "Links, styled as buttons",
      "Using an image as a link",
      "Changing the color of link text",
      "An image as a link",
      "A text link to an email address",
      "Bookmarks in a page",
    ],
  },
  {
    title: "HTML Images",
    items: [
      "HTML images",
      "How to align images (left, right, center)",
      "How to add a border to an image",
      "How to float images",
      "How to add other images to an image",
      "How to add a caption to an image",
      "Image maps",
    ],
  },
  {
    title: "HTML Tables",
    items: [
      "Basic HTML table",
      "A table with collapsed borders",
      "A table with padding",
      "A table with headings",
      "A table with a caption",
      "A table with matching header colors",
      "A table with hover ability",
      "A table with different colors for row 1 and 2",
      "A table with different colors for each row",
      "A responsive table",
    ],
  },
  {
    title: "HTML Lists",
    items: [
      "An unordered HTML list",
      "An ordered HTML list",
      "An unordered HTML list with square bullets",
      "An unordered list without markers",
      "A nested HTML list",
      "A description list",
      "A horizontal list",
      "A horizontal list (as menu)",
    ],
  },
  {
    title: "HTML Block and Inline Elements",
    items: ["The <div> element", "Inserting a horizontal rule", "Joining a div element"],
  },
  {
    title: "HTML Divs Element",
    items: [
      "The <div> element",
      "Display <div> elements side-by-side",
      "Display <div> elements using floats",
    ],
  },
  {
    title: "HTML Classes",
    items: [
      "Style all elements with a specific class name",
      "Different tags can share same class",
      "Multiple classes",
    ],
  },
  {
    title: "HTML Id",
    items: ["Difference between class and id", "Reference an element with a specific id with CSS"],
  },
  {
    title: "HTML Layout",
    items: ["Layout using tags", "Layout using divs", "Layout using flexbox"],
  },
  {
    title: "HTML Iframe",
    items: ["Basic iframe example of a header page of the document"],
  },
  {
    title: "HTML Head Elements",
    items: [
      "The <title> element",
      "The HTML <style> element",
      "The HTML <link> element",
      "The HTML <meta> element - defines metadata about the document",
      "The HTML <script> element",
      "The HTML <base> element - specifies a default URL and target for all links",
    ],
  },
  {
    title: "HTML Scripts",
    items: ["The <script> element", "The <noscript> element"],
  },
  {
    title: "HTML Compound/Complex Elements",
    items: [
      "Compound/Complex element using <div>",
      "Compound/Complex element with existing formatting",
    ],
  },
  {
    title: "HTML Forms",
    items: [
      "HTML forms",
      "Text fields in a form",
      "How to add radio buttons in a form",
      "How to add checkboxes in a form",
      "How to add a submit button in a form",
      "Grouping form data",
    ],
  },
  {
    title: "HTML Form Elements",
    items: [
      "A simple HTML form",
      "HTML forms containing checkboxes",
      "Using the <select> element",
      "Using the <textarea> element",
      "Using the <button> element",
      "Using the <fieldset> element",
      "Using the <datalist> element",
    ],
  },
  {
    title: "HTML Input Types",
    items: [
      "Input type text",
      "Input type password",
      "Input type submit",
      "Input type reset",
      "Input type radio",
      "Input type checkbox",
      "Input type button",
      "Input type color",
      "Input type date",
      "Input type email",
      "Input type file",
      "Input type number",
      "Input type range",
      "Input type search",
      "Input type tel",
      "Input type time",
      "Input type url",
      "Input type week",
    ],
  },
  {
    title: "HTML Input Attributes",
    items: [
      "The value attribute",
      "The readonly attribute",
      "The disabled attribute",
      "The size attribute",
      "The maxlength attribute",
      "The min, max and step attributes",
      "The multiple attribute",
      "The pattern attribute",
      "The placeholder attribute",
      "The required attribute",
      "The autofocus attribute",
    ],
  },
  {
    title: "HTML Canvas Graphics",
    items: [
      "Draw a line on a canvas",
      "Draw a circle on a canvas",
      "Draw text on a canvas",
      "Stroke text on a canvas",
      "Draw a linear gradient on a canvas",
      "Draw a circular gradient on a canvas",
    ],
  },
  {
    title: "HTML SVG Graphics",
    items: [
      "Draw a circle",
      "Draw a rectangle",
      "Draw a rectangle with rounded corners",
      "Draw a star",
      "Draw a logo",
    ],
  },
  {
    title: "HTML Media",
    items: [
      "Auto-playing a video",
      "Playing a video with controls",
      "Automatically play, loop, and mute a video",
      "Adding subtitles to a video",
    ],
  },
  {
    title: "HTML Geolocation",
    items: ["Get the geolocation of a user"],
  },
  {
    title: "HTML Local Storage",
    items: ["Store a value (click on the button, and count)", "Store an object"],
  },
  {
    title: "HTML Web Workers",
    items: ["Count numbers with a web worker"],
  },
];

const MORE_EXAMPLES = [
  "HTML Examples",
  "CSS Examples",
  "JavaScript Examples",
  "How To Examples",
  "SQL Examples",
  "Python Examples",
  "W3.CSS Examples",
  "Bootstrap Examples",
  "PHP Examples",
  "Java Examples",
  "XML Examples",
  "jQuery Examples",
];

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block ml-1">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TryItButton() {
  return (
    <button className="mt-3 mb-2 inline-block bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2 rounded-sm transition-colors">
      Try it Yourself »
    </button>
  );
}

function ExampleSection({ title, items }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="mb-6">
      <h2 className="text-[19px] font-bold text-slate-900 mt-6 mb-1">{title}</h2>
      <ul className="divide-y divide-slate-200 border-t border-slate-200">
        {items.map((item, i) => (
          <li
            key={i}
            className={`px-2 py-[7px] text-[15px] text-slate-800 hover:text-green-700 cursor-pointer ${
              i % 2 === 0 ? "bg-slate-100" : "bg-white"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <TryItButton />
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:block w-[210px] shrink-0 border-r border-slate-200 pr-3 py-4">
      <input
        type="text"
        placeholder="Search our tutorials, e.g. HTML"
        className="w-full text-[13px] border border-slate-300 rounded-sm px-2 py-1.5 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <nav className="text-[15px] text-slate-700 space-y-0.5">
        {[
          "HTML Tutorial",
          "HTML Reference",
          "HTML Examples",
          "HTML Editor",
          "HTML Quiz",
          "HTML Exercises",
          "HTML Certificate",
        ].map((label, i) => (
          <div
            key={label}
            className={`px-2 py-1.5 rounded-sm ${
              label === "HTML Examples"
                ? "bg-green-600 text-white font-semibold"
                : "hover:bg-slate-100"
            }`}
          >
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TopNav() {
  const links = ["Tutorials", "Exercises", "Certificates", "Services", "Spaces", "Plus"];
  return (
    <header className="bg-slate-900 text-white">
      <div className="flex items-center h-11 px-4 gap-6 text-[14px]">
        <span className="text-green-500 font-bold text-xl tracking-tight">W3Schools</span>
        <nav className="hidden md:flex items-center gap-5 text-slate-200">
          {links.map((l) => (
            <span key={l} className="hover:text-white cursor-pointer flex items-center gap-0.5">
              {l}
              <ChevronDown />
            </span>
          ))}
        </nav>
        <div className="flex-1" />
        <input
          type="text"
          placeholder="🔍 Search..."
          className="hidden sm:block bg-slate-800 text-white placeholder-slate-400 text-[13px] rounded-sm px-3 py-1.5 w-40 focus:outline-none"
        />
        <button className="bg-slate-700 hover:bg-slate-600 text-[13px] px-3 py-1.5 rounded-sm">
          Sign Up
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-[13px] px-3 py-1.5 rounded-sm">
          Log in
        </button>
      </div>
    </header>
  );
}

function GetCertifiedAd() {
  return (
    <div className="hidden xl:flex flex-col items-center w-[200px] shrink-0 ml-4 mt-4">
      <div className="bg-slate-800 text-white rounded-md p-4 w-full text-center">
        <p className="text-[13px] leading-snug mb-2">
          Get Certified <br /> for
        </p>
        <p className="text-3xl font-bold text-white mb-1">Free</p>
        <div className="flex justify-center gap-2 my-3 text-lg">
          <span>📘</span>
          <span>📗</span>
          <span>📙</span>
          <span>📕</span>
          <span>📓</span>
        </div>
        <button className="bg-green-600 hover:bg-green-700 w-full text-[13px] font-semibold py-1.5 rounded-sm">
          Sign Up, It's Free
        </button>
      </div>
    </div>
  );
}

function MoreExamples() {
  return (
    <section className="mt-10">
      <h2 className="text-[19px] font-bold text-slate-900 mb-1">More Examples</h2>
      <ul className="divide-y divide-slate-200 border-t border-slate-200">
        {MORE_EXAMPLES.map((item, i) => (
          <li
            key={item}
            className={`px-2 py-[7px] text-[15px] text-slate-800 hover:text-green-700 cursor-pointer ${
              i % 2 === 0 ? "bg-slate-100" : "bg-white"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <button className="mt-3 mb-2 inline-block bg-slate-800 hover:bg-slate-700 text-white text-[13px] font-semibold px-4 py-2 rounded-sm transition-colors">
        Show all Examples
      </button>
    </section>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-between text-[13px] text-slate-600 my-4">
      <span>1 Pagination</span>
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-sm font-semibold text-[13px]">
        Next »
      </button>
    </div>
  );
}

export default function HtmlExamplesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <TopNav />

      <div className="max-w-[1200px] mx-auto flex">
        <Sidebar />

        <main className="flex-1 px-5 py-4 max-w-[760px]">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h1 className="text-[28px] font-bold text-slate-900">HTML Examples</h1>
          </div>

          <Pagination />

          {SECTIONS.map((section) => (
            <ExampleSection key={section.title} title={section.title} items={section.items} />
          ))}

          <MoreExamples />

          <Pagination />
        </main>

        <GetCertifiedAd />
      </div>

      <footer className="bg-slate-900 text-slate-300 text-[13px] mt-10 px-6 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-8">
          <div>
            <p className="text-green-500 font-bold text-lg mb-2">W3Schools</p>
            <p className="max-w-xs text-slate-400">
              The world's largest and most trusted free web development learning site.
            </p>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-8">
          Copyright 1999-2026 by Refsnes Data. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
