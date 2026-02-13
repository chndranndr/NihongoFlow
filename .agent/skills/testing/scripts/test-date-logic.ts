/**
 * NihongoFlow — Date/Time Logic Tests
 * Tests date generation, yearToJapanese(), day counters, and drill item creation.
 */

// ─── Minimal Test Runner ───────────────────────────────────────────────
let passed = 0, failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
    try { fn(); passed++; console.log(`  ✅ ${name}`); }
    catch (e: any) { failed++; failures.push(`${name}: ${e.message}`); console.log(`  ❌ ${name} — ${e.message}`); }
}

function assert(condition: boolean, msg: string) { if (!condition) throw new Error(msg); }
function assertEqual(actual: any, expected: any, label: string) {
    assert(actual === expected, `${label}: expected "${expected}", got "${actual}"`);
}

// ─── Imports ───────────────────────────────────────────────────────────
import {
    DAYS_OF_WEEK, DAY_COUNTERS, MONTHS,
    yearToJapanese, generateRandomDate, createFullDateItem,
    generateDateDrillItems, generateDayOfWeekDrillItems
} from '../../../../dateTimeData';

// ═══════════════════════════════════════════════════════════════════════
console.log('\n🧪 DATE/TIME LOGIC TESTS\n');

// ─── Days of Week ──────────────────────────────────────────────────────
console.log('📝 Days of Week');

test('DAYS_OF_WEEK has exactly 7 entries', () => {
    assertEqual(DAYS_OF_WEEK.length, 7, 'count');
});

test('All days have required fields', () => {
    for (const day of DAYS_OF_WEEK) {
        assert(!!day.kanji, `Day missing kanji`);
        assert(!!day.hiragana, `Day "${day.kanji}" missing hiragana`);
        assert(!!day.romaji, `Day "${day.kanji}" missing romaji`);
        assert(!!day.english, `Day "${day.kanji}" missing english`);
    }
});

test('Sunday is にちようび', () => {
    const sun = DAYS_OF_WEEK.find(d => d.english === 'Sunday');
    assert(!!sun, 'Sunday not found');
    assertEqual(sun!.romaji, 'nichiyoubi', 'romaji');
});

test('All days end with ようび', () => {
    for (const day of DAYS_OF_WEEK) {
        assert(day.kanji.endsWith('曜日'), `"${day.kanji}" doesn't end with 曜日`);
    }
});

// ─── Day Counters ──────────────────────────────────────────────────────
console.log('\n📝 Day Counters (1-31)');

test('DAY_COUNTERS has exactly 31 entries', () => {
    assertEqual(DAY_COUNTERS.length, 31, 'count');
});

test('Day 1 = ついたち (special reading)', () => {
    const d1 = DAY_COUNTERS.find(d => d.value === 1);
    assert(!!d1, 'Day 1 not found');
    assertEqual(d1!.romaji, 'tsuitachi', 'romaji');
});

test('Day 2 = ふつか (special reading)', () => {
    const d2 = DAY_COUNTERS.find(d => d.value === 2);
    assert(!!d2, 'Day 2 not found');
    assertEqual(d2!.romaji, 'futsuka', 'romaji');
});

test('Day 8 = ようか (special reading)', () => {
    const d8 = DAY_COUNTERS.find(d => d.value === 8);
    assert(!!d8, 'Day 8 not found');
    assertEqual(d8!.romaji, 'youka', 'romaji');
});

test('Day 14 = じゅうよっか (special reading)', () => {
    const d14 = DAY_COUNTERS.find(d => d.value === 14);
    assert(!!d14, 'Day 14 not found');
    assertEqual(d14!.romaji, 'juuyokka', 'romaji');
});

test('Day 20 = はつか (special reading)', () => {
    const d20 = DAY_COUNTERS.find(d => d.value === 20);
    assert(!!d20, 'Day 20 not found');
    assertEqual(d20!.romaji, 'hatsuka', 'romaji');
});

test('All day counters have sequential values 1-31', () => {
    for (let i = 1; i <= 31; i++) {
        const day = DAY_COUNTERS.find(d => d.value === i);
        assert(!!day, `Day ${i} missing from DAY_COUNTERS`);
    }
});

// ─── Months ────────────────────────────────────────────────────────────
console.log('\n📝 Months');

test('MONTHS has exactly 12 entries', () => {
    assertEqual(MONTHS.length, 12, 'count');
});

test('All months end with がつ', () => {
    for (const m of MONTHS) {
        assert(m.romaji.endsWith('gatsu'), `"${m.english}" romaji "${m.romaji}" doesn't end with gatsu`);
    }
});

test('January = いちがつ', () => {
    const jan = MONTHS.find(m => m.value === 1);
    assert(!!jan, 'January not found');
    assertEqual(jan!.romaji, 'ichigatsu', 'romaji');
});

// ─── Year Conversion ───────────────────────────────────────────────────
console.log('\n📝 Year Conversion');

test('Year 2024 converts correctly', () => {
    const r = yearToJapanese(2024);
    assert(!!r.kanji, 'should produce kanji');
    assert(!!r.romaji, 'should produce romaji');
    assert(r.kanji.includes('年'), 'should contain 年');
});

test('Year 1993 converts correctly', () => {
    const r = yearToJapanese(1993);
    assert(r.kanji.includes('年'), 'should contain 年');
});

test('Year 2000 converts correctly', () => {
    const r = yearToJapanese(2000);
    assert(r.kanji.includes('年'), 'should contain 年');
    // yearToJapanese reads digits individually: 二零零零年
    assert(r.kanji.startsWith('二'), 'should start with 二');
});

// ─── Date Item Generation ──────────────────────────────────────────────
console.log('\n📝 Date Item Generation');

test('generateRandomDate returns a Date object within range', () => {
    const date = generateRandomDate(2000, 2024);
    assert(date instanceof Date, 'should be a Date');
    assert(date.getFullYear() >= 2000, `year ${date.getFullYear()} < 2000`);
    assert(date.getFullYear() <= 2024, `year ${date.getFullYear()} > 2024`);
});

test('createFullDateItem returns complete item', () => {
    const item = createFullDateItem(new Date(2024, 0, 15));
    assert(!!item.id, 'missing id');
    assert(!!item.japaneseDisplay, 'missing japaneseDisplay');
    assert(!!item.englishDisplay, 'missing englishDisplay');
    assert(!!item.romajiAnswer, 'missing romajiAnswer');
});

test('generateDateDrillItems returns requested count', () => {
    const items = generateDateDrillItems(2000, 2024, 5);
    assertEqual(items.length, 5, 'count');
});

test('generateDayOfWeekDrillItems returns 7 items', () => {
    const items = generateDayOfWeekDrillItems();
    assertEqual(items.length, 7, 'count');
});

// ─── Summary ───────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(50)}`);
console.log(`📊 Results: ${passed} passed, ${failed} failed`);
if (failures.length > 0) {
    console.log('\n❌ Failures:');
    failures.forEach(f => console.log(`   • ${f}`));
}
console.log('');
process.exit(failed > 0 ? 1 : 0);
