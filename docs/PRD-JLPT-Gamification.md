# PRD: JLPT Study Paths + Gamification

## 1. Product Overview

### Problem Statement
NihongoFlow currently offers excellent drill mechanics (kana, kanji, vocab, numbers, dates, conjugation, SRS) but lacks **structured learning progression** and **motivation systems**. Users have no clear path from beginner to proficiency, no sense of daily accomplishment, and no reason to return daily beyond self-discipline.

### Solution
Combine **JLPT-aligned study paths** (N5→N1) with a **gamification layer** (XP, levels, streaks, achievements) to give users:
- A clear roadmap of what to learn and in what order
- Instant gratification for every practice session
- Long-term motivation through streaks and milestone achievements

### Success Metrics
| Metric | Target |
|--------|--------|
| Daily active sessions | +40% |
| Average session length | +25% |
| 7-day retention | +30% |
| Streak maintenance (>3 days) | 50% of users |

---

## 2. Feature Requirements

### 2.1 XP & Level System
Every learning activity awards XP. XP accumulates to increase your learner level.

| Activity | XP Reward |
|----------|-----------|
| Drill item answered correctly | 10 XP |
| Perfect drill (100% accuracy) | +25 XP bonus |
| SRS card reviewed | 5 XP |
| Grammar quiz passed | 15 XP |
| First activity of the day | 50 XP bonus |
| Streak multiplier | +10 XP × streak days |

**Level Curve**: Levels 1–50 with increasing XP thresholds.

| Level | XP Required |
|-------|-------------|
| 1 | 0 |
| 5 | 500 |
| 10 | 2,000 |
| 15 | 5,000 |
| 20 | 10,000 |
| 25 | 15,000 |
| 30 | 25,000 |
| 40 | 50,000 |
| 50 | 100,000 |

### 2.2 Streak System
- Track consecutive days of ANY learning activity (not just SRS)
- A "day" resets at midnight local time
- Missing a day resets streak to 0
- Streak freeze: future feature (not in v1)

### 2.3 JLPT Study Paths
Tag all existing content by JLPT level and present a visual roadmap.

| JLPT Level | Kanji | Vocab | Grammar | Status |
|-------------|-------|-------|---------|--------|
| **N5** | 80 kanji (current BEGINNER) | 70+ words (current BEGINNER) | 20 lessons (current) | ✅ Data exists |
| **N4** | 70+ kanji (current INTERMEDIATE) | — | — | ⚠️ Partial |
| **N3–N1** | — | — | — | ❌ Future expansion |

V1 focuses on N5 as the primary complete path. N4 is partially available via existing INTERMEDIATE kanji. Higher levels are shown as "Coming Soon" on the roadmap.

### 2.4 Achievements
~15 unlockable badges that reward various behaviors:

| Achievement | Condition | Icon |
|-------------|-----------|------|
| **First Steps** | Complete 1 drill | 👣 |
| **Kana Master** | Complete all hiragana + katakana | あ |
| **Centurion** | 100 total reviews | 💯 |
| **Week Warrior** | 7-day streak | 🔥 |
| **Month Master** | 30-day streak | 🏔️ |
| **N5 Kanji** | Master all N5 kanji in SRS | 字 |
| **N5 Vocab** | Master all N5 vocab in SRS | 語 |
| **N5 Grammar** | Pass all N5 grammar quizzes | 文 |
| **N5 Complete** | All N5 skills mastered | 🎌 |
| **Speed Demon** | 10 cards answered in <2s each | ⚡ |
| **XP Rising** | Reach 1,000 XP | ⭐ |
| **XP Legend** | Reach 10,000 XP | 🌟 |
| **Perfect Drill** | 100% accuracy on 20+ items | 💎 |
| **Explorer** | Practice all 6 drill types | 🌐 |
| **Night Owl** | Study after 10 PM | 🦉 |

---

## 3. User Journeys

### Journey 1: New User — First Session

1. **Opens app** → Dashboard shows JLPT Progress Banner: "Level 1 · 0 XP" with a "Begin Your N5 Journey" call-to-action.
2. **Taps Kana card** → Completes 10 kana drill items (8 correct, 2 wrong).
3. **Sees results screen** → "+80 XP" animation with breakdown:
   - 80 XP for 8 correct answers
   - +50 XP daily bonus (first activity today)
   - Total: 130 XP
4. **Achievement toast slides in** → "First Steps 👣 — Complete your first drill"
5. **Returns to dashboard** → Banner updates to "Level 2 · 130 XP · 🔥 1 day"
6. **Taps Progress** → Sees N5 roadmap with Kana at ~20% progress.

**Emotional outcome**: User feels immediate accomplishment and sees a clear path forward.

### Journey 2: Returning User — Day 5 Streak

1. **Opens app** → Banner shows "Level 8 · 1,240 XP · 🔥 5 days"
2. **Sees SRS notification** → "12 cards due today"
3. **Completes 12 SRS reviews** (10 correct) → Earns:
   - 50 XP for reviews
   - +50 XP daily bonus
   - +50 XP streak bonus (5 × 10)
   - Total: 150 XP
4. **Checks Progress page** → N5 Kanji at 65%, Vocab at 40%, Grammar at 58%
5. **Sees weekly activity chart** → Consistent daily bars, feels motivated
6. **Day 7** → "Week Warrior 🔥" achievement unlocks with confetti toast

**Emotional outcome**: Streak creates "don't break the chain" motivation. Weekly chart validates consistency.

### Journey 3: JLPT N5 Completion

1. **User has been studying for weeks** → N5 Kanji 100%, N5 Vocab 100%, N5 Grammar at 95%
2. **Takes final grammar quiz** → Passes "Conditional (~tara)" quiz
3. **Achievement toast** → "N5 Grammar 文 — Pass all N5 grammar quizzes"
4. **Immediately followed by** → "N5 Complete 🎌 — All N5 skills mastered!" with confetti celebration
5. **Opens Progress page** → N5 shows 100% complete with gold badge
6. **N4 path becomes highlighted** → "N4 Kanji: 70 characters to learn" with "Start" button

**Emotional outcome**: Major milestone celebrated. Clear next step presented, preventing dropout.

---

## 4. UI Design

### 4.1 Dashboard Progress Banner
Inserted at the top of the dashboard, above the Practice section.

```
┌──────────────────────────────────────────┐
│  Lv.12 ████████░░ 2,450 XP    🔥 5 days │
│  ─────────────────────────────           │
│  N5 Progress: ██████░░░░ 62%             │
│                          [View Progress] │
└──────────────────────────────────────────┘
```

- Neumorphic card with gradient accent for XP bar
- XP bar animates when XP changes
- Streak flame pulses on hover
- "View Progress" links to Progress page

### 4.2 Progress Page Layout

```
┌──────────────────────────────────────────┐
│  ← Progress                              │
├──────────────────────────────────────────┤
│                                          │
│  🏅 Level 12        ⭐ 2,450 XP         │
│  🔥 5-day streak    📅 Today: 120 XP    │
│                                          │
├──── JLPT ROADMAP ────────────────────────┤
│                                          │
│  ● N5  ██████████░░ 62%     [Active]     │
│    ├─ Kanji   ████████░░ 80%             │
│    ├─ Vocab   █████░░░░░ 50%             │
│    └─ Grammar ██████░░░░ 58%             │
│                                          │
│  ○ N4  ░░░░░░░░░░░░  0%     [Locked]    │
│  ○ N3  ░░░░░░░░░░░░  —      [Coming]    │
│                                          │
├──── ACHIEVEMENTS ────────────────────────┤
│                                          │
│  👣  あ  💯  🔥  ⚡  💎  🌐  🦉         │
│  ██  ██  ██  ░░  ░░  ██  ░░  ░░         │
│  5/15 unlocked                           │
│                                          │
├──── WEEKLY ACTIVITY ─────────────────────┤
│                                          │
│  200 ┤                    ██             │
│  150 ┤          ██  ██    ██             │
│  100 ┤    ██    ██  ██    ██  ██         │
│   50 ┤    ██    ██  ██    ██  ██         │
│    0 ┼─Mo─Tu─We─Th─Fr─Sa─Su─            │
│                                          │
└──────────────────────────────────────────┘
```

- JLPT roadmap items are tappable to expand/collapse skill breakdown
- Achievements show as icon grid; unlocked = full color, locked = grayscale + blur
- Weekly chart uses pure CSS bars (no external chart library)

### 4.3 Achievement Toast

```
┌────────────────────────────────┐
│  🎉 Achievement Unlocked!     │
│  Week Warrior 🔥              │
│  7-day streak maintained      │
└────────────────────────────────┘
```

- Slides in from top of screen
- Background blur + subtle confetti CSS particles
- Auto-dismisses after 3 seconds
- Tap to dismiss early

### 4.4 XP Earned Animation (on Drill/Review Results)

```
┌────────────────────────────────┐
│        ✨ +160 XP ✨          │
│                                │
│   Drill:    100 XP             │
│   Perfect:  +25 XP            │
│   Daily:    +50 XP            │
│   Streak:   ×1.5              │
│                                │
│   Level 11 → 12 🎉           │
└────────────────────────────────┘
```

- Counters animate up (0 → 160)
- Level-up triggers golden glow effect
- Appears on existing results screens, not a separate page

---

## 5. Data Architecture

### 5.1 Progress State (localStorage)

```typescript
interface UserProgress {
  // Core
  xp: number;
  level: number;

  // Streak
  streak: number;
  lastActivityDate: string; // "2026-02-10"

  // Daily tracking
  dailyXp: Record<string, number>; // "2026-02-10" → 160

  // JLPT mastery (percentage 0-100)
  jlptMastery: {
    N5: { kanji: number; vocab: number; grammar: number };
    N4: { kanji: number; vocab: number; grammar: number };
  };

  // Achievement tracking
  achievements: string[];         // IDs of unlocked achievements
  drillsCompleted: number;
  reviewsCompleted: number;
  drillTypesUsed: string[];       // For "Explorer" achievement
  perfectDrills: number;
  grammarQuizzesPassed: string[]; // lesson IDs
}
```

Storage key: `nihongoflow-progress`

### 5.2 JLPT Tagging Strategy

Map existing data levels to JLPT without restructuring data files:

| Current Key | JLPT Level |
|-------------|------------|
| `BEGINNER` in kanjiData | N5 |
| `INTERMEDIATE` in kanjiData | N4 |
| `BEGINNER` in vocabData | N5 |
| Grammar `level: "Beginner (N5)"` | N5 |
| Kana (all) | N5 |

The `progressService` maintains a mapping function — no changes to existing data files required.

### 5.3 JLPT Mastery Calculation

```
N5 Kanji mastery = (N5 kanji cards with ≥3 SRS repetitions) / (total N5 kanji cards) × 100
N5 Vocab mastery = (N5 vocab cards with ≥3 SRS repetitions) / (total N5 vocab cards) × 100
N5 Grammar mastery = (N5 grammar quizzes passed) / (total N5 grammar lessons) × 100
N5 Overall = average of kanji + vocab + grammar mastery
```

---

## 6. Implementation Plan

### Phase 1: Core Service
| Task | File | Description |
|------|------|-------------|
| **NEW** | `services/progressService.ts` | XP, levels, streaks, achievements, JLPT mastery |

Key functions:
- `loadProgress()` / `saveProgress()` — localStorage
- `addXP(amount, source)` — award XP, auto level-up, check achievements
- `updateStreak()` — extend or reset streak
- `checkAchievements()` — evaluate conditions, return newly unlocked
- `getJLPTMastery()` — calculate from SRS data + grammar quiz data
- `getLevelFromXP(xp)` — XP threshold curve

### Phase 2: Type Updates
| Task | File | Description |
|------|------|-------------|
| **MODIFY** | `types.ts` | Add `PROGRESS` to `AppMode` |
| **MODIFY** | `srsService.ts` | Call `addXP()` on review, delegate streak |

### Phase 3: UI Components
| Task | File | Description |
|------|------|-------------|
| **NEW** | `components/ProgressPage.tsx` | Full progress page with roadmap, achievements, chart |
| **NEW** | `components/AchievementToast.tsx` | Animated toast notification |
| **MODIFY** | `App.tsx` | Dashboard banner, Progress route, toast wiring |

### Phase 4: XP Integration
| Task | File | Description |
|------|------|-------------|
| **MODIFY** | `components/DrillMode.tsx` | Award XP on completion |
| **MODIFY** | `components/NumberDrillMode.tsx` | Award XP on completion |
| **MODIFY** | `components/DateDrillMode.tsx` | Award XP on completion |
| **MODIFY** | `components/ConjugationDrillMode.tsx` | Award XP on completion |
| **MODIFY** | `components/GrammarLibrary.tsx` | Award XP on quiz pass |
| **MODIFY** | `components/SRSReview.tsx` | Award XP on session complete |

---

## 7. Verification Plan

### Automated
- `npx tsc --noEmit` — zero TypeScript errors after all changes

### Manual Testing
1. Complete a kana drill → verify XP increases in dashboard banner
2. Close app, return next day → verify streak increments
3. Miss a day → verify streak resets to 0
4. Unlock an achievement → verify toast appears with animation
5. Complete all N5 grammar quizzes → verify N5 Grammar mastery = 100%
6. JLPT roadmap → verify mastery % matches actual SRS data
7. Weekly activity chart → verify bars match daily XP records
