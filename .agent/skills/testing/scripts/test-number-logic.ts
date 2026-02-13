/**
 * NihongoFlow — Number Conversion Logic Tests
 * Tests numberToJapanese() for correctness across the full 0-999,999 range.
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
import { numberToJapanese, generateNumberDrillItems, BASE_NUMBERS, NUMBER_RANGE_PRESETS } from '../../../../numberData';

// ═══════════════════════════════════════════════════════════════════════
console.log('\n🧪 NUMBER CONVERSION LOGIC TESTS\n');

// ─── Base Numbers (0-10) ───────────────────────────────────────────────
console.log('📝 Base Numbers');

test('Zero converts correctly', () => {
    const r = numberToJapanese(0);
    assertEqual(r.kanji, '零', 'kanji');
    assertEqual(r.romaji, 'zero', 'romaji');
});

test('Numbers 1-10 match BASE_NUMBERS data', () => {
    for (let i = 1; i <= 10; i++) {
        const r = numberToJapanese(i);
        const expected = BASE_NUMBERS[i];
        assertEqual(r.kanji, expected.kanji, `kanji for ${i}`);
        assertEqual(r.hiragana, expected.hiragana, `hiragana for ${i}`);
        assertEqual(r.romaji, expected.romaji, `romaji for ${i}`);
    }
});

// ─── Tens ──────────────────────────────────────────────────────────────
console.log('\n📝 Tens');

test('11 = じゅういち', () => {
    const r = numberToJapanese(11);
    assertEqual(r.romaji, 'juuichi', 'romaji');
});

test('20 = にじゅう', () => {
    const r = numberToJapanese(20);
    assertEqual(r.romaji, 'nijuu', 'romaji');
    assertEqual(r.kanji, '二十', 'kanji');
});

test('99 = きゅうじゅうきゅう', () => {
    const r = numberToJapanese(99);
    assertEqual(r.romaji, 'kyuujuukyuu', 'romaji');
});

// ─── Hundreds — Special Readings ───────────────────────────────────────
console.log('\n📝 Hundreds (Special Readings)');

test('100 = ひゃく', () => {
    const r = numberToJapanese(100);
    assertEqual(r.romaji, 'hyaku', 'romaji');
});

test('300 = さんびゃく (special)', () => {
    const r = numberToJapanese(300);
    assertEqual(r.romaji, 'sanbyaku', 'romaji');
    assertEqual(r.hiragana, 'さんびゃく', 'hiragana');
});

test('600 = ろっぴゃく (special)', () => {
    const r = numberToJapanese(600);
    assertEqual(r.romaji, 'roppyaku', 'romaji');
    assertEqual(r.hiragana, 'ろっぴゃく', 'hiragana');
});

test('800 = はっぴゃく (special)', () => {
    const r = numberToJapanese(800);
    assertEqual(r.romaji, 'happyaku', 'romaji');
    assertEqual(r.hiragana, 'はっぴゃく', 'hiragana');
});

test('500 = ごひゃく (regular)', () => {
    const r = numberToJapanese(500);
    assertEqual(r.romaji, 'gohyaku', 'romaji');
});

// ─── Thousands — Special Readings ──────────────────────────────────────
console.log('\n📝 Thousands (Special Readings)');

test('1000 = せん', () => {
    const r = numberToJapanese(1000);
    assertEqual(r.romaji, 'sen', 'romaji');
});

test('3000 = さんぜん (special)', () => {
    const r = numberToJapanese(3000);
    assertEqual(r.romaji, 'sanzen', 'romaji');
    assertEqual(r.hiragana, 'さんぜん', 'hiragana');
});

test('8000 = はっせん (special)', () => {
    const r = numberToJapanese(8000);
    assertEqual(r.romaji, 'hassen', 'romaji');
    assertEqual(r.hiragana, 'はっせん', 'hiragana');
});

test('5000 = ごせん (regular)', () => {
    const r = numberToJapanese(5000);
    assertEqual(r.romaji, 'gosen', 'romaji');
});

// ─── Ten Thousands (万) ─────────────────────────────────────────────────
console.log('\n📝 Ten Thousands (万)');

test('10000 = いちまん', () => {
    const r = numberToJapanese(10000);
    assertEqual(r.romaji, 'ichiman', 'romaji');
    assertEqual(r.kanji, '一万', 'kanji');
});

test('50000 = ごまん', () => {
    const r = numberToJapanese(50000);
    assertEqual(r.romaji, 'goman', 'romaji');
});

test('999999 (max value) does not throw', () => {
    const r = numberToJapanese(999999);
    assert(!!r.kanji, 'should produce kanji');
    assert(!!r.romaji, 'should produce romaji');
});

// ─── Complex Numbers ───────────────────────────────────────────────────
console.log('\n📝 Complex Compound Numbers');

test('12345 breaks down correctly', () => {
    const r = numberToJapanese(12345);
    // 一万二千三百四十五
    assert(r.kanji.includes('万'), 'should contain 万');
    assert(r.kanji.includes('千'), 'should contain 千');
    assert(r.kanji.includes('百'), 'should contain 百');
    assert(r.kanji.includes('十'), 'should contain 十');
});

test('10001 = いちまんいち', () => {
    const r = numberToJapanese(10001);
    assertEqual(r.romaji, 'ichimanichi', 'romaji');
});

test('300600 uses both special readings', () => {
    const r = numberToJapanese(300600);
    // さんじゅうまんろっぴゃく  — 30万 + 600
    assert(r.hiragana.includes('ろっぴゃく'), '600 part should use roppyaku');
});

// ─── Edge Cases ────────────────────────────────────────────────────────
console.log('\n📝 Edge Cases');

test('Negative number throws error', () => {
    let threw = false;
    try { numberToJapanese(-1); } catch { threw = true; }
    assert(threw, 'Should throw for negative numbers');
});

test('Number > 999999 throws error', () => {
    let threw = false;
    try { numberToJapanese(1000000); } catch { threw = true; }
    assert(threw, 'Should throw for numbers > 999999');
});

// ─── Drill Item Generation ─────────────────────────────────────────────
console.log('\n📝 Drill Item Generation');

test('generateNumberDrillItems returns requested count', () => {
    const items = generateNumberDrillItems(1, 100, 10);
    assertEqual(items.length, 10, 'count');
});

test('generateNumberDrillItems returns no duplicates', () => {
    const items = generateNumberDrillItems(1, 1000, 50);
    const values = items.map(i => i.value);
    const unique = new Set(values);
    assertEqual(unique.size, values.length, 'unique count');
});

test('generateNumberDrillItems respects range', () => {
    const items = generateNumberDrillItems(50, 100, 20);
    for (const item of items) {
        assert(item.value >= 50, `Value ${item.value} below min 50`);
        assert(item.value <= 100, `Value ${item.value} above max 100`);
    }
});

test('generateNumberDrillItems caps at available range', () => {
    const items = generateNumberDrillItems(1, 5, 100);
    assertEqual(items.length, 5, 'should cap at 5 available numbers');
});

test('NUMBER_RANGE_PRESETS are well-formed', () => {
    for (const preset of NUMBER_RANGE_PRESETS) {
        assert(!!preset.label, 'preset missing label');
        assert(preset.min >= 1, `preset min ${preset.min} < 1`);
        assert(preset.max >= preset.min, `preset max ${preset.max} < min ${preset.min}`);
        assert(preset.max <= 999999, `preset max ${preset.max} > 999999`);
    }
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
