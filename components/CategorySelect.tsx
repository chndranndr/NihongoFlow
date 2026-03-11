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
    const levelData = data[level] || {};
    const categories = Object.keys(levelData);

    return (
        <div className="max-w-2xl mx-auto pb-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="btn-icon"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-heading font-bold text-primary capitalize">{drillType.toLowerCase()} Categories</h1>
                    <p className="text-secondary text-sm">{categories.length} Topics Available</p>
                </div>
            </div>

            <div className="grid gap-3">
                {categories.map((cat) => {
                    const items = levelData[cat];

                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat, items)}
                            className="group w-full glass-card p-5 text-left flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-heading font-semibold text-primary">{cat}</h3>
                                    <span className="bg-surface text-secondary text-xs font-bold px-2.5 py-1 rounded-lg">
                                        {items.length}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    {items.slice(0, 5).map((item, idx) => (
                                        <span key={idx} className="text-sm text-secondary bg-surface px-2 py-0.5 rounded-lg jp-font">
                                            {item.character}
                                        </span>
                                    ))}
                                    {items.length > 5 && <span className="text-xs text-muted self-end">...</span>}
                                </div>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-secondary group-hover:gradient-bg group-hover:text-white transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </button>
                    );
                })}

                {categories.length === 0 && (
                    <div className="text-center py-12 text-muted">
                        No categories found for this level yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorySelect;
