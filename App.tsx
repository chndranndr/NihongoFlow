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

    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [srsDueCount, setSrsDueCount] = useState(0);

    // Achievement State
    const [achievementToastId, setAchievementToastId] = useState<string | null>(null);
    const [achievementQueue, setAchievementQueue] = useState<string[]>([]);

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

    useEffect(() => {
        const handler = (e: Event) => {
            const ids = (e as CustomEvent<string[]>).detail;
            handleAchievementUnlock(ids);
        };
        window.addEventListener('kita-achievement', handler);
        return () => window.removeEventListener('kita-achievement', handler);
    }, [handleAchievementUnlock]);

    // Drill Config State
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
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#020617');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('kita-theme', 'light');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F1F5F9');
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
        <div className="min-h-screen pb-8">
            <AchievementToast
                achievementId={achievementToastId}
                onDismiss={handleToastDismiss}
            />

            <ApiKeyModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            {/* Header */}
            {mode === AppMode.DASHBOARD && (
                <header className="sticky top-0 z-50 glass-strong">
                    <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
                        <button
                            className="flex items-center gap-3 group"
                            onClick={() => setMode(AppMode.DASHBOARD)}
                        >
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                                <Languages className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-heading font-bold text-xl gradient-text">キタ</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
                                    className="appearance-none btn-secondary text-sm font-medium py-2.5 pl-4 pr-10 cursor-pointer"
                                >
                                    {Object.values(DifficultyLevel).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <button
                                onClick={toggleDarkMode}
                                className="btn-icon"
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="btn-icon"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-5 pt-6">
                {mode === AppMode.DASHBOARD && (
                    <div className="animate-fade-in-up space-y-10">
                        {/* Hero */}
                        <div className="text-center py-4">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                                鍛えよう。
                            </h1>
                            <p className="text-sm text-secondary font-medium tracking-widest uppercase">
                                Kitaeyou — Let's Train
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
                                    className="w-full glass-card p-5 text-left group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                                                <Trophy className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Level {prog.level}</span>
                                                    {prog.streak > 0 && (
                                                        <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                                                            <Flame className="w-3.5 h-3.5" />
                                                            {prog.streak}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xl font-heading font-bold text-primary">{prog.xp.toLocaleString()} XP</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden bg-surface mb-2">
                                        <div 
                                            className="h-full rounded-full gradient-bg transition-all duration-700" 
                                            style={{ width: `${pct}%` }} 
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted font-medium">
                                        <span>N5 Progress: {n5p}%</span>
                                        <span>{Math.round(pct)}% to Level {prog.level + 1}</span>
                                    </div>
                                </button>
                            );
                        })()}

                        {/* Practice Section */}
                        <section>
                            <h2 className="section-title">Practice</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <PracticeCard
                                    icon={<span className="text-2xl font-bold jp-font">あ</span>}
                                    title="Kana"
                                    subtitle="Hiragana & Katakana"
                                    onClick={handleStartKana}
                                />
                                <PracticeCard
                                    icon={<span className="text-2xl font-bold jp-font">字</span>}
                                    title="Kanji"
                                    subtitle={selectedLevel.split(' ')[0] + ' level'}
                                    onClick={handleStartKanji}
                                />
                                <PracticeCard
                                    icon={<span className="text-2xl font-bold jp-font">語</span>}
                                    title="Vocabulary"
                                    subtitle="Essential words"
                                    onClick={handleStartVocab}
                                />
                                <PracticeCard
                                    icon={<Hash className="w-6 h-6" />}
                                    title="Numbers"
                                    subtitle="1 to 1,000,000"
                                    onClick={handleStartNumberDrill}
                                />
                                <PracticeCard
                                    icon={<Calendar className="w-6 h-6" />}
                                    title="Dates"
                                    subtitle="Days & full dates"
                                    onClick={handleStartDateDrill}
                                />
                                <PracticeCard
                                    icon={<RefreshCw className="w-6 h-6" />}
                                    title="Conjugation"
                                    subtitle="Verbs & adjectives"
                                    onClick={handleStartConjugationDrill}
                                />
                            </div>
                        </section>

                        {/* SRS Section */}
                        <section>
                            <h2 className="section-title">Spaced Repetition</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <FeatureCard
                                    icon={<Brain className="w-6 h-6" />}
                                    title="SRS Review"
                                    subtitle={srsDueCount > 0 ? `${srsDueCount} cards due` : 'All caught up!'}
                                    variant="primary"
                                    onClick={handleStartSRSReview}
                                />
                                <FeatureCard
                                    icon={<BarChart3 className="w-6 h-6" />}
                                    title="Statistics"
                                    subtitle="Track progress"
                                    variant="secondary"
                                    onClick={handleStartSRSStats}
                                />
                            </div>
                        </section>

                        {/* Learn Section */}
                        <section>
                            <h2 className="section-title">Learn</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <FeatureCard
                                    icon={<Book className="w-6 h-6" />}
                                    title="Grammar"
                                    subtitle="Structured lessons"
                                    variant="secondary"
                                    onClick={handleStartGrammarLibrary}
                                />
                                <FeatureCard
                                    icon={<Sparkles className="w-6 h-6" />}
                                    title="AI Lab"
                                    subtitle="Infinite lessons"
                                    variant="gradient"
                                    onClick={handleStartAIGrammar}
                                />
                                <FeatureCard
                                    icon={<Film className="w-6 h-6" />}
                                    title="Video Study"
                                    subtitle="Learn from videos"
                                    variant="gradient-purple"
                                    onClick={handleStartVideoStudy}
                                    className="col-span-2"
                                />
                            </div>
                        </section>

                        {/* Tools Section */}
                        <section>
                            <h2 className="section-title">Tools</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <FeatureCard
                                    icon={<MessageCircle className="w-6 h-6" />}
                                    title="Kaiwa AI"
                                    subtitle="Conversation practice"
                                    variant="gradient"
                                    onClick={handleStartKaiwa}
                                />
                                <FeatureCard
                                    icon={<ScanLine className="w-6 h-6" />}
                                    title="Image Analyzer"
                                    subtitle="Scan & translate"
                                    variant="gradient-teal"
                                    onClick={handleStartImageAnalyzer}
                                />
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
            <footer className="py-10 text-center">
                <button
                    onClick={() => setMode(AppMode.ABOUT)}
                    className="inline-flex items-center gap-2 text-xs text-muted font-medium hover:text-primary transition-colors"
                >
                    <Info className="w-4 h-4" />
                    About キタ
                </button>
            </footer>
        </div>
    );
};

// --- Sub Components ---

interface PracticeCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ icon, title, subtitle, onClick }) => (
    <button
        onClick={onClick}
        className="glass-card p-5 text-left group flex flex-col items-center text-center gap-3"
    >
        <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-primary transition-transform group-hover:scale-110">
            {icon}
        </div>
        <div>
            <h3 className="font-heading font-semibold text-primary mb-0.5">{title}</h3>
            <p className="text-xs text-muted">{subtitle}</p>
        </div>
    </button>
);

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    variant: 'primary' | 'secondary' | 'gradient' | 'gradient-purple' | 'gradient-teal';
    onClick: () => void;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle, variant, onClick, className = '' }) => {
    const variantStyles = {
        primary: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white',
        secondary: 'glass-card text-primary',
        gradient: 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white',
        'gradient-purple': 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
        'gradient-teal': 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white',
    };

    const isGlass = variant === 'secondary';

    return (
        <button
            onClick={onClick}
            className={`p-5 text-left group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${variantStyles[variant]} ${className}`}
        >
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${isGlass ? 'bg-surface' : 'bg-white/20 backdrop-blur'}`}>
                        {React.cloneElement(icon as React.ReactElement, { 
                            className: `w-5 h-5 ${isGlass ? 'text-primary' : 'text-white'}` 
                        })}
                    </div>
                    <h3 className={`font-heading font-semibold mb-0.5 ${isGlass ? 'text-primary' : 'text-white'}`}>{title}</h3>
                    <p className={`text-xs ${isGlass ? 'text-muted' : 'text-white/70'}`}>{subtitle}</p>
                </div>
                <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${isGlass ? 'text-muted' : 'text-white/60'}`} />
            </div>
        </button>
    );
};

export default App;
