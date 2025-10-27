import React, { useState } from 'react';
import { CHHATTISGARH_CITIES } from '../constants';

const BusFinder: React.FC = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [error, setError] = useState('');

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      setError('Please select both departure and destination cities.');
      return;
    }
    if (fromCity === toCity) {
      setError('Departure and destination cities cannot be the same.');
      return;
    }
    setError('');

    // Format cities for the URL (lowercase, spaces to hyphens)
    const formattedFrom = fromCity.toLowerCase().replace(/\s+/g, '-');
    const formattedTo = toCity.toLowerCase().replace(/\s+/g, '-');
    
    // Use the new, more reliable path-based URL structure
    const redbusUrl = `https://www.redbus.in/bus-tickets/${formattedFrom}-to-${formattedTo}`;

    window.open(redbusUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="bus-finder" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">Find Your Bus</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Travel between cities in Chhattisgarh with ease.</p>
        </div>
        <div className="max-w-3xl mx-auto bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-2/5">
              <label htmlFor="fromCity" className="block text-brand-light font-semibold mb-2 text-sm">From</label>
              <select
                id="fromCity"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
              >
                <option value="">Select Departure</option>
                {CHHATTISGARH_CITIES.sort().map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="self-center mt-4 md:mt-8">
                <button type="button" onClick={handleSwap} className="p-2 rounded-full bg-brand-secondary/80 text-brand-dark hover:bg-brand-secondary transition-transform duration-300 hover:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </button>
            </div>
            
            <div className="w-full md:w-2/5">
              <label htmlFor="toCity" className="block text-brand-light font-semibold mb-2 text-sm">To</label>
              <select
                id="toCity"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
              >
                <option value="">Select Destination</option>
                {CHHATTISGARH_CITIES.sort().map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-8">
                <button type="submit" className="w-full md:w-auto bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light hover:shadow-lg hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105">
                    Find
                </button>
            </div>
          </form>
          {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default BusFinder;