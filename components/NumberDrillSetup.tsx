import React, { useState } from 'react';
import { NumberDrillConfig, NumberDrillDirection } from '../types';
import { NUMBER_RANGE_PRESETS } from '../numberData';
import { ArrowLeft, ArrowRight, Hash, Languages } from 'lucide-react';

interface NumberDrillSetupProps {
    onStart: (config: NumberDrillConfig) => void;
    onBack: () => void;
}

const NumberDrillSetup: React.FC<NumberDrillSetupProps> = ({ onStart, onBack }) => {
    const [direction, setDirection] = useState<NumberDrillDirection>('jp-to-num');
    const [selectedPreset, setSelectedPreset] = useState(1); // Default to 1-100
    const [customMin, setCustomMin] = useState('1');
    const [customMax, setCustomMax] = useState('100');
    const [isCustom, setIsCustom] = useState(false);
    const [itemCount, setItemCount] = useState(20);

    const handleStart = () => {
        let minRange: number, maxRange: number;

        if (isCustom) {
            minRange = Math.max(1, parseInt(customMin) || 1);
            maxRange = Math.min(999999, parseInt(customMax) || 100);
            if (minRange > maxRange) {
                [minRange, maxRange] = [maxRange, minRange];
            }
        } else {
            const preset = NUMBER_RANGE_PRESETS[selectedPreset];
            minRange = preset.min;
            maxRange = preset.max;
        }

        onStart({
            direction,
            minRange,
            maxRange,
            itemCount: Math.min(itemCount, maxRange - minRange + 1),
        });
    };

    return (
        <div className="animate-fade-in-up max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-primary">Numbers</h1>
                    <p className="text-sm text-secondary">Practice Japanese numbers</p>
                </div>
            </div>

            {/* Direction Toggle */}
            <div className="glass-card p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Direction</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setDirection('jp-to-num')}
                        className={`p-4 rounded-xl border-2 transition-all ${direction === 'jp-to-num'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-lg font-bold jp-font">一</span>
                            <ArrowRight className="w-4 h-4 text-secondary" />
                            <Hash className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-xs font-medium text-secondary">Japanese → Number</p>
                    </button>
                    <button
                        onClick={() => setDirection('num-to-jp')}
                        className={`p-4 rounded-xl border-2 transition-all ${direction === 'num-to-jp'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Hash className="w-5 h-5 text-primary" />
                            <ArrowRight className="w-4 h-4 text-secondary" />
                            <Languages className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-xs font-medium text-secondary">Number → Japanese</p>
                    </button>
                </div>
            </div>

            {/* Range Selection */}
            <div className="glass-card p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Range</h2>

                {/* Preset buttons */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {NUMBER_RANGE_PRESETS.map((preset, index) => (
                        <button
                            key={preset.label}
                            onClick={() => {
                                setSelectedPreset(index);
                                setIsCustom(false);
                            }}
                            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${!isCustom && selectedPreset === index
                                ? 'bg-accent text-white ring-2 ring-accent ring-offset-2'
                                : 'bg-surface text-primary hover:bg-border/50'
                                }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

                {/* Custom toggle */}
                <button
                    onClick={() => setIsCustom(!isCustom)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all mb-4 ${isCustom
                        ? 'bg-accent text-white'
                        : 'bg-surface text-secondary hover:bg-border/50'
                        }`}
                >
                    Custom Range
                </button>

                {/* Custom inputs */}
                {isCustom && (
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={customMin}
                            onChange={(e) => setCustomMin(e.target.value)}
                            min={1}
                            max={999999}
                            className="flex-1 bg-surface text-primary text-center font-bold py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="Min"
                        />
                        <span className="text-secondary font-medium">to</span>
                        <input
                            type="number"
                            value={customMax}
                            onChange={(e) => setCustomMax(e.target.value)}
                            min={1}
                            max={999999}
                            className="flex-1 bg-surface text-primary text-center font-bold py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="Max"
                        />
                    </div>
                )}
            </div>

            {/* Item Count */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Questions</h2>
                <div className="flex items-center gap-3">
                    {[10, 20, 30, 50].map((count) => (
                        <button
                            key={count}
                            onClick={() => setItemCount(count)}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${itemCount === count
                                ? 'bg-accent text-white ring-2 ring-accent ring-offset-2'
                                : 'bg-surface text-primary hover:bg-border/50'
                                }`}
                        >
                            {count}
                        </button>
                    ))}
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={handleStart}
                className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transition-all flex items-center justify-center shadow-lg shadow-accent/20"
            >
                Start Practice <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    );
};

export default NumberDrillSetup;
