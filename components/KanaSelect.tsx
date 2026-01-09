
import React, { useState } from 'react';
import { HIRAGANA_CHART, KATAKANA_CHART, KANA_MAPPING } from '../kanaData';
import { DrillItem } from '../types';
import { Check, ArrowRight, RotateCcw, Play } from 'lucide-react';

interface KanaSelectProps {
  onStart: (items: DrillItem[]) => void;
  onBack: () => void;
}

const KanaSelect: React.FC<KanaSelectProps> = ({ onStart, onBack }) => {
  const [tab, setTab] = useState<'HIRAGANA' | 'KATAKANA'>('HIRAGANA');
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());
  const [limit, setLimit] = useState<number | 'ALL'>('ALL');

  const currentChart = tab === 'HIRAGANA' ? HIRAGANA_CHART : KATAKANA_CHART;

  const toggleChar = (char: string) => {
    if (!char) return;
    const newSet = new Set(selectedChars);
    if (newSet.has(char)) {
      newSet.delete(char);
    } else {
      newSet.add(char);
    }
    setSelectedChars(newSet);
  };

  const selectAll = (chart: string[][]) => {
    const newSet = new Set(selectedChars);
    chart.flat().forEach(c => {
      if(c) newSet.add(c);
    });
    setSelectedChars(newSet);
  };

  const clearSelection = () => {
    setSelectedChars(new Set());
  };

  const handleStart = () => {
    let items: DrillItem[] = Array.from(selectedChars).map((char: string): DrillItem => ({
      character: char,
      primaryReading: KANA_MAPPING[char] || '',
      meaning: `Sound "${KANA_MAPPING[char]}"`
    }));
    
    // Shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    // Slice based on limit
    if (limit !== 'ALL') {
      items = items.slice(0, limit);
    }
    
    onStart(items);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-40">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Select Kana</h2>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-2xl inline-flex shadow-inner">
          <button 
            onClick={() => setTab('HIRAGANA')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${tab === 'HIRAGANA' ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Hiragana
          </button>
          <button 
             onClick={() => setTab('KATAKANA')}
             className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${tab === 'KATAKANA' ? 'bg-white text-pink-600 shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Katakana
          </button>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100 mb-8">
        <div className="grid grid-cols-5 gap-3 md:gap-4 mb-6">
          {currentChart.map((row, rIdx) => (
             <React.Fragment key={rIdx}>
               {row.map((char, cIdx) => (
                 <div key={`${rIdx}-${cIdx}`} className="aspect-square">
                   {char ? (
                     <button
                       onClick={() => toggleChar(char)}
                       className={`w-full h-full rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold jp-font transition-all duration-200 border-2
                         ${selectedChars.has(char) 
                           ? (tab === 'HIRAGANA' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-105' : 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-200 transform scale-105')
                           : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100 hover:border-slate-200'
                         }
                       `}
                     >
                       {char}
                       {selectedChars.has(char) && (
                         <div className="absolute top-1 right-1 md:top-2 md:right-2">
                           <div className="bg-white/30 rounded-full p-0.5">
                             <Check className="w-3 h-3 text-white" />
                           </div>
                         </div>
                       )}
                     </button>
                   ) : (
                     <div className="w-full h-full" /> 
                   )}
                 </div>
               ))}
             </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-6">
          <button 
            onClick={() => selectAll(currentChart)}
            className="px-6 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold text-sm transition-colors"
          >
            Select All {tab === 'HIRAGANA' ? 'Hiragana' : 'Katakana'}
          </button>
           <button 
            onClick={clearSelection}
            className="px-6 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold text-sm transition-colors flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Clear
          </button>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className={`fixed bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto max-w-2xl flex flex-col md:flex-row items-center gap-4 bg-white/90 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl border border-slate-200 z-50 transition-transform duration-500 ${selectedChars.size > 0 ? 'translate-y-0' : 'translate-y-48'}`}>
        
        {/* Limit Selector */}
        <div className="bg-slate-100 p-1.5 rounded-full flex items-center shadow-inner w-full md:w-auto justify-between">
          {[10, 20, 'ALL'].map((opt) => (
            <button
              key={opt}
              onClick={() => setLimit(opt as number | 'ALL')}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 min-w-[80px] ${
                limit === opt 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {opt === 'ALL' ? 'All' : opt}
            </button>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="bg-slate-900 text-white pl-8 pr-6 py-4 rounded-full shadow-xl shadow-slate-300 flex items-center space-x-3 hover:scale-105 hover:bg-slate-800 transition-all duration-300 w-full md:w-auto justify-center group"
        >
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{selectedChars.size} Selected</span>
             <span className="text-base font-bold">
              Start Practice
            </span>
          </div>
          <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
             <Play className="w-4 h-4 fill-current" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default KanaSelect;
