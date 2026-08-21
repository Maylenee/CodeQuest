import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html as htmlLang } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { javascript as jsLang } from '@codemirror/lang-javascript';
import Navbar from '../Navbar';
import { TOP_NAV } from '../../data/htmlTutorial';

function buildDoc({ html, css, js }) {
  // Jika kode sudah dokumen HTML lengkap (contoh W3Schools), jangan
  // dibungkus lagi — render apa adanya agar tidak jadi dokumen bersarang.
  const isFullDoc = /^\s*<!DOCTYPE\s+html/i.test(html) || /^\s*<html[\s>]/i.test(html);
  if (isFullDoc) return html;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
}

const TABS = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' },
];

const TAB_EXT = { html: htmlLang, css: cssLang, js: jsLang };

export default function Playground({ initialHtml = '', initialCss = '', initialJs = '', title, onBack }) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [tab, setTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');

  // Reset ke nilai awal setiap kali prop berubah (mis. navigasi antar contoh).
  useEffect(() => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    setTab('html');
  }, [initialHtml, initialCss, initialJs]);

  // Auto-run (debounce) saat kode berubah.
  useEffect(() => {
    const t = setTimeout(() => setSrcDoc(buildDoc({ html, css, js })), 300);
    return () => clearTimeout(t);
  }, [html, css, js]);

  const values = { html, css, js };
  const setters = { html: setHtml, css: setCss, js: setJs };

  return (
    <div className="font-sans text-[#1a2233] bg-white min-h-screen flex flex-col">
      <Navbar
        links={TOP_NAV}
        activeTopic={(title || '').toUpperCase()}
        containerClassName="px-6 h-14"
        logoClassName="h-5 w-auto"
        navClassName="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
      />

      <div className="flex items-center gap-3 border-b px-4 py-2.5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 px-3 py-1 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
        >
          ← Back
        </button>
        <span className="text-[15px] font-semibold text-slate-800">
          Try it Yourself{title ? ` · ${title}` : ''}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        {/* Editor */}
        <div className="flex min-h-0 flex-col border-r">
          <div className="flex gap-1 border-b bg-slate-50 px-2 py-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded px-3 py-1 text-[12px] font-semibold ${
                  tab === t.key ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <textarea
            spellCheck={false}
            value={values[tab]}
            onChange={(e) => setters[tab](e.target.value)}
            className="flex-1 resize-none bg-[#1e1e1e] p-3 font-mono text-[13px] leading-relaxed text-slate-100 outline-none"
            placeholder={`Tulis kode ${tab.toUpperCase()} di sini…`}
          />
        </div>

        {/* Preview */}
        <div className="flex min-h-0 flex-col">
          <div className="border-b bg-slate-50 px-3 py-1.5 text-[12px] font-semibold text-slate-500">
            Preview
          </div>
          <iframe
            title="preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="h-full w-full flex-1 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
