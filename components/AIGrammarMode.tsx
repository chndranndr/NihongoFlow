import React, { useState, useEffect } from 'react';
import { DifficultyLevel, GrammarLesson } from '../types';
import { generateAIGrammarLesson } from '../services/geminiService';
import { Sparkles, HelpCircle, CheckCircle, XCircle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

interface AIGrammarModeProps {
    level: DifficultyLevel;
    onBack: () => void;
}

const AIGrammarMode: React.FC<AIGrammarModeProps> = ({ level, onBack }) => {
    const [lesson, setLesson] = useState<GrammarLesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [quizState, setQuizState] = useState<'READING' | 'QUIZ' | 'RESULT'>('READING');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        fetchLesson();
    }, [level]);

    const fetchLesson = async () => {
        setLoading(true);
        setQuizState('READING');
        setSelectedOption(null);
        const data = await generateAIGrammarLesson(level);
        setLesson(data);
        setLoading(false);
    };

    const handleOptionSelect = (index: number) => {
        if (quizState === 'RESULT') return;
        setSelectedOption(index);
    };

    const checkAnswer = () => {
        setQuizState('RESULT');
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-secondary animate-pulse font-medium">Generating lesson...</p>
            </div>
        );
    }

    if (!lesson) return <div className="text-center p-10 text-secondary">Failed to load lesson.</div>;

    return (
        <div className="max-w-2xl mx-auto pb-20 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-2 bg-surface text-primary px-3 py-1.5 rounded-full text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>AI • {level.split(' ')[0]}</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-border overflow-hidden">

                {/* Header */}
                <div className="bg-primary text-white p-8">
                    <h1 className="text-2xl font-bold mb-1">{lesson.title}</h1>
                    <p className="text-white/60 text-sm">AI Generated</p>
                </div>

                <div className="p-6 md:p-8 space-y-8">

                    {/* Explanation */}
                    <section>
                        <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Explanation</h3>
                        <p className="text-primary leading-relaxed bg-surface p-5 rounded-2xl border border-border">
                            {lesson.explanation}
                        </p>
                    </section>

                    {/* Examples */}
                    <section>
                        <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Examples</h3>
                        <div className="space-y-3">
                            {lesson.examples.map((ex, idx) => (
                                <div key={idx} className="bg-surface p-4 rounded-xl border border-border">
                                    <p className="jp-font text-lg font-bold text-primary mb-1">{ex.japanese}</p>
                                    <p className="text-accent text-sm font-medium mb-1">{ex.romaji}</p>
                                    <p className="text-secondary text-sm">{ex.english}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quiz */}
                    <section className="pt-6 border-t border-border">
                        <h3 className="flex items-center text-base font-bold text-primary mb-5">
                            <HelpCircle className="w-5 h-5 text-accent mr-2" />
                            Quiz
                        </h3>

                        <div className="bg-surface rounded-2xl p-5">
                            <p className="text-lg font-medium text-primary mb-6 text-center">
                                {lesson.quiz.question.split('___').map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className="inline-block border-b-2 border-secondary w-16 text-center text-accent font-bold px-1 mx-1">
                                                {selectedOption !== null ? lesson.quiz.options[selectedOption] : '?'}
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mb-5">
                                {lesson.quiz.options.map((option, idx) => {
                                    let statusClass = "bg-white border-border hover:border-primary/30";
                                    if (selectedOption === idx) {
                                        statusClass = "border-accent bg-accent/5";
                                    }
                                    if (quizState === 'RESULT') {
                                        if (idx === lesson.quiz.correctAnswerIndex) {
                                            statusClass = "border-green-500 bg-green-50 text-green-700";
                                        } else if (selectedOption === idx && idx !== lesson.quiz.correctAnswerIndex) {
                                            statusClass = "border-red-300 bg-red-50 text-red-500 opacity-50";
                                        } else {
                                            statusClass = "opacity-40 border-border bg-white";
                                        }
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            disabled={quizState === 'RESULT'}
                                            className={`p-3.5 rounded-xl border-2 transition-all font-medium text-left text-sm ${statusClass}`}
                                        >
                                            <span className="inline-flex w-5 h-5 rounded-full bg-surface text-xs items-center justify-center mr-2 font-bold text-secondary">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {quizState !== 'RESULT' ? (
                                <button
                                    onClick={checkAnswer}
                                    disabled={selectedOption === null}
                                    className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Check
                                </button>
                            ) : (
                                <div className={`p-4 rounded-xl flex items-center justify-between ${selectedOption === lesson.quiz.correctAnswerIndex ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    <div className="flex items-center gap-2">
                                        {selectedOption === lesson.quiz.correctAnswerIndex ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                        <span className="font-semibold">
                                            {selectedOption === lesson.quiz.correctAnswerIndex ? 'Correct!' : 'Incorrect'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={fetchLesson}
                                        className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-primary hover:bg-surface flex items-center gap-1"
                                    >
                                        New Lesson <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AIGrammarMode;
