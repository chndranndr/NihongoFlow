import React, { useState, useEffect } from 'react';
import { DrillCategory, DrillItem } from '../types';
import { Check, ArrowRight, X, RotateCcw, Sparkles } from 'lucide-react';
import SpeakerButton from './SpeakerButton';
import { completeDrill, loadProgress } from '../services/progressService';

interface DrillModeProps {
    category: DrillCategory;
    items: DrillItem[];
    onBack: () => void;
}

const DrillMode: React.FC<DrillModeProps> = ({ category, items, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [shuffledItems, setShuffledItems] = useState<DrillItem[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    useEffect(() => {
        setShuffledItems([...items].sort(() => Math.random() - 0.5));
    }, [items]);

    const currentItem = shuffledItems[currentIndex];

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (feedback !== 'IDLE' || !currentItem) return;

        const normalizedInput = input.toLowerCase().trim();
        const isCorrect =
            normalizedInput === currentItem.primaryReading.toLowerCase() ||
            currentItem.alternateReadings?.some(r => r.toLowerCase() === normalizedInput) ||
            (category === DrillCategory.KANJI && (
                currentItem.onyomi?.some(r => r.toLowerCase() === normalizedInput) ||
                currentItem.kunyomi?.some(r => r.replace(/-/g, '').toLowerCase() === normalizedInput)
            ));

        setFeedback(isCorrect ? 'CORRECT' : 'WRONG');
        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !input) {
            // Prevent default just in case, though empty
        }
    };

    const handleNext = () => {
        if (currentIndex < shuffledItems.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInput('');
            setFeedback('IDLE');
        } else {
            setIsComplete(true);
            const prevXP = loadProgress().xp;
            completeDrill(score.correct, items.length, category);
            const newXP = loadProgress().xp;
            setXpEarned(newXP - prevXP);
        }
    };

    const handleRetry = () => {
        setShuffledItems([...items].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setInput('');
        setFeedback('IDLE');
        setScore({ correct: 0, total: 0 });
        setIsComplete(false);
    };

    if (!currentItem || isComplete) {
        const percentage = Math.round((score.correct / items.length) * 100);
        return (
            <div className="max-w-md mx-auto py-8 animate-fade-in-up">
                <div className="glass-card p-8 text-center">
                    <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg">
                        {percentage >= 80 ? (
                            <Sparkles className="w-10 h-10 text-white" />
                        ) : (
                            <Check className="w-10 h-10 text-white" />
                        )}
                    </div>
                    
                    <h2 className="text-2xl font-heading font-bold text-primary mb-2">Drill Complete!</h2>
                    <p className="text-muted mb-8">Here's how you performed</p>

                    <div className="text-7xl font-bold gradient-text mb-2">{percentage}%</div>
                    <p className="text-secondary font-medium mb-6">
                        {score.correct} out of {items.length} correct
                    </p>

                    {xpEarned > 0 && (
                        <div className="mb-8 py-4 px-6 rounded-2xl gradient-bg-soft border border-accent/20">
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5 text-accent" />
                                <span className="text-xl font-heading font-bold text-accent">+{xpEarned} XP</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={handleRetry}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" /> Practice Again
                        </button>
                        <button
                            onClick={onBack}
                            className="btn-secondary w-full"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto min-h-[calc(100vh-180px)] flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={onBack} 
                    className="btn-icon shrink-0"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                    <div
                        className="h-full gradient-bg transition-all duration-500 ease-out"
                        style={{ width: `${((currentIndex + 1) / shuffledItems.length) * 100}%` }}
                    />
                </div>
                <span className="text-sm font-semibold text-secondary tabular-nums shrink-0">
                    {currentIndex + 1} / {shuffledItems.length}
                </span>
            </div>

            {/* Card */}
            <div className="flex-1 flex flex-col items-center justify-center mb-6 relative">
                <div className={`
                    w-full aspect-square glass-card flex items-center justify-center p-8 transition-all duration-300
                    ${feedback === 'CORRECT' ? 'shadow-[0_0_40px_rgba(34,197,94,0.4)] border-green-400/50' : ''}
                    ${feedback === 'WRONG' ? 'shadow-[0_0_40px_rgba(239,68,68,0.4)] border-red-400/50' : ''}
                `}>
                    <span className={`text-[7rem] md:text-[8rem] font-bold jp-font leading-none transition-colors duration-300
                        ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-500' : 'text-red-500'}
                    `}>
                        {currentItem.character}
                    </span>
                    <div className="absolute bottom-4 right-4">
                        <SpeakerButton text={currentItem.character} size="md" />
                    </div>
                </div>

                {/* Answer Reveal */}
                <div className={`
                    absolute -bottom-4 w-[92%] glass-strong rounded-2xl p-5 transition-all duration-300
                    ${feedback !== 'IDLE' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                            <SpeakerButton text={currentItem.primaryReading} size="sm" autoPlay={feedback !== 'IDLE'} />
                            <div>
                                <p className="text-accent font-bold text-xl mb-1">{currentItem.primaryReading}</p>
                                <p className="text-primary font-medium">{currentItem.meaning}</p>
                            </div>
                        </div>
                        {category === DrillCategory.KANJI && (
                            <div className="text-right text-xs text-muted space-y-1">
                                {currentItem.onyomi && <p><span className="font-semibold text-secondary">On:</span> {currentItem.onyomi.join(', ')}</p>}
                                {currentItem.kunyomi && <p><span className="font-semibold text-secondary">Kun:</span> {currentItem.kunyomi.join(', ')}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full pt-8">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        inputMode="search"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={feedback !== 'IDLE'}
                        placeholder="Type reading..."
                        className={`
                            input-glass text-lg font-semibold pr-14
                            ${feedback === 'CORRECT' ? 'border-green-400 text-green-600' : ''}
                            ${feedback === 'WRONG' ? 'border-red-400 text-red-500' : ''}
                        `}
                        autoFocus
                    />

                    {feedback === 'IDLE' ? (
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl gradient-bg text-white flex items-center justify-center disabled:opacity-0 disabled:scale-90 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className={`
                                absolute right-2 top-1/2 -translate-y-1/2 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95
                                ${feedback === 'CORRECT' ? 'bg-green-500' : 'bg-red-500'}
                            `}
                        >
                            Next <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default DrillMode;
