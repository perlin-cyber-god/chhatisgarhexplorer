import { GoogleGenAI, Chat } from "@google/genai";
import type { ItineraryParams } from '../types';

// Use Vite's environment variable handling for the frontend
const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error("VITE_API_KEY is not defined. Please check your .env file.");
}
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a travel itinerary based on user preferences.
 */
export const generateItinerary = async (params: ItineraryParams): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const prompt = `Create a personalized travel itinerary for Chhattisgarh, India.
  - Duration: ${params.days} days
  - Interests: ${params.interests.join(', ')}
  - Budget: ${params.budget}
  
  Provide a day-by-day plan. write in bulleted form whever necessary and make it attractive for user to read. For each day, suggest activities and places to visit that align with the user's interests.
  Be descriptive and engaging. Format the output as markdown, with each day starting with '**Day X: [Title]**'.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text ?? ''; // FIX: Ensure a string is always returned
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. The AI service may be temporarily unavailable.");
  }
};

/**
 * Generates a random folklore tale from Chhattisgarh.
 */
export const generateFolklore = async (): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Tell me a short, engaging, and family-friendly folklore tale or local legend from the tribal regions of Chhattisgarh, India.
    The story should be around 150-200 words.
    Start the story with a title formatted like '### The Legend of ...'`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text ?? ''; // FIX: Ensure a string is always returned
    } catch (error) {
        console.error("Error generating folklore:", error);
        throw new Error("Failed to generate folklore. The AI service may be temporarily unavailable.");
    }
};

/**
 * Fetches detailed information about a tribal item.
 */
export const getTribalDetail = async (itemName: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const prompt = `Provide a detailed, engaging description of "${itemName}" from Chhattisgarh, India.
    Explain its cultural significance, the process of how it's made or celebrated, and what makes it unique.
    Keep the tone informative and accessible for a tourist. The response should be 2-3 paragraphs long.
    Use markdown for formatting, like using **bold** for important terms.`;
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text ?? ''; // FIX: Ensure a string is always returned
    } catch (error) {
        console.error(`Error getting details for ${itemName}:`, error);
        throw new Error(`Failed to get details for ${itemName}. The AI service may be temporarily unavailable.`);
    }
};

// --- Chatbot Functionality ---

let chatInstance: Chat | null = null;

const getChatInstance = (): Chat => {
    if (!chatInstance) {
        const model = 'gemini-2.5-flash';
        chatInstance = ai.chats.create({
            model,
            config: {
                systemInstruction: `You are a friendly and helpful tour guide for Chhattisgarh, India.
                Your name is "CG-Bot".
                Your goal is to answer questions about Chhattisgarh tourism, including destinations, culture, food, travel tips, and local traditions.
                Keep your answers concise and friendly. If you don't know an answer, say so politely.
                Do not start the conversation. Wait for the user to message first.`,
            },
        });
    }
    return chatInstance;
}

/**
 * Sends a message to the chatbot and gets a response.
 */
export const sendMessageToBot = async (message: string): Promise<string> => {
  const chat = getChatInstance();
  try {
    const response = await chat.sendMessage({ message });
    return response.text ?? ''; // FIX: Ensure a string is always returned
  } catch (error) {
    console.error("Error in chat conversation:", error);
    chatInstance = null;
    throw new Error("I'm having trouble connecting right now. Please try again in a moment.");
  }
};