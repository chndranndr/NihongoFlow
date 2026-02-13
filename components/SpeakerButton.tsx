import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { speakJapanese, stopSpeaking } from '../services/ttsService';

interface SpeakerButtonProps {
    text: string;
    size?: 'sm' | 'md';
    className?: string;
    /** Automatically speak this text when it changes */
    autoPlay?: boolean;
}

const SpeakerButton: React.FC<SpeakerButtonProps> = ({ text, size = 'md', className = '', autoPlay = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevTextRef = useRef<string>('');

    const handleSpeak = useCallback(() => {
        if (!text) return;

        setIsPlaying(true);

        // Call speakJapanese — it returns a promise but we don't await it
        // to keep the click handler synchronous for autoplay policy
        speakJapanese(text).finally(() => {
            setIsPlaying(false);
        });

        // Fallback timeout in case the promise doesn't resolve
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsPlaying(false), 5000);
    }, [text]);

    // Auto-play when text changes (if enabled)
    useEffect(() => {
        if (autoPlay && text && text !== prevTextRef.current) {
            prevTextRef.current = text;
            const t = setTimeout(() => handleSpeak(), 150);
            return () => clearTimeout(t);
        }
    }, [autoPlay, text, handleSpeak]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            stopSpeaking();
        };
    }, []);

    const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5';
    const btnSize = size === 'sm'
        ? 'p-1.5 rounded-lg'
        : 'p-2 rounded-xl';

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
            }}
            className={`
                ${btnSize}
                text-accent hover:text-white hover:bg-accent
                transition-all duration-200 active:scale-90
                ${isPlaying ? 'bg-accent text-white animate-pulse shadow-glow' : 'bg-surface/80 hover:shadow-md'}
                ${className}
            `}
            title="Listen to pronunciation"
            aria-label={`Listen to ${text}`}
        >
            <Volume2 className={iconSize} />
        </button>
    );
};

export default SpeakerButton;
