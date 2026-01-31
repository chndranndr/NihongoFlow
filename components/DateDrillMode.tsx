import React, { useState, useEffect } from 'react';
import { DateDrillConfig } from '../types';
import {
    generateDateDrillItems,
    generateDayOfWeekDrillItems,
    FullDateItem,
    DateItem,
    DAYS_OF_WEEK
} from '../dateTimeData';
import { Check, ArrowRight, X, RotateCcw } from 'lucide-react';

interface DateDrillModeProps {
    config: DateDrillConfig;
    onBack: () => void;
}

type DrillItem = FullDateItem | DateItem;

const DateDrillMode: React.FC<DateDrillModeProps> = ({ config, onBack }) => {
    const [items, setItems] = useState<DrillItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [isComplete, setIsComplete] = useState(false);

    const isFullDate = config.mode === 'full-date';
    const isJpToEn = config.direction === 'jp-to-en';

    useEffect(() => {
        let drillItems: DrillItem[];
        if (isFullDate) {
            drillItems = generateDateDrillItems(
                config.startYear || 1990,
                config.endYear || 2025,
                config.itemCount
            );
        } else {
            drillItems = generateDayOfWeekDrillItems();
        }
        setItems(drillItems);
    }, [config, isFullDate]);

    const currentItem = items[currentIndex];

    const normalizeInput = (str: string): string => {
        return str.toLowerCase().trim().replace(/[^a-z]/g, '');
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (feedback !== 'IDLE' || !currentItem) return;

        let isCorrect = false;
        const userInput = normalizeInput(input);

        if (isFullDate) {
            const fullDateItem = currentItem as FullDateItem;
            if (isJpToEn) {
                // Japanese → English: user types English day name or "monday december 1 1993"
                const englishNormalized = normalizeInput(fullDateItem.englishDisplay);
                isCorrect = userInput === englishNormalized ||
                    englishNormalized.includes(userInput) && userInput.length >= 6;
            } else {
                // English → Japanese: user types romaji
                const romajiNormalized = normalizeInput(fullDateItem.romajiAnswer);
                isCorrect = userInput === romajiNormalized ||
                    romajiNormalized.includes(userInput) && userInput.length >= 6;
            }
        } else {
            const dayItem = currentItem as DateItem;
            if (isJpToEn) {
                // Japanese → English: user types English day name
                isCorrect = userInput === normalizeInput(dayItem.english);
            } else {
                // English → Japanese: user types romaji
                isCorrect = userInput === normalizeInput(dayItem.romaji);
            }
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
        let drillItems: DrillItem[];
        if (isFullDate) {
            drillItems = generateDateDrillItems(
                config.startYear || 1990,
                config.endYear || 2025,
                config.itemCount
            );
        } else {
            drillItems = generateDayOfWeekDrillItems();
        }
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
                <div className="bg-white rounded-3xl p-8 border border-border shadow-lg shadow-primary/5">
                    <h2 className="text-3xl font-bold text-primary mb-2">Drill Complete</h2>
                    <p className="text-secondary mb-8">Here's how you performed</p>

                    <div className="text-6xl font-bold text-accent mb-4">{percentage}%</div>
                    <p className="text-primary font-medium mb-8">
                        {score.correct} out of {items.length} correct
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={handleRetry}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center"
                        >
                            <RotateCcw className="w-5 h-5 mr-2" /> Practice Again
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full bg-surface text-primary py-4 rounded-xl font-bold hover:bg-border transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render display based on item type and direction
    const renderDisplay = () => {
        if (isFullDate) {
            const fullDateItem = currentItem as FullDateItem;
            if (isJpToEn) {
                return (
                    <>
                        <span className={`text-2xl md:text-3xl font-bold jp-font leading-tight mb-3 text-center ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'}`}>
                            {fullDateItem.japaneseDisplay}
                        </span>
                        <span className="text-sm text-secondary text-center">{fullDateItem.hiraganaDisplay}</span>
                    </>
                );
            } else {
                return (
                    <span className={`text-xl md:text-2xl font-bold leading-tight text-center ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'}`}>
                        {fullDateItem.englishDisplay}
                    </span>
                );
            }
        } else {
            const dayItem = currentItem as DateItem;
            if (isJpToEn) {
                return (
                    <>
                        <span className={`text-5xl md:text-6xl font-bold jp-font leading-none mb-3 ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'}`}>
                            {dayItem.kanji}
                        </span>
                        <span className="text-lg text-secondary">{dayItem.hiragana}</span>
                    </>
                );
            } else {
                return (
                    <span className={`text-4xl md:text-5xl font-bold leading-none ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'}`}>
                        {dayItem.english}
                    </span>
                );
            }
        }
    };

    const renderAnswer = () => {
        if (isFullDate) {
            const fullDateItem = currentItem as FullDateItem;
            if (isJpToEn) {
                return (
                    <p className="text-accent font-bold text-lg">{fullDateItem.englishDisplay}</p>
                );
            } else {
                return (
                    <>
                        <p className="text-accent font-bold text-lg mb-1 jp-font">{fullDateItem.japaneseDisplay}</p>
                        <p className="text-primary text-sm">{fullDateItem.romajiAnswer}</p>
                    </>
                );
            }
        } else {
            const dayItem = currentItem as DateItem;
            if (isJpToEn) {
                return <p className="text-accent font-bold text-xl">{dayItem.english}</p>;
            } else {
                return (
                    <>
                        <p className="text-accent font-bold text-xl mb-1 jp-font">{dayItem.kanji}</p>
                        <p className="text-primary font-medium">{dayItem.romaji}</p>
                    </>
                );
            }
        }
    };

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
                    w-full aspect-square bg-white rounded-[2rem] border-2 flex flex-col items-center justify-center p-6 transition-all duration-300
                    ${feedback === 'IDLE' ? 'border-border' : feedback === 'CORRECT' ? 'border-green-500 bg-green-50/10' : 'border-red-500 bg-red-50/10'}
                `}>
                    {renderDisplay()}
                </div>

                {/* Answer Reveal */}
                <div className={`
                    absolute -bottom-6 w-[90%] bg-surface rounded-xl p-4 border border-border transition-all duration-300 transform
                    ${feedback !== 'IDLE' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}>
                    <div className="text-center">
                        {renderAnswer()}
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={feedback !== 'IDLE'}
                        placeholder={isJpToEn ? 'Type in English...' : 'Type romaji...'}
                        className={`
                            w-full bg-surface text-primary text-lg font-bold px-6 py-5 rounded-2xl outline-none border-2 transition-all placeholder:text-secondary/40 placeholder:font-medium
                            ${feedback === 'IDLE' ? 'border-transparent focus:border-accent/20 focus:bg-white' : feedback === 'CORRECT' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}
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

export default DateDrillMode;
