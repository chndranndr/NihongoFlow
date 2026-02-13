/**
 * NihongoFlow — Data Integrity Tests
 * Validates that all data files are well-formed and complete.
 */

// ─── Minimal Test Runner ───────────────────────────────────────────────
let passed = 0, failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
    try { fn(); passed++; console.log(`  ✅ ${name}`); }
    catch (e: any) { failed++; failures.push(`${name}: ${e.message}`); console.log(`  ❌ ${name} — ${e.message}`); }
}

function assert(condition: boolean, msg: string) { if (!condition) throw new Error(msg); }

// ─── Imports ───────────────────────────────────────────────────────────
import { KANA_DATA } from '../../../../kanaData';
import { KANJI_DATA } from '../../../../kanjiData';
import { VOCAB_DATA } from '../../../../vocabData';
import { GRAMMAR_LIBRARY } from '../../../../grammarData';

// ═══════════════════════════════════════════════════════════════════════
console.log('\n🧪 DATA INTEGRITY TESTS\n');

// ─── Kana Data ─────────────────────────────────────────────────────────
console.log('📝 Kana Data');

const HIRAGANA_LIST = KANA_DATA.HIRAGANA;
const KATAKANA_LIST = KANA_DATA.KATAKANA;

test('Hiragana list is a non-empty array', () => {
    assert(Array.isArray(HIRAGANA_LIST), 'HIRAGANA is not an array');
    assert(HIRAGANA_LIST.length > 0, 'HIRAGANA is empty');
});

test('Katakana list is a non-empty array', () => {
    assert(Array.isArray(KATAKANA_LIST), 'KATAKANA is not an array');
    assert(KATAKANA_LIST.length > 0, 'KATAKANA is empty');
});

test('All hiragana items have required fields', () => {
    for (const item of HIRAGANA_LIST) {
        assert(!!item.character, `Hiragana item missing character`);
        assert(!!item.primaryReading, `Hiragana "${item.character}" missing primaryReading`);
        assert(item.meaning !== undefined, `Hiragana "${item.character}" missing meaning field`);
    }
});

test('All katakana items have required fields', () => {
    for (const item of KATAKANA_LIST) {
        assert(!!item.character, `Katakana item missing character`);
        assert(!!item.primaryReading, `Katakana "${item.character}" missing primaryReading`);
    }
});

test('No duplicate hiragana characters', () => {
    const chars = HIRAGANA_LIST.map((i: any) => i.character);
    const dupes = chars.filter((c: string, idx: number) => chars.indexOf(c) !== idx);
    assert(dupes.length === 0, `Duplicate hiragana: ${dupes.join(', ')}`);
});

test('No duplicate katakana characters', () => {
    const chars = KATAKANA_LIST.map((i: any) => i.character);
    const dupes = chars.filter((c: string, idx: number) => chars.indexOf(c) !== idx);
    assert(dupes.length === 0, `Duplicate katakana: ${dupes.join(', ')}`);
});

// ─── Kanji Data ────────────────────────────────────────────────────────
console.log('\n📝 Kanji Data');

test('KANJI_DATA has at least one difficulty level', () => {
    const levels = Object.keys(KANJI_DATA);
    assert(levels.length > 0, 'KANJI_DATA has no levels');
});

test('Each kanji level has at least one category', () => {
    for (const [level, categories] of Object.entries(KANJI_DATA)) {
        const catKeys = Object.keys(categories as Record<string, any>);
        assert(catKeys.length > 0, `Level "${level}" has no categories`);
    }
});

test('All kanji items have required fields', () => {
    for (const [level, categories] of Object.entries(KANJI_DATA)) {
        for (const [catName, items] of Object.entries(categories as Record<string, any[]>)) {
            for (const item of items) {
                assert(!!item.character, `Kanji in ${level}/${catName} missing character`);
                assert(!!item.primaryReading, `Kanji "${item.character}" in ${level}/${catName} missing primaryReading`);
                assert(!!item.meaning, `Kanji "${item.character}" in ${level}/${catName} missing meaning`);
            }
        }
    }
});

test('No duplicate kanji across all levels', () => {
    const allKanji: string[] = [];
    for (const categories of Object.values(KANJI_DATA)) {
        for (const items of Object.values(categories as Record<string, any[]>)) {
            for (const item of items) allKanji.push(item.character);
        }
    }
    const dupes = allKanji.filter((c: string, idx: number) => allKanji.indexOf(c) !== idx);
    assert(dupes.length === 0, `Duplicate kanji: ${[...new Set(dupes)].join(', ')}`);
});

// ─── Vocab Data ────────────────────────────────────────────────────────
console.log('\n📝 Vocab Data');

test('VOCAB_DATA has at least one difficulty level', () => {
    const levels = Object.keys(VOCAB_DATA);
    assert(levels.length > 0, 'VOCAB_DATA has no levels');
});

test('All vocab items have required fields', () => {
    for (const [level, categories] of Object.entries(VOCAB_DATA)) {
        for (const [catName, items] of Object.entries(categories as Record<string, any[]>)) {
            for (const item of items) {
                assert(!!item.character, `Vocab in ${level}/${catName} missing character`);
                assert(!!item.primaryReading, `Vocab "${item.character}" in ${level}/${catName} missing primaryReading`);
                assert(!!item.meaning, `Vocab "${item.character}" in ${level}/${catName} missing meaning`);
            }
        }
    }
});

test('Vocab alternateReadings are arrays when present', () => {
    for (const categories of Object.values(VOCAB_DATA)) {
        for (const items of Object.values(categories as Record<string, any[]>)) {
            for (const item of items) {
                if (item.alternateReadings !== undefined) {
                    assert(Array.isArray(item.alternateReadings),
                        `Vocab "${item.character}" alternateReadings is not an array`);
                }
            }
        }
    }
});

// ─── Grammar Data ──────────────────────────────────────────────────────
console.log('\n📝 Grammar Data');

test('GRAMMAR_LIBRARY is a non-empty array', () => {
    assert(Array.isArray(GRAMMAR_LIBRARY), 'GRAMMAR_LIBRARY is not an array');
    assert(GRAMMAR_LIBRARY.length > 0, 'GRAMMAR_LIBRARY is empty');
});

test('All grammar lessons have required fields', () => {
    for (const lesson of GRAMMAR_LIBRARY) {
        assert(!!lesson.id, `Grammar lesson missing id`);
        assert(!!lesson.title, `Grammar lesson "${lesson.id}" missing title`);
        assert(!!lesson.level, `Grammar lesson "${lesson.id}" missing level`);
        assert(!!lesson.explanation, `Grammar lesson "${lesson.id}" missing explanation`);
        assert(Array.isArray(lesson.examples), `Grammar lesson "${lesson.id}" examples is not an array`);
        assert(lesson.examples.length > 0, `Grammar lesson "${lesson.id}" has no examples`);
    }
});

test('All grammar quizzes have valid structure', () => {
    for (const lesson of GRAMMAR_LIBRARY) {
        const q = lesson.quiz;
        assert(!!q, `Grammar lesson "${lesson.id}" missing quiz`);
        assert(!!q.question, `Grammar lesson "${lesson.id}" quiz missing question`);
        assert(Array.isArray(q.options), `Grammar lesson "${lesson.id}" quiz options not an array`);
        assert(q.options.length === 4, `Grammar lesson "${lesson.id}" quiz should have exactly 4 options, has ${q.options.length}`);
        assert(typeof q.correctAnswerIndex === 'number', `Grammar lesson "${lesson.id}" quiz correctAnswerIndex is not a number`);
        assert(q.correctAnswerIndex >= 0 && q.correctAnswerIndex <= 3,
            `Grammar lesson "${lesson.id}" quiz correctAnswerIndex out of range: ${q.correctAnswerIndex}`);
    }
});

test('No duplicate grammar lesson IDs', () => {
    const ids = GRAMMAR_LIBRARY.map((l: any) => l.id);
    const dupes = ids.filter((id: string, idx: number) => ids.indexOf(id) !== idx);
    assert(dupes.length === 0, `Duplicate grammar IDs: ${dupes.join(', ')}`);
});

test('Grammar examples have all required fields', () => {
    for (const lesson of GRAMMAR_LIBRARY) {
        for (const ex of lesson.examples) {
            assert(!!ex.japanese, `Example in lesson "${lesson.id}" missing japanese`);
            assert(!!ex.english, `Example in lesson "${lesson.id}" missing english`);
            assert(!!ex.romaji, `Example in lesson "${lesson.id}" missing romaji`);
        }
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
