import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Star, Trophy, TrendingUp } from 'lucide-react';
import {
    loadProgress,
    recalculateJLPTMastery,
    getWeeklyXP,
    getXPForLevel,
    getXPForNextLevel,
    getN5OverallProgress,
    ACHIEVEMENT_DEFS,
    type UserProgress,
    type JLPTLevel,
    type SkillMastery,
} from '../services/progressService';

interface ProgressPageProps {
    onBack: () => void;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ onBack }) => {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [weeklyXP, setWeeklyXP] = useState<{ day: string; xp: number }[]>([]);
    const [expandedLevel, setExpandedLevel] = useState<JLPTLevel | null>('N5');

    useEffect(() => {
        const p = loadProgress();
        recalculateJLPTMastery();
        setProgress(loadProgress()); // reload after recalculation
        setWeeklyXP(getWeeklyXP());
    }, []);

    if (!progress) return null;

    const currentLevelXP = getXPForLevel(progress.level);
    const nextLevelXP = getXPForNextLevel(progress.level);
    const xpInLevel = progress.xp - currentLevelXP;
    const xpNeeded = nextLevelXP - currentLevelXP;
    const xpPercent = xpNeeded > 0 ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayXP = progress.dailyXp[todayStr] || 0;
    const n5Overall = getN5OverallProgress();
    const maxWeeklyXP = Math.max(1, ...weeklyXP.map(d => d.xp));

    const jlptLevels: { level: JLPTLevel; status: 'active' | 'locked' | 'coming' }[] = [
        { level: 'N5', status: 'active' },
        { level: 'N4', status: 'locked' },
        { level: 'N3', status: 'coming' },
        { level: 'N2', status: 'coming' },
        { level: 'N1', status: 'coming' },
    ];

    return (
        <div className="animate-fade-in-up pb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-primary transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-heading font-bold text-primary">Progress</h1>
            </div>

            {/* Hero Stats */}
            <div className="neu-card p-6 mb-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-secondary font-medium uppercase tracking-wide">Level</p>
                            <p className="text-2xl font-heading font-bold text-primary">{progress.level}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-secondary font-medium uppercase tracking-wide">Total XP</p>
                            <p className="text-2xl font-heading font-bold text-primary">{progress.xp.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF4757)' }}>
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-secondary font-medium uppercase tracking-wide">Streak</p>
                            <p className="text-2xl font-heading font-bold text-primary">{progress.streak} <span className="text-sm text-secondary">days</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4ECDC4, #2D9CDB)' }}>
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-secondary font-medium uppercase tracking-wide">Today</p>
                            <p className="text-2xl font-heading font-bold text-primary">{todayXP} <span className="text-sm text-secondary">XP</span></p>
                        </div>
                    </div>
                </div>

                {/* XP Progress Bar */}
                <div>
                    <div className="flex justify-between text-xs text-secondary font-medium mb-1.5">
                        <span>Level {progress.level}</span>
                        <span>{xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP</span>
                        <span>Level {progress.level + 1}</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--neu-shadow-dark, #d1d5db)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${xpPercent}%`,
                                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* JLPT Roadmap */}
            <section className="mb-8">
                <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">JLPT Roadmap</h2>

                <div className="space-y-3">
                    {jlptLevels.map(({ level, status }) => {
                        const mastery = progress.jlptMastery[level];
                        const overall = status === 'active'
                            ? Math.round((mastery.kanji + mastery.vocab + mastery.grammar) / 3)
                            : 0;
                        const isExpanded = expandedLevel === level;

                        return (
                            <div key={level} className="neu-card overflow-hidden">
                                <button
                                    className="w-full p-4 flex items-center justify-between text-left"
                                    onClick={() => setExpandedLevel(isExpanded ? null : level)}
                                    disabled={status === 'coming'}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${status === 'active' ? 'bg-accent text-white' :
                                                status === 'locked' ? 'bg-gray-300 dark:bg-gray-600 text-gray-500' :
                                                    'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                            }`}>
                                            {status === 'active' ? '●' : status === 'locked' ? '○' : '○'}
                                        </div>
                                        <div>
                                            <span className="font-heading font-bold text-primary">{level}</span>
                                            {status === 'coming' && (
                                                <span className="ml-2 text-xs text-secondary">(Coming Soon)</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {status !== 'coming' && (
                                            <>
                                                <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'var(--neu-shadow-dark, #d1d5db)' }}>
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${overall}%`,
                                                            background: overall >= 100
                                                                ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                                                                : 'var(--color-accent)',
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-bold text-secondary w-10 text-right">
                                                    {overall}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </button>

                                {/* Expanded skill breakdown */}
                                {isExpanded && status !== 'coming' && (
                                    <div className="px-4 pb-4 pt-1 space-y-3 border-t" style={{ borderColor: 'var(--neu-shadow-dark, #e5e7eb)' }}>
                                        <SkillBar label="Kanji" icon="字" percent={mastery.kanji} />
                                        <SkillBar label="Vocab" icon="語" percent={mastery.vocab} />
                                        <SkillBar label="Grammar" icon="文" percent={mastery.grammar} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Achievements */}
            <section className="mb-8">
                <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
                    Achievements <span className="text-secondary">({progress.achievements.length}/{ACHIEVEMENT_DEFS.length})</span>
                </h2>

                <div className="grid grid-cols-5 gap-3">
                    {ACHIEVEMENT_DEFS.map(a => {
                        const unlocked = progress.achievements.includes(a.id);
                        return (
                            <div
                                key={a.id}
                                className={`neu-card p-3 flex flex-col items-center text-center transition-all ${unlocked ? '' : 'opacity-40 grayscale'
                                    }`}
                                title={`${a.name}: ${a.description}`}
                            >
                                <span className="text-2xl mb-1">{a.icon}</span>
                                <span className="text-[10px] font-bold text-primary leading-tight">{a.name}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Weekly Activity Chart */}
            <section>
                <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Weekly Activity</h2>

                <div className="neu-card p-5">
                    <div className="flex items-end justify-between gap-2" style={{ height: '120px' }}>
                        {weeklyXP.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                <div className="w-full flex flex-col justify-end" style={{ height: '90px' }}>
                                    <div
                                        className="w-full rounded-t-lg transition-all duration-500"
                                        style={{
                                            height: `${d.xp > 0 ? Math.max(8, (d.xp / maxWeeklyXP) * 90) : 4}px`,
                                            background: d.xp > 0
                                                ? 'linear-gradient(180deg, var(--color-accent), var(--color-primary))'
                                                : 'var(--neu-shadow-dark, #d1d5db)',
                                            opacity: d.xp > 0 ? 1 : 0.3,
                                        }}
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-secondary">{d.day}</span>
                            </div>
                        ))}
                    </div>
                    {maxWeeklyXP > 1 && (
                        <p className="text-center text-xs text-secondary mt-3 font-medium">
                            Peak: {maxWeeklyXP} XP
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

// ─── Skill Progress Bar ─────────────────────────────────

const SkillBar: React.FC<{ label: string; icon: string; percent: number }> = ({ label, icon, percent }) => (
    <div className="flex items-center gap-3">
        <span className="text-lg w-6 text-center jp-font">{icon}</span>
        <span className="text-sm font-medium text-primary w-16">{label}</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--neu-shadow-dark, #d1d5db)' }}>
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                    width: `${percent}%`,
                    background: percent >= 100
                        ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                        : 'var(--color-accent)',
                }}
            />
        </div>
        <span className="text-sm font-bold text-secondary w-10 text-right">{percent}%</span>
    </div>
);

export default ProgressPage;
