import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { TOP_NAV, LANG_TABS, SIDEBAR_ITEMS } from '../../data/htmlTutorial';
import { EXERCISES } from '../../data/htmlExercises';
import { fetchTrack } from '../../lib/api';
import { buildSidebarItems } from '../../lib/sidebar';
import LangTabs from '../HtmlTutorialPage/LangTabs';
import TutorialFooter from '../HtmlTutorialPage/TutorialFooter';
import TutorialSidebar from '../HtmlTutorialPage/TutorialSidebar';
import AdCard from '../HtmlTutorialPage/AdCard';
import VideoAdCard from '../HtmlTutorialPage/VideoAdCard';
import ExerciseRow from './ExerciseRow';

function titleCase(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function HtmlExercisesPage() {
  const { slug = 'html' } = useParams();
  const [query, setQuery] = useState('');
  const [name, setName] = useState(titleCase(slug));
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTrack(slug)
      .then((data) => {
        if (cancelled) return;
        setName(data.track?.name || titleCase(slug));
        setLessons(data.lessons || []);
        setExercises(data.exercises || []);
        setQuizzes(data.quizzes || []);
        setReferences(data.references || []);
        setGroups((data.exercises || []).map((g) => ({ name: g.name, count: g.exercises.length })));
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[ExercisesPage] fallback ke data statis:', err);
        setLessons([]);
        setGroups(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const list = groups === null ? EXERCISES : groups;
  const filtered = list.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
  const sidebarItems = useMemo(() => {
    if (loading) return [];
    if (!lessons.length) {
      return slug === 'html'
        ? SIDEBAR_ITEMS
        : [{ type: 'group', label: `${name} Tutorial` }];
    }
    return buildSidebarItems({ lessons, slug, name, quizzes, exercises, references });
  }, [lessons, slug, name, quizzes, exercises, references, loading]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar
        links={TOP_NAV}
        activeRight="Sign In"
        containerClassName="px-6 h-14"
        logoClassName="h-5 w-auto"
        navClassName="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        right={
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded px-3 py-1.5 w-64">
            <input
              placeholder="Search..."
              className="bg-transparent text-sm outline-none flex-1"
            />
            <Search size={15} className="text-slate-400" />
          </div>
        }
      />
      <LangTabs tabs={LANG_TABS} />

      <div className="flex flex-col lg:flex-row gap-8 px-6 py-8">
        <aside className="w-full lg:w-64 shrink-0 lg:order-1">
          <div className="lg:sticky lg:top-[72px] flex flex-col gap-6">
            <TutorialSidebar
              items={sidebarItems}
              title={`${name.toUpperCase()} TUTORIAL`}
              loading={loading}
              activeLabel={`${name} Exercises`}
            />
            {!loading && <AdCard />}
            {!loading && <VideoAdCard />}
          </div>
        </aside>

        <main className="flex-1 min-w-0 lg:order-2">
          {/* ad banner */}
          <div className="border border-slate-200 rounded-md flex items-center gap-4 p-3 mb-6">
            <div className="w-14 h-14 bg-slate-100 rounded shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-slate-800">100+ Templat Estetik</p>
              <p className="text-[12px] text-slate-500">PPT AI Gratis 2026</p>
              <p className="text-[11px] text-slate-400">
                Buat audiens dengan visual menawan. AI TeraBox atur desain, kamu santai.
              </p>
            </div>
            <button
              type="button"
              className="bg-blue-600 text-white text-[12px] font-semibold px-4 py-2 rounded-sm shrink-0"
            >
              OPEN ›
            </button>
          </div>


          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50"
            >
              ‹ Previous
            </button>
            <button
              type="button"
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold"
            >
              Next ›
            </button>
          </div>

          <p className="text-[15px] text-slate-700 mb-4">
            Test your {name} skills with exercises from all categories:
          </p>

          <div className="bg-slate-100 rounded-md p-5">
            <h2 className="text-[22px] font-bold text-slate-900 mb-1">Exercises</h2>
            <p className="text-[13px] text-slate-500 mb-4">
              Tip: <span className="text-green-600">Sign in</span> to track your progress.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Filter categories (e.g. heading, table, form, etc.)"
                className="flex-1 text-[13px] border border-slate-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <span className="text-[12px] text-slate-500 whitespace-nowrap">
                0/{list.length} done
              </span>
            </div>

            {filtered.map((ex) => (
              <ExerciseRow key={ex.name} name={ex.name} count={ex.count} />
            ))}

            {list.length === 0 && (
              <p className="text-[14px] text-slate-500 text-center py-6">
                Belum ada latihan soal untuk {name} — segera hadir.
              </p>
            )}
          </div>

          <h2 className="text-[22px] font-bold text-slate-900 mt-8 mb-2">
            Log in to track your progress
          </h2>
          <p className="text-[14px] text-slate-700 mb-2">
            If you haven't already, <span className="text-green-600">sign up</span> to become a
            W3Schooler, and get points for every exercise you complete.
          </p>
          <p className="text-[14px] text-slate-700 mb-6">
            As a logged-in W3Schools user you will have access to many features like{' '}
            <span className="text-green-600">your own web page</span>,{' '}
            <span className="text-green-600">track your learning progress</span>,{' '}
            <span className="text-green-600">receive personal guided paths</span>, and more.
          </p>

          <h2 className="text-[22px] font-bold text-slate-900 mb-2">The Exercise</h2>
          <p className="text-[14px] text-slate-700 mb-2">
            The exercises are a mix of "multiple choice" and "fill in the blanks" questions.
          </p>
          <p className="text-[14px] text-slate-700 mb-2">
            There are between 3 and 9 questions in each category.
          </p>
          <p className="text-[14px] text-slate-700 mb-2">
            The answer can be found in the corresponding tutorial chapter.
          </p>
          <p className="text-[14px] text-slate-700 mb-8">
            If you're stuck, or answer wrong, you can try again or hit the "Show Answer" button
            to see the correct answer.
          </p>

          <div className="border border-slate-200 rounded-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="text-green-600 text-[12px] font-bold mb-1">{name.toUpperCase()} CERTIFICATION</p>
                <h3 className="text-[22px] font-bold text-slate-900 mb-2">
                  Get Certified in {name}
                </h3>
                <p className="text-[14px] text-slate-600 mb-4">
                  Complete the W3Schools {name} course, strengthen your knowledge, and earn a
                  certificate you can add to your CV, portfolio, and LinkedIn profile.
                </p>
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-sm"
                >
                  Get Certified Today
                </button>
              </div>
              <div className="w-full sm:w-52 shrink-0 border border-slate-200 rounded-md p-3 text-center">
                <p className="text-[10px] font-bold text-slate-700 mb-1">
                  CERTIFICATE OF COMPLETION
                </p>
                <p className="text-[11px] font-semibold mb-2">Your Name</p>
                <p className="text-[9px] text-slate-500">Certified {name} Developer</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50"
            >
              ‹ Previous
            </button>
            <span className="border border-slate-300 rounded-sm px-4 py-2 text-[13px] text-slate-500">
              Sign in to track progress
            </span>
            <button
              type="button"
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold"
            >
              Next ›
            </button>
          </div>
        </main>
      </div>

      <TutorialFooter />
    </div>
  );
}