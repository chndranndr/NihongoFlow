import React, { useState, useEffect, useRef } from 'react';
import { DrillCategory, DrillItem } from '../types';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

interface DrillModeProps {
  category: DrillCategory;
  items: DrillItem[];
  onBack: () => void;
}

const DrillMode: React.FC<DrillModeProps> = ({ category, items, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset on mount or item change
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setUserInput('');
    setFeedback('IDLE');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [items]);

  const handleCheck = () => {
    if (!items[currentIndex]) return;
    const currentItem = items[currentIndex];
    
    const correctReadings = [
      currentItem.primaryReading,
      ...(currentItem.alternateReadings || []),
      ...(currentItem.onyomi || []), 
      ...(currentItem.kunyomi || [])
    ].map(s => s.toLowerCase().trim());
    
    const input = userInput.toLowerCase().trim();

    if (correctReadings.includes(input)) {
      setFeedback('CORRECT');
      setScore(s => s + 1);
    } else {
      setFeedback('WRONG');
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setFeedback('IDLE');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
     setCurrentIndex(0);
     setScore(0);
     setIsFinished(false);
     setUserInput('');
     setFeedback('IDLE');
     setTimeout(() => inputRef.current?.focus(), 100);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (feedback === 'IDLE') {
        handleCheck();
      } else {
        handleNext();
      }
    }
  };

  if (items.length === 0) {
    return <div className="p-10 text-center">No items to drill.</div>;
  }

  if (isFinished) {
    return (
       <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center h-[80vh] text-center space-y-8 animate-fade-in-up">
         <div className="relative">
            <div className="absolute inset-0 bg-indigo-200 blur-2xl opacity-20 rounded-full animate-pulse"></div>
            <div className="bg-white p-10 rounded-full shadow-2xl relative">
               <Check className="w-16 h-16 text-indigo-600" />
            </div>
         </div>
         
         <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Drill Complete!</h2>
            <p className="text-slate-500">You scored {score} out of {items.length}</p>
         </div>

         <div className="w-full space-y-3">
            <button 
              onClick={handleRestart}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Practice Again
            </button>
            <button 
              onClick={onBack}
              className="w-full py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold transition-all"
            >
              Choose New Drill
            </button>
         </div>
       </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm">
          ← Quit
        </button>
        <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden min-h-[450px] flex flex-col relative transition-all duration-300">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-50 h-1.5">
          <div 
            className="bg-indigo-500 h-1.5 transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex) / items.length) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
          <div className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            {category} Drill
          </div>

          {/* Character Display */}
          <div className={`text-8xl md:text-9xl jp-font font-medium text-slate-800 transition-all duration-300 transform ${feedback === 'CORRECT' ? 'scale-110 text-emerald-500' : feedback === 'WRONG' ? 'shake text-red-500' : ''}`}>
            {currentItem.character}
          </div>

          {/* Feedback/Details Area - Only show after answer */}
          <div className={`transition-all duration-500 w-full text-center space-y-2 ${feedback === 'IDLE' ? 'opacity-0 translate-y-4 invisible' : 'opacity-100 translate-y-0 visible'}`}>
            <h3 className="text-3xl font-bold text-slate-700 capitalize tracking-tight">{currentItem.primaryReading}</h3>
            <p className="text-slate-400 text-lg font-medium">{currentItem.meaning}</p>
            
            {(category === DrillCategory.KANJI || category === DrillCategory.VOCAB) && (
              <div className="grid grid-cols-2 gap-4 mt-6 bg-slate-50 p-5 rounded-2xl text-sm text-left border border-slate-100">
                {currentItem.onyomi && currentItem.onyomi.length > 0 && (
                  <div>
                    <span className="block text-xs font-extrabold text-slate-400 uppercase mb-1">Onyomi</span>
                    <span className="text-slate-700 font-semibold text-base">{currentItem.onyomi.join(', ')}</span>
                  </div>
                )}
                {currentItem.kunyomi && currentItem.kunyomi.length > 0 && (
                  <div>
                    <span className="block text-xs font-extrabold text-slate-400 uppercase mb-1">Kunyomi</span>
                    <span className="text-slate-700 font-semibold text-base">{currentItem.kunyomi.join(', ')}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Interaction Area */}
        <div className={`p-6 md:p-8 ${feedback === 'CORRECT' ? 'bg-emerald-50/50' : feedback === 'WRONG' ? 'bg-red-50/50' : 'bg-white'}`}>
          <div className="relative max-w-md mx-auto">
            {feedback === 'IDLE' ? (
              <div className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type reading..."
                  className="w-full text-center text-xl p-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-800"
                  autoComplete="off"
                  autoFocus
                />
                <button 
                  onClick={handleCheck}
                  className="absolute right-3 top-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 opacity-0 group-focus-within:opacity-100 focus:opacity-100"
                >
                  Check
                </button>
              </div>
            ) : (
              <button 
                ref={r => r?.focus()}
                onClick={handleNext}
                onKeyDown={handleKeyDown}
                className={`w-full p-5 rounded-2xl flex items-center justify-center space-x-2 text-lg font-bold transition-all shadow-xl transform active:scale-95 ${feedback === 'CORRECT' ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600' : 'bg-red-500 text-white shadow-red-200 hover:bg-red-600'}`}
              >
                {feedback === 'CORRECT' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                <span>{currentIndex === items.length - 1 ? 'Finish Set' : 'Next Question'}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default DrillMode;