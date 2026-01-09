import React from 'react';
import { DrillCategory, DrillItem } from '../types';
import { ChevronRight, LayoutGrid, BookOpen, Sparkles } from 'lucide-react';

interface CategorySelectProps {
  drillType: DrillCategory;
  level: string;
  data: Record<string, Record<string, DrillItem[]>>;
  onSelect: (categoryName: string, items: DrillItem[]) => void;
  onBack: () => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ drillType, level, data, onSelect, onBack }) => {
  const levelData = data[level] || {};
  const categories = Object.keys(levelData);

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-800 font-medium transition-colors">
          ← Back to Dashboard
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Choose a Theme</h2>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">
            {drillType} • {level}
          </p>
        </div>
        <div className="w-20"></div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No categories available for this level yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category, levelData[category])}
              className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-slate-100 hover:border-indigo-100 transition-all duration-500 text-left relative overflow-hidden flex flex-col justify-between min-h-[180px]"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors duration-500">
                  {drillType === DrillCategory.KANJI ? (
                    <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {category}
                </h3>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  {levelData[category].length} items to master
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between relative z-10">
                <div className="flex -space-x-2">
                  {levelData[category].slice(0, 3).map((item, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold jp-font text-slate-600"
                    >
                      {item.character}
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <LayoutGrid className="w-32 h-32 rotate-12" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
