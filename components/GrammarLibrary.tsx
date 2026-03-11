import React, { useState } from 'react';
import { GRAMMAR_LIBRARY } from '../data/grammar';
import { GrammarLesson } from '../types';
import { ChevronRight, HelpCircle, CheckCircle, XCircle, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import SpeakerButton from './SpeakerButton';
import { completeGrammarQuiz, loadProgress } from '../services/progressService';

interface GrammarLibraryProps {
    onBack: () => void;
}

const GrammarLibrary: React.FC<GrammarLibraryProps> = ({ onBack }) => {
    const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [quizState, setQuizState] = useState<'IDLE' | 'RESULT'>('IDLE');
    const [xpEarned, setXpEarned] = useState(0);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    const handleLessonSelect = (lesson: GrammarLesson) => {
        setSelectedLesson(lesson);
        setSelectedOption(null);
        setQuizState('IDLE');
        setXpEarned(0);
        setCurrentQuizIndex(0);
    };

    const currentQuiz = selectedLesson?.quiz[currentQuizIndex];

    const checkAnswer = () => {
        setQuizState('RESULT');
        // Award XP if correct
        if (selectedLesson && currentQuiz && selectedOption === currentQuiz.correctAnswerIndex) {
            const prevXP = loadProgress().xp;
            completeGrammarQuiz(selectedLesson.id);
            const newXP = loadProgress().xp;
            setXpEarned(newXP - prevXP);
        }
    };

    const handleNextQuiz = () => {
        if (!selectedLesson) return;
        if (currentQuizIndex < selectedLesson.quiz.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setSelectedOption(null);
            setQuizState('IDLE');
        } else {
            handleNextLesson();
        }
    };

    const handleNextLesson = () => {
        if (!selectedLesson) return;
        const currentIndex = GRAMMAR_LIBRARY.findIndex(l => l.id === selectedLesson.id);
        if (currentIndex < GRAMMAR_LIBRARY.length - 1) {
            handleLessonSelect(GRAMMAR_LIBRARY[currentIndex + 1]);
        } else {
            setSelectedLesson(null);
        }
    };

    // --- List View ---
    if (!selectedLesson) {
        return (
            <div className="max-w-2xl mx-auto animate-fade-in">
                <div className="flex items-center mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors mr-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <h1 className="text-xl font-bold text-primary">Grammar</h1>
                </div>

                <div className="space-y-3">
                    {GRAMMAR_LIBRARY.map((lesson) => (
                        <button
                            key={lesson.id}
                            onClick={() => handleLessonSelect(lesson)}
                            className="w-full glass-card p-5 rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all text-left group flex justify-between items-center"
                        >
                            <div>
                                <span className="inline-block px-2 py-0.5 bg-surface text-secondary text-xs font-semibold rounded-md mb-2">
                                    {lesson.level}
                                </span>
                                <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                    {lesson.title}
                                </h3>
                                <p className="text-secondary text-sm mt-1 line-clamp-1">{lesson.explanation}</p>
                            </div>
                            <div className="bg-surface p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white text-secondary transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // --- Detail View ---
    return (
        <div className="max-w-2xl mx-auto pb-20 animate-fade-in">
            <button
                onClick={() => setSelectedLesson(null)}
                className="mb-6 flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="glass-card overflow-hidden">

                {/* Header */}
                <div className="bg-primary text-white p-8">
                    <span className="inline-block px-2.5 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-lg mb-3">
                        {selectedLesson.level}
                    </span>
                    <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
                </div>

                <div className="p-6 md:p-8 space-y-8">

                    {/* Explanation */}
                    <section>
                        <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Explanation</h3>
                        <p className="text-primary leading-relaxed bg-surface p-5 rounded-2xl border border-border">
                            {selectedLesson.explanation}
                        </p>
                    </section>

                    {/* Examples */}
                    <section>
                        <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Examples</h3>
                        <div className="space-y-3">
                            {selectedLesson.examples.map((ex, idx) => (
                                <div key={idx} className="bg-surface p-4 rounded-xl border-l-4 border-accent">
                                    <div className="flex items-start gap-2">
                                        <SpeakerButton text={ex.japanese} size="sm" />
                                        <div>
                                            <p className="jp-font text-lg font-bold text-primary mb-1">{ex.japanese}</p>
                                            <p className="text-accent text-sm font-medium mb-1">{ex.romaji}</p>
                                            <p className="text-secondary text-sm">{ex.english}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quiz */}
                    {currentQuiz && (
                        <section className="pt-6 border-t border-border">
                            <h3 className="flex items-center justify-between text-base font-bold text-primary mb-5">
                                <span className="flex items-center">
                                    <HelpCircle className="w-5 h-5 text-accent mr-2" />
                                    Quick Check
                                </span>
                                <span className="text-xs font-semibold text-secondary bg-surface px-3 py-1 rounded-full">
                                    {currentQuizIndex + 1} / {selectedLesson.quiz.length}
                                </span>
                            </h3>

                            <div className="bg-surface rounded-2xl p-5">
                                <p className="text-lg font-medium text-primary mb-6 text-center leading-relaxed">
                                    {currentQuiz.question.split('___').map((part, i, arr) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i < arr.length - 1 && (
                                                <span className="inline-block border-b-2 border-secondary min-w-[50px] text-center text-accent font-bold px-2 mx-1">
                                                    {selectedOption !== null ? currentQuiz.options[selectedOption] : ''}
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>

                                <div className="grid grid-cols-2 gap-2 mb-5">
                                    {currentQuiz.options.map((option, idx) => {
                                        let statusClass = "glass border-border hover:border-primary/30";
                                        if (selectedOption === idx) {
                                            statusClass = "border-accent bg-accent/5";
                                        }
                                        if (quizState === 'RESULT') {
                                            if (idx === currentQuiz.correctAnswerIndex) {
                                                statusClass = "border-green-500 bg-green-50 text-green-700";
                                            } else if (selectedOption === idx && idx !== currentQuiz.correctAnswerIndex) {
                                                statusClass = "border-red-300 bg-red-50 text-red-500 opacity-50";
                                            } else {
                                                statusClass = "opacity-40 border-border glass";
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => quizState === 'IDLE' && setSelectedOption(idx)}
                                                disabled={quizState === 'RESULT'}
                                                className={`p-3.5 rounded-xl border-2 transition-all font-semibold text-sm ${statusClass}`}
                                            >
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizState === 'IDLE' ? (
                                    <button
                                        onClick={checkAnswer}
                                        disabled={selectedOption === null}
                                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Check
                                    </button>
                                ) : (
                                    <div className={`p-4 rounded-xl flex items-center justify-between ${selectedOption === currentQuiz.correctAnswerIndex ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        <div className="flex items-center gap-2">
                                            {selectedOption === currentQuiz.correctAnswerIndex ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                            <span className="font-semibold">
                                                {selectedOption === currentQuiz.correctAnswerIndex ? 'Correct!' : 'Incorrect'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleNextQuiz}
                                            className="px-4 py-2 bg-surface rounded-lg text-sm font-semibold text-primary hover:bg-surface flex items-center gap-1"
                                        >
                                            {currentQuizIndex < selectedLesson.quiz.length - 1 ? 'Next Quiz' : 'Next Lesson'} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GrammarLibrary;
