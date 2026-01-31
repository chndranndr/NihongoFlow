import React, { useState } from 'react';
import { DateDrillConfig, DateDrillDirection, DateDrillMode } from '../types';
import { ArrowLeft, ArrowRight, Calendar, Sun } from 'lucide-react';

interface DateDrillSetupProps {
    onStart: (config: DateDrillConfig) => void;
    onBack: () => void;
}

const DateDrillSetup: React.FC<DateDrillSetupProps> = ({ onStart, onBack }) => {
    const [mode, setMode] = useState<DateDrillMode>('days-of-week');
    const [direction, setDirection] = useState<DateDrillDirection>('jp-to-en');
    const [startYear, setStartYear] = useState('1990');
    const [endYear, setEndYear] = useState('2025');
    const [itemCount, setItemCount] = useState(10);

    const handleStart = () => {
        onStart({
            mode,
            direction,
            startYear: mode === 'full-date' ? parseInt(startYear) : undefined,
            endYear: mode === 'full-date' ? parseInt(endYear) : undefined,
            itemCount: mode === 'days-of-week' ? 7 : itemCount,
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
                    <h1 className="text-2xl font-bold text-primary">Dates & Days</h1>
                    <p className="text-sm text-secondary">Practice Japanese dates</p>
                </div>
            </div>

            {/* Mode Selection */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Practice Mode</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setMode('days-of-week')}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${mode === 'days-of-week'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-3">
                            <Sun className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-primary mb-1">Days of Week</h3>
                        <p className="text-xs text-secondary">月曜日 - 日曜日</p>
                    </button>
                    <button
                        onClick={() => setMode('full-date')}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${mode === 'full-date'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-3">
                            <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-primary mb-1">Full Dates</h3>
                        <p className="text-xs text-secondary">水曜日、十二月一日 1993年</p>
                    </button>
                </div>
            </div>

            {/* Direction Toggle */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Direction</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setDirection('jp-to-en')}
                        className={`p-4 rounded-xl border-2 transition-all ${direction === 'jp-to-en'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-lg font-bold jp-font">日</span>
                            <ArrowRight className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-bold text-primary">EN</span>
                        </div>
                        <p className="text-xs font-medium text-secondary">Japanese → English</p>
                    </button>
                    <button
                        onClick={() => setDirection('en-to-jp')}
                        className={`p-4 rounded-xl border-2 transition-all ${direction === 'en-to-jp'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-sm font-bold text-primary">EN</span>
                            <ArrowRight className="w-4 h-4 text-secondary" />
                            <span className="text-lg font-bold jp-font">日</span>
                        </div>
                        <p className="text-xs font-medium text-secondary">English → Japanese</p>
                    </button>
                </div>
            </div>

            {/* Full Date Options */}
            {mode === 'full-date' && (
                <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Year Range</h2>
                    <div className="flex items-center gap-3 mb-6">
                        <input
                            type="number"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            min={1900}
                            max={2100}
                            className="flex-1 bg-surface text-primary text-center font-bold py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="Start Year"
                        />
                        <span className="text-secondary font-medium">to</span>
                        <input
                            type="number"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            min={1900}
                            max={2100}
                            className="flex-1 bg-surface text-primary text-center font-bold py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="End Year"
                        />
                    </div>

                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Questions</h2>
                    <div className="flex items-center gap-3">
                        {[5, 10, 15, 20].map((count) => (
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
            )}

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

export default DateDrillSetup;
