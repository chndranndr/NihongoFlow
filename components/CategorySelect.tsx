import React from 'react';
import { DrillCategory, DrillItem } from '../types';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategorySelectProps {
    drillType: DrillCategory;
    level: string;
    data: Record<string, Record<string, DrillItem[]>>;
    onSelect: (category: string, items: DrillItem[]) => void;
    onBack: () => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ drillType, level, data, onSelect, onBack }) => {
    // Get the data for the specific level (e.g., 'BEGINNER')
    // data is structured as { 'BEGINNER': { 'Adjectives': [...], 'Verbs': [...] } }
    const levelData = data[level] || {};
    const categories = Object.keys(levelData);

    return (
        <div className="max-w-2xl mx-auto pb-20 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div>
                    <h1 className="text-xl font-bold text-primary capitalize">{drillType.toLowerCase()} Categories</h1>
                    <p className="text-secondary text-sm font-medium">{categories.length} Topics Available</p>
                </div>
            </div>

            <div className="grid gap-3">
                {categories.map((cat) => {
                    const items = levelData[cat];

                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat, items)}
                            className="group w-full bg-white p-5 rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all text-left flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-primary">{cat}</h3>
                                    <span className="bg-surface text-secondary text-xs font-bold px-2 py-0.5 rounded-md">
                                        {items.length}
                                    </span>
                                </div>

                                <div className="flex gap-2 opacity-60">
                                    {items.slice(0, 5).map((item, idx) => (
                                        <span key={idx} className="text-sm text-primary bg-surface px-1.5 rounded jp-font">
                                            {item.character}
                                        </span>
                                    ))}
                                    {items.length > 5 && <span className="text-xs text-secondary self-end">...</span>}
                                </div>
                            </div>

                            <div className="bg-surface p-2 rounded-xl group-hover:bg-primary group-hover:text-white text-secondary transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </button>
                    );
                })}

                {categories.length === 0 && (
                    <div className="text-center p-8 text-secondary">
                        No categories found for this level yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorySelect;
