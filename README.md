<div align="center">
<img width="100" height="100" alt="NihongoFlow Logo" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# NihongoFlow

**A minimalist Japanese learning app with AI-powered features**

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev)
[![Capacitor](https://img.shields.io/badge/Capacitor-6-green)](https://capacitorjs.com)

</div>

---

## Features

- **Kana Practice** — Master Hiragana & Katakana with interactive drills
- **Kanji Explorer** — Thematic character drills by JLPT level
- **Vocabulary Builder** — Essential words organized by category
- **Grammar Library** — Structured lessons with quizzes
- **AI Lab** — Infinite AI-generated grammar lessons
- **Kaiwa AI** — Conversation practice in realistic scenarios
- **Image Analyzer** — Scan and translate Japanese text from photos

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI**: Google Gemini API
- **Mobile**: Capacitor (Android/iOS)
- **Build**: Vite 6

---

## Getting Started

### Prerequisites

- Node.js 18+
- (For Android) Android Studio with SDK installed

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nihongoflow.git
cd nihongoflow

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file:

```
GEMINI_API_KEY=your_gemini_api_key
```

Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## Android Build

### Build for Android

```bash
# Build web assets and sync with Capacitor
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android
```

### Build APK

1. Open the project in Android Studio
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Find APK in `android/app/build/outputs/apk/debug/`

### Run on Device

```bash
# With connected device or emulator
npx cap run android
```

---

## Project Structure

```
nihongoflow/
├── App.tsx              # Main app component
├── components/          # UI components
│   ├── DrillMode.tsx    # Practice drill interface
│   ├── KanaSelect.tsx   # Kana character selection
│   ├── KaiwaMode.tsx    # AI conversation mode
│   └── ...
├── services/            # API services
├── android/             # Capacitor Android project
├── capacitor.config.ts  # Capacitor configuration
└── vite.config.ts       # Vite configuration
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run cap:sync` | Sync web assets to native projects |
| `npm run android` | Build and open Android project |

---

## License

MIT © NihongoFlow
