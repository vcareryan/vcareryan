import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { parentData } from '../data/mockData';
import { ArrowLeft, BookOpen, Clock, Award, BarChart3, TrendingUp, CheckCircle, XCircle, User } from 'lucide-react';

export default function ParentDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useApp();
  const child = parentData.children[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => { logout(); navigate('/'); }} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg">{t('parentDashboard')}</h1>
              <p className="text-purple-100 text-sm">Monitor your child's progress</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {t('logout')}
          </button>
        </div>

        {/* Child Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold">{child.name}</h2>
              <p className="text-purple-100 text-sm">Class {child.class} • {child.syllabus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-xs text-gray-500">{t('completionRate')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{child.completionRate}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-xs text-gray-500">{t('totalWatchTime')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{child.totalWatchTime}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-orange-500" />
              <span className="text-xs text-gray-500">{t('quizzesCompleted')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{child.quizzesCompleted}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="text-xs text-gray-500">Current Lesson</span>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{child.currentLesson}</p>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Weekly Activity (minutes)
          </h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {child.weeklyActivity.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-indigo-100 rounded-t-lg relative overflow-hidden"
                  style={{ height: `${(day.minutes / 100) * 100}%`, minHeight: '8px' }}
                >
                  <div className="absolute inset-0 bg-indigo-500 rounded-t-lg" style={{ height: `${(day.minutes / 100) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 font-medium">{day.day}</span>
                <span className="text-xs text-gray-400">{day.minutes}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            {t('quizScores')} - Recent
          </h3>
          <div className="space-y-3">
            {child.recentQuizzes.map((quiz, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {quiz.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{quiz.lesson}</p>
                    <p className="text-xs text-gray-500">{quiz.section} • {quiz.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${quiz.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {quiz.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            Lesson Progress
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Basic Fundamentals', progress: 100 },
              { name: 'Number Systems', progress: 50 },
              { name: 'Intro to Algebra', progress: 0 },
              { name: 'Geometry Basics', progress: 0 },
            ].map((lesson, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{lesson.name}</span>
                  <span className="text-gray-500">{lesson.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      lesson.progress === 100 ? 'bg-green-500' : lesson.progress > 0 ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
