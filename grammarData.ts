import { GrammarLesson } from './types';

export const GRAMMAR_LIBRARY: GrammarLesson[] = [
  // ═══════════════════════════════════════════════════════
  // SECTION 1: BASIC SENTENCE STRUCTURE & COPULA
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_desu', title: 'Copula: Desu (です)', level: 'N5',
    explanation: 'Desu (です) is the polite copula, equivalent to "is/am/are." It links a subject to a noun or na-adjective. Its plain form is "da" (だ). Use desu at the end of a sentence to make it polite.',
    examples: [
      { japanese: 'わたしはがくせいです。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' },
      { japanese: 'これはほんです。', romaji: 'Kore wa hon desu.', english: 'This is a book.' },
      { japanese: 'たなかさんはせんせいです。', romaji: 'Tanaka-san wa sensei desu.', english: 'Mr. Tanaka is a teacher.' },
    ],
    quiz: [
      { question: 'Watashi wa gakusei ___.', options: ['desu', 'da', 'masu', 'nai'], correctAnswerIndex: 0 },
      { question: 'Kore wa nan ___ ka.', options: ['desu', 'da', 'ga', 'wo'], correctAnswerIndex: 0 },
      { question: 'Which is the polite copula?', options: ['です', 'だ', 'ます', 'ない'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_janai', title: 'Negative Copula: Janai (じゃない)', level: 'N5',
    explanation: 'To negate da/desu, use "ja nai desu" or the more formal "dewa arimasen." The past negative is "ja nakatta desu" or "dewa arimasen deshita."',
    examples: [
      { japanese: 'がくせいじゃないです。', romaji: 'Gakusei ja nai desu.', english: 'I am not a student.' },
      { japanese: 'にほんじんではありません。', romaji: 'Nihonjin dewa arimasen.', english: 'I am not Japanese.' },
      { japanese: 'きのうはにちようびじゃなかったです。', romaji: 'Kinou wa nichiyoubi ja nakatta desu.', english: 'Yesterday was not Sunday.' },
    ],
    quiz: [
      { question: 'Gakusei ___ desu.', options: ['ja nai', 'janai', 'dewanai', 'ja nai'], correctAnswerIndex: 0 },
      { question: 'Which is the formal negative of desu?', options: ['dewa arimasen', 'ja nai', 'masen', 'nai desu'], correctAnswerIndex: 0 },
      { question: 'Past negative: Gakusei ___ desu.', options: ['ja nakatta', 'ja nai', 'dewa nai', 'ja arimasen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_deshou', title: 'Probability: Deshou (でしょう)', level: 'N5',
    explanation: 'Deshou (でしょう) expresses probability or seeking confirmation, meaning "probably" or "right?" Its casual form is darou (だろう). It follows the plain form of verbs/adjectives or nouns.',
    examples: [
      { japanese: 'あしたはあめでしょう。', romaji: 'Ashita wa ame deshou.', english: 'It will probably rain tomorrow.' },
      { japanese: 'このえいがはおもしろいでしょう。', romaji: 'Kono eiga wa omoshiroi deshou.', english: 'This movie is probably interesting.' },
      { japanese: 'にほんごはむずかしいでしょう？', romaji: 'Nihongo wa muzukashii deshou?', english: 'Japanese is difficult, right?' },
    ],
    quiz: [
      { question: 'Ashita wa ame ___.', options: ['deshou', 'desu', 'deshita', 'masen'], correctAnswerIndex: 0 },
      { question: 'What does deshou express?', options: ['probability', 'certainty', 'past tense', 'negation'], correctAnswerIndex: 0 },
      { question: 'Casual form of deshou is:', options: ['darou', 'da', 'datta', 'dewa'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 2: PARTICLES
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_wa', title: 'Topic Marker: Wa (は)', level: 'N5',
    explanation: 'The particle wa (は) marks the topic of the sentence — the thing you are talking about. It is written with the hiragana は but pronounced "wa."',
    examples: [
      { japanese: 'わたしはカナダからきました。', romaji: 'Watashi wa Kanada kara kimashita.', english: 'I came from Canada.' },
      { japanese: 'にほんごはたのしいです。', romaji: 'Nihongo wa tanoshii desu.', english: 'Japanese is fun.' },
      { japanese: 'きょうはいいてんきです。', romaji: 'Kyou wa ii tenki desu.', english: 'Today is nice weather.' },
    ],
    quiz: [
      { question: 'Watashi ___ gakusei desu.', options: ['wa', 'ga', 'wo', 'ni'], correctAnswerIndex: 0 },
      { question: 'Nihongo ___ tanoshii desu.', options: ['wa', 'ga', 'de', 'ni'], correctAnswerIndex: 0 },
      { question: 'What does wa mark in a sentence?', options: ['topic', 'subject', 'object', 'location'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ga', title: 'Subject Marker: Ga (が)', level: 'N5',
    explanation: 'The particle ga (が) marks the subject, especially in new information, with existence verbs (imasu/arimasu), or with adjectives of ability/desire. It also follows question words like dare, nani, doko.',
    examples: [
      { japanese: 'だれがきましたか。', romaji: 'Dare ga kimashita ka.', english: 'Who came?' },
      { japanese: 'ねこがいます。', romaji: 'Neko ga imasu.', english: 'There is a cat.' },
      { japanese: 'にほんごがすきです。', romaji: 'Nihongo ga suki desu.', english: 'I like Japanese.' },
    ],
    quiz: [
      { question: 'Dare ___ kimashita ka.', options: ['ga', 'wa', 'wo', 'ni'], correctAnswerIndex: 0 },
      { question: 'Neko ___ imasu.', options: ['ga', 'wa', 'wo', 'de'], correctAnswerIndex: 0 },
      { question: 'Ga is used with which verbs?', options: ['imasu/arimasu', 'tabemasu', 'ikimasu', 'shimasu'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_wo', title: 'Object Marker: Wo (を)', level: 'N5',
    explanation: 'The particle wo (を) marks the direct object of a transitive verb — the thing being acted upon. It is also used with movement verbs to indicate the path or area of movement.',
    examples: [
      { japanese: 'みずをのみます。', romaji: 'Mizu wo nomimasu.', english: 'I drink water.' },
      { japanese: 'ほんをよみます。', romaji: 'Hon wo yomimasu.', english: 'I read a book.' },
      { japanese: 'こうえんをさんぽします。', romaji: 'Kouen wo sanpo shimasu.', english: 'I take a walk through the park.' },
    ],
    quiz: [
      { question: 'Mizu ___ nomimasu.', options: ['wo', 'wa', 'ga', 'ni'], correctAnswerIndex: 0 },
      { question: 'Hon ___ yomimasu.', options: ['wo', 'wa', 'de', 'ni'], correctAnswerIndex: 0 },
      { question: 'Wo marks the ___ of a sentence.', options: ['direct object', 'topic', 'subject', 'location'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ni', title: 'Particle: Ni (に)', level: 'N5',
    explanation: 'Ni (に) has multiple uses: marking a specific time ("at 8 o\'clock"), a destination or location of existence ("go to school," "there is a book on the desk"), and the indirect object/recipient.',
    examples: [
      { japanese: 'はちじにおきます。', romaji: 'Hachi-ji ni okimasu.', english: 'I wake up at 8 o\'clock.' },
      { japanese: 'がっこうにいきます。', romaji: 'Gakkou ni ikimasu.', english: 'I go to school.' },
      { japanese: 'つくえのうえにほんがあります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'There is a book on the desk.' },
    ],
    quiz: [
      { question: 'Hachi-ji ___ okimasu.', options: ['ni', 'de', 'wo', 'wa'], correctAnswerIndex: 0 },
      { question: 'Gakkou ___ ikimasu.', options: ['ni', 'de', 'wo', 'wa'], correctAnswerIndex: 0 },
      { question: 'Ni does NOT indicate:', options: ['means/method', 'time', 'destination', 'existence location'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_de', title: 'Particle: De (で)', level: 'N5',
    explanation: 'De (で) marks the location where an action takes place (unlike ni which marks where something exists). It also indicates the means, method, or tool used to perform an action.',
    examples: [
      { japanese: 'としょかんでべんきょうします。', romaji: 'Toshokan de benkyou shimasu.', english: 'I study at the library.' },
      { japanese: 'でんしゃでいきます。', romaji: 'Densha de ikimasu.', english: 'I go by train.' },
      { japanese: 'にほんごではなします。', romaji: 'Nihongo de hanashimasu.', english: 'I speak in Japanese.' },
    ],
    quiz: [
      { question: 'Toshokan ___ benkyou shimasu.', options: ['de', 'ni', 'wo', 'wa'], correctAnswerIndex: 0 },
      { question: 'Densha ___ ikimasu.', options: ['de', 'ni', 'wo', 'ga'], correctAnswerIndex: 0 },
      { question: 'De indicates location of ___.', options: ['action', 'existence', 'time', 'topic'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_to', title: 'Particle: To (と)', level: 'N5',
    explanation: 'To (と) connects nouns meaning "and" (exhaustive listing). It also means "with" when describing doing something together with someone.',
    examples: [
      { japanese: 'パンとたまごをたべます。', romaji: 'Pan to tamago wo tabemasu.', english: 'I eat bread and eggs.' },
      { japanese: 'ともだちとえいがをみます。', romaji: 'Tomodachi to eiga wo mimasu.', english: 'I watch a movie with a friend.' },
      { japanese: 'いぬとねこがいます。', romaji: 'Inu to neko ga imasu.', english: 'There are dogs and cats.' },
    ],
    quiz: [
      { question: 'Pan ___ tamago wo tabemasu.', options: ['to', 'ya', 'mo', 'ka'], correctAnswerIndex: 0 },
      { question: 'Tomodachi ___ eiga wo mimasu.', options: ['to', 'de', 'ni', 'ga'], correctAnswerIndex: 0 },
      { question: '"To" listing is:', options: ['exhaustive', 'partial', 'negative', 'conditional'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_mo', title: 'Particle: Mo (も)', level: 'N5',
    explanation: 'Mo (も) means "also" or "too" and replaces wa, ga, or wo. In negative sentences with question words (nani mo, dare mo, doko mo), it means "nothing/nobody/nowhere."',
    examples: [
      { japanese: 'わたしもがくせいです。', romaji: 'Watashi mo gakusei desu.', english: 'I am also a student.' },
      { japanese: 'なにもたべませんでした。', romaji: 'Nani mo tabemasen deshita.', english: 'I did not eat anything.' },
      { japanese: 'どこもいきませんでした。', romaji: 'Doko mo ikimasen deshita.', english: 'I did not go anywhere.' },
    ],
    quiz: [
      { question: 'Watashi ___ gakusei desu. (also)', options: ['mo', 'wa', 'ga', 'to'], correctAnswerIndex: 0 },
      { question: 'Nani ___ tabemasen deshita. (nothing)', options: ['mo', 'wa', 'wo', 'ga'], correctAnswerIndex: 0 },
      { question: 'Mo replaces which particles?', options: ['wa/ga/wo', 'ni/de/he', 'to/ya/ka', 'no/na/ni'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ka', title: 'Particle: Ka (か)', level: 'N5',
    explanation: 'Ka (か) at the end of a sentence makes it a question. Between two nouns, it means "or" — offering a choice between options.',
    examples: [
      { japanese: 'がくせいですか。', romaji: 'Gakusei desu ka.', english: 'Are you a student?' },
      { japanese: 'コーヒーかおちゃ、どちらがいいですか。', romaji: 'Koohii ka ocha, dochira ga ii desu ka.', english: 'Coffee or tea, which is better?' },
      { japanese: 'いつにほんにきましたか。', romaji: 'Itsu Nihon ni kimashita ka.', english: 'When did you come to Japan?' },
    ],
    quiz: [
      { question: 'Gakusei desu ___.', options: ['ka', 'ne', 'yo', 'wa'], correctAnswerIndex: 0 },
      { question: 'Koohii ___ ocha. (or)', options: ['ka', 'to', 'ya', 'mo'], correctAnswerIndex: 0 },
      { question: 'Ka at the end of a sentence makes it a:', options: ['question', 'statement', 'command', 'negative'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ya', title: 'Partial Listing: Ya (や)', level: 'N5',
    explanation: 'Ya (や) lists examples non-exhaustively, meaning "things like A and B (among others)." It is often followed by nado (など) meaning "etc." Unlike to, ya implies there are more items.',
    examples: [
      { japanese: 'りんごやバナナをかいました。', romaji: 'Ringo ya banana wo kaimashita.', english: 'I bought apples, bananas, etc.' },
      { japanese: 'コンビニやぎんこうがあります。', romaji: 'Konbini ya ginkou ga arimasu.', english: 'There are convenience stores, banks, etc.' },
      { japanese: 'にほんごやえいごをはなします。', romaji: 'Nihongo ya eigo wo hanashimasu.', english: 'I speak Japanese, English, etc.' },
    ],
    quiz: [
      { question: 'Ringo ___ banana wo kaimashita.', options: ['ya', 'to', 'ka', 'mo'], correctAnswerIndex: 0 },
      { question: 'Ya implies the list is:', options: ['non-exhaustive', 'exhaustive', 'negative', 'past tense'], correctAnswerIndex: 0 },
      { question: 'Ya is often followed by:', options: ['nado', 'desu', 'masu', 'kara'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_no', title: 'Possessive / Modifier: No (の)', level: 'N5',
    explanation: 'No (の) connects two nouns to show possession ("A\'s B"), affiliation, or modification. It can also replace a noun that was already mentioned, acting as a pronoun.',
    examples: [
      { japanese: 'わたしのかばんです。', romaji: 'Watashi no kaban desu.', english: 'It is my bag.' },
      { japanese: 'にほんのくるまです。', romaji: 'Nihon no kuruma desu.', english: 'It is a Japanese car.' },
      { japanese: 'これはだれのですか。', romaji: 'Kore wa dare no desu ka.', english: 'Whose is this?' },
    ],
    quiz: [
      { question: 'Watashi ___ kaban desu.', options: ['no', 'na', 'ni', 'de'], correctAnswerIndex: 0 },
      { question: 'Nihon ___ kuruma. (Japanese car)', options: ['no', 'na', 'ga', 'wa'], correctAnswerIndex: 0 },
      { question: 'No can act as a ___ for previously mentioned nouns.', options: ['pronoun', 'verb', 'adjective', 'particle'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_kara_made', title: 'From / Until: Kara & Made (から・まで)', level: 'N5',
    explanation: 'Kara (から) means "from" (starting point) and made (まで) means "until/to" (ending point). They are used for both time and place.',
    examples: [
      { japanese: 'くじからごじまではたらきます。', romaji: 'Ku-ji kara go-ji made hatarakimasu.', english: 'I work from 9 to 5.' },
      { japanese: 'にほんからきました。', romaji: 'Nihon kara kimashita.', english: 'I came from Japan.' },
      { japanese: 'えきまであるきます。', romaji: 'Eki made arukimasu.', english: 'I walk to the station.' },
    ],
    quiz: [
      { question: 'Ku-ji ___ go-ji made hatarakimasu. (from)', options: ['kara', 'made', 'ni', 'de'], correctAnswerIndex: 0 },
      { question: 'Eki ___ arukimasu. (until)', options: ['made', 'kara', 'ni', 'de'], correctAnswerIndex: 0 },
      { question: 'Kara indicates the ___ point.', options: ['starting', 'ending', 'middle', 'turning'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_e', title: 'Direction: E (へ)', level: 'N5',
    explanation: 'E (へ) indicates direction of movement, similar to ni (に). Written with the hiragana へ but pronounced "e." It emphasizes the direction rather than the destination itself.',
    examples: [
      { japanese: 'がっこうへいきます。', romaji: 'Gakkou e ikimasu.', english: 'I go to school.' },
      { japanese: 'にほんへいきたいです。', romaji: 'Nihon e ikitai desu.', english: 'I want to go to Japan.' },
      { japanese: 'みなみへまがってください。', romaji: 'Minami e magatte kudasai.', english: 'Please turn south.' },
    ],
    quiz: [
      { question: 'Gakkou ___ ikimasu.', options: ['e', 'de', 'wo', 'wa'], correctAnswerIndex: 0 },
      { question: 'E emphasizes ___ rather than destination.', options: ['direction', 'time', 'method', 'object'], correctAnswerIndex: 0 },
      { question: 'へ is pronounced:', options: ['e', 'he', 'ha', 'wa'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ne', title: 'Confirmation: Ne (ね)', level: 'N5',
    explanation: 'Ne (ね) is a sentence-ending particle used to seek agreement or confirmation from the listener, similar to "right?" or "isn\'t it?" in English.',
    examples: [
      { japanese: 'いいてんきですね。', romaji: 'Ii tenki desu ne.', english: 'Nice weather, isn\'t it?' },
      { japanese: 'にほんごはむずかしいですね。', romaji: 'Nihongo wa muzukashii desu ne.', english: 'Japanese is difficult, right?' },
      { japanese: 'このりょうりはおいしいですね。', romaji: 'Kono ryouri wa oishii desu ne.', english: 'This food is delicious, isn\'t it?' },
    ],
    quiz: [
      { question: 'Ii tenki desu ___. (right?)', options: ['ne', 'yo', 'ka', 'wa'], correctAnswerIndex: 0 },
      { question: 'Ne seeks ___ from the listener.', options: ['agreement', 'information', 'permission', 'direction'], correctAnswerIndex: 0 },
      { question: 'Oishii desu ___. (isn\'t it?)', options: ['ne', 'yo', 'ka', 'na'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_yo', title: 'Emphasis: Yo (よ)', level: 'N5',
    explanation: 'Yo (よ) is a sentence-ending particle that adds emphasis or conveys new information to the listener. It means something like "you know!" or "I tell you!"',
    examples: [
      { japanese: 'このケーキはおいしいですよ。', romaji: 'Kono keeki wa oishii desu yo.', english: 'This cake is delicious, you know!' },
      { japanese: 'あしたはやすみですよ。', romaji: 'Ashita wa yasumi desu yo.', english: 'Tomorrow is a holiday, you know!' },
      { japanese: 'もうじゅうじですよ。', romaji: 'Mou juu-ji desu yo.', english: 'It\'s already 10 o\'clock!' },
    ],
    quiz: [
      { question: 'Oishii desu ___! (emphasis)', options: ['yo', 'ne', 'ka', 'wa'], correctAnswerIndex: 0 },
      { question: 'Yo conveys ___ information.', options: ['new', 'shared', 'old', 'false'], correctAnswerIndex: 0 },
      { question: 'Ashita wa yasumi desu ___!', options: ['yo', 'ne', 'ka', 'no'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ogo', title: 'Polite Prefix: O / Go (お・ご)', level: 'N5',
    explanation: 'O (お) and Go (ご) are honorific prefixes added before nouns to make them more polite. Generally, o is used with native Japanese words and go with Chinese-origin words.',
    examples: [
      { japanese: 'おなまえはなんですか。', romaji: 'O-namae wa nan desu ka.', english: 'What is your name? (polite)' },
      { japanese: 'おちゃをどうぞ。', romaji: 'O-cha wo douzo.', english: 'Please have some tea.' },
      { japanese: 'ごかぞくはおげんきですか。', romaji: 'Go-kazoku wa o-genki desu ka.', english: 'Is your family well?' },
    ],
    quiz: [
      { question: '___ namae wa nan desu ka.', options: ['O-', 'Go-', 'Ka-', 'Na-'], correctAnswerIndex: 0 },
      { question: 'Go- is used with ___ origin words.', options: ['Chinese', 'Japanese', 'English', 'Korean'], correctAnswerIndex: 0 },
      { question: 'Which is correct? ___ kazoku', options: ['go-', 'o-', 'na-', 'ka-'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 3: ADJECTIVES
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_i_adj', title: 'i-Adjective Conjugation', level: 'N5',
    explanation: 'i-adjectives end in い and conjugate by changing the ending: positive (～い), negative (～くない), past (～かった), past negative (～くなかった). Exception: いい becomes よい in conjugation.',
    examples: [
      { japanese: 'たかいです。→ たかくないです。', romaji: 'Takai desu. → Takaku nai desu.', english: 'It is expensive. → It is not expensive.' },
      { japanese: 'おもしろかったです。', romaji: 'Omoshirokatta desu.', english: 'It was interesting.' },
      { japanese: 'よくなかったです。', romaji: 'Yoku nakatta desu.', english: 'It was not good.' },
    ],
    quiz: [
      { question: 'Negative of "takai" (expensive):', options: ['takaku nai', 'takanai', 'taka nai', 'takai nai'], correctAnswerIndex: 0 },
      { question: 'Past tense of "omoshiroi":', options: ['omoshirokatta', 'omoshiroikatta', 'omoshirodatta', 'omoshirokunai'], correctAnswerIndex: 0 },
      { question: 'Past negative of "ii" (good):', options: ['yoku nakatta', 'iiku nakatta', 'ii nakatta', 'yokunai'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_na_adj', title: 'na-Adjective Conjugation', level: 'N5',
    explanation: 'na-adjectives do not end in い (except a few like きれい). They conjugate with desu: positive (～です), negative (～じゃないです), past (～でした), past negative (～じゃなかったです).',
    examples: [
      { japanese: 'しずかです。→ しずかじゃないです。', romaji: 'Shizuka desu. → Shizuka ja nai desu.', english: 'It is quiet. → It is not quiet.' },
      { japanese: 'ひまでした。', romaji: 'Hima deshita.', english: 'I was free (had free time).' },
      { japanese: 'げんきじゃなかったです。', romaji: 'Genki ja nakatta desu.', english: 'I was not well.' },
    ],
    quiz: [
      { question: 'Past tense of "shizuka" (quiet):', options: ['shizuka deshita', 'shizukatta', 'shizukadatta', 'shizuka mashita'], correctAnswerIndex: 0 },
      { question: 'Negative of "genki":', options: ['genki ja nai desu', 'genkiku nai', 'genki nai', 'genkinai desu'], correctAnswerIndex: 0 },
      { question: 'To modify a noun, na-adj needs:', options: ['na', 'no', 'i', 'ku'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_adj_noun', title: 'Modifying Nouns with Adjectives', level: 'N5',
    explanation: 'i-adjectives directly precede a noun (e.g., takai yama). na-adjectives require "na" before the noun (e.g., kirei na hana). Nouns modify other nouns using "no."',
    examples: [
      { japanese: 'たかいやまです。', romaji: 'Takai yama desu.', english: 'It is a tall mountain.' },
      { japanese: 'きれいなはなです。', romaji: 'Kirei na hana desu.', english: 'It is a beautiful flower.' },
      { japanese: 'にほんのくるまです。', romaji: 'Nihon no kuruma desu.', english: 'It is a Japanese car.' },
    ],
    quiz: [
      { question: 'Kirei ___ hana desu. (beautiful flower)', options: ['na', 'no', 'i', 'ni'], correctAnswerIndex: 0 },
      { question: 'Takai ___ desu. (tall mountain)', options: ['yama', 'na yama', 'no yama', 'ni yama'], correctAnswerIndex: 0 },
      { question: 'Nihon ___ kuruma. (Japanese car)', options: ['no', 'na', 'i', 'de'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_adj_te', title: 'Joining Adjectives with Te-form', level: 'N5',
    explanation: 'To connect multiple adjectives in one sentence: i-adjectives change ～い to ～くて. na-adjectives and nouns add ～で. This is like saying "A and B" for descriptions.',
    examples: [
      { japanese: 'やすくて、おいしいです。', romaji: 'Yasukute, oishii desu.', english: 'It is cheap and delicious.' },
      { japanese: 'しんせつで、きれいです。', romaji: 'Shinsetsu de, kirei desu.', english: 'Kind and beautiful.' },
      { japanese: 'このへやはひろくて、あかるいです。', romaji: 'Kono heya wa hirokute, akarui desu.', english: 'This room is spacious and bright.' },
    ],
    quiz: [
      { question: 'Join "oishii" and "yasui":', options: ['oishikute, yasui', 'oishiide, yasui', 'oishii to yasui', 'oishikatta yasui'], correctAnswerIndex: 0 },
      { question: 'Join "shizuka" and "kirei":', options: ['shizuka de, kirei', 'shizukakute, kirei', 'shizuka to kirei', 'shizukani kirei'], correctAnswerIndex: 0 },
      { question: 'i-adj te-form: change い to:', options: ['くて', 'で', 'て', 'して'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_adverb', title: 'Adjective to Adverb', level: 'N5',
    explanation: 'To turn an adjective into an adverb (modifying a verb): i-adjectives change ～い to ～く. na-adjectives add ～に. This changes "fast" to "fast-ly" or "quiet" to "quiet-ly."',
    examples: [
      { japanese: 'はやくはしります。', romaji: 'Hayaku hashirimasu.', english: 'I run fast.' },
      { japanese: 'やさいをちいさくきってください。', romaji: 'Yasai wo chiisaku kitte kudasai.', english: 'Please cut the vegetables small.' },
      { japanese: 'しずかにしてください。', romaji: 'Shizuka ni shite kudasai.', english: 'Please be quiet.' },
    ],
    quiz: [
      { question: 'Adverb of "hayai" (fast):', options: ['hayaku', 'hayani', 'hayade', 'hayai'], correctAnswerIndex: 0 },
      { question: 'Adverb of "shizuka" (quiet):', options: ['shizuka ni', 'shizuka ku', 'shizuka de', 'shizuka to'], correctAnswerIndex: 0 },
      { question: 'i-adj to adverb: い →', options: ['く', 'に', 'で', 'て'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 4: EXISTENCE & LOCATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_arimasu', title: 'Existence: Arimasu & Imasu', level: 'N5',
    explanation: 'Arimasu (あります) is for inanimate objects and plants. Imasu (います) is for living things (people and animals). Location is marked with ni (に) and subject with ga (が).',
    examples: [
      { japanese: 'つくえのうえにほんがあります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'There is a book on the desk.' },
      { japanese: 'きょうしつにがくせいがいます。', romaji: 'Kyoushitsu ni gakusei ga imasu.', english: 'There are students in the classroom.' },
      { japanese: 'にわにねこがいます。', romaji: 'Niwa ni neko ga imasu.', english: 'There is a cat in the garden.' },
    ],
    quiz: [
      { question: 'Hon ga ___. (book exists)', options: ['arimasu', 'imasu', 'desu', 'shimasu'], correctAnswerIndex: 0 },
      { question: 'Neko ga ___. (cat exists)', options: ['imasu', 'arimasu', 'desu', 'shimasu'], correctAnswerIndex: 0 },
      { question: 'Arimasu is for ___ things.', options: ['inanimate', 'living', 'all', 'moving'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 5: VERB FORMS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_masu', title: 'Polite Verb Form: Masu (ます)', level: 'N5',
    explanation: 'The ます form is the polite present/future tense of verbs. Negative: ません. Past: ました. Past negative: ませんでした. This is the standard form used in daily polite conversation.',
    examples: [
      { japanese: 'まいにちべんきょうします。', romaji: 'Mainichi benkyou shimasu.', english: 'I study every day.' },
      { japanese: 'きのうテレビをみませんでした。', romaji: 'Kinou terebi wo mimasen deshita.', english: 'I did not watch TV yesterday.' },
      { japanese: 'あしたともだちにあいます。', romaji: 'Ashita tomodachi ni aimasu.', english: 'I will meet a friend tomorrow.' },
    ],
    quiz: [
      { question: 'Past of "tabemasu" (eat):', options: ['tabemashita', 'tabete', 'tabeta', 'tabemasu'], correctAnswerIndex: 0 },
      { question: 'Negative of "ikimasu" (go):', options: ['ikimasen', 'ikanai', 'ikimashita', 'ikite'], correctAnswerIndex: 0 },
      { question: 'Past negative: tabe___', options: ['masen deshita', 'nakatta', 'nai deshita', 'masen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_te_form', title: 'Te-form: Connecting Actions', level: 'N5',
    explanation: 'The te-form (～て/～で) connects sequential actions ("I do A, then B"). Group 1 verbs have complex rules (ite, ide, tte, nde), Group 2 verbs simply replace る with て, Group 3: して, きて.',
    examples: [
      { japanese: 'あさおきて、シャワーをあびて、あさごはんをたべます。', romaji: 'Asa okite, shawaa wo abite, asagohan wo tabemasu.', english: 'In the morning, I wake up, take a shower, and eat breakfast.' },
      { japanese: 'みぎにまがって、まっすぐいってください。', romaji: 'Migi ni magatte, massugu itte kudasai.', english: 'Turn right and go straight.' },
      { japanese: 'ほんをよんで、レポートをかきます。', romaji: 'Hon wo yonde, repooto wo kakimasu.', english: 'I read a book and write a report.' },
    ],
    quiz: [
      { question: 'Te-form of "taberu" (eat):', options: ['tabete', 'tabette', 'tabinde', 'tabite'], correctAnswerIndex: 0 },
      { question: 'Te-form of "kaku" (write):', options: ['kaite', 'kakete', 'kakute', 'kakte'], correctAnswerIndex: 0 },
      { question: 'Te-form of "yomu" (read):', options: ['yonde', 'yomite', 'yomute', 'yomte'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_te_kudasai', title: 'Request: Te Kudasai (てください)', level: 'N5',
    explanation: 'Te kudasai (てください) follows the te-form of a verb to make a polite request: "Please do..." It is the standard way to ask someone to do something politely.',
    examples: [
      { japanese: 'ちょっとまってください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.' },
      { japanese: 'もういちどいってください。', romaji: 'Mou ichido itte kudasai.', english: 'Please say it one more time.' },
      { japanese: 'ここにすわってください。', romaji: 'Koko ni suwatte kudasai.', english: 'Please sit here.' },
    ],
    quiz: [
      { question: '"Please wait": Matte ___.', options: ['kudasai', 'mashita', 'masen', 'masu'], correctAnswerIndex: 0 },
      { question: '"Please read": ___ kudasai.', options: ['Yonde', 'Yomite', 'Yomude', 'Yomte'], correctAnswerIndex: 0 },
      { question: 'Te kudasai is a polite ___.', options: ['request', 'question', 'negation', 'past'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_naide_kudasai', title: 'Negative Request: Naide Kudasai (ないでください)', level: 'N5',
    explanation: 'Naide kudasai (ないでください) asks someone NOT to do something. Use the nai-form (negative plain form) of the verb and replace ない with ないで, then add ください.',
    examples: [
      { japanese: 'ここでしゃしんをとらないでください。', romaji: 'Koko de shashin wo toranaide kudasai.', english: 'Please do not take photos here.' },
      { japanese: 'たばこをすわないでください。', romaji: 'Tabako wo suwanaide kudasai.', english: 'Please do not smoke.' },
      { japanese: 'わすれないでください。', romaji: 'Wasurenaide kudasai.', english: 'Please do not forget.' },
    ],
    quiz: [
      { question: '"Please don\'t eat": Tabe___ kudasai.', options: ['naide', 'te', 'nai', 'masen'], correctAnswerIndex: 0 },
      { question: '"Please don\'t go": Ika___ kudasai.', options: ['naide', 'te', 'nai', 'zu'], correctAnswerIndex: 0 },
      { question: 'Naide kudasai politely asks someone to ___.', options: ['not do something', 'do something', 'wait', 'come'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_te_imasu', title: 'Ongoing Action / State: Te Imasu (ている)', level: 'N5',
    explanation: 'Te imasu (ています) describes an ongoing action ("is doing") or a resulting state ("is married," "lives in"). It combines the te-form with imasu.',
    examples: [
      { japanese: 'いまべんきょうしています。', romaji: 'Ima benkyou shite imasu.', english: 'I am studying now.' },
      { japanese: 'とうきょうにすんでいます。', romaji: 'Toukyou ni sunde imasu.', english: 'I live in Tokyo.' },
      { japanese: 'けっこんしています。', romaji: 'Kekkon shite imasu.', english: 'I am married.' },
    ],
    quiz: [
      { question: '"I am eating now": Ima ___ imasu.', options: ['tabete', 'tabemasu', 'tabeta', 'tabenai'], correctAnswerIndex: 0 },
      { question: 'Te imasu can express:', options: ['ongoing action or state', 'only past actions', 'only future plans', 'only negative'], correctAnswerIndex: 0 },
      { question: 'Toukyou ni ___ imasu. (living)', options: ['sunde', 'sumi', 'sumite', 'sumide'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_te_aru', title: 'Resultant State: Te Aru (てある)', level: 'N5',
    explanation: 'Te aru (てある) describes a state that results from someone\'s deliberate action. Unlike te iru, it implies someone purposely did the action. It is used with transitive verbs.',
    examples: [
      { japanese: 'まどがあけてあります。', romaji: 'Mado ga akete arimasu.', english: 'The window has been opened (on purpose).' },
      { japanese: 'かべにえがかけてあります。', romaji: 'Kabe ni e ga kakete arimasu.', english: 'A picture has been hung on the wall.' },
      { japanese: 'テーブルのうえにはながおいてあります。', romaji: 'Teeburu no ue ni hana ga oite arimasu.', english: 'Flowers have been placed on the table.' },
    ],
    quiz: [
      { question: 'Te aru implies the action was:', options: ['deliberate', 'accidental', 'ongoing', 'past only'], correctAnswerIndex: 0 },
      { question: 'Mado ga akete ___. (opened on purpose)', options: ['arimasu', 'imasu', 'mashita', 'desu'], correctAnswerIndex: 0 },
      { question: 'Te aru is used with ___ verbs.', options: ['transitive', 'intransitive', 'all', 'irregular'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 6: DESIRE & GIVING
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_hoshii', title: 'Wanting Things: Hoshii (ほしい)', level: 'N5',
    explanation: 'Hoshii (ほしい) is an i-adjective meaning "want" for nouns. The desired object is marked with が. Only for the speaker\'s desires or questions to the listener.',
    examples: [
      { japanese: 'みずがほしいです。', romaji: 'Mizu ga hoshii desu.', english: 'I want water.' },
      { japanese: 'あたらしいくるまがほしいです。', romaji: 'Atarashii kuruma ga hoshii desu.', english: 'I want a new car.' },
      { japanese: 'なにがほしいですか。', romaji: 'Nani ga hoshii desu ka.', english: 'What do you want?' },
    ],
    quiz: [
      { question: 'Mizu ___ hoshii desu.', options: ['ga', 'wo', 'wa', 'ni'], correctAnswerIndex: 0 },
      { question: 'Hoshii is what type of word?', options: ['i-adjective', 'na-adjective', 'verb', 'noun'], correctAnswerIndex: 0 },
      { question: 'Hoshii is used for wanting:', options: ['things/nouns', 'to do actions', 'to go places', 'nothing'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_tai', title: 'Want to Do: Tai (たい)', level: 'N5',
    explanation: 'Tai (たい) attaches to the verb masu-stem to express desire to do something. It conjugates like an i-adjective. Negative: takunai.',
    examples: [
      { japanese: 'にほんにいきたいです。', romaji: 'Nihon ni ikitai desu.', english: 'I want to go to Japan.' },
      { japanese: 'おすしをたべたいです。', romaji: 'Osushi wo tabetai desu.', english: 'I want to eat sushi.' },
      { japanese: 'きょうはなにもしたくないです。', romaji: 'Kyou wa nani mo shitakunai desu.', english: 'I don\'t want to do anything today.' },
    ],
    quiz: [
      { question: '"Want to go": Iki___.', options: ['tai', 'tei', 'te', 'tari'], correctAnswerIndex: 0 },
      { question: '"Don\'t want to eat": Tabe___.', options: ['takunai', 'tanai', 'tenai', 'tai nai'], correctAnswerIndex: 0 },
      { question: 'Tai attaches to the verb\'s:', options: ['masu-stem', 'dictionary form', 'te-form', 'nai-form'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_giving', title: 'Giving & Receiving', level: 'N5',
    explanation: 'Three verbs: あげます (I give to someone), もらいます (I receive), くれます (someone gives to me). Choice depends on direction of the action.',
    examples: [
      { japanese: 'ともだちにプレゼントをあげました。', romaji: 'Tomodachi ni purezento wo agemashita.', english: 'I gave a present to my friend.' },
      { japanese: 'はははわたしにケーキをくれました。', romaji: 'Haha wa watashi ni keeki wo kuremashita.', english: 'My mother gave me a cake.' },
      { japanese: 'せんせいにほんをもらいました。', romaji: 'Sensei ni hon wo moraimashita.', english: 'I received a book from the teacher.' },
    ],
    quiz: [
      { question: 'I give to someone: ___masu.', options: ['age', 'kure', 'morai', 'yari'], correctAnswerIndex: 0 },
      { question: 'Someone gives to me: ___masu.', options: ['kure', 'age', 'morai', 'yari'], correctAnswerIndex: 0 },
      { question: 'I receive: ___masu.', options: ['morai', 'age', 'kure', 'yari'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_o_kudasai', title: 'Requesting Items: O Kudasai (をください)', level: 'N5',
    explanation: 'O kudasai (をください) politely requests an item: "Please give me..." Follows a noun directly. Different from te kudasai which requests an action.',
    examples: [
      { japanese: 'すみません、みずをください。', romaji: 'Sumimasen, mizu wo kudasai.', english: 'Excuse me, water please.' },
      { japanese: 'メニューをください。', romaji: 'Menyuu wo kudasai.', english: 'Please give me the menu.' },
      { japanese: 'これをみっつください。', romaji: 'Kore wo mittsu kudasai.', english: 'Three of these, please.' },
    ],
    quiz: [
      { question: '"Water please": Mizu ___ kudasai.', options: ['wo', 'ga', 'wa', 'ni'], correctAnswerIndex: 0 },
      { question: 'O kudasai requests:', options: ['items', 'actions', 'information', 'directions'], correctAnswerIndex: 0 },
      { question: '"Menu please": ___ wo kudasai.', options: ['Menyuu', 'Menyuu wo', 'Menyuu ga', 'Menyuu ni'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 7: SUGGESTIONS & INVITATIONS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_mashou', title: 'Let\'s Do: Mashou (ましょう)', level: 'N5',
    explanation: 'Mashou (ましょう) attaches to the masu-stem to suggest doing something together: "Let\'s..."',
    examples: [
      { japanese: 'いっしょにいきましょう。', romaji: 'Issho ni ikimashou.', english: 'Let\'s go together.' },
      { japanese: 'ひるごはんをたべましょう。', romaji: 'Hirugohan wo tabemashou.', english: 'Let\'s eat lunch.' },
      { japanese: 'にほんごをべんきょうしましょう。', romaji: 'Nihongo wo benkyou shimashou.', english: 'Let\'s study Japanese.' },
    ],
    quiz: [
      { question: '"Let\'s go": Iki___.', options: ['mashou', 'masu', 'masen', 'mashita'], correctAnswerIndex: 0 },
      { question: 'Mashou expresses:', options: ['suggestion', 'past action', 'negation', 'question'], correctAnswerIndex: 0 },
      { question: '"Let\'s eat": Tabe___.', options: ['mashou', 'masu', 'mashita', 'masen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_mashou_ka', title: 'Shall I?: Mashou Ka (ましょうか)', level: 'N5',
    explanation: 'Mashou ka (ましょうか) offers help ("Shall I...?") or proposes a group activity ("Shall we...?").',
    examples: [
      { japanese: 'まどをあけましょうか。', romaji: 'Mado wo akemashou ka.', english: 'Shall I open the window?' },
      { japanese: 'えいがをみましょうか。', romaji: 'Eiga wo mimashou ka.', english: 'Shall we watch a movie?' },
      { japanese: 'てつだいましょうか。', romaji: 'Tetsudaimashou ka.', english: 'Shall I help?' },
    ],
    quiz: [
      { question: '"Shall I open?": Ake___.', options: ['mashou ka', 'masu ka', 'masen ka', 'mashita ka'], correctAnswerIndex: 0 },
      { question: 'Mashou ka can offer:', options: ['help or proposal', 'criticism', 'past info', 'negation'], correctAnswerIndex: 0 },
      { question: '"Shall I help?": Tetsudai___.', options: ['mashou ka', 'masu ka', 'tai desu', 'masen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_masen_ka', title: 'Invitation: Masen Ka (ませんか)', level: 'N5',
    explanation: 'Masen ka (ませんか) is a polite invitation: "Would you like to...?" Softer and more polite than mashou.',
    examples: [
      { japanese: 'いっしょにおちゃをのみませんか。', romaji: 'Issho ni ocha wo nomimasen ka.', english: 'Would you like to have tea together?' },
      { japanese: 'テニスをしませんか。', romaji: 'Tenisu wo shimasen ka.', english: 'Would you like to play tennis?' },
      { japanese: 'いっしょにさんぽしませんか。', romaji: 'Issho ni sanpo shimasen ka.', english: 'Would you like to take a walk?' },
    ],
    quiz: [
      { question: '"Won\'t you eat?": Tabe___.', options: ['masen ka', 'mashou ka', 'masu ka', 'mashita ka'], correctAnswerIndex: 0 },
      { question: 'Masen ka is a polite ___.', options: ['invitation', 'refusal', 'command', 'negation'], correctAnswerIndex: 0 },
      { question: 'Which is softer/more polite?', options: ['masen ka', 'mashou', 'te kudasai', 'nasai'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 8: PERMISSION & OBLIGATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_temo_ii', title: 'Permission: Te Mo Ii (てもいい)', level: 'N5',
    explanation: 'Te mo ii desu (てもいいです) means "it\'s okay to..." or "may I...?" Te-form + mo ii desu.',
    examples: [
      { japanese: 'しゃしんをとってもいいですか。', romaji: 'Shashin wo totte mo ii desu ka.', english: 'May I take a photo?' },
      { japanese: 'ここにすわってもいいですよ。', romaji: 'Koko ni suwatte mo ii desu yo.', english: 'You may sit here.' },
      { japanese: 'でんわをつかってもいいですか。', romaji: 'Denwa wo tsukatte mo ii desu ka.', english: 'May I use the phone?' },
    ],
    quiz: [
      { question: 'Totte ___ desu ka. (May I take?)', options: ['mo ii', 'wa ikenai', 'wa dame', 'mo nai'], correctAnswerIndex: 0 },
      { question: 'Te mo ii asks for:', options: ['permission', 'prohibition', 'obligation', 'direction'], correctAnswerIndex: 0 },
      { question: '"May I eat?": Tabete ___ desu ka.', options: ['mo ii', 'wa dame', 'mo nai', 'wa ikenai'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_tewa_ikenai', title: 'Prohibition: Te Wa Ikenai (てはいけない)', level: 'N5',
    explanation: 'Te wa ikenai (てはいけない) means "must not do." Polite: te wa ikemasen. Casual: te wa dame.',
    examples: [
      { japanese: 'ここでたばこをすってはいけません。', romaji: 'Koko de tabako wo sutte wa ikemasen.', english: 'You must not smoke here.' },
      { japanese: 'しけんちゅうにはなしてはいけません。', romaji: 'Shiken-chuu ni hanashite wa ikemasen.', english: 'You must not talk during the exam.' },
      { japanese: 'このみずをのんではだめです。', romaji: 'Kono mizu wo nonde wa dame desu.', english: 'You must not drink this water.' },
    ],
    quiz: [
      { question: 'Sutte wa ___. (must not smoke)', options: ['ikemasen', 'ii desu', 'kudasai', 'arimasu'], correctAnswerIndex: 0 },
      { question: 'Te wa ikenai expresses:', options: ['prohibition', 'permission', 'desire', 'request'], correctAnswerIndex: 0 },
      { question: 'Casual: te wa ___', options: ['dame', 'ii', 'hoshii', 'suki'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_nakereba', title: 'Must Do: Nakereba Naranai (なければならない)', level: 'N5',
    explanation: 'Expresses obligation. Nai-form → なければなりません (formal) or ないといけません (casual). Colloquial: なくちゃ / なきゃ.',
    examples: [
      { japanese: 'しゅくだいをしなければなりません。', romaji: 'Shukudai wo shinakereba narimasen.', english: 'I must do my homework.' },
      { japanese: 'はやくおきないといけません。', romaji: 'Hayaku okinai to ikemasen.', english: 'I must wake up early.' },
      { japanese: 'くすりをのまなくてはいけません。', romaji: 'Kusuri wo nomanakute wa ikemasen.', english: 'I must take medicine.' },
    ],
    quiz: [
      { question: '"Must go": Ika___ narimasen.', options: ['nakereba', 'naide', 'nai', 'nakute'], correctAnswerIndex: 0 },
      { question: 'Nakereba naranai means:', options: ['must do', 'must not', 'want to', 'don\'t have to'], correctAnswerIndex: 0 },
      { question: 'Casual "must do" = shi___', options: ['nakucha', 'nakereba', 'naide', 'tai'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_nakutemo_ii', title: 'Don\'t Have To: Nakutemo Ii (なくてもいい)', level: 'N5',
    explanation: 'Nakutemo ii (なくてもいい) means "don\'t have to." Nai-form → change ない to なくてもいいです.',
    examples: [
      { japanese: 'あしたこなくてもいいです。', romaji: 'Ashita konakutemo ii desu.', english: 'You don\'t have to come tomorrow.' },
      { japanese: 'たべなくてもいいです。', romaji: 'Tabenakutemo ii desu.', english: 'You don\'t have to eat.' },
      { japanese: 'べんきょうしなくてもいいです。', romaji: 'Benkyou shinakutemo ii desu.', english: 'You don\'t have to study.' },
    ],
    quiz: [
      { question: '"Don\'t have to go": Ika___ ii desu.', options: ['nakutemo', 'naide', 'nai', 'nakereba'], correctAnswerIndex: 0 },
      { question: 'Nakutemo ii means:', options: ['don\'t have to', 'must not', 'want to', 'should'], correctAnswerIndex: 0 },
      { question: '"Don\'t have to eat": Tabe___ ii desu.', options: ['nakutemo', 'naide', 'te wa', 'nakereba'], correctAnswerIndex: 0 },
    ]
  },
  // SECTION 9: COMPARISON & ADVICE
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_yori', title: 'Comparison: Yori (より)', level: 'N5',
    explanation: 'Yori (より) means "more than." A wa B yori [adj] desu = "A is more [adj] than B." Hou ga can emphasize the preferred side.',
    examples: [
      { japanese: 'にほんごはえいごよりむずかしいです。', romaji: 'Nihongo wa eigo yori muzukashii desu.', english: 'Japanese is harder than English.' },
      { japanese: 'バスよりでんしゃのほうがはやいです。', romaji: 'Basu yori densha no hou ga hayai desu.', english: 'The train is faster than the bus.' },
      { japanese: 'なつはふゆよりあついです。', romaji: 'Natsu wa fuyu yori atsui desu.', english: 'Summer is hotter than winter.' },
    ],
    quiz: [
      { question: 'Nihongo wa eigo ___ muzukashii.', options: ['yori', 'to', 'de', 'ga'], correctAnswerIndex: 0 },
      { question: 'Yori means:', options: ['more than', 'less than', 'same as', 'different'], correctAnswerIndex: 0 },
      { question: 'A ___ B no hou ga ii.', options: ['yori', 'to', 'de', 'ni'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ichiban', title: 'Superlative: Ichiban (いちばん)', level: 'N5',
    explanation: 'Ichiban (いちばん) means "the most." Pattern: [group] no naka de [noun] ga ichiban [adj] desu. For two items, use dochira.',
    examples: [
      { japanese: 'すしがいちばんすきです。', romaji: 'Sushi ga ichiban suki desu.', english: 'I like sushi the most.' },
      { japanese: 'なつがいちばんあついです。', romaji: 'Natsu ga ichiban atsui desu.', english: 'Summer is the hottest.' },
      { japanese: 'だれがいちばんたかいですか。', romaji: 'Dare ga ichiban takai desu ka.', english: 'Who is the tallest?' },
    ],
    quiz: [
      { question: '"Most interesting": ___ omoshiroi.', options: ['ichiban', 'motto', 'yori', 'totemo'], correctAnswerIndex: 0 },
      { question: 'For comparing two items, use:', options: ['dochira', 'dare', 'nani', 'doko'], correctAnswerIndex: 0 },
      { question: 'Ichiban means:', options: ['the most', 'more than', 'less than', 'equally'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_hou_ga_ii', title: 'Advice: Hou Ga Ii (ほうがいい)', level: 'N5',
    explanation: 'Ta hou ga ii (たほうがいい) gives advice: "You should..." Nai hou ga ii (ないほうがいい) means "You shouldn\'t..."',
    examples: [
      { japanese: 'やさいをたべたほうがいいです。', romaji: 'Yasai wo tabeta hou ga ii desu.', english: 'You should eat vegetables.' },
      { japanese: 'はやくねたほうがいいですよ。', romaji: 'Hayaku neta hou ga ii desu yo.', english: 'You should go to bed early.' },
      { japanese: 'おさけをのまないほうがいい。', romaji: 'Osake wo nomanai hou ga ii.', english: 'You shouldn\'t drink alcohol.' },
    ],
    quiz: [
      { question: '"Should eat": Tabe___ hou ga ii.', options: ['ta', 'te', 'ru', 'nai'], correctAnswerIndex: 0 },
      { question: '"Shouldn\'t drink": Noma___ hou ga ii.', options: ['nai', 'ta', 'te', 'ru'], correctAnswerIndex: 0 },
      { question: 'Hou ga ii gives:', options: ['advice', 'permission', 'prohibition', 'obligation'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 10: TIME EXPRESSIONS & CONDITIONALS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_mae_ni', title: 'Before: Mae Ni (まえに)', level: 'N5',
    explanation: 'Mae ni (前に) means "before." Verb dictionary form + mae ni. Noun + no mae ni.',
    examples: [
      { japanese: 'ねるまえにはをみがきます。', romaji: 'Neru mae ni ha wo migakimasu.', english: 'I brush my teeth before sleeping.' },
      { japanese: 'しょくじのまえにてをあらいます。', romaji: 'Shokuji no mae ni te wo araimasu.', english: 'I wash hands before meals.' },
      { japanese: 'にほんにくるまえに、べんきょうしました。', romaji: 'Nihon ni kuru mae ni, benkyou shimashita.', english: 'I studied before coming to Japan.' },
    ],
    quiz: [
      { question: 'Neru ___ ni ha wo migakimasu.', options: ['mae', 'ato', 'toki', 'aida'], correctAnswerIndex: 0 },
      { question: 'With nouns: noun + ___ + mae ni', options: ['no', 'na', 'ga', 'wo'], correctAnswerIndex: 0 },
      { question: 'Verbs use ___ form + mae ni.', options: ['dictionary', 'masu', 'te', 'ta'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ato_de', title: 'After: Ato De (あとで)', level: 'N5',
    explanation: 'Ato de (後で) means "after." Verb ta-form + ato de. Noun + no ato de.',
    examples: [
      { japanese: 'べんきょうしたあとで、ゲームをします。', romaji: 'Benkyou shita ato de, geemu wo shimasu.', english: 'After studying, I play games.' },
      { japanese: 'しごとのあとでのみにいきましょう。', romaji: 'Shigoto no ato de nomi ni ikimashou.', english: 'Let\'s go drinking after work.' },
      { japanese: 'ごはんをたべたあとで、さんぽしました。', romaji: 'Gohan wo tabeta ato de, sanpo shimashita.', english: 'After eating, I went for a walk.' },
    ],
    quiz: [
      { question: 'Benkyou ___ ato de, geemu wo shimasu.', options: ['shita', 'suru', 'shite', 'shi'], correctAnswerIndex: 0 },
      { question: 'Ato de uses ___ form for verbs.', options: ['ta-form', 'dictionary', 'te-form', 'masu'], correctAnswerIndex: 0 },
      { question: 'Shigoto ___ ato de. (after work)', options: ['no', 'na', 'ga', 'wo'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_te_kara', title: 'After Doing: Te Kara (てから)', level: 'N5',
    explanation: 'Te kara (てから) = "after doing..." Emphasizes sequence — second action cannot happen until first is complete.',
    examples: [
      { japanese: 'てをあらってから、ごはんをたべます。', romaji: 'Te wo aratte kara, gohan wo tabemasu.', english: 'After washing hands, I eat.' },
      { japanese: 'にほんにきてから、さんねんです。', romaji: 'Nihon ni kite kara, san-nen desu.', english: 'It\'s been 3 years since coming to Japan.' },
      { japanese: 'シャワーをあびてから、ねます。', romaji: 'Shawaa wo abite kara, nemasu.', english: 'After showering, I sleep.' },
    ],
    quiz: [
      { question: 'Te wo aratte ___, gohan wo tabemasu.', options: ['kara', 'ato', 'mae', 'made'], correctAnswerIndex: 0 },
      { question: 'Te kara emphasizes:', options: ['strict sequence', 'simultaneous', 'comparison', 'reason'], correctAnswerIndex: 0 },
      { question: 'Te kara uses the ___ form.', options: ['te-form', 'ta-form', 'dictionary', 'nai-form'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_toki', title: 'When: Toki (とき)', level: 'N5',
    explanation: 'Toki (とき) means "when." i-adj + toki, na-adj + na toki, noun + no toki, verb plain form + toki.',
    examples: [
      { japanese: 'ひまなとき、えいがをみます。', romaji: 'Hima na toki, eiga wo mimasu.', english: 'When free, I watch movies.' },
      { japanese: 'こどものとき、よくあそびました。', romaji: 'Kodomo no toki, yoku asobimashita.', english: 'When I was a child, I often played.' },
      { japanese: 'さむいとき、ココアをのみます。', romaji: 'Samui toki, kokoa wo nomimasu.', english: 'When cold, I drink cocoa.' },
    ],
    quiz: [
      { question: 'Hima ___ toki. (when free)', options: ['na', 'no', 'i', 'ni'], correctAnswerIndex: 0 },
      { question: 'Kodomo ___ toki. (when a child)', options: ['no', 'na', 'ga', 'de'], correctAnswerIndex: 0 },
      { question: 'i-adjective + toki: samui ___', options: ['toki', 'na toki', 'no toki', 'de toki'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_tara', title: 'Conditional: Tara (たら)', level: 'N5',
    explanation: 'Tara (たら) = "if/when." Add ら to the ta-form: tabeta → tabetara. Used for hypothetical situations.',
    examples: [
      { japanese: 'あめがふったら、いえにいます。', romaji: 'Ame ga futtara, ie ni imasu.', english: 'If it rains, I\'ll stay home.' },
      { japanese: 'やすかったら、かいます。', romaji: 'Yasukattara, kaimasu.', english: 'If it\'s cheap, I\'ll buy it.' },
      { japanese: 'にほんにいったら、ふじさんをみたい。', romaji: 'Nihon ni ittara, Fuji-san wo mitai.', english: 'If I go to Japan, I want to see Mt. Fuji.' },
    ],
    quiz: [
      { question: 'Tara of "furu" (rain):', options: ['futtara', 'furara', 'furtara', 'futara'], correctAnswerIndex: 0 },
      { question: 'Tara = ta-form + ___', options: ['ra', 'ba', 'na', 'da'], correctAnswerIndex: 0 },
      { question: 'Yasui → yasukattara means:', options: ['if cheap', 'if expensive', 'because cheap', 'when cheap'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 11: REASON & CONJUNCTIONS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_kara_reason', title: 'Reason: Kara (から)', level: 'N5',
    explanation: 'Kara (から) after a clause means "because." Pattern: [reason] kara, [result].',
    examples: [
      { japanese: 'あたまがいたいから、くすりをのみます。', romaji: 'Atama ga itai kara, kusuri wo nomimasu.', english: 'Because I have a headache, I take medicine.' },
      { japanese: 'すきだから、べんきょうしています。', romaji: 'Suki da kara, benkyou shite imasu.', english: 'Because I like it, I\'m studying.' },
      { japanese: 'べんきょうしなかったから、テストができなかった。', romaji: 'Benkyou shinakatta kara, tesuto ga dekinakatta.', english: 'Because I didn\'t study, I couldn\'t do the test.' },
    ],
    quiz: [
      { question: 'Atama ga itai ___, kusuri wo nomimasu.', options: ['kara', 'node', 'noni', 'demo'], correctAnswerIndex: 0 },
      { question: 'Kara gives the ___ first.', options: ['reason', 'result', 'time', 'location'], correctAnswerIndex: 0 },
      { question: 'Suki da ___, benkyou shite imasu.', options: ['kara', 'node', 'toki', 'noni'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ndesu', title: 'Explanation: Ndesu (んです)', level: 'N5',
    explanation: 'Ndesu (んです) / no desu adds explanatory nuance — "the reason is..." or seeks explanation. Na-adj/noun + na n desu.',
    examples: [
      { japanese: 'どうしたんですか。', romaji: 'Doushita n desu ka.', english: 'What happened?' },
      { japanese: 'びょうきなんです。', romaji: 'Byouki na n desu.', english: 'I\'m sick. (explaining)' },
      { japanese: 'あしたはやすみなんです。', romaji: 'Ashita wa yasumi na n desu.', english: 'Tomorrow is a day off. (explaining)' },
    ],
    quiz: [
      { question: 'Doushita ___ desu ka.', options: ['n', 'ka', 'ne', 'yo'], correctAnswerIndex: 0 },
      { question: 'Ndesu adds ___ nuance.', options: ['explanatory', 'negative', 'polite', 'past'], correctAnswerIndex: 0 },
      { question: 'Before ndesu, na-adj needs:', options: ['na', 'no', 'i', 'de'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ga_kedo', title: 'But: Ga & Kedo (が・けど)', level: 'N5',
    explanation: 'Ga (が) and kedo (けど) connect contrasting clauses: "but." Ga is more formal; kedo is casual.',
    examples: [
      { japanese: 'むずかしいですが、たのしいです。', romaji: 'Muzukashii desu ga, tanoshii desu.', english: 'It\'s difficult, but fun.' },
      { japanese: 'ほしいけど、おかねがない。', romaji: 'Hoshii kedo, okane ga nai.', english: 'I want it, but have no money.' },
      { japanese: 'たかいですが、おいしいです。', romaji: 'Takai desu ga, oishii desu.', english: 'Expensive, but delicious.' },
    ],
    quiz: [
      { question: 'Muzukashii desu ___, tanoshii. (formal)', options: ['ga', 'kedo', 'kara', 'node'], correctAnswerIndex: 0 },
      { question: 'Hoshii ___, okane ga nai. (casual)', options: ['kedo', 'ga', 'kara', 'node'], correctAnswerIndex: 0 },
      { question: 'Ga is ___ than kedo.', options: ['more formal', 'more casual', 'more negative', 'older'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_soshite', title: 'And Then: Soshite (そして)', level: 'N5',
    explanation: 'Soshite (そして) = "and then." Connects two sentences showing the second follows the first.',
    examples: [
      { japanese: 'あさごはんをたべました。そして、がっこうにいきました。', romaji: 'Asagohan wo tabemashita. Soshite, gakkou ni ikimashita.', english: 'I ate breakfast. And then, went to school.' },
      { japanese: 'ほんをよみました。そして、レポートをかきました。', romaji: 'Hon wo yomimashita. Soshite, repooto wo kakimashita.', english: 'I read a book. Then, wrote a report.' },
      { japanese: 'べんきょうしました。そして、テストにうかりました。', romaji: 'Benkyou shimashita. Soshite, tesuto ni ukarimashita.', english: 'I studied. And then, passed the test.' },
    ],
    quiz: [
      { question: 'Tabemashita. ___, gakkou ni ikimashita.', options: ['Soshite', 'Shikashi', 'Demo', 'Dakara'], correctAnswerIndex: 0 },
      { question: 'Soshite means:', options: ['and then', 'but', 'because', 'however'], correctAnswerIndex: 0 },
      { question: 'Soshite goes at the ___ of the sentence.', options: ['beginning', 'end', 'middle', 'anywhere'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_shikashi', title: 'However: Shikashi (しかし)', level: 'N5',
    explanation: 'Shikashi (しかし) = "however" (formal). Demo (でも) is the casual equivalent. Connects contrasting sentences.',
    examples: [
      { japanese: 'たくさんべんきょうしました。しかし、おちました。', romaji: 'Takusan benkyou shimashita. Shikashi, ochimashita.', english: 'I studied a lot. However, I failed.' },
      { japanese: 'やすいです。しかし、おいしいです。', romaji: 'Yasui desu. Shikashi, oishii desu.', english: 'It\'s cheap. However, it\'s delicious.' },
      { japanese: 'いきたいです。でも、おかねがありません。', romaji: 'Ikitai desu. Demo, okane ga arimasen.', english: 'I want to go. But, I have no money.' },
    ],
    quiz: [
      { question: 'Benkyou shimashita. ___, ochimashita. (formal)', options: ['Shikashi', 'Soshite', 'Dakara', 'Sorekara'], correctAnswerIndex: 0 },
      { question: 'Casual version of shikashi:', options: ['demo', 'soshite', 'dakara', 'sorekara'], correctAnswerIndex: 0 },
      { question: 'Shikashi expresses:', options: ['contrast', 'sequence', 'reason', 'addition'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_sorekara', title: 'And Then: Sorekara (それから)', level: 'N5',
    explanation: 'Sorekara (それから) = "after that" / "and then." Used to describe a sequence of events, similar to soshite but more temporal.',
    examples: [
      { japanese: 'かいものにいきました。それから、えいがをみました。', romaji: 'Kaimono ni ikimashita. Sorekara, eiga wo mimashita.', english: 'I went shopping. After that, watched a movie.' },
      { japanese: 'シャワーをあびます。それから、ねます。', romaji: 'Shawaa wo abimasu. Sorekara, nemasu.', english: 'I take a shower. Then, sleep.' },
      { japanese: 'にほんごをならいました。それから、にほんにいきました。', romaji: 'Nihongo wo naraimashita. Sorekara, Nihon ni ikimashita.', english: 'I learned Japanese. Then, went to Japan.' },
    ],
    quiz: [
      { question: 'Kaimono ni ikimashita. ___, eiga wo mimashita.', options: ['Sorekara', 'Shikashi', 'Demo', 'Dakara'], correctAnswerIndex: 0 },
      { question: 'Sorekara means:', options: ['after that', 'however', 'because', 'but'], correctAnswerIndex: 0 },
      { question: 'Sorekara is similar to:', options: ['soshite', 'shikashi', 'demo', 'dakara'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 12: ADDITIONAL VERB PATTERNS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_past_verb', title: 'Past Tense Verbs', level: 'N5',
    explanation: 'Polite past: ～ました. Polite past neg: ～ませんでした. Plain past: ta-form. Plain past neg: ～なかった.',
    examples: [
      { japanese: 'きのうえいがをみました。', romaji: 'Kinou eiga wo mimashita.', english: 'I watched a movie yesterday.' },
      { japanese: 'あさごはんをたべませんでした。', romaji: 'Asagohan wo tabemasen deshita.', english: 'I didn\'t eat breakfast.' },
      { japanese: 'としょかんでべんきょうしました。', romaji: 'Toshokan de benkyou shimashita.', english: 'I studied at the library.' },
    ],
    quiz: [
      { question: 'Past of "mimasu":', options: ['mimashita', 'mite', 'mita', 'mimasen'], correctAnswerIndex: 0 },
      { question: 'Past negative of "tabemasu":', options: ['tabemasen deshita', 'tabenakatta', 'tabemasen', 'tabemashita'], correctAnswerIndex: 0 },
      { question: 'Plain past of "iku" (go):', options: ['itta', 'iki', 'ite', 'iku'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_past_adj', title: 'Past Tense Adjectives', level: 'N5',
    explanation: 'i-adj past: ～かったです. na-adj past: ～でした. i-adj past neg: ～くなかったです. na-adj past neg: ～じゃなかったです.',
    examples: [
      { japanese: 'テストはむずかしかったです。', romaji: 'Tesuto wa muzukashikatta desu.', english: 'The test was difficult.' },
      { japanese: 'きのうはひまでした。', romaji: 'Kinou wa hima deshita.', english: 'Yesterday I was free.' },
      { japanese: 'おもしろくなかったです。', romaji: 'Omoshiroku nakatta desu.', english: 'It was not interesting.' },
    ],
    quiz: [
      { question: 'Past of "muzukashii":', options: ['muzukashikatta', 'muzukashii deshita', 'muzukashikute', 'muzukashiku'], correctAnswerIndex: 0 },
      { question: 'Past of "hima" (na-adj):', options: ['hima deshita', 'himakatta', 'hima mashita', 'himatte'], correctAnswerIndex: 0 },
      { question: 'Past neg: omoshiroi →', options: ['omoshiroku nakatta', 'omoshiroi nakatta', 'omoshirokatta nai', 'omoshirokunai'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_potential', title: 'Ability: Dekimasu (できます)', level: 'N5',
    explanation: 'Dekimasu = "can do." Noun + ga dekimasu. Verb dictionary form + koto ga dekimasu.',
    examples: [
      { japanese: 'にほんごができます。', romaji: 'Nihongo ga dekimasu.', english: 'I can speak Japanese.' },
      { japanese: 'うんてんすることができます。', romaji: 'Unten suru koto ga dekimasu.', english: 'I can drive.' },
      { japanese: 'はしをつかうことができますか。', romaji: 'Hashi wo tsukau koto ga dekimasu ka.', english: 'Can you use chopsticks?' },
    ],
    quiz: [
      { question: 'Nihongo ___ dekimasu.', options: ['ga', 'wo', 'wa', 'ni'], correctAnswerIndex: 0 },
      { question: 'Verb + ___ ga dekimasu.', options: ['koto', 'no', 'mono', 'tame'], correctAnswerIndex: 0 },
      { question: 'Dekimasu means:', options: ['can do', 'must do', 'want to', 'should'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_miemasu', title: 'Sensory Verbs: Miemasu & Kikoemasu', level: 'N5',
    explanation: 'Miemasu (見えます) = "can see" (spontaneous). Kikoemasu (聞こえます) = "can hear." Unlike dekimasu, these describe natural ability without effort.',
    examples: [
      { japanese: 'ふじさんがみえます。', romaji: 'Fuji-san ga miemasu.', english: 'I can see Mt. Fuji.' },
      { japanese: 'おんがくがきこえます。', romaji: 'Ongaku ga kikoemasu.', english: 'I can hear music.' },
      { japanese: 'ここからうみがみえますか。', romaji: 'Koko kara umi ga miemasu ka.', english: 'Can you see the sea from here?' },
    ],
    quiz: [
      { question: 'Fuji-san ___ miemasu.', options: ['ga', 'wo', 'wa', 'de'], correctAnswerIndex: 0 },
      { question: '"Can hear" = :', options: ['kikoemasu', 'kikimasu', 'kikoeru', 'kiitemasu'], correctAnswerIndex: 0 },
      { question: 'Miemasu means:', options: ['can see naturally', 'to look at', 'to show', 'to watch'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_sugiru', title: 'Too Much: Sugiru (すぎる)', level: 'N5',
    explanation: 'Sugiru = "too much." Attach to masu-stem or adj stem: tabe-sugiru, taka-sugiru, shizuka-sugiru.',
    examples: [
      { japanese: 'のみすぎました。', romaji: 'Nomi sugimashita.', english: 'I drank too much.' },
      { japanese: 'たかすぎます。', romaji: 'Taka sugimasu.', english: 'It\'s too expensive.' },
      { japanese: 'しずかすぎます。', romaji: 'Shizuka sugimasu.', english: 'It\'s too quiet.' },
    ],
    quiz: [
      { question: '"Too expensive": Taka___.', options: ['sugiru', 'sugimasu', 'sugite', 'nai'], correctAnswerIndex: 0 },
      { question: '"Ate too much": Tabe___.', options: ['sugimashita', 'sugita', 'masen', 'tai'], correctAnswerIndex: 0 },
      { question: 'For na-adj, remove na and add:', options: ['sugiru', 'ku sugiru', 'ni sugiru', 'de sugiru'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ta_koto_ga_aru', title: 'Experience: Ta Koto Ga Aru (たことがある)', level: 'N5',
    explanation: 'Ta koto ga aru = "have done before." Ta-form + koto ga arimasu. Negative: koto ga arimasen.',
    examples: [
      { japanese: 'すしをたべたことがあります。', romaji: 'Sushi wo tabeta koto ga arimasu.', english: 'I have eaten sushi before.' },
      { japanese: 'にほんにいったことがありません。', romaji: 'Nihon ni itta koto ga arimasen.', english: 'I have never been to Japan.' },
      { japanese: 'ふじさんにのぼったことがありますか。', romaji: 'Fuji-san ni nobotta koto ga arimasu ka.', english: 'Have you climbed Mt. Fuji?' },
    ],
    quiz: [
      { question: 'Sushi wo ___ koto ga arimasu.', options: ['tabeta', 'tabete', 'taberu', 'tabe'], correctAnswerIndex: 0 },
      { question: 'Ta koto ga aru uses:', options: ['ta-form', 'te-form', 'dictionary', 'masu'], correctAnswerIndex: 0 },
      { question: '"Never been": Itta koto ga ___.', options: ['arimasen', 'arimasu', 'imasu', 'imasen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_tsumori', title: 'Intention: Tsumori (つもり)', level: 'N5',
    explanation: 'Tsumori = "intend to." Dictionary form + tsumori desu. Negative: nai + tsumori desu.',
    examples: [
      { japanese: 'にほんにいくつもりです。', romaji: 'Nihon ni iku tsumori desu.', english: 'I intend to go to Japan.' },
      { japanese: 'くるまをかうつもりです。', romaji: 'Kuruma wo kau tsumori desu.', english: 'I plan to buy a car.' },
      { japanese: 'べんきょうしないつもりです。', romaji: 'Benkyou shinai tsumori desu.', english: 'I don\'t intend to study.' },
    ],
    quiz: [
      { question: 'Nihon ni ___ tsumori desu.', options: ['iku', 'itta', 'itte', 'iki'], correctAnswerIndex: 0 },
      { question: 'Tsumori uses ___ form.', options: ['dictionary', 'ta-form', 'te-form', 'masu'], correctAnswerIndex: 0 },
      { question: 'Negative: ___ tsumori desu.', options: ['nai-form', 'masen', 'ta-form', 'te-form'], correctAnswerIndex: 0 },
    ]
  },
  // ═══════════════════════════════════════════════════════
  // SECTION 13: REMAINING N5 PATTERNS
  // ═══════════════════════════════════════════════════════
  {
    id: 'g_n5_narimasu', title: 'Becoming: Ni Narimasu (になります)', level: 'N5',
    explanation: 'Ni narimasu = "to become." Noun/na-adj + ni narimasu. i-adj: change い to く + narimasu.',
    examples: [
      { japanese: 'いしゃになりたいです。', romaji: 'Isha ni naritai desu.', english: 'I want to become a doctor.' },
      { japanese: 'さむくなりました。', romaji: 'Samuku narimashita.', english: 'It became cold.' },
      { japanese: 'げんきになりました。', romaji: 'Genki ni narimashita.', english: 'I got well.' },
    ],
    quiz: [
      { question: 'Isha ___ narimasu. (become a doctor)', options: ['ni', 'ga', 'wo', 'de'], correctAnswerIndex: 0 },
      { question: 'i-adj "samui" → become cold:', options: ['samuku narimasu', 'samui ni narimasu', 'samuku shimasu', 'samui narimasu'], correctAnswerIndex: 0 },
      { question: 'na-adj before narimasu needs:', options: ['ni', 'ku', 'na', 'de'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ni_shimasu', title: 'Deciding: Ni Shimasu (にします)', level: 'N5',
    explanation: 'Ni shimasu = "to decide on" / "I\'ll have." Used when making a choice or selection, often at restaurants.',
    examples: [
      { japanese: 'コーヒーにします。', romaji: 'Koohii ni shimasu.', english: 'I\'ll have coffee.' },
      { japanese: 'あかいのにします。', romaji: 'Akai no ni shimasu.', english: 'I\'ll go with the red one.' },
      { japanese: 'なににしますか。', romaji: 'Nani ni shimasu ka.', english: 'What will you have?' },
    ],
    quiz: [
      { question: 'Koohii ___ shimasu. (I\'ll have coffee)', options: ['ni', 'wo', 'ga', 'de'], correctAnswerIndex: 0 },
      { question: 'Ni shimasu means:', options: ['decide on', 'become', 'go to', 'give'], correctAnswerIndex: 0 },
      { question: '"What will you have?": Nani ___ shimasu ka.', options: ['ni', 'wo', 'ga', 'wa'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_ni_ikimasu', title: 'Purpose of Going: Ni Ikimasu (にいきます)', level: 'N5',
    explanation: 'Verb masu-stem + ni ikimasu/kimasu/kaerimasu = "go/come/return to do something." Indicates purpose of movement.',
    examples: [
      { japanese: 'えいがをみにいきます。', romaji: 'Eiga wo mi ni ikimasu.', english: 'I go to see a movie.' },
      { japanese: 'おすしをたべにいきましょう。', romaji: 'Osushi wo tabe ni ikimashou.', english: 'Let\'s go eat sushi.' },
      { japanese: 'ともだちにあいにきました。', romaji: 'Tomodachi ni ai ni kimashita.', english: 'I came to meet a friend.' },
    ],
    quiz: [
      { question: 'Eiga wo mi ___ ikimasu.', options: ['ni', 'de', 'wo', 'ga'], correctAnswerIndex: 0 },
      { question: 'The verb before ni uses:', options: ['masu-stem', 'dictionary form', 'te-form', 'ta-form'], correctAnswerIndex: 0 },
      { question: '"Go to eat": Tabe ___ ikimasu.', options: ['ni', 'de', 'wo', 'ga'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_tari_tari', title: 'Doing Things Like: Tari Tari (たりたり)', level: 'N5',
    explanation: 'Ta-form + ri + ta-form + ri + shimasu lists examples of activities: "I do things like A and B." Non-exhaustive.',
    examples: [
      { japanese: 'やすみにほんをよんだり、えいがをみたりします。', romaji: 'Yasumi ni hon wo yondari, eiga wo mitari shimasu.', english: 'On holidays, I do things like read and watch movies.' },
      { japanese: 'おんがくをきいたり、さんぽしたりしました。', romaji: 'Ongaku wo kiitari, sanpo shitari shimashita.', english: 'I did things like listen to music and take walks.' },
      { japanese: 'テレビをみたり、ゲームをしたりします。', romaji: 'Terebi wo mitari, geemu wo shitari shimasu.', english: 'I do things like watch TV and play games.' },
    ],
    quiz: [
      { question: 'Tari form of "yomu" (read):', options: ['yondari', 'yomitari', 'yomutari', 'yomtari'], correctAnswerIndex: 0 },
      { question: 'Tari tari implies:', options: ['non-exhaustive list', 'exhaustive list', 'sequence', 'contrast'], correctAnswerIndex: 0 },
      { question: 'Tari sentences end with:', options: ['shimasu', 'desu', 'masu', 'arimasu'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_koto_no', title: 'Nominalization: Koto & No (こと・の)', level: 'N5',
    explanation: 'Koto (こと) and no (の) turn verbs into nouns. "Swimming is fun" = Oyogu koto wa tanoshii. No is more colloquial. Used with suki, jouzu, heta, etc.',
    examples: [
      { japanese: 'およぐことがすきです。', romaji: 'Oyogu koto ga suki desu.', english: 'I like swimming.' },
      { japanese: 'りょうりをするのがじょうずです。', romaji: 'Ryouri wo suru no ga jouzu desu.', english: 'She is good at cooking.' },
      { japanese: 'にほんごをはなすのがへたです。', romaji: 'Nihongo wo hanasu no ga heta desu.', english: 'I\'m bad at speaking Japanese.' },
    ],
    quiz: [
      { question: 'Oyogu ___ ga suki desu. (like swimming)', options: ['koto', 'mono', 'tame', 'made'], correctAnswerIndex: 0 },
      { question: 'No is more ___ than koto.', options: ['colloquial', 'formal', 'negative', 'past'], correctAnswerIndex: 0 },
      { question: 'Ryouri ___ ga jouzu. (good at cooking)', options: ['suru no', 'suru kara', 'shite', 'shita'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_wa_dou_desu_ka', title: 'How About: Wa Dou Desu Ka (はどうですか)', level: 'N5',
    explanation: 'Wa dou desu ka (はどうですか) = "How about...?" / "How is...?" Used to ask opinions or suggest something.',
    examples: [
      { japanese: 'にほんのせいかつはどうですか。', romaji: 'Nihon no seikatsu wa dou desu ka.', english: 'How is life in Japan?' },
      { japanese: 'おちゃはどうですか。', romaji: 'Ocha wa dou desu ka.', english: 'How about some tea?' },
      { japanese: 'このレストランはどうですか。', romaji: 'Kono resutoran wa dou desu ka.', english: 'How about this restaurant?' },
    ],
    quiz: [
      { question: 'Nihon no seikatsu wa ___ desu ka.', options: ['dou', 'nan', 'dare', 'doko'], correctAnswerIndex: 0 },
      { question: 'Wa dou desu ka asks for:', options: ['opinion/suggestion', 'direction', 'name', 'time'], correctAnswerIndex: 0 },
      { question: 'Ocha wa ___ desu ka. (How about tea?)', options: ['dou', 'nani', 'itsu', 'dare'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_kata', title: 'Way of Doing: Kata (かた)', level: 'N5',
    explanation: 'Kata (方/かた) = "way of doing." Attach to masu-stem: tabe-kata (way of eating), tsukuri-kata (recipe).',
    examples: [
      { japanese: 'はしのつかいかたをおしえてください。', romaji: 'Hashi no tsukai-kata wo oshiete kudasai.', english: 'Please teach me how to use chopsticks.' },
      { japanese: 'このかんじのよみかたがわかりません。', romaji: 'Kono kanji no yomi-kata ga wakarimasen.', english: 'I don\'t know how to read this kanji.' },
      { japanese: 'おりがみのおりかたをしっていますか。', romaji: 'Origami no ori-kata wo shitte imasu ka.', english: 'Do you know how to fold origami?' },
    ],
    quiz: [
      { question: '"Way of eating": Tabe___.', options: ['kata', 'koto', 'mono', 'tame'], correctAnswerIndex: 0 },
      { question: 'Kata attaches to:', options: ['masu-stem', 'dictionary form', 'te-form', 'ta-form'], correctAnswerIndex: 0 },
      { question: 'Yomi-kata means:', options: ['way of reading', 'way of writing', 'way of eating', 'way of going'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_mou_mada', title: 'Already / Not Yet: Mou & Mada (もう・まだ)', level: 'N5',
    explanation: 'Mou (もう) = "already" with past/positive. Mada (まだ) = "still" or "not yet" with negative. Mada + te imasen = "haven\'t done yet."',
    examples: [
      { japanese: 'もうしゅくだいをしました。', romaji: 'Mou shukudai wo shimashita.', english: 'I already did my homework.' },
      { japanese: 'まだあさごはんをたべていません。', romaji: 'Mada asagohan wo tabete imasen.', english: 'I haven\'t eaten breakfast yet.' },
      { japanese: 'まだわかいです。', romaji: 'Mada wakai desu.', english: 'I\'m still young.' },
    ],
    quiz: [
      { question: '___ shukudai wo shimashita. (already)', options: ['Mou', 'Mada', 'Motto', 'Amari'], correctAnswerIndex: 0 },
      { question: '___ tabete imasen. (not yet)', options: ['Mada', 'Mou', 'Motto', 'Amari'], correctAnswerIndex: 0 },
      { question: 'Mou with past tense means:', options: ['already', 'still', 'not yet', 'more'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_totemo_amari', title: 'Degree Adverbs: Totemo & Amari (とても・あまり)', level: 'N5',
    explanation: 'Totemo (とても) = "very" with positive. Amari (あまり) = "not very" with negative. Zenzen (全然) = "not at all" with negative.',
    examples: [
      { japanese: 'にほんごはとてもおもしろいです。', romaji: 'Nihongo wa totemo omoshiroi desu.', english: 'Japanese is very interesting.' },
      { japanese: 'このえいがはあまりおもしろくないです。', romaji: 'Kono eiga wa amari omoshiroku nai desu.', english: 'This movie is not very interesting.' },
      { japanese: 'ぜんぜんわかりません。', romaji: 'Zenzen wakarimasen.', english: 'I don\'t understand at all.' },
    ],
    quiz: [
      { question: 'Totemo is used with ___ sentences.', options: ['positive', 'negative', 'both', 'questions'], correctAnswerIndex: 0 },
      { question: 'Amari is used with ___ sentences.', options: ['negative', 'positive', 'both', 'questions'], correctAnswerIndex: 0 },
      { question: '"Not at all": ___ wakarimasen.', options: ['Zenzen', 'Totemo', 'Amari', 'Taihen'], correctAnswerIndex: 0 },
    ]
  },
  {
    id: 'g_n5_relative_clause', title: 'Relative Clauses (Noun Modification)', level: 'N5',
    explanation: 'In Japanese, a clause can modify a noun by placing it directly before the noun. The verb is in plain form. "The book I read" = watashi ga yonda hon.',
    examples: [
      { japanese: 'わたしがきのうかったほんです。', romaji: 'Watashi ga kinou katta hon desu.', english: 'This is the book I bought yesterday.' },
      { japanese: 'えきのまえにあるレストラン。', romaji: 'Eki no mae ni aru resutoran.', english: 'The restaurant in front of the station.' },
      { japanese: 'にほんからきたがくせい。', romaji: 'Nihon kara kita gakusei.', english: 'The student who came from Japan.' },
    ],
    quiz: [
      { question: '"Book I bought": katta ___', options: ['hon', 'wo', 'koto', 'mono'], correctAnswerIndex: 0 },
      { question: 'Relative clauses use ___ form.', options: ['plain', 'polite', 'te', 'nai'], correctAnswerIndex: 0 },
      { question: 'The modifying clause comes ___ the noun.', options: ['before', 'after', 'inside', 'above'], correctAnswerIndex: 0 },
    ]
  },
];