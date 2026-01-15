import React, { useState, useEffect, useRef } from 'react';
import { SRSCard } from '../srsTypes';
import { loadCards, saveCards, getDueCards, getNewCards, updateCard, updateStreak, calculateStats } from '../services/srsService';
import { Check, ArrowRight, X, RotateCcw, ArrowLeft, Clock, Zap, Brain } from 'lucide-react';

interface SRSReviewProps {
    onBack: () => void;
    onViewStats: () => void;
}

const SRSReview: React.FC<SRSReviewProps> = ({ onBack, onViewStats }) => {
    const [allCards, setAllCards] = useState<SRSCard[]>([]);
    const [reviewQueue, setReviewQueue] = useState<SRSCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');
    const [isComplete, setIsComplete] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

    // Timer for response time tracking
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const cards = loadCards();
        setAllCards(cards);

        // Get due cards + some new cards
        const dueCards = getDueCards(cards, 15);
        const newCards = getNewCards(cards, 5);

        // Combine and shuffle
        const queue = [...dueCards, ...newCards].sort(() => Math.random() - 0.5);
        setReviewQueue(queue);

        if (queue.length === 0) {
            setIsComplete(true);
        } else {
            startTimeRef.current = Date.now();
        }
    }, []);

    const currentCard = reviewQueue[currentIndex];

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (feedback !== 'IDLE' || !currentCard) return;

        const responseTime = Date.now() - startTimeRef.current;
        const isCorrect =
            input.toLowerCase().trim() === currentCard.primaryReading.toLowerCase() ||
            (currentCard.kunyomi?.some(r => r.toLowerCase().replace('-', '') === input.toLowerCase().trim())) ||
            (currentCard.onyomi?.some(r => r.toLowerCase() === input.toLowerCase().trim()));

        setFeedback(isCorrect ? 'CORRECT' : 'WRONG');
        setSessionStats(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            wrong: prev.wrong + (isCorrect ? 0 : 1),
        }));

        // Update the card with SRS algorithm
        const updatedCards = updateCard(allCards, currentCard.id, isCorrect, responseTime);
        setAllCards(updatedCards);
        saveCards(updatedCards);
    };

    const handleNext = () => {
        if (currentIndex < reviewQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInput('');
            setFeedback('IDLE');
            startTimeRef.current = Date.now();
        } else {
            updateStreak();
            setIsComplete(true);
        }
    };

    // Calculate stats for display
    const stats = calculateStats(allCards);

    if (reviewQueue.length === 0 || isComplete) {
        const totalReviewed = sessionStats.correct + sessionStats.wrong;
        const percentage = totalReviewed > 0 ? Math.round((sessionStats.correct / totalReviewed) * 100) : 0;

        return (
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
                <div className="bg-white rounded-3xl p-8 border border-border shadow-lg shadow-primary/5">
                    {totalReviewed > 0 ? (
                        <>
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Brain className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-2">Session Complete!</h2>
                            <p className="text-secondary mb-8">Great job reviewing today</p>

                            <div className="text-6xl font-bold text-accent mb-4">{percentage}%</div>
                            <p className="text-primary font-medium mb-2">
                                {sessionStats.correct} correct, {sessionStats.wrong} wrong
                            </p>
                            <p className="text-sm text-secondary mb-8">
                                🔥 {stats.streak} day streak
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-2">All caught up!</h2>
                            <p className="text-secondary mb-8">No cards due for review right now</p>
                        </>
                    )}

                    <div className="space-y-3">
                        {totalReviewed > 0 && (
                            <button
                                onClick={() => {
                                    // Reload for another session
                                    const cards = loadCards();
                                    const dueCards = getDueCards(cards, 15);
                                    const newCards = getNewCards(cards, 5);
                                    const queue = [...dueCards, ...newCards].sort(() => Math.random() - 0.5);
                                    setReviewQueue(queue);
                                    setCurrentIndex(0);
                                    setSessionStats({ correct: 0, wrong: 0 });
                                    setIsComplete(false);
                                    setFeedback('IDLE');
                                    setInput('');
                                    startTimeRef.current = Date.now();
                                }}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" /> Continue Reviewing
                            </button>
                        )}
                        <button
                            onClick={onViewStats}
                            className="w-full bg-surface text-primary py-4 rounded-xl font-bold hover:bg-border transition-all"
                        >
                            View Statistics
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full text-secondary py-3 rounded-xl font-medium hover:text-primary transition-all"
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
                        style={{ width: `${((currentIndex + 1) / reviewQueue.length) * 100}%` }}
                    />
                </div>
                <span className="text-xs font-bold text-secondary tabular-nums">
                    {currentIndex + 1} / {reviewQueue.length}
                </span>
            </div>

            {/* Card Type Badge */}
            <div className="flex justify-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentCard.category === 'KANJI'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                    {currentCard.category}
                </span>
            </div>

            {/* Card */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
                <div className={`
                    w-full aspect-square bg-white rounded-[2rem] border-2 flex items-center justify-center p-8 transition-all duration-300
                    ${feedback === 'IDLE' ? 'border-border' : feedback === 'CORRECT' ? 'border-green-500 bg-green-50/10' : 'border-red-500 bg-red-50/10'}
                `}>
                    <span className={`text-[8rem] font-bold jp-font leading-none ${feedback === 'IDLE' ? 'text-primary' : feedback === 'CORRECT' ? 'text-green-600' : 'text-red-500'
                        }`}>
                        {currentCard.character}
                    </span>
                </div>

                {/* Answer Reveal */}
                <div className={`
                    absolute -bottom-6 w-[90%] bg-surface rounded-xl p-4 border border-border transition-all duration-300 transform
                    ${feedback !== 'IDLE' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-accent font-bold text-lg mb-0.5">{currentCard.primaryReading}</p>
                            <p className="text-primary font-medium leading-tight">{currentCard.meaning}</p>
                        </div>
                        {currentCard.category === 'KANJI' && (
                            <div className="text-right text-xs text-secondary space-y-0.5">
                                {currentCard.onyomi && currentCard.onyomi.length > 0 && (
                                    <p><span className="font-semibold">On:</span> {currentCard.onyomi.join(', ')}</p>
                                )}
                                {currentCard.kunyomi && currentCard.kunyomi.length > 0 && (
                                    <p><span className="font-semibold">Kun:</span> {currentCard.kunyomi.join(', ')}</p>
                                )}
                            </div>
                        )}
                    </div>
                    {feedback !== 'IDLE' && (
                        <div className="mt-2 pt-2 border-t border-border/50 flex items-center gap-2 text-xs text-secondary">
                            {feedback === 'CORRECT' ? (
                                <>
                                    <Zap className="w-3 h-3 text-green-500" />
                                    <span>Next review in {Math.max(1, Math.round((allCards.find(c => c.id === currentCard.id)?.interval || 1)))} day(s)</span>
                                </>
                            ) : (
                                <>
                                    <Clock className="w-3 h-3 text-red-500" />
                                    <span>Will repeat soon</span>
                                </>
                            )}
                        </div>
                    )}
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
                        placeholder="Type reading..."
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

export default SRSReview;
