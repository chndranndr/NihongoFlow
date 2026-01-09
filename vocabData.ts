import { DrillItem } from './types';

export const VOCAB_DATA: Record<string, Record<string, DrillItem[]>> = {
  'BEGINNER': {
    'Greetings & Introductions': [
      { character: 'はじめまして', primaryReading: 'hajimemashite', meaning: 'Nice to meet you' },
      { character: 'こんにちは', primaryReading: 'konnichiwa', meaning: 'Hello' },
      { character: 'ありがとう', primaryReading: 'arigatou', meaning: 'Thank you' },
      { character: 'さようなら', primaryReading: 'sayounara', meaning: 'Goodbye' },
      { character: 'わたし', primaryReading: 'watashi', meaning: 'I / Me' },
      { character: 'なまえ', primaryReading: 'namae', meaning: 'Name' },
      { character: 'くに', primaryReading: 'kuni', meaning: 'Country' },
      { character: 'しごと', primaryReading: 'shigoto', meaning: 'Job / Work' },
      { character: 'がくせい', primaryReading: 'gakusei', meaning: 'Student' },
      { character: 'かいしゃいん', primaryReading: 'kaishain', meaning: 'Company Employee' },
      { character: 'せんせい', primaryReading: 'sensei', meaning: 'Teacher' }
    ],
    'Numbers & Time': [
      { character: 'いち', primaryReading: 'ichi', meaning: 'One' },
      { character: 'に', primaryReading: 'ni', meaning: 'Two' },
      { character: 'さん', primaryReading: 'san', meaning: 'Three' },
      { character: 'じゅう', primaryReading: 'juu', meaning: 'Ten' },
      { character: 'はたち', primaryReading: 'hatachi', meaning: '20 years old' },
      { character: 'きのう', primaryReading: 'kinou', meaning: 'Yesterday' },
      { character: 'きょう', primaryReading: 'kyou', meaning: 'Today' },
      { character: 'あした', primaryReading: 'ashita', meaning: 'Tomorrow' },
      { character: 'まいにち', primaryReading: 'mainichi', meaning: 'Every day' },
      { character: 'あさ', primaryReading: 'asa', meaning: 'Morning' },
      { character: 'ひる', primaryReading: 'hiru', meaning: 'Noon / Daytime' },
      { character: 'ばん', primaryReading: 'ban', meaning: 'Night' },
      { character: 'いつ', primaryReading: 'itsu', meaning: 'When' }
    ],
    'Daily Activities (Verbs)': [
      { character: 'たべる', primaryReading: 'taberu', meaning: 'To eat' },
      { character: 'のむ', primaryReading: 'nomu', meaning: 'To drink' },
      { character: 'いく', primaryReading: 'iku', meaning: 'To go' },
      { character: 'くる', primaryReading: 'kuru', meaning: 'To come' },
      { character: 'みる', primaryReading: 'miru', meaning: 'To see / watch' },
      { character: 'ねる', primaryReading: 'neru', meaning: 'To sleep' },
      { character: 'おきる', primaryReading: 'okiru', meaning: 'To wake up' },
      { character: 'べんきょうする', primaryReading: 'benkyou suru', meaning: 'To study' },
      { character: 'する', primaryReading: 'suru', meaning: 'To do' },
      { character: 'かえる', primaryReading: 'kaeru', meaning: 'To return (home)' },
      { character: 'あう', primaryReading: 'au', meaning: 'To meet' },
      { character: 'あそぶ', primaryReading: 'asobu', meaning: 'To play' },
      { character: 'はなす', primaryReading: 'hanasu', meaning: 'To speak' }
    ],
    'Places & Location': [
      { character: 'がっこう', primaryReading: 'gakkou', meaning: 'School' },
      { character: 'かいしゃ', primaryReading: 'kaisha', meaning: 'Company' },
      { character: 'うち', primaryReading: 'uchi', meaning: 'House / Home' },
      { character: 'えき', primaryReading: 'eki', meaning: 'Station' },
      { character: 'コンビニ', primaryReading: 'konbini', meaning: 'Convenience Store' },
      { character: 'スーパー', primaryReading: 'suupaa', meaning: 'Supermarket' },
      { character: 'こうえん', primaryReading: 'kouen', meaning: 'Park' },
      { character: 'うえ', primaryReading: 'ue', meaning: 'Up / Above' },
      { character: 'した', primaryReading: 'shita', meaning: 'Down / Below' },
      { character: 'なか', primaryReading: 'naka', meaning: 'Inside' },
      { character: 'そと', primaryReading: 'soto', meaning: 'Outside' },
      { character: 'となり', primaryReading: 'tonari', meaning: 'Next to' }
    ],
    'Adjectives': [
      { character: 'おおきい', primaryReading: 'ookii', meaning: 'Big' },
      { character: 'ちいさい', primaryReading: 'chiisai', meaning: 'Small' },
      { character: 'あたらしい', primaryReading: 'atarashii', meaning: 'New' },
      { character: 'ふるい', primaryReading: 'furui', meaning: 'Old' },
      { character: 'いい', primaryReading: 'ii', meaning: 'Good' },
      { character: 'わるい', primaryReading: 'warui', meaning: 'Bad' },
      { character: 'あつい', primaryReading: 'atsui', meaning: 'Hot' },
      { character: 'さむい', primaryReading: 'samui', meaning: 'Cold' },
      { character: 'たかい', primaryReading: 'takai', meaning: 'Expensive / High' },
      { character: 'やすい', primaryReading: 'yasui', meaning: 'Cheap' },
      { character: 'おいしい', primaryReading: 'oishii', meaning: 'Delicious' },
      { character: 'たのしい', primaryReading: 'tanoshii', meaning: 'Fun' },
      { character: 'げんき', primaryReading: 'genki', meaning: 'Healthy / Energetic' },
      { character: 'しずか', primaryReading: 'shizuka', meaning: 'Quiet' },
      { character: 'きれい', primaryReading: 'kirei', meaning: 'Beautiful / Clean' },
      { character: 'しんせつ', primaryReading: 'shinsetsu', meaning: 'Kind' },
      { character: 'すき', primaryReading: 'suki', meaning: 'To like' },
      { character: 'きらい', primaryReading: 'kirai', meaning: 'To dislike' }
    ],
    'Food & Drink': [
      { character: 'ごはん', primaryReading: 'gohan', meaning: 'Rice / Meal' },
      { character: 'ぱん', primaryReading: 'pan', meaning: 'Bread' },
      { character: 'みず', primaryReading: 'mizu', meaning: 'Water' },
      { character: 'ジュース', primaryReading: 'juusu', meaning: 'Juice' },
      { character: 'コーヒー', primaryReading: 'koohii', meaning: 'Coffee' },
      { character: 'おちゃ', primaryReading: 'ocha', meaning: 'Tea' },
      { character: 'さかな', primaryReading: 'sakana', meaning: 'Fish' },
      { character: 'にく', primaryReading: 'niku', meaning: 'Meat' },
      { character: 'やさい', primaryReading: 'yasui', meaning: 'Vegetables' }
    ],
    'Body & Health': [
      { character: 'あたま', primaryReading: 'atama', meaning: 'Head' },
      { character: 'め', primaryReading: 'me', meaning: 'Eye' },
      { character: 'みみ', primaryReading: 'mimi', meaning: 'Ear' },
      { character: 'て', primaryReading: 'te', meaning: 'Hand' },
      { character: 'あし', primaryReading: 'ashi', meaning: 'Leg / Foot' },
      { character: 'おなか', primaryReading: 'onaka', meaning: 'Stomach' },
      { character: 'かぜ', primaryReading: 'kaze', meaning: 'Cold (illness)' },
      { character: 'くすり', primaryReading: 'kusuri', meaning: 'Medicine' }
    ]
  }
};
