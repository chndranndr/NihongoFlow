/**
 * NihongoFlow — Progress & Gamification Service
 * Manages XP, levels, streaks, JLPT mastery, and achievements.
 * All state persisted to localStorage.
 */

import { loadCards } from './srsService';

// ─── Storage ────────────────────────────────────────────
const PROGRESS_KEY = 'kita-progress';

// ─── Types ──────────────────────────────────────────────

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface SkillMastery {
    kanji: number;   // 0–100 percentage
    vocab: number;
    grammar: number;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: number; // timestamp
}

export interface UserProgress {
    xp: number;
    level: number;
    streak: number;
    lastActivityDate: string;            // "2026-02-10"
    dailyXp: Record<string, number>;     // date → xp
    jlptMastery: Record<JLPTLevel, SkillMastery>;
    achievements: string[];              // unlocked achievement IDs
    drillsCompleted: number;
    reviewsCompleted: number;
    drillTypesUsed: string[];            // for "Explorer"
    perfectDrills: number;
    grammarQuizzesPassed: string[];      // lesson IDs
}

// ─── XP Rewards ─────────────────────────────────────────

export const XP_REWARDS = {
    DRILL_CORRECT: 10,
    DRILL_PERFECT_BONUS: 25,
    SRS_REVIEW: 5,
    GRAMMAR_QUIZ: 15,
    DAILY_BONUS: 50,
    STREAK_BONUS: 10,      // per day of streak
};

// ─── Level Curve ────────────────────────────────────────

const LEVEL_THRESHOLDS: number[] = [];
{
    // Generate smooth curve: level N requires ~N^2 * 20 total XP
    for (let i = 0; i <= 50; i++) {
        LEVEL_THRESHOLDS.push(Math.round(i * i * 20));
    }
}

export function getLevelFromXP(xp: number): number {
    let level = 1;
    for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            level = i;
        } else {
            break;
        }
    }
    return level;
}

export function getXPForLevel(level: number): number {
    return LEVEL_THRESHOLDS[Math.min(level, 50)] || 0;
}

export function getXPForNextLevel(level: number): number {
    return LEVEL_THRESHOLDS[Math.min(level + 1, 50)] || LEVEL_THRESHOLDS[50];
}

// ─── Achievement Definitions ────────────────────────────

export const ACHIEVEMENT_DEFS: Achievement[] = [
    { id: 'first_steps', name: 'First Steps', description: 'Complete your first drill', icon: '👣' },
    { id: 'kana_master', name: 'Kana Master', description: 'Complete all Hiragana & Katakana', icon: 'あ' },
    { id: 'centurion', name: 'Centurion', description: 'Complete 100 SRS reviews', icon: '💯' },
    { id: 'week_warrior', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥' },
    { id: 'month_master', name: 'Month Master', description: 'Maintain a 30-day streak', icon: '🏔️' },
    { id: 'n5_kanji', name: 'N5 Kanji', description: 'Master all N5 kanji', icon: '字' },
    { id: 'n5_vocab', name: 'N5 Vocab', description: 'Master all N5 vocabulary', icon: '語' },
    { id: 'n5_grammar', name: 'N5 Grammar', description: 'Pass all N5 grammar quizzes', icon: '文' },
    { id: 'n5_complete', name: 'N5 Complete', description: 'Master all N5 skills', icon: '🎌' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 10 cards in under 2s each', icon: '⚡' },
    { id: 'xp_rising', name: 'XP Rising', description: 'Reach 1,000 XP', icon: '⭐' },
    { id: 'xp_legend', name: 'XP Legend', description: 'Reach 10,000 XP', icon: '🌟' },
    { id: 'perfect_drill', name: 'Perfect Drill', description: '100% accuracy on 20+ items', icon: '💎' },
    { id: 'explorer', name: 'Explorer', description: 'Practice all 6 drill types', icon: '🌐' },
    { id: 'night_owl', name: 'Night Owl', description: 'Study after 10 PM', icon: '🦉' },
];

// ─── Default State ──────────────────────────────────────

function createDefaultProgress(): UserProgress {
    return {
        xp: 0,
        level: 1,
        streak: 0,
        lastActivityDate: '',
        dailyXp: {},
        jlptMastery: {
            N5: { kanji: 0, vocab: 0, grammar: 0 },
            N4: { kanji: 0, vocab: 0, grammar: 0 },
            N3: { kanji: 0, vocab: 0, grammar: 0 },
            N2: { kanji: 0, vocab: 0, grammar: 0 },
            N1: { kanji: 0, vocab: 0, grammar: 0 },
        },
        achievements: [],
        drillsCompleted: 0,
        reviewsCompleted: 0,
        drillTypesUsed: [],
        perfectDrills: 0,
        grammarQuizzesPassed: [],
    };
}

// ─── Load / Save ────────────────────────────────────────

export function loadProgress(): UserProgress {
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // Merge with defaults to handle new fields
            return { ...createDefaultProgress(), ...parsed };
        }
    } catch (e) {
        console.error('[Progress] Failed to load:', e);
    }
    return createDefaultProgress();
}

export function saveProgress(progress: UserProgress): void {
    try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error('[Progress] Failed to save:', e);
    }
}

// ─── Today's Date ───────────────────────────────────────

function todayStr(): string {
    return new Date().toISOString().split('T')[0]; // "2026-02-10"
}

function yesterdayStr(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}

// ─── Achievement Event Dispatch ─────────────────────────

function dispatchAchievements(ids: string[]): void {
    if (ids.length > 0) {
        window.dispatchEvent(new CustomEvent('kita-achievement', { detail: ids }));
    }
}

// ─── Core Functions ─────────────────────────────────────

/**
 * Award XP and update streak. Returns newly unlocked achievements.
 */
export function addXP(
    amount: number,
    source: 'drill' | 'review' | 'grammar'
): string[] {
    const progress = loadProgress();
    const today = todayStr();
    const isFirstToday = progress.lastActivityDate !== today;

    // Streak
    if (isFirstToday) {
        if (progress.lastActivityDate === yesterdayStr()) {
            progress.streak += 1;
        } else if (progress.lastActivityDate === '') {
            progress.streak = 1;
        } else {
            progress.streak = 1; // reset
        }
    }

    // Daily bonus
    let totalXP = amount;
    if (isFirstToday) {
        totalXP += XP_REWARDS.DAILY_BONUS;
    }

    // Streak bonus
    if (progress.streak > 1) {
        totalXP += XP_REWARDS.STREAK_BONUS * Math.min(progress.streak, 30);
    }

    // Apply
    progress.xp += totalXP;
    progress.level = getLevelFromXP(progress.xp);
    progress.lastActivityDate = today;
    progress.dailyXp[today] = (progress.dailyXp[today] || 0) + totalXP;

    // Night owl check
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) {
        if (!progress.achievements.includes('night_owl')) {
            progress.achievements.push('night_owl');
        }
    }

    // Check achievements
    const newAchievements = checkAchievements(progress);

    saveProgress(progress);

    return newAchievements;
}

/**
 * Record drill completion. Returns newly unlocked achievements.
 */
export function completeDrill(
    correct: number,
    total: number,
    drillType: string
): string[] {
    const progress = loadProgress();

    progress.drillsCompleted += 1;

    // Track drill types for "Explorer"
    if (!progress.drillTypesUsed.includes(drillType)) {
        progress.drillTypesUsed.push(drillType);
    }

    // Perfect drill
    if (correct === total && total >= 20) {
        progress.perfectDrills += 1;
    }

    saveProgress(progress);

    // Calculate XP
    let xp = correct * XP_REWARDS.DRILL_CORRECT;
    if (correct === total && total > 0) {
        xp += XP_REWARDS.DRILL_PERFECT_BONUS;
    }

    const achievements = addXP(xp, 'drill');
    dispatchAchievements(achievements);
    return achievements;
}

/**
 * Record SRS review completion. Returns newly unlocked achievements.
 */
export function completeReview(cardsReviewed: number): string[] {
    const progress = loadProgress();
    progress.reviewsCompleted += cardsReviewed;
    saveProgress(progress);

    const achievements = addXP(cardsReviewed * XP_REWARDS.SRS_REVIEW, 'review');
    dispatchAchievements(achievements);
    return achievements;
}

/**
 * Record grammar quiz pass. Returns newly unlocked achievements.
 */
export function completeGrammarQuiz(lessonId: string): string[] {
    const progress = loadProgress();
    if (!progress.grammarQuizzesPassed.includes(lessonId)) {
        progress.grammarQuizzesPassed.push(lessonId);
    }
    saveProgress(progress);

    const achievements = addXP(XP_REWARDS.GRAMMAR_QUIZ, 'grammar');
    dispatchAchievements(achievements);
    return achievements;
}

// ─── JLPT Mastery ───────────────────────────────────────

// Total items per JLPT level (from data files)
const JLPT_TOTALS = {
    N5: { kanji: 88, vocab: 644, grammar: 72 },
    N4: { kanji: 41, vocab: 0, grammar: 0 },
};

/**
 * Recalculate JLPT mastery from SRS data and grammar quiz progress.
 * 
 * Kanji/Vocab mastery uses graduated SRS thresholds:
 *   - Card with ≥1 successful rep = "learning" (counts 30%)
 *   - Card with ≥3 successful reps = "mastered" (counts 100%)
 * Grammar mastery = passed quiz count / total quizzes.
 */
export function recalculateJLPTMastery(): Record<JLPTLevel, SkillMastery> {
    const progress = loadProgress();
    let cards: any[] = [];
    try { cards = loadCards(); } catch { /* SRS not initialized */ }

    // Count cards by progress level
    let learningKanji = 0, masteredKanji = 0;
    let learningVocab = 0, masteredVocab = 0;

    cards.forEach(card => {
        if (card.repetitions >= 3) {
            if (card.category === 'KANJI') masteredKanji++;
            else if (card.category === 'VOCAB') masteredVocab++;
        } else if (card.repetitions >= 1) {
            if (card.category === 'KANJI') learningKanji++;
            else if (card.category === 'VOCAB') learningVocab++;
        }
    });

    // Weighted score: learning = 30%, mastered = 100%
    const kanjiScore = (learningKanji * 0.3) + masteredKanji;
    const vocabScore = (learningVocab * 0.3) + masteredVocab;

    // Grammar: count passed quizzes
    const n5GrammarPassed = (progress.grammarQuizzesPassed || []).length;

    const mastery: Record<JLPTLevel, SkillMastery> = {
        N5: {
            kanji: JLPT_TOTALS.N5.kanji > 0
                ? Math.min(100, Math.round((kanjiScore / JLPT_TOTALS.N5.kanji) * 100))
                : 0,
            vocab: JLPT_TOTALS.N5.vocab > 0
                ? Math.min(100, Math.round((vocabScore / JLPT_TOTALS.N5.vocab) * 100))
                : 0,
            grammar: JLPT_TOTALS.N5.grammar > 0
                ? Math.min(100, Math.round((n5GrammarPassed / JLPT_TOTALS.N5.grammar) * 100))
                : 0,
        },
        N4: { kanji: 0, vocab: 0, grammar: 0 },
        N3: { kanji: 0, vocab: 0, grammar: 0 },
        N2: { kanji: 0, vocab: 0, grammar: 0 },
        N1: { kanji: 0, vocab: 0, grammar: 0 },
    };

    progress.jlptMastery = mastery;
    saveProgress(progress);

    return mastery;
}

// ─── Achievement Checking ───────────────────────────────

function checkAchievements(progress: UserProgress): string[] {
    const newlyUnlocked: string[] = [];

    const checks: Record<string, () => boolean> = {
        first_steps: () => progress.drillsCompleted >= 1,
        centurion: () => progress.reviewsCompleted >= 100,
        week_warrior: () => progress.streak >= 7,
        month_master: () => progress.streak >= 30,
        xp_rising: () => progress.xp >= 1000,
        xp_legend: () => progress.xp >= 10000,
        perfect_drill: () => progress.perfectDrills >= 1,
        explorer: () => progress.drillTypesUsed.length >= 6,
        n5_grammar: () => progress.grammarQuizzesPassed.length >= JLPT_TOTALS.N5.grammar,
        n5_complete: () => {
            const m = progress.jlptMastery?.N5;
            return m ? m.kanji >= 100 && m.vocab >= 100 && m.grammar >= 100 : false;
        },
    };

    for (const [id, check] of Object.entries(checks)) {
        if (!progress.achievements.includes(id) && check()) {
            progress.achievements.push(id);
            newlyUnlocked.push(id);
        }
    }

    return newlyUnlocked;
}

// ─── Utilities ──────────────────────────────────────────

/**
 * Get the last 7 days of XP data for the weekly chart.
 */
export function getWeeklyXP(): { day: string; xp: number }[] {
    const progress = loadProgress();
    const result: { day: string; xp: number }[] = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        result.push({
            day: days[d.getDay()],
            xp: progress.dailyXp[dateStr] || 0,
        });
    }

    return result;
}

/**
 * Get overall N5 progress percentage.
 */
export function getN5OverallProgress(): number {
    const progress = loadProgress();
    const m = progress.jlptMastery?.N5;
    if (!m) return 0;
    return Math.round((m.kanji + m.vocab + m.grammar) / 3);
}
