import React, { useState, useEffect } from 'react';
import { loadCards, calculateStats } from '../services/srsService';
import { SRSCard, SRSStats } from '../srsTypes';
import { ArrowLeft, Brain, Calendar, Flame, BookOpen, Target, TrendingUp } from 'lucide-react';

interface SRSStatsProps {
    onBack: () => void;
    onStartReview: () => void;
}

const SRSStatsComponent: React.FC<SRSStatsProps> = ({ onBack, onStartReview }) => {
    const [cards, setCards] = useState<SRSCard[]>([]);
    const [stats, setStats] = useState<SRSStats | null>(null);

    useEffect(() => {
        const loadedCards = loadCards();
        setCards(loadedCards);
        setStats(calculateStats(loadedCards));
    }, []);

    if (!stats) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    // Calculate category breakdown
    const kanjiCards = cards.filter(c => c.category === 'KANJI');
    const vocabCards = cards.filter(c => c.category === 'VOCAB');
    const kanjiLearned = kanjiCards.filter(c => c.repetitions > 0).length;
    const vocabLearned = vocabCards.filter(c => c.repetitions > 0).length;

    // Calculate mastery levels
    const mastered = cards.filter(c => c.interval >= 21).length; // 21+ days interval
    const learning = cards.filter(c => c.repetitions > 0 && c.interval < 21).length;
    const notStarted = cards.filter(c => c.repetitions === 0).length;

    return (
        <div className="max-w-2xl mx-auto py-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-primary">SRS Statistics</h1>
                    <p className="text-secondary text-sm">Track your learning progress</p>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                        <Flame className="w-5 h-5 text-orange-500" />
                    </div>
                    <p className="text-3xl font-bold text-primary">{stats.streak}</p>
                    <p className="text-sm text-secondary">Day Streak</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-primary">{stats.dueToday}</p>
                    <p className="text-sm text-secondary">Due Today</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                        <Brain className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-primary">{stats.learnedCards}</p>
                    <p className="text-sm text-secondary">Learned</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-primary">{stats.totalCards}</p>
                    <p className="text-sm text-secondary">Total Cards</p>
                </div>
            </div>

            {/* Progress Section */}
            <div className="glass-card rounded-2xl p-6 border border-border mb-6">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Overall Progress
                </h3>

                <div className="space-y-4">
                    {/* Mastery Progress Bar */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-secondary">Mastery Progress</span>
                            <span className="font-bold text-primary">
                                {Math.round((stats.learnedCards / stats.totalCards) * 100)}%
                            </span>
                        </div>
                        <div className="h-3 bg-surface rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-accent to-green-500 transition-all duration-500"
                                style={{ width: `${(stats.learnedCards / stats.totalCards) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Level Breakdown */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center p-3 bg-surface rounded-xl">
                            <p className="text-2xl font-bold text-green-600">{mastered}</p>
                            <p className="text-xs text-secondary">Mastered</p>
                        </div>
                        <div className="text-center p-3 bg-surface rounded-xl">
                            <p className="text-2xl font-bold text-yellow-600">{learning}</p>
                            <p className="text-xs text-secondary">Learning</p>
                        </div>
                        <div className="text-center p-3 bg-surface rounded-xl">
                            <p className="text-2xl font-bold text-gray-400">{notStarted}</p>
                            <p className="text-xs text-secondary">Not Started</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl jp-font">字</span>
                        <div>
                            <h4 className="font-bold text-primary">Kanji</h4>
                            <p className="text-sm text-secondary">{kanjiCards.length} cards</p>
                        </div>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div
                            className="h-full bg-purple-500 transition-all"
                            style={{ width: `${kanjiCards.length > 0 ? (kanjiLearned / kanjiCards.length) * 100 : 0}%` }}
                        />
                    </div>
                    <p className="text-xs text-secondary mt-2">{kanjiLearned} learned</p>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl jp-font">語</span>
                        <div>
                            <h4 className="font-bold text-primary">Vocabulary</h4>
                            <p className="text-sm text-secondary">{vocabCards.length} cards</p>
                        </div>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${vocabCards.length > 0 ? (vocabLearned / vocabCards.length) * 100 : 0}%` }}
                        />
                    </div>
                    <p className="text-xs text-secondary mt-2">{vocabLearned} learned</p>
                </div>
            </div>

            {/* Start Review Button */}
            {stats.dueToday > 0 && (
                <button
                    onClick={onStartReview}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    <Target className="w-5 h-5" />
                    Start Review ({stats.dueToday} due)
                </button>
            )}
        </div>
    );
};

export default SRSStatsComponent;
