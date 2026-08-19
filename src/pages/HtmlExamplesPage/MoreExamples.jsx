export default function MoreExamples({ items }) {
  return (
    <section className="mt-10">
      <h2 className="text-[19px] font-bold text-slate-900 mb-1">More Examples</h2>
      <ul className="divide-y divide-slate-200 border-t border-slate-200">
        {items.map((item, i) => (
          <li
            key={item}
            className={`px-2 py-[7px] text-[15px] text-slate-800 hover:text-green-700 cursor-pointer ${
              i % 2 === 0 ? 'bg-slate-100' : 'bg-white'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-3 mb-2 inline-block bg-slate-800 hover:bg-slate-700 text-white text-[13px] font-semibold px-4 py-2 rounded-sm transition-colors"
      >
        Show all Examples
      </button>
    </section>
  );
}