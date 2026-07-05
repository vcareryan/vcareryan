import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { quizQuestions } from '../data/mockData';
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertTriangle } from 'lucide-react';

export default function QuizComponent({ onComplete, sectionTitle }) {
  const { t } = useTranslation();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Use a subset of questions for this quiz
  const questions = quizQuestions.slice(0, 5);

  const handleAnswer = (optionIdx) => {
    setAnswers(prev => ({ ...prev, [currentQ]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate score
      let correct = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) correct++;
      });
      const percentage = (correct / questions.length) * 100;
      setScore(percentage);
      setShowResult(true);
      setAttempts(prev => prev + 1);
      if (percentage >= 90) {
        onComplete?.();
      }
    }
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const passed = score >= 90;
    return (
      <div className="p-6 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
          passed ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {passed ? (
            <Trophy className="w-10 h-10 text-green-600" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-red-500" />
          )}
        </div>

        <h2 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? t('quizPassed') : t('quizFailed')}
        </h2>

        <div className="bg-gray-50 rounded-xl p-4 mb-4 inline-block">
          <p className="text-gray-500 text-sm">{t('score')}</p>
          <p className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {score}%
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          {t('passThreshold')} • Attempt #{attempts}
        </p>

        {passed ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-green-700 font-medium">Section unlocked! Next section is now available.</p>
          </div>
        ) : (
          <div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-red-700 font-medium">You need 90% to pass. Review and try again!</p>
            </div>
            <button
              onClick={handleRetake}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> {t('retakeQuiz')}
            </button>
          </div>
        )}
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="p-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
          {sectionTitle}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{question.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition ${
              answers[currentQ] === idx
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                answers[currentQ] === idx
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={`font-medium ${answers[currentQ] === idx ? 'text-indigo-700' : 'text-gray-700'}`}>
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={answers[currentQ] === undefined}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentQ === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
      </button>
    </div>
  );
}
