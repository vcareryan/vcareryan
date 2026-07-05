import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { lessons } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';
import QuizComponent from '../components/QuizComponent';
import { ArrowLeft, Lock, CheckCircle, PlayCircle, FileText, HelpCircle } from 'lucide-react';

export default function LessonDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [activeSection, setActiveSection] = useState(null);
  const [sectionStates, setSectionStates] = useState({});

  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return <div className="p-4">Lesson not found</div>;
  if (!lesson.isFree) {
    navigate('/lessons');
    return null;
  }

  const getSectionIcon = (section, idx) => {
    const state = sectionStates[section.id] || section.status;
    if (state === 'completed') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (state === 'in_progress' || activeSection === idx) return <PlayCircle className="w-5 h-5 text-indigo-500" />;
    if (state === 'locked') return <Lock className="w-5 h-5 text-gray-300" />;
    return <PlayCircle className="w-5 h-5 text-gray-400" />;
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'video_quiz': return <HelpCircle className="w-4 h-4" />;
      case 'text_quiz': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      default: return <PlayCircle className="w-4 h-4" />;
    }
  };

  const isUnlocked = (idx) => {
    if (idx === 0) return true;
    const prevSection = lesson.sections[idx - 1];
    const prevState = sectionStates[prevSection.id] || prevSection.status;
    return prevState === 'completed';
  };

  const handleSectionComplete = (sectionId) => {
    setSectionStates(prev => ({ ...prev, [sectionId]: 'completed' }));
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/lessons')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-lg leading-tight">{lesson.title}</h1>
            <p className="text-sm text-gray-500">{lesson.completedSections}/{lesson.totalSections} sections completed</p>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-500 rounded-full h-2 transition-all" 
            style={{ width: `${(lesson.completedSections / lesson.totalSections) * 100}%` }} 
          />
        </div>
      </div>

      {/* Active Content Area */}
      {activeSection !== null && (
        <div className="bg-white border-b border-gray-200">
          {lesson.sections[activeSection].contentType === 'quiz' || 
           lesson.sections[activeSection].contentType === 'video_quiz' ||
           lesson.sections[activeSection].contentType === 'text_quiz' ? (
            <div className="p-4">
              {lesson.sections[activeSection].contentType === 'text_quiz' && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📝 Study Notes</h3>
                  <p className="text-blue-800 text-sm">
                    Key points for this section: Numbers can be classified into natural numbers, 
                    whole numbers, integers, rational numbers, and irrational numbers. 
                    Each set builds upon the previous one.
                  </p>
                </div>
              )}
              <QuizComponent 
                onComplete={() => handleSectionComplete(lesson.sections[activeSection].id)}
                sectionTitle={lesson.sections[activeSection].title}
              />
            </div>
          ) : (
            <div>
              <VideoPlayer 
                onComplete={() => handleSectionComplete(lesson.sections[activeSection].id)}
                title={lesson.sections[activeSection].title}
              />
            </div>
          )}
        </div>
      )}

      {/* Section List */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Lesson Sections</h2>
        <div className="space-y-2">
          {lesson.sections.map((section, idx) => {
            const unlocked = isUnlocked(idx);
            const state = sectionStates[section.id] || section.status;
            const isActive = activeSection === idx;

            return (
              <button
                key={section.id}
                onClick={() => unlocked && state !== 'completed' && setActiveSection(idx)}
                disabled={!unlocked || state === 'completed'}
                className={`w-full text-left p-4 rounded-xl border-2 transition ${
                  isActive ? 'border-indigo-500 bg-indigo-50 shadow-md' :
                  state === 'completed' ? 'border-green-200 bg-green-50' :
                  unlocked ? 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50' :
                  'border-gray-100 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-indigo-100' :
                    state === 'completed' ? 'bg-green-100' :
                    unlocked ? 'bg-gray-100' : 'bg-gray-100'
                  }`}>
                    {getSectionIcon(section, idx)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">#{idx + 1}</span>
                      <h3 className={`font-medium ${
                        !unlocked ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs flex items-center gap-1 ${
                        !unlocked ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {getContentIcon(section.contentType)}
                        {section.contentType === 'video' ? 'Video' : 
                         section.contentType === 'quiz' ? 'Quiz' :
                         section.contentType === 'video_quiz' ? 'Video + Quiz' :
                         'Text + Quiz'}
                      </span>
                      {state === 'completed' && (
                        <span className="text-xs text-green-600 font-medium">✓ Done</span>
                      )}
                      {isActive && (
                        <span className="text-xs text-indigo-600 font-medium animate-pulse">● Playing</span>
                      )}
                    </div>
                  </div>
                  {!unlocked && <Lock className="w-4 h-4 text-gray-300" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
