import { DrillItem } from './types';

export const VOCAB_DATA: Record<string, Record<string, DrillItem[]>> = {
  'BEGINNER': {
    'Greetings': [
      { character: 'こんにちは', primaryReading: 'konnichiwa', meaning: 'Hello' },
      { character: 'ありがとう', primaryReading: 'arigatou', meaning: 'Thank you' },
      { character: 'さようなら', primaryReading: 'sayounara', meaning: 'Goodbye' },
    ],
    'Food': [
      { character: '食べる', primaryReading: 'taberu', meaning: 'To eat' },
      { character: '飲む', primaryReading: 'nomu', meaning: 'To drink' },
      { character: 'ご飯', primaryReading: 'gohan', meaning: 'Rice/Meal' },
      { character: '水', primaryReading: 'mizu', meaning: 'Water' },
    ],
    'Daily Life': [
      { character: '行く', primaryReading: 'iku', meaning: 'To go' },
      { character: '来る', primaryReading: 'kuru', meaning: 'To come' },
      { character: '見る', primaryReading: 'miru', meaning: 'To see' },
      { character: '寝る', primaryReading: 'neru', meaning: 'To sleep' },
    ]
  }
};
