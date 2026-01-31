import React, { useState, useEffect } from 'react';
import { NumberDrillConfig } from '../types';
import { generateNumberDrillItems, NumberDrillItem } from '../numberData';
import { Check, ArrowRight, X, RotateCcw } from 'lucide-react';

interface NumberDrillModeProps {
    config: NumberDrillConfig;
    onBack: () => void;
}

const NumberDrillMode: React.FC<NumberDrillModeProps> = ({ config, onBack }) => {
    const [items, setItems] = useState<NumberDrillItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const drillItems = generateNumberDrillItems(config.minRange, config.maxRange, config.itemCount);
        setItems(drillItems);
    }, [config]);

    const currentItem = items[currentIndex];
    const isJpToNum = config.direction === 'jp-to-num';

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (feedback !== 'IDLE' || !currentItem) return;

        let isCorrect = false;
        const userInput = input.toLowerCase().trim();

        if (isJpToNum) {
            // Japanese → Number: user types the number
            isCorrect = parseInt(userInput) === currentItem.value;
        } else {
            // Number → Japanese: user types romaji
            isCorrect = userInput === currentItem.romaji.toLowerCase();
        }

        setFeedback(isCorrect ? 'CORRECT' : 'WRONG');
        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));
    };

    const handleNext = () => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInput('');
            setFeedback('IDLE');
        } else {
            setIsComplete(true);
        }
    };

    const handleRetry = () => {
        const drillItems = generateNumberDrillItems(config.minRange, config.maxRange, config.itemCount);
        setItems(drillItems);
        setCurrentIndex(0);
        setInput('');
        setFeedback('IDLE');
        setScore({ correct: 0, total: 0 });
        setIsComplete(false);
    };

    if (items.length === 0) {
        return <div className="text-center py-12 text-secondary">Loading...</div>;
    }

    if (!currentItem || isComplete) {
        const percentage = Math.round((score.correct / items.length) * 100);
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
                <div className="neu-card p-8">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-2 neon-text-subtle">Drill Complete</h2>
                    <p className="text-secondary mb-8">Here's how you performed</p>

                    <div className="text-6xl font-bold text-accent mb-4 neon-text-subtle">{percentage}%</div>
                    <p className="text-primary font-medium mb-8">
                        {score.correct} out of {items.length} correct
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={handleRetry}
                            className="w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center hover:shadow-glow" style={{ background: 'var(--color-primary)' }}
                        >
                            <RotateCcw className="w-5 h-5 mr-2" /> Practice Again
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full neu-btn py-4 text-primary font-bold transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto h-[calc(100vh-140px)] flex flex-col justify-between py-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-secondary hover:text-primary transition-colors">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-1 mx-6 h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                    />
                </div>
                <span className="text-xs font-bold text-secondary tabular-nums">
                    {currentIndex + 1} / {items.length}
                </span>
            </div>

            {/* Card */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
                <div className={`
                    w-full aspect-square neu-card flex flex-col items-center justify-center p-8 transition-all duration-300
                    ${feedback === 'IDLE' ? '' : feedback === 'CORRECT' ? 'glow-accent' : 'shadow-[0_0_20px_rgba(239,68,68,0.5)]'}
                `}>
                    {isJpToNum ? (
                        // Show Japanese, expect number
                        <>
                            <span className={`text-[5rem] font-bold jp-font leading-none mb-4 ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'
                                }`}>
                                {currentItem.kanji}
                            </span>
                            <span className="text-lg text-secondary">{currentItem.hiragana}</span>
                        </>
                    ) : (
                        // Show number, expect Japanese
                        <span className={`text-[6rem] font-bold leading-none tabular-nums ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'
                            }`}>
                            {currentItem.value.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Answer Reveal */}
                <div className={`
                    absolute -bottom-6 w-[90%] neu-card p-4 transition-all duration-300 transform
                    ${feedback !== 'IDLE' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}>
                    <div className="text-center">
                        {isJpToNum ? (
                            <p className="text-accent font-bold text-2xl">{currentItem.value.toLocaleString()}</p>
                        ) : (
                            <>
                                <p className="text-accent font-bold text-xl mb-1 jp-font">{currentItem.kanji}</p>
                                <p className="text-primary font-medium">{currentItem.romaji}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type={isJpToNum ? 'number' : 'text'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={feedback !== 'IDLE'}
                        placeholder={isJpToNum ? 'Type the number...' : 'Type romaji...'}
                        className={`
                            w-full neu-inset text-primary text-lg font-bold px-6 py-5 outline-none transition-all placeholder:text-secondary/40 placeholder:font-medium
                            ${feedback === 'IDLE' ? '' : feedback === 'CORRECT' ? 'glow-accent text-green-700' : 'shadow-[0_0_15px_rgba(239,68,68,0.4)] text-red-700'}
                        `}
                        autoFocus
                    />

                    {feedback === 'IDLE' ? (
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-xl disabled:opacity-0 disabled:scale-95 transition-all hover:scale-105 active:scale-95"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className={`
                                absolute right-3 top-1/2 -translate-y-1/2 text-white px-4 py-2.5 rounded-xl font-bold flex items-center shadow-lg transition-all hover:scale-105 active:scale-95
                                ${feedback === 'CORRECT' ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'}
                            `}
                        >
                            Next <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default NumberDrillMode;
