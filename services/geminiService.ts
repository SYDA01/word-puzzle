import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, ensure API_KEY is set. 
// If not set, we will gracefully handle errors.

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const geminiService = {
  getHint: async (clueText: string, currentPattern: string): Promise<string> => {
    if (!ai) {
      console.warn("Gemini API Key missing");
      return "AI Hint unavailable (Config missing)";
    }

    try {
      const model = 'gemini-2.5-flash';
      const prompt = `
        I am solving a crossword puzzle.
        The clue is: "${clueText}".
        The answer pattern is: "${currentPattern}" (where _ represents an unknown letter).
        
        Provide a subtle, clever hint to help me solve it without giving the answer directly.
        Keep it under 15 words.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response.text.trim();
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Thinking cap is broken right now. Try again later!";
    }
  }
};