export default function CodePanel({ dark, lines }) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg w-full max-w-sm ${
        dark ? 'bg-[#0f1420]' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-black/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <pre
        className={`p-4 text-[11px] leading-5 font-mono overflow-x-auto ${
          dark ? 'text-slate-200' : 'text-slate-700'
        }`}
      >
        {lines.join('\n')}
      </pre>
      <div className="px-3 pb-3">
        <button
          type="button"
          className="text-xs font-semibold px-3 py-1.5 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
        >
          Try it Yourself »
        </button>
      </div>
    </div>
  );
}