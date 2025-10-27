import type { HiddenGem } from '../types';

// This logic determines which backend to talk to.
// During local development (`npm run dev`), it uses localhost.
// When hosted on Vercel, it will use your live backend URL.
const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-backend-url-goes-here.onrender.com' // IMPORTANT: Replace this with your live backend URL from Render.
  : 'http://localhost:3001';

/**
 * Fetches the list of hidden gems from the backend server.
 */
export const fetchHiddenGems = async (): Promise<HiddenGem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/gems`);
  if (!response.ok) {
    throw new Error('Failed to fetch hidden gems from the server.');
  }
  return response.json();
};

/**
 * Submits a new hidden gem to the backend server.
 * @param gemData - The data for the new gem, excluding the _id.
 * @returns The newly created gem document from the database.
 */
export const submitHiddenGem = async (gemData: Omit<HiddenGem, '_id'>): Promise<HiddenGem> => {
  const response = await fetch(`${API_BASE_URL}/api/gems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gemData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit the hidden gem.');
  }
  return response.json();
};
