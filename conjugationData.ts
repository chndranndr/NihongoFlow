// Conjugation engine for NihongoFlow
// Works directly on DrillItem from vocab — no separate data arrays needed.

import { DrillItem } from './types';

export type ConjugationForm =
    | 'dictionary' | 'masu' | 'te' | 'negative' | 'past' | 'past-negative'
    | 'potential' | 'passive' | 'volitional' | 'imperative' | 'polite-imperative' | 'conditional' | 'tai';

export interface ConjugatedForm {
    kanji: string;
    hiragana: string;
    romaji: string;
}

export interface ConjugationDrillItem {
    id: string;
    item: DrillItem;
    targetForm: ConjugationForm;
    question: { kanji: string; hiragana: string; romaji: string; meaning: string; };
    answer: ConjugatedForm;
    formLabel: string;
}

// ============= CONJUGATION TABLES =============

const GODAN_STEM: Record<string, Record<string, string>> = {
    'む': { a: 'ま', i: 'み', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
    'ぶ': { a: 'ば', i: 'び', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
    'ぬ': { a: 'な', i: 'に', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
    'ぐ': { a: 'が', i: 'ぎ', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
    'く': { a: 'か', i: 'き', e: 'け', o: 'こ', te: 'いて', ta: 'いた' },
    'す': { a: 'さ', i: 'し', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
    'つ': { a: 'た', i: 'ち', e: 'て', o: 'と', te: 'って', ta: 'った' },
    'う': { a: 'わ', i: 'い', e: 'え', o: 'お', te: 'って', ta: 'った' },
    'る': { a: 'ら', i: 'り', e: 'れ', o: 'ろ', te: 'って', ta: 'った' },
};

const GODAN_ROMAJI: Record<string, Record<string, string>> = {
    'む': { a: 'ma', i: 'mi', e: 'me', o: 'mo', te: 'nde', ta: 'nda' },
    'ぶ': { a: 'ba', i: 'bi', e: 'be', o: 'bo', te: 'nde', ta: 'nda' },
    'ぬ': { a: 'na', i: 'ni', e: 'ne', o: 'no', te: 'nde', ta: 'nda' },
    'ぐ': { a: 'ga', i: 'gi', e: 'ge', o: 'go', te: 'ide', ta: 'ida' },
    'く': { a: 'ka', i: 'ki', e: 'ke', o: 'ko', te: 'ite', ta: 'ita' },
    'す': { a: 'sa', i: 'shi', e: 'se', o: 'so', te: 'shite', ta: 'shita' },
    'つ': { a: 'ta', i: 'chi', e: 'te', o: 'to', te: 'tte', ta: 'tta' },
    'う': { a: 'wa', i: 'i', e: 'e', o: 'o', te: 'tte', ta: 'tta' },
    'る': { a: 'ra', i: 'ri', e: 're', o: 'ro', te: 'tte', ta: 'tta' },
};

const ROMAJI_ENDINGS = ['mu', 'bu', 'nu', 'gu', 'ku', 'su', 'tsu', 'u', 'ru'];

function romajiStem(romaji: string): string {
    for (const end of ROMAJI_ENDINGS) {
        if (romaji.endsWith(end)) return romaji.slice(0, -end.length);
    }
    return romaji.slice(0, -1);
}

// ============= VERB CONJUGATION =============

function conjugateGodan(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    const reading = item.reading!;
    const ending = reading.slice(-1);
    const hStem = reading.slice(0, -1);
    const rStem = romajiStem(item.primaryReading);
    const kStem = item.character.slice(0, -1);
    const m = GODAN_STEM[ending];
    const r = GODAN_ROMAJI[ending];
    const isIku = item.character === '行く';

    switch (form) {
        case 'dictionary': return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
        case 'masu': return { kanji: kStem + m.i + 'ます', hiragana: hStem + m.i + 'ます', romaji: rStem + r.i + 'masu' };
        case 'te':
            if (isIku) return { kanji: '行って', hiragana: 'いって', romaji: 'itte' };
            return { kanji: kStem + m.te.slice(-1), hiragana: hStem + m.te, romaji: rStem + r.te };
        case 'negative': return { kanji: kStem + m.a + 'ない', hiragana: hStem + m.a + 'ない', romaji: rStem + r.a + 'nai' };
        case 'past':
            if (isIku) return { kanji: '行った', hiragana: 'いった', romaji: 'itta' };
            return { kanji: kStem + m.ta.slice(-1), hiragana: hStem + m.ta, romaji: rStem + r.ta };
        case 'past-negative': return { kanji: kStem + m.a + 'なかった', hiragana: hStem + m.a + 'なかった', romaji: rStem + r.a + 'nakatta' };
        case 'potential': return { kanji: kStem + m.e + 'る', hiragana: hStem + m.e + 'る', romaji: rStem + r.e + 'ru' };
        case 'passive': return { kanji: kStem + m.a + 'れる', hiragana: hStem + m.a + 'れる', romaji: rStem + r.a + 'reru' };
        case 'polite-imperative': {
            const teH = isIku ? 'いって' : hStem + m.te;
            const teK = isIku ? '行って' : kStem + m.te.slice(-1);
            const teR = isIku ? 'itte' : rStem + r.te;
            return { kanji: teK + 'ください', hiragana: teH + 'ください', romaji: teR + ' kudasai' };
        }
        case 'volitional': return { kanji: kStem + m.o + 'う', hiragana: hStem + m.o + 'う', romaji: rStem + r.o + 'u' };
        case 'imperative': return { kanji: kStem + m.i + 'なさい', hiragana: hStem + m.i + 'なさい', romaji: rStem + r.i + 'nasai' };
        case 'conditional': return { kanji: kStem + m.e + 'ば', hiragana: hStem + m.e + 'ば', romaji: rStem + r.e + 'ba' };
        case 'tai': return { kanji: kStem + m.i + 'たい', hiragana: hStem + m.i + 'たい', romaji: rStem + r.i + 'tai' };
        default: return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
    }
}

function conjugateIchidan(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    const reading = item.reading!;
    const hStem = reading.slice(0, -1);
    const rStem = item.primaryReading.slice(0, -2); // remove 'ru'
    const kStem = item.character.slice(0, -1);

    switch (form) {
        case 'dictionary': return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
        case 'masu': return { kanji: kStem + 'ます', hiragana: hStem + 'ます', romaji: rStem + 'masu' };
        case 'te': return { kanji: kStem + 'て', hiragana: hStem + 'て', romaji: rStem + 'te' };
        case 'negative': return { kanji: kStem + 'ない', hiragana: hStem + 'ない', romaji: rStem + 'nai' };
        case 'past': return { kanji: kStem + 'た', hiragana: hStem + 'た', romaji: rStem + 'ta' };
        case 'past-negative': return { kanji: kStem + 'なかった', hiragana: hStem + 'なかった', romaji: rStem + 'nakatta' };
        case 'potential': return { kanji: kStem + 'られる', hiragana: hStem + 'られる', romaji: rStem + 'rareru' };
        case 'passive': return { kanji: kStem + 'られる', hiragana: hStem + 'られる', romaji: rStem + 'rareru' };
        case 'polite-imperative': return { kanji: kStem + 'てください', hiragana: hStem + 'てください', romaji: rStem + 'te kudasai' };
        case 'volitional': return { kanji: kStem + 'よう', hiragana: hStem + 'よう', romaji: rStem + 'you' };
        case 'imperative': return { kanji: kStem + 'なさい', hiragana: hStem + 'なさい', romaji: rStem + 'nasai' };
        case 'conditional': return { kanji: kStem + 'れば', hiragana: hStem + 'れば', romaji: rStem + 'reba' };
        case 'tai': return { kanji: kStem + 'たい', hiragana: hStem + 'たい', romaji: rStem + 'tai' };
        default: return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
    }
}

function conjugateSuru(form: ConjugationForm): ConjugatedForm {
    switch (form) {
        case 'dictionary': return { kanji: 'する', hiragana: 'する', romaji: 'suru' };
        case 'masu': return { kanji: 'します', hiragana: 'します', romaji: 'shimasu' };
        case 'te': return { kanji: 'して', hiragana: 'して', romaji: 'shite' };
        case 'negative': return { kanji: 'しない', hiragana: 'しない', romaji: 'shinai' };
        case 'past': return { kanji: 'した', hiragana: 'した', romaji: 'shita' };
        case 'past-negative': return { kanji: 'しなかった', hiragana: 'しなかった', romaji: 'shinakatta' };
        case 'potential': return { kanji: 'できる', hiragana: 'できる', romaji: 'dekiru' };
        case 'passive': return { kanji: 'される', hiragana: 'される', romaji: 'sareru' };
        case 'polite-imperative': return { kanji: 'してください', hiragana: 'してください', romaji: 'shite kudasai' };
        case 'volitional': return { kanji: 'しよう', hiragana: 'しよう', romaji: 'shiyou' };
        case 'imperative': return { kanji: 'しなさい', hiragana: 'しなさい', romaji: 'shinasai' };
        case 'conditional': return { kanji: 'すれば', hiragana: 'すれば', romaji: 'sureba' };
        case 'tai': return { kanji: 'したい', hiragana: 'したい', romaji: 'shitai' };
        default: return { kanji: 'する', hiragana: 'する', romaji: 'suru' };
    }
}

function conjugateKuru(form: ConjugationForm): ConjugatedForm {
    switch (form) {
        case 'dictionary': return { kanji: '来る', hiragana: 'くる', romaji: 'kuru' };
        case 'masu': return { kanji: '来ます', hiragana: 'きます', romaji: 'kimasu' };
        case 'te': return { kanji: '来て', hiragana: 'きて', romaji: 'kite' };
        case 'negative': return { kanji: '来ない', hiragana: 'こない', romaji: 'konai' };
        case 'past': return { kanji: '来た', hiragana: 'きた', romaji: 'kita' };
        case 'past-negative': return { kanji: '来なかった', hiragana: 'こなかった', romaji: 'konakatta' };
        case 'potential': return { kanji: '来られる', hiragana: 'こられる', romaji: 'korareru' };
        case 'passive': return { kanji: '来られる', hiragana: 'こられる', romaji: 'korareru' };
        case 'polite-imperative': return { kanji: '来てください', hiragana: 'きてください', romaji: 'kite kudasai' };
        case 'volitional': return { kanji: '来よう', hiragana: 'こよう', romaji: 'koyou' };
        case 'imperative': return { kanji: '来なさい', hiragana: 'きなさい', romaji: 'kinasai' };
        case 'conditional': return { kanji: '来れば', hiragana: 'くれば', romaji: 'kureba' };
        case 'tai': return { kanji: '来たい', hiragana: 'きたい', romaji: 'kitai' };
        default: return { kanji: '来る', hiragana: 'くる', romaji: 'kuru' };
    }
}

export function conjugateVerb(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    if (item.verbCategory === 'irregular') {
        if (item.character === 'する' || item.primaryReading === 'suru') return conjugateSuru(form);
        if (item.character === '来る' || item.primaryReading === 'kuru') return conjugateKuru(form);
    }
    if (item.verbCategory === 'ichidan') return conjugateIchidan(item, form);
    return conjugateGodan(item, form); // godan default
}

// ============= ADJECTIVE CONJUGATION =============

function conjugateIAdj(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    const reading = item.reading!;
    const isIi = reading === 'いい';
    const hStem = isIi ? 'よ' : reading.slice(0, -1);
    const rStem = isIi ? 'yo' : item.primaryReading.slice(0, -1);
    const kStem = isIi ? '良' : item.character.slice(0, -1);

    switch (form) {
        case 'dictionary': return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
        case 'te': return { kanji: kStem + 'くて', hiragana: hStem + 'くて', romaji: rStem + 'kute' };
        case 'negative': return { kanji: kStem + 'くない', hiragana: hStem + 'くない', romaji: rStem + 'kunai' };
        case 'past': return { kanji: kStem + 'かった', hiragana: hStem + 'かった', romaji: rStem + 'katta' };
        case 'past-negative': return { kanji: kStem + 'くなかった', hiragana: hStem + 'くなかった', romaji: rStem + 'kunakatta' };
        case 'conditional': return { kanji: kStem + 'ければ', hiragana: hStem + 'ければ', romaji: rStem + 'kereba' };
        default: return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
    }
}

function conjugateNaAdj(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    const reading = item.reading!;
    switch (form) {
        case 'dictionary': return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
        case 'te': return { kanji: item.character + 'で', hiragana: reading + 'で', romaji: item.primaryReading + 'de' };
        case 'negative': return { kanji: item.character + 'じゃない', hiragana: reading + 'じゃない', romaji: item.primaryReading + 'janai' };
        case 'past': return { kanji: item.character + 'だった', hiragana: reading + 'だった', romaji: item.primaryReading + 'datta' };
        case 'past-negative': return { kanji: item.character + 'じゃなかった', hiragana: reading + 'じゃなかった', romaji: item.primaryReading + 'janakatta' };
        case 'conditional': return { kanji: item.character + 'なら', hiragana: reading + 'なら', romaji: item.primaryReading + 'nara' };
        default: return { kanji: item.character, hiragana: reading, romaji: item.primaryReading };
    }
}

export function conjugateAdjective(item: DrillItem, form: ConjugationForm): ConjugatedForm {
    if (item.category === 'i-adjective') return conjugateIAdj(item, form);
    return conjugateNaAdj(item, form);
}

// ============= FORM METADATA =============

export const VERB_FORMS: { form: ConjugationForm; label: string; description: string }[] = [
    { form: 'masu', label: 'Masu Form', description: 'Polite present/future' },
    { form: 'te', label: 'Te Form', description: 'Connecting form' },
    { form: 'negative', label: 'Negative', description: 'Plain negative' },
    { form: 'past', label: 'Past', description: 'Plain past' },
    { form: 'past-negative', label: 'Past Negative', description: 'Plain past negative' },
    { form: 'potential', label: 'Potential', description: 'Can do (~える / ~られる)' },
    { form: 'passive', label: 'Passive', description: 'Is done to (~される / ~られる)' },
    { form: 'polite-imperative', label: 'Polite Imperative', description: 'Please do ~ (〜てください)' },
    { form: 'volitional', label: 'Volitional', description: "Let's / shall" },
    { form: 'imperative', label: 'Imperative (なさい)', description: 'Polite command (~なさい)' },
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

const ADJ_ONLY_FORMS = new Set(['masu', 'potential', 'volitional', 'imperative', 'tai']);

// ============= DRILL GENERATOR =============

export function generateConjugationDrillItems(
    vocabData: Record<string, DrillItem[]>,
    wordType: 'verb' | 'adjective',
    verbTypes: ('godan' | 'ichidan' | 'irregular' | 'all')[],
    adjectiveTypes: ('i-adjective' | 'na-adjective' | 'all')[],
    forms: ConjugationForm[],
    count: number
): ConjugationDrillItem[] {
    const allItems = Object.values(vocabData).flat();

    // Filter eligible items
    let pool: DrillItem[] = [];
    if (wordType === 'verb') {
        pool = allItems.filter(item => {
            if (item.category !== 'verb' || !item.verbCategory || !item.reading) return false;
            return verbTypes.includes('all') || verbTypes.includes(item.verbCategory as any);
        });
    } else {
        pool = allItems.filter(item => {
            if ((item.category !== 'i-adjective' && item.category !== 'na-adjective') || !item.reading) return false;
            return adjectiveTypes.includes('all') || adjectiveTypes.includes(item.category as any);
        });
    }

    // Deduplicate by character
    const seen = new Set<string>();
    pool = pool.filter(item => {
        if (seen.has(item.character)) return false;
        seen.add(item.character);
        return true;
    });

    const items: ConjugationDrillItem[] = [];
    const formLabels = wordType === 'verb' ? VERB_FORMS : ADJECTIVE_FORMS;
    const usedCombos = new Set<string>();
    let attempts = 0;

    while (items.length < count && pool.length > 0 && forms.length > 0 && attempts < count * 20) {
        attempts++;
        const item = pool[Math.floor(Math.random() * pool.length)];
        const form = forms[Math.floor(Math.random() * forms.length)];

        if (wordType === 'adjective' && ADJ_ONLY_FORMS.has(form)) continue;

        const comboKey = `${item.character}-${form}`;
        if (usedCombos.has(comboKey)) continue;
        usedCombos.add(comboKey);

        const answer = wordType === 'verb'
            ? conjugateVerb(item, form)
            : conjugateAdjective(item, form);

        items.push({
            id: `conj-${Date.now()}-${items.length}`,
            item,
            targetForm: form,
            question: {
                kanji: item.character,
                hiragana: item.reading!,
                romaji: item.primaryReading,
                meaning: item.meaning,
            },
            answer,
            formLabel: formLabels.find(f => f.form === form)?.label || form,
        });
    }

    return items.sort(() => Math.random() - 0.5);
}
