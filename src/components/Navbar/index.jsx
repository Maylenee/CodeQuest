import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import TopicsModal from '../TopicsModal';
import MainCard from '../TopicsModal/MainCard';
import CertifyCard from '../TopicsModal/CertifyCard';
import SignInModal from '../SignInModal';
import SignUpModal from '../SignUpModal';
import AccountDropdownModal from '../AccountDropdownModal';
import { MORE_TUTORIALS } from '../../data/moreTutorials';
import { REFERENCE_ITEMS } from '../../data/references';
import { EXERCISE_ITEMS } from '../../data/exercises';
import { CERTIFICATE_ITEMS } from '../../data/certificates';
import Logo from '../Logo';

const TOPIC_SLUG_MAP = {
  HTML: 'html',
  CSS: 'css',
  JAVASCRIPT: 'javascript',
  SQL: 'sql',
  PYTHON: 'python',
  JAVA: 'java',
  PHP: 'php',
  C: 'c',
  'C++': 'cpp',
  'C#': 'c-sharp',
  'W3.CSS': 'w3-css',
  BOOTSTRAP: 'bootstrap',
  REACT: 'react',
  MYSQL: 'mysql',
  JQUERY: 'jquery',
  EXCEL: 'excel',
  XML: 'xml',
};

function topicSlug(label) {
  const key = String(label || '').trim().toUpperCase();
  if (TOPIC_SLUG_MAP[key]) return TOPIC_SLUG_MAP[key];
  return String(label || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const NAV_MODALS = {
  Tutorials: {
    title: 'Tutorial',
    sectionLabel: 'MORE TUTORIALS:',
    items: MORE_TUTORIALS,
    mainCard: (topic) => ({
      heading: `${topic} Tutorial`,
      subtitle: `Learn ${topic} with our tutorial. Free, and easy to follow`,
      buttonText: `Learn ${topic}`,
    }),
  },
  References: {
    title: 'References',
    sectionLabel: (<span className="flex items-center gap-2"><Logo className="h-4 w-auto" /> REFERENCES:</span>),
    items: REFERENCE_ITEMS,
    mainCard: (topic) => ({
      heading: `${topic} References`,
      subtitle: `Complete for ${topic}`,
      buttonText: `Get ${topic} Reference`,
    }),
  },
  Exercises: {
    title: 'Exercises',
    sectionLabel: 'MORE EXERCISES:',
    items: EXERCISE_ITEMS,
    mainCard: (topic) => ({
      heading: `${topic} Exercises`,
      subtitle: `Practice ${topic} with our exercises. Free, and easy to follow`,
      buttonText: `Practice ${topic}`,
    }),
  },
  Certificates: {
    title: 'Certificates',
    sectionLabel: (<span className="flex items-center gap-2"><Logo className="h-4 w-auto" /> CERTIFICATES:</span>),
    items: CERTIFICATE_ITEMS,
    mainCard: (topic) => ({
      heading: `${topic} Certificate`,
      subtitle: `Get certified for ${topic}. Includes a professional study kit`,
      buttonText: `Get ${topic} Certified`,
    }),
  },
};

export default function Navbar({
  links = [],
  right,
  containerClassName = 'px-6 h-16',
  logoClassName = 'h-5 w-auto',
  navClassName = 'hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600',
  activeTopic,
  activeRight,
}) {
  const [activeNav, setActiveNav] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('codelearn_user') || 'null');
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  const handleNavClick = (label) => {
    if (NAV_MODALS[label]) setActiveNav(label);
  };

  const handleLoggedIn = (u) => {
    setUser(u);
    try {
      localStorage.setItem('codelearn_user', JSON.stringify(u));
    } catch {}
    setShowSignIn(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAccountOpen(false);
    try {
      localStorage.removeItem('codelearn_user');
    } catch {}
    navigate('/');
  };

  const handleAccountNavigate = (label) => {
    setAccountOpen(false);
    const map = {
      Dashboard: '/dashboard',
      'My Progress': '/dashboard/progress',
      League: '/dashboard/league',
      Bookmarks: '/dashboard/bookmarks',
      Certificates: '/dashboard/certificates',
      Profile: '/dashboard/profile',
    };
    if (map[label]) navigate(map[label]);
  };

  const modal = activeNav ? NAV_MODALS[activeNav] : null;

  const renderRight = () => {
    const signInActive = activeRight === 'Sign In';
    const initial = (user?.first_name || user?.email || '?').trim().charAt(0).toUpperCase();
    return (
      <div className="flex items-center gap-4">
        {right
          ? React.Children.map(right, (child) => {
              if (!React.isValidElement(child)) return child;
              const childLabel = child.props.children;
              // Abaikan tombol "Sign In" dari page — Navbar render sendiri
              // agar modal konsisten di semua halaman.
              if (childLabel === 'Sign In') return null;
              const isActive = activeRight && childLabel === activeRight;
              const baseClass = child.props.className || '';
              const activeClass = isActive ? 'bg-emerald-600 text-white' : '';
              return React.cloneElement(child, {
                className: `${baseClass} ${activeClass}`.trim(),
              });
            })
          : null}
        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-emerald-500 text-white font-semibold flex items-center justify-center hover:bg-emerald-600"
              title="Account"
            >
              {initial}
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-12 z-50">
                <AccountDropdownModal
                  name={`${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email}
                  activeLabel=""
                  onNavigate={handleAccountNavigate}
                  onLogout={handleLogout}
                  onClose={() => setAccountOpen(false)}
                />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSignIn(true)}
            className={`bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600 ${
              signInActive ? 'bg-emerald-600' : ''
            }`}
          >
            Sign In
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="border-b border-slate-200 sticky top-0 z-40 bg-white">
        <div className={`flex items-center justify-between ${containerClassName}`}>
          <div className="flex items-center gap-8">
            <Logo className={logoClassName} />
            <nav className={navClassName}>
              {links.map((l) => (
                <span
                  key={l}
                  onClick={() => handleNavClick(l)}
                  className="flex items-center gap-1 hover:text-[#1a2233] cursor-pointer"
                >
                  {l}
                  <ChevronDown size={14} />
                </span>
              ))}
            </nav>
          </div>
          {renderRight()}
        </div>
      </header>

      {modal ? (
        <TopicsModal
          title={activeTopic ? `${activeTopic} ${modal.title}` : modal.title}
          sectionLabel={modal.sectionLabel}
          items={modal.items.map((item) => ({
            ...item,
            href: item.href || `/learn/${topicSlug(item.name)}`,
          }))}
          activeName={activeTopic}
          hero={
            <>
              {activeTopic ? (
                <MainCard
                  topic={activeTopic}
                  href={`/learn/${topicSlug(activeTopic)}`}
                  onClose={() => setActiveNav(null)}
                  {...modal.mainCard(activeTopic)}
                />
              ) : null}
              <CertifyCard />
            </>
          }
          onClose={() => setActiveNav(null)}
        />
      ) : null}

      {showSignIn ? (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          onLoggedIn={handleLoggedIn}
        />
      ) : null}
      {showSignUp ? (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          onRegistered={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      ) : null}
    </>
  );
}