import type { HiddenGem } from '../types';

/**
 * Fetches hidden gems from the database via a backend API.
 * 
 * NOTE FOR PROJECT SUBMISSION:
 * This function now makes a real network request to a backend API. 
 * Before this will work, you must create and run a simple backend server (e.g., Node.js/Express)
 * that connects to your MongoDB instance and exposes the data at the '/api/gems' endpoint.
 * 
 * This demonstrates the complete, secure architecture for a full-stack application.
 */
export const fetchHiddenGems = async (): Promise<HiddenGem[]> => {
  console.log("Fetching hidden gems from backend API...");

  const API_URL = 'http://localhost:3001/api/gems'; // The URL of your running backend

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch hidden gems:", error);
    // Provide a user-friendly error message
    throw new Error("Failed to load hidden gems from the server. Please ensure the backend is running.");
  }
};
