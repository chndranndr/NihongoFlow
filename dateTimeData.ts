// Japanese Date and Time Data for NihongoFlow
// Days of week, months, day counters with kanji, furigana, and romaji

export interface DateItem {
    value: number | string;
    kanji: string;
    hiragana: string;
    romaji: string;
    english: string;
}

// Days of the week (0 = Sunday, 1 = Monday, etc.)
export const DAYS_OF_WEEK: DateItem[] = [
    { value: 0, kanji: '日曜日', hiragana: 'にちようび', romaji: 'nichiyoubi', english: 'Sunday' },
    { value: 1, kanji: '月曜日', hiragana: 'げつようび', romaji: 'getsuyoubi', english: 'Monday' },
    { value: 2, kanji: '火曜日', hiragana: 'かようび', romaji: 'kayoubi', english: 'Tuesday' },
    { value: 3, kanji: '水曜日', hiragana: 'すいようび', romaji: 'suiyoubi', english: 'Wednesday' },
    { value: 4, kanji: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', english: 'Thursday' },
    { value: 5, kanji: '金曜日', hiragana: 'きんようび', romaji: 'kinyoubi', english: 'Friday' },
    { value: 6, kanji: '土曜日', hiragana: 'どようび', romaji: 'doyoubi', english: 'Saturday' },
];

// Day counters (1-31) with special readings
export const DAY_COUNTERS: DateItem[] = [
    { value: 1, kanji: '一日', hiragana: 'ついたち', romaji: 'tsuitachi', english: '1st' },
    { value: 2, kanji: '二日', hiragana: 'ふつか', romaji: 'futsuka', english: '2nd' },
    { value: 3, kanji: '三日', hiragana: 'みっか', romaji: 'mikka', english: '3rd' },
    { value: 4, kanji: '四日', hiragana: 'よっか', romaji: 'yokka', english: '4th' },
    { value: 5, kanji: '五日', hiragana: 'いつか', romaji: 'itsuka', english: '5th' },
    { value: 6, kanji: '六日', hiragana: 'むいか', romaji: 'muika', english: '6th' },
    { value: 7, kanji: '七日', hiragana: 'なのか', romaji: 'nanoka', english: '7th' },
    { value: 8, kanji: '八日', hiragana: 'ようか', romaji: 'youka', english: '8th' },
    { value: 9, kanji: '九日', hiragana: 'ここのか', romaji: 'kokonoka', english: '9th' },
    { value: 10, kanji: '十日', hiragana: 'とおか', romaji: 'tooka', english: '10th' },
    { value: 11, kanji: '十一日', hiragana: 'じゅういちにち', romaji: 'juuichinichi', english: '11th' },
    { value: 12, kanji: '十二日', hiragana: 'じゅうににち', romaji: 'juuninichi', english: '12th' },
    { value: 13, kanji: '十三日', hiragana: 'じゅうさんにち', romaji: 'juusannichi', english: '13th' },
    { value: 14, kanji: '十四日', hiragana: 'じゅうよっか', romaji: 'juuyokka', english: '14th' },
    { value: 15, kanji: '十五日', hiragana: 'じゅうごにち', romaji: 'juugonichi', english: '15th' },
    { value: 16, kanji: '十六日', hiragana: 'じゅうろくにち', romaji: 'juurokunichi', english: '16th' },
    { value: 17, kanji: '十七日', hiragana: 'じゅうしちにち', romaji: 'juushichinichi', english: '17th' },
    { value: 18, kanji: '十八日', hiragana: 'じゅうはちにち', romaji: 'juuhachinichi', english: '18th' },
    { value: 19, kanji: '十九日', hiragana: 'じゅうくにち', romaji: 'juukunichi', english: '19th' },
    { value: 20, kanji: '二十日', hiragana: 'はつか', romaji: 'hatsuka', english: '20th' },
    { value: 21, kanji: '二十一日', hiragana: 'にじゅういちにち', romaji: 'nijuuichinichi', english: '21st' },
    { value: 22, kanji: '二十二日', hiragana: 'にじゅうににち', romaji: 'nijuuninichi', english: '22nd' },
    { value: 23, kanji: '二十三日', hiragana: 'にじゅうさんにち', romaji: 'nijuusannichi', english: '23rd' },
    { value: 24, kanji: '二十四日', hiragana: 'にじゅうよっか', romaji: 'nijuuyokka', english: '24th' },
    { value: 25, kanji: '二十五日', hiragana: 'にじゅうごにち', romaji: 'nijuugonichi', english: '25th' },
    { value: 26, kanji: '二十六日', hiragana: 'にじゅうろくにち', romaji: 'nijuurokunichi', english: '26th' },
    { value: 27, kanji: '二十七日', hiragana: 'にじゅうしちにち', romaji: 'nijuushichinichi', english: '27th' },
    { value: 28, kanji: '二十八日', hiragana: 'にじゅうはちにち', romaji: 'nijuuhachinichi', english: '28th' },
    { value: 29, kanji: '二十九日', hiragana: 'にじゅうくにち', romaji: 'nijuukunichi', english: '29th' },
    { value: 30, kanji: '三十日', hiragana: 'さんじゅうにち', romaji: 'sanjuunichi', english: '30th' },
    { value: 31, kanji: '三十一日', hiragana: 'さんじゅういちにち', romaji: 'sanjuuichinichi', english: '31st' },
];

// Months (1-12)
export const MONTHS: DateItem[] = [
    { value: 1, kanji: '一月', hiragana: 'いちがつ', romaji: 'ichigatsu', english: 'January' },
    { value: 2, kanji: '二月', hiragana: 'にがつ', romaji: 'nigatsu', english: 'February' },
    { value: 3, kanji: '三月', hiragana: 'さんがつ', romaji: 'sangatsu', english: 'March' },
    { value: 4, kanji: '四月', hiragana: 'しがつ', romaji: 'shigatsu', english: 'April' },
    { value: 5, kanji: '五月', hiragana: 'ごがつ', romaji: 'gogatsu', english: 'May' },
    { value: 6, kanji: '六月', hiragana: 'ろくがつ', romaji: 'rokugatsu', english: 'June' },
    { value: 7, kanji: '七月', hiragana: 'しちがつ', romaji: 'shichigatsu', english: 'July' },
    { value: 8, kanji: '八月', hiragana: 'はちがつ', romaji: 'hachigatsu', english: 'August' },
    { value: 9, kanji: '九月', hiragana: 'くがつ', romaji: 'kugatsu', english: 'September' },
    { value: 10, kanji: '十月', hiragana: 'じゅうがつ', romaji: 'juugatsu', english: 'October' },
    { value: 11, kanji: '十一月', hiragana: 'じゅういちがつ', romaji: 'juuichigatsu', english: 'November' },
    { value: 12, kanji: '十二月', hiragana: 'じゅうにがつ', romaji: 'juunigatsu', english: 'December' },
];

// Year reading helper
export function yearToJapanese(year: number): { kanji: string; hiragana: string; romaji: string } {
    const digits = year.toString().split('').map(Number);
    let kanji = '';
    let hiragana = '';
    let romaji = '';

    const digitKanji = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const digitHiragana = ['ぜろ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    const digitRomaji = ['zero', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu'];

    for (const d of digits) {
        kanji += digitKanji[d];
        hiragana += digitHiragana[d];
        romaji += digitRomaji[d];
    }

    kanji += '年';
    hiragana += 'ねん';
    romaji += 'nen';

    return { kanji, hiragana, romaji };
}

// Full date item for drill
export interface FullDateItem {
    id: string;
    date: Date;
    japaneseDisplay: string; // e.g., "水曜日、十二月一日 1993年"
    hiraganaDisplay: string; // e.g., "すいようび、じゅうにがついちにち 1993ねん"
    romajiAnswer: string; // Combined romaji for answer
    englishDisplay: string; // e.g., "Wednesday, December 1st 1993"
}

// Generate a random date within a year range
export function generateRandomDate(startYear: number, endYear: number): Date {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime);
}

// Create a full date item from a Date object
export function createFullDateItem(date: Date): FullDateItem {
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
    const month = MONTHS[date.getMonth()];
    const dayCounter = DAY_COUNTERS[date.getDate() - 1];
    const year = date.getFullYear();
    const yearJp = yearToJapanese(year);

    const japaneseDisplay = `${dayOfWeek.kanji}、${month.kanji}${dayCounter.kanji} ${yearJp.kanji}`;
    const hiraganaDisplay = `${dayOfWeek.hiragana}、${month.hiragana}${dayCounter.hiragana} ${yearJp.hiragana}`;
    const romajiAnswer = `${dayOfWeek.romaji} ${month.romaji} ${dayCounter.romaji} ${yearJp.romaji}`;
    const englishDisplay = `${dayOfWeek.english}, ${month.english} ${dayCounter.english} ${year}`;

    return {
        id: `date-${date.getTime()}`,
        date,
        japaneseDisplay,
        hiraganaDisplay,
        romajiAnswer,
        englishDisplay,
    };
}

// Generate date drill items
export function generateDateDrillItems(startYear: number, endYear: number, count: number = 10): FullDateItem[] {
    const items: FullDateItem[] = [];
    const usedDates = new Set<string>();

    while (items.length < count) {
        const date = generateRandomDate(startYear, endYear);
        const dateKey = date.toDateString();
        if (usedDates.has(dateKey)) continue;
        usedDates.add(dateKey);
        items.push(createFullDateItem(date));
    }

    return items.sort(() => Math.random() - 0.5);
}

// Generate day of week drill items
export function generateDayOfWeekDrillItems(): DateItem[] {
    return [...DAYS_OF_WEEK].sort(() => Math.random() - 0.5);
}
