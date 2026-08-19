import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { TOP_NAV, LANG_TABS, SIDEBAR_ITEMS } from '../../data/htmlTutorial';
import { fetchTrack } from '../../lib/api';
import LangTabs from '../HtmlTutorialPage/LangTabs';
import TutorialFooter from '../HtmlTutorialPage/TutorialFooter';
import TutorialSidebar from '../HtmlTutorialPage/TutorialSidebar';
import NextPrevBar from './NextPrevBar';
import RightRail from './RightRail';

function titleCase(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function QuestionItem({ q, index, answer, onAnswer }) {
  return (
    <div className="border border-slate-200 rounded-md p-4 mb-4">
      <p className="text-[14px] font-semibold text-slate-900 mb-3">
        {index + 1}. {q.question}
      </p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          let cls = 'border-slate-300 hover:bg-slate-50';
          if (answer !== undefined) {
            if (i === q.answer_index) cls = 'border-green-500 bg-green-50 text-green-900';
            else if (i === answer) cls = 'border-red-400 bg-red-50 text-red-800';
            else cls = 'border-slate-200 text-slate-400';
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => onAnswer(i)}
              className={`text-left text-[13px] border rounded-sm px-3 py-2 transition-colors ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answer !== undefined && q.explanation && (
        <p className="text-[12px] text-slate-500 mt-2">{q.explanation}</p>
      )}
    </div>
  );
}

export default function HtmlQuizPage() {
  const { slug = 'html' } = useParams();
  const [name, setName] = useState(titleCase(slug));
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetchTrack(slug)
      .then((data) => {
        if (cancelled) return;
        setName(data.track?.name || titleCase(slug));
        setLessons(data.lessons || []);
        setQuizzes(data.quizzes || []);
        setAnswers({});
        setStarted(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[QuizPage] fallback ke data statis:', err);
        setLessons([]);
        setQuizzes([]);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const count = quizzes.length;
  const answered = Object.keys(answers).length;
  const score = quizzes.reduce(
    (s, q) => s + (answers[q.id] === q.answer_index ? 1 : 0),
    0
  );
  const finished = started && answered > 0 && answered === count;
  const sidebarItems = useMemo(
    () => (lessons.length ? lessons.map((l) => ({ label: l.title })) : SIDEBAR_ITEMS),
    [lessons]
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar
        links={TOP_NAV}
        containerClassName="px-6 h-14"
        logoClassName="text-xl"
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
              className="bg-emerald-500 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
            >
              Sign In
            </button>
          </>
        }
      />
      <LangTabs tabs={LANG_TABS} />

      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6">
        <aside className="w-full lg:w-64 shrink-0">
          <TutorialSidebar
            items={sidebarItems}
            title={`${name.toUpperCase()} TUTORIAL`}
            activeLabel={`${name} Quiz`}
          />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[34px] font-bold text-slate-900">{name} Quiz</h1>
            <span className="text-green-600 text-xl cursor-pointer">🔖</span>
          </div>

          <div className="mb-6">
            <NextPrevBar />
          </div>

          <p className="text-[15px] text-slate-700 mb-6">
            You can test your {name} skills with DevAcademy's Quiz.
          </p>

          <h2 className="text-[24px] font-bold text-slate-900 mb-2">The Test</h2>
          <p className="text-[15px] text-slate-700 mb-2">
            The test contains {count || '40'} questions and there is no time limit.
          </p>
          <p className="text-[15px] text-slate-700 mb-6">
            The test is not official, it's just a nice way to see how much you know, or don't
            know, about {name}.
          </p>

          <h2 className="text-[24px] font-bold text-slate-900 mb-2">Count Your Score</h2>
          <p className="text-[15px] text-slate-700 mb-6">
            You will get 1 point for each correct answer. At the end of the Quiz, your total
            score will be displayed. Maximum score is {count || '40'} points.
          </p>

          {!count && (
            <div className="bg-amber-50 border-l-4 border-amber-300 rounded-r-md px-5 py-4 text-[14px] text-slate-700 mb-6">
              Quiz untuk {name} belum tersedia — segera hadir.
            </div>
          )}

          {count > 0 && !started && (
            <div className="bg-slate-100 rounded-md p-6 mb-6">
              <h3 className="text-[22px] font-bold text-slate-900 mb-1">Start the Quiz</h3>
              <p className="text-[15px] text-slate-700 mb-4">
                {count} questions. Good luck!
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-semibold px-4 py-2.5 rounded-sm"
              >
                Start the {name} Quiz ›
              </button>
            </div>
          )}

          {count > 0 && started && (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] text-slate-500">
                  {answered}/{count} answered
                </span>
                <span className="text-[13px] font-semibold text-slate-700">
                  Score: {score}/{count}
                </span>
              </div>
              {quizzes.map((q, i) => (
                <QuestionItem
                  key={q.id}
                  q={q}
                  index={i}
                  answer={answers[q.id]}
                  onAnswer={(idx) => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                />
              ))}
              {finished && (
                <div className="bg-green-50 border border-green-200 rounded-md p-5 text-center mb-6">
                  <p className="text-[18px] font-bold text-green-800">
                    Quiz finished! You scored {score}/{count}
                  </p>
                  <p className="text-[13px] text-green-700 mt-1">
                    {score === count
                      ? 'Perfect score — Quiz Master!'
                      : score >= count * 0.7
                        ? 'Great job, keep it up!'
                        : 'Review the material and try again.'}
                  </p>
                </div>
              )}
            </>
          )}

          <div className="bg-yellow-100 rounded-md px-5 py-4 text-[14px] text-slate-800 mb-8">
            If you don't know {name}, we suggest that you read our{' '}
            <span className="underline">{name} Tutorial</span> from scratch.
          </div>

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
                <p className="text-[8px] text-slate-500 mb-2">This certifies that</p>
                <p className="text-[11px] font-semibold mb-2">Your Name</p>
                <p className="text-[9px] text-slate-500">Certified {name} Developer</p>
              </div>
            </div>
          </div>

          <p className="text-center text-blue-600 text-[13px] mb-4 cursor-pointer">REMOVE ADS</p>

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

        <RightRail />
      </div>

      <TutorialFooter />
    </div>
  );
}