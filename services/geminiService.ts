import { GoogleGenAI, Type, Chat } from "@google/genai";
import { GrammarLesson, DifficultyLevel } from "../types";

const STORAGE_KEY = 'gemini_api_key';
const TEXT_MODEL_NAME = 'gemini-3-flash-preview';
// User specifically requested gemini-3-pro-preview for image analysis
const IMAGE_MODEL_NAME = 'gemini-3-pro-preview';

/**
 * Retrieves the API key from local storage or environment variable.
 */
export const getApiKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEY) || null;
};

/**
 * Saves the API key to local storage.
 */
export const saveApiKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY, key);
};

/**
 * Removes the API key from local storage.
 */
export const removeApiKey = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Helper to get an authenticated AI instance.
 * Throws an error if no key is found.
 */
const getAIClient = (): GoogleGenAI => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key not found. Please add your Gemini API Key in settings.");
  }
  return new GoogleGenAI({ apiKey });
};

export interface ImageAnalysisResult {
  fullTranslation: string;
  breakdown: {
    word: string;
    furigana: string;
    role: string;
    baseForm: string;
    attributes: string;
    meaning: string;
  }[];
}

/**
 * Analyzes a Japanese image to provide translation and breakdown.
 */
export const analyzeJapaneseImage = async (base64Image: string, mimeType: string): Promise<ImageAnalysisResult | null> => {
  try {
    const ai = getAIClient();

    const prompt = `Analyze the Japanese text in this image. 
    1. Translate the full text into natural English.
    2. Break down every single word/token in the text into a table format.
    
    For the breakdown, provide:
    - The word as it appears
    - Furigana (reading in Hiragana)
    - Grammatical Role (e.g., Noun, Particle, Verb - Ichidan)
    - Verb/Adjective Base Form (Dictionary form). If not applicable, use '-'.
    - Attributes/Inflection (e.g., Passive, Causative, Past Tense, Polite/Masu-form). If simple, describe it.
    - English Meaning of that specific word.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        fullTranslation: { type: Type.STRING, description: "The full English translation of the text." },
        breakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: "The word/token from the image" },
              furigana: { type: Type.STRING, description: "Reading in hiragana" },
              role: { type: Type.STRING, description: "Part of speech/Grammatical role" },
              baseForm: { type: Type.STRING, description: "Dictionary form if verb/adj, else '-'" },
              attributes: { type: Type.STRING, description: "Active/Passive, Tense, Politeness level" },
              meaning: { type: Type.STRING, description: "English meaning of this specific token" },
            },
            required: ["word", "furigana", "role", "baseForm", "attributes", "meaning"],
          },
        },
      },
      required: ["fullTranslation", "breakdown"],
    };

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2, // Low temperature for factual analysis
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as ImageAnalysisResult;
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    throw error;
  }
};

/**
 * Generates a grammar lesson and quiz using AI.
 */
export const generateAIGrammarLesson = async (level: DifficultyLevel): Promise<GrammarLesson | null> => {
  try {
    const ai = getAIClient();

    const prompt = `Create a unique Japanese grammar lesson for a grammar point suitable for ${level}. Do not use common basic ones like 'wa' or 'no' if possible, try to find something interesting but appropriate for the level. Include an explanation, examples, and a multiple-choice fill-in-the-blank quiz question.`;

    const grammarSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "The name of the grammar point" },
        level: { type: Type.STRING, description: "The JLPT level" },
        explanation: { type: Type.STRING, description: "A clear, concise explanation." },
        examples: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              japanese: { type: Type.STRING, description: "Japanese sentence" },
              romaji: { type: Type.STRING, description: "Romaji reading" },
              english: { type: Type.STRING, description: "English translation" },
            },
            required: ["japanese", "english", "romaji"],
          },
        },
        quiz: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "Quiz sentence with a blank (___)" },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 options" },
            correctAnswerIndex: { type: Type.INTEGER, description: "Index (0-3) of correct answer" },
          },
          required: ["question", "options", "correctAnswerIndex"],
        },
      },
      required: ["title", "level", "explanation", "examples", "quiz"],
    };

    const response = await ai.models.generateContent({
      model: TEXT_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: grammarSchema,
        temperature: 0.85,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const data = JSON.parse(text);
    return { ...data, id: `ai-${Date.now()}` } as GrammarLesson;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

/**
 * Starts a Kaiwa (Conversation) session.
 */
export const startKaiwaSession = (level: DifficultyLevel, scenario: string): Chat => {
  const ai = getAIClient();

  return ai.chats.create({
    model: TEXT_MODEL_NAME,
    config: {
      systemInstruction: `You are a friendly and helpful Japanese conversation partner (Sensei). 
      Target Level: ${level}. 
      Scenario: ${scenario}.
      
      Rules:
      1. Speak primarily in Japanese suitable for the target level.
      2. If the user makes a mistake, gently correct them in English parentheses at the end of your response, but keep the conversation flow natural.
      3. Keep responses concise (1-3 sentences) to encourage back-and-forth dialogue.
      4. Use Kanji appropriate for the level, but you can include Furigana (in parentheses) for difficult words if helpful, or just stick to level-appropriate writing.
      5. Start by introducing the scenario and asking a question.`
    }
  });
};
