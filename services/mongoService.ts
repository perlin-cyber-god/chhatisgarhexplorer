import type { HiddenGem } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches all hidden gems from the backend server.
 */
export const fetchHiddenGems = async (): Promise<HiddenGem[]> => {
  console.log('Fetching hidden gems from backend API...');
  const response = await fetch(`${API_BASE_URL}/gems`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * Submits a new hidden gem to the backend server.
 * @param gemData - The gem data to submit, excluding the MongoDB _id.
 * @returns The newly created gem document, including the _id from the database.
 */
export const submitHiddenGem = async (gemData: Omit<HiddenGem, '_id'>): Promise<HiddenGem> => {
  console.log('Submitting new gem to backend API...');
  const response = await fetch(`${API_BASE_URL}/gems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gemData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit gem');
  }
  return response.json();
};
