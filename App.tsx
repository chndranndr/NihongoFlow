import React, { useState, useEffect, useCallback } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { AppMode, DrillCategory, DifficultyLevel, DrillItem, NumberDrillConfig, DateDrillConfig, ConjugationDrillConfig } from './types';
import { KANJI_DATA } from './data/kanji';
import { VOCAB_DATA } from './data/vocab';
import { getApiKey } from './services/geminiService';
import { loadCards, calculateStats } from './services/srsService';
import { loadProgress, getXPForLevel, getXPForNextLevel, getN5OverallProgress } from './services/progressService';
import DrillMode from './components/DrillMode';
import KanaSelect from './components/KanaSelect';
import CategorySelect from './components/CategorySelect';
import CategoryDetail from './components/CategoryDetail';
import GrammarLibrary from './components/GrammarLibrary';
import AIGrammarMode from './components/AIGrammarMode';
import KaiwaMode from './components/KaiwaMode';
import ImageAnalyzer from './components/ImageAnalyzer';
import SRSReview from './components/SRSReview';
import SRSStats from './components/SRSStats';
import ProgressPage from './components/ProgressPage';
import AchievementToast from './components/AchievementToast';
import ApiKeyModal from './components/ApiKeyModal';
import NumberDrillSetup from './components/NumberDrillSetup';
import NumberDrillMode from './components/NumberDrillMode';
import DateDrillSetup from './components/DateDrillSetup';
import DateDrillMode from './components/DateDrillMode';
import ConjugationDrillSetup from './components/ConjugationDrillSetup';
import ConjugationDrillMode from './components/ConjugationDrillMode';
import AboutPage from './components/AboutPage';
import VideoStudyMode from './components/VideoStudyMode';
import { Book, Languages, Sparkles, ArrowRight, MessageCircle, Settings, ScanLine, ChevronDown, Brain, BarChart3, Moon, Sun, Hash, Calendar, RefreshCw, Trophy, Flame, Info, Film } from 'lucide-react';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
    const [selectedDrill, setSelectedDrill] = useState<DrillCategory>(DrillCategory.KANA);
    const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
    const [activeDrillItems, setActiveDrillItems] = useState<DrillItem[]>([]);

    // State for Category Detail View
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

    // Settings Modal State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // SRS State
    const [srsDueCount, setSrsDueCount] = useState(0);

    // Gamification State
    const [achievementToastId, setAchievementToastId] = useState<string | null>(null);
    const [achievementQueue, setAchievementQueue] = useState<string[]>([]);

    // Show next achievement from queue
    const showNextAchievement = useCallback(() => {
        setAchievementQueue(q => {
            if (q.length > 0) {
                setAchievementToastId(q[0]);
                return q.slice(1);
            }
            return q;
        });
    }, []);

    const handleAchievementUnlock = useCallback((ids: string[]) => {
        if (ids.length > 0) {
            setAchievementToastId(ids[0]);
            if (ids.length > 1) {
                setAchievementQueue(ids.slice(1));
            }
        }
    }, []);

    const handleToastDismiss = useCallback(() => {
        setAchievementToastId(null);
        setTimeout(showNextAchievement, 300);
    }, [showNextAchievement]);

    // Listen for achievement events from progressService
    useEffect(() => {
        const handler = (e: Event) => {
            const ids = (e as CustomEvent<string[]>).detail;
            handleAchievementUnlock(ids);
        };
        window.addEventListener('kita-achievement', handler);
        return () => window.removeEventListener('kita-achievement', handler);
    }, [handleAchievementUnlock]);

    // Number and Date Drill State
    const [numberDrillConfig, setNumberDrillConfig] = useState<NumberDrillConfig | null>(null);
    const [dateDrillConfig, setDateDrillConfig] = useState<DateDrillConfig | null>(null);
    const [conjugationDrillConfig, setConjugationDrillConfig] = useState<ConjugationDrillConfig | null>(null);

    // Dark Mode State
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    const toggleDarkMode = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('kita-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('kita-theme', 'light');
        }
    };

    // Back Button Handling
    useEffect(() => {
        const backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
            if (mode === AppMode.DASHBOARD) {
                CapacitorApp.exitApp();
            } else if (mode === AppMode.CATEGORY_DETAIL) {
                setMode(AppMode.CATEGORY_SELECT);
            } else {
                setMode(AppMode.DASHBOARD);
            }
        });

        return () => {
            backButtonListener.then(handler => handler.remove());
        };
    }, [mode]);

    // --- Handlers ---

    const handleStartKana = () => {
        setSelectedDrill(DrillCategory.KANA);
        setMode(AppMode.KANA_SELECT);
    };

    const handleKanaSelectionComplete = (items: DrillItem[]) => {
        setActiveDrillItems(items);
        setMode(AppMode.DRILL);
    };

    const handleStartKanji = () => {
        setSelectedDrill(DrillCategory.KANJI);
        setMode(AppMode.CATEGORY_SELECT);
    };

    const handleStartVocab = () => {
        setSelectedDrill(DrillCategory.VOCAB);
        setMode(AppMode.CATEGORY_SELECT);
    };

    const handleCategorySelected = (categoryName: string, items: DrillItem[]) => {
        setSelectedCategoryName(categoryName);
        setActiveDrillItems(items);
        setMode(AppMode.CATEGORY_DETAIL);
    };

    const handleStartDrillFromDetail = (subsetItems: DrillItem[]) => {
        setActiveDrillItems(subsetItems);
        setMode(AppMode.DRILL);
    };

    const handleStartGrammarLibrary = () => {
        setMode(AppMode.GRAMMAR_LIBRARY);
    };

    const checkKeyAndProceed = (targetMode: AppMode) => {
        if (getApiKey()) {
            setMode(targetMode);
        } else {
            setIsSettingsOpen(true);
        }
    };

    const handleStartAIGrammar = () => {
        checkKeyAndProceed(AppMode.AI_GRAMMAR);
    };

    const handleStartKaiwa = () => {
        checkKeyAndProceed(AppMode.KAIWA);
    };

    const handleStartImageAnalyzer = () => {
        checkKeyAndProceed(AppMode.IMAGE_ANALYZER);
    };

    const handleStartVideoStudy = () => {
        checkKeyAndProceed(AppMode.VIDEO_STUDY);
    };

    const handleStartSRSReview = () => {
        setMode(AppMode.SRS_REVIEW);
    };

    const handleStartSRSStats = () => {
        setMode(AppMode.SRS_STATS);
    };

    const handleStartProgress = () => {
        setMode(AppMode.PROGRESS);
    };

    const handleStartNumberDrill = () => {
        setMode(AppMode.NUMBER_DRILL_SETUP);
    };

    const handleNumberDrillConfig = (config: NumberDrillConfig) => {
        setNumberDrillConfig(config);
        setMode(AppMode.NUMBER_DRILL);
    };

    const handleStartDateDrill = () => {
        setMode(AppMode.DATE_DRILL_SETUP);
    };

    const handleDateDrillConfig = (config: DateDrillConfig) => {
        setDateDrillConfig(config);
        setMode(AppMode.DATE_DRILL);
    };

    const handleStartConjugationDrill = () => {
        setMode(AppMode.CONJUGATION_DRILL_SETUP);
    };

    const handleConjugationDrillConfig = (config: ConjugationDrillConfig) => {
        setConjugationDrillConfig(config);
        setMode(AppMode.CONJUGATION_DRILL);
    };

    // Load SRS due count when on dashboard
    useEffect(() => {
        if (mode === AppMode.DASHBOARD) {
            const cards = loadCards();
            const stats = calculateStats(cards);
            setSrsDueCount(stats.dueToday);
        }
    }, [mode]);

    const currentLevelKey = selectedLevel.split(' ')[0].toUpperCase();

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>

            <AchievementToast
                achievementId={achievementToastId}
                onDismiss={handleToastDismiss}
            />

            <ApiKeyModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            {/* Header - Only on Dashboard */}
            {mode === AppMode.DASHBOARD && (
                <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-color)' }}>
                    <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                        <button
                            className="flex items-center gap-2 group"
                            onClick={() => setMode(AppMode.DASHBOARD)}
                        >
                            <div className="w-9 h-9 neu-btn flex items-center justify-center group-hover:glow-primary transition-all" style={{ background: 'var(--color-primary)' }}>
                                <Languages className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-heading font-bold text-xl text-primary tracking-tight neon-text-subtle">キタ</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
                                    className="appearance-none neu-btn text-sm font-semibold text-primary rounded-xl pl-4 pr-9 py-2.5 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-accent/30"
                                    style={{ background: 'var(--bg-color)' }}
                                >
                                    {Object.values(DifficultyLevel).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <button
                                onClick={toggleDarkMode}
                                className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-accent transition-all"
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-primary transition-all"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">

                {mode === AppMode.DASHBOARD && (
                    <div className="animate-fade-in-up">

                        {/* Hero */}
                        <div className="text-center mb-10">
                            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary tracking-tight mb-3 neon-text-subtle">
                                鍛えよう。
                            </h1>
                            <p className="text-base text-secondary max-w-md mx-auto font-medium tracking-widest uppercase">
                                Kitaeyou.
                            </p>
                        </div>

                        {/* Progress Banner */}
                        {(() => {
                            const prog = loadProgress();
                            const currentXP = getXPForLevel(prog.level);
                            const nextXP = getXPForNextLevel(prog.level);
                            const pct = nextXP > currentXP ? Math.min(100, ((prog.xp - currentXP) / (nextXP - currentXP)) * 100) : 100;
                            const n5p = getN5OverallProgress();
                            return (
                                <button
                                    onClick={handleStartProgress}
                                    className="w-full mb-10 p-5 rounded-2xl text-left group transition-all duration-300 hover:shadow-glow-sm"
                                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Lv.{prog.level}</span>
                                                <span className="text-white font-heading font-bold ml-2">{prog.xp.toLocaleString()} XP</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {prog.streak > 0 && (
                                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2.5 py-1 rounded-lg">
                                                    <Flame className="w-4 h-4 text-orange-300" />
                                                    <span className="text-white text-sm font-bold">{prog.streak}</span>
                                                </div>
                                            )}
                                            <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden bg-white/20 mb-1.5">
                                        <div className="h-full rounded-full bg-white/80 transition-all duration-700" style={{ width: `${pct}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/50 font-medium">
                                        <span>N5 Progress: {n5p}%</span>
                                        <span>View Progress →</span>
                                    </div>
                                </button>
                            );
                        })()}

                        {/* Practice Section */}
                        <section className="mb-16">
                            <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">Practice</h2>

                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Kana */}
                                <button
                                    onClick={handleStartKana}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <span className="text-xl font-bold text-primary jp-font">あ</span>
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Kana</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Hiragana & Katakana</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Kanji */}
                                <button
                                    onClick={handleStartKanji}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <span className="text-xl font-bold text-primary jp-font">字</span>
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Kanji</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">{selectedLevel.split(' ')[0]} level</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Vocab */}
                                <button
                                    onClick={handleStartVocab}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <span className="text-xl font-bold text-primary jp-font">語</span>
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Vocabulary</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Essential words</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Numbers */}
                                <button
                                    onClick={handleStartNumberDrill}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <Hash className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Numbers</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">1 to 1,000,000</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Dates */}
                                <button
                                    onClick={handleStartDateDrill}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <Calendar className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Dates</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Days & full dates</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Conjugation */}
                                <button
                                    onClick={handleStartConjugationDrill}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="w-12 h-12 neu-btn rounded-xl flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                                        <RefreshCw className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-primary mb-1">Conjugation</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Verbs & adjectives</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* SRS Section */}
                        <section className="mb-16">
                            <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">Spaced Repetition</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* SRS Review */}
                                <button
                                    onClick={handleStartSRSReview}
                                    className="group text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-glow" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Brain className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-white mb-1">SRS Review</h3>
                                            <p className="text-sm text-white/70 font-medium">
                                                {srsDueCount > 0 ? `${srsDueCount} cards due` : 'All caught up!'}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* SRS Stats */}
                                <button
                                    onClick={handleStartSRSStats}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 neu-btn rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                                                <BarChart3 className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-primary mb-1">Statistics</h3>
                                            <p className="text-sm text-secondary font-medium">Track progress</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Learn Section */}
                        <section className="mb-16">
                            <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">Learn</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Grammar Library */}
                                <button
                                    onClick={handleStartGrammarLibrary}
                                    className="group text-left p-6 neu-card cursor-pointer hover:shadow-glow-sm transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 neu-btn rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                                                <Book className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-primary mb-1">Grammar</h3>
                                            <p className="text-sm text-secondary font-medium">Structured lessons</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* AI Lab */}
                                <button
                                    onClick={handleStartAIGrammar}
                                    className="group text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-glow" style={{ background: 'var(--color-primary)' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-white mb-1">AI Lab</h3>
                                            <p className="text-sm text-white/60 font-medium">Infinite lessons</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* Video Study */}
                                <button
                                    onClick={handleStartVideoStudy}
                                    className="group text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-glow" style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Film className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-white mb-1">Video Study</h3>
                                            <p className="text-sm text-white/60 font-medium">Learn from videos</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Tools Section */}
                        <section>
                            <h2 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">Tools</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Kaiwa */}
                                <button
                                    onClick={handleStartKaiwa}
                                    className="group text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-glow" style={{ background: 'var(--color-primary)' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <MessageCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-white mb-1">Kaiwa AI</h3>
                                            <p className="text-sm text-white/60 font-medium">Conversation practice</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* Image Analyzer */}
                                <button
                                    onClick={handleStartImageAnalyzer}
                                    className="group text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-glow" style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <ScanLine className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-white mb-1">Image Analyzer</h3>
                                            <p className="text-sm text-white/60 font-medium">Scan & translate</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {mode === AppMode.KANA_SELECT && (
                    <KanaSelect
                        onStart={handleKanaSelectionComplete}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.CATEGORY_SELECT && (
                    <CategorySelect
                        drillType={selectedDrill}
                        level={currentLevelKey}
                        data={selectedDrill === DrillCategory.KANJI ? KANJI_DATA : VOCAB_DATA}
                        onSelect={handleCategorySelected}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.CATEGORY_DETAIL && (
                    <CategoryDetail
                        categoryName={selectedCategoryName}
                        items={activeDrillItems}
                        drillType={selectedDrill}
                        onStart={handleStartDrillFromDetail}
                        onBack={() => setMode(AppMode.CATEGORY_SELECT)}
                    />
                )}

                {mode === AppMode.DRILL && (
                    <DrillMode
                        category={selectedDrill}
                        items={activeDrillItems}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.GRAMMAR_LIBRARY && (
                    <GrammarLibrary
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.AI_GRAMMAR && (
                    <AIGrammarMode
                        level={selectedLevel}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.KAIWA && (
                    <KaiwaMode
                        level={selectedLevel}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.IMAGE_ANALYZER && (
                    <ImageAnalyzer
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.SRS_REVIEW && (
                    <SRSReview
                        onBack={() => setMode(AppMode.DASHBOARD)}
                        onViewStats={() => setMode(AppMode.SRS_STATS)}
                    />
                )}

                {mode === AppMode.SRS_STATS && (
                    <SRSStats
                        onBack={() => setMode(AppMode.DASHBOARD)}
                        onStartReview={() => setMode(AppMode.SRS_REVIEW)}
                    />
                )}

                {mode === AppMode.PROGRESS && (
                    <ProgressPage
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.NUMBER_DRILL_SETUP && (
                    <NumberDrillSetup
                        onStart={handleNumberDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.NUMBER_DRILL && numberDrillConfig && (
                    <NumberDrillMode
                        config={numberDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.DATE_DRILL_SETUP && (
                    <DateDrillSetup
                        onStart={handleDateDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.DATE_DRILL && dateDrillConfig && (
                    <DateDrillMode
                        config={dateDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.CONJUGATION_DRILL_SETUP && (
                    <ConjugationDrillSetup
                        onStart={handleConjugationDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.CONJUGATION_DRILL && conjugationDrillConfig && (
                    <ConjugationDrillMode
                        config={conjugationDrillConfig}
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.ABOUT && (
                    <AboutPage
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

                {mode === AppMode.VIDEO_STUDY && (
                    <VideoStudyMode
                        onBack={() => setMode(AppMode.DASHBOARD)}
                    />
                )}

            </main>

            {/* Footer */}
            <footer className="py-12 text-center">
                <button
                    onClick={() => setMode(AppMode.ABOUT)}
                    className="inline-flex items-center gap-1.5 text-xs text-secondary font-medium tracking-wide hover:text-primary transition-colors"
                >
                    <Info className="w-3.5 h-3.5" />
                    About キタ
                </button>
            </footer>
        </div>
    );
};

export default App;
