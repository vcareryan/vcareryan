import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { GraduationCap, ChevronRight, ArrowLeft } from 'lucide-react';

export default function ClassSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedClass, setSelectedClass } = useApp();

  const classes = [5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate('/select-syllabus')} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
          <ArrowLeft className="w-5 h-5" /> <span>{t('back')}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('selectClass')}</h1>
            <p className="text-gray-500 mt-1">Which class are you studying in?</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-3 gap-3">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition ${
                    selectedClass === cls
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-3xl font-bold text-indigo-600">{cls}</span>
                  <span className="text-xs font-medium text-gray-500">{t('class')}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/lessons')}
            disabled={!selectedClass}
            className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('startLesson')} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
