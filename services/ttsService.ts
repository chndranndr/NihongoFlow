/**
 * NihongoFlow — TTS Service
 * Uses @capacitor-community/text-to-speech for native TTS.
 * Works on Android (native engine) and Web (Web Speech API fallback).
 */

import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Convert Romaji to Katakana for Onyomi TTS playback.
 */
function romajiToKatakana(romaji: string): string {
    const mapping: Record<string, string> = {
        'kya':'キャ', 'kyu':'キュ', 'kyo':'キョ',
        'sha':'シャ', 'shu':'シュ', 'sho':'ショ',
        'cha':'チャ', 'chu':'チュ', 'cho':'チョ',
        'nya':'ニャ', 'nyu':'ニュ', 'nyo':'ニョ',
        'hya':'ヒャ', 'hyu':'ヒュ', 'hyo':'ヒョ',
        'mya':'ミャ', 'myu':'ミュ', 'myo':'ミョ',
        'rya':'リャ', 'ryu':'リュ', 'ryo':'リョ',
        'gya':'ギャ', 'gyu':'ギュ', 'gyo':'ギョ',
        'ja':'ジャ', 'ju':'ジュ', 'jo':'ジョ',
        'bya':'ビャ', 'byu':'ビュ', 'byo':'ビョ',
        'pya':'ピャ', 'pyu':'ピュ', 'pyo':'ピョ',
        'ka':'カ', 'ki':'キ', 'ku':'ク', 'ke':'ケ', 'ko':'コ',
        'sa':'サ', 'shi':'シ', 'su':'ス', 'se':'セ', 'so':'ソ',
        'ta':'タ', 'chi':'チ', 'tsu':'ツ', 'te':'テ', 'to':'ト',
        'na':'ナ', 'ni':'ニ', 'nu':'ヌ', 'ne':'ネ', 'no':'ノ',
        'ha':'ハ', 'hi':'ヒ', 'fu':'フ', 'he':'ヘ', 'ho':'ホ',
        'ma':'マ', 'mi':'ミ', 'mu':'ム', 'me':'メ', 'mo':'モ',
        'ya':'ヤ', 'yu':'ユ', 'yo':'ヨ',
        'ra':'ラ', 'ri':'リ', 'ru':'ル', 're':'レ', 'ro':'ロ',
        'wa':'ワ', 'wo':'ヲ', 'n':'ン',
        'ga':'ガ', 'gi':'ギ', 'gu':'グ', 'ge':'ゲ', 'go':'ゴ',
        'za':'ザ', 'ji':'ジ', 'zu':'ズ', 'ze':'ゼ', 'zo':'ゾ',
        'da':'ダ', 'dji':'ヂ', 'dzu':'ヅ', 'de':'デ', 'do':'ド',
        'ba':'バ', 'bi':'ビ', 'bu':'ブ', 'be':'ベ', 'bo':'ボ',
        'pa':'パ', 'pi':'ピ', 'pu':'プ', 'pe':'ペ', 'po':'ポ',
        'a':'ア', 'i':'イ', 'u':'ウ', 'e':'エ', 'o':'オ'
    };

    let result = romaji.toLowerCase();
    // Special case for double consonants (small tsu)
    result = result.replace(/([ksthpmrgyzbpdj])\1/g, 'ッ$1');
    
    // Sort keys by length to replace multi-char first
    const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        result = result.split(key).join(mapping[key]);
    }
    
    // Convert any remaining single hyphens or spaces to empty or keep them
    return result;
}

/**
 * Speak Japanese text aloud using the device's native TTS engine.
 * 
 * @param text - Japanese text (hiragana, katakana, romaji or kanji)
 * @param rate - Speech rate (0.5–2.0). Default 0.8 for learners.
 */
export async function speakJapanese(text: string, rate: number = 0.8): Promise<void> {
    if (!text) return;

    // If text contains only english letters and hyphens, convert to katakana
    // assuming it is Romaji Onyomi or Kunyomi for a drill item.
    let speechText = text;
    if (/^[A-Za-z\-]+$/.test(text)) {
        speechText = romajiToKatakana(text.replace(/-/g, ''));
    }

    try {
        await TextToSpeech.speak({
            text: speechText,
            lang: 'ja-JP',
            rate,
            pitch: 1.0,
            volume: 1.0,
            category: 'ambient',
        });
    } catch (err) {
        console.warn('[TTS] Speech failed:', err);
    }
}

/**
 * Stop any in-progress speech.
 */
export async function stopSpeaking(): Promise<void> {
    try {
        await TextToSpeech.stop();
    } catch {
        // Ignore — might not be speaking
    }
}

/**
 * Check if Japanese is supported on this device.
 */
export async function isJapaneseSupported(): Promise<boolean> {
    try {
        const { supported } = await TextToSpeech.isLanguageSupported({ lang: 'ja-JP' });
        return supported;
    } catch {
        return false;
    }
}
