import React, { useState } from 'react';
import { DrillItem, DrillCategory } from '../types';
import { Play, ArrowLeft, Grid } from 'lucide-react';

interface CategoryDetailProps {
    categoryName: string;
    items: DrillItem[];
    drillType: DrillCategory;
    onStart: (items: DrillItem[]) => void;
    onBack: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ categoryName, items, drillType, onStart, onBack }) => {
    const [limit, setLimit] = useState(10);

    const handleStart = () => {
        const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, limit);
        onStart(shuffled);
    };

    const displayName = categoryName.split('-')[1] || categoryName;

    return (
        <div className="max-w-4xl mx-auto pb-24 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="text-right">
                    <h1 className="text-2xl font-bold text-primary mb-1">{displayName}</h1>
                    <p className="text-secondary text-sm font-medium">{items.length} Characters</p>
                </div>
            </div>

            {/* Grid Preview */}
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm mb-20">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {items.map((item, idx) => (
                        <div key={idx} className="aspect-square bg-surface rounded-xl flex flex-col items-center justify-center group hover:bg-primary hover:text-white transition-colors cursor-default">
                            <span className="text-xl font-bold jp-font mb-1">{item.character}</span>
                            <span className="text-[10px] text-secondary group-hover:text-white/60 font-medium truncate max-w-[90%]">
                                {item.primaryReading}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 flex items-center gap-4 ring-1 ring-black/5">
                    <div className="flex items-center gap-3 pl-2 min-w-fit">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Limit</span>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="bg-surface text-primary font-bold text-sm rounded-lg py-2 pl-3 pr-8 border-none focus:ring-2 focus:ring-accent/20 cursor-pointer hover:bg-border/50 transition-colors appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={items.length}>All</option>
                        </select>
                    </div>

                    <button
                        onClick={handleStart}
                        className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Start Drill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;
