// Japanese Number Data for NihongoFlow
// Comprehensive data for numbers 0-10, counters, and utilities for generating any number up to 1 million

export interface NumberItem {
    value: number;
    kanji: string;
    hiragana: string;
    romaji: string;
}

// Base numbers 0-10
export const BASE_NUMBERS: NumberItem[] = [
    { value: 0, kanji: '零', hiragana: 'ゼロ', romaji: 'zero' },
    { value: 1, kanji: '一', hiragana: 'いち', romaji: 'ichi' },
    { value: 2, kanji: '二', hiragana: 'に', romaji: 'ni' },
    { value: 3, kanji: '三', hiragana: 'さん', romaji: 'san' },
    { value: 4, kanji: '四', hiragana: 'よん', romaji: 'yon' },
    { value: 5, kanji: '五', hiragana: 'ご', romaji: 'go' },
    { value: 6, kanji: '六', hiragana: 'ろく', romaji: 'roku' },
    { value: 7, kanji: '七', hiragana: 'なな', romaji: 'nana' },
    { value: 8, kanji: '八', hiragana: 'はち', romaji: 'hachi' },
    { value: 9, kanji: '九', hiragana: 'きゅう', romaji: 'kyuu' },
    { value: 10, kanji: '十', hiragana: 'じゅう', romaji: 'juu' },
];

// Counter units
export const COUNTERS = {
    hundred: { kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku' },
    thousand: { kanji: '千', hiragana: 'せん', romaji: 'sen' },
    tenThousand: { kanji: '万', hiragana: 'まん', romaji: 'man' },
};

// Special readings for certain number combinations
const SPECIAL_HUNDREDS: Record<number, { hiragana: string; romaji: string }> = {
    3: { hiragana: 'さんびゃく', romaji: 'sanbyaku' },
    6: { hiragana: 'ろっぴゃく', romaji: 'roppyaku' },
    8: { hiragana: 'はっぴゃく', romaji: 'happyaku' },
};

const SPECIAL_THOUSANDS: Record<number, { hiragana: string; romaji: string }> = {
    3: { hiragana: 'さんぜん', romaji: 'sanzen' },
    8: { hiragana: 'はっせん', romaji: 'hassen' },
};

// Convert a number (0-999,999) to Japanese reading
export function numberToJapanese(num: number): { kanji: string; hiragana: string; romaji: string } {
    if (num === 0) return { kanji: '零', hiragana: 'ゼロ', romaji: 'zero' };
    if (num < 0 || num > 999999) throw new Error('Number out of range (0-999999)');

    let kanji = '';
    let hiragana = '';
    let romaji = '';

    // Ten thousands (万)
    const manDigit = Math.floor(num / 10000);
    if (manDigit > 0) {
        if (manDigit === 1) {
            kanji += '一万';
            hiragana += 'いちまん';
            romaji += 'ichiman';
        } else {
            const manResult = numberToJapanese(manDigit);
            kanji += manResult.kanji + '万';
            hiragana += manResult.hiragana + 'まん';
            romaji += manResult.romaji + 'man';
        }
    }
    num %= 10000;

    // Thousands (千)
    const senDigit = Math.floor(num / 1000);
    if (senDigit > 0) {
        if (senDigit === 1) {
            kanji += '千';
            hiragana += 'せん';
            romaji += 'sen';
        } else if (SPECIAL_THOUSANDS[senDigit]) {
            kanji += BASE_NUMBERS[senDigit].kanji + '千';
            hiragana += SPECIAL_THOUSANDS[senDigit].hiragana;
            romaji += SPECIAL_THOUSANDS[senDigit].romaji;
        } else {
            kanji += BASE_NUMBERS[senDigit].kanji + '千';
            hiragana += BASE_NUMBERS[senDigit].hiragana + 'せん';
            romaji += BASE_NUMBERS[senDigit].romaji + 'sen';
        }
    }
    num %= 1000;

    // Hundreds (百)
    const hyakuDigit = Math.floor(num / 100);
    if (hyakuDigit > 0) {
        if (hyakuDigit === 1) {
            kanji += '百';
            hiragana += 'ひゃく';
            romaji += 'hyaku';
        } else if (SPECIAL_HUNDREDS[hyakuDigit]) {
            kanji += BASE_NUMBERS[hyakuDigit].kanji + '百';
            hiragana += SPECIAL_HUNDREDS[hyakuDigit].hiragana;
            romaji += SPECIAL_HUNDREDS[hyakuDigit].romaji;
        } else {
            kanji += BASE_NUMBERS[hyakuDigit].kanji + '百';
            hiragana += BASE_NUMBERS[hyakuDigit].hiragana + 'ひゃく';
            romaji += BASE_NUMBERS[hyakuDigit].romaji + 'hyaku';
        }
    }
    num %= 100;

    // Tens (十)
    const juuDigit = Math.floor(num / 10);
    if (juuDigit > 0) {
        if (juuDigit === 1) {
            kanji += '十';
            hiragana += 'じゅう';
            romaji += 'juu';
        } else {
            kanji += BASE_NUMBERS[juuDigit].kanji + '十';
            hiragana += BASE_NUMBERS[juuDigit].hiragana + 'じゅう';
            romaji += BASE_NUMBERS[juuDigit].romaji + 'juu';
        }
    }
    num %= 10;

    // Ones
    if (num > 0) {
        kanji += BASE_NUMBERS[num].kanji;
        hiragana += BASE_NUMBERS[num].hiragana;
        romaji += BASE_NUMBERS[num].romaji;
    }

    return { kanji, hiragana, romaji };
}

// Generate drill items for a given range
export interface NumberDrillItem {
    id: string;
    value: number;
    kanji: string;
    hiragana: string;
    romaji: string;
}

export function generateNumberDrillItems(min: number, max: number, count: number = 20): NumberDrillItem[] {
    const items: NumberDrillItem[] = [];
    const usedNumbers = new Set<number>();

    // Limit count to available numbers in range
    const availableCount = max - min + 1;
    count = Math.min(count, availableCount);

    while (items.length < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (usedNumbers.has(num)) continue;
        usedNumbers.add(num);

        const japanese = numberToJapanese(num);
        items.push({
            id: `num-${num}`,
            value: num,
            ...japanese,
        });
    }

    return items.sort(() => Math.random() - 0.5);
}

// Number range presets
export const NUMBER_RANGE_PRESETS = [
    { label: '1-10', min: 1, max: 10 },
    { label: '1-100', min: 1, max: 100 },
    { label: '1-1,000', min: 1, max: 1000 },
    { label: '1-10,000', min: 1, max: 10000 },
    { label: '1-100,000', min: 1, max: 100000 },
    { label: '1-1,000,000', min: 1, max: 999999 },
];
