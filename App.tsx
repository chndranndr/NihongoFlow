import React, { useState } from 'react';
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
import { BrainCircuit, Book, Type, Languages, Sparkles, ArrowRight, Zap, MessageCircle, Settings, ScanLine } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [selectedDrill, setSelectedDrill] = useState<DrillCategory>(DrillCategory.KANA);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const [activeDrillItems, setActiveDrillItems] = useState<DrillItem[]>([]);
  
  // State for Category Detail View
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  
  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    // Instead of starting drill immediately, we show the detail view
    setSelectedCategoryName(categoryName);
    setActiveDrillItems(items); // Store the full list
    setMode(AppMode.CATEGORY_DETAIL);
  };

  const handleStartDrillFromDetail = (subsetItems: DrillItem[]) => {
    setActiveDrillItems(subsetItems);
    setMode(AppMode.DRILL);
  };

  const handleStartGrammarLibrary = () => {
    setMode(AppMode.GRAMMAR_LIBRARY);
  };

  // AI Logic Check
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      
      <ApiKeyModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {/* Header */}
      <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setMode(AppMode.DASHBOARD)}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Nihongo<span className="text-indigo-600">Flow</span></span>
          </div>
          
          <div className="flex items-center space-x-4">
             <select 
               value={selectedLevel}
               onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
               className="bg-slate-100 border-none text-sm font-bold text-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:bg-slate-200 transition-all hidden md:block"
             >
               {Object.values(DifficultyLevel).map(level => (
                 <option key={level} value={level}>{level}</option>
               ))}
             </select>

             <button 
               onClick={() => setIsSettingsOpen(true)}
               className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
               title="API Settings"
             >
               <Settings className="w-6 h-6" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {mode === AppMode.DASHBOARD && (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* Hero Section */}
            <div className="text-center space-y-4 py-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Master Japanese with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">Pure Flow</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Elegance meets efficiency. Focused drills designed for mastery through repetition.
              </p>
              
              {/* Mobile Level Select */}
               <div className="md:hidden pt-4">
                 <select 
                   value={selectedLevel}
                   onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
                   className="bg-white border border-slate-200 text-sm font-bold text-slate-600 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                   {Object.values(DifficultyLevel).map(level => (
                     <option key={level} value={level}>{level}</option>
                   ))}
                 </select>
               </div>
            </div>

            {/* Drill Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Kana */}
              <button 
                onClick={handleStartKana}
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                   <Type className="w-32 h-32 text-indigo-500 rotate-12" />
                </div>
                <div className="bg-indigo-50 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl font-bold text-indigo-600 jp-font">あ</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Kana</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Master the foundation of reading. Hiragana and Katakana charts.</p>
                <div className="mt-8 flex items-center text-indigo-600 font-bold text-sm">
                  Practice Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>

              {/* Kanji */}
              <button 
                onClick={handleStartKanji}
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 hover:border-pink-100 transition-all duration-500 hover:-translate-y-2 text-left overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                   <Book className="w-32 h-32 text-pink-500 -rotate-12" />
                </div>
                <div className="bg-pink-50 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl font-bold text-pink-600 jp-font">字</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Kanji</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Thematic character drills for {selectedLevel.split(' ')[0]} level.</p>
                <div className="mt-8 flex items-center text-pink-600 font-bold text-sm">
                  Choose Theme <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>

              {/* Vocab */}
              <button 
                onClick={handleStartVocab}
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 hover:border-emerald-100 transition-all duration-500 hover:-translate-y-2 text-left overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                   <Sparkles className="w-32 h-32 text-emerald-500" />
                </div>
                <div className="bg-emerald-50 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl font-bold text-emerald-600 jp-font">語</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Vocab</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Essential vocabulary grouped by categories for better recall.</p>
                 <div className="mt-8 flex items-center text-emerald-600 font-bold text-sm">
                  Choose Theme <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </div>

            {/* AI Section (2 Rows) */}
            <div className="space-y-8">
              {/* Row 1: Grammar & Kaiwa */}
              <div className="grid md:grid-cols-2 gap-8">
                <button 
                  onClick={handleStartGrammarLibrary}
                  className="group bg-slate-900 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                        <Book className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Grammar Library</h3>
                    <p className="text-slate-400 text-sm mb-10 font-medium leading-relaxed">
                      Structured grammar foundations.
                    </p>
                    <span className="inline-flex items-center text-slate-900 font-bold text-sm bg-white px-6 py-3 rounded-2xl group-hover:bg-slate-100 transition-colors shadow-lg">
                      Browse
                    </span>
                  </div>
                </button>

                <button 
                  onClick={handleStartAIGrammar}
                  className="group bg-gradient-to-br from-indigo-600 to-purple-600 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-0 opacity-20 transition-transform duration-1000 group-hover:scale-125">
                    <Zap className="w-64 h-64 text-white rotate-12 -mr-16 -mt-16" />
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">AI Lab</h3>
                    <p className="text-indigo-100 text-sm mb-10 font-medium leading-relaxed">
                      Infinite grammar lessons.
                    </p>
                    <span className="inline-flex items-center text-indigo-600 font-extrabold text-sm bg-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                      Generate
                    </span>
                  </div>
                </button>
              </div>

              {/* Row 2: Kaiwa & Image Analyzer */}
              <div className="grid md:grid-cols-2 gap-8">
                <button 
                  onClick={handleStartKaiwa}
                  className="group bg-gradient-to-br from-emerald-500 to-teal-500 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-0 opacity-20 transition-transform duration-1000 group-hover:scale-125">
                    <MessageCircle className="w-64 h-64 text-white -rotate-12 -mr-16 -mt-16" />
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Kaiwa AI</h3>
                    <p className="text-emerald-100 text-sm mb-10 font-medium leading-relaxed">
                      Conversation in realistic scenarios.
                    </p>
                    <span className="inline-flex items-center text-teal-600 font-extrabold text-sm bg-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                      Chat Now
                    </span>
                  </div>
                </button>

                {/* IMAGE ANALYZER CARD */}
                <button 
                  onClick={handleStartImageAnalyzer}
                  className="group bg-gradient-to-br from-blue-500 to-cyan-500 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-0 opacity-20 transition-transform duration-1000 group-hover:scale-125">
                     <ScanLine className="w-64 h-64 text-white rotate-12 -mr-16 -mt-16" />
                  </div>
                  <div className="relative z-10">
                     <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                        <ScanLine className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Image Analyzer</h3>
                     <p className="text-blue-100 text-sm mb-10 font-medium leading-relaxed">
                       Scan manga, signs, or books.
                     </p>
                     <span className="inline-flex items-center text-blue-600 font-extrabold text-sm bg-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                       Scan Photo
                     </span>
                  </div>
                </button>
              </div>
            </div>
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

      <footer className="mt-20 py-12 text-center text-slate-300 text-sm font-bold tracking-widest uppercase">
        <p>NihongoFlow • Minimalist Mastery</p>
      </footer>
    </div>
  );
};

export default App;
