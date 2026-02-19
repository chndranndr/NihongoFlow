// SRS Service - SM-2 Algorithm Implementation with Timer-Based Quality
import { SRSCard, SRSStats, SRSQuality, FAST_ANSWER_THRESHOLD_MS } from '../srsTypes';
import { DrillItem, DrillCategory } from '../types';
import { KANJI_DATA } from '../data/kanji';
import { VOCAB_DATA } from '../data/vocab';

const SRS_STORAGE_KEY = 'nihongoflow-srs';
const STATS_STORAGE_KEY = 'nihongoflow-srs-stats';

// Default ease factor for new cards
const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

// SM-2 Algorithm Implementation
export function calculateNextReview(
    card: SRSCard,
    quality: SRSQuality
): Partial<SRSCard> {
    let { easeFactor, repetitions, interval } = card;

    // If answer was wrong (Again), reset progress
    if (quality < 3) {
        repetitions = 0;
        interval = 0; // Due immediately (will show again in same session)
    } else {
        // Correct answer - calculate new interval
        if (repetitions === 0) {
            interval = 1; // First successful review: 1 day
        } else if (repetitions === 1) {
            interval = 6; // Second successful review: 6 days
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    }

    // Update ease factor based on quality (SM-2 formula)
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < MIN_EASE_FACTOR) {
        easeFactor = MIN_EASE_FACTOR;
    }

    const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

    return {
        easeFactor,
        repetitions,
        interval,
        nextReviewDate,
        lastReviewDate: Date.now(),
    };
}

// Determine quality based on correctness and response time
export function getQuality(isCorrect: boolean, responseTimeMs: number): SRSQuality {
    if (!isCorrect) {
        return SRSQuality.AGAIN;
    }
    return responseTimeMs <= FAST_ANSWER_THRESHOLD_MS ? SRSQuality.EASY : SRSQuality.GOOD;
}

// Create a unique ID for a card
function createCardId(character: string, category: 'KANJI' | 'VOCAB'): string {
    return `${category}-${character}`;
}

// Initialize SRS cards from existing data
export function initializeAllCards(): SRSCard[] {
    const cards: SRSCard[] = [];
    const now = Date.now();

    // Add Kanji cards
    Object.entries(KANJI_DATA).forEach(([level, categories]) => {
        Object.entries(categories).forEach(([categoryName, items]) => {
            items.forEach((item: DrillItem) => {
                cards.push({
                    id: createCardId(item.character, 'KANJI'),
                    character: item.character,
                    category: 'KANJI',
                    easeFactor: DEFAULT_EASE_FACTOR,
                    repetitions: 0,
                    interval: 0,
                    nextReviewDate: now, // New cards are due immediately
                    lastReviewDate: 0,
                    primaryReading: item.primaryReading,
                    meaning: item.meaning,
                    onyomi: item.onyomi,
                    kunyomi: item.kunyomi,
                });
            });
        });
    });

    // Add Vocab cards
    Object.entries(VOCAB_DATA).forEach(([level, categories]) => {
        Object.entries(categories).forEach(([categoryName, items]) => {
            items.forEach((item: DrillItem) => {
                cards.push({
                    id: createCardId(item.character, 'VOCAB'),
                    character: item.character,
                    category: 'VOCAB',
                    easeFactor: DEFAULT_EASE_FACTOR,
                    repetitions: 0,
                    interval: 0,
                    nextReviewDate: now,
                    lastReviewDate: 0,
                    primaryReading: item.primaryReading,
                    meaning: item.meaning,
                });
            });
        });
    });

    return cards;
}

// Load SRS cards from localStorage
export function loadCards(): SRSCard[] {
    try {
        const stored = localStorage.getItem(SRS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load SRS cards:', e);
    }
    // Initialize with all cards if nothing stored
    const cards = initializeAllCards();
    saveCards(cards);
    return cards;
}

// Save SRS cards to localStorage
export function saveCards(cards: SRSCard[]): void {
    try {
        localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
        console.error('Failed to save SRS cards:', e);
    }
}

// Get cards due for review
export function getDueCards(cards: SRSCard[], limit: number = 20): SRSCard[] {
    const now = Date.now();
    return cards
        .filter(card => card.nextReviewDate <= now)
        .sort((a, b) => a.nextReviewDate - b.nextReviewDate)
        .slice(0, limit);
}

// Get new cards (never reviewed)
export function getNewCards(cards: SRSCard[], limit: number = 10): SRSCard[] {
    return cards
        .filter(card => card.repetitions === 0 && card.lastReviewDate === 0)
        .slice(0, limit);
}

// Update a card after review
export function updateCard(
    cards: SRSCard[],
    cardId: string,
    isCorrect: boolean,
    responseTimeMs: number
): SRSCard[] {
    const quality = getQuality(isCorrect, responseTimeMs);

    return cards.map(card => {
        if (card.id === cardId) {
            const updates = calculateNextReview(card, quality);
            return { ...card, ...updates };
        }
        return card;
    });
}

// Calculate statistics
export function calculateStats(cards: SRSCard[]): SRSStats {
    const now = Date.now();
    const todayStart = new Date().setHours(0, 0, 0, 0);

    const dueToday = cards.filter(c => c.nextReviewDate <= now).length;
    const newCards = cards.filter(c => c.repetitions === 0 && c.lastReviewDate === 0).length;
    const learnedCards = cards.filter(c => c.repetitions > 0).length;

    // Load streak from storage
    let streak = 0;
    let lastReviewDate = 0;
    try {
        const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
        if (storedStats) {
            const parsed = JSON.parse(storedStats);
            streak = parsed.streak || 0;
            lastReviewDate = parsed.lastReviewDate || 0;

            // Check if streak is still valid (reviewed yesterday or today)
            const oneDayAgo = todayStart - 24 * 60 * 60 * 1000;
            if (lastReviewDate < oneDayAgo) {
                streak = 0; // Streak broken
            }
        }
    } catch (e) {
        console.error('Failed to load stats:', e);
    }

    return {
        totalCards: cards.length,
        dueToday,
        newCards,
        learnedCards,
        streak,
        lastReviewDate,
    };
}

// Update streak after completing a review session
export function updateStreak(): void {
    try {
        const now = Date.now();
        const todayStart = new Date().setHours(0, 0, 0, 0);
        const storedStats = localStorage.getItem(STATS_STORAGE_KEY);

        let streak = 1;
        if (storedStats) {
            const parsed = JSON.parse(storedStats);
            const lastDate = new Date(parsed.lastReviewDate).setHours(0, 0, 0, 0);

            if (lastDate === todayStart) {
                // Already reviewed today, keep streak
                streak = parsed.streak;
            } else if (lastDate === todayStart - 24 * 60 * 60 * 1000) {
                // Reviewed yesterday, increment streak
                streak = (parsed.streak || 0) + 1;
            }
            // Otherwise streak resets to 1
        }

        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({
            streak,
            lastReviewDate: now,
        }));
    } catch (e) {
        console.error('Failed to update streak:', e);
    }
}
