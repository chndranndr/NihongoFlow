import { DrillItem } from '../../types';
import { VOCAB_N5 } from './n5';

export const VOCAB_DATA: Record<string, Record<string, DrillItem[]>> = {
    BEGINNER: VOCAB_N5,
};

// Re-export individual levels for direct access
export { VOCAB_N5 };
