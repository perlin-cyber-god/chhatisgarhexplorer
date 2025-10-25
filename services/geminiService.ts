import { GoogleGenAI } from "@google/genai";
import type { ItineraryParams } from '../types';

// Per guidelines, API key must be from the environment.
// Vite exposes this via import.meta.env
const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error("VITE_API_KEY is not set. Please create a .env file in the root of the project.");
}
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a travel itinerary using the Gemini API.
 * @param params - The parameters for the itinerary.
 * @returns A string containing the generated itinerary in Markdown format.
 */
export const generateItinerary = async (params: ItineraryParams): Promise<string> => {
  const { days, interests, budget } = params;
  
  const prompt = `Create a detailed ${days}-day travel itinerary for a trip to Chhattisgarh, India. 
The traveler's interests are: ${interests.join(', ')}.
The trip should be planned for a ${budget} budget.
Provide a day-by-day plan with suggestions for places to visit, activities, and potential food to try.
Make sure the output is well-structured using Markdown, with headings for each day.`;

  try {
    // Per guidelines, use ai.models.generateContent
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Basic text task
        contents: prompt,
    });
    // Per guidelines, use response.text
    return response.text;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. The AI service may be temporarily unavailable.');
  }
};

/**
 * Generates a short folktale from Chhattisgarh using the Gemini API.
 * @returns A string containing the generated story in Markdown format.
 */
export const generateFolklore = async (): Promise<string> => {
  const prompt = `Tell me a short, captivating local legend or folktale from the Chhattisgarh region of India. The story should be mysterious, magical, or related to nature and tribal beliefs. Keep it concise, around 150-200 words. Format the output with a title in Markdown (e.g., "### The Legend of the River Goddess").`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating folklore:', error);
    throw new Error('Failed to generate folklore. The AI service may be temporarily unavailable.');
  }
};