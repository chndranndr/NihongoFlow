// SRS Types for NihongoFlow

export interface SRSCard {
    id: string;                    // Unique identifier (character + category)
    character: string;             // The item being learned
    category: 'KANJI' | 'VOCAB';   // Type of item

    // SM-2 algorithm fields
    easeFactor: number;            // Difficulty multiplier (default 2.5)
    repetitions: number;           // Number of successful reviews
    interval: number;              // Days until next review
    nextReviewDate: number;        // Timestamp of next review
    lastReviewDate: number;        // Timestamp of last review

    // Original data reference
    primaryReading: string;
    meaning: string;
    onyomi?: string[];
    kunyomi?: string[];
}

export interface SRSStats {
    totalCards: number;
    dueToday: number;
    newCards: number;
    learnedCards: number;          // Cards with at least 1 successful review
    streak: number;                // Consecutive days of reviews
    lastReviewDate: number;        // For streak calculation
}

export interface SRSReviewSession {
    cardsReviewed: number;
    correctCount: number;
    wrongCount: number;
    startTime: number;
    endTime?: number;
}

// Quality ratings based on answer correctness and time
export enum SRSQuality {
    AGAIN = 1,    // Wrong answer
    GOOD = 3,     // Correct but slow (>5s)
    EASY = 5,     // Correct and fast (≤5s)
}

// Time threshold for fast/slow answers (milliseconds)
export const FAST_ANSWER_THRESHOLD_MS = 5000;
