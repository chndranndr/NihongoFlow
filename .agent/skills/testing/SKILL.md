---
name: testing
description: Comprehensive testing skill for NihongoFlow. Unit tests for data/logic, browser tests for UI flows, SRS validation, conjugation verification.
---
# NihongoFlow Testing Skill

Thorough testing suite for the NihongoFlow Japanese learning application. Covers data integrity, business logic, UI flows, and integration testing across all modules.

## Prerequisites

Ensure the dev server is running:
```bash
npm run dev
```

The tests use **Node.js** for unit/logic tests and the **browser subagent** for UI/integration tests.

---

## Test Architecture

```
scripts/
├── test-data-integrity.ts    # Validates all data files (kana, kanji, vocab, grammar)
├── test-number-logic.ts      # Tests numberToJapanese() with edge cases & special readings
├── test-date-logic.ts        # Tests date generation, yearToJapanese(), day counters
├── test-conjugation-logic.ts # Tests all verb/adjective conjugation forms
├── test-srs-logic.ts         # Tests SM-2 algorithm, quality calculation, streak logic
└── browser-test-checklist.md # Manual/browser-agent UI test scenarios
```

---

## How to Use This Skill

### Step 1: Run All Unit Tests

Execute all logic tests sequentially:

```bash
npx tsx .agent/skills/testing/scripts/test-data-integrity.ts
npx tsx .agent/skills/testing/scripts/test-number-logic.ts
npx tsx .agent/skills/testing/scripts/test-date-logic.ts
npx tsx .agent/skills/testing/scripts/test-conjugation-logic.ts
npx tsx .agent/skills/testing/scripts/test-srs-logic.ts
```

// turbo-all

Or run them all at once:
```bash
npx tsx .agent/skills/testing/scripts/test-data-integrity.ts && npx tsx .agent/skills/testing/scripts/test-number-logic.ts && npx tsx .agent/skills/testing/scripts/test-date-logic.ts && npx tsx .agent/skills/testing/scripts/test-conjugation-logic.ts && npx tsx .agent/skills/testing/scripts/test-srs-logic.ts
```

### Step 2: Run Browser UI Tests

Read the browser test checklist and use the **browser subagent** to execute each scenario:

```bash
# Read the checklist
cat .agent/skills/testing/scripts/browser-test-checklist.md
```

Then use the browser_subagent tool to navigate to `http://localhost:5173` and execute each test scenario described in the checklist.

### Step 3: Interpret Results

- **PASS** ✅ — Test passed
- **FAIL** ❌ — Test failed with details
- Summary printed at the end of each test file

---

## Test Coverage Matrix

| Module | Unit Tests | Browser Tests | What's Tested |
|--------|-----------|---------------|---------------|
| **Kana Data** | ✅ | ✅ | All hiragana/katakana entries, romaji mappings, drill flow |
| **Kanji Data** | ✅ | ✅ | All JLPT levels, readings, meanings, category navigation |
| **Vocab Data** | ✅ | ✅ | All vocabulary entries, alternate readings, drill flow |
| **Grammar Data** | ✅ | — | Lesson structure, quiz validity, level coverage |
| **Number Logic** | ✅ | ✅ | 0-999,999 conversion, special readings (sanbyaku, etc.) |
| **Date Logic** | ✅ | ✅ | Days of week, day counters (tsuitachi, etc.), full dates |
| **Conjugation** | ✅ | ✅ | All 10 forms × godan/ichidan/irregular/i-adj/na-adj |
| **SRS Service** | ✅ | ✅ | SM-2 algorithm, quality rating, streak, card lifecycle |
| **Gemini Service** | — | ✅ | API key management, error states (no key scenarios) |
| **Navigation** | — | ✅ | All dashboard → mode transitions, back button, dark mode |
| **Dark Mode** | — | ✅ | Theme toggle, persistence, visual contrast |

---

## When to Run Tests

- **After modifying data files** (`kanaData.ts`, `kanjiData.ts`, `vocabData.ts`, `grammarData.ts`, `numberData.ts`, `dateTimeData.ts`, `conjugationData.ts`) → Run data integrity + relevant logic tests
- **After modifying SRS logic** (`srsService.ts`, `srsTypes.ts`) → Run SRS logic tests
- **After modifying conjugation logic** (`conjugationData.ts`) → Run conjugation tests
- **After UI changes** (any component in `components/`) → Run browser tests for affected flows
- **Before release** → Run ALL tests

---

## Adding New Tests

To add a test to an existing file, follow this pattern:

```typescript
test('descriptive name of what is being tested', () => {
    // Arrange
    const input = ...;
    // Act
    const result = functionUnderTest(input);
    // Assert
    assert(result === expected, `Expected ${expected}, got ${result}`);
});
```

All test files use a lightweight built-in test runner (no external dependencies). The `test()` and `assert()` functions are defined at the top of each test file.
