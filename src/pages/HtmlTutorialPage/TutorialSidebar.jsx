import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function LoadingRow() {
  return (
    <div className="px-4 py-2">
      <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse" />
    </div>
  );
}

function SidebarItem({ item, activeLabel }) {
  const active = item.active || item.label === activeLabel;
  const cls = `flex items-center justify-between py-2 pr-4 pl-3 text-sm cursor-pointer border-l-2 ${
    active
      ? 'border-emerald-500 bg-slate-100 font-bold text-[#1a2233]'
      : 'border-emerald-200 text-slate-700 hover:bg-slate-50'
  }`;
  const chevron = item.hasChildren && (
    <ChevronDown size={14} className="text-slate-400" />
  );

  if (item.link) {
    return (
      <Link to={item.link} className={cls}>
        <span>{item.label}</span>
        {chevron}
      </Link>
    );
  }

  return (
    <div className={cls}>
      <span>{item.label}</span>
      {chevron}
    </div>
  );
}

export default function TutorialSidebar({
  items,
  title = 'HTML TUTORIAL',
  activeLabel,
  loading,
  collapsible,
}) {
  const groups = useMemo(
    () => items.filter((i) => i.type === 'group').map((i) => i.label),
    [items]
  );
  const [closed, setClosed] = useState(() => new Set());

  useEffect(() => {
    if (!collapsible) return;
    let activeGroup = '';
    for (const item of items) {
      if (item.type === 'group') activeGroup = item.label;
      else if (item.active || (activeLabel && item.label === activeLabel)) break;
    }
    setClosed(new Set(groups.filter((g) => g !== activeGroup)));
  }, [collapsible, activeLabel, items, groups]);

  const toggle = (label) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  let currentGroup = '';
  const visibleItems = items.filter((item) => {
    if (item.type === 'group') {
      currentGroup = item.label;
      return true;
    }
    return !closed.has(currentGroup);
  });

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <p className="px-4 py-3 text-xs font-bold text-slate-400 tracking-wide bg-slate-50 border-b border-slate-200">
        {title}
      </p>
      <div className="max-h-[480px] overflow-y-auto">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <LoadingRow key={i} />)
          : visibleItems.map((item) =>
              item.type === 'group' ? (
                <button
                  key={`group-${item.label}`}
                  type="button"
                  onClick={() => (collapsible ? toggle(item.label) : null)}
                  aria-expanded={!closed.has(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-bold tracking-wide text-slate-500 bg-slate-50 text-left ${
                    collapsible ? 'cursor-pointer hover:bg-slate-100' : 'cursor-default'
                  }`}
                >
                  <span>{item.label}</span>
                  {collapsible && (
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform ${
                        closed.has(item.label) ? '-rotate-90' : ''
                      }`}
                    />
                  )}
                </button>
              ) : (
                <SidebarItem
                  key={`${item.type || 'item'}-${item.label}`}
                  item={item}
                  activeLabel={activeLabel}
                />
              )
            )}
      </div>
    </div>
  );
}