import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

export default function SyllabusSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { syllabus, setSyllabus } = useApp();

  const boards = [
    { id: 'cbse', name: 'CBSE', desc: 'Central Board of Secondary Education', icon: '📚', color: 'border-blue-500 bg-blue-50' },
    { id: 'state', name: 'State Board', desc: 'Kerala / Tamil Nadu / Karnataka', icon: '📖', color: 'border-green-500 bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate('/select-language')} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
          <ArrowLeft className="w-5 h-5" /> <span>{t('back')}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('selectSyllabus')}</h1>
            <p className="text-gray-500 mt-1">Pick your education board</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setSyllabus(board.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition ${
                  syllabus === board.id
                    ? board.color
                    : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-4xl">{board.icon}</span>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900 text-xl">{board.name}</p>
                  <p className="text-sm text-gray-500">{board.desc}</p>
                </div>
                {syllabus === board.id && (
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
            onClick={() => navigate('/select-class')}
            disabled={!syllabus}
            className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('continue')} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
