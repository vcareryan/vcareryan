import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { lessons, subjectCategory, FREE_LESSON_LIMIT } from '../data/mockData';
import { BookOpen, Lock, CheckCircle, PlayCircle, ChevronRight, Settings, Home, BarChart3, Crown, ShoppingCart, X, Star, Shield, Zap } from 'lucide-react';

export default function LessonListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, selectedClass, syllabus } = useApp();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const freeLessons = lessons.filter(l => l.isFree);
  const premiumLessons = lessons.filter(l => !l.isFree);

  const getStatusIcon = (lesson) => {
    if (!lesson.isFree) return <Crown className="w-6 h-6 text-amber-500" />;
    switch (lesson.status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in_progress': return <PlayCircle className="w-6 h-6 text-indigo-500" />;
      case 'locked': return <Lock className="w-6 h-6 text-gray-300" />;
      default: return <Lock className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStatusBg = (lesson) => {
    if (!lesson.isFree) return 'bg-amber-50 border-amber-200';
    switch (lesson.status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in_progress': return 'bg-indigo-50 border-indigo-200';
      case 'locked': return 'bg-gray-50 border-gray-200 opacity-60';
      default: return 'bg-gray-50 border-gray-200 opacity-60';
    }
  };

  const handleLessonClick = (lesson) => {
    if (!lesson.isFree) {
      setShowPurchaseModal(true);
      return;
    }
    if (lesson.status !== 'locked') {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const completedCount = freeLessons.filter(l => l.status === 'completed').length;
  const totalFree = freeLessons.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg text-white p-4 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-100 text-sm">{t('welcome')},</p>
            <h1 className="text-xl font-bold">{user?.name || 'Student'}</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">{syllabus === 'cbse' ? 'CBSE' : 'State'}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Class {selectedClass || subjectCategory.class}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">{subjectCategory.subject}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white/20 rounded-full h-3">
          <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${(completedCount / totalFree) * 100}%` }} />
        </div>
        <p className="text-indigo-100 text-sm mt-2">{completedCount} of {totalFree} free lessons completed</p>
      </div>

      {/* Subject Category Header */}
      <div className="px-4 -mt-4 mb-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{subjectCategory.title}</h2>
              <p className="text-sm text-gray-500">{subjectCategory.board} Class {subjectCategory.class} • {subjectCategory.subject} • {lessons.length} Lessons</p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                {FREE_LESSON_LIMIT} Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Free Lessons Section */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Free Lessons</span>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-green-600 font-medium">Open Access</span>
        </div>
        <div className="space-y-3 mb-6">
          {freeLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              disabled={lesson.status === 'locked'}
              className={`w-full text-left p-4 rounded-xl border-2 ${getStatusBg(lesson)} transition hover:shadow-md disabled:hover:shadow-none`}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    lesson.status === 'completed' ? 'bg-green-100' :
                    lesson.status === 'in_progress' ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {getStatusIcon(lesson)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {lesson.title}
                  </h3>
                  <p className={`text-sm mt-0.5 ${lesson.status === 'locked' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      lesson.status === 'completed' ? 'bg-green-100 text-green-700' :
                      lesson.status === 'in_progress' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {lesson.status === 'completed' ? t('completed') :
                       lesson.status === 'in_progress' ? t('inProgress') : t('locked')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {lesson.completedSections}/{lesson.totalSections} sections
                    </span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">FREE</span>
                  </div>
                </div>
                {lesson.status !== 'locked' && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Premium Lessons Section */}
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Premium Lessons</span>
          <div className="flex-1 h-px bg-amber-200" />
          <span className="text-xs text-amber-600 font-medium">Purchase Required</span>
        </div>

        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 mb-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold">Unlock All Lessons</h3>
              <p className="text-amber-100 text-sm">Get access to all {premiumLessons.length} premium lessons</p>
            </div>
            <button 
              onClick={() => setShowPurchaseModal(true)}
              className="bg-white text-amber-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-50 transition"
            >
              Upgrade
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {premiumLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={`w-full text-left p-4 rounded-xl border-2 ${getStatusBg(lesson)} transition hover:shadow-md relative overflow-hidden`}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-100">
                    {getStatusIcon(lesson)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">
                    {lesson.title}
                  </h3>
                  <p className="text-sm mt-0.5 text-gray-400">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Premium
                    </span>
                    <span className="text-xs text-gray-400">
                      {lesson.totalSections} sections
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4 z-20">
        <button className="flex flex-col items-center gap-1 text-indigo-600">
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">{t('home')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs">{t('lessons')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs">{t('yourProgress')}</span>
        </button>
        <button onClick={() => navigate('/settings')} className="flex flex-col items-center gap-1 text-gray-400">
          <Settings className="w-5 h-5" />
          <span className="text-xs">{t('settings')}</span>
        </button>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20" />

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-3xl sm:rounded-t-3xl p-6 text-white relative">
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center">
                <Crown className="w-12 h-12 mx-auto mb-3" />
                <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
                <p className="text-amber-100 mt-1">Unlock all lessons and features</p>
              </div>
            </div>

            <div className="p-6">
              {/* Features */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: <BookOpen className="w-5 h-5 text-indigo-500" />, text: `Access all ${premiumLessons.length} premium lessons` },
                  { icon: <Zap className="w-5 h-5 text-amber-500" />, text: 'Unlimited quiz retakes' },
                  { icon: <Star className="w-5 h-5 text-yellow-500" />, text: 'Priority support & updates' },
                  { icon: <Shield className="w-5 h-5 text-green-500" />, text: 'Lifetime access to content' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {feature.icon}
                    <span className="text-sm text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5 mb-4 text-center">
                <p className="text-sm text-gray-500 line-through">₹1,999</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-indigo-600">₹499</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <p className="text-green-600 text-sm font-medium mt-1">Save 75% — Limited Time Offer!</p>
              </div>

              {/* Purchase Button */}
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Purchase Now — ₹499
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Secure payment via UPI / Cards / Net Banking
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
