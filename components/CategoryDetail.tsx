import React, { useState } from 'react';
import { DrillItem, DrillCategory } from '../types';
import { Play, ArrowLeft, Volume2 } from 'lucide-react';
import { speakJapanese } from '../services/ttsService';

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
        <div className="max-w-3xl mx-auto pb-28 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="btn-icon"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-heading font-bold text-primary">{displayName}</h1>
                    <p className="text-secondary text-sm">{items.length} Characters</p>
                </div>
            </div>

            {/* List Preview */}
            <div className="glass-card overflow-hidden mb-6">
                <div className="divide-y divide-border">
                    {items.map((item, idx) => {
                        const isKanji = drillType === DrillCategory.KANJI;
                        const displayReading = isKanji 
                            ? (item.onyomi && item.onyomi.length > 0 ? item.onyomi.join(', ') : item.primaryReading)
                            : item.primaryReading;
                        const spokenText = isKanji && item.onyomi && item.onyomi.length > 0 
                            ? item.onyomi[0] // TTS service will handle romaji conversion
                            : item.character;

                        return (
                            <div
                                key={idx}
                                onClick={() => speakJapanese(spokenText)}
                                className="grid grid-cols-[minmax(5rem,auto)_1fr_1fr_auto] items-center gap-4 px-5 py-4 group hover:bg-primary/10 transition-colors cursor-pointer"
                            >
                                <span className="text-2xl font-bold jp-font text-center text-primary">{item.character}</span>
                                <span className="text-sm font-semibold text-primary">{displayReading}</span>
                                <span className="text-xs text-secondary">{item.meaning}</span>
                                <Volume2 className="w-4 h-4 text-muted group-hover:text-primary shrink-0" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="glass-strong rounded-2xl p-4 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Limit</span>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="input-glass py-2 px-3 text-sm w-20"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={items.length}>All</option>
                        </select>
                    </div>

                    <button
                        onClick={handleStart}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
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
