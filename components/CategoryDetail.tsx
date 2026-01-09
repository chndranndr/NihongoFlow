
import React, { useState } from 'react';
import { DrillItem, DrillCategory } from '../types';
import { ArrowRight, Play, Layers } from 'lucide-react';

interface CategoryDetailProps {
  categoryName: string;
  items: DrillItem[];
  drillType: DrillCategory;
  onStart: (items: DrillItem[]) => void;
  onBack: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ categoryName, items, drillType, onStart, onBack }) => {
  const [limit, setLimit] = useState<number | 'ALL'>('ALL');

  const handleStart = () => {
    // 1. Shuffle
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    
    // 2. Slice
    const subset = limit === 'ALL' ? shuffled : shuffled.slice(0, limit);
    
    onStart(subset);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-32 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium transition-colors">
          ← Back
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">{categoryName}</h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{items.length} Items</span>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Grid Preview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className={`font-bold mb-2 jp-font text-slate-800 ${drillType === DrillCategory.KANJI ? 'text-4xl' : 'text-xl'}`}>
              {item.character}
            </div>
            {drillType === DrillCategory.VOCAB && (
              <div className="text-indigo-600 text-sm font-semibold mb-1">{item.primaryReading}</div>
            )}
            <div className="text-slate-400 text-xs font-medium line-clamp-2">{item.meaning}</div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto max-w-2xl flex flex-col md:flex-row items-center gap-4 bg-white/90 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl border border-slate-200 z-50">
        
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
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Start Drill</span>
            <span className="text-base font-bold">
              {limit === 'ALL' || (typeof limit === 'number' && limit >= items.length) 
                ? `All ${items.length}` 
                : `${limit}`} Questions
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

export default CategoryDetail;
