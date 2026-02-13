/**
 * NihongoFlow — Conjugation Logic Tests
 * Tests all verb and adjective conjugation forms for correctness.
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
    GODAN_VERBS, ICHIDAN_VERBS, IRREGULAR_VERBS, ALL_VERBS,
    I_ADJECTIVES, NA_ADJECTIVES, ALL_ADJECTIVES,
    conjugateVerb, conjugateAdjective,
    generateConjugationDrillItems, VERB_FORMS, ADJECTIVE_FORMS,
    type Verb, type Adjective, type ConjugationForm
} from '../../../../conjugationData';

// ═══════════════════════════════════════════════════════════════════════
console.log('\n🧪 CONJUGATION LOGIC TESTS\n');

// ─── Data Structure ────────────────────────────────────────────────────
console.log('📝 Data Structure');

test('GODAN_VERBS is non-empty', () => {
    assert(GODAN_VERBS.length > 0, 'GODAN_VERBS is empty');
});

test('ICHIDAN_VERBS is non-empty', () => {
    assert(ICHIDAN_VERBS.length > 0, 'ICHIDAN_VERBS is empty');
});

test('IRREGULAR_VERBS has exactly 2 entries (する, 来る)', () => {
    assertEqual(IRREGULAR_VERBS.length, 2, 'count');
});

test('ALL_VERBS = godan + ichidan + irregular', () => {
    assertEqual(ALL_VERBS.length, GODAN_VERBS.length + ICHIDAN_VERBS.length + IRREGULAR_VERBS.length, 'total');
});

test('All verbs have required fields', () => {
    for (const v of ALL_VERBS) {
        assert(!!v.dictionary, `Verb missing dictionary form`);
        assert(!!v.reading, `Verb "${v.dictionary}" missing reading`);
        assert(!!v.romaji, `Verb "${v.dictionary}" missing romaji`);
        assert(!!v.meaning, `Verb "${v.dictionary}" missing meaning`);
        assert(!!v.type, `Verb "${v.dictionary}" missing type`);
    }
});

test('All godan verbs have an ending', () => {
    for (const v of GODAN_VERBS) {
        assert(!!v.ending, `Godan verb "${v.dictionary}" missing ending`);
    }
});

test('I_ADJECTIVES is non-empty', () => {
    assert(I_ADJECTIVES.length > 0, 'I_ADJECTIVES is empty');
});

test('NA_ADJECTIVES is non-empty', () => {
    assert(NA_ADJECTIVES.length > 0, 'NA_ADJECTIVES is empty');
});

test('All adjectives have required fields', () => {
    for (const a of ALL_ADJECTIVES) {
        assert(!!a.dictionary, `Adjective missing dictionary form`);
        assert(!!a.reading, `Adj "${a.dictionary}" missing reading`);
        assert(!!a.romaji, `Adj "${a.dictionary}" missing romaji`);
        assert(!!a.meaning, `Adj "${a.dictionary}" missing meaning`);
        assert(!!a.type, `Adj "${a.dictionary}" missing type`);
    }
});

// ─── Ichidan Verb Conjugation ──────────────────────────────────────────
console.log('\n📝 Ichidan Verb Conjugation (食べる taberu)');
const taberu = ICHIDAN_VERBS.find(v => v.romaji === 'taberu')!;

test('食べる masu form = たべます', () => {
    const r = conjugateVerb(taberu, 'masu');
    assertEqual(r.hiragana, 'たべます', 'hiragana');
});

test('食べる te form = たべて', () => {
    const r = conjugateVerb(taberu, 'te');
    assertEqual(r.hiragana, 'たべて', 'hiragana');
});

test('食べる negative = たべない', () => {
    const r = conjugateVerb(taberu, 'negative');
    assertEqual(r.hiragana, 'たべない', 'hiragana');
});

test('食べる past = たべた', () => {
    const r = conjugateVerb(taberu, 'past');
    assertEqual(r.hiragana, 'たべた', 'hiragana');
});

test('食べる potential = たべられる', () => {
    const r = conjugateVerb(taberu, 'potential');
    assertEqual(r.hiragana, 'たべられる', 'hiragana');
});

// ─── Godan Verb Conjugation ────────────────────────────────────────────
console.log('\n📝 Godan Verb Conjugation (飲む nomu)');
const nomu = GODAN_VERBS.find(v => v.romaji === 'nomu')!;

test('飲む masu form = のみます', () => {
    const r = conjugateVerb(nomu, 'masu');
    assertEqual(r.hiragana, 'のみます', 'hiragana');
});

test('飲む te form = のんで', () => {
    const r = conjugateVerb(nomu, 'te');
    assertEqual(r.hiragana, 'のんで', 'hiragana');
});

test('飲む negative = のまない', () => {
    const r = conjugateVerb(nomu, 'negative');
    assertEqual(r.hiragana, 'のまない', 'hiragana');
});

test('飲む past = のんだ', () => {
    const r = conjugateVerb(nomu, 'past');
    assertEqual(r.hiragana, 'のんだ', 'hiragana');
});

// Test く ending (聞く)
console.log('\n📝 Godan Verb Conjugation (聞く kiku)');
const kiku = GODAN_VERBS.find(v => v.romaji === 'kiku')!;

test('聞く te form = きいて', () => {
    const r = conjugateVerb(kiku, 'te');
    assertEqual(r.hiragana, 'きいて', 'hiragana');
});

test('聞く masu form = ききます', () => {
    const r = conjugateVerb(kiku, 'masu');
    assertEqual(r.hiragana, 'ききます', 'hiragana');
});

// Test す ending (話す)
console.log('\n📝 Godan Verb Conjugation (話す hanasu)');
const hanasu = GODAN_VERBS.find(v => v.romaji === 'hanasu')!;

test('話す te form = はなして', () => {
    const r = conjugateVerb(hanasu, 'te');
    assertEqual(r.hiragana, 'はなして', 'hiragana');
});

// Test special: 行く (iku) - irregular te-form
console.log('\n📝 行く Special Te Form');
const iku = GODAN_VERBS.find(v => v.romaji === 'iku')!;

test('行く te form = いって (irregular)', () => {
    const r = conjugateVerb(iku, 'te');
    assertEqual(r.hiragana, 'いって', 'hiragana');
});

// ─── Irregular Verb Conjugation ────────────────────────────────────────
console.log('\n📝 Irregular Verb Conjugation');
const suru = IRREGULAR_VERBS.find(v => v.romaji === 'suru')!;
const kuru = IRREGULAR_VERBS.find(v => v.romaji === 'kuru')!;

test('する masu form = します', () => {
    const r = conjugateVerb(suru, 'masu');
    assertEqual(r.hiragana, 'します', 'hiragana');
});

test('する te form = して', () => {
    const r = conjugateVerb(suru, 'te');
    assertEqual(r.hiragana, 'して', 'hiragana');
});

test('する negative = しない', () => {
    const r = conjugateVerb(suru, 'negative');
    assertEqual(r.hiragana, 'しない', 'hiragana');
});

test('来る masu form = きます', () => {
    const r = conjugateVerb(kuru, 'masu');
    assertEqual(r.hiragana, 'きます', 'hiragana');
});

test('来る te form = きて', () => {
    const r = conjugateVerb(kuru, 'te');
    assertEqual(r.hiragana, 'きて', 'hiragana');
});

test('来る negative = こない', () => {
    const r = conjugateVerb(kuru, 'negative');
    assertEqual(r.hiragana, 'こない', 'hiragana');
});

// ─── I-Adjective Conjugation ───────────────────────────────────────────
console.log('\n📝 I-Adjective Conjugation (高い takai)');
const takai = I_ADJECTIVES.find(a => a.romaji === 'takai')!;

test('高い negative = たかくない', () => {
    const r = conjugateAdjective(takai, 'negative');
    assertEqual(r.hiragana, 'たかくない', 'hiragana');
});

test('高い past = たかかった', () => {
    const r = conjugateAdjective(takai, 'past');
    assertEqual(r.hiragana, 'たかかった', 'hiragana');
});

test('高い past-negative = たかくなかった', () => {
    const r = conjugateAdjective(takai, 'past-negative');
    assertEqual(r.hiragana, 'たかくなかった', 'hiragana');
});

test('高い te form = たかくて', () => {
    const r = conjugateAdjective(takai, 'te');
    assertEqual(r.hiragana, 'たかくて', 'hiragana');
});

// ─── Na-Adjective Conjugation ──────────────────────────────────────────
console.log('\n📝 Na-Adjective Conjugation (静か shizuka)');
const shizuka = NA_ADJECTIVES.find(a => a.romaji === 'shizuka')!;

test('静か negative = しずかじゃない', () => {
    const r = conjugateAdjective(shizuka, 'negative');
    assertEqual(r.hiragana, 'しずかじゃない', 'hiragana');
});

test('静か past = しずかだった', () => {
    const r = conjugateAdjective(shizuka, 'past');
    assertEqual(r.hiragana, 'しずかだった', 'hiragana');
});

test('静か te form = しずかで', () => {
    const r = conjugateAdjective(shizuka, 'te');
    assertEqual(r.hiragana, 'しずかで', 'hiragana');
});

// ─── All Forms Don't Crash ─────────────────────────────────────────────
console.log('\n📝 Completeness: All Forms × All Types');

const allVerbForms: ConjugationForm[] = ['masu', 'te', 'negative', 'past', 'past-negative', 'potential', 'volitional', 'imperative', 'conditional', 'tai'];
const allAdjForms: ConjugationForm[] = ['negative', 'past', 'past-negative', 'te', 'conditional'];

test('All verb forms conjugate without error for every verb', () => {
    let errorCount = 0;
    for (const verb of ALL_VERBS) {
        for (const form of allVerbForms) {
            try {
                const r = conjugateVerb(verb, form);
                assert(!!r.hiragana, `Empty hiragana for ${verb.dictionary} ${form}`);
                assert(!!r.romaji, `Empty romaji for ${verb.dictionary} ${form}`);
            } catch (e: any) {
                errorCount++;
                if (errorCount <= 5) console.log(`    ⚠ ${verb.dictionary} (${verb.type}) × ${form}: ${e.message}`);
            }
        }
    }
    assert(errorCount === 0, `${errorCount} conjugation errors (showing first 5 above)`);
});

test('All adjective forms conjugate without error for every adjective', () => {
    let errorCount = 0;
    for (const adj of ALL_ADJECTIVES) {
        for (const form of allAdjForms) {
            try {
                const r = conjugateAdjective(adj, form);
                assert(!!r.hiragana, `Empty hiragana for ${adj.dictionary} ${form}`);
                assert(!!r.romaji, `Empty romaji for ${adj.dictionary} ${form}`);
            } catch (e: any) {
                errorCount++;
                if (errorCount <= 5) console.log(`    ⚠ ${adj.dictionary} (${adj.type}) × ${form}: ${e.message}`);
            }
        }
    }
    assert(errorCount === 0, `${errorCount} conjugation errors (showing first 5 above)`);
});

// ─── Drill Item Generation ─────────────────────────────────────────────
console.log('\n📝 Drill Item Generation');

test('Generate verb drill items', () => {
    const items = generateConjugationDrillItems('verb', ['godan', 'ichidan'], [], ['masu', 'te'], 5);
    assertEqual(items.length, 5, 'count');
    for (const item of items) {
        assert(!!item.answer.hiragana, `Drill item missing answer hiragana`);
        assert(!!item.formLabel, `Drill item missing formLabel`);
    }
});

test('Generate adjective drill items', () => {
    const items = generateConjugationDrillItems('adjective', [], ['i-adjective', 'na-adjective'], ['negative', 'past'], 5);
    assertEqual(items.length, 5, 'count');
});

test('VERB_FORMS list is well-defined', () => {
    assert(VERB_FORMS.length > 0, 'VERB_FORMS is empty');
    for (const f of VERB_FORMS) {
        assert(!!f.form, 'VERB_FORMS entry missing form');
        assert(!!f.label, 'VERB_FORMS entry missing label');
        assert(!!f.description, 'VERB_FORMS entry missing description');
    }
});

test('ADJECTIVE_FORMS list is well-defined', () => {
    assert(ADJECTIVE_FORMS.length > 0, 'ADJECTIVE_FORMS is empty');
    for (const f of ADJECTIVE_FORMS) {
        assert(!!f.form, 'ADJECTIVE_FORMS entry missing form');
        assert(!!f.label, 'ADJECTIVE_FORMS entry missing label');
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
