import React, { useState, useEffect } from 'react';
import { getApiKey, saveApiKey, removeApiKey } from '../services/geminiService';
import { X, Key, Check, Trash2, ShieldCheck } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
    const [key, setKey] = useState('');
    const [storedKey, setStoredKey] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStoredKey(getApiKey());
        }
    }, [isOpen]);

    const handleSave = () => {
        if (key.trim()) {
            saveApiKey(key.trim());
            setStoredKey(key.trim());
            setKey('');
        }
    };

    const handleClear = () => {
        removeApiKey();
        setStoredKey(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-primary/10 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md glass-strong rounded-3xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                            <Key className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-heading font-bold text-primary">API Settings</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn-icon"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-secondary text-sm mb-6 leading-relaxed">
                        This app uses Google's Gemini API for AI features. Your key is stored locally on your device and never sent to our servers.
                    </p>

                    <div className="space-y-4">
                        {storedKey ? (
                            <div className="glass-card p-4 flex items-center justify-between border-green-400/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-sm">Valid Key Saved</p>
                                        <p className="text-muted text-xs">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClear}
                                    className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                    title="Remove Key"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                                    Enter Gemini API Key
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        placeholder="AIzaSy..."
                                        className="input-glass flex-1"
                                    />
                                    <button
                                        onClick={handleSave}
                                        disabled={!key.trim()}
                                        className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 mt-4 border-t border-border text-center">
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent text-sm font-semibold hover:underline"
                            >
                                Get a free Gemini API key →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
