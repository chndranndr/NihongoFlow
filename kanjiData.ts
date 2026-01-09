import { DrillItem } from './types';

export const KANJI_DATA: Record<string, Record<string, DrillItem[]>> = {
  'BEGINNER': {
    'Numbers': [
      { character: '一', primaryReading: 'ichi', meaning: 'One', onyomi: ['ICHI'], kunyomi: ['hito-tsu'] },
      { character: '二', primaryReading: 'ni', meaning: 'Two', onyomi: ['NI'], kunyomi: ['futa-tsu'] },
      { character: '三', primaryReading: 'san', meaning: 'Three', onyomi: ['SAN'], kunyomi: ['mit-tsu'] },
      { character: '十', primaryReading: 'juu', meaning: 'Ten', onyomi: ['JUU'], kunyomi: ['too'] },
    ],
    'Nature': [
      { character: '日', primaryReading: 'nichi', meaning: 'Day/Sun', onyomi: ['NICHI', 'JITSU'], kunyomi: ['hi'] },
      { character: '月', primaryReading: 'getsu', meaning: 'Month/Moon', onyomi: ['GETSU', 'GATSU'], kunyomi: ['tsuki'] },
      { character: '火', primaryReading: 'ka', meaning: 'Fire', onyomi: ['KA'], kunyomi: ['hi'] },
      { character: '水', primaryReading: 'sui', meaning: 'Water', onyomi: ['SUI'], kunyomi: ['mizu'] },
      { character: '木', primaryReading: 'moku', meaning: 'Tree', onyomi: ['MOKU'], kunyomi: ['ki'] },
    ],
    'People': [
      { character: '人', primaryReading: 'jin', meaning: 'Person', onyomi: ['JIN', 'NIN'], kunyomi: ['hito'] },
      { character: '子', primaryReading: 'shi', meaning: 'Child', onyomi: ['SHI'], kunyomi: ['ko'] },
      { character: '女', primaryReading: 'jo', meaning: 'Woman', onyomi: ['JO'], kunyomi: ['onna'] },
      { character: '男', primaryReading: 'dan', meaning: 'Man', onyomi: ['DAN'], kunyomi: ['otoko'] },
    ]
  },
  'INTERMEDIATE': {
    'Society': [
      { character: '政', primaryReading: 'sei', meaning: 'Politics', onyomi: ['SEI'], kunyomi: ['matsurigoto'] },
      { character: '経', primaryReading: 'kei', meaning: 'Management', onyomi: ['KEI'], kunyomi: ['he-ru'] },
      { character: '済', primaryReading: 'sai', meaning: 'Settle/Finish', onyomi: ['SAI'], kunyomi: ['su-mu'] },
    ]
  }
};
