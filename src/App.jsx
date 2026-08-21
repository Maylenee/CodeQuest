import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import LearnHomePage from './pages/LearnHomePage/index.jsx';
import HtmlTutorialPage from './pages/HtmlTutorialPage/index.jsx';
import LessonPage from './pages/LessonPage/index.jsx';
import HtmlExamplesPage from './pages/HtmlExamplesPage/index.jsx';
import HtmlExercisesPage from './pages/HtmlExercisesPage/index.jsx';
import HtmlQuizPage from './pages/HtmlQuizPage/index.jsx';
import ChatWidget from './components/ChatWidget/index.jsx';
import AccountLayout from './components/AccountLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import MyProgressPage from './pages/dashboard/MyProgressPage';
import LeaguePage from './pages/dashboard/LeaguePage';
import BookmarksPage from './pages/dashboard/BookmarksPage';
import CertificatesPage from './pages/dashboard/CertificatesPage';
import ProfilePage from './pages/dashboard/ProfilePage';

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
        <Route path="/learn/:slug" element={<HtmlTutorialRoute />} />
        <Route path="/learn/:slug/home" element={<HtmlTutorialRoute />} />
        <Route path="/learn/:slug/:lessonSlug" element={<LessonRoute />} />
        <Route path="/learn/:slug/examples" element={<HtmlExamplesRoute />} />
        <Route path="/learn/:slug/exercises" element={<HtmlExercisesRoute />} />
        <Route path="/learn/:slug/quiz" element={<HtmlQuizRoute />} />
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