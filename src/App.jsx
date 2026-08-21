import { Routes, Route, useParams } from 'react-router-dom';
import LearnHomePage from './pages/LearnHomePage/index.jsx';
import HtmlTutorialPage from './pages/HtmlTutorialPage/index.jsx';
import LessonPage from './pages/LessonPage/index.jsx';
import HtmlExamplesPage from './pages/HtmlExamplesPage/index.jsx';
import HtmlExercisesPage from './pages/HtmlExercisesPage/index.jsx';
import HtmlQuizPage from './pages/HtmlQuizPage/index.jsx';
import ChatWidget from './components/ChatWidget/index.jsx';

function HtmlTutorialRoute() {
  const { slug } = useParams();
  return <HtmlTutorialPage key={slug} />;
}

function LessonRoute() {
  const { slug, lessonSlug } = useParams();
  return <LessonPage key={`${slug}/${lessonSlug}`} />;
}

function HtmlExamplesRoute() {
  const { slug } = useParams();
  return <HtmlExamplesPage key={slug} />;
}

function HtmlExercisesRoute() {
  const { slug } = useParams();
  return <HtmlExercisesPage key={slug} />;
}

function HtmlQuizRoute() {
  const { slug } = useParams();
  return <HtmlQuizPage key={slug} />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LearnHomePage />} />
        <Route path="/learn/:slug" element={<HtmlTutorialRoute />} />
        <Route path="/learn/:slug/home" element={<HtmlTutorialRoute />} />
        <Route path="/learn/:slug/:lessonSlug" element={<LessonRoute />} />
        <Route path="/learn/:slug/examples" element={<HtmlExamplesRoute />} />
        <Route path="/learn/:slug/exercises" element={<HtmlExercisesRoute />} />
        <Route path="/learn/:slug/quiz" element={<HtmlQuizRoute />} />
      </Routes>
      <ChatWidget />
    </>
  );
}