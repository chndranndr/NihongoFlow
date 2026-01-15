
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
}

export enum DrillCategory {
  KANA = 'KANA',
  KANJI = 'KANJI',
  VOCAB = 'VOCAB',
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner (N5)',
  INTERMEDIATE = 'Intermediate (N4/N3)',
  ADVANCED = 'Advanced (N2/N1)',
}

export interface DrillItem {
  id?: string;
  character: string; // The main display (Kanji, Kana, or Word)
  primaryReading: string; // Expected romaji answer
  alternateReadings?: string[]; // Other acceptable romaji
  meaning: string;
  onyomi?: string[];
  kunyomi?: string[];
  example?: string;
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
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
