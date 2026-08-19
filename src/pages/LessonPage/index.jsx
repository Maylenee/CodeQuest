import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { TOP_NAV, LANG_TABS } from '../../data/htmlTutorial';
import { fetchTrack } from '../../lib/api';
import { buildSidebarItems } from '../../lib/sidebar';
import LangTabs from '../HtmlTutorialPage/LangTabs';
import TutorialSidebar from '../HtmlTutorialPage/TutorialSidebar';
import AdCard from '../HtmlTutorialPage/AdCard';
import VideoAdCard from '../HtmlTutorialPage/VideoAdCard';
import TutorialFooter from '../HtmlTutorialPage/TutorialFooter';

function titleCase(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-black mb-4">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="text-2xl font-black mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-bold mt-5 mb-2">{children}</h4>,
  h5: ({ children }) => <h5 className="text-base font-bold mt-4 mb-2">{children}</h5>,
  p: ({ children }) => <p className="text-[15px] text-slate-700 leading-7 my-3">{children}</p>,
  a: ({ children, href }) => (
    <a href={href} className="text-emerald-600 underline hover:text-emerald-700" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc pl-6 my-3 space-y-1 text-[15px] text-slate-700">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 my-3 space-y-1 text-[15px] text-slate-700">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-amber-300 bg-amber-50 p-4 my-4 text-sm text-slate-700">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#0f1420] text-slate-100 p-4 rounded-lg overflow-x-auto text-[13px] font-mono leading-6 my-4">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const text = Array.isArray(children) ? children.join('') : String(children || '');
    if (className || text.includes('\n')) {
      return <code className={`${className || ''} block text-slate-100`}>{children}</code>;
    }
    return (
      <code className="bg-slate-100 text-emerald-700 px-1.5 py-0.5 rounded text-[13px] font-mono">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse border border-slate-200">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-slate-200 px-3 py-2 text-slate-700">{children}</td>
  ),
  hr: () => <hr className="my-6 border-slate-200" />,
};

export default function LessonPage() {
  const { slug = 'html', lessonSlug } = useParams();
  const fallbackName = useMemo(() => titleCase(slug), [slug]);
  const [track, setTrack] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = track?.name || fallbackName;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTrack(slug)
      .then((data) => {
        if (cancelled) return;
        setTrack(data.track || null);
        setLessons(data.lessons || []);
        setExercises(data.exercises || []);
        setQuizzes(data.quizzes || []);
        setReferences(data.references || []);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[LessonPage] gagal fetch:', err);
        setLessons([]);
        setExercises([]);
        setQuizzes([]);
        setReferences([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = index >= 0 ? lessons[index] : null;
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;

  const sidebarItems = useMemo(() => {
    if (loading) return [];
    if (!lessons.length) {
      return slug === 'html'
        ? null
        : [{ type: 'group', label: `${name} Tutorial` }];
    }
    return buildSidebarItems({ lessons, slug, name, quizzes, exercises, references, lessonSlug });
  }, [lessons, slug, name, quizzes, exercises, references, loading, lessonSlug]);

  const navBtn = (target, dir) =>
    target ? (
      <Link
        to={`/learn/${slug}/${target.slug}`}
        className="flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
      >
        {dir === 'prev' && <ArrowLeft size={14} />}
        {target.title}
        {dir === 'next' && <ArrowRight size={14} />}
      </Link>
    ) : (
      <span className="text-sm text-slate-400">-</span>
    );

  return (
    <div className="font-sans text-[#1a2233] bg-white min-h-screen">
      <Navbar
        links={TOP_NAV}
        activeTopic={name.toUpperCase()}
        containerClassName="px-6 h-14"
        logoClassName="text-xl"
        navClassName="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        right={
          <button
            type="button"
            className="bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
          >
            Sign In
          </button>
        }
      />
      <LangTabs tabs={LANG_TABS} />

      <div className="flex flex-col lg:flex-row gap-8 px-6 py-8">
        <aside className="w-full lg:w-64 shrink-0 order-1">
          <div className="lg:sticky lg:top-[72px] flex flex-col gap-6">
            <TutorialSidebar
              items={sidebarItems || []}
              title={`${name.toUpperCase()} TUTORIAL`}
              loading={loading}
              collapsible
              activeLabel={lesson?.title}
            />
            <AdCard />
            <VideoAdCard />
          </div>
        </aside>

        <main className="flex-1 min-w-0 order-2 max-w-3xl">
          {loading ? (
            <div className="space-y-3">
              <div className="h-8 w-1/3 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              <div className="h-40 w-full bg-slate-100 rounded animate-pulse" />
            </div>
          ) : !lesson ? (
            <div className="text-center py-20">
              <h1 className="text-2xl font-black">Lesson tidak ditemukan</h1>
              <Link to={`/learn/${slug}`} className="inline-block mt-4 text-emerald-600 font-semibold underline">
                Kembali ke {name} Tutorial
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <Link
                  to={`/learn/${slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                >
                  <ArrowLeft size={14} /> {name} Tutorial
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#1a2233]"
                >
                  <Bookmark size={14} /> Save
                </button>
              </div>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {lesson.content_md || 'Konten sedang disiapkan.'}
              </ReactMarkdown>

              {(exercises.length > 0 || quizzes.length > 0) && (
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {exercises.length > 0 && (
                    <div className="bg-[#0f1420] rounded-lg p-6 text-white">
                      <p className="text-lg font-bold">{name} Exercises</p>
                      <p className="text-sm text-slate-300 mt-1">
                        Test your {name} knowledge with the chapter exercises.
                      </p>
                      <Link
                        to={`/learn/${slug}/exercises`}
                        className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600"
                      >
                        See all {name} Exercises »
                      </Link>
                    </div>
                  )}
                  {quizzes.length > 0 && (
                    <div className="border border-slate-200 rounded-lg p-6">
                      <p className="text-lg font-bold">{name} Quiz</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Test your {name} skills with the {name} quiz.
                      </p>
                      <Link
                        to={`/learn/${slug}/quiz`}
                        className="mt-4 inline-block bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-sky-700"
                      >
                        Start {name} Quiz »
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                {navBtn(prev, 'prev')}
                <span className="text-xs text-slate-500">
                  {index + 1} / {lessons.length}
                </span>
                {navBtn(next, 'next')}
              </div>
            </>
          )}
        </main>
      </div>

      <TutorialFooter />
    </div>
  );
}
