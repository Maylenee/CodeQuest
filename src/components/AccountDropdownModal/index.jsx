import React, { useEffect, useRef } from "react";
import {
  DashboardIcon,
  ProgressIcon,
  LeagueIcon,
  BookmarkIcon,
  CertificateIcon,
} from "../../components/icons";

/**
 * Standalone recreation of the account dropdown modal (the avatar menu
 * in the top-right corner). Render it positioned under the avatar button,
 * e.g.:
 *
 *   <div className="relative">
 *     <button onClick={() => setOpen(v => !v)}>avatar</button>
 *     {open && (
 *   <div className="absolute right-0 top-12 z-50">
 *         <AccountDropdownModal
 *           name="Lukman Adiyatna"
 *           plan="Free"
 *           onNavigate={(label) => { ...route... ; setOpen(false); }}
 *           onClose={() => setOpen(false)}
 *         />
 *       </div>
 *     )}
 *   </div>
 */

function LogoutIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MENU_ITEMS = [
  { label: "Dashboard", icon: DashboardIcon },
  { label: "My Progress", icon: ProgressIcon },
  { label: "League", icon: LeagueIcon },
  { label: "Bookmarks", icon: BookmarkIcon },
  { label: "Certificates", icon: CertificateIcon },
];

export default function AccountDropdownModal({
  name = "Lukman Adiyatna",
  activeLabel = "Dashboard",
  onNavigate = () => {},
  onLogout = () => {},
  onClose = () => {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    function handleEscape(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 font-sans"
    >
      {/* Header: name, edit profile link */}
      <div className="px-4 py-3.5">
        <div>
          <p className="font-bold text-[16px] leading-tight">{name}</p>
          <button
            onClick={() => onNavigate("Profile")}
            className="text-[13px] text-slate-500 hover:text-slate-700 flex items-center gap-1 mt-0.5"
          >
            Edit profile
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Primary nav items */}
      <div className="border-t border-slate-100 py-1.5">
        {MENU_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = label === activeLabel;
          return (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-left transition-colors ${
                isActive ? "bg-slate-50 font-semibold text-slate-900" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4 text-slate-500" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Footer: logout */}
      <div className="border-t border-slate-100 py-1.5">
        <button
          onClick={() => (onLogout ? onLogout() : onClose())}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-left text-red-600 hover:bg-red-50 font-medium"
        >
          <LogoutIcon className="w-4 h-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
