
export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  KANA_SELECT = 'KANA_SELECT',
  CATEGORY_SELECT = 'CATEGORY_SELECT',
  CATEGORY_DETAIL = 'CATEGORY_DETAIL',
  DRILL = 'DRILL',
  GRAMMAR_LIBRARY = 'GRAMMAR_LIBRARY',
  AI_GRAMMAR = 'AI_GRAMMAR',
  KAIWA = 'KAIWA',
  IMAGE_ANALYZER = 'IMAGE_ANALYZER',
  SRS_REVIEW = 'SRS_REVIEW',
  SRS_STATS = 'SRS_STATS',
  NUMBER_DRILL_SETUP = 'NUMBER_DRILL_SETUP',
  NUMBER_DRILL = 'NUMBER_DRILL',
  DATE_DRILL_SETUP = 'DATE_DRILL_SETUP',
  DATE_DRILL = 'DATE_DRILL',
  CONJUGATION_DRILL_SETUP = 'CONJUGATION_DRILL_SETUP',
  CONJUGATION_DRILL = 'CONJUGATION_DRILL',
  PROGRESS = 'PROGRESS',
  ABOUT = 'ABOUT',
  VIDEO_STUDY = 'VIDEO_STUDY',
}

export enum DrillCategory {
  KANA = 'KANA',
  KANJI = 'KANJI',
  VOCAB = 'VOCAB',
  NUMBERS = 'NUMBERS',
  DATES = 'DATES',
  CONJUGATION = 'CONJUGATION',
}

// Number drill direction
export type NumberDrillDirection = 'jp-to-num' | 'num-to-jp';

export interface NumberDrillConfig {
  direction: NumberDrillDirection;
  minRange: number;
  maxRange: number;
  itemCount: number;
}

// Date drill mode
export type DateDrillMode = 'days-of-week' | 'full-date';
export type DateDrillDirection = 'jp-to-en' | 'en-to-jp';

export interface DateDrillConfig {
  mode: DateDrillMode;
  direction: DateDrillDirection;
  startYear?: number;
  endYear?: number;
  itemCount: number;
}

// Conjugation drill config
export type ConjugationWordType = 'verb' | 'adjective';
export type ConjugationVerbType = 'godan' | 'ichidan' | 'irregular';
export type ConjugationAdjType = 'i-adjective' | 'na-adjective';
export type ConjugationFormType =
  | 'masu' | 'te' | 'negative' | 'past' | 'past-negative'
  | 'potential' | 'passive' | 'volitional' | 'imperative' | 'polite-imperative' | 'conditional' | 'tai';

export interface ConjugationDrillConfig {
  wordType: ConjugationWordType;
  verbTypes: ConjugationVerbType[];
  adjectiveTypes: ConjugationAdjType[];
  forms: ConjugationFormType[];
  itemCount: number;
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner (N5)',
  INTERMEDIATE = 'Intermediate (N4/N3)',
  ADVANCED = 'Advanced (N2/N1)',
}

// Word category (part of speech)
export type WordCategory =
  | 'noun'
  | 'verb'
  | 'i-adjective'
  | 'na-adjective'
  | 'adverb'
  | 'particle'
  | 'conjunction'
  | 'counter'
  | 'expression'
  | 'prefix'
  | 'suffix'
  | 'interjection'
  | 'pronoun'
  | 'other';

// Verb conjugation class
export type VerbCategory = 'godan' | 'ichidan' | 'irregular';

export interface DrillItem {
  id?: string;
  character: string; // The main display (Kanji, Kana, or Word)
  reading?: string;  // Hiragana reading (used for conjugation engine stem operations)
  primaryReading: string; // Expected romaji answer
  alternateReadings?: string[]; // Other acceptable romaji
  meaning: string;
  onyomi?: string[];
  kunyomi?: string[];
  example?: string;
  category?: WordCategory;      // Part of speech (verb, noun, adjective, etc.)
  verbCategory?: VerbCategory;  // Verb conjugation class (only for verbs)
}

export interface GrammarLesson {
  id: string;
  title: string;
  level: string; // N5, N4, etc.
  explanation: string;
  examples: {
    japanese: string;
    english: string;
    romaji: string;
  }[];
  quiz: {
    question: string;
    options: string[]; // 4 options
    correctAnswerIndex: number;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Video Study types
export interface SubtitleCue {
  index: number;
  startTime: number;  // seconds
  endTime: number;    // seconds
  text: string;       // original Japanese text
}

export type GrammarPOS =
  | 'noun' | 'verb' | 'adjective' | 'adverb'
  | 'particle' | 'auxiliary' | 'conjunction'
  | 'interjection' | 'other';

export interface GrammarToken {
  text: string;
  pos: GrammarPOS;
}

export interface EnrichedCue extends SubtitleCue {
  furigana: string;   // full hiragana reading
  romaji: string;
  translation: string;
  tokens?: GrammarToken[]; // optional — present only after enrichment
}

export interface VideoEntry {
  id: string;
  title: string;
  youtubeId: string;
  cues: EnrichedCue[];
  subtitleOffset: number; // ms offset (+ = delay subs, - = advance subs)
  createdAt: number;
}
