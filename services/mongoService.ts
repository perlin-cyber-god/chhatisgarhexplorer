import type { HiddenGem } from '../types';

// The backend server is expected to be running on this URL.
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches all hidden gems from the backend server.
 */
export const fetchHiddenGems = async (): Promise<HiddenGem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gems`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gems: HiddenGem[] = await response.json();
    return gems;
  } catch (error) {
    console.error("Failed to fetch hidden gems:", error);
    // Re-throw the error to be handled by the calling component
    throw new Error("Could not connect to the server to fetch hidden gems.");
  }
};

/**
 * Submits a new hidden gem to the backend server.
 * The gem data includes a base64 encoded image URL.
 */
export const submitHiddenGem = async (gemData: Omit<HiddenGem, '_id' | 'aiTags' | 'aiInsight'>): Promise<HiddenGem> => {
    try {
        const response = await fetch(`${API_BASE_URL}/gems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gemData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const newGem: HiddenGem = await response.json();
        return newGem;
    } catch (error) {
        console.error("Failed to submit hidden gem:", error);
        throw new Error("Could not submit your hidden gem. Please check your connection and try again.");
    }
};
