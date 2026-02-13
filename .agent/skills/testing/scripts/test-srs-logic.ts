/**
 * NihongoFlow — SRS (Spaced Repetition) Logic Tests
 * Tests SM-2 algorithm, quality ratings, streak logic, and card management.
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
import { SRSQuality, FAST_ANSWER_THRESHOLD_MS, type SRSCard } from '../../../../srsTypes';
import {
    calculateNextReview, getQuality, initializeAllCards,
    getDueCards, getNewCards, updateCard
} from '../../../../services/srsService';

// ═══════════════════════════════════════════════════════════════════════
console.log('\n🧪 SRS (SPACED REPETITION) LOGIC TESTS\n');

// ─── Helper ────────────────────────────────────────────────────────────
function makeCard(overrides: Partial<SRSCard> = {}): SRSCard {
    return {
        id: 'test-card-1',
        character: '食',
        category: 'KANJI',
        easeFactor: 2.5,
        repetitions: 0,
        interval: 0,
        nextReviewDate: Date.now(),
        lastReviewDate: 0,
        primaryReading: 'shoku',
        meaning: 'eat',
        ...overrides,
    };
}

// ─── Quality Rating ────────────────────────────────────────────────────
console.log('📝 Quality Rating');

test('Incorrect answer → AGAIN (quality < 3)', () => {
    const q = getQuality(false, 1000);
    assertEqual(q, SRSQuality.AGAIN, 'quality');
});

test('Correct + fast answer → EASY', () => {
    const q = getQuality(true, FAST_ANSWER_THRESHOLD_MS - 100);
    assertEqual(q, SRSQuality.EASY, 'quality');
});

test('Correct + slow answer → GOOD', () => {
    const q = getQuality(true, FAST_ANSWER_THRESHOLD_MS + 100);
    assertEqual(q, SRSQuality.GOOD, 'quality');
});

test('Correct + exactly threshold → EASY (<=)', () => {
    const q = getQuality(true, FAST_ANSWER_THRESHOLD_MS);
    assertEqual(q, SRSQuality.EASY, 'quality');
});

// ─── SM-2 Algorithm: First Review ──────────────────────────────────────
console.log('\n📝 SM-2 Algorithm — First Review');

test('First correct answer → interval = 1 day', () => {
    const card = makeCard({ repetitions: 0, interval: 0 });
    const update = calculateNextReview(card, SRSQuality.GOOD);
    assertEqual(update.interval, 1, 'interval');
    assertEqual(update.repetitions, 1, 'repetitions');
});

test('Second correct answer → interval = 6 days', () => {
    const card = makeCard({ repetitions: 1, interval: 1 });
    const update = calculateNextReview(card, SRSQuality.GOOD);
    assertEqual(update.interval, 6, 'interval');
    assertEqual(update.repetitions, 2, 'repetitions');
});

test('Third+ correct answer → interval = round(prev × easeFactor)', () => {
    const card = makeCard({ repetitions: 2, interval: 6, easeFactor: 2.5 });
    const update = calculateNextReview(card, SRSQuality.GOOD);
    assertEqual(update.interval, 15, 'interval (6 × 2.5 = 15)');
    assertEqual(update.repetitions, 3, 'repetitions');
});

// ─── SM-2 Algorithm: Wrong Answer ──────────────────────────────────────
console.log('\n📝 SM-2 Algorithm — Wrong Answer');

test('Wrong answer resets repetitions to 0', () => {
    const card = makeCard({ repetitions: 5, interval: 30 });
    const update = calculateNextReview(card, SRSQuality.AGAIN);
    assertEqual(update.repetitions, 0, 'repetitions');
    assertEqual(update.interval, 0, 'interval');
});

// ─── SM-2 Algorithm: Ease Factor ───────────────────────────────────────
console.log('\n📝 SM-2 Algorithm — Ease Factor');

test('EASY answer increases ease factor', () => {
    const card = makeCard({ easeFactor: 2.5 });
    const update = calculateNextReview(card, SRSQuality.EASY);
    assert(update.easeFactor! > 2.5, `Ease factor ${update.easeFactor} should be > 2.5`);
});

test('AGAIN answer decreases ease factor', () => {
    const card = makeCard({ easeFactor: 2.5 });
    const update = calculateNextReview(card, SRSQuality.AGAIN);
    assert(update.easeFactor! < 2.5, `Ease factor ${update.easeFactor} should be < 2.5`);
});

test('Ease factor never drops below 1.3', () => {
    let card = makeCard({ easeFactor: 1.3 });
    // Multiple wrong answers should not go below 1.3
    for (let i = 0; i < 10; i++) {
        const update = calculateNextReview(card, SRSQuality.AGAIN);
        assert(update.easeFactor! >= 1.3, `Ease factor ${update.easeFactor} dropped below 1.3`);
        card = { ...card, ...update } as SRSCard;
    }
});

test('Next review date is set in the future for correct answer', () => {
    const card = makeCard({ repetitions: 0 });
    const now = Date.now();
    const update = calculateNextReview(card, SRSQuality.GOOD);
    assert(update.nextReviewDate! > now, `nextReviewDate ${update.nextReviewDate} should be > now ${now}`);
});

test('lastReviewDate is set to approximately now', () => {
    const before = Date.now();
    const card = makeCard();
    const update = calculateNextReview(card, SRSQuality.GOOD);
    const after = Date.now();
    assert(update.lastReviewDate! >= before, 'lastReviewDate too early');
    assert(update.lastReviewDate! <= after, 'lastReviewDate too late');
});

// ─── Card Initialization ──────────────────────────────────────────────
console.log('\n📝 Card Initialization');

test('initializeAllCards returns a non-empty array', () => {
    const cards = initializeAllCards();
    assert(cards.length > 0, 'No cards initialized');
});

test('All initialized cards have default values', () => {
    const cards = initializeAllCards();
    for (const card of cards.slice(0, 20)) { // Spot check first 20
        assertEqual(card.easeFactor, 2.5, `card ${card.id} easeFactor`);
        assertEqual(card.repetitions, 0, `card ${card.id} repetitions`);
        assertEqual(card.interval, 0, `card ${card.id} interval`);
        assertEqual(card.lastReviewDate, 0, `card ${card.id} lastReviewDate`);
        assert(!!card.id, `card missing id`);
        assert(!!card.character, `card ${card.id} missing character`);
        assert(!!card.category, `card ${card.id} missing category`);
    }
});

test('Card IDs are unique', () => {
    const cards = initializeAllCards();
    const ids = cards.map(c => c.id);
    const dupes = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    assert(dupes.length === 0, `Duplicate card IDs: ${dupes.slice(0, 5).join(', ')}`);
});

test('Cards include both KANJI and VOCAB categories', () => {
    const cards = initializeAllCards();
    const categories = new Set(cards.map(c => c.category));
    assert(categories.has('KANJI'), 'No KANJI cards');
    assert(categories.has('VOCAB'), 'No VOCAB cards');
});

// ─── Card Filtering ────────────────────────────────────────────────────
console.log('\n📝 Card Filtering');

test('getDueCards returns cards with nextReviewDate <= now', () => {
    const cards = [
        makeCard({ id: 'due', nextReviewDate: Date.now() - 1000 }),
        makeCard({ id: 'future', nextReviewDate: Date.now() + 86400000 }),
    ];
    const due = getDueCards(cards);
    assertEqual(due.length, 1, 'should return 1 due card');
    assertEqual(due[0].id, 'due', 'should be the due card');
});

test('getDueCards respects limit', () => {
    const cards = Array.from({ length: 50 }, (_, i) =>
        makeCard({ id: `card-${i}`, nextReviewDate: Date.now() - 1000 })
    );
    const due = getDueCards(cards, 10);
    assertEqual(due.length, 10, 'should respect limit');
});

test('getNewCards returns only unreviewed cards', () => {
    const cards = [
        makeCard({ id: 'new', repetitions: 0, lastReviewDate: 0 }),
        makeCard({ id: 'reviewed', repetitions: 1, lastReviewDate: Date.now() - 1000 }),
    ];
    const newCards = getNewCards(cards);
    assertEqual(newCards.length, 1, 'should return 1 new card');
    assertEqual(newCards[0].id, 'new', 'should be the new card');
});

// ─── Card Update ───────────────────────────────────────────────────────
console.log('\n📝 Card Update');

test('updateCard modifies only the target card', () => {
    const cards = [
        makeCard({ id: 'target', repetitions: 0 }),
        makeCard({ id: 'other', repetitions: 0 }),
    ];
    const updated = updateCard(cards, 'target', true, 2000);
    const target = updated.find(c => c.id === 'target')!;
    const other = updated.find(c => c.id === 'other')!;

    assert(target.repetitions > 0, 'target should be updated');
    assertEqual(other.repetitions, 0, 'other should be unchanged');
});

test('updateCard with wrong answer resets progress', () => {
    const cards = [makeCard({ id: 'target', repetitions: 5, interval: 30 })];
    const updated = updateCard(cards, 'target', false, 1000);
    assertEqual(updated[0].repetitions, 0, 'repetitions should reset');
    assertEqual(updated[0].interval, 0, 'interval should reset');
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
