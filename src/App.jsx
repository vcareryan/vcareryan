import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import './i18n';

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LanguageSelectPage from './pages/LanguageSelectPage';
import SyllabusSelectPage from './pages/SyllabusSelectPage';
import ClassSelectPage from './pages/ClassSelectPage';
import LessonListPage from './pages/LessonListPage';
import LessonDetailPage from './pages/LessonDetailPage';
import ParentDashboard from './pages/ParentDashboard';
import AdminPanel from './pages/AdminPanel';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/select-language" element={<LanguageSelectPage />} />
          <Route path="/select-syllabus" element={<SyllabusSelectPage />} />
          <Route path="/select-class" element={<ClassSelectPage />} />
          <Route path="/lessons" element={<LessonListPage />} />
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
