import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import type { ItineraryParams } from '../types';
import LoadingSpinner from './common/LoadingSpinner';

const MarkdownRenderer = ({ content }: { content: string }) => {
  // A simple markdown renderer for the itinerary
  const sections = content.split(/(\*\*Day \d+:.*?\*\*)/g).filter(Boolean);
  return (
    <div className="prose prose-invert max-w-none text-left space-y-4">
      {sections.map((section, index) => {
        if (section.startsWith('**Day')) {
          return <h4 key={index} className="text-xl font-semibold text-brand-secondary mt-4">{section.replace(/\*\*/g, '')}</h4>;
        }
        return <p key={index} className="text-brand-accent/90 leading-relaxed">{section.trim()}</p>;
      })}
    </div>
  );
};

const ItineraryRecommender: React.FC = () => {
  const [params, setParams] = useState<ItineraryParams>({
    days: 3,
    interests: [],
    budget: 'Moderate',
  });
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInterestChange = (interest: string) => {
    setParams(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    setError('');
    setIsLoading(true);
    setItinerary('');
    try {
      const result = await generateItinerary(params);
      setItinerary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const interestsOptions = ['Nature', 'Culture', 'Adventure', 'History', 'Food', 'Relaxation'];

  return (
    <section id="recommender" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">AI Itinerary Recommender</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Let our AI craft a personalized travel plan for you.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="days" className="block text-brand-light font-semibold mb-2">Number of Days</label>
                <input
                  type="number"
                  id="days"
                  min="1"
                  max="14"
                  value={params.days}
                  onChange={(e) => setParams({ ...params, days: parseInt(e.target.value, 10) })}
                  className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-brand-light font-semibold mb-2">Interests</label>
                <div className="grid grid-cols-2 gap-2">
                  {interestsOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestChange(interest)}
                      className={`p-2 rounded-lg text-sm transition-colors duration-300 ${
                        params.interests.includes(interest)
                          ? 'bg-brand-secondary text-brand-dark font-bold'
                          : 'bg-brand-dark/50 text-brand-accent hover:bg-brand-primary'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="budget" className="block text-brand-light font-semibold mb-2">Budget</label>
                <select
                  id="budget"
                  value={params.budget}
                  onChange={(e) => setParams({ ...params, budget: e.target.value })}
                  className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent"
                >
                  <option>Budget-friendly</option>
                  <option>Moderate</option>
                  <option>Luxury</option>
                </select>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light disabled:bg-gray-500 transition-all duration-300">
                {isLoading ? 'Generating...' : 'Create My Itinerary'}
              </button>
              {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
            </form>
          </div>
          <div className="lg:col-span-2 bg-brand-primary/30 p-8 rounded-lg shadow-2xl min-h-[400px]">
            {isLoading && <LoadingSpinner />}
            {!isLoading && !itinerary && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-brand-accent/70">Your personalized itinerary will appear here.</p>
              </div>
            )}
            {!isLoading && itinerary && <MarkdownRenderer content={itinerary} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryRecommender;
