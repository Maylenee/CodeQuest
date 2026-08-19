import { Link } from 'react-router-dom';

export default function ExamplesSidebar({ items }) {
  return (
    <aside className="hidden lg:block w-[210px] shrink-0 border-r border-slate-200 pr-3 py-4">
      <input
        type="text"
        placeholder="Search our tutorials, e.g. HTML"
        className="w-full text-[13px] border border-slate-300 rounded-sm px-2 py-1.5 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <nav className="text-[15px] text-slate-700 space-y-0.5">
        {items.map((item) => (
          <div
            key={item.label}
            className={`px-2 py-1.5 rounded-sm ${
              item.active
                ? 'bg-green-600 text-white font-semibold'
                : 'hover:bg-slate-100'
            }`}
          >
            {item.link ? (
              <Link to={item.link} className="block w-full h-full">
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}