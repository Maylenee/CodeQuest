import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

/**
 * Some content_md coming from the API has had its real line breaks collapsed
 * into single spaces somewhere upstream (scraper/importer bug) — e.g.
 * "HTML is the standard... ## What is HTML? - HTML stands for..." all on one
 * line. Markdown needs blank lines to know where a heading/list/blockquote
 * starts, so a flattened string like that renders as one giant paragraph —
 * and a fenced ``` code block with no line breaks isn't a valid fence at
 * all, so the raw HTML tags inside it get silently dropped by ReactMarkdown
 * as unrendered inline HTML.
 *
 * This is a *best-effort* repair for already-broken data — the real fix is
 * to stop stripping newlines wherever content_md gets written/scraped.
 * Headings are the trickiest part: once flattened there's no delimiter
 * between a heading's title and the paragraph glued right after it, so this
 * guesses the boundary using a few cues (a trailing "?", the title
 * literally repeating at the start of the next sentence, or the next word
 * being a generic sentence-starter like "the"/"since"/"all").
 */
function normalizeFlattenedMarkdown(raw) {
  if (!raw) return raw;
  if (raw.includes('\n\n')) return raw;

  let text = raw.trim();

  // 1) Protect fenced code examples before anything else touches them.
  const codeBlocks = [];
  text = text.replace(/```\s*([\s\S]*?)\s*```/g, (_, code) => {
    codeBlocks.push(code.trim());
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`;
  });

  // 2) Headings: guess where each title ends instead of letting it run into
  // the paragraph glued right after it.
  const HEADING_STOPWORDS = new Set([
    'the', 'a', 'an', 'this', 'these', 'some', 'have', 'since', 'all', 'below', 'if',
  ]);
  const MAX_TITLE_WORDS = 8;

  function extractTitle(words) {
    const n = Math.min(words.length, MAX_TITLE_WORDS);
    for (let i = 0; i < n; i++) {
      if (/\?$/.test(words[i])) return words.slice(0, i + 1);
      if (words[i].startsWith('#') || words[i].startsWith('\u0000CODEBLOCK')) return words.slice(0, i);
      if (words[i] === '-') return words.slice(0, i);
    }
    for (let L = Math.min(4, Math.floor(words.length / 2)); L >= 1; L--) {
      const a = words.slice(0, L).join(' ').toLowerCase();
      const b = words.slice(L, 2 * L).join(' ').toLowerCase();
      if (a && a === b) return words.slice(0, L);
    }
    for (let i = 1; i < n; i++) {
      if (HEADING_STOPWORDS.has(words[i].toLowerCase())) return words.slice(0, i);
    }
    return words.slice(0, n);
  }

  const headingRe = /(#{1,6})\s+/g;
  let out = '';
  let cursor = 0;
  let match;
  while ((match = headingRe.exec(text))) {
    out += text.slice(cursor, match.index).trim() + '\n\n';
    const rest = text.slice(headingRe.lastIndex);
    const words = rest.split(/\s+/).filter(Boolean);
    const title = extractTitle(words);
    const titleStr = title.join(' ');
    out += `${match[1]} ${titleStr}\n\n`;

    const consumedLen = words.slice(0, title.length).join(' ').length;
    cursor = headingRe.lastIndex + rest.indexOf(titleStr) + consumedLen;
    headingRe.lastIndex = cursor;
  }
  out += text.slice(cursor).trim();
  text = out;

  // 3) "Note: ..." -> blockquote
  text = text.replace(/\sNote:\s/g, '\n\n> **Note:** ');

  // 4) Table row boundaries: "...cell | |---|---| | next row..." -> newline
  // between rows (rows get glued back-to-back as "| |" when flattened).
  text = text.replace(/\|\s\|/g, '|\n|');

  // 5) Bullet list items: " - Foo - Bar" -> "\n- Foo\n- Bar"
  text = text.replace(/\s-\s/g, '\n- ');

  // 6) Restore the protected code blocks as real fenced blocks.
  text = text.replace(/\u0000CODEBLOCK(\d+)\u0000/g, (_, i) => {
    return `\n\n\`\`\`html\n${codeBlocks[Number(i)]}\n\`\`\`\n\n`;
  });

  return text.replace(/\n{3,}/g, '\n\n').trim();
}

function Code({ children }) {
  return (
    <code className="bg-slate-100 text-pink-600 text-[13px] px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

function ExampleCard({ children }) {
  return (
    <div className="bg-slate-100 rounded-md p-5 my-6">
      <p className="text-[15px] font-bold text-slate-700 mb-3">Example</p>
      {/* text-blue-700 matches W3Schools' code-sample color used in the mockup */}
      <pre className="bg-white rounded-sm p-4 font-mono text-[13px] leading-6 overflow-x-auto text-blue-700">
        {children}
      </pre>
      <button
        type="button"
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-sm"
      >
        Try it Yourself »
      </button>
    </div>
  );
}

/**
 * Browser-chrome mockup, matching the "Web Browsers" section of the mockup.
 * Usage in content_md:
 *
 * ```browser-preview
 * index.htm
 * file:///C:/Users/myuser/Desktop/index.htm
 * ---
 * # My First Heading
 * My first paragraph.
 * ```
 * (first line = tab title, second line = address bar, everything after the
 * `---` separator is rendered inside the mock page: a leading `#` line
 * becomes the bold heading, the rest are paragraph lines)
 */
function BrowserMock({ tabTitle, addressBar, heading, paragraphs }) {
  return (
    <div className="border border-slate-300 rounded-md overflow-hidden my-4 max-w-md">
      <div className="bg-slate-100 border-b border-slate-300 px-3 py-1.5 flex items-center gap-2">
        <span className="text-[11px] text-slate-600">{tabTitle}</span>
        <span className="ml-auto text-slate-400 text-[11px]">— ▢ ✕</span>
      </div>
      <div className="bg-slate-50 border-b border-slate-300 px-3 py-1.5 flex items-center gap-2 text-[10px] text-slate-500">
        <span>‹</span>
        <span>›</span>
        <span>⟳</span>
        <span className="flex-1 bg-white border border-slate-300 rounded-sm px-2 py-0.5 truncate">
          {addressBar}
        </span>
      </div>
      <div className="p-4 bg-white">
        {heading && <p className="text-[18px] font-bold text-slate-900">{heading}</p>}
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[13px] text-slate-700 mt-1">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function StructureBox({ children, className = '' }) {
  return (
    <div
      className={`border border-slate-300 rounded-sm bg-white px-3 py-2 text-[13px] font-mono text-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Nested-box "HTML Page Structure" diagram from the mockup.
 * `head` and `body` are arrays of raw tag strings, e.g.
 * head: ["<title>Page title</title>"]
 * body: ["<h1>This is a heading</h1>", "<p>This is a paragraph.</p>"]
 */
function PageStructureDiagram({ head = [], body = [] }) {
  return (
    <div className="bg-slate-100 rounded-md p-4 my-4">
      <div className="border-2 border-slate-300 rounded-sm bg-slate-50 p-3">
        <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;html&gt;</p>

        <div className="border-2 border-slate-300 rounded-sm bg-slate-100 p-3 mb-3">
          <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;head&gt;</p>
          <div className="space-y-2 mb-2">
            {head.map((line, i) => (
              <StructureBox key={i}>{line}</StructureBox>
            ))}
          </div>
          <p className="font-mono text-[13px] text-slate-700">&lt;/head&gt;</p>
        </div>

        <div className="border-2 border-slate-300 rounded-sm bg-slate-100 p-3 mb-2">
          <p className="font-mono text-[13px] text-slate-700 mb-2">&lt;body&gt;</p>
          <div className="border-2 border-slate-300 rounded-sm bg-white p-3 space-y-2">
            {body.map((line, i) => (
              <StructureBox key={i}>{line}</StructureBox>
            ))}
          </div>
          <p className="font-mono text-[13px] text-slate-700 mt-2">&lt;/body&gt;</p>
        </div>

        <p className="font-mono text-[13px] text-slate-700">&lt;/html&gt;</p>
      </div>
    </div>
  );
}

/** Parses the mini-DSL used inside ```browser-preview fenced blocks. */
function parseBrowserPreview(raw) {
  const [meta, page = ''] = raw.split(/\n-{3,}\n/);
  const [tabTitle = 'index.htm', addressBar = ''] = meta.split('\n').map((s) => s.trim());
  const lines = page
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const heading = lines[0]?.startsWith('#') ? lines[0].replace(/^#\s*/, '') : null;
  const paragraphs = heading ? lines.slice(1) : lines;
  return { tabTitle, addressBar, heading, paragraphs };
}

/** Parses the mini-DSL used inside ```page-structure fenced blocks. */
function parsePageStructure(raw) {
  const [headPart = '', bodyPart = ''] = raw.split(/\n-{3,}\n/);
  const toLines = (s) =>
    s
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
  return { head: toLines(headPart), body: toLines(bodyPart) };
}

/** Video block, only rendered when the lesson actually has a video. */
function LessonVideo({ title, embedUrl }) {
  return (
    <div className="bg-[#0f1420] rounded-md p-6 text-center my-8">
      <p className="text-white text-[15px] font-semibold mb-4">Video: {title}</p>
      {embedUrl ? (
        <div className="rounded-md overflow-hidden aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="bg-slate-800 rounded-md h-40 flex items-center justify-center">
          <span className="text-white text-3xl">▶</span>
        </div>
      )}
    </div>
  );
}

function NoteBox({ children }) {
  return (
    <div className="bg-yellow-100 rounded-md px-5 py-4 text-[14px] text-slate-800 my-6">
      {children}
    </div>
  );
}

const markdownComponents = {
  h2: ({ children }) => (
    <h2 className="text-[24px] font-bold text-slate-900 mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="text-[20px] font-bold text-slate-900 mt-7 mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-[18px] font-bold text-slate-900 mt-6 mb-2">{children}</h4>,
  h5: ({ children }) => <h5 className="text-[16px] font-bold text-slate-900 mt-5 mb-2">{children}</h5>,
  p: ({ children }) => <p className="text-[15px] text-slate-700 leading-relaxed my-3">{children}</p>,
  a: ({ children, href }) => (
    <a href={href} className="text-emerald-600 underline hover:text-emerald-700" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 text-[15px] text-slate-700 space-y-1 my-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 text-[15px] text-slate-700 space-y-1 my-3">{children}</ol>
  ),
  blockquote: ({ children }) => <NoteBox>{children}</NoteBox>,
  // `pre` normally wraps every fenced code block in the "Example" card, but a
  // couple of languages are actually custom diagrams, not runnable code —
  // intercept those here before they hit ExampleCard.
  pre: ({ children }) => {
    const codeEl = Array.isArray(children) ? children[0] : children;
    const className = codeEl?.props?.className || '';
    const rawChildren = codeEl?.props?.children;
    const text = Array.isArray(rawChildren) ? rawChildren.join('') : String(rawChildren || '');

    if (className.includes('language-browser-preview')) {
      return <BrowserMock {...parseBrowserPreview(text)} />;
    }
    if (className.includes('language-page-structure')) {
      return <PageStructureDiagram {...parsePageStructure(text)} />;
    }
    return <ExampleCard>{children}</ExampleCard>;
  },
  code: ({ className, children }) => {
    const text = Array.isArray(children) ? children.join('') : String(children || '');
    if (className || text.includes('\n')) {
      return <code className={`${className || ''} text-slate-800`}>{children}</code>;
    }
    return <Code>{children}</Code>;
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-[14px] text-left border-t border-slate-200">{children}</table>
    </div>
  ),
  tr: ({ children }) => <tr className="border-b border-slate-100 odd:bg-slate-50">{children}</tr>,
  th: ({ children }) => <th className="py-2 pr-4 font-semibold">{children}</th>,
  td: ({ children }) => <td className="py-2 pr-4 text-slate-700">{children}</td>,
  hr: () => <hr className="my-6 border-slate-200" />,
};

function NextPrevBar({ slug, prev, next, index, total, label }) {
  const prevBtn = prev ? (
    <Link
      to={`/learn/${slug}/${prev.slug}`}
      className="flex items-center gap-1 border border-slate-300 rounded-sm px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50"
    >
      ‹ Previous
    </Link>
  ) : (
    <span className="w-24" />
  );

  const mid = label ? (
    <span className="border border-slate-300 rounded-sm px-4 py-2 text-[13px] text-slate-500">
      {label}
    </span>
  ) : (
    <span className="text-[13px] text-slate-500">
      {index + 1} / {total}
    </span>
  );

  const nextBtn = next ? (
    <Link
      to={`/learn/${slug}/${next.slug}`}
      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm px-5 py-2 text-[14px] font-semibold"
    >
      Next ›
    </Link>
  ) : (
    <span className="w-24" />
  );

  return (
    <div className="flex items-center justify-between">
      {prevBtn}
      {mid}
      {nextBtn}
    </div>
  );
}

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

  const contentMd = useMemo(
    () => normalizeFlattenedMarkdown(lesson?.content_md),
    [lesson?.content_md]
  );

  const sidebarItems = useMemo(() => {
    if (loading) return [];
    if (!lessons.length) {
      return slug === 'html'
        ? null
        : [{ type: 'group', label: `${name} Tutorial` }];
    }
    return buildSidebarItems({ lessons, slug, name, quizzes, exercises, references, lessonSlug });
  }, [lessons, slug, name, quizzes, exercises, references, loading, lessonSlug]);

  return (
    <div className="font-sans text-[#1a2233] bg-white min-h-screen">
      <Navbar
        links={TOP_NAV}
        activeTopic={name.toUpperCase()}
        containerClassName="px-6 h-14"
        logoClassName="h-5 w-auto"
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
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-[32px] font-bold text-slate-900">{lesson.title}</h1>
                <button type="button" className="text-emerald-600 text-xl cursor-pointer" aria-label="Bookmark">
                  🔖
                </button>
              </div>

              <div className="mb-8">
                <NextPrevBar slug={slug} prev={prev} next={next} index={index} total={lessons.length} />
              </div>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {contentMd || 'Konten sedang disiapkan.'}
              </ReactMarkdown>

              {lesson.video_title && (
                <LessonVideo title={lesson.video_title} embedUrl={lesson.video_embed_url} />
              )}

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

              <div className="mt-12 pt-6 border-t border-slate-200">
                <NextPrevBar
                  slug={slug}
                  prev={prev}
                  next={next}
                  index={index}
                  total={lessons.length}
                  label="Sign in to track progress"
                />
              </div>
            </>
          )}
        </main>
      </div>

      <TutorialFooter />
    </div>
  );
}