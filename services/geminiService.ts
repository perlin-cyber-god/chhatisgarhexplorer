import { GoogleGenAI } from '@google/genai';
import type { ItineraryParams } from '../types';

// FIX: Initialize GoogleGenAI with a named apiKey parameter as per the guidelines.
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a travel itinerary based on user preferences.
 */
export const generateItinerary = async (params: ItineraryParams): Promise<string> => {
  const { days, interests, budget } = params;
  const prompt = `Create a ${days}-day travel itinerary for Chhattisgarh, India.
Focus on these interests: ${interests.join(', ')}.
The budget is ${budget}.
Provide a detailed day-by-day plan. Format the output as clean markdown.`;

  try {
    // FIX: Use ai.models.generateContent as per the guidelines.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    // FIX: Access the response text directly from the .text property.
    return response.text;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};

/**
 * Sends a message to the chatbot and gets a response.
 */
export const sendMessageToChatbot = async (message: string): Promise<string> => {
    const prompt = `A user has sent the following message: "${message}". Provide a concise and helpful response.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are a friendly and knowledgeable tour guide for Chhattisgarh, India. Keep your answers concise and relevant to tourism in the region."
            }
        });
        return response.text;
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        throw new Error('Failed to get a response from the chatbot.');
    }
};

/**
 * Generates a short, local folklore story from Chhattisgarh.
 */
export const generateFolklore = async (): Promise<string> => {
    const prompt = `Tell me a short, engaging, and lesser-known folklore story or legend from the tribal regions of Chhattisgarh, India. The story should be suitable for a general audience. Start the story with a title formatted like '### Title'.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error('Error generating folklore:', error);
        throw new Error('Failed to generate a folklore story.');
    }
};

/**
 * Gets detailed information about a tribal item.
 */
export const getTribalDetail = async (topic: string): Promise<string> => {
    const prompt = `Provide a detailed and interesting overview of "${topic}" from Chhattisgarh, India. Cover its cultural significance, the process of making it (if applicable), and its relevance today. Format the response as a few paragraphs of markdown text. Use markdown for bolding key terms.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error(`Error getting details for ${topic}:`, error);
        throw new Error(`Failed to get details for ${topic}.`);
    }
};
