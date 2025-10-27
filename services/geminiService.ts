// This file centralizes all interactions with the Google Gemini API.
import { GoogleGenAI, Chat } from "@google/genai";
import type { ItineraryParams } from '../types';

// CRITICAL FIX: Use Vite's method for accessing environment variables on the frontend.
const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error("VITE_API_KEY environment variable not set. Please create a .env file.");
}
const ai = new GoogleGenAI({ apiKey });


// This creates a persistent, stateful chat session.
let chat: Chat | null = null;

const initializeChat = () => {
  if (!chat) {
      chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: `You are a friendly and helpful tour guide for Chhattisgarh, India. 
              Your goal is to assist tourists. Answer questions about destinations, culture, food, travel, and local tips. 
              Keep your answers concise and engaging for a mobile chat interface.`,
          },
      });
  }
  return chat;
};

/**
* Sends a message to the chatbot and returns the response.
*/
export const sendMessageToChatbot = async (message: string): Promise<string> => {
  const chatSession = initializeChat();
  try {
      const result = await chatSession.sendMessage({ message });
      return result.text;
  } catch (error) {
      console.error("Error sending message to chatbot:", error);
      // Reset chat on error in case session is bad
      chat = null;
      throw new Error("Failed to get response from chatbot. The AI service may be temporarily unavailable.");
  }
};

/**
 * Generates a travel itinerary based on user preferences.
 */
export const generateItinerary = async (params: ItineraryParams): Promise<string> => {
  const { days, interests, budget } = params;
  const prompt = `Create a detailed, day-by-day travel itinerary for a ${days}-day trip to Chhattisgarh, India.
  The traveler is interested in: ${interests.join(', ')}.
  Their budget is ${budget}.
  For each day, suggest activities, places to visit, and potential food experiences.
  Format the output as clean markdown, with "##" for day titles (e.g., "## Day 1: Arrival in Raipur") and "###" for main activities. Use bullet points for details.
  Make it sound exciting and welcoming for a tourist.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. The AI service may be temporarily unavailable.");
  }
};

/**
 * Generates a short, local folktale from Chhattisgarh.
 */
export const generateFolklore = async (): Promise<string> => {
    const prompt = `Tell me a short, captivating local legend or folktale from the tribal regions of Chhattisgarh, India.
    The story should be suitable for a tourist audience.
    Format the response as clean markdown, with a "###" for the story's title.`;
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error generating folklore:", error);
      throw new Error("Failed to generate folklore. The AI service may be temporarily unavailable.");
    }
};

/**
 * Generates a detailed description for a specific tribal cultural item.
 */
export const getTribalDetail = async (itemName: string): Promise<string> => {
  const prompt = `You are a cultural expert for a tourism app.
  In a brief and engaging manner (2-3 paragraphs), explain "${itemName}" of Chhattisgarh, India.
  Describe what it is, its cultural significance, and what makes it unique.
  Make it interesting for a tourist who knows nothing about it.
  Format the response as clean markdown. Do not include a title.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error generating details for ${itemName}:`, error);
    throw new Error(`Failed to get details for ${itemName}.`);
  }
};
