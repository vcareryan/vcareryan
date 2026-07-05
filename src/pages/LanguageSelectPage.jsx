import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Globe, ChevronRight } from 'lucide-react';

const languages = [
  { code: 'ml', name: 'മലയാളം', nameEn: 'Malayalam', flag: '🇮🇳' },
  { code: 'en', name: 'English', nameEn: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi', flag: '🇮🇳' },
];

export default function LanguageSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, changeLanguage } = useApp();

  const handleSelect = (lang) => {
    changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t('selectLanguage')}</h1>
          <p className="text-gray-500 mt-1">Choose your preferred language</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition ${
                language === lang.code
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-lg">{lang.name}</p>
                <p className="text-sm text-gray-500">{lang.nameEn}</p>
              </div>
              {language === lang.code && (
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/select-syllabus')}
          className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          {t('continue')} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
