import { useState } from 'react';
import Tile from './Tile';

export default function TopicsModal({
  title,
  items,
  hero,
  sectionLabel = 'MORE:',
  activeName,
  onClose = () => {},
}) {
  const [filter, setFilter] = useState('');

  const filtered = items.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[900px] mt-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 pt-6">
          <p className="text-green-600 text-[13px] font-bold tracking-wide">{title}</p>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {hero ? <div className="px-7 py-5 flex flex-col md:flex-row gap-4">{hero}</div> : null}

        <div className="px-7 pb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-slate-500 tracking-wide">{sectionLabel}</p>
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
                onClick={() => setFilter('')}
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
              <Tile
                key={t.name}
                {...t}
                active={Boolean(activeName) && t.name === activeName}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}