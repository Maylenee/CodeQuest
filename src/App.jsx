import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import LearnHomePage from './pages/LearnHomePage/index.jsx';
import TutorialPage from './pages/TutorialPage/index.jsx';
import LessonPage from './pages/LessonPage/index.jsx';
import ExamplesPage from './pages/ExamplesPage/index.jsx';
import ExercisesPage from './pages/ExercisesPage/index.jsx';
import QuizPage from './pages/QuizPage/index.jsx';
import ChatWidget from './components/ChatWidget/index.jsx';
import DashboardPage from './pages/dashboard/DashboardPage';
import MyProgressPage from './pages/dashboard/MyProgressPage';
import LeaguePage from './pages/dashboard/LeaguePage';
import BookmarksPage from './pages/dashboard/BookmarksPage';
import CertificatesPage from './pages/dashboard/CertificatesPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import PlaygroundPage from './pages/PlaygroundPage/index.jsx';

function TutorialRoute() {
  const { slug } = useParams();
  return <TutorialPage key={slug} />;
}

function LessonRoute() {
  const { slug, lessonSlug } = useParams();
  return <LessonPage key={`${slug}/${lessonSlug}`} />;
}

function ExamplesRoute() {
  const { slug } = useParams();
  return <ExamplesPage key={slug} />;
}

function ExercisesRoute() {
  const { slug } = useParams();
  return <ExercisesPage key={slug} />;
}

function QuizRoute() {
  const { slug } = useParams();
  return <QuizPage key={slug} />;
}

// Guard: hanya user yang sudah login bisa akses dashboard.
function requireAuth() {
  try {
    return JSON.parse(localStorage.getItem('codelearn_user') || 'null');
  } catch {
    return null;
  }
}

function DashboardRoute({ children }) {
  const user = requireAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LearnHomePage />} />
        <Route path="/learn/:slug" element={<TutorialRoute />} />
        <Route path="/learn/:slug/home" element={<TutorialRoute />} />
        <Route path="/learn/:slug/:lessonSlug" element={<LessonRoute />} />
        <Route path="/learn/:slug/examples" element={<ExamplesRoute />} />
        <Route path="/learn/:slug/exercises" element={<ExercisesRoute />} />
        <Route path="/learn/:slug/quiz" element={<QuizRoute />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/dashboard" element={<DashboardRoute><DashboardPage /></DashboardRoute>} />
        <Route path="/dashboard/progress" element={<DashboardRoute><MyProgressPage /></DashboardRoute>} />
        <Route path="/dashboard/league" element={<DashboardRoute><LeaguePage /></DashboardRoute>} />
        <Route path="/dashboard/bookmarks" element={<DashboardRoute><BookmarksPage /></DashboardRoute>} />
        <Route path="/dashboard/certificates" element={<DashboardRoute><CertificatesPage /></DashboardRoute>} />
        <Route path="/dashboard/profile" element={<DashboardRoute><ProfilePage /></DashboardRoute>} />
      </Routes>
      <ChatWidget />
    </>
  );
}