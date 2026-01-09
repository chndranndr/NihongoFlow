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
                className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-in">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center">
                            <Key className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-primary">API Settings</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface hover:bg-border text-secondary hover:text-primary flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-secondary text-sm mb-6 leading-relaxed">
                        This app uses Google's Gemini API for AI features. Your key is stored locally on your device and never sent to our servers.
                    </p>

                    <div className="space-y-4">
                        {storedKey ? (
                            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-green-800 font-bold text-sm">Valid Key Saved</p>
                                        <p className="text-green-600 text-xs text-ellipsis overflow-hidden max-w-[150px]">
                                            ••••••••••••••••
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClear}
                                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                                        className="flex-1 bg-surface border border-border text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-secondary/30"
                                    />
                                    <button
                                        onClick={handleSave}
                                        disabled={!key.trim()}
                                        className="bg-primary text-white px-5 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
