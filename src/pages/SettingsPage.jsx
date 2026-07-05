import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Globe, BookOpen, GraduationCap, User, LogOut, ChevronRight, Link } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, language, changeLanguage, syllabus, selectedClass, logout } = useApp();

  const langNames = { en: 'English', ml: 'മലയാളം', hi: 'हिन्दी' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/lessons')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg">{t('settings')}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{user?.name || 'Student'}</h2>
              <p className="text-sm text-gray-500">{user?.phone || '+91 98765 43210'}</p>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider p-4 pb-2">{t('language')}</h3>
          <div className="px-4 pb-4 flex gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'ml', label: 'മലയാളം' },
              { code: 'hi', label: 'हिन्दी' },
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition ${
                  language === lang.code ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider p-4 pb-2">Academic</h3>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Syllabus Board</span>
              </div>
              <span className="text-sm font-medium text-indigo-600">{syllabus === 'cbse' ? 'CBSE' : 'State Board'}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Class</span>
              </div>
              <span className="text-sm font-medium text-indigo-600">Class {selectedClass}</span>
            </div>
          </div>
        </div>

        {/* Parent Linking */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider p-4 pb-2">Parent Connection</h3>
          <div className="p-4">
            <button className="w-full flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-indigo-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-indigo-700">Generate Invite Link</p>
                  <p className="text-xs text-indigo-500">Share with parent to link accounts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}
