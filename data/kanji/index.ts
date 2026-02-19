import { DrillItem } from '../../types';
import { KANJI_N5 } from './n5';
import { KANJI_N4 } from './n4';

export const KANJI_DATA: Record<string, Record<string, DrillItem[]>> = {
    BEGINNER: KANJI_N5,
    INTERMEDIATE: KANJI_N4,
};

// Re-export individual levels for direct access
export { KANJI_N5, KANJI_N4 };
