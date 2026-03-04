import React from 'react';
import { ArrowLeft, Heart, Github, Mail, Shield, ExternalLink } from 'lucide-react';

interface AboutPageProps {
    onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in-up pb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-primary transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-heading font-bold text-primary">About</h1>
            </div>

            {/* App Info Card */}
            <div className="neu-card p-8 mb-6 text-center">
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                >
                    <span className="text-4xl font-bold text-white jp-font">鍛</span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-1">キタ</h2>
                <p className="text-sm text-secondary font-medium mb-3">Version 1.0.0</p>
                <p className="text-sm text-secondary max-w-sm mx-auto leading-relaxed">
                    A smart, AI-powered Japanese learning assistant focusing on Kana, Kanji,
                    Vocabulary drills, interactive Grammar lessons, and AI Conversation.
                </p>
            </div>

            {/* Features */}
            <div className="neu-card p-6 mb-6">
                <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Features</h3>
                <div className="space-y-3">
                    {[
                        { icon: 'あ', label: 'Kana, Kanji & Vocabulary Drills' },
                        { icon: '数', label: 'Number & Date Practice' },
                        { icon: '変', label: 'Verb & Adjective Conjugation' },
                        { icon: '文', label: 'Grammar Library & AI Lessons' },
                        { icon: '会', label: 'AI Conversation Practice (Kaiwa)' },
                        { icon: '写', label: 'Image Analyzer for Japanese Text' },
                        { icon: '復', label: 'Spaced Repetition System (SRS)' },
                        { icon: '🏆', label: 'Gamification & Achievements' },
                    ].map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 neu-btn rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary jp-font">{f.icon}</span>
                            </div>
                            <span className="text-sm text-primary font-medium">{f.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credits */}
            <div className="neu-card p-6 mb-6">
                <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Credits</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-bold text-primary mb-1">Made with <Heart className="w-3.5 h-3.5 inline text-red-400" /> by</p>
                        <p className="text-sm text-secondary">Chandra Andr</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-primary mb-1">Powered by</p>
                        <div className="space-y-1.5">
                            <p className="text-sm text-secondary">React + TypeScript + Vite</p>
                            <p className="text-sm text-secondary">Tailwind CSS</p>
                            <p className="text-sm text-secondary">Google Gemini API (AI features)</p>
                            <p className="text-sm text-secondary">Capacitor (Mobile)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="neu-card p-6">
                <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Links</h3>
                <div className="space-y-2">
                    <a
                        href="/privacy-policy.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-neu-sm"
                        style={{ background: 'var(--bg-color)' }}
                    >
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary flex-1">Privacy Policy</span>
                        <ExternalLink className="w-4 h-4 text-secondary" />
                    </a>
                    <a
                        href="mailto:lunacellebi@gmail.com"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-neu-sm"
                        style={{ background: 'var(--bg-color)' }}
                    >
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary flex-1">Contact</span>
                        <ExternalLink className="w-4 h-4 text-secondary" />
                    </a>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-secondary mt-8 font-medium">
                © {new Date().getFullYear()} キタ. All rights reserved.
            </p>
        </div>
    );
};

export default AboutPage;
