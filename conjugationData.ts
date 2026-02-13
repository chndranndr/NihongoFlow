// Japanese Verb and Adjective Conjugation Data for NihongoFlow
// Includes godan, ichidan, irregular verbs, and i-/na-adjectives

export type VerbType = 'godan' | 'ichidan' | 'irregular';
export type AdjectiveType = 'i-adjective' | 'na-adjective';
export type ConjugationForm =
    | 'dictionary' | 'masu' | 'te' | 'negative' | 'past' | 'past-negative'
    | 'potential' | 'volitional' | 'imperative' | 'conditional' | 'tai';

export interface Verb {
    dictionary: string;
    reading: string;
    romaji: string;
    meaning: string;
    type: VerbType;
    ending?: string; // For godan: む, ぶ, ぬ, ぐ, く, す, つ, う, る
}

export interface Adjective {
    dictionary: string;
    reading: string;
    romaji: string;
    meaning: string;
    type: AdjectiveType;
}

export interface ConjugatedForm {
    kanji: string;
    hiragana: string;
    romaji: string;
}

// ============= VERBS =============

export const GODAN_VERBS: Verb[] = [
    // む ending
    { dictionary: '飲む', reading: 'のむ', romaji: 'nomu', meaning: 'to drink', type: 'godan', ending: 'む' },
    { dictionary: '読む', reading: 'よむ', romaji: 'yomu', meaning: 'to read', type: 'godan', ending: 'む' },
    { dictionary: '休む', reading: 'やすむ', romaji: 'yasumu', meaning: 'to rest', type: 'godan', ending: 'む' },
    // ぶ ending
    { dictionary: '遊ぶ', reading: 'あそぶ', romaji: 'asobu', meaning: 'to play', type: 'godan', ending: 'ぶ' },
    { dictionary: '呼ぶ', reading: 'よぶ', romaji: 'yobu', meaning: 'to call', type: 'godan', ending: 'ぶ' },
    // ぬ ending
    { dictionary: '死ぬ', reading: 'しぬ', romaji: 'shinu', meaning: 'to die', type: 'godan', ending: 'ぬ' },
    // ぐ ending
    { dictionary: '泳ぐ', reading: 'およぐ', romaji: 'oyogu', meaning: 'to swim', type: 'godan', ending: 'ぐ' },
    { dictionary: '脱ぐ', reading: 'ぬぐ', romaji: 'nugu', meaning: 'to take off (clothes)', type: 'godan', ending: 'ぐ' },
    // く ending
    { dictionary: '書く', reading: 'かく', romaji: 'kaku', meaning: 'to write', type: 'godan', ending: 'く' },
    { dictionary: '聞く', reading: 'きく', romaji: 'kiku', meaning: 'to listen/ask', type: 'godan', ending: 'く' },
    { dictionary: '歩く', reading: 'あるく', romaji: 'aruku', meaning: 'to walk', type: 'godan', ending: 'く' },
    { dictionary: '働く', reading: 'はたらく', romaji: 'hataraku', meaning: 'to work', type: 'godan', ending: 'く' },
    // す ending
    { dictionary: '話す', reading: 'はなす', romaji: 'hanasu', meaning: 'to speak', type: 'godan', ending: 'す' },
    { dictionary: '出す', reading: 'だす', romaji: 'dasu', meaning: 'to take out', type: 'godan', ending: 'す' },
    { dictionary: '押す', reading: 'おす', romaji: 'osu', meaning: 'to push', type: 'godan', ending: 'す' },
    // つ ending
    { dictionary: '待つ', reading: 'まつ', romaji: 'matsu', meaning: 'to wait', type: 'godan', ending: 'つ' },
    { dictionary: '持つ', reading: 'もつ', romaji: 'motsu', meaning: 'to hold', type: 'godan', ending: 'つ' },
    { dictionary: '立つ', reading: 'たつ', romaji: 'tatsu', meaning: 'to stand', type: 'godan', ending: 'つ' },
    // う ending
    { dictionary: '買う', reading: 'かう', romaji: 'kau', meaning: 'to buy', type: 'godan', ending: 'う' },
    { dictionary: '会う', reading: 'あう', romaji: 'au', meaning: 'to meet', type: 'godan', ending: 'う' },
    { dictionary: '歌う', reading: 'うたう', romaji: 'utau', meaning: 'to sing', type: 'godan', ending: 'う' },
    { dictionary: '洗う', reading: 'あらう', romaji: 'arau', meaning: 'to wash', type: 'godan', ending: 'う' },
    // る ending (godan)
    { dictionary: '作る', reading: 'つくる', romaji: 'tsukuru', meaning: 'to make', type: 'godan', ending: 'る' },
    { dictionary: '撮る', reading: 'とる', romaji: 'toru', meaning: 'to take (photo)', type: 'godan', ending: 'る' },
    { dictionary: '乗る', reading: 'のる', romaji: 'noru', meaning: 'to ride', type: 'godan', ending: 'る' },
    { dictionary: '帰る', reading: 'かえる', romaji: 'kaeru', meaning: 'to return', type: 'godan', ending: 'る' },
    { dictionary: '送る', reading: 'おくる', romaji: 'okuru', meaning: 'to send', type: 'godan', ending: 'る' },
    // 行く is special (irregular te-form)
    { dictionary: '行く', reading: 'いく', romaji: 'iku', meaning: 'to go', type: 'godan', ending: 'く' },
];

export const ICHIDAN_VERBS: Verb[] = [
    { dictionary: '食べる', reading: 'たべる', romaji: 'taberu', meaning: 'to eat', type: 'ichidan' },
    { dictionary: '見る', reading: 'みる', romaji: 'miru', meaning: 'to see/watch', type: 'ichidan' },
    { dictionary: '起きる', reading: 'おきる', romaji: 'okiru', meaning: 'to wake up', type: 'ichidan' },
    { dictionary: '寝る', reading: 'ねる', romaji: 'neru', meaning: 'to sleep', type: 'ichidan' },
    { dictionary: '教える', reading: 'おしえる', romaji: 'oshieru', meaning: 'to teach', type: 'ichidan' },
    { dictionary: '忘れる', reading: 'わすれる', romaji: 'wasureru', meaning: 'to forget', type: 'ichidan' },
    { dictionary: '開ける', reading: 'あける', romaji: 'akeru', meaning: 'to open', type: 'ichidan' },
    { dictionary: '閉める', reading: 'しめる', romaji: 'shimeru', meaning: 'to close', type: 'ichidan' },
    { dictionary: '着る', reading: 'きる', romaji: 'kiru', meaning: 'to wear', type: 'ichidan' },
    { dictionary: '答える', reading: 'こたえる', romaji: 'kotaeru', meaning: 'to answer', type: 'ichidan' },
    { dictionary: '出る', reading: 'でる', romaji: 'deru', meaning: 'to exit', type: 'ichidan' },
    { dictionary: '入れる', reading: 'いれる', romaji: 'ireru', meaning: 'to insert', type: 'ichidan' },
    { dictionary: '借りる', reading: 'かりる', romaji: 'kariru', meaning: 'to borrow', type: 'ichidan' },
    { dictionary: '浴びる', reading: 'あびる', romaji: 'abiru', meaning: 'to shower', type: 'ichidan' },
    { dictionary: '考える', reading: 'かんがえる', romaji: 'kangaeru', meaning: 'to think', type: 'ichidan' },
];

export const IRREGULAR_VERBS: Verb[] = [
    { dictionary: 'する', reading: 'する', romaji: 'suru', meaning: 'to do', type: 'irregular' },
    { dictionary: '来る', reading: 'くる', romaji: 'kuru', meaning: 'to come', type: 'irregular' },
];

export const ALL_VERBS: Verb[] = [...GODAN_VERBS, ...ICHIDAN_VERBS, ...IRREGULAR_VERBS];

// ============= ADJECTIVES =============

export const I_ADJECTIVES: Adjective[] = [
    { dictionary: '高い', reading: 'たかい', romaji: 'takai', meaning: 'expensive/tall', type: 'i-adjective' },
    { dictionary: '安い', reading: 'やすい', romaji: 'yasui', meaning: 'cheap', type: 'i-adjective' },
    { dictionary: '新しい', reading: 'あたらしい', romaji: 'atarashii', meaning: 'new', type: 'i-adjective' },
    { dictionary: '古い', reading: 'ふるい', romaji: 'furui', meaning: 'old', type: 'i-adjective' },
    { dictionary: '大きい', reading: 'おおきい', romaji: 'ookii', meaning: 'big', type: 'i-adjective' },
    { dictionary: '小さい', reading: 'ちいさい', romaji: 'chiisai', meaning: 'small', type: 'i-adjective' },
    { dictionary: '良い', reading: 'いい', romaji: 'ii', meaning: 'good', type: 'i-adjective' },
    { dictionary: '悪い', reading: 'わるい', romaji: 'warui', meaning: 'bad', type: 'i-adjective' },
    { dictionary: '暑い', reading: 'あつい', romaji: 'atsui', meaning: 'hot (weather)', type: 'i-adjective' },
    { dictionary: '寒い', reading: 'さむい', romaji: 'samui', meaning: 'cold (weather)', type: 'i-adjective' },
    { dictionary: '熱い', reading: 'あつい', romaji: 'atsui', meaning: 'hot (things)', type: 'i-adjective' },
    { dictionary: '冷たい', reading: 'つめたい', romaji: 'tsumetai', meaning: 'cold (things)', type: 'i-adjective' },
    { dictionary: '面白い', reading: 'おもしろい', romaji: 'omoshiroi', meaning: 'interesting/funny', type: 'i-adjective' },
    { dictionary: '難しい', reading: 'むずかしい', romaji: 'muzukashii', meaning: 'difficult', type: 'i-adjective' },
    { dictionary: '易しい', reading: 'やさしい', romaji: 'yasashii', meaning: 'easy', type: 'i-adjective' },
    { dictionary: '忙しい', reading: 'いそがしい', romaji: 'isogashii', meaning: 'busy', type: 'i-adjective' },
    { dictionary: '楽しい', reading: 'たのしい', romaji: 'tanoshii', meaning: 'fun', type: 'i-adjective' },
    { dictionary: '美味しい', reading: 'おいしい', romaji: 'oishii', meaning: 'delicious', type: 'i-adjective' },
    { dictionary: '速い', reading: 'はやい', romaji: 'hayai', meaning: 'fast', type: 'i-adjective' },
    { dictionary: '遅い', reading: 'おそい', romaji: 'osoi', meaning: 'slow/late', type: 'i-adjective' },
];

export const NA_ADJECTIVES: Adjective[] = [
    { dictionary: '静か', reading: 'しずか', romaji: 'shizuka', meaning: 'quiet', type: 'na-adjective' },
    { dictionary: 'きれい', reading: 'きれい', romaji: 'kirei', meaning: 'beautiful/clean', type: 'na-adjective' },
    { dictionary: '元気', reading: 'げんき', romaji: 'genki', meaning: 'healthy/energetic', type: 'na-adjective' },
    { dictionary: '有名', reading: 'ゆうめい', romaji: 'yuumei', meaning: 'famous', type: 'na-adjective' },
    { dictionary: '大切', reading: 'たいせつ', romaji: 'taisetsu', meaning: 'important', type: 'na-adjective' },
    { dictionary: '便利', reading: 'べんり', romaji: 'benri', meaning: 'convenient', type: 'na-adjective' },
    { dictionary: '簡単', reading: 'かんたん', romaji: 'kantan', meaning: 'easy/simple', type: 'na-adjective' },
    { dictionary: '上手', reading: 'じょうず', romaji: 'jouzu', meaning: 'skillful', type: 'na-adjective' },
    { dictionary: '下手', reading: 'へた', romaji: 'heta', meaning: 'unskillful', type: 'na-adjective' },
    { dictionary: '好き', reading: 'すき', romaji: 'suki', meaning: 'like', type: 'na-adjective' },
    { dictionary: '嫌い', reading: 'きらい', romaji: 'kirai', meaning: 'dislike', type: 'na-adjective' },
    { dictionary: '賑やか', reading: 'にぎやか', romaji: 'nigiyaka', meaning: 'lively', type: 'na-adjective' },
    { dictionary: '暇', reading: 'ひま', romaji: 'hima', meaning: 'free (time)', type: 'na-adjective' },
    { dictionary: '親切', reading: 'しんせつ', romaji: 'shinsetsu', meaning: 'kind', type: 'na-adjective' },
    { dictionary: '大変', reading: 'たいへん', romaji: 'taihen', meaning: 'tough/serious', type: 'na-adjective' },
];

export const ALL_ADJECTIVES: Adjective[] = [...I_ADJECTIVES, ...NA_ADJECTIVES];

// ============= CONJUGATION LOGIC =============

// Hiragana mappings for conjugation
const GODAN_STEM_MAP: Record<string, Record<string, string>> = {
    'む': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
    'ぶ': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
    'ぬ': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
    'ぐ': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
    'く': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', te: 'いて', ta: 'いた' },
    'す': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
    'つ': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', te: 'って', ta: 'った' },
    'う': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お', te: 'って', ta: 'った' },
    'る': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', te: 'って', ta: 'った' },
};

// Romaji mappings for conjugation
const GODAN_ROMAJI_MAP: Record<string, Record<string, string>> = {
    'む': { a: 'ma', i: 'mi', u: 'mu', e: 'me', o: 'mo', te: 'nde', ta: 'nda' },
    'ぶ': { a: 'ba', i: 'bi', u: 'bu', e: 'be', o: 'bo', te: 'nde', ta: 'nda' },
    'ぬ': { a: 'na', i: 'ni', u: 'nu', e: 'ne', o: 'no', te: 'nde', ta: 'nda' },
    'ぐ': { a: 'ga', i: 'gi', u: 'gu', e: 'ge', o: 'go', te: 'ide', ta: 'ida' },
    'く': { a: 'ka', i: 'ki', u: 'ku', e: 'ke', o: 'ko', te: 'ite', ta: 'ita' },
    'す': { a: 'sa', i: 'shi', u: 'su', e: 'se', o: 'so', te: 'shite', ta: 'shita' },
    'つ': { a: 'ta', i: 'chi', u: 'tsu', e: 'te', o: 'to', te: 'tte', ta: 'tta' },
    'う': { a: 'wa', i: 'i', u: 'u', e: 'e', o: 'o', te: 'tte', ta: 'tta' },
    'る': { a: 'ra', i: 'ri', u: 'ru', e: 're', o: 'ro', te: 'tte', ta: 'tta' },
};

function getGodanStem(reading: string): string {
    return reading.slice(0, -1);
}

function getRomajiStem(romaji: string): string {
    // Remove last syllable from romaji
    const endings = ['mu', 'bu', 'nu', 'gu', 'ku', 'su', 'tsu', 'u', 'ru'];
    for (const end of endings) {
        if (romaji.endsWith(end)) {
            return romaji.slice(0, -end.length);
        }
    }
    return romaji.slice(0, -1);
}

export function conjugateVerb(verb: Verb, form: ConjugationForm): ConjugatedForm {
    const { reading, romaji, type, ending, dictionary } = verb;

    // Handle dictionary form
    if (form === 'dictionary') {
        return { kanji: dictionary, hiragana: reading, romaji };
    }

    // Handle irregular verbs
    if (type === 'irregular') {
        return conjugateIrregularVerb(verb, form);
    }

    // Handle ichidan verbs
    if (type === 'ichidan') {
        return conjugateIchidanVerb(verb, form);
    }

    // Handle godan verbs
    return conjugateGodanVerb(verb, form, ending!);
}

function conjugateIchidanVerb(verb: Verb, form: ConjugationForm): ConjugatedForm {
    const stem = verb.reading.slice(0, -1);
    const romajiStem = verb.romaji.slice(0, -2); // Remove 'ru'
    const kanjiStem = verb.dictionary.slice(0, -1);

    switch (form) {
        case 'masu':
            return { kanji: kanjiStem + 'ます', hiragana: stem + 'ます', romaji: romajiStem + 'masu' };
        case 'te':
            return { kanji: kanjiStem + 'て', hiragana: stem + 'て', romaji: romajiStem + 'te' };
        case 'negative':
            return { kanji: kanjiStem + 'ない', hiragana: stem + 'ない', romaji: romajiStem + 'nai' };
        case 'past':
            return { kanji: kanjiStem + 'た', hiragana: stem + 'た', romaji: romajiStem + 'ta' };
        case 'past-negative':
            return { kanji: kanjiStem + 'なかった', hiragana: stem + 'なかった', romaji: romajiStem + 'nakatta' };
        case 'potential':
            return { kanji: kanjiStem + 'られる', hiragana: stem + 'られる', romaji: romajiStem + 'rareru' };
        case 'volitional':
            return { kanji: kanjiStem + 'よう', hiragana: stem + 'よう', romaji: romajiStem + 'you' };
        case 'imperative':
            return { kanji: kanjiStem + 'ろ', hiragana: stem + 'ろ', romaji: romajiStem + 'ro' };
        case 'conditional':
            return { kanji: kanjiStem + 'れば', hiragana: stem + 'れば', romaji: romajiStem + 'reba' };
        case 'tai':
            return { kanji: kanjiStem + 'たい', hiragana: stem + 'たい', romaji: romajiStem + 'tai' };
        default:
            return { kanji: verb.dictionary, hiragana: verb.reading, romaji: verb.romaji };
    }
}

function conjugateGodanVerb(verb: Verb, form: ConjugationForm, ending: string): ConjugatedForm {
    const stem = getGodanStem(verb.reading);
    const romajiStem = getRomajiStem(verb.romaji);
    const kanjiStem = verb.dictionary.slice(0, -1);
    const map = GODAN_STEM_MAP[ending];
    const romajiMap = GODAN_ROMAJI_MAP[ending];

    // Special case for 行く (iku)
    const isIku = verb.dictionary === '行く';

    switch (form) {
        case 'masu':
            return { kanji: kanjiStem + 'きます', hiragana: stem + map.i + 'ます', romaji: romajiStem + romajiMap.i + 'masu' };
        case 'te':
            if (isIku) {
                return { kanji: '行って', hiragana: 'いって', romaji: 'itte' };
            }
            return { kanji: kanjiStem + map.te.slice(-1), hiragana: stem + map.te, romaji: romajiStem + romajiMap.te };
        case 'negative':
            return { kanji: kanjiStem + 'かない', hiragana: stem + map.a + 'ない', romaji: romajiStem + romajiMap.a + 'nai' };
        case 'past':
            if (isIku) {
                return { kanji: '行った', hiragana: 'いった', romaji: 'itta' };
            }
            return { kanji: kanjiStem + map.ta.slice(-1), hiragana: stem + map.ta, romaji: romajiStem + romajiMap.ta };
        case 'past-negative':
            return { kanji: kanjiStem + 'かなかった', hiragana: stem + map.a + 'なかった', romaji: romajiStem + romajiMap.a + 'nakatta' };
        case 'potential':
            return { kanji: kanjiStem + 'ける', hiragana: stem + map.e + 'る', romaji: romajiStem + romajiMap.e + 'ru' };
        case 'volitional':
            return { kanji: kanjiStem + 'こう', hiragana: stem + map.o + 'う', romaji: romajiStem + romajiMap.o + 'u' };
        case 'imperative':
            return { kanji: kanjiStem + 'け', hiragana: stem + map.e, romaji: romajiStem + romajiMap.e };
        case 'conditional':
            return { kanji: kanjiStem + 'けば', hiragana: stem + map.e + 'ば', romaji: romajiStem + romajiMap.e + 'ba' };
        case 'tai':
            return { kanji: kanjiStem + 'きたい', hiragana: stem + map.i + 'たい', romaji: romajiStem + romajiMap.i + 'tai' };
        default:
            return { kanji: verb.dictionary, hiragana: verb.reading, romaji: verb.romaji };
    }
}

function conjugateIrregularVerb(verb: Verb, form: ConjugationForm): ConjugatedForm {
    if (verb.reading === 'する') {
        switch (form) {
            case 'masu': return { kanji: 'します', hiragana: 'します', romaji: 'shimasu' };
            case 'te': return { kanji: 'して', hiragana: 'して', romaji: 'shite' };
            case 'negative': return { kanji: 'しない', hiragana: 'しない', romaji: 'shinai' };
            case 'past': return { kanji: 'した', hiragana: 'した', romaji: 'shita' };
            case 'past-negative': return { kanji: 'しなかった', hiragana: 'しなかった', romaji: 'shinakatta' };
            case 'potential': return { kanji: 'できる', hiragana: 'できる', romaji: 'dekiru' };
            case 'volitional': return { kanji: 'しよう', hiragana: 'しよう', romaji: 'shiyou' };
            case 'imperative': return { kanji: 'しろ', hiragana: 'しろ', romaji: 'shiro' };
            case 'conditional': return { kanji: 'すれば', hiragana: 'すれば', romaji: 'sureba' };
            case 'tai': return { kanji: 'したい', hiragana: 'したい', romaji: 'shitai' };
            default: return { kanji: 'する', hiragana: 'する', romaji: 'suru' };
        }
    } else if (verb.reading === 'くる') {
        switch (form) {
            case 'masu': return { kanji: '来ます', hiragana: 'きます', romaji: 'kimasu' };
            case 'te': return { kanji: '来て', hiragana: 'きて', romaji: 'kite' };
            case 'negative': return { kanji: '来ない', hiragana: 'こない', romaji: 'konai' };
            case 'past': return { kanji: '来た', hiragana: 'きた', romaji: 'kita' };
            case 'past-negative': return { kanji: '来なかった', hiragana: 'こなかった', romaji: 'konakatta' };
            case 'potential': return { kanji: '来られる', hiragana: 'こられる', romaji: 'korareru' };
            case 'volitional': return { kanji: '来よう', hiragana: 'こよう', romaji: 'koyou' };
            case 'imperative': return { kanji: '来い', hiragana: 'こい', romaji: 'koi' };
            case 'conditional': return { kanji: '来れば', hiragana: 'くれば', romaji: 'kureba' };
            case 'tai': return { kanji: '来たい', hiragana: 'きたい', romaji: 'kitai' };
            default: return { kanji: '来る', hiragana: 'くる', romaji: 'kuru' };
        }
    }
    return { kanji: verb.dictionary, hiragana: verb.reading, romaji: verb.romaji };
}

// ============= ADJECTIVE CONJUGATION =============

export function conjugateAdjective(adj: Adjective, form: ConjugationForm): ConjugatedForm {
    if (form === 'dictionary') {
        return { kanji: adj.dictionary, hiragana: adj.reading, romaji: adj.romaji };
    }

    if (adj.type === 'i-adjective') {
        return conjugateIAdjective(adj, form);
    } else {
        return conjugateNaAdjective(adj, form);
    }
}

function conjugateIAdjective(adj: Adjective, form: ConjugationForm): ConjugatedForm {
    // Special handling for いい (good)
    const isIi = adj.reading === 'いい';
    const stem = isIi ? 'よ' : adj.reading.slice(0, -1);
    const romajiStem = isIi ? 'yo' : adj.romaji.slice(0, -1);
    const kanjiStem = isIi ? '良' : adj.dictionary.slice(0, -1);

    switch (form) {
        case 'te':
            return { kanji: kanjiStem + 'くて', hiragana: stem + 'くて', romaji: romajiStem + 'kute' };
        case 'negative':
            return { kanji: kanjiStem + 'くない', hiragana: stem + 'くない', romaji: romajiStem + 'kunai' };
        case 'past':
            return { kanji: kanjiStem + 'かった', hiragana: stem + 'かった', romaji: romajiStem + 'katta' };
        case 'past-negative':
            return { kanji: kanjiStem + 'くなかった', hiragana: stem + 'くなかった', romaji: romajiStem + 'kunakatta' };
        case 'conditional':
            return { kanji: kanjiStem + 'ければ', hiragana: stem + 'ければ', romaji: romajiStem + 'kereba' };
        default:
            return { kanji: adj.dictionary, hiragana: adj.reading, romaji: adj.romaji };
    }
}

function conjugateNaAdjective(adj: Adjective, form: ConjugationForm): ConjugatedForm {
    const { dictionary, reading, romaji } = adj;

    switch (form) {
        case 'te':
            return { kanji: dictionary + 'で', hiragana: reading + 'で', romaji: romaji + 'de' };
        case 'negative':
            return { kanji: dictionary + 'じゃない', hiragana: reading + 'じゃない', romaji: romaji + 'janai' };
        case 'past':
            return { kanji: dictionary + 'だった', hiragana: reading + 'だった', romaji: romaji + 'datta' };
        case 'past-negative':
            return { kanji: dictionary + 'じゃなかった', hiragana: reading + 'じゃなかった', romaji: romaji + 'janakatta' };
        case 'conditional':
            return { kanji: dictionary + 'なら', hiragana: reading + 'なら', romaji: romaji + 'nara' };
        default:
            return { kanji: dictionary, hiragana: reading, romaji: romaji };
    }
}

// ============= DRILL HELPERS =============

export const VERB_FORMS: { form: ConjugationForm; label: string; description: string }[] = [
    { form: 'masu', label: 'Masu Form', description: 'Polite present/future' },
    { form: 'te', label: 'Te Form', description: 'Connecting form' },
    { form: 'negative', label: 'Negative', description: 'Plain negative' },
    { form: 'past', label: 'Past', description: 'Plain past' },
    { form: 'past-negative', label: 'Past Negative', description: 'Plain past negative' },
    { form: 'potential', label: 'Potential', description: 'Can do' },
    { form: 'volitional', label: 'Volitional', description: 'Let\'s / shall' },
    { form: 'imperative', label: 'Imperative', description: 'Command' },
    { form: 'conditional', label: 'Conditional', description: 'If ~' },
    { form: 'tai', label: 'Tai Form', description: 'Want to ~' },
];

export const ADJECTIVE_FORMS: { form: ConjugationForm; label: string; description: string }[] = [
    { form: 'te', label: 'Te Form', description: 'Connecting form' },
    { form: 'negative', label: 'Negative', description: 'Not ~' },
    { form: 'past', label: 'Past', description: 'Was ~' },
    { form: 'past-negative', label: 'Past Negative', description: 'Was not ~' },
    { form: 'conditional', label: 'Conditional', description: 'If ~' },
];

export interface ConjugationDrillItem {
    id: string;
    word: Verb | Adjective;
    wordType: 'verb' | 'adjective';
    targetForm: ConjugationForm;
    question: {
        kanji: string;
        hiragana: string;
        romaji: string;
        meaning: string;
    };
    answer: ConjugatedForm;
    formLabel: string;
}

export function generateConjugationDrillItems(
    wordType: 'verb' | 'adjective',
    verbTypes: ('godan' | 'ichidan' | 'irregular' | 'all')[],
    adjectiveTypes: ('i-adjective' | 'na-adjective' | 'all')[],
    forms: ConjugationForm[],
    count: number
): ConjugationDrillItem[] {
    let words: (Verb | Adjective)[] = [];

    if (wordType === 'verb') {
        if (verbTypes.includes('all')) {
            words = [...ALL_VERBS];
        } else {
            if (verbTypes.includes('godan')) words.push(...GODAN_VERBS);
            if (verbTypes.includes('ichidan')) words.push(...ICHIDAN_VERBS);
            if (verbTypes.includes('irregular')) words.push(...IRREGULAR_VERBS);
        }
    } else {
        if (adjectiveTypes.includes('all')) {
            words = [...ALL_ADJECTIVES];
        } else {
            if (adjectiveTypes.includes('i-adjective')) words.push(...I_ADJECTIVES);
            if (adjectiveTypes.includes('na-adjective')) words.push(...NA_ADJECTIVES);
        }
    }

    const items: ConjugationDrillItem[] = [];
    const formLabels = wordType === 'verb' ? VERB_FORMS : ADJECTIVE_FORMS;
    const usedCombos = new Set<string>();

    while (items.length < count && words.length > 0 && forms.length > 0) {
        const wordIdx = Math.floor(Math.random() * words.length);
        const formIdx = Math.floor(Math.random() * forms.length);
        const word = words[wordIdx];
        const form = forms[formIdx];

        // Skip invalid combinations (e.g., potential for adjectives)
        if (wordType === 'adjective' && ['masu', 'potential', 'volitional', 'imperative', 'tai'].includes(form)) {
            continue;
        }

        const comboKey = `${word.reading}-${form}`;
        if (usedCombos.has(comboKey)) continue;
        usedCombos.add(comboKey);

        const answer = wordType === 'verb'
            ? conjugateVerb(word as Verb, form)
            : conjugateAdjective(word as Adjective, form);

        const formInfo = formLabels.find(f => f.form === form);

        items.push({
            id: `conj-${Date.now()}-${items.length}`,
            word,
            wordType,
            targetForm: form,
            question: {
                kanji: word.dictionary,
                hiragana: word.reading,
                romaji: word.romaji,
                meaning: word.meaning,
            },
            answer,
            formLabel: formInfo?.label || form,
        });
    }

    return items.sort(() => Math.random() - 0.5);
}
