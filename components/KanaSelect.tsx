import React, { useState } from 'react';
import { DrillItem } from '../types';
import { KANA_DATA } from '../kanaData';
import { ArrowLeft, Check } from 'lucide-react';

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

        const shuffled = selectedItems.sort(() => Math.random() - 0.5).slice(0, limit);
        onStart(shuffled);
    };

    return (
        <div className="max-w-3xl mx-auto pb-28 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="btn-icon"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-heading font-bold text-primary">Kana Select</h1>
                    <p className="text-secondary text-sm">Choose characters to practice</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="glass p-1.5 rounded-2xl flex mb-6">
                {(['HIRAGANA', 'KATAKANA'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            flex-1 py-3 text-sm font-bold rounded-xl transition-all
                            ${activeTab === tab 
                                ? 'gradient-bg text-white shadow-lg' 
                                : 'text-secondary hover:text-primary'
                            }
                        `}
                    >
                        {tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 mb-6">
                {currentData.map((item) => {
                    const isSelected = selectedIds.has(item.character);
                    return (
                        <button
                            key={item.character}
                            onClick={() => toggleSelection(item)}
                            className={`
                                aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200
                                ${isSelected
                                    ? 'gradient-bg text-white shadow-lg scale-95'
                                    : 'glass-card hover:scale-105'
                                }
                            `}
                        >
                            <span className={`text-xl font-bold jp-font mb-0.5 ${isSelected ? 'text-white' : 'text-primary'}`}>
                                {item.character}
                            </span>
                            <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-white/70' : 'text-muted'}`}>
                                {item.primaryReading}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mb-6">
                <button 
                    onClick={selectAll} 
                    className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                    Select All
                </button>
                <span className="text-border">|</span>
                <button 
                    onClick={clearSelection} 
                    className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
                >
                    Clear
                </button>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="glass-strong rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Limit</span>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="input-glass py-2 px-3 text-sm w-20"
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
                        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Practice
                        {selectedIds.size > 0 && (
                            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">
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
