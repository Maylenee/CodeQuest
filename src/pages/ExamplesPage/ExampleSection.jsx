function TryItButton() {
  return (
    <button
      type="button"
      className="mt-3 mb-2 inline-block bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2 rounded-sm transition-colors"
    >
      Try it Yourself »
    </button>
  );
}

export default function ExampleSection({ title, items }) {
  return (
    <section className="mb-6">
      <h2 className="text-[19px] font-bold text-slate-900 mt-6 mb-1">{title}</h2>
      <ul className="divide-y divide-slate-200 border-t border-slate-200">
        {items.map((item, i) => (
          <li
            key={i}
            className={`px-2 py-[7px] text-[15px] text-slate-800 hover:text-green-700 cursor-pointer ${
              i % 2 === 0 ? 'bg-slate-100' : 'bg-white'
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