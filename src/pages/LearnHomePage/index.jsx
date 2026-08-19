import { useState } from 'react';
import { Search, Code2, Award, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import SectionCard from '../../components/SectionCard';
import TagMosaic from '../../components/TagMosaic';
import PillButton from '../../components/PillButton';
import SignInModal from '../../components/SignInModal';
import SignUpModal from '../../components/SignUpModal';
import {
  LANG_CARDS,
  SMALL_LANG_CARDS,
  TAG_COLORS,
  TAGS,
} from '../../data/learnHome';
import { TOP_NAV, LANG_TABS } from '../../data/htmlTutorial';
import LangTabs from '../HtmlTutorialPage/LangTabs';
import HeroSection from './HeroSection';
import BigLangSection from './BigLangSection';
import SmallLangCard from './SmallLangCard';

export default function LearnHomePage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div className="font-sans text-[#1a2233] bg-white">
      <Navbar
        links={TOP_NAV}
        containerClassName="px-6 h-14"
        logoClassName="h-5 w-auto"
        navClassName="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        right={
          <>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded px-3 py-1.5 w-64">
              <input
                placeholder="Search..."
                className="bg-transparent text-sm outline-none flex-1"
              />
              <Search size={15} className="text-slate-400" />
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
              <span className="hover:text-[#1a2233] cursor-pointer">Get Certified</span>
              <span className="hover:text-[#1a2233] cursor-pointer">Upgrade</span>
              <span className="hover:text-[#1a2233] cursor-pointer">Academy</span>
              <span className="hover:text-[#1a2233] cursor-pointer">Spaces</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSignIn(true)}
              className="bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
            >
              Sign In
            </button>
          </>
        }
      />
      {showSignIn ? (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      ) : null}
      {showSignUp ? <SignUpModal onClose={() => setShowSignUp(false)} /> : null}
      <LangTabs tabs={LANG_TABS} />

      <HeroSection />

      {LANG_CARDS.map((c, i) => {
        const next = LANG_CARDS[i + 1] || c;
        return <BigLangSection key={c.name} card={c} nextBg={next.color} />;
      })}

      {/* SMALL LANG GRID (PHP/jQuery/Java/C++/W3.CSS/Bootstrap) */}
      <section className="grid md:grid-cols-2 gap-4 px-4 py-4">
        {SMALL_LANG_CARDS.map((c) => (
          <SmallLangCard key={c.name} card={c} />
        ))}
      </section>

      {/* TAG MOSAIC */}
      <TagMosaic tags={TAGS} colors={TAG_COLORS} />

      {/* LOGIN / SIGN UP */}
      <SectionCard
        bg="bg-[#1a2233] text-white"
        title="Log in / Sign Up"
        subtitleClassName="mt-2 text-slate-300 text-sm max-w-lg mx-auto"
        subtitle="Create an account to track your progress, get your own website, and access other features and learning material."
        button={<PillButton onClick={() => setShowSignUp(true)}>Sign Up for Free</PillButton>}
      >
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {['My Profile', 'My Website', 'My Certificates'].map((label) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* CODE EDITOR */}
      <SectionCard
        bg="bg-[#0f1420] text-white"
        title="Code Editor"
        subtitleClassName="mt-2 text-slate-300 text-sm max-w-lg mx-auto"
        subtitle="With our online code editor, you can edit code and view the result in your browser."
        maxWidth="max-w-4xl"
      >
        <div className="mt-8 overflow-hidden rounded-lg bg-[#1a2233] shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a2233]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-slate-400 font-mono">www.devacademy.com/tryit/</span>
          </div>
          <div className="flex text-xs">
            <div className="px-4 py-2 bg-emerald-600 font-semibold">Frontend</div>
            <div className="px-4 py-2 text-slate-400">Backend</div>
          </div>
          <img
            src="codeeditor.gif"
            loading="lazy"
            alt="Frontend Code Editor"
            className="w-full h-auto block"
            style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PillButton>Try Frontend Editor (HTML/CSS/JS)</PillButton>
          <PillButton variant="outline">Try Backend Editor (Python/PHP/Java/C..)</PillButton>
        </div>
      </SectionCard>

      {/* SPACES */}
      <SectionCard
        bg="bg-[#a7dedb] text-[#1a2233]"
        title="Web Spaces"
        subtitleClassName="mt-2 text-sm max-w-lg mx-auto opacity-80"
        subtitle="If you want to build your own website, check out Web Spaces. No installation required, get your own website up and running in minutes."
        button={<PillButton>Learn More</PillButton>}
      >
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          <div className="bg-white rounded-lg p-5 shadow">
            <div className="h-24 rounded bg-slate-100 mb-3 flex items-center justify-center">
              <Code2 className="text-slate-400" />
            </div>
            <p className="text-xs font-semibold">Editor with live preview</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow flex flex-col justify-between">
            <p className="text-sm font-semibold">Learn Coding &amp; Build a Site</p>
            <p className="text-xs opacity-70 mt-2">
              Combine learning with hands-on building.
            </p>
          </div>
        </div>
      </SectionCard>

      {/* PLUS USER */}
      <SectionCard
        bg="bg-[#1a2233] text-white"
        title="Become a Plus User"
        subtitleClassName="mt-2 text-slate-300 text-sm"
        subtitle="And unlock powerful features"
        button={<PillButton>Learn More</PillButton>}
      >
        <ul className="mt-6 space-y-2 text-sm text-slate-300 inline-block text-left">
          {[
            'Ad free version',
            'Build and host websites',
            'Unlimited practice tests',
            'Get certified',
            'And much more',
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-400" /> {f}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* TEACHERS */}
      <SectionCard
        bg="bg-[#efe7d8] text-[#1a2233]"
        title="For Teachers"
        subtitleClassName="mt-2 text-sm opacity-80 max-w-md mx-auto"
        subtitle="Streamline your teaching with tools to manage classrooms, assign homework, and monitor student progress, all in one place."
        button={<PillButton>Learn More</PillButton>}
      >
        <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto h-32 flex items-center justify-center">
          <Award className="text-slate-300" size={40} />
        </div>
      </SectionCard>

      {/* DEV TOOLS */}
      <SectionCard
        bg="bg-[#f3c6cf] text-[#1a2233]"
        title="Developer Tools"
        subtitleClassName="mt-2 text-sm opacity-80"
        subtitle="Free online tools for your everyday development tasks."
        button={<PillButton>Browse Tools</PillButton>}
      >
        <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm font-semibold">Circle Crop Image</span>
          <div className="w-12 h-12 rounded-full bg-slate-200" />
        </div>
      </SectionCard>

      {/* WEEKLY PROBLEM */}
      <SectionCard
        bg="bg-[#1a2233] text-white"
        title="Weekly Problem"
        subtitleClassName="mt-2 text-slate-300 text-sm"
        subtitle="A new coding challenge every week — solve for the win."
        button={<PillButton>Start Solving</PillButton>}
      >
        <div className="mt-8 bg-[#0f1420] rounded-lg p-5 max-w-md mx-auto text-left">
          <p className="text-emerald-400 text-xs font-semibold">Palindrome Number</p>
          <p className="text-xs text-slate-400 mt-1">Easy</p>
        </div>
      </SectionCard>

      {/* BUILD A PROJECT */}
      <SectionCard
        bg="bg-[#bfe3cf] text-[#1a2233]"
        title="Build a Project"
        subtitleClassName="mt-2 text-sm opacity-80"
        subtitle="Step-by-step guides to help you build in your favorite language."
        button={<PillButton>Browse Projects</PillButton>}
      >
        <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-md mx-auto text-left">
          <p className="text-sm font-semibold">Build a Personal Page</p>
        </div>
      </SectionCard>

      {/* CODE GAME */}
      <SectionCard
        bg="bg-[#3b2e5a] text-white"
        title="Code Game"
        subtitleClassName="mt-2 text-slate-300 text-sm"
        subtitle="Help the fox collect the coins while learning to code."
        button={<PillButton>Play Game</PillButton>}
      />

      {/* EXERCISES AND QUIZZES */}
      <SectionCard
        bg="bg-[#1a2233] text-white"
        title="Exercises and Quizzes"
        subtitleClassName="mt-2 text-slate-300 text-sm"
        subtitle="Test your skills."
      >
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="bg-emerald-500 text-white text-sm font-semibold px-8 py-3 rounded hover:bg-emerald-600"
          >
            Exercises
          </button>
          <button
            type="button"
            className="bg-[#f2cf4a] text-[#1a2233] text-sm font-semibold px-8 py-3 rounded hover:brightness-95"
          >
            Quizzes
          </button>
        </div>
      </SectionCard>

      {/* WEB TEMPLATES */}
      <SectionCard
        bg="bg-[#a7dedb] text-[#1a2233]"
        title="Web Templates"
        subtitleClassName="mt-2 text-sm opacity-80"
        subtitle="Browse our selection of free responsive HTML templates."
        button={<PillButton>Browse Templates</PillButton>}
      >
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 bg-white rounded shadow" />
          ))}
        </div>
      </SectionCard>

      {/* FOOTER CTA */}
      <SectionCard
        bg="bg-[#0f1420] text-white"
        title="Kickstart your career"
        subtitleClassName="mt-2 text-slate-400 text-sm"
        subtitle="Get certified by completing a course today!"
      >
        <button
          type="button"
          className="mt-8 bg-emerald-500 text-white text-sm font-semibold px-8 py-3 rounded hover:bg-emerald-600 inline-flex items-center gap-2"
        >
          Get Started <ArrowRight size={16} />
        </button>
      </SectionCard>
    </div>
  );
}