import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ConjugationDrillConfig } from '../types';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, Eye, EyeOff, Sparkles } from 'lucide-react';
import {
    ConjugationDrillItem,
    generateConjugationDrillItems,
    ConjugationForm,
} from '../conjugationData';
import { VOCAB_N5 } from '../data/vocab/n5';
import SpeakerButton from './SpeakerButton';
import { completeDrill, loadProgress } from '../services/progressService';

interface ConjugationDrillModeProps {
    config: ConjugationDrillConfig;
    onBack: () => void;
}

const ConjugationDrillMode: React.FC<ConjugationDrillModeProps> = ({ config, onBack }) => {
    const [items, setItems] = useState<ConjugationDrillItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const buildItems = () => generateConjugationDrillItems(
        VOCAB_N5,
        config.wordType,
        config.verbTypes as ('godan' | 'ichidan' | 'irregular' | 'all')[],
        config.adjectiveTypes as ('i-adjective' | 'na-adjective' | 'all')[],
        config.forms as ConjugationForm[],
        config.itemCount
    );

    useEffect(() => {
        setItems(buildItems());
    }, [config]);

    useEffect(() => {
        if (!showResult && !isComplete && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex, showResult, isComplete]);

    const normalizeAnswer = (answer: string): string =>
        answer.toLowerCase().trim()
            .replace(/ou/g, 'o').replace(/oo/g, 'o')
            .replace(/uu/g, 'u').replace(/ei/g, 'e')
            .replace(/\s+/g, '');

    const checkAnswer = useCallback(() => {
        if (!items[currentIndex] || showResult) return;
        const correct = normalizeAnswer(userAnswer) === normalizeAnswer(items[currentIndex].answer.romaji);
        setIsCorrect(correct);
        if (correct) setScore(prev => prev + 1);
        setShowResult(true);
    }, [userAnswer, currentIndex, items, showResult]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (showResult) nextQuestion();
            else if (userAnswer.trim()) checkAnswer();
        }
    };

    const nextQuestion = () => {
        if (currentIndex + 1 >= items.length) {
            setIsComplete(true);
            const prevXP = loadProgress().xp;
            completeDrill(score, items.length, 'conjugation');
            setXpEarned(loadProgress().xp - prevXP);
        } else {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setShowResult(false);
            setShowHint(false);
        }
    };

    const restart = () => {
        setItems(buildItems());
        setCurrentIndex(0);
        setUserAnswer('');
        setShowResult(false);
        setShowHint(false);
        setScore(0);
        setIsComplete(false);
    };

    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-secondary">Loading...</div>
            </div>
        );
    }

    if (isComplete) {
        const percentage = Math.round((score / items.length) * 100);
        return (
            <div className="animate-fade-in-up max-w-lg mx-auto text-center">
                <div className="bg-white border border-border rounded-3xl p-8 mb-6">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Practice Complete!</h1>
                    <p className="text-secondary mb-6">
                        {config.wordType === 'verb' ? 'Verb' : 'Adjective'} Conjugation
                    </p>
                    <div className="bg-surface rounded-2xl p-6 mb-6">
                        <div className="text-5xl font-bold text-accent mb-2">{percentage}%</div>
                        <div className="text-secondary">{score} / {items.length} correct</div>
                    </div>
                    {xpEarned > 0 && (
                        <div className="mb-6 py-3 px-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))' }}>
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5 text-accent" />
                                <span className="text-xl font-heading font-bold text-accent">+{xpEarned} XP</span>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button onClick={onBack} className="flex-1 py-4 rounded-xl font-bold text-primary bg-surface hover:bg-border/50 transition-all">Back</button>
                        <button onClick={restart} className="flex-1 py-4 rounded-xl font-bold text-white bg-accent hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
                            <RotateCcw className="w-5 h-5" /> Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentItem = items[currentIndex];
    const verbTypeLabel = currentItem.item.verbCategory === 'godan' ? '五段' : currentItem.item.verbCategory === 'ichidan' ? '一段' : '不規則';
    const adjTypeLabel = currentItem.item.category === 'i-adjective' ? 'い形容詞' : 'な形容詞';

    return (
        <div className="animate-fade-in-up max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold text-secondary">{currentIndex + 1} / {items.length}</div>
                <div className="text-sm font-bold text-accent">Score: {score}</div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-surface rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-accent transition-all duration-300" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} />
            </div>

            {/* Question Card */}
            <div className="bg-white border border-border rounded-3xl p-8 mb-6">
                <div className="inline-block bg-accent/10 text-accent text-sm font-bold px-4 py-2 rounded-full mb-6">
                    → {currentItem.formLabel}
                </div>

                <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary jp-font mb-3">{currentItem.question.kanji}</div>
                    <div className="text-xl text-secondary jp-font mb-2">{currentItem.question.hiragana}</div>
                    <div className="text-sm text-secondary mb-2">{currentItem.question.meaning}</div>
                    <SpeakerButton text={currentItem.question.hiragana} size="sm" />
                </div>

                <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors mx-auto mb-4"
                >
                    {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showHint ? 'Hide hint' : 'Show hint'}
                </button>

                {showHint && (
                    <div className="text-center text-sm text-secondary bg-surface px-4 py-2 rounded-xl mb-4">
                        Type: {config.wordType === 'verb' ? verbTypeLabel : adjTypeLabel}
                    </div>
                )}

                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={showResult}
                        placeholder="Type romaji answer..."
                        className={`w-full text-center text-xl font-semibold py-4 px-6 rounded-2xl outline-none transition-all ${showResult
                            ? isCorrect
                                ? 'bg-green-50 border-2 border-green-400 text-green-700'
                                : 'bg-red-50 border-2 border-red-400 text-red-700'
                            : 'bg-surface border-2 border-transparent focus:border-accent/30 text-primary'
                            }`}
                    />
                </div>

                {showResult && (
                    <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            {isCorrect
                                ? <><CheckCircle className="w-5 h-5 text-green-600" /><span className="font-bold text-green-700">Correct!</span></>
                                : <><XCircle className="w-5 h-5 text-red-600" /><span className="font-bold text-red-700">Incorrect</span></>
                            }
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <SpeakerButton text={currentItem.answer.hiragana} size="sm" autoPlay={showResult} />
                                <div className="text-2xl font-bold jp-font text-primary">{currentItem.answer.kanji}</div>
                            </div>
                            <div className="text-lg text-secondary jp-font mb-1">{currentItem.answer.hiragana}</div>
                            <div className="text-sm text-secondary">{currentItem.answer.romaji}</div>
                        </div>
                    </div>
                )}
            </div>

            {showResult ? (
                <button onClick={nextQuestion} className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transition-all">
                    {currentIndex + 1 >= items.length ? 'See Results' : 'Next Question'}
                </button>
            ) : (
                <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${userAnswer.trim() ? 'bg-accent text-white hover:bg-accent/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Check Answer
                </button>
            )}
        </div>
    );
};

export default ConjugationDrillMode;
