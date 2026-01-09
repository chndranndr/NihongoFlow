import React, { useState, useEffect } from 'react';
import { DifficultyLevel, GrammarLesson } from '../types';
import { generateAIGrammarLesson } from '../services/geminiService';
import { Sparkles, HelpCircle, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';

interface AIGrammarModeProps {
  level: DifficultyLevel;
  onBack: () => void;
}

const AIGrammarMode: React.FC<AIGrammarModeProps> = ({ level, onBack }) => {
  const [lesson, setLesson] = useState<GrammarLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState<'READING' | 'QUIZ' | 'RESULT'>('READING');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const fetchLesson = async () => {
    setLoading(true);
    setQuizState('READING');
    setSelectedOption(null);
    const data = await generateAIGrammarLesson(level);
    setLesson(data);
    setLoading(false);
  };

  const handleOptionSelect = (index: number) => {
    if (quizState === 'RESULT') return;
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    setQuizState('RESULT');
  };

  if (loading) {
     return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
        <p className="text-slate-500 animate-pulse font-medium">AI Sensei is crafting your lesson...</p>
      </div>
    );
  }

  if (!lesson) return <div className="text-center p-10">Failed to load lesson.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <div className="flex items-center mb-6">
         <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm mr-4">
          ← Back
        </button>
        <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
          <Sparkles className="w-3 h-3" />
          <span>AI Grammar • {level.split(' ')[0]}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl shadow-purple-100 overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-10">
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-purple-200">AI Generated Content</p>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          
          {/* Explanation Section */}
          <section className="prose prose-slate max-w-none">
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Explanation</h3>
            <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {lesson.explanation}
            </p>
          </section>

          {/* Examples Section */}
          <section>
             <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Examples</h3>
            <div className="grid gap-4">
              {lesson.examples.map((ex, idx) => (
                <div key={idx} className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
                  <p className="jp-font text-xl font-bold text-slate-800 mb-1">{ex.japanese}</p>
                  <p className="text-purple-600 text-sm font-semibold mb-1">{ex.romaji}</p>
                  <p className="text-slate-500 italic text-sm">{ex.english}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="pt-8 border-t border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-orange-500 mr-2" />
              Quick Quiz
            </h3>
            
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
              <p className="text-xl font-medium text-slate-800 mb-8 text-center">
                {lesson.quiz.question.split('___').map((part, i, arr) => (
                   <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-slate-400 w-16 text-center text-purple-600 font-bold px-1 mx-1">
                          {selectedOption !== null ? lesson.quiz.options[selectedOption] : '?'}
                        </span>
                      )}
                   </React.Fragment>
                ))}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {lesson.quiz.options.map((option, idx) => {
                  let statusClass = "border-slate-200 hover:border-purple-300 hover:bg-white";
                  if (selectedOption === idx) {
                    statusClass = "border-purple-500 bg-purple-50 ring-2 ring-purple-200";
                  }
                  if (quizState === 'RESULT') {
                    if (idx === lesson.quiz.correctAnswerIndex) {
                       statusClass = "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200";
                    } else if (selectedOption === idx && idx !== lesson.quiz.correctAnswerIndex) {
                       statusClass = "border-red-300 bg-red-50 text-red-500 opacity-50";
                    } else {
                      statusClass = "opacity-40 border-slate-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={quizState === 'RESULT'}
                      className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${statusClass}`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-white border-2 border-current text-xs flex items-center justify-center mr-3 font-bold opacity-60">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {quizState !== 'RESULT' ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                  Check Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl flex items-center justify-between ${selectedOption === lesson.quiz.correctAnswerIndex ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center space-x-3">
                    {selectedOption === lesson.quiz.correctAnswerIndex ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <span className="font-bold">
                      {selectedOption === lesson.quiz.correctAnswerIndex ? 'Correct! Yoku dekimashita!' : 'Incorrect. Try again next time!'}
                    </span>
                  </div>
                  <button 
                    onClick={fetchLesson}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center"
                  >
                    Generate New <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AIGrammarMode;
