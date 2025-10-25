import type { HiddenGem } from '../types';

// This is mock data that mirrors the MongoDB schema you should create.
// In a real application, this data would live in your MongoDB database.
const mockGems: HiddenGem[] = [
  {
    name: "Tamra Ghoomar Waterfalls",
    description: "A serene and lesser-known multi-tiered waterfall near Chitrakote, perfect for a peaceful day trip and photography.",
    imageUrl: "https://picsum.photos/seed/tamra/800/600",
    submittedBy: "Anjali S.",
    tags: ["Waterfall", "Nature", "Picnic"]
  },
  {
    name: "Gadiya Mountain",
    description: "A historic mountain in Kanker that was once a king's capital. It offers great trekking and a panoramic view from the top.",
    imageUrl: "https://picsum.photos/seed/gadiya/800/600",
    submittedBy: "Vikram P.",
    tags: ["Trekking", "History", "Viewpoint"]
  },
  {
    name: "Kotumsar Cave",
    description: "Located within Kanger Valley National Park, these stunning limestone caves are famous for their stalactite and stalagmite formations.",
    imageUrl: "https://picsum.photos/seed/kotumsar/800/600",
    submittedBy: "Riya N.",
    tags: ["Adventure", "Nature", "Caving"]
  },
  {
    name: "Bhoramdeo Temple",
    description: "Often called the 'Khajuraho of Chhattisgarh', this 11th-century temple complex boasts exquisitely carved erotic sculptures and serene surroundings.",
    imageUrl: "https://picsum.photos/seed/bhoramdeo/800/600",
    submittedBy: "Arjun K.",
    tags: ["History", "Temple", "Architecture"]
  }
];

/**
 * Fetches hidden gems from the database.
 * 
 * NOTE FOR PROJECT SUBMISSION:
 * In a real-world application, this function would make a network request to a backend API 
 * endpoint (e.g., using `fetch('/api/gems')`). The backend would then connect to your
 * MongoDB instance using your MONGODB_URI, query the 'gems' collection, and return the data.
 * 
 * For this frontend-only project, we are simulating the API call to demonstrate the 
 * end-to-end functionality of the "Hidden Gems" section.
 */
export const fetchHiddenGems = async (): Promise<HiddenGem[]> => {
  console.log("Simulating API call to fetch hidden gems from MongoDB...");
  
  // Simulate a network delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // To test the error state, you can uncomment the following lines:
  // if (Math.random() > 0.8) { 
  //   throw new Error("Failed to connect to the server. Please try again later.");
  // }

  return mockGems;
};
