import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { quizQuestions } from '../data/mockData';
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertTriangle, PartyPopper, Video, ArrowRight } from 'lucide-react';

export default function QuizComponent({ onComplete, sectionTitle, onWrongAnswer, questions: customQuestions }) {
  const { t } = useTranslation();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerState, setAnswerState] = useState(null); // null, 'correct', 'wrong'
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Use custom questions if provided, otherwise use defaults
  const questions = customQuestions || quizQuestions.slice(0, 5);

  const handleSelectOption = (optionIdx) => {
    if (answerState !== null) return; // prevent changing after submitted
    setSelectedAnswer(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const question = questions[currentQ];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    setTotalAnswered(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (answerState === 'wrong') {
      // Wrong answer → show the video (parent handles this)
      onWrongAnswer?.();
      return;
    }

    // Correct answer → move to next question
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setAnswerState(null);
    } else {
      // Quiz complete
      const score = ((correctCount) / questions.length) * 100;
      setQuizComplete(true);
      setAttempts(prev => prev + 1);
      if (score >= 90) {
        onComplete?.();
      }
    }
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setAnswerState(null);
    setCorrectCount(0);
    setTotalAnswered(0);
    setQuizComplete(false);
  };

  // --- QUIZ COMPLETE SCREEN ---
  if (quizComplete) {
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 90;
    
    return (
      <div className="p-6 text-center">
        {passed ? (
          <>
            {/* CONGRATS - PASSED */}
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Trophy className="w-12 h-12 text-green-600" />
              </div>
              {/* Confetti effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl animate-ping">🎉</div>
            </div>

            <h2 className="text-3xl font-bold text-green-700 mb-2">Congratulations! 🎊</h2>
            <p className="text-green-600 text-lg mb-4">You passed the quiz!</p>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-4">
              <p className="text-gray-500 text-sm mb-1">Your Score</p>
              <p className="text-5xl font-bold text-green-600 mb-2">{score}%</p>
              <p className="text-green-700 font-medium">{correctCount} out of {questions.length} correct</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-700 font-bold text-lg">Section Complete! ✅</p>
              <p className="text-green-600 text-sm mt-1">Next section is now unlocked</p>
            </div>
          </>
        ) : (
          <>
            {/* FAILED */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-red-700 mb-2">Not Quite There!</h2>
            <p className="text-gray-500 text-lg mb-4">You need 90% to pass</p>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-4">
              <p className="text-gray-500 text-sm mb-1">Your Score</p>
              <p className="text-5xl font-bold text-red-600 mb-2">{score}%</p>
              <p className="text-red-700 font-medium">{correctCount} out of {questions.length} correct</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <Video className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-amber-700 font-medium">Watch the video again to review the concepts</p>
              <p className="text-amber-600 text-sm mt-1">Then retake the quiz</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onWrongAnswer?.()}
                className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" /> Watch Video
              </button>
              <button
                onClick={handleRetake}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Retake
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // --- INDIVIDUAL QUESTION VIEW ---
  const question = questions[currentQ];

  return (
    <div className="p-4">
      {/* Progress Header */}
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
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      {/* Score tracker */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          ✓ {correctCount} correct
        </span>
        {totalAnswered - correctCount > 0 && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
            ✗ {totalAnswered - correctCount} wrong
          </span>
        )}
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{question.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          let optionStyle = 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50';
          
          if (answerState !== null) {
            // Show results
            if (idx === question.correctAnswer) {
              optionStyle = 'border-green-500 bg-green-50';
            } else if (idx === selectedAnswer && answerState === 'wrong') {
              optionStyle = 'border-red-500 bg-red-50';
            } else {
              optionStyle = 'border-gray-200 opacity-50';
            }
          } else if (selectedAnswer === idx) {
            optionStyle = 'border-indigo-500 bg-indigo-50';
          }
          
          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={answerState !== null}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                  answerState !== null && idx === question.correctAnswer
                    ? 'border-green-500 bg-green-500 text-white'
                    : answerState === 'wrong' && idx === selectedAnswer
                    ? 'border-red-500 bg-red-500 text-white'
                    : selectedAnswer === idx
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {answerState !== null && idx === question.correctAnswer ? '✓' :
                   answerState === 'wrong' && idx === selectedAnswer ? '✗' :
                   String.fromCharCode(65 + idx)}
                </div>
                <span className={`font-medium ${
                  answerState !== null && idx === question.correctAnswer ? 'text-green-700' :
                  answerState === 'wrong' && idx === selectedAnswer ? 'text-red-700' :
                  selectedAnswer === idx ? 'text-indigo-700' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback */}
      {answerState === 'correct' && (
        <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-in">
          <div className="text-3xl mb-2">🎉</div>
          <h4 className="text-green-700 font-bold text-lg">Correct! Well Done! 🌟</h4>
          <p className="text-green-600 text-sm mt-1">Great job, keep going!</p>
        </div>
      )}

      {answerState === 'wrong' && (
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-center">
          <div className="text-3xl mb-2">😔</div>
          <h4 className="text-red-700 font-bold text-lg">Incorrect!</h4>
          <p className="text-red-600 text-sm mt-1">The correct answer is highlighted in green.</p>
          <p className="text-amber-600 text-sm mt-2 font-medium">📹 Watch the video to understand this better</p>
        </div>
      )}

      {/* Action Button */}
      {answerState === null ? (
        <button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className={`w-full py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
            answerState === 'correct' 
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          {answerState === 'correct' ? (
            <>Next Question <ArrowRight className="w-5 h-5" /></>
          ) : (
            <><Video className="w-5 h-5" /> Watch Explanation Video</>
          )}
        </button>
      )}
    </div>
  );
}
