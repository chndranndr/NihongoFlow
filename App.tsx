import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { AppMode, DrillCategory, DifficultyLevel, DrillItem } from './types';
import { KANJI_DATA } from './kanjiData';
import { VOCAB_DATA } from './vocabData';
import { getApiKey } from './services/geminiService';
import DrillMode from './components/DrillMode';
import KanaSelect from './components/KanaSelect';
import CategorySelect from './components/CategorySelect';
import CategoryDetail from './components/CategoryDetail';
import GrammarLibrary from './components/GrammarLibrary';
import AIGrammarMode from './components/AIGrammarMode';
import KaiwaMode from './components/KaiwaMode';
import ImageAnalyzer from './components/ImageAnalyzer';
import ApiKeyModal from './components/ApiKeyModal';
import { Book, Languages, Sparkles, ArrowRight, MessageCircle, Settings, ScanLine, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
    const [selectedDrill, setSelectedDrill] = useState<DrillCategory>(DrillCategory.KANA);
    const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
    const [activeDrillItems, setActiveDrillItems] = useState<DrillItem[]>([]);

    // State for Category Detail View
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

    // Settings Modal State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

    const currentLevelKey = selectedLevel.split(' ')[0].toUpperCase();

    return (
        <div className="min-h-screen bg-white">

            <ApiKeyModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            {/* Header - Minimal */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 group"
                        onClick={() => setMode(AppMode.DASHBOARD)}
                    >
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Languages className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-primary tracking-tight">NihongoFlow</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
                                className="appearance-none bg-surface text-sm font-semibold text-secondary rounded-xl pl-4 pr-9 py-2 cursor-pointer hover:bg-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
                            >
                                {Object.values(DifficultyLevel).map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="w-9 h-9 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface rounded-xl transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">

                {mode === AppMode.DASHBOARD && (
                    <div className="animate-fade-in-up">

                        {/* Hero - Clean & Simple */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
                                日本語
                            </h1>
                            <p className="text-lg text-secondary max-w-md mx-auto font-medium">
                                Master Japanese through focused practice
                            </p>
                        </div>

                        {/* Practice Section */}
                        <section className="mb-16">
                            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">Practice</h2>

                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Kana */}
                                <button
                                    onClick={handleStartKana}
                                    className="group text-left p-6 bg-white border border-border rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                                        <span className="text-xl font-bold text-primary jp-font">あ</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-1">Kana</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Hiragana & Katakana</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Kanji */}
                                <button
                                    onClick={handleStartKanji}
                                    className="group text-left p-6 bg-white border border-border rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                                        <span className="text-xl font-bold text-primary jp-font">字</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-1">Kanji</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">{selectedLevel.split(' ')[0]} level</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                {/* Vocab */}
                                <button
                                    onClick={handleStartVocab}
                                    className="group text-left p-6 bg-white border border-border rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                                        <span className="text-xl font-bold text-primary jp-font">語</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-1">Vocabulary</h3>
                                    <p className="text-sm text-secondary font-medium mb-4">Essential words</p>
                                    <div className="flex items-center text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Learn Section */}
                        <section className="mb-16">
                            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">Learn</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Grammar Library */}
                                <button
                                    onClick={handleStartGrammarLibrary}
                                    className="group text-left p-6 bg-surface border border-transparent rounded-2xl hover:bg-white hover:border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Book className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-bold text-primary mb-1">Grammar</h3>
                                            <p className="text-sm text-secondary font-medium">Structured lessons</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* AI Lab */}
                                <button
                                    onClick={handleStartAIGrammar}
                                    className="group text-left p-6 bg-primary rounded-2xl hover:bg-primary/90 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-1">AI Lab</h3>
                                            <p className="text-sm text-white/60 font-medium">Infinite lessons</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Tools Section */}
                        <section>
                            <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-6">Tools</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Kaiwa */}
                                <button
                                    onClick={handleStartKaiwa}
                                    className="group text-left p-6 bg-primary rounded-2xl hover:bg-primary/90 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <MessageCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-1">Kaiwa AI</h3>
                                            <p className="text-sm text-white/60 font-medium">Conversation practice</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                                    </div>
                                </button>

                                {/* Image Analyzer */}
                                <button
                                    onClick={handleStartImageAnalyzer}
                                    className="group text-left p-6 bg-primary rounded-2xl hover:bg-primary/90 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <ScanLine className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-1">Image Analyzer</h3>
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

            </main>

            {/* Footer - Minimal */}
            <footer className="py-12 text-center">
                <p className="text-xs text-secondary font-medium tracking-wide">NihongoFlow</p>
            </footer>
        </div>
    );
};

export default App;
