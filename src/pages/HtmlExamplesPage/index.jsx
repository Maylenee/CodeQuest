import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { TOP_NAV, LANG_TABS, SIDEBAR_ITEMS } from '../../data/htmlTutorial';
import { EXAMPLES_SECTIONS, MORE_EXAMPLES } from '../../data/htmlExamples';
import { fetchTrack } from '../../lib/api';
import { buildSidebarItems } from '../../lib/sidebar';
import LangTabs from '../HtmlTutorialPage/LangTabs';
import TutorialSidebar from '../HtmlTutorialPage/TutorialSidebar';
import TutorialFooter from '../HtmlTutorialPage/TutorialFooter';
import AdCard from '../HtmlTutorialPage/AdCard';
import VideoAdCard from '../HtmlTutorialPage/VideoAdCard';
import ExampleSection from './ExampleSection';
import Pagination from './Pagination';
import MoreExamples from './MoreExamples';

function titleCase(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractCodeBlocks(md) {
  return [...(md || '').matchAll(/```(?:\w+)?\s*\n([\s\S]*?)\n```/g)]
    .map((m) => m[1].trim())
    .filter(Boolean);
}

export default function HtmlExamplesPage() {
  const { slug = 'html' } = useParams();
  const [name, setName] = useState(titleCase(slug));
  const [dbSections, setDbSections] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const sections = (data.lessons || [])
          .map((l) => ({ title: l.title, items: extractCodeBlocks(l.content_md) }))
          .filter((s) => s.items.length);
        setDbSections(sections.length ? sections : null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[ExamplesPage] fallback ke data statis:', err);
        setDbSections(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sections = useMemo(() => dbSections || EXAMPLES_SECTIONS, [dbSections]);
  const more = useMemo(() => (dbSections ? null : MORE_EXAMPLES), [dbSections]);

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
            <button
              type="button"
              className="bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
            >
              Sign In
            </button>
          </>
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
              activeLabel={`${name} Examples`}
            />
            {!loading && <AdCard />}
            {!loading && <VideoAdCard />}
          </div>
        </aside>

        <main className="flex-1 min-w-0 lg:order-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h1 className="text-[28px] font-bold text-slate-900">{name} Examples</h1>
          </div>

          <Pagination />

          {sections.map((section) => (
            <ExampleSection key={section.title} title={section.title} items={section.items} />
          ))}

          {more && <MoreExamples items={more} />}

          <Pagination />
        </main>
      </div>

      <TutorialFooter />
    </div>
  );
}