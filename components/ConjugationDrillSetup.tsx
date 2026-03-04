import React, { useState, useMemo } from 'react';
import { ConjugationDrillConfig, ConjugationWordType, ConjugationVerbType, ConjugationAdjType, ConjugationFormType } from '../types';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { VERB_FORMS, ADJECTIVE_FORMS } from '../conjugationData';
import { VOCAB_N5 } from '../data/vocab/n5';

interface ConjugationDrillSetupProps {
    onStart: (config: ConjugationDrillConfig) => void;
    onBack: () => void;
}

const ConjugationDrillSetup: React.FC<ConjugationDrillSetupProps> = ({ onStart, onBack }) => {
    const [wordType, setWordType] = useState<ConjugationWordType>('verb');
    const [verbTypes, setVerbTypes] = useState<ConjugationVerbType[]>(['godan', 'ichidan', 'irregular']);
    const [adjectiveTypes, setAdjectiveTypes] = useState<ConjugationAdjType[]>(['i-adjective', 'na-adjective']);
    const [selectedForms, setSelectedForms] = useState<ConjugationFormType[]>(['masu', 'te', 'negative']);
    const [itemCount, setItemCount] = useState(10);
    const [showWordList, setShowWordList] = useState(false);

    const toggleVerbType = (type: ConjugationVerbType) => {
        setVerbTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleAdjType = (type: ConjugationAdjType) => {
        setAdjectiveTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleForm = (form: ConjugationFormType) => {
        setSelectedForms(prev =>
            prev.includes(form) ? prev.filter(f => f !== form) : [...prev, form]
        );
    };

    const handleStart = () => {
        if (wordType === 'verb' && verbTypes.length === 0) return;
        if (wordType === 'adjective' && adjectiveTypes.length === 0) return;
        if (selectedForms.length === 0) return;

        onStart({
            wordType,
            verbTypes,
            adjectiveTypes,
            forms: selectedForms,
            itemCount,
        });
    };

    const availableForms = wordType === 'verb' ? VERB_FORMS : ADJECTIVE_FORMS;
    const isValid = (wordType === 'verb' ? verbTypes.length > 0 : adjectiveTypes.length > 0) && selectedForms.length > 0;

    // Compute filtered word list based on selections
    const filteredWords = useMemo(() => {
        const allItems = Object.values(VOCAB_N5).flat();
        if (wordType === 'verb') {
            return allItems.filter(item =>
                item.category === 'verb' && item.verbCategory && item.reading &&
                verbTypes.includes(item.verbCategory as ConjugationVerbType)
            );
        } else {
            return allItems.filter(item =>
                (item.category === 'i-adjective' || item.category === 'na-adjective') && item.reading &&
                adjectiveTypes.includes(item.category as ConjugationAdjType)
            );
        }
    }, [wordType, verbTypes, adjectiveTypes]);

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
                    <h1 className="text-2xl font-bold text-primary">Conjugation</h1>
                    <p className="text-sm text-secondary">Practice verb & adjective forms</p>
                </div>
            </div>

            {/* Word Type Toggle */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Word Type</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            setWordType('verb');
                            setSelectedForms(['masu', 'te', 'negative']);
                        }}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${wordType === 'verb'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-3">
                            <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-primary mb-1">Verbs</h3>
                        <p className="text-xs text-secondary">動詞 - godan, ichidan</p>
                    </button>
                    <button
                        onClick={() => {
                            setWordType('adjective');
                            setSelectedForms(['te', 'negative', 'past']);
                        }}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${wordType === 'adjective'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary/20'
                            }`}
                    >
                        <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-3">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-primary mb-1">Adjectives</h3>
                        <p className="text-xs text-secondary">形容詞 - i-adj, na-adj</p>
                    </button>
                </div>
            </div>

            {/* Verb/Adjective Type Selection */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">
                    {wordType === 'verb' ? 'Verb Types' : 'Adjective Types'}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {wordType === 'verb' ? (
                        <>
                            {([
                                { type: 'godan' as ConjugationVerbType, label: '五段 Godan', desc: 'u-verbs' },
                                { type: 'ichidan' as ConjugationVerbType, label: '一段 Ichidan', desc: 'ru-verbs' },
                                { type: 'irregular' as ConjugationVerbType, label: '不規則 Irregular', desc: 'する・くる' },
                            ]).map(({ type, label, desc }) => (
                                <button
                                    key={type}
                                    onClick={() => toggleVerbType(type)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${verbTypes.includes(type)
                                        ? 'bg-accent text-white'
                                        : 'bg-surface text-primary hover:bg-border/50'
                                        }`}
                                >
                                    {label}
                                    <span className="ml-1 opacity-70 text-xs">({desc})</span>
                                </button>
                            ))}
                        </>
                    ) : (
                        <>
                            {([
                                { type: 'i-adjective' as ConjugationAdjType, label: 'い形容詞', desc: 'i-adj' },
                                { type: 'na-adjective' as ConjugationAdjType, label: 'な形容詞', desc: 'na-adj' },
                            ]).map(({ type, label, desc }) => (
                                <button
                                    key={type}
                                    onClick={() => toggleAdjType(type)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${adjectiveTypes.includes(type)
                                        ? 'bg-accent text-white'
                                        : 'bg-surface text-primary hover:bg-border/50'
                                        }`}
                                >
                                    {label}
                                    <span className="ml-1 opacity-70 text-xs">({desc})</span>
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Form Selection */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Conjugation Forms</h2>
                <div className="grid grid-cols-2 gap-2">
                    {availableForms.map(({ form, label, description }) => (
                        <button
                            key={form}
                            onClick={() => toggleForm(form as ConjugationFormType)}
                            className={`p-3 rounded-xl text-left transition-all ${selectedForms.includes(form as ConjugationFormType)
                                ? 'bg-accent/10 border-2 border-accent'
                                : 'bg-surface border-2 border-transparent hover:border-primary/10'
                                }`}
                        >
                            <div className="font-semibold text-sm text-primary">{label}</div>
                            <div className="text-xs text-secondary">{description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Question Count */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
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

            {/* Word List Preview */}
            <div className="bg-white border border-border rounded-2xl mb-6 overflow-hidden">
                <button
                    onClick={() => setShowWordList(!showWordList)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-surface/50 transition-colors"
                >
                    <div>
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-widest">Word List</h2>
                        <p className="text-xs text-secondary mt-1">{filteredWords.length} words selected</p>
                    </div>
                    {showWordList ? (
                        <ChevronUp className="w-5 h-5 text-secondary" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-secondary" />
                    )}
                </button>

                {showWordList && (
                    <div className="border-t border-border max-h-64 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-surface sticky top-0">
                                <tr>
                                    <th className="text-left px-4 py-2 font-semibold text-secondary">Kanji</th>
                                    <th className="text-left px-4 py-2 font-semibold text-secondary">Reading</th>
                                    <th className="text-left px-4 py-2 font-semibold text-secondary">Meaning</th>
                                    <th className="text-left px-4 py-2 font-semibold text-secondary">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWords.map((item, idx) => {
                                    const typeKey = wordType === 'verb' ? item.verbCategory : item.category;
                                    return (
                                        <tr key={idx} className="border-t border-border/50 hover:bg-surface/30">
                                            <td className="px-4 py-2 jp-font text-primary font-medium">{item.character}</td>
                                            <td className="px-4 py-2 jp-font text-secondary">{item.reading}</td>
                                            <td className="px-4 py-2 text-secondary">{item.meaning}</td>
                                            <td className="px-4 py-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${typeKey === 'godan' ? 'bg-blue-100 text-blue-700' :
                                                        typeKey === 'ichidan' ? 'bg-green-100 text-green-700' :
                                                            typeKey === 'irregular' ? 'bg-orange-100 text-orange-700' :
                                                                typeKey === 'i-adjective' ? 'bg-purple-100 text-purple-700' :
                                                                    'bg-pink-100 text-pink-700'
                                                    }`}>
                                                    {typeKey === 'godan' ? '五段' :
                                                        typeKey === 'ichidan' ? '一段' :
                                                            typeKey === 'irregular' ? '不規則' :
                                                                typeKey === 'i-adjective' ? 'い形' : 'な形'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Start Button */}
            <button
                onClick={handleStart}
                disabled={!isValid}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center shadow-lg ${isValid
                    ? 'bg-accent text-white hover:bg-accent/90 shadow-accent/20'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                Start Practice <ArrowRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    );
};

export default ConjugationDrillSetup;

