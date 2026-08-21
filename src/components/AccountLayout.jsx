import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  ProgressIcon,
  LeagueIcon,
  BookmarkIcon,
  CertificateIcon,
  ProfileIcon,
} from './icons';

const NAV = [
  { label: 'Dashboard', to: '/dashboard', Icon: DashboardIcon },
  { label: 'My Progress', to: '/dashboard/progress', Icon: ProgressIcon },
  { label: 'League', to: '/dashboard/league', Icon: LeagueIcon },
  { label: 'Bookmarks', to: '/dashboard/bookmarks', Icon: BookmarkIcon },
  { label: 'Certificates', to: '/dashboard/certificates', Icon: CertificateIcon },
  { label: 'Profile', to: '/dashboard/profile', Icon: ProfileIcon },
];

export default function AccountLayout({ active, rightExtras, children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar
        links={['Tutorials', 'References', 'Exercises', 'Certificates']}
        containerClassName="px-6 h-14"
        logoClassName="h-5 w-auto"
        navClassName="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        right={rightExtras}
      />
      <div className="flex">
        <aside className="hidden md:block w-60 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-56px)] p-3">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const isActive = item.label === active;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] ${
                    isActive
                      ? 'bg-slate-100 font-semibold text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <item.Icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
