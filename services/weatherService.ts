import type { WeatherInfo } from '../types';
import { CHHATTISGARH_CITIES } from '../constants';

const mockWeatherConditions: Omit<WeatherInfo, 'city'>[] = [
  { temperature: 32, condition: 'Sunny', description: "Clear skies and bright sun. Perfect for sightseeing!" },
  { temperature: 28, condition: 'Cloudy', description: "Partly cloudy with pleasant weather." },
  { temperature: 25, condition: 'Rainy', description: "Light showers expected. Don't forget your umbrella!" },
  { temperature: 29, condition: 'Sunny', description: "Hot and sunny day." },
  { temperature: 22, condition: 'Rainy', description: "Heavy rainfall warning. Best to stay indoors." },
  { temperature: 26, condition: 'Cloudy', description: "Overcast skies but dry." },
  { temperature: 24, condition: 'Stormy', description: "Thunderstorms expected in the afternoon." },
];

/**
 * Fetches weather for a specific city.
 * 
 * NOTE FOR PROJECT SUBMISSION:
 * This is a mock service. In a real-world application, this function would make a network 
 * request to a weather API (like OpenWeatherMap or AccuWeather) using an API key.
 * 
 * For this project, we are simulating the API call by returning random weather data
 * to demonstrate the functionality of the "Weather" section.
 */
export const fetchWeatherForCity = async (city: string): Promise<WeatherInfo> => {
  console.log(`Simulating API call to fetch weather for ${city}...`);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Return a consistent-ish random weather condition based on the city name's index
  const cityIndex = CHHATTISGARH_CITIES.indexOf(city);
  const condition = mockWeatherConditions[cityIndex % mockWeatherConditions.length];

  return {
    city,
    ...condition,
  };
};
