import { GrammarLesson } from './types';

export const GRAMMAR_LIBRARY: GrammarLesson[] = [
  // WEEK 2 / Lesson 1.1
  {
    id: 'g_1_1_intro',
    title: 'Self Introduction (Name)',
    level: 'Beginner (N5)',
    explanation: 'This is the most fundamental pattern used to introduce yourself in Japanese. The particle "wa" identifies you as the topic of the sentence, while "desu" functions as a polite "to be" verb. In Japanese culture, it is common to start with "Hajimemashite" (Nice to meet you) and end with "Yoroshiku onegaishimasu" to show respect.',
    examples: [
      { japanese: 'はじめまして、わたしはアリスです。', romaji: 'Hajimemashite, watashi wa Arisu desu.', english: 'Nice to meet you, I am Alice.' },
      { japanese: 'すみません、おなまえは？', romaji: 'Sumimasen, onamae wa?', english: 'Excuse me, what is your name?' },
      { japanese: 'かれはたなかさんです。', romaji: 'Kare wa Tanaka-san desu.', english: 'He is Mr. Tanaka.' }
    ],
    quiz: {
      question: 'Select the correct particle: Watashi ___ Anna desu.',
      options: ['wa', 'ga', 'wo', 'ni'],
      correctAnswerIndex: 0
    }
  },
  {
    id: 'g_1_1_country',
    title: 'Stating Nationality',
    level: 'Beginner (N5)',
    explanation: 'To express nationality, you simply take the name of a country and add the suffix "-jin," which means person. For example, "Nihon" (Japan) becomes "Nihonjin" (Japanese person). This pattern follows the standard "Subject wa [Noun] desu" structure used for identification.',
    examples: [
      { japanese: 'わたしはインドネシアじんです。', romaji: 'Watashi wa Indonesia-jin desu.', english: 'I am Indonesian.' },
      { japanese: 'マリアさんはアメリカじんです。', romaji: 'Maria-san wa Amerika-jin desu.', english: 'Maria is American.' },
      { japanese: 'お国はどちらですか。', romaji: 'Okuni wa dochira desu ka.', english: 'Where are you from (Which is your country)?' }
    ],
    quiz: {
      question: 'Which is correct for "Japanese person"?',
      options: ['Nihon', 'Nihonjin', 'Nihongo', 'Nihon-kata'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'g_1_1_job',
    title: 'Stating Occupation',
    level: 'Beginner (N5)',
    explanation: 'Occupations are stated using the same "wa... desu" pattern used for names and nationalities. If you want to say "also" (e.g., "I am also a student"), you replace the particle "wa" with "mo." This is a useful way to find common ground during a conversation.',
    examples: [
      { japanese: 'わたしはがくせいです。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' },
      { japanese: 'わたしもかいしゃいんです。', romaji: 'Watashi mo kaishain desu.', english: 'I am also a company employee.' },
      { japanese: 'たなかさんはせんせいです。', romaji: 'Tanaka-san wa sensei desu.', english: 'Mr. Tanaka is a teacher.' }
    ],
    quiz: {
      question: 'Translate "I am also a student": Watashi ___ gakusei desu.',
      options: ['wa', 'ga', 'mo', 'to'],
      correctAnswerIndex: 2
    }
  },
  // Lesson 1.2
  {
    id: 'g_1_2_age',
    title: 'Asking and Stating Age',
    level: 'Beginner (N5)',
    explanation: 'Age is expressed by adding the counter "sai" after a number. While most ages follow standard number rules, 20 years old is uniquely called "hatachi" as it marks a traditional coming-of-age. To ask someone’s age politely, you can use "O-ikutsu desu ka?" instead of "Nan-sai desu ka?"',
    examples: [
      { japanese: 'なんさいですか。', romaji: 'Nansai desu ka?', english: 'How old are you?' },
      { japanese: 'わたしは２０さい（はたち）です。', romaji: 'Watashi wa hatachi desu.', english: 'I am 20 years old.' },
      { japanese: 'いもうとはじゅうきゅうさいです。', romaji: 'Imouto wa juukyuu-sai desu.', english: 'My younger sister is 19 years old.' }
    ],
    quiz: {
      question: 'How do you say "20 years old"?',
      options: ['Nijuu-sai', 'Hatachi', 'Nijuu', 'Ni-zero-sai'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'g_1_2_birthday',
    title: 'Birthday (Date and Month)',
    level: 'Beginner (N5)',
    explanation: 'In Japanese, the date format always starts with the month followed by the day. Months are simply the number (1-12) plus "gatsu," though April (shigatsu), July (shichigatsu), and September (kugatsu) have unique pronunciations. For the days of the month, the first ten days have irregular "kun-yomi" readings that must be memorized individually.',
    examples: [
      { japanese: 'たんじょうびはいつですか。', romaji: 'Tanjoubi wa itsu desu ka?', english: 'When is your birthday?' },
      { japanese: '３がつ２１にちです。', romaji: 'Sangatsu nijuuichi-nichi desu.', english: 'It is March 21st.' },
      { japanese: 'きょうはじゅうにがつついたちです。', romaji: 'Kyou wa juunigatsu tsuitachi desu.', english: 'Today is December 1st.' }
    ],
    quiz: {
      question: 'What is "April" in Japanese?',
      options: ['Sangatsu', 'Shigatsu', 'Gogatsu', 'Rokugatsu'],
      correctAnswerIndex: 1
    }
  },
  // Lesson 1.3
  {
    id: 'g_1_3_hobby',
    title: 'Stating Hobbies',
    level: 'Beginner (N5)',
    explanation: 'To talk about your interests, use the phrase "Shumi wa [Noun] desu." If you have multiple hobbies, you can connect the nouns using the particle "to," which functions like "and" in English. When describing an activity as a hobby (like "reading"), you must use a noun or a nominalized verb.',
    examples: [
      { japanese: 'しゅみはなんですか。', romaji: 'Shumi wa nan desu ka?', english: 'What is your hobby?' },
      { japanese: 'りょこうとえいがです。', romaji: 'Ryokou to eiga desu.', english: 'Travel and movies.' },
      { japanese: 'しゅみはおんがくです。', romaji: 'Shumi wa ongaku desu.', english: 'My hobby is music.' }
    ],
    quiz: {
      question: 'Batting and Soccer: Yakyuu ___ Sakkaa',
      options: ['ka', 'ni', 'to', 'ga'],
      correctAnswerIndex: 2
    }
  },
  // WEEK 4 / Lesson 5.1
  {
    id: 'g_5_1_past_verb',
    title: 'Past Tense Verbs',
    level: 'Beginner (N5)',
    explanation: 'Japanese verbs in the polite form (-masu) change their endings to reflect the past tense. To say you did something, change "-masu" to "-mashita." To say you did not do something, change the negative "-masen" to "-masen deshita."',
    examples: [
      { japanese: 'きのう、べんきょうしました。', romaji: 'Kinou, benkyou shimashita.', english: 'Yesterday, I studied.' },
      { japanese: 'あさごはんをたべませんでした。', romaji: 'Asagohan o tabemasen deshita.', english: 'I did not eat breakfast.' },
      { japanese: 'せんしゅう、ともだちに会いました。', romaji: 'Senshuu, tomodachi ni aimashita.', english: 'I met my friend last week.' }
    ],
    quiz: {
      question: 'Past tense of "Tabemasu" (to eat)?',
      options: ['Tabemashita', 'Tabete', 'Tabeta', 'Tabenai'],
      correctAnswerIndex: 0
    }
  },
  {
    id: 'g_5_1_sorekara',
    title: 'Conjunction: Sorekara',
    level: 'Beginner (N5)',
    explanation: '"Sorekara" is a useful conjunction that means "and then" or "after that." It is used to connect two separate sentences to show a chronological sequence of actions. It helps your speech flow more naturally by linking your activities together.',
    examples: [
      { japanese: 'こうえんへいきました。それから、しょくじしました。', romaji: 'Kouen e ikimashita. Sorekara, shokuji shimashita.', english: 'I went to the park. And then, I had a meal.' },
      { japanese: 'しゅくだいをしました。それから、ねました。', romaji: 'Shukudai o shimashita. Sorekara, nemashita.', english: 'I did my homework. After that, I went to sleep.' },
      { japanese: 'デパートへ行きました。それから、かばんをかいました。', romaji: 'Depaato e ikimashita. Sorekara, kaban o kaimashita.', english: 'I went to the department store. And then, I bought a bag.' }
    ],
    quiz: {
      question: 'Meaning of "Sorekara"?',
      options: ['But', 'Because', 'And then', 'Therefore'],
      correctAnswerIndex: 2
    }
  },
  // Lesson 5.2
  {
    id: 'g_5_2_past_adj',
    title: 'Past Tense Adjectives',
    level: 'Beginner (N5)',
    explanation: 'The past tense rules differ for the two types of Japanese adjectives. For i-adjectives, you drop the final "i" and add "katta desu." For na-adjectives, you simply change "desu" to "deshita," similar to how you change nouns.',
    examples: [
      { japanese: 'たのしかったです。', romaji: 'Tanoshikatta desu.', english: 'It was fun.' },
      { japanese: 'きのうはひまでした。', romaji: 'Kinou wa hima deshita.', english: 'I was free yesterday.' },
      { japanese: 'テストはむずかしくなかったです。', romaji: 'Tesuto wa muzukashiku nakatta desu.', english: 'The test was not difficult.' }
    ],
    quiz: {
      question: 'Past tense of "Samui" (Cold)?',
      options: ['Samuikatta', 'Samukatta', 'Samuideshita', 'Samukudeshta'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'g_5_2_kara',
    title: 'Reason (~kara)',
    level: 'Beginner (N5)',
    explanation: 'The particle "kara" is used to provide a reason or cause for a following action or state. You place "kara" directly after the reason clause, which is often followed by a comma and then the result. In polite speech, it is usually added after "desu" or "masu."',
    examples: [
      { japanese: 'いそがしいですから、あさごはんをたべません。', romaji: 'Isogashii desu kara, asagohan o tabemasen.', english: 'Because I am busy, I do not eat breakfast.' },
      { japanese: 'あめですから、どこもいきません。', romaji: 'Ame desu kara, dokomo ikimasen.', english: 'Because it is raining, I am not going anywhere.' },
      { japanese: 'じかんがありませんから、タクシーでいきます。', romaji: 'Jikan ga arimasen kara, takushii de ikimasu.', english: 'Because I don\'t have time, I will go by taxi.' }
    ],
    quiz: {
      question: 'Select the correct sentence structure for "Because it is hot, I drink water."',
      options: ['Atsui kara, mizu o nomimasu.', 'Mizu o nomimasu kara, atsui.', 'Atsui node, mizu o nomimasu.', 'Atsui, mizu o nomimasu.'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 5.3
  {
    id: 'g_5_3_hoshii',
    title: 'Desire (Hoshii)',
    level: 'Beginner (N5)',
    explanation: '"Hoshii" is an i-adjective used to express a desire for a physical object. The object you want is marked with the particle "ga," not "o." Note that "hoshii" is generally used for your own desires and should be used carefully when talking about others.',
    examples: [
      { japanese: 'パソコンがほしいです。', romaji: 'Pasokon ga hoshii desu.', english: 'I want a PC.' },
      { japanese: 'あたらしいくるまがほしいです。', romaji: 'Atarashii kuruma ga hoshii desu.', english: 'I want a new car.' },
      { japanese: 'ともだちがほしいです。', romaji: 'Tomodachi ga hoshii desu.', english: 'I want friends.' }
    ],
    quiz: {
      question: 'Particle used with "hoshii": Watashi wa kuruma ___ hoshii desu.',
      options: ['wa', 'ga', 'o', 'ni'],
      correctAnswerIndex: 1
    }
  },
  {
    id: 'g_5_3_tai',
    title: 'Desire to Do (~tai)',
    level: 'Beginner (N5)',
    explanation: 'To express a desire to perform an action, you use the "-tai" form of a verb. You create this by taking the "masu" stem (the verb without "masu") and adding "tai desu." While the particle "o" is often used for the object, it is very common to change "o" to "ga" when using this form.',
    examples: [
      { japanese: 'えいがをみたいです。', romaji: 'Eiga o mitai desu.', english: 'I want to watch a movie.' },
      { japanese: 'にほんへいきたいです。', romaji: 'Nihon e ikitai desu.', english: 'I want to go to Japan.' },
      { japanese: 'すしがたべたいです。', romaji: 'Sushi ga tabetai desu.', english: 'I want to eat sushi.' }
    ],
    quiz: {
      question: 'Want to eat: Tabemasu -> ?',
      options: ['Tabetai', 'Tabehoshii', 'Tabetail', 'Taberu'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 6.1
  {
    id: 'g_6_1_mashouka',
    title: 'Invitation (~mashou ka)',
    level: 'Beginner (N5)',
    explanation: 'The "~mashou ka" ending is used to make a polite suggestion or to offer help to someone. When used as an invitation, it is like saying "Shall we...?" in English. It is slightly more proactive than "~masen ka," which is a softer invitation asking if the other person "would like to" join.',
    examples: [
      { japanese: 'いっしょにえいがをみませんか。', romaji: 'Issho ni eiga o mimasen ka?', english: 'Won\'t you watch a movie together?' },
      { japanese: 'かえりましょうか。', romaji: 'Kaerimashou ka.', english: 'Shall we go home?' },
      { japanese: 'てつだいましょうか。', romaji: 'Tetsudaimashou ka.', english: 'Shall I help you?' }
    ],
    quiz: {
      question: 'Invite someone to drink: Nomimasu -> ?',
      options: ['Nomimashou ka', 'Nomenaika', 'Nomitai', 'Nonde'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 6.2 covers Comparison (~wa ~ga) and Daily Activity (~teimasu)
  {
    id: 'g_6_2_comparison',
    title: 'Comparison (~wa ... ga ...)',
    level: 'Beginner (N5)',
    explanation: 'This pattern is used to contrast two different things or aspects. By using "wa" for both topics and placing "ga" (meaning "but") in between, you can clearly show a difference in state or ability. It is a common way to explain that you are good at one thing but not another.',
    examples: [
      { japanese: 'ひらがなはわかりますが、かんじはわかりません。', romaji: 'Hiragana wa wakarimasu ga, Kanji wa wakarimasen.', english: 'I understand Hiragana, but I don\'t understand Kanji.' },
      { japanese: 'やさいはたべますが、にくはたべません。', romaji: 'Yasai wa tabemasu ga, niku wa tabemasen.', english: 'I eat vegetables, but I don\'t eat meat.' },
      { japanese: 'テニスはすきですが、サッカーはすきじゃありません。', romaji: 'Tenisu wa suki desu ga, sakkaa wa suki ja arimasen.', english: 'I like tennis, but I don\'t like soccer.' }
    ],
    quiz: {
      question: 'Connect the contrast: "Meat is expensive" (Niku wa takai) + "Vegetables are cheap" (Yasai wa yasui)',
      options: ['Niku wa takai desu ga, yasai wa yasui desu.', 'Niku wa takai kara, yasai wa yasui desu.', 'Niku wa takai, yasai wa yasui.', 'Niku wa takai to yasai wa yasui.'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 7.1 Location
  {
    id: 'g_7_1_location',
    title: 'Location and Existence',
    level: 'Beginner (N5)',
    explanation: 'In Japanese, existence is expressed differently depending on whether the subject is living or inanimate. Use "arimasu" for objects and plants, and "imasu" for people and animals. The location is marked with the particle "ni," and the subject is marked with "ga."',
    examples: [
      { japanese: 'つくえのうえにほんがあります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'There is a book on the desk.' },
      { japanese: 'きょうしつにがくせいがいます。', romaji: 'Kyoushitsu ni gakusei ga imasu.', english: 'There are students in the classroom.' },
      { japanese: 'あそこにねこがいます。', romaji: 'Asoko ni neko ga imasu.', english: 'There is a cat over there.' }
    ],
    quiz: {
      question: 'Which verb for living things (people/animals)?',
      options: ['Arimasu', 'Imasu', 'Desu', 'Masu'],
      correctAnswerIndex: 1
    }
  },
  // Lesson 7.2 Te Form Request
  {
    id: 'g_7_2_te_kudasai',
    title: 'Request (~te kudasai)',
    level: 'Beginner (N5)',
    explanation: 'To ask someone to do something politely, you use the "te-form" of the verb followed by "kudasai." This is the standard way to make requests in a classroom or service environment. To use this correctly, you must master the different conjugation rules for Group 1, 2, and 3 verbs.',
    examples: [
      { japanese: 'しゃしんをとってください。', romaji: 'Shashin o totte kudasai.', english: 'Please take a photo.' },
      { japanese: 'ここにきいてください。', romaji: 'Koko ni kiite kudasai.', english: 'Please listen to this.' },
      { japanese: 'ちょっとまってください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.' }
    ],
    quiz: {
      question: 'Please wait: Matsu -> ?',
      options: ['Matte kudasai', 'Machite kudasai', 'Matsute kudasai', 'Mata kudasai'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 8.2 Adjectives Te-form (Joining)
  {
    id: 'g_8_2_adj_te',
    title: 'Joining Adjectives (~te)',
    level: 'Beginner (N5)',
    explanation: 'When you want to describe something with more than one adjective, you must connect them using the "te-form." For i-adjectives, change the final "i" to "kute." For na-adjectives and nouns, simply add "de" to the end.',
    examples: [
      { japanese: 'やさしくて、かわいいです。', romaji: 'Yasashikute, kawaii desu.', english: 'Kind and cute.' },
      { japanese: 'しんせつで、きれいです。', romaji: 'Shinsetsu de, kirei desu.', english: 'Kind and beautiful.' },
      { japanese: 'このへやはひろくて、あかるいです。', romaji: 'Kono heya wa hirokute, akarui desu.', english: 'This room is spacious and bright.' }
    ],
    quiz: {
      question: 'Join "Oishii" (delicious) and "Yasui" (cheap)',
      options: ['Oishikute, yasui', 'Oishiide, yasui', 'Oishii to yasui', 'Oishikatta, yasui'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 8.3 Giving and Receiving
  {
    id: 'g_8_3_giving',
    title: 'Giving & Receiving',
    level: 'Beginner (N5)',
    explanation: 'Japanese has three main verbs for giving and receiving that depend on who is giving to whom. "Agemasu" is used when you give to someone else. "Moraimasu" is used when you receive from someone. "Kuremasu" is a special verb used when someone gives something to you (the speaker) or your close circle.',
    examples: [
      { japanese: 'わたしはともだちにプレゼントをあげました。', romaji: 'Watashi wa tomodachi ni purezento o agemashita.', english: 'I gave a present to my friend.' },
      { japanese: 'ともだちにおかねをもらいました。', romaji: 'Tomodachi ni okane o moraimashita.', english: 'I received money from a friend.' },
      { japanese: 'たなかさんはわたしに花をくれました。', romaji: 'Tanaka-san wa watashi ni hana o kuremashita.', english: 'Mr. Tanaka gave me flowers.' }
    ],
    quiz: {
      question: 'When someone gives YOU something, use:',
      options: ['Agemasu', 'Moraimasu', 'Kuremasu', 'Okurimasu'],
      correctAnswerIndex: 2
    }
  },
  // Lesson 9.2 Potential
  {
    id: 'g_9_2_potential',
    title: 'Potential / Skills (~ga dekimasu)',
    level: 'Beginner (N5)',
    explanation: 'The word "dekimasu" is used to express ability or possibility. You can use it with a noun that implies an action, like "tennis" or "cooking." If you want to use it with a verb, you must use the dictionary form of the verb plus "koto" to turn it into a noun phrase.',
    examples: [
      { japanese: 'テニスができます。', romaji: 'Tenisu ga dekimasu.', english: 'I can play tennis.' },
      { japanese: 'およぐことができます。', romaji: 'Oyogu koto ga dekimasu.', english: 'I can swim.' },
      { japanese: 'にほんごをはなすことができます。', romaji: 'Nihongo o hanasu koto ga dekimasu.', english: 'I can speak Japanese.' }
    ],
    quiz: {
      question: 'To say "I can speak Japanese": Nihongo ___ dekimasu.',
      options: ['wa', 'o', 'ga', 'ni'],
      correctAnswerIndex: 2
    }
  },
  // Lesson 10.1 Audibility/Unknown
  {
    id: 'g_10_1_miemasu',
    title: 'Sensory Verbs (Miemasu/Kikoemasu)',
    level: 'Beginner (N5)',
    explanation: '"Miemasu" (to be visible) and "Kikoemasu" (to be audible) describe things that naturally enter your field of vision or hearing. Unlike "miru" or "kiku," these verbs don\'t imply an intentional action. They always take the particle "ga" to mark the object being perceived.',
    examples: [
      { japanese: 'ふじさんがみえます。', romaji: 'Fujisan ga miemasu.', english: 'I can see Mt. Fuji (Mt. Fuji is visible).' },
      { japanese: 'おとがきこえます。', romaji: 'Oto ga kikoemasu.', english: 'I can hear a sound (A sound is audible).' },
      { japanese: 'うみが見えます。', romaji: 'Umi ga miemasu.', english: 'The sea is visible.' }
    ],
    quiz: {
      question: 'I can hear music: Ongaku ___ kikoemasu.',
      options: ['o', 'ga', 'wa', 'de'],
      correctAnswerIndex: 1
    }
  },
  // Lesson 11.2 Conditional Toki
  {
    id: 'g_11_2_toki',
    title: 'Conditional (~toki)',
    level: 'Beginner (N5)',
    explanation: '"Toki" means "time" or "when" and is used to describe the timing of an action. It acts like a noun, so i-adjectives connect to it directly, while na-adjectives need "na" and nouns need "no." You can use it to talk about habits or specific moments in the past.',
    examples: [
      { japanese: 'ひまなとき、テレビをみます。', romaji: 'Hima na toki, terebi o mimasu.', english: 'When I am free, I watch TV.' },
      { japanese: 'こどものとき、よくあそびました。', romaji: 'Kodomo no toki, yoku asobimashita.', english: 'When I was a child, I played often.' },
      { japanese: 'びょうきのとき、くすりをのみます。', romaji: 'Byouki no toki, kusuri o nomimasu.', english: 'When I am sick, I take medicine.' }
    ],
    quiz: {
      question: 'Connect "Ame" (Rain) and "Toki"',
      options: ['Ame na toki', 'Ame no toki', 'Ame toki', 'Ame de toki'],
      correctAnswerIndex: 1
    }
  },
  // Lesson 12.1 Explanation
  {
    id: 'g_12_1_ndesuka',
    title: 'Explanation (~ndesu)',
    level: 'Beginner (N5)',
    explanation: 'The "~ndesu" (or "~n desu") ending is used when you are providing an explanation, seeking clarification, or adding emphasis to your statement. It creates a rapport between the speaker and listener by implying a shared context. In spoken Japanese, it is much more common than the plain "desu" when giving reasons.',
    examples: [
      { japanese: 'どうしたんですか。', romaji: 'Doushita n desu ka?', english: 'What is the matter? (Asking for an explanation)' },
      { japanese: 'あたまがいたいんです。', romaji: 'Atama ga itai n desu.', english: 'My head hurts (providing the reason for a situation).' },
      { japanese: 'しゅくだいがおおかったんです。', romaji: 'Shukudai ga ookatta n desu.', english: 'It\'s that there was a lot of homework.' }
    ],
    quiz: {
      question: 'Make "Iku" (go) into explanatory form.',
      options: ['Ikundesu', 'Ikimasu', 'Itte', 'Ikanai'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 12.2 Advice
  {
    id: 'g_12_2_advice',
    title: 'Advice (~ta hou ga ii)',
    level: 'Beginner (N5)',
    explanation: 'To give a strong recommendation or advice, use the past tense (ta-form) of a verb followed by "hou ga ii desu." Although it uses the past tense, it refers to a future action. To advise someone *not* to do something, use the negative (nai-form) followed by "hou ga ii desu."',
    examples: [
      { japanese: 'くすりをのんだほうがいいです。', romaji: 'Kusuri o nonda hou ga ii desu.', english: 'You had better take medicine.' },
      { japanese: 'もっとべんきょうしたほうがいいです。', romaji: 'Motto benkyou shita hou ga ii desu.', english: 'You should study more.' },
      { japanese: 'あまりおさけをのまないほうがいいです。', romaji: 'Amari osake o nomanai hou ga ii desu.', english: 'You had better not drink much alcohol.' }
    ],
    quiz: {
      question: 'Which form connects to "hou ga ii" (should)?',
      options: ['Masu form', 'Te form', 'Ta form', 'Dictionary form'],
      correctAnswerIndex: 2
    }
  },
  // Lesson 13.1 Experience
  {
    id: 'g_13_1_experience',
    title: 'Experience (~ta koto ga arimasu)',
    level: 'Beginner (N5)',
    explanation: 'This pattern is used to talk about things you have done at least once in your life. It uses the past tense plain form (ta-form) of the verb plus "koto ga arimasu." It is specifically for life experiences, not for actions you just completed recently.',
    examples: [
      { japanese: '日本へ行ったことがあります。', romaji: 'Nihon e itta koto ga arimasu.', english: 'I have been to Japan.' },
      { japanese: 'すしをたべたことがあります。', romaji: 'Sushi o tabeta koto ga arimasu.', english: 'I have eaten sushi before.' },
      { japanese: 'うたをかいたことがありません。', romaji: 'Uta o kaita koto ga arimasen.', english: 'I have never written a song.' }
    ],
    quiz: {
      question: 'I have eaten sushi.',
      options: ['Sushi o tabeta koto ga arimasu.', 'Sushi o taberu koto ga arimasu.', 'Sushi o tabete koto ga arimasu.', 'Sushi o tabemasu koto ga arimasu.'],
      correctAnswerIndex: 0
    }
  },
  // Lesson 15.2 Tara
  {
    id: 'g_15_2_tara',
    title: 'Conditional (~tara)',
    level: 'Beginner (N5)',
    explanation: 'The "~tara" conditional is one of the most versatile ways to say "if" or "when" in Japanese. It is formed by adding "ra" to the past tense (ta-form) of verbs or adjectives. It can describe a hypothetical situation or an action that will happen once a certain condition is met.',
    examples: [
      { japanese: 'あめがふったら、いきません。', romaji: 'Ame ga futtara, ikimasen.', english: 'If it rains, I will not go.' },
      { japanese: 'やすかったら、かいます。', romaji: 'Yasukattara, kaimasu.', english: 'If it is cheap, I will buy it.' },
      { japanese: 'じかんがあったら、あそびにきてください。', romaji: 'Jikan ga attara, asobi ni kite kudasai.', english: 'If you have time, please come over.' }
    ],
    quiz: {
      question: 'If I have money: Okane ga ___ KAIMASU.',
      options: ['Attara', 'Arimasu', 'Atte', 'Nai'],
      correctAnswerIndex: 0
    }
  }
];