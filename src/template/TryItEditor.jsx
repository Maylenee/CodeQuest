import React, { useState, useRef, useEffect } from "react";
import { Home, Menu, Save, FlipHorizontal2, Contrast, Play, Video } from "lucide-react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`;

// Very small regex-based HTML highlighter — good enough for the editor look,
// not a full parser.
function highlightHtml(code) {
  const escape = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let html = escape(code);

  // comments
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-slate-400">$1</span>');

  // doctype
  html = html.replace(
    /(&lt;!DOCTYPE[^&]*&gt;)/gi,
    '<span class="text-slate-500">$1</span>'
  );

  // tags with attributes: <tag attr="value">
  html = html.replace(
    /(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z-]+(?:=&quot;.*?&quot;|="[^"]*")?)*)(\s*\/?&gt;)/g,
    (match, open, tag, attrs, close) => {
      let coloredAttrs = attrs.replace(
        /([a-zA-Z-]+)(=)(&quot;.*?&quot;|"[^"]*")/g,
        '<span class="text-sky-600">$1</span><span class="text-slate-400">$2</span><span class="text-orange-600">$3</span>'
      );
      return `<span class="text-slate-400">${open}</span><span class="text-pink-600 font-medium">${tag}</span>${coloredAttrs}<span class="text-slate-400">${close}</span>`;
    }
  );

  return html;
}

export default function TryItEditor() {
  const [code, setCode] = useState(DEFAULT_HTML);
  const [srcDoc, setSrcDoc] = useState(DEFAULT_HTML);
  const [resultSize, setResultSize] = useState({ w: 0, h: 0 });
  const previewRef = useRef(null);
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const run = () => setSrcDoc(code);

  useEffect(() => {
    if (!previewRef.current) return;
    const el = previewRef.current;
    const ro = new ResizeObserver(() => {
      setResultSize({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const syncScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* toolbar */}
      <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
        <Home className="w-5 h-5 text-slate-600 cursor-pointer" />
        <Menu className="w-5 h-5 text-slate-600 cursor-pointer" />
        <Save className="w-5 h-5 text-slate-500 cursor-pointer" />
        <FlipHorizontal2 className="w-5 h-5 text-slate-400 cursor-pointer" />
        <Contrast className="w-5 h-5 text-slate-500 cursor-pointer" />
        <button
          onClick={run}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold pl-4 pr-3 py-2 rounded-md"
        >
          Run <Play className="w-3.5 h-3.5 fill-white" />
        </button>

        <span className="ml-auto text-[14px] text-slate-500">
          Result Size: {resultSize.w} x {resultSize.h}
        </span>
        <button className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-4 py-2 rounded-md whitespace-nowrap">
          Get your own website
        </button>
      </div>

      {/* editor + preview + sidebar */}
      <div className="flex flex-1 min-h-[600px]">
        {/* code editor */}
        <div className="w-1/2 border-r border-slate-200 relative">
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 m-0 p-4 font-mono text-[15px] leading-6 whitespace-pre overflow-auto pointer-events-none"
            dangerouslySetInnerHTML={{ __html: highlightHtml(code) + "\n" }}
          />
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
            className="absolute inset-0 w-full h-full p-4 font-mono text-[15px] leading-6 whitespace-pre resize-none outline-none bg-transparent text-transparent caret-slate-800"
          />
        </div>

        {/* live result */}
        <div ref={previewRef} className="w-1/2 bg-white">
          <iframe
            title="result"
            srcDoc={srcDoc}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        </div>

        {/* sidebar (generic placeholders — not reproducing real ad content) */}
        <div className="w-[280px] shrink-0 border-l border-slate-100 p-4 hidden xl:block space-y-4">
          <div className="rounded-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-800 aspect-video flex items-center justify-center relative">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Video className="w-5 h-5 text-slate-800 ml-0.5" />
              </div>
              <span className="absolute bottom-2 left-2 text-white text-[12px] font-medium">
                Watch related video tutorial
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 aspect-[3/4] flex items-center justify-center">
            <span className="text-slate-300 text-[13px]">Ad space</span>
          </div>

          <div className="text-center">
            <a href="#" className="text-[13px] font-semibold text-blue-600">
              REMOVE ADS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
