import React, { useState } from 'react';
import { GRAMMAR_LIBRARY } from '../grammarData';
import { GrammarLesson } from '../types';
import { BookOpen, ChevronRight, HelpCircle, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface GrammarLibraryProps {
  onBack: () => void;
}

const GrammarLibrary: React.FC<GrammarLibraryProps> = ({ onBack }) => {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  
  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'IDLE' | 'RESULT'>('IDLE');

  const handleLessonSelect = (lesson: GrammarLesson) => {
    setSelectedLesson(lesson);
    setSelectedOption(null);
    setQuizState('IDLE');
  };

  const checkAnswer = () => {
    setQuizState('RESULT');
  };

  const handleNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = GRAMMAR_LIBRARY.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < GRAMMAR_LIBRARY.length - 1) {
      handleLessonSelect(GRAMMAR_LIBRARY[currentIndex + 1]);
    } else {
      setSelectedLesson(null); // Back to library
    }
  };

  // --- List View ---
  if (!selectedLesson) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center mb-8">
           <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm mr-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Grammar Library</h1>
        </div>

        <div className="grid gap-4">
          {GRAMMAR_LIBRARY.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonSelect(lesson)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-md mb-2">
                    {lesson.level}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-1">{lesson.explanation}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- Detail View ---
  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <button 
        onClick={() => setSelectedLesson(null)} 
        className="mb-6 flex items-center text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
          <div className="relative z-10">
             <div className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-full mb-3 border border-white/20">
               {selectedLesson.level}
             </div>
             <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedLesson.title}</h1>
          </div>
          <BookOpen className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12" />
        </div>

        <div className="p-8 md:p-10 space-y-10">
          
          {/* Explanation */}
          <section>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Explanation</h3>
            <p className="text-slate-700 leading-relaxed text-lg bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {selectedLesson.explanation}
            </p>
          </section>

          {/* Examples */}
          <section>
             <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4">Examples</h3>
            <div className="grid gap-4">
              {selectedLesson.examples.map((ex, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
                  <p className="jp-font text-xl font-bold text-slate-800 mb-1">{ex.japanese}</p>
                  <p className="text-indigo-600 text-sm font-semibold mb-1">{ex.romaji}</p>
                  <p className="text-slate-500 text-sm italic">{ex.english}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section className="pt-8 border-t border-slate-100">
             <h3 className="flex items-center text-lg font-bold text-slate-800 mb-6">
              <HelpCircle className="w-5 h-5 text-indigo-500 mr-2" />
              Quick Check
            </h3>
            
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8">
              <p className="text-xl font-medium text-slate-800 mb-8 text-center leading-loose">
                {selectedLesson.quiz.question.split('___').map((part, i, arr) => (
                   <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="inline-block border-b-2 border-slate-300 min-w-[60px] text-center text-indigo-600 font-bold px-2 mx-1">
                          {selectedOption !== null ? selectedLesson.quiz.options[selectedOption] : ''}
                        </span>
                      )}
                   </React.Fragment>
                ))}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {selectedLesson.quiz.options.map((option, idx) => {
                  let statusClass = "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md";
                  if (selectedOption === idx) {
                    statusClass = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200";
                  }
                  if (quizState === 'RESULT') {
                    if (idx === selectedLesson.quiz.correctAnswerIndex) {
                       statusClass = "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200";
                    } else if (selectedOption === idx && idx !== selectedLesson.quiz.correctAnswerIndex) {
                       statusClass = "border-red-300 bg-red-50 text-red-500 opacity-50";
                    } else {
                      statusClass = "opacity-40 border-slate-100 bg-slate-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => quizState === 'IDLE' && setSelectedOption(idx)}
                      disabled={quizState === 'RESULT'}
                      className={`p-4 rounded-xl border-2 transition-all font-bold ${statusClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {quizState === 'IDLE' ? (
                <button
                  onClick={checkAnswer}
                  disabled={selectedOption === null}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  Check Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl flex items-center justify-between ${selectedOption === selectedLesson.quiz.correctAnswerIndex ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
                  <div className="flex items-center space-x-3">
                    {selectedOption === selectedLesson.quiz.correctAnswerIndex ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <span className="font-bold">
                      {selectedOption === selectedLesson.quiz.correctAnswerIndex ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <button 
                    onClick={handleNextLesson}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
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

export default GrammarLibrary;
