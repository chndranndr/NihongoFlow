import { GrammarLesson } from '../../types';
import { GRAMMAR_N5 } from './n5';

export const GRAMMAR_LIBRARY: GrammarLesson[] = [
    ...GRAMMAR_N5,
];

// Re-export individual levels for direct access
export { GRAMMAR_N5 };
