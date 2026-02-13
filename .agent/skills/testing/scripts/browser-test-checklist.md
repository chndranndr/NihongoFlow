# NihongoFlow — Browser Test Checklist

Use the browser subagent to execute these tests against `http://localhost:5173`.

---

## 1. Dashboard & Navigation

### 1.1 Dashboard Loads
- [ ] Navigate to `http://localhost:5173`
- [ ] Verify the dashboard renders with the NihongoFlow title/header
- [ ] Verify all mode cards/buttons are visible (Kana, Kanji, Vocab, Numbers, Dates, Conjugation, Grammar, AI Grammar, Kaiwa, Image Analyzer, SRS Review, SRS Stats)
- [ ] Verify no console errors on load

### 1.2 Dark Mode Toggle
- [ ] Click the dark mode toggle (Sun/Moon icon)
- [ ] Verify background, text, and card colors change to dark theme
- [ ] Toggle back to light mode
- [ ] Verify colors revert correctly
- [ ] Refresh the page and verify theme persists (stored in localStorage)

### 1.3 Back Navigation
- [ ] Click any drill mode button (e.g., "Kana")
- [ ] Verify the mode screen loads
- [ ] Click the back button
- [ ] Verify you return to the dashboard

---

## 2. Kana Drills

### 2.1 Kana Selection Screen
- [ ] Click "Kana" from the dashboard
- [ ] Verify hiragana/katakana character grid is displayed
- [ ] Verify selection checkboxes or toggle groups work
- [ ] Select a subset of characters
- [ ] Click "Start Drill"
- [ ] Verify drill mode loads with only selected characters

### 2.2 Drill Flow
- [ ] Verify a character is shown as the question
- [ ] Type a romaji answer in the input field
- [ ] Press Enter or click Submit
- [ ] Verify correct answer shows green feedback
- [ ] Type an incorrect answer
- [ ] Verify incorrect answer shows red feedback with the correct answer
- [ ] Verify progress counter updates
- [ ] Complete the drill and verify summary screen appears

---

## 3. Kanji & Vocab Drills

### 3.1 Category Selection
- [ ] Click "Kanji" (or "Vocab") from dashboard
- [ ] Verify difficulty levels are shown
- [ ] Select a difficulty level
- [ ] Verify categories within that level are shown
- [ ] Click a category
- [ ] Verify the drill starts OR category detail is shown

### 3.2 Drill Mechanics
- [ ] Verify kanji/vocab character is displayed prominently
- [ ] Verify input accepts romaji
- [ ] Verify alternate readings are accepted
- [ ] Verify meaning is shown after answering
- [ ] Verify onyomi/kunyomi are shown when available (kanji)

---

## 4. Number Drills

### 4.1 Setup Screen
- [ ] Click "Numbers" from the dashboard
- [ ] Verify setup screen with range presets (1-10, 1-100, etc.)
- [ ] Verify direction toggle (Japanese→Number, Number→Japanese)
- [ ] Verify item count slider/input
- [ ] Select a preset and click Start

### 4.2 Drill Flow
- [ ] In JP→Number mode: verify Japanese number shown, user types numeral
- [ ] In Number→JP mode: verify numeral shown, user types romaji
- [ ] Verify correct/incorrect feedback
- [ ] Verify special readings are correct in displayed answers (e.g., さんびゃく for 300)

---

## 5. Date Drills

### 5.1 Days of Week Mode
- [ ] Click "Dates" from dashboard → select "Days of Week"
- [ ] Verify all 7 days are drilled
- [ ] Verify correct romaji (e.g., にちようび → nichiyoubi)

### 5.2 Full Date Mode
- [ ] Select "Full Date" mode with a year range
- [ ] Verify dates display correctly (year + month + day + day-of-week)
- [ ] Verify special day counter readings (ついたち, ふつか, etc.)

---

## 6. Conjugation Drills

### 6.1 Setup Screen
- [ ] Click "Conjugation" from dashboard
- [ ] Verify word type toggle (Verb / Adjective)
- [ ] For Verbs: verify verb type checkboxes (Godan, Ichidan, Irregular)
- [ ] For Adjectives: verify adjective type checkboxes (i-adj, na-adj)
- [ ] Verify form selection (Masu, Te, Negative, Past, etc.)
- [ ] Verify item count control
- [ ] Click Start

### 6.2 Drill Flow
- [ ] Verify question shows: dictionary form + target form label
- [ ] Verify input accepts romaji of conjugated form
- [ ] Verify correct answer displays kanji, hiragana, and romaji
- [ ] Test with different verb types to ensure variety

---

## 7. Grammar Library

### 7.1 Browse Lessons
- [ ] Click "Grammar Library" from dashboard
- [ ] Verify lessons are listed by JLPT level
- [ ] Click a lesson
- [ ] Verify explanation, examples (Japanese + romaji + English), and quiz load

### 7.2 Quiz
- [ ] Verify quiz shows a fill-in-the-blank question
- [ ] Verify 4 options are displayed
- [ ] Click the correct answer → verify green feedback
- [ ] Click a wrong answer → verify red feedback + correct answer highlighted

---

## 8. AI Features (requires API key)

### 8.1 API Key Management
- [ ] Click "AI Grammar" or "Kaiwa" without an API key set
- [ ] Verify the API key modal appears
- [ ] Enter a key and save
- [ ] Verify the modal closes and the feature loads
- [ ] Open Settings and verify the key can be removed

### 8.2 AI Grammar (if key available)
- [ ] Verify a grammar lesson is generated
- [ ] Verify it includes explanation, examples, and quiz
- [ ] Verify the quiz is interactive

### 8.3 Kaiwa Mode (if key available)
- [ ] Verify conversation starts with AI introduction
- [ ] Type a message and send
- [ ] Verify AI responds in Japanese
- [ ] Verify multi-turn conversation works

### 8.4 Image Analyzer (if key available)
- [ ] Verify image upload interface works
- [ ] Upload/capture an image with Japanese text
- [ ] Verify translation and word breakdown are displayed

---

## 9. SRS System

### 9.1 SRS Review
- [ ] Click "SRS Review" from dashboard
- [ ] Verify cards are loaded (or initialized on first visit)
- [ ] Answer a card correctly → verify it's marked reviewed
- [ ] Answer a card incorrectly → verify it reappears soon
- [ ] Complete a session → verify streak updates

### 9.2 SRS Stats
- [ ] Click "SRS Stats" from dashboard
- [ ] Verify total cards count
- [ ] Verify due today count
- [ ] Verify streak display
- [ ] Verify learned vs new cards breakdown

---

## 10. Responsive & Cross-Cutting

### 10.1 Mobile Viewport
- [ ] Resize browser to 375px width
- [ ] Verify no horizontal scroll
- [ ] Verify all buttons/cards are tappable
- [ ] Verify text doesn't overflow

### 10.2 Console Errors
- [ ] Open browser DevTools Console
- [ ] Navigate through all modes
- [ ] Verify no JavaScript errors appear (ignore React dev mode warnings)

### 10.3 LocalStorage
- [ ] Clear localStorage
- [ ] Reload the app
- [ ] Verify app initializes cleanly with defaults
- [ ] Verify dark mode defaults to system preference
