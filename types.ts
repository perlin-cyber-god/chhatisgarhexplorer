export interface Destination {
  name: string;
  description: string;
  image: string;
  lat: number;
  lon: number;
}

export interface TribalItem {
  name: string;
  description: string;
  image: string;
}

export interface ItineraryParams {
  days: number;
  interests: string[];
  budget: string;
}

export interface HiddenGem {
  _id?: string; // MongoDB ID is optional on the client
  name: string;
  description: string;
  imageUrl: string;
  submittedBy: string;
  tags: string[];
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  description: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
