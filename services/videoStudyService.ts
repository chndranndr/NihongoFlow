import { SubtitleCue, EnrichedCue, VideoEntry } from '../types';

const STORAGE_KEY = 'kita-video-library';

/**
 * Parses an SRT timestamp (HH:MM:SS,mmm) into seconds.
 */
function parseTimestamp(ts: string): number {
    const [time, ms] = ts.trim().split(',');
    const [h, m, s] = time.split(':').map(Number);
    return h * 3600 + m * 60 + s + parseInt(ms, 10) / 1000;
}

/**
 * Parses SRT content into an array of SubtitleCue objects.
 */
export function parseSRT(srtContent: string): SubtitleCue[] {
    const cues: SubtitleCue[] = [];
    // Normalize line endings and split into blocks
    const blocks = srtContent
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim()
        .split(/\n\n+/);

    for (const block of blocks) {
        const lines = block.split('\n').filter(l => l.trim() !== '');
        if (lines.length < 3) continue;

        const index = parseInt(lines[0], 10);
        if (isNaN(index)) continue;

        const timeLine = lines[1];
        const timeMatch = timeLine.match(
            /(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})/
        );
        if (!timeMatch) continue;

        const startTime = parseTimestamp(timeMatch[1].replace('.', ','));
        const endTime = parseTimestamp(timeMatch[2].replace('.', ','));
        const text = lines.slice(2).join(' ').trim();

        if (text) {
            cues.push({ index, startTime, endTime, text });
        }
    }

    return cues;
}

/**
 * Extracts a YouTube video ID from various URL formats.
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, etc.
 */
export function extractYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/, // bare ID
    ];
    for (const pattern of patterns) {
        const match = url.trim().match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Loads all saved videos from localStorage.
 */
export function loadVideos(): VideoEntry[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * Saves a video entry to the library.
 */
export function saveVideo(entry: VideoEntry): void {
    const videos = loadVideos();
    // Replace if same ID exists, otherwise prepend
    const idx = videos.findIndex(v => v.id === entry.id);
    if (idx >= 0) {
        videos[idx] = entry;
    } else {
        videos.unshift(entry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

/**
 * Deletes a video entry from the library.
 */
export function deleteVideo(id: string): void {
    const videos = loadVideos().filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

/**
 * Updates just the subtitle offset for a video.
 */
export function updateVideoOffset(id: string, offset: number): void {
    const videos = loadVideos();
    const video = videos.find(v => v.id === id);
    if (video) {
        video.subtitleOffset = offset;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    }
}
