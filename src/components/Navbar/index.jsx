import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TopicsModal from '../TopicsModal';
import MainCard from '../TopicsModal/MainCard';
import CertifyCard from '../TopicsModal/CertifyCard';
import { MORE_TUTORIALS } from '../../data/moreTutorials';
import { REFERENCE_ITEMS } from '../../data/references';
import { EXERCISE_ITEMS } from '../../data/exercises';
import { CERTIFICATE_ITEMS } from '../../data/certificates';
import Logo from '../Logo';

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
    sectionLabel: 'DevAcademy REFERENCES:',
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
    sectionLabel: 'DEVACADEMY CERTIFICATES:',
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
  logoClassName = 'text-2xl',
  navClassName = 'hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600',
  activeTopic,
}) {
  const [activeNav, setActiveNav] = useState(null);
  const handleNavClick = (label) => {
    if (NAV_MODALS[label]) setActiveNav(label);
  };

  const modal = activeNav ? NAV_MODALS[activeNav] : null;

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
          {right ? <div className="flex items-center gap-4">{right}</div> : null}
        </div>
      </header>

      {modal ? (
        <TopicsModal
          title={activeTopic ? `${activeTopic} ${modal.title}` : modal.title}
          sectionLabel={modal.sectionLabel}
          items={modal.items}
          activeName={activeTopic}
          hero={
            <>
              {activeTopic ? (
                <MainCard
                  topic={activeTopic}
                  href={activeTopic === 'HTML' ? '/learn/html' : undefined}
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
    </>
  );
}