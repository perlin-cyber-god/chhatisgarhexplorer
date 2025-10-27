import React, { useState } from 'react';
import { CHHATTISGARH_CITIES } from '../constants';

const BusFinder: React.FC = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [error, setError] = useState('');

  const formatDateForRedbus = (date: Date): string => {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFindBuses = (e: React.FormEvent) => {
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

    const formattedFromCity = fromCity.toLowerCase().replace(/\s+/g, '-');
    const formattedToCity = toCity.toLowerCase().replace(/\s+/g, '-');
    const travelDate = formatDateForRedbus(new Date()); // Use today's date

    // This is the new, more robust URL format
    const redbusUrl = `https://www.redbus.in/bus-tickets/${formattedFromCity}-to-${formattedToCity}?onward=${travelDate}`;
    
    window.open(redbusUrl, '_blank');
  };

  return (
    <section id="bus-finder" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">Find Your Bus</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Travel between cities in Chhattisgarh with ease.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleFindBuses} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* From City */}
            <div className="flex flex-col">
              <label htmlFor="from-city" className="text-brand-light font-semibold mb-2">From</label>
              <select
                id="from-city"
                value={fromCity}
                onChange={e => setFromCity(e.target.value)}
                className="p-4 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
              >
                <option value="" disabled>Select Departure City</option>
                {CHHATTISGARH_CITIES.sort().map(city => <option key={`from-${city}`} value={city}>{city}</option>)}
              </select>
            </div>

            {/* To City */}
            <div className="flex flex-col">
              <label htmlFor="to-city" className="text-brand-light font-semibold mb-2">To</label>
              <select
                id="to-city"
                value={toCity}
                onChange={e => setToCity(e.target.value)}
                className="p-4 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
              >
                <option value="" disabled>Select Destination City</option>
                {CHHATTISGARH_CITIES.sort().map(city => <option key={`to-${city}`} value={city}>{city}</option>)}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-secondary text-brand-dark font-bold py-4 px-8 rounded-lg hover:bg-brand-light hover:shadow-lg hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105"
            >
              Find Buses
            </button>
          </form>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default BusFinder;
