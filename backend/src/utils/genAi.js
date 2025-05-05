import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGenAi = async () => {
    const MODEL_NAME = "gemini-1.5-flash-8b";
    const API_KEY = process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = await genAI.getGenerativeModel({model: MODEL_NAME});
    
    return model;
};