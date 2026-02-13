/**
 * NihongoFlow — TTS Service
 * Uses @capacitor-community/text-to-speech for native TTS.
 * Works on Android (native engine) and Web (Web Speech API fallback).
 */

import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Speak Japanese text aloud using the device's native TTS engine.
 * 
 * @param text - Japanese text (hiragana, katakana, or kanji)
 * @param rate - Speech rate (0.5–2.0). Default 0.8 for learners.
 */
export async function speakJapanese(text: string, rate: number = 0.8): Promise<void> {
    if (!text) return;

    try {
        await TextToSpeech.speak({
            text,
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
