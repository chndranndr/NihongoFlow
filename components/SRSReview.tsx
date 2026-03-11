import React, { useState, useEffect, useRef } from 'react';
import { SRSCard } from '../srsTypes';
import { loadCards, saveCards, getDueCards, getNewCards, updateCard, updateStreak, calculateStats } from '../services/srsService';
import { Check, ArrowRight, X, RotateCcw, Clock, Zap, Brain, Sparkles } from 'lucide-react';
import SpeakerButton from './SpeakerButton';
import { completeReview, loadProgress } from '../services/progressService';

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
    const [xpEarned, setXpEarned] = useState(0);

    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const cards = loadCards();
        setAllCards(cards);

        const dueCards = getDueCards(cards, 15);
        const newCards = getNewCards(cards, 5);

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
            const totalReviewed = sessionStats.correct + sessionStats.wrong + 1;
            const prevXP = loadProgress().xp;
            completeReview(totalReviewed);
            const newXP = loadProgress().xp;
            setXpEarned(newXP - prevXP);
        }
    };

    const stats = calculateStats(allCards);

    if (reviewQueue.length === 0 || isComplete) {
        const totalReviewed = sessionStats.correct + sessionStats.wrong;
        const percentage = totalReviewed > 0 ? Math.round((sessionStats.correct / totalReviewed) * 100) : 0;

        return (
            <div className="max-w-md mx-auto py-8 animate-fade-in-up">
                <div className="glass-card p-8 text-center">
                    {totalReviewed > 0 ? (
                        <>
                            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-primary mb-2">Session Complete!</h2>
                            <p className="text-muted mb-8">Great job reviewing today</p>

                            <div className="text-7xl font-bold gradient-text mb-2">{percentage}%</div>
                            <p className="text-secondary font-medium mb-2">
                                {sessionStats.correct} correct, {sessionStats.wrong} wrong
                            </p>
                            <p className="text-sm text-accent font-semibold mb-6">
                                🔥 {stats.streak} day streak
                            </p>

                            {xpEarned > 0 && (
                                <div className="mb-8 py-4 px-6 rounded-2xl gradient-bg-soft border border-accent/20">
                                    <div className="flex items-center justify-center gap-2">
                                        <Sparkles className="w-5 h-5 text-accent" />
                                        <span className="text-xl font-heading font-bold text-accent">+{xpEarned} XP</span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-primary mb-2">All caught up!</h2>
                            <p className="text-muted mb-8">No cards due for review right now</p>
                        </>
                    )}

                    <div className="space-y-3">
                        {totalReviewed > 0 && (
                            <button
                                onClick={() => {
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
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" /> Continue Reviewing
                            </button>
                        )}
                        <button
                            onClick={onViewStats}
                            className="btn-secondary w-full"
                        >
                            View Statistics
                        </button>
                        <button
                            onClick={onBack}
                            className="text-secondary font-medium hover:text-primary transition-colors py-2"
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
            <div className="flex items-center gap-4 mb-4">
                <button onClick={onBack} className="btn-icon">
                    <X className="w-5 h-5" />
                </button>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                    <div
                        className="h-full gradient-bg transition-all duration-500 ease-out"
                        style={{ width: `${((currentIndex + 1) / reviewQueue.length) * 100}%` }}
                    />
                </div>
                <span className="text-sm font-semibold text-secondary tabular-nums">
                    {currentIndex + 1} / {reviewQueue.length}
                </span>
            </div>

            {/* Card Type Badge */}
            <div className="flex justify-center mb-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${currentCard.category === 'KANJI'
                    ? 'bg-purple-500/10 text-purple-500'
                    : 'bg-blue-500/10 text-blue-500'
                    }`}>
                    {currentCard.category}
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
                        {currentCard.character}
                    </span>
                    <div className="absolute bottom-4 right-4">
                        <SpeakerButton text={currentCard.character} size="md" />
                    </div>
                </div>

                {/* Answer Reveal */}
                <div className={`
                    absolute -bottom-4 w-[92%] glass-strong rounded-2xl p-5 transition-all duration-300
                    ${feedback !== 'IDLE' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                            <SpeakerButton text={currentCard.primaryReading} size="sm" autoPlay={feedback !== 'IDLE'} />
                            <div>
                                <p className="text-accent font-bold text-xl mb-1">{currentCard.primaryReading}</p>
                                <p className="text-primary font-medium">{currentCard.meaning}</p>
                            </div>
                        </div>
                        {currentCard.category === 'KANJI' && (
                            <div className="text-right text-xs text-muted space-y-1">
                                {currentCard.onyomi && currentCard.onyomi.length > 0 && (
                                    <p><span className="font-semibold text-secondary">On:</span> {currentCard.onyomi.join(', ')}</p>
                                )}
                                {currentCard.kunyomi && currentCard.kunyomi.length > 0 && (
                                    <p><span className="font-semibold text-secondary">Kun:</span> {currentCard.kunyomi.join(', ')}</p>
                                )}
                            </div>
                        )}
                    </div>
                    {feedback !== 'IDLE' && (
                        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted">
                            {feedback === 'CORRECT' ? (
                                <>
                                    <Zap className="w-3.5 h-3.5 text-green-500" />
                                    <span>Next review in {Math.max(1, Math.round((allCards.find(c => c.id === currentCard.id)?.interval || 1)))} day(s)</span>
                                </>
                            ) : (
                                <>
                                    <Clock className="w-3.5 h-3.5 text-red-500" />
                                    <span>Will repeat soon</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full pt-8">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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

export default SRSReview;
