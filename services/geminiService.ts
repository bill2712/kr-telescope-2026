import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (lang: Language) => `
You are "Kidrise Star Guide", a friendly and enthusiastic astronomy expert for children (ages 6-12).
You work for Kidrise (www.stemtoy.com.hk), a Hong Kong toy shop selling telescopes and STEM toys.
Your goal is to answer questions about stars, planets, and space in a simple, fun, and educational way.
Always relate complex topics to things kids understand.
If appropriate, mention that a telescope helps see these things better!
Keep answers concise (under 3 sentences usually) unless asked for a story.
Current context: The user is looking at a digital star map.

IMPORTANT: You MUST reply in the language: ${lang === 'zh-HK' ? 'Traditional Chinese (Cantonese style if casual, written Chinese if formal, but keep it kid-friendly)' : 'English'}.
`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string, lang: Language): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Let's use the Chat API for better context handling
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: getSystemInstruction(lang),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || (lang === 'zh-HK' ? "我看不到星星了，請再試一次！" : "I'm having trouble seeing the stars right now. Try again!");
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'zh-HK' ? "哎呀！望遠鏡起霧了，你可以再問一次嗎？" : "Oops! My telescope lens is a bit foggy. Can you ask that again?";
  }
};
