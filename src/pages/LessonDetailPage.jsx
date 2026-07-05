import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { lessons } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';
import QuizComponent from '../components/QuizComponent';
import { ArrowLeft, Lock, CheckCircle, PlayCircle, FileText, HelpCircle, Video, BookOpen } from 'lucide-react';

export default function LessonDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [activeSection, setActiveSection] = useState(null);
  const [sectionStates, setSectionStates] = useState({});
  // Track what phase the user is in for video+quiz / text+quiz sections
  // 'video' → watching video, 'quiz' → taking quiz, 'video_review' → reviewing video after wrong answer
  const [contentPhase, setContentPhase] = useState('video');

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

  const getContentTypeLabel = (type) => {
    switch (type) {
      case 'video': return { label: 'Video Only', icon: <Video className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' };
      case 'video_quiz': return { label: 'Video + Quiz', icon: <HelpCircle className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50' };
      case 'text_quiz': return { label: 'Text + Quiz', icon: <FileText className="w-4 h-4" />, color: 'text-orange-600 bg-orange-50' };
      case 'quiz': return { label: 'Quiz', icon: <HelpCircle className="w-4 h-4" />, color: 'text-red-600 bg-red-50' };
      default: return { label: 'Video', icon: <PlayCircle className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' };
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
    setContentPhase('video');
  };

  const handleStartSection = (idx) => {
    setActiveSection(idx);
    const section = lesson.sections[idx];
    // Start with video for video-only and video+quiz, start with text for text+quiz
    if (section.contentType === 'text_quiz') {
      setContentPhase('text');
    } else {
      setContentPhase('video');
    }
  };

  // Handle video completion → move to quiz phase (for video+quiz type)
  const handleVideoComplete = () => {
    const section = lesson.sections[activeSection];
    if (section.contentType === 'video') {
      // Video only → section is complete
      handleSectionComplete(section.id);
    } else if (section.contentType === 'video_quiz') {
      // Video + Quiz → now show the quiz
      setContentPhase('quiz');
    }
  };

  // Handle wrong answer → go back to video
  const handleWrongAnswer = () => {
    setContentPhase('video_review');
  };

  // After reviewing video, go back to quiz
  const handleReviewVideoComplete = () => {
    setContentPhase('quiz');
  };

  // Render content based on type and phase
  const renderActiveContent = () => {
    if (activeSection === null) return null;
    const section = lesson.sections[activeSection];

    // --- TYPE 1: VIDEO ONLY ---
    if (section.contentType === 'video') {
      return (
        <div className="bg-white border-b border-gray-200">
          <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Video Only</span>
            <span className="text-xs text-blue-500 ml-auto">Watch to 100% to complete</span>
          </div>
          <VideoPlayer 
            onComplete={handleVideoComplete}
            title={section.title}
            videoId={section.videoId}
          />
        </div>
      );
    }

    // --- TYPE 2: VIDEO + QUIZ ---
    if (section.contentType === 'video_quiz') {
      return (
        <div className="bg-white border-b border-gray-200">
          {/* Phase Indicator */}
          <div className="bg-purple-50 border-b border-purple-100 px-4 py-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Video + Quiz</span>
            <div className="ml-auto flex items-center gap-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                contentPhase === 'video' || contentPhase === 'video_review' ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-700'
              }`}>1</span>
              <div className="w-4 h-0.5 bg-purple-200" />
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                contentPhase === 'quiz' ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-700'
              }`}>2</span>
            </div>
          </div>

          {(contentPhase === 'video') && (
            <div>
              <VideoPlayer 
                onComplete={handleVideoComplete}
                title={`${section.title} — Watch First`}
                videoId={section.videoId}
              />
              <div className="p-3 bg-purple-50 text-center">
                <p className="text-sm text-purple-700 font-medium">📹 Watch the video completely, then take the quiz</p>
              </div>
            </div>
          )}

          {contentPhase === 'video_review' && (
            <div>
              <div className="p-3 bg-amber-50 border-b border-amber-200 text-center">
                <p className="text-sm text-amber-700 font-bold">🔄 Review Mode — Watch again to understand the concept</p>
              </div>
              <VideoPlayer 
                onComplete={handleReviewVideoComplete}
                title={`${section.title} — Review`}
                videoId={section.videoId}
              />
              <div className="p-3 bg-amber-50 text-center">
                <p className="text-sm text-amber-600">After watching, you'll retake the quiz</p>
              </div>
            </div>
          )}

          {contentPhase === 'quiz' && (
            <div>
              <QuizComponent 
                onComplete={() => handleSectionComplete(section.id)}
                onWrongAnswer={handleWrongAnswer}
                sectionTitle={section.title}
              />
            </div>
          )}
        </div>
      );
    }

    // --- TYPE 3: TEXT + QUIZ ---
    if (section.contentType === 'text_quiz') {
      return (
        <div className="bg-white border-b border-gray-200">
          {/* Phase Indicator */}
          <div className="bg-orange-50 border-b border-orange-100 px-4 py-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Text + Quiz</span>
            <div className="ml-auto flex items-center gap-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                contentPhase === 'text' ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-700'
              }`}>1</span>
              <div className="w-4 h-0.5 bg-orange-200" />
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                contentPhase === 'quiz' ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-700'
              }`}>2</span>
            </div>
          </div>

          {(contentPhase === 'text' || contentPhase === 'video_review') && (
            <div className="p-4">
              {contentPhase === 'video_review' && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <p className="text-sm text-amber-700 font-bold">🔄 Review the study material again before retaking the quiz</p>
                </div>
              )}

              {/* Study Material Content */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900 text-lg">📖 Study Material</h3>
                </div>
                <div className="space-y-4 text-gray-800">
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Key Concepts:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>The <strong>Fundamental Theorem of Arithmetic</strong> states that every composite number can be expressed as a product of primes uniquely.</li>
                      <li><strong>Euclid's Division Lemma</strong>: For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r &lt; b.</li>
                      <li>The <strong>HCF</strong> of two numbers is the product of the smallest power of each common prime factor.</li>
                      <li>The <strong>LCM</strong> of two numbers is the product of the greatest power of each prime factor.</li>
                      <li>HCF(a,b) × LCM(a,b) = a × b</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Important Formulas:</h4>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="font-mono text-sm">• If HCF(a,b) = 1, then a and b are co-prime</p>
                      <p className="font-mono text-sm">• √2, √3, √5 are irrational numbers</p>
                      <p className="font-mono text-sm">• p/q form (q≠0) → rational number</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Examples:</h4>
                    <p className="text-sm">Find HCF of 135 and 225:</p>
                    <p className="text-sm ml-4">225 = 135 × 1 + 90</p>
                    <p className="text-sm ml-4">135 = 90 × 1 + 45</p>
                    <p className="text-sm ml-4">90 = 45 × 2 + 0</p>
                    <p className="text-sm ml-4">∴ HCF(135, 225) = <strong>45</strong></p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setContentPhase('quiz')}
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5" /> I'm Ready — Take the Quiz
              </button>
            </div>
          )}

          {contentPhase === 'quiz' && (
            <div>
              <QuizComponent 
                onComplete={() => handleSectionComplete(section.id)}
                onWrongAnswer={() => setContentPhase('video_review')}
                sectionTitle={section.title}
              />
            </div>
          )}
        </div>
      );
    }

    // Fallback: treat as quiz only
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="bg-red-50 border-b border-red-100 px-4 py-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-red-700">Quiz</span>
          <span className="text-xs text-red-500 ml-auto">Score 90% to pass</span>
        </div>
        <QuizComponent 
          onComplete={() => handleSectionComplete(section.id)}
          onWrongAnswer={handleWrongAnswer}
          sectionTitle={section.title}
        />
      </div>
    );
  };

  // Calculate actual completed sections
  const completedSections = lesson.sections.filter(s => 
    (sectionStates[s.id] || s.status) === 'completed'
  ).length;

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
            <p className="text-sm text-gray-500">{completedSections}/{lesson.totalSections} sections completed</p>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-500 rounded-full h-2 transition-all" 
            style={{ width: `${(completedSections / lesson.totalSections) * 100}%` }} 
          />
        </div>
      </div>

      {/* Active Content Area */}
      {renderActiveContent()}

      {/* Section List */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Lesson Contents</h2>
        <div className="space-y-2">
          {lesson.sections.map((section, idx) => {
            const unlocked = isUnlocked(idx);
            const state = sectionStates[section.id] || section.status;
            const isActive = activeSection === idx;
            const typeInfo = getContentTypeLabel(section.contentType);

            return (
              <button
                key={section.id}
                onClick={() => unlocked && state !== 'completed' && handleStartSection(idx)}
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
                      <span className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </span>
                      {state === 'completed' && (
                        <span className="text-xs text-green-600 font-medium">✓ Done</span>
                      )}
                      {isActive && (
                        <span className="text-xs text-indigo-600 font-medium animate-pulse">● Active</span>
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

      {/* Legend */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Content Types</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                <Video className="w-3 h-3" /> Video Only
              </span>
              <span className="text-xs text-gray-500">— Watch to 100% to complete</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                <HelpCircle className="w-3 h-3" /> Video + Quiz
              </span>
              <span className="text-xs text-gray-500">— Watch video, then pass quiz (90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-600">
                <FileText className="w-3 h-3" /> Text + Quiz
              </span>
              <span className="text-xs text-gray-500">— Read material, then pass quiz (90%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
