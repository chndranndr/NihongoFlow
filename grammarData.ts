import { GrammarLesson } from './types';

export const GRAMMAR_LIBRARY: GrammarLesson[] = [
  {
    id: 'g1',
    title: 'Topic Marker は (Wa)',
    level: 'Beginner',
    explanation: 'The particle は (pronounced "wa") marks the topic of the sentence.',
    examples: [
      { japanese: '私は田中です。', romaji: 'Watashi wa Tanaka desu.', english: 'I am Tanaka.' },
    ],
    quiz: {
      question: 'Watashi ___ gakusei desu.',
      options: ['wo', 'wa', 'ga', 'ni'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'g2',
    title: 'Possessive の (No)',
    level: 'Beginner',
    explanation: 'The particle の connects two nouns to show possession.',
    examples: [
      { japanese: '私の本', romaji: 'Watashi no hon', english: 'My book' },
    ],
    quiz: {
      question: 'Kore wa watashi ___ pen desu.',
      options: ['no', 'wa', 'to', 'mo'],
      correctAnswerIndex: 0
    }
  }
];
