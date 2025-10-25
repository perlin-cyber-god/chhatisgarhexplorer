import React, { useState, useEffect, useMemo } from 'react';
import { fetchWeatherForCity } from '../services/weatherService';
import type { WeatherInfo } from '../types';
import { CHHATTISGARH_CITIES } from '../constants';

const WeatherIcon: React.FC<{ condition: WeatherInfo['condition'], className?: string }> = ({ condition, className = "w-24 h-24" }) => {
  const icons = {
    Sunny: <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    Cloudy: <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    Rainy: <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3M3 15a4 4 0 0 0 4 4h9a5 5 0 1 0-.1-9.999 5.002 5.002 0 1 0-9.78 2.096A4.001 4.001 0 0 0 3 15Z" /></svg>,
    Stormy: <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>,
  };
  return icons[condition] || null;
};

const Weather: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Raipur');
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const sortedCities = useMemo(() => CHHATTISGARH_CITIES.sort(), []);

  useEffect(() => {
    const loadWeather = async () => {
      if (!selectedCity) return;
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchWeatherForCity(selectedCity);
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not fetch weather data.');
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadWeather();
  }, [selectedCity]);

  return (
    <section id="weather" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">Weather Teller</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Check the current weather in major cities.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
          <div className="mb-6">
            <label htmlFor="city-select" className="block text-brand-light font-semibold mb-2">Select a City</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
            >
              {sortedCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="bg-brand-dark/30 rounded-lg p-6 min-h-[200px] flex items-center justify-center transition-all duration-500">
            {isLoading && <div className="w-10 h-10 border-2 border-dashed rounded-full animate-spin border-brand-secondary"></div>}
            {error && <p className="text-red-400">{error}</p>}
            {!isLoading && weatherData && (
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full animate-fade-in-up">
                <div className="text-brand-light">{<WeatherIcon condition={weatherData.condition} />}</div>
                <div>
                  <h3 className="text-3xl font-bold text-brand-secondary">{weatherData.condition}</h3>
                  <p className="text-5xl font-light text-brand-accent my-1">{weatherData.temperature}°C</p>
                  <p className="text-brand-accent/80">{weatherData.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
