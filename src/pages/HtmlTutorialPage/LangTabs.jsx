import { useNavigate, useParams } from 'react-router-dom';

const SLUG_MAP = {
  HTML: 'html',
  CSS: 'css',
  JAVASCRIPT: 'javascript',
  SQL: 'sql',
  PYTHON: 'python',
};

function tabSlug(label) {
  const key = label.toUpperCase();
  if (SLUG_MAP[key]) return SLUG_MAP[key];
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function LangTabs({ tabs }) {
  const { slug = 'html' } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a2233] border-b border-slate-200 overflow-x-auto sticky top-14 z-30">
      <div className="flex text-xs font-semibold text-slate-300 whitespace-nowrap">
        {tabs.map((t) => {
          const active = tabSlug(t) === slug;
          return (
            <button
              key={t}
              type="button"
              onClick={() => navigate(`/learn/${tabSlug(t)}`)}
              className={`px-4 py-2.5 ${
                active ? 'bg-[#0f1420] text-white' : 'hover:bg-white/5'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}