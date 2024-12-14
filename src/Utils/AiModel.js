// Utils/AiModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_KEY;
const genAi = new GoogleGenerativeAI(apiKey);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const genAiConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const aiChat = model.startChat({
  generationConfig: genAiConfig,
  history: [],
});
