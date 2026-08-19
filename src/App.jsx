import { Routes, Route } from 'react-router-dom';
import LearnHomePage from './pages/LearnHomePage/index.jsx';
import HtmlTutorialPage from './pages/HtmlTutorialPage/index.jsx';
import LessonPage from './pages/LessonPage/index.jsx';
import HtmlExamplesPage from './pages/HtmlExamplesPage/index.jsx';
import HtmlExercisesPage from './pages/HtmlExercisesPage/index.jsx';
import HtmlQuizPage from './pages/HtmlQuizPage/index.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LearnHomePage />} />
      <Route path="/learn/:slug" element={<HtmlTutorialPage />} />
      <Route path="/learn/:slug/home" element={<HtmlTutorialPage />} />
      <Route path="/learn/:slug/:lessonSlug" element={<LessonPage />} />
      <Route path="/learn/:slug/examples" element={<HtmlExamplesPage />} />
      <Route path="/learn/:slug/exercises" element={<HtmlExercisesPage />} />
      <Route path="/learn/:slug/quiz" element={<HtmlQuizPage />} />
    </Routes>
  );
}