import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Bookmark, ArrowLeft, ArrowRight, Play, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import {
  TOP_NAV,
  LANG_TABS,
  SIDEBAR_ITEMS,
  REFERENCE_LINKS,
  PROGRESS_FEATURES,
  EXAMPLE_CODE,
} from '../../data/htmlTutorial';
import { fetchTrack } from '../../lib/api';
import { buildSidebarItems } from '../../lib/sidebar';
import LangTabs from './LangTabs';
import TutorialSidebar from './TutorialSidebar';
import AdCard from './AdCard';
import VideoAdCard from './VideoAdCard';
import TutorialFooter from './TutorialFooter';

function titleCase(slug) {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractFirstCodeBlock(md) {
  const m = (md || '').match(/```(?:\w+)?\s*\n([\s\S]*?)\n```/);
  return m ? m[1].split('\n') : null;
}

function exampleLines(lesson) {
  if (!lesson) return null;
  const ec = lesson.example_code;
  if (Array.isArray(ec)) return ec;
  if (typeof ec === 'string' && ec.trim()) {
    try {
      const parsed = JSON.parse(ec);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // bukan JSON -> lanjut
    }
  }
  return extractFirstCodeBlock(lesson.content_md);
}

const FALLBACK_EXAMPLE = {
  html: EXAMPLE_CODE,
  css: ['body {', '  background-color: lightblue;', '}'],
  javascript: ['console.log("Hello, World!");'],
  python: ['print("Hello, World!")'],
  sql: ['SELECT * FROM customers;'],
  java: ['public class Main {', '  public static void main(String[] args) {', '    System.out.println("Hello World");', '  }', '}'],
  php: ['<?php', 'echo "Hello World!";', '?>'],
};

export default function HtmlTutorialPage() {
  const { slug = 'html' } = useParams();
  const fallbackName = useMemo(() => titleCase(slug), [slug]);
  const [track, setTrack] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = track?.name || fallbackName;
  const tagline = track?.tagline || `The language for ${slug}`;

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
        console.warn('[TutorialPage] fallback ke data statis:', err);
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

  const sidebarItems = useMemo(() => {
    if (loading) return [];
    if (!lessons.length) {
      return slug === 'html'
        ? SIDEBAR_ITEMS
        : [{ type: 'group', label: `${name} Tutorial` }];
    }
    return buildSidebarItems({ lessons, slug, name, quizzes, exercises, references, homeActive: true });
  }, [lessons, slug, name, quizzes, exercises, references, loading]);

  const example = useMemo(() => {
    const withCode = lessons.find((l) => exampleLines(l));
    return withCode ? exampleLines(withCode) : null;
  }, [lessons]);

  const exampleCode = example || FALLBACK_EXAMPLE[slug] || EXAMPLE_CODE;
  const refLinks = references.length
    ? references.map((r) => r.title)
    : slug === 'html'
      ? REFERENCE_LINKS
      : [];
  const firstExercise = exercises.length ? exercises[0].exercises[0] : null;

  return (
    <div className="font-sans text-[#1a2233] bg-white min-h-screen">
      <Navbar
        links={TOP_NAV}
        activeTopic={name.toUpperCase()}
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

      {/* 2-COLUMN LAYOUT: sidebar LEFT, main content right */}
      <div className="flex flex-col lg:flex-row gap-8 px-6 py-8">
        {/* LEFT SIDEBAR (chapter nav) */}
        <aside className="w-full lg:w-64 shrink-0 order-1">
          <div className="lg:sticky lg:top-[72px] flex flex-col gap-6">
            <TutorialSidebar items={sidebarItems} title={`${name.toUpperCase()} TUTORIAL`} loading={loading} />
            {!loading && <AdCard />}
            {!loading && <VideoAdCard />}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 order-2">

          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black">{name} Tutorial</h1>
            <Bookmark size={20} className="text-slate-400" />
          </div>

          {/* two intro cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-emerald-50 rounded-lg p-5">
              <p className="text-emerald-700 font-bold text-sm mb-1">&lt;/&gt; Learn {name}</p>
              <p className="text-sm text-slate-600">{tagline}.</p>
              <p className="text-sm text-slate-600 mt-2">
                With {name} you can build modern web pages and applications.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {name} is easy to learn - You will enjoy it!
              </p>
              <button
                type="button"
                className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-600"
              >
                Learn {name} now »
              </button>
            </div>
            <div className="bg-emerald-50 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <p className="font-bold text-sm mb-1">Become {name} Certified</p>
                <p className="text-sm text-slate-600">
                  Get certified with our {name} exam, includes a professionally
                  curated study kit to guide you from beginner to exam-ready.
                </p>
              </div>
              <button
                type="button"
                className="mt-4 self-start bg-white border border-slate-300 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-50"
              >
                Get Certified »
              </button>
            </div>
          </div>

          {/* progress bar */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-[6%] bg-emerald-500 rounded-full" />
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              Sign in to track your progress
            </span>
          </div>

          {/* learning by examples */}
          <h2 className="text-2xl font-black mt-10">Learning by Examples</h2>
          <p className="text-sm text-slate-600 mt-2">
            With our "Try it Yourself" editor, you can edit the {name} code and
            view the result in the browser.
          </p>

          <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-200">
              Example
            </div>
            <pre className="p-4 text-[13px] font-mono leading-6 text-slate-700 bg-white overflow-x-auto">
              {exampleCode.map((line, i) => (
                <div key={i}>{line || '\u00A0'}</div>
              ))}
            </pre>
            <div className="px-4 pb-4">
              <button
                type="button"
                className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-600"
              >
                Try it Yourself »
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Click on the "Try it Yourself" button to see how it works.
          </p>

          {/* examples */}
          <h2 className="text-2xl font-black mt-10">{name} Examples</h2>
          <p className="text-sm text-slate-600 mt-2">
            This tutorial supplements all explanations with clarifying
            examples.
          </p>
          <Link
            to={`/learn/${slug}/examples`}
            className="mt-3 inline-block bg-slate-100 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-200"
          >
            See all {name} Examples
          </Link>

          {/* exercises */}
          <h2 className="text-2xl font-black mt-10">{name} Exercises</h2>
          <p className="text-sm text-slate-600 mt-2">
            Many chapters in this tutorial end with an exercise where you can
            check your level of knowledge.
          </p>

          <div className="mt-4 bg-[#0f1420] text-white rounded-lg p-6 text-center">
            <p className="text-lg font-bold">Exercise</p>
            <p className="text-sm text-slate-300 mt-2">
              {firstExercise
                ? `Try the ${exercises[0].name} exercises — ${exercises[0].exercises.length} questions to test your ${name} skills.`
                : `Many chapters end with an exercise where you can check your level of ${name} knowledge.`}
            </p>
            <button
              type="button"
              className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600"
            >
              Submit Answer »
            </button>
          </div>
          <Link
            to={`/learn/${slug}/exercises`}
            className="mt-4 inline-block bg-slate-100 text-sm font-semibold px-4 py-2 rounded hover:bg-slate-200"
          >
            See all {name} Exercises
          </Link>

          {/* quiz */}
          <h2 className="text-2xl font-black mt-10">{name} Quiz Test</h2>
          <p className="text-sm text-slate-600 mt-2">
            Test your {name} skills with our {name} Quiz!
          </p>
          <Link
            to={`/learn/${slug}/quiz`}
            className="mt-3 inline-block bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-sky-700"
          >
            Start {name} Quiz!
          </Link>

          {/* track progress */}
          <h2 className="text-2xl font-black mt-10">Track Your Progress</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-md">
            Create a CodeLearn account and get access to more features and
            learning materials:
          </p>
          <ul className="mt-4 space-y-2 max-w-md">
            {PROGRESS_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600"
          >
            Sign Up »
          </button>

          <div className="mt-8 bg-amber-50 border-l-4 border-amber-300 p-4 text-sm text-slate-700">
            <span className="font-semibold">Note: </span>
            This is an optional feature. You can study at CodeLearn without
            creating an account.
          </div>

          {/* references */}
          <h2 className="text-2xl font-black mt-10">{name} References</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            At CodeLearn you will find complete references about {name}
            elements, attributes, events, color names, entities,
            character-sets, URL encoding, language codes, HTTP messages,
            browser support, and more.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {refLinks.map((r) => (
              <div
                key={r}
                className="bg-slate-100 text-sm font-medium text-center py-3 rounded hover:bg-slate-200 cursor-pointer"
              >
                {r}
              </div>
            ))}
          </div>

          {/* certification */}
          <div className="mt-10 flex flex-col md:flex-row items-center gap-6 bg-emerald-50 rounded-lg p-6">
            <div className="flex-1">
              <p className="text-emerald-700 text-xs font-bold mb-1">{name.toUpperCase()} CERTIFICATION</p>
              <h3 className="text-2xl font-black">Get Certified in {name}</h3>
              <p className="text-sm text-slate-600 mt-2">
                Complete the CodeLearn {name} course, strengthen your
                knowledge, and earn a certificate you can add to your CV,
                portfolio, and LinkedIn profile.
              </p>
              <button
                type="button"
                className="mt-4 bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-emerald-600"
              >
                Get Certified Today
              </button>
            </div>
            <div className="w-full md:w-56 h-36 bg-white border border-slate-200 rounded shrink-0" />
          </div>

          {/* video */}
          <div className="mt-10 bg-[#0f1420] rounded-lg p-10 text-center text-white">
            <p className="text-lg font-semibold text-slate-300">Video: {name} for Beginners</p>
            <h3 className="text-4xl font-black mt-4">
              {name}
              <br />for Beginners
            </h3>
            <p className="text-slate-400 mt-2">in just 47 minutes</p>
            <div className="mt-6 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto">
              <Play size={22} className="text-white ml-1" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
            <Link
              to="/"
              className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#1a2233]"
            >
              <ArrowLeft size={14} /> Home
            </Link>
            <span className="text-sm text-slate-500">Sign in to track progress</span>
            <button
              type="button"
              className="flex items-center gap-1 bg-emerald-500 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-emerald-600"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </main>
      </div>

      <TutorialFooter />
    </div>
  );
}