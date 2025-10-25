import { GoogleGenAI } from "@google/genai";
import type { ItineraryParams } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateItinerary = async (params: ItineraryParams): Promise<string> => {
  const { days, interests, budget } = params;

  const prompt = `
    You are an expert travel guide for Chhattisgarh, India, known for creating exciting and practical itineraries.
    Generate a detailed, day-by-day travel itinerary based on the following user preferences.
    The response MUST be in Markdown format.
    
    For each day, suggest activities, places to visit, and local food to try. Make the descriptions engaging and appealing.
    Include a catchy title for the entire itinerary.

    **User Preferences:**
    - **Duration:** ${days} days
    - **Traveler Interests:** ${interests.join(', ')}
    - **Budget:** ${budget}

    **Output Structure:**
    - Start with a main title using a level 2 heading (##).
    - For each day, use a level 3 heading (###) like "Day 1: Arrival and Local Wonders".
    - Use bullet points (-) for activities, sights, and food suggestions for each day.
    - Keep the language inspiring and friendly.
    - Ensure the itinerary is logical and geographically feasible for the given duration.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Sorry, I couldn't generate an itinerary at the moment. Please try again later.";
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  const fullPrompt = `A beautiful, vibrant digital painting of: "${prompt}". The style should be inspired by the traditional art forms of Chhattisgarh, India, like Gond and Dhokra art, with intricate patterns and bold colors.`;
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Could not generate image. Please try again.");
  }
};
