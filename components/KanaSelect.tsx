import React, { useState } from 'react';
import { DrillItem } from '../types';
import { KANA_DATA } from '../kanaData';
import { Settings, ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';

interface KanaSelectProps {
    onStart: (items: DrillItem[]) => void;
    onBack: () => void;
}

const KanaSelect: React.FC<KanaSelectProps> = ({ onStart, onBack }) => {
    const [activeTab, setActiveTab] = useState<'HIRAGANA' | 'KATAKANA'>('HIRAGANA');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [limit, setLimit] = useState(10);

    const currentData = activeTab === 'HIRAGANA' ? KANA_DATA.HIRAGANA : KANA_DATA.KATAKANA;

    const toggleSelection = (item: DrillItem) => {
        const next = new Set(selectedIds);
        if (next.has(item.character)) {
            next.delete(item.character);
        } else {
            next.add(item.character);
        }
        setSelectedIds(next);
    };

    const selectAll = () => {
        const next = new Set(selectedIds);
        currentData.forEach(item => next.add(item.character));
        setSelectedIds(next);
    };

    const clearSelection = () => {
        const next = new Set(selectedIds);
        currentData.forEach(item => next.delete(item.character));
        setSelectedIds(next);
    };

    const handleStart = () => {
        const selectedItems = [...KANA_DATA.HIRAGANA, ...KANA_DATA.KATAKANA]
            .filter(item => selectedIds.has(item.character));

        // Shuffle and slice
        const shuffled = selectedItems.sort(() => Math.random() - 0.5).slice(0, limit);
        onStart(shuffled);
    };

    return (
        <div className="max-w-4xl mx-auto pb-24 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-secondary hover:text-primary hover:bg-border transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-primary">Kana Select</h1>
                    <p className="text-secondary text-sm font-medium">Choose characters to practice</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-surface p-1 rounded-2xl flex mb-8">
                {(['HIRAGANA', 'KATAKANA'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
              flex-1 py-3 text-sm font-bold rounded-xl transition-all
              ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-secondary hover:text-primary'}
            `}
                    >
                        {tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 mb-8">
                {currentData.map((item) => {
                    const isSelected = selectedIds.has(item.character);
                    return (
                        <button
                            key={item.character}
                            onClick={() => toggleSelection(item)}
                            className={`
                aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 border-2
                ${isSelected
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                                    : 'bg-white border-transparent text-primary hover:border-border hover:bg-surface'
                                }
              `}
                        >
                            <span className="text-xl font-bold jp-font mb-0.5">{item.character}</span>
                            <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-white/60' : 'text-secondary'}`}>
                                {item.primaryReading}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mb-8">
                <button onClick={selectAll} className="text-sm font-bold text-accent hover:text-accent/80 transition-colors">
                    Select All
                </button>
                <span className="text-border">|</span>
                <button onClick={clearSelection} className="text-sm font-bold text-secondary hover:text-primary transition-colors">
                    Clear
                </button>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4 ring-1 ring-black/5">
                    <div className="flex items-center gap-3 pl-2">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Limit</span>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="bg-surface text-primary font-bold text-sm rounded-lg py-1.5 pl-2 pr-6 border-none focus:ring-2 focus:ring-accent/20 cursor-pointer hover:bg-border/50 transition-colors appearance-none"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>All</option>
                        </select>
                    </div>

                    <button
                        onClick={handleStart}
                        disabled={selectedIds.size === 0}
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
                    >
                        Start Practice
                        {selectedIds.size > 0 && (
                            <span className="ml-2 bg-white/20 px-1.5 rounded text-xs">
                                {Math.min(selectedIds.size, limit)}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KanaSelect;
