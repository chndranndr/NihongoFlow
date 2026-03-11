import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { DifficultyLevel, ChatMessage } from '../types';
import { startKaiwaSession } from '../services/geminiService';
import { MessageCircle, Mic, Send, User, Bot, ArrowLeft } from 'lucide-react';

interface KaiwaModeProps {
    level: DifficultyLevel;
    onBack: () => void;
}

const SCENARIOS = [
    "Self Introduction",
    "Ordering at a Restaurant",
    "Asking for Directions",
    "Shopping",
    "Hobbies",
    "Travel Plans"
];

const KaiwaMode: React.FC<KaiwaModeProps> = ({ level, onBack }) => {
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scenario, setScenario] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const initSession = async (selectedScenario: string) => {
        setScenario(selectedScenario);
        setIsLoading(true);
        try {
            const session = startKaiwaSession(level, selectedScenario);
            setChatSession(session);

            const response = await session.sendMessage({ message: "Start the conversation." });

            setMessages([{
                id: 'init',
                role: 'model',
                text: response.text || "Konnichiwa! Let's start chatting.",
                timestamp: Date.now()
            }]);
        } catch (error) {
            console.error("Failed to start session", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !chatSession) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessage({ message: input });
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: result.text || "...",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleMicClick = () => {
        if ('webkitSpeechRecognition' in window) {
            // @ts-ignore
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'ja-JP';
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(prev => prev + transcript);
            };
            recognition.start();
        } else {
            alert("Speech recognition is only supported in Chrome/Edge.");
        }
    };

    if (!scenario) {
        return (
            <div className="max-w-xl mx-auto animate-fade-in">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-2xl font-bold text-primary mb-2">Kaiwa</h2>
                <p className="text-secondary mb-8">Choose a conversation topic</p>

                <div className="grid gap-3">
                    {SCENARIOS.map((s) => (
                        <button
                            key={s}
                            onClick={() => initSession(s)}
                            className="w-full glass-card p-5 rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all text-left flex items-center justify-between group"
                        >
                            <span className="font-semibold text-primary group-hover:text-accent transition-colors">{s}</span>
                            <MessageCircle className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" />
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> End
                </button>
                <span className="text-sm font-semibold text-primary bg-surface px-3 py-1.5 rounded-full truncate max-w-[180px]">
                    {scenario}
                </span>
            </div>

            <div className="flex-1 glass-card overflow-hidden flex flex-col">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-surface/30">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                </div>

                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-md'
                                        : 'glass text-primary border border-border rounded-bl-md'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="glass px-4 py-3 rounded-2xl rounded-bl-md border border-border">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 glass-strong border-t border-border">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMicClick}
                            className="w-10 h-10 rounded-xl bg-surface text-secondary hover:bg-border/50 hover:text-primary transition-colors flex items-center justify-center"
                            title="Speak"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type in Japanese..."
                            className="flex-1 bg-surface text-primary px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 placeholder:text-secondary/50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="w-10 h-10 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KaiwaMode;
