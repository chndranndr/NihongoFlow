import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EnrichedCue, VideoEntry, SubtitleCue, GrammarPOS, GrammarToken } from '../types';
import { enrichSubtitles, transcribeYouTubeVideo } from '../services/geminiService';
import {
    parseSRT,
    extractYouTubeId,
    loadVideos,
    saveVideo,
    deleteVideo,
    updateVideoOffset,
} from '../services/videoStudyService';
import {
    ArrowLeft,
    Upload,
    Play,
    Trash2,
    Loader2,
    Eye,
    EyeOff,
    SkipBack,
    SkipForward,
    Repeat,
    Clock,
    RotateCcw,
    Film,
    Plus,
    Sparkles,
    FileText,
} from 'lucide-react';

// ── POS Color map ──
const POS_COLORS: Record<GrammarPOS, { text: string; bg: string; label: string }> = {
    noun: { text: 'text-[var(--text-color)]', bg: '', label: 'Noun' },
    verb: { text: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Verb' },
    adjective: { text: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Adj' },
    adverb: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Adv' },
    particle: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Particle' },
    auxiliary: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', label: 'Aux' },
    conjunction: { text: 'text-orange-400', bg: 'bg-orange-400/10', label: 'Conj' },
    interjection: { text: 'text-pink-400', bg: 'bg-pink-400/10', label: 'Interj' },
    other: { text: 'text-secondary', bg: '', label: 'Other' },
};

const TokenizedText: React.FC<{ tokens: GrammarToken[]; isActive: boolean }> = ({ tokens, isActive }) => (
    <span className={`jp-font font-semibold flex flex-wrap gap-x-0.5 ${isActive ? 'text-lg' : ''}`}>
        {tokens.map((token, i) => {
            const c = POS_COLORS[token.pos] || POS_COLORS.other;
            return (
                <span
                    key={i}
                    className={`${c.text} ${c.bg} rounded px-0.5`}
                    title={c.label}
                >
                    {token.text}
                </span>
            );
        })}
    </span>
);

interface VideoStudyModeProps {
    onBack: () => void;
}

// YouTube IFrame API type declarations
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: (() => void) | undefined;
    }
}

/** Load the YouTube IFrame API script once */
function loadYouTubeAPI(): Promise<void> {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }
        const existing = document.getElementById('yt-iframe-api');
        if (existing) {
            // Script already loading, wait for it
            const check = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
            return;
        }
        window.onYouTubeIframeAPIReady = () => resolve();
        const script = document.createElement('script');
        script.id = 'yt-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
    });
}

const VideoStudyMode: React.FC<VideoStudyModeProps> = ({ onBack }) => {
    // ── Setup state ──
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [srtContent, setSrtContent] = useState('');
    const [srtFileName, setSrtFileName] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [isEnriching, setIsEnriching] = useState(false);
    const [enrichError, setEnrichError] = useState('');
    const [library, setLibrary] = useState<VideoEntry[]>([]);
    const [inputMode, setInputMode] = useState<'srt' | 'ai'>('srt');
    const [enrichProgress, setEnrichProgress] = useState<string>('');

    // ── Player state ──
    const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);
    const [currentCueIndex, setCurrentCueIndex] = useState(-1);
    const [isLooping, setIsLooping] = useState(false);
    const [subtitleOffset, setSubtitleOffset] = useState(0); // ms

    // ── Toggle visibility ──
    const [showJapanese, setShowJapanese] = useState(true);
    const [showFurigana, setShowFurigana] = useState(true);
    const [showRomaji, setShowRomaji] = useState(true);
    const [showTranslation, setShowTranslation] = useState(true);

    // ── Refs ──
    const playerRef = useRef<any>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const syncIntervalRef = useRef<number | null>(null);
    const cueListRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load library on mount
    useEffect(() => {
        setLibrary(loadVideos());
    }, []);

    // ── YouTube Player ──
    const initPlayer = useCallback(async (videoId: string) => {
        await loadYouTubeAPI();
        // Destroy previous player if exists
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
        playerRef.current = new window.YT.Player('yt-player', {
            videoId,
            width: '100%',
            height: '100%',
            playerVars: {
                autoplay: 0,
                modestbranding: 1,
                rel: 0,
                cc_load_policy: 0,
            },
            events: {
                onReady: () => {
                    startSync();
                },
            },
        });
    }, []);

    const startSync = useCallback(() => {
        if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        syncIntervalRef.current = window.setInterval(() => {
            if (!playerRef.current || !playerRef.current.getCurrentTime) return;
            const currentTime = playerRef.current.getCurrentTime();
            // This will be picked up by the sync effect
            setCurrentTime(currentTime);
        }, 200);
    }, []);

    // Track current video time for syncing
    const [currentTime, setCurrentTime] = useState(0);

    // Sync subtitles to current video time
    useEffect(() => {
        if (!activeVideo) return;
        const offsetSec = subtitleOffset / 1000;
        const adjustedTime = currentTime + offsetSec;
        const idx = activeVideo.cues.findIndex(
            (cue) => adjustedTime >= cue.startTime && adjustedTime < cue.endTime
        );
        if (idx !== currentCueIndex) {
            setCurrentCueIndex(idx);

            // Loop mode: if cue ended, seek back
            if (isLooping && currentCueIndex >= 0 && idx === -1) {
                const loopCue = activeVideo.cues[currentCueIndex];
                if (loopCue && playerRef.current?.seekTo) {
                    playerRef.current.seekTo(loopCue.startTime - offsetSec, true);
                }
            }
        }
    }, [currentTime, activeVideo, subtitleOffset, isLooping, currentCueIndex]);

    // Auto-scroll to current cue (within container only, no page scroll)
    useEffect(() => {
        if (currentCueIndex >= 0 && cueListRef.current) {
            const el = cueListRef.current.querySelector(`[data-cue-index="${currentCueIndex}"]`) as HTMLElement;
            if (el) {
                const container = cueListRef.current;
                const elTop = el.offsetTop - container.offsetTop;
                const elHeight = el.offsetHeight;
                const containerHeight = container.clientHeight;
                container.scrollTo({
                    top: elTop - containerHeight / 2 + elHeight / 2,
                    behavior: 'smooth',
                });
            }
        }
    }, [currentCueIndex]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, []);

    // Init player when active video changes
    useEffect(() => {
        if (activeVideo) {
            setSubtitleOffset(activeVideo.subtitleOffset || 0);
            setCurrentCueIndex(-1);
            // Small delay to ensure DOM is ready
            setTimeout(() => initPlayer(activeVideo.youtubeId), 100);
        }
    }, [activeVideo, initPlayer]);

    // ── Handlers ──

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSrtFileName(file.name);
        const reader = new FileReader();
        reader.onload = (ev) => {
            setSrtContent(ev.target?.result as string);
        };
        reader.readAsText(file);
    };

    const handleEnrichAndStart = async () => {
        setEnrichError('');
        setEnrichProgress('');

        // Validate YouTube URL
        const ytId = extractYouTubeId(youtubeUrl);
        if (!ytId) {
            setEnrichError('Invalid YouTube URL. Please paste a valid YouTube video link.');
            return;
        }

        if (inputMode === 'srt') {
            // Validate SRT
            const cues = parseSRT(srtContent);
            if (cues.length === 0) {
                setEnrichError('Could not parse any subtitles from the SRT file. Please check the file format.');
                return;
            }
            setIsEnriching(true);
            try {
                setEnrichProgress('Enriching subtitles with AI...');
                const lines = cues.map((c) => c.text);
                const chunkSize = 50;
                const enriched: { furigana: string; romaji: string; translation: string; tokens: { text: string; pos: string }[] }[] = [];
                for (let i = 0; i < lines.length; i += chunkSize) {
                    setEnrichProgress(`Enriching subtitles... (${Math.min(i + chunkSize, lines.length)} / ${lines.length})`);
                    const chunk = lines.slice(i, i + chunkSize);
                    const result = await enrichSubtitles(chunk);
                    enriched.push(...result);
                }
                const enrichedCues: EnrichedCue[] = cues.map((cue, i) => ({
                    ...cue,
                    furigana: enriched[i]?.furigana || '',
                    romaji: enriched[i]?.romaji || '',
                    translation: enriched[i]?.translation || '',
                    tokens: (enriched[i]?.tokens || []).map(t => ({ text: t.text, pos: t.pos as GrammarPOS })),
                }));
                const entry: VideoEntry = {
                    id: `video-${Date.now()}`,
                    title: videoTitle || srtFileName.replace(/\.srt$/i, '') || `Video ${ytId}`,
                    youtubeId: ytId,
                    cues: enrichedCues,
                    subtitleOffset: 0,
                    createdAt: Date.now(),
                };
                saveVideo(entry);
                setLibrary(loadVideos());
                setActiveVideo(entry);
                setYoutubeUrl(''); setSrtContent(''); setSrtFileName(''); setVideoTitle('');
            } catch (err: any) {
                setEnrichError(err.message || 'Failed to enrich subtitles. Please try again.');
            } finally {
                setIsEnriching(false);
                setEnrichProgress('');
            }
        } else {
            // AI transcription mode
            setIsEnriching(true);
            try {
                // Step 1: Transcribe via Gemini YouTube URL
                setEnrichProgress('Step 1/2: Transcribing Japanese audio with AI...');
                const rawCues = await transcribeYouTubeVideo(youtubeUrl);
                if (rawCues.length === 0) {
                    setEnrichError('No Japanese speech detected in this video. Try a different video or use the SRT mode.');
                    return;
                }

                // Step 2: Enrich with furigana/romaji/translation
                const lines = rawCues.map((c) => c.text);
                const chunkSize = 50;
                const enriched: { furigana: string; romaji: string; translation: string; tokens: { text: string; pos: string }[] }[] = [];
                for (let i = 0; i < lines.length; i += chunkSize) {
                    setEnrichProgress(`Step 2/2: Enriching subtitles... (${Math.min(i + chunkSize, lines.length)} / ${lines.length})`);
                    const chunk = lines.slice(i, i + chunkSize);
                    const result = await enrichSubtitles(chunk);
                    enriched.push(...result);
                }

                const enrichedCues: EnrichedCue[] = rawCues.map((cue, i) => ({
                    ...cue,
                    furigana: enriched[i]?.furigana || '',
                    romaji: enriched[i]?.romaji || '',
                    translation: enriched[i]?.translation || '',
                    tokens: (enriched[i]?.tokens || []).map(t => ({ text: t.text, pos: t.pos as GrammarPOS })),
                }));
                const entry: VideoEntry = {
                    id: `video-${Date.now()}`,
                    title: videoTitle || `Video ${ytId}`,
                    youtubeId: ytId,
                    cues: enrichedCues,
                    subtitleOffset: 0,
                    createdAt: Date.now(),
                };
                saveVideo(entry);
                setLibrary(loadVideos());
                setActiveVideo(entry);
                setYoutubeUrl(''); setVideoTitle('');
            } catch (err: any) {
                setEnrichError(err.message || 'Failed to transcribe video. Please try again.');
            } finally {
                setIsEnriching(false);
                setEnrichProgress('');
            }
        }
    };

    const handleDeleteVideo = (id: string) => {
        deleteVideo(id);
        setLibrary(loadVideos());
        if (activeVideo?.id === id) {
            setActiveVideo(null);
        }
    };

    const handleSeekToCue = (cue: EnrichedCue) => {
        const offsetSec = subtitleOffset / 1000;
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(cue.startTime - offsetSec, true);
            playerRef.current.playVideo();
        }
    };

    const handlePrevCue = () => {
        if (!activeVideo) return;
        const newIdx = Math.max(0, currentCueIndex - 1);
        handleSeekToCue(activeVideo.cues[newIdx]);
    };

    const handleNextCue = () => {
        if (!activeVideo) return;
        const newIdx = Math.min(activeVideo.cues.length - 1, currentCueIndex + 1);
        handleSeekToCue(activeVideo.cues[newIdx]);
    };

    const handleOffsetChange = (delta: number) => {
        const newOffset = subtitleOffset + delta;
        setSubtitleOffset(newOffset);
        if (activeVideo) {
            updateVideoOffset(activeVideo.id, newOffset);
        }
    };

    const handleResetOffset = () => {
        setSubtitleOffset(0);
        if (activeVideo) {
            updateVideoOffset(activeVideo.id, 0);
        }
    };

    const handleBackToLibrary = () => {
        if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
        setActiveVideo(null);
        setCurrentCueIndex(-1);
    };

    // ── RENDER: Player View ──
    if (activeVideo) {
        return (
            <div className="animate-fade-in flex flex-col" style={{ height: 'calc(100dvh - 6rem)' }}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={handleBackToLibrary}
                        className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-primary transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-heading font-bold text-primary truncate">
                            {activeVideo.title}
                        </h2>
                        <p className="text-xs text-secondary">{activeVideo.cues.length} subtitles</p>
                    </div>
                </div>

                {/* YouTube Player */}
                <div
                    ref={playerContainerRef}
                    className="neu-card overflow-hidden mb-4"
                    style={{ aspectRatio: '16/9' }}
                >
                    <div id="yt-player" className="w-full h-full" />
                </div>

                {/* Controls Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {/* Playback controls */}
                    <button
                        onClick={handlePrevCue}
                        className="neu-btn px-3 py-2 text-secondary hover:text-primary transition-all"
                        title="Previous subtitle"
                    >
                        <SkipBack className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleNextCue}
                        className="neu-btn px-3 py-2 text-secondary hover:text-primary transition-all"
                        title="Next subtitle"
                    >
                        <SkipForward className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsLooping(!isLooping)}
                        className={`neu-btn px-3 py-2 transition-all ${isLooping ? 'text-primary glow-primary' : 'text-secondary hover:text-primary'}`}
                        title={isLooping ? 'Loop ON' : 'Loop OFF'}
                    >
                        <Repeat className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Sync offset */}
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <button
                            onClick={() => handleOffsetChange(-500)}
                            className="neu-btn px-2 py-1 text-xs font-semibold text-secondary hover:text-primary transition-all"
                        >
                            -0.5s
                        </button>
                        <span className="text-xs font-mono font-bold text-primary min-w-[4rem] text-center">
                            {subtitleOffset >= 0 ? '+' : ''}{(subtitleOffset / 1000).toFixed(1)}s
                        </span>
                        <button
                            onClick={() => handleOffsetChange(500)}
                            className="neu-btn px-2 py-1 text-xs font-semibold text-secondary hover:text-primary transition-all"
                        >
                            +0.5s
                        </button>
                        {subtitleOffset !== 0 && (
                            <button
                                onClick={handleResetOffset}
                                className="neu-btn px-2 py-1 text-secondary hover:text-primary transition-all"
                                title="Reset offset"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Toggle Bar */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {[
                        { label: '日本語', active: showJapanese, toggle: () => setShowJapanese(!showJapanese) },
                        { label: 'ふりがな', active: showFurigana, toggle: () => setShowFurigana(!showFurigana) },
                        { label: 'Romaji', active: showRomaji, toggle: () => setShowRomaji(!showRomaji) },
                        { label: 'English', active: showTranslation, toggle: () => setShowTranslation(!showTranslation) },
                    ].map((t) => (
                        <button
                            key={t.label}
                            onClick={t.toggle}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${t.active
                                ? 'bg-primary text-white'
                                : 'neu-btn text-secondary hover:text-primary'
                                }`}
                        >
                            {t.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Grammar color legend — shown when cues have tokens */}
                {activeVideo.cues[0]?.tokens && activeVideo.cues[0].tokens.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-[11px]">
                        {(Object.entries(POS_COLORS) as [GrammarPOS, typeof POS_COLORS[GrammarPOS]][]).filter(([pos]) => pos !== 'other').map(([pos, c]) => (
                            <span key={pos} className={`${c.text} font-medium flex items-center gap-1`}>
                                <span className={`inline-block w-2 h-2 rounded-full ${c.bg || 'bg-current'}`} />
                                {c.label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Subtitle List */}
                <div
                    ref={cueListRef}
                    className="neu-card p-4 flex-1 min-h-0 overflow-y-auto space-y-1"
                >
                    {activeVideo.cues.map((cue, i) => {
                        const isActive = i === currentCueIndex;
                        return (
                            <button
                                key={cue.index}
                                data-cue-index={i}
                                onClick={() => handleSeekToCue(cue)}
                                className={`w - full text - left px - 4 py - 3 rounded - xl transition - all duration - 200 ${isActive
                                        ? 'bg-primary/15 border border-primary/30 shadow-glow-sm'
                                        : 'hover:bg-surface/50 border border-transparent'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-[10px] font-mono text-secondary mt-1 shrink-0 w-12">
                                        {formatTime(cue.startTime)}
                                    </span>
                                    <div className="flex-1 space-y-0.5">
                                        {showJapanese && (
                                            cue.tokens && cue.tokens.length > 0
                                                ? <TokenizedText tokens={cue.tokens} isActive={isActive} />
                                                : <p className={`jp - font font - semibold ${isActive ? 'text-primary text-lg' : 'text-primary'}`}>{cue.text}</p>
                                        )}
                                        {showFurigana && (
                                            <p className={`jp - font text - sm ${isActive ? 'text-secondary' : 'text-secondary/70'}`}>
                                                {cue.furigana}
                                            </p>
                                        )}
                                        {showRomaji && (
                                            <p className={`text - sm italic ${isActive ? 'text-secondary' : 'text-secondary/60'}`}>
                                                {cue.romaji}
                                            </p>
                                        )}
                                        {showTranslation && (
                                            <p className={`text - sm ${isActive ? 'text-accent font-medium' : 'text-secondary/80'}`}>
                                                {cue.translation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── RENDER: Setup View ──
    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={onBack}
                    className="w-10 h-10 neu-btn flex items-center justify-center text-secondary hover:text-primary transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-2xl font-heading font-bold text-primary">Video Study</h2>
                    <p className="text-sm text-secondary">Learn Japanese through video immersion</p>
                </div>
            </div>

            {/* New Video Form */}
            <div className="neu-card p-6 mb-8">
                <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-5 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add New Video
                </h3>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-secondary mb-1.5">Title (optional)</label>
                    <input
                        type="text"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="e.g., Japanese Lesson 1"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-primary placeholder-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                </div>

                {/* YouTube URL */}
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-secondary mb-1.5">YouTube URL</label>
                    <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-transparent text-primary placeholder-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                </div>

                {/* Input mode toggle */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                        onClick={() => setInputMode('srt')}
                        className={`flex items - center justify - center gap - 2 px - 4 py - 3 rounded - xl border - 2 font - semibold text - sm transition - all ${inputMode === 'srt'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-secondary hover:border-primary/50'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Upload .srt
                    </button>
                    <button
                        onClick={() => setInputMode('ai')}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${inputMode === 'ai'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-secondary hover:border-primary/50'
                            }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Transcribe
                    </button>
                </div>

                {/* SRT Upload (only in srt mode) */}
                {
                    inputMode === 'srt' && (
                        <div className="mb-5">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".srt"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary text-secondary hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                {srtFileName
                                    ? <span className="font-semibold">{srtFileName}</span>
                                    : <span>Upload .srt file</span>
                                }
                            </button>
                            {srtContent && (
                                <p className="text-xs text-secondary mt-2">✓ {parseSRT(srtContent).length} subtitles parsed</p>
                            )}
                        </div>
                    )
                }

                {/* AI mode info */}
                {
                    inputMode === 'ai' && (
                        <div className="mb-5 p-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-secondary">
                            <p>Gemini will <strong className="text-primary">transcribe the video audio</strong> and generate furigana, romaji &amp; translation automatically.</p>
                            <p className="mt-1 text-xs opacity-70">~$0.01 per 5-min video · Takes 10–30 seconds</p>
                        </div>
                    )
                }

                {/* Error */}
                {
                    enrichError && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                            {enrichError}
                        </div>
                    )
                }

                {/* Progress */}
                {
                    isEnriching && enrichProgress && (
                        <div className="mb-4 p-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-primary flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            {enrichProgress}
                        </div>
                    )
                }

                {/* Submit */}
                <button
                    onClick={handleEnrichAndStart}
                    disabled={!youtubeUrl || (inputMode === 'srt' && !srtContent) || isEnriching}
                    className={`w-full py-3 rounded-xl font-heading font-bold text-white transition-all flex items-center justify-center gap-2 ${!youtubeUrl || (inputMode === 'srt' && !srtContent) || isEnriching
                        ? 'bg-secondary/40 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90 hover:shadow-glow-sm'
                        }`}
                >
                    {isEnriching ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />Processing...</>
                    ) : inputMode === 'ai' ? (
                        <><Sparkles className="w-5 h-5" />Transcribe &amp; Start</>
                    ) : (
                        <><Play className="w-5 h-5" />Enrich &amp; Start</>
                    )}
                </button>
            </div >

            {/* Video Library */}
            {
                library.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Film className="w-4 h-4" />
                            Your Library
                        </h3>
                        <div className="space-y-3">
                            {library.map((video) => (
                                <div
                                    key={video.id}
                                    className="neu-card p-4 flex items-center gap-4 group"
                                >
                                    <button
                                        onClick={() => setActiveVideo(video)}
                                        className="flex-1 text-left min-w-0"
                                    >
                                        <h4 className="font-heading font-bold text-primary truncate group-hover:text-accent transition-colors">
                                            {video.title}
                                        </h4>
                                        <p className="text-xs text-secondary">
                                            {video.cues.length} subtitles · {new Date(video.createdAt).toLocaleDateString()}
                                        </p>
                                    </button>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => setActiveVideo(video)}
                                            className="neu-btn px-3 py-2 text-primary hover:glow-primary transition-all"
                                            title="Play"
                                        >
                                            <Play className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVideo(video.id)}
                                            className="neu-btn px-3 py-2 text-secondary hover:text-red-500 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

/** Format seconds to MM:SS */
function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

export default VideoStudyMode;
