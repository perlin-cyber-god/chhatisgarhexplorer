import React, { useState, useCallback } from 'react';
import { generateItinerary } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';

const interestOptions = ['Adventure', 'Culture', 'Nature', 'Relaxation', 'History'];
const budgetOptions = ['Budget', 'Mid-range', 'Luxury'];

const MarkdownRenderer = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2">{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={i} className="font-serif text-3xl mt-4 mb-3 text-brand-secondary">{line.substring(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={i} className="text-2xl mt-4 mb-2 font-semibold text-brand-light">{line.substring(4)}</h3>);
    } else if (line.startsWith('- ')) {
      listItems.push(<li key={i} dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);
    } else if (line.trim() !== '') {
      flushList();
      elements.push(<p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);
    }
  });

  flushList();
  return <div className="prose prose-invert max-w-none">{elements}</div>;
};


const ItineraryRecommender: React.FC = () => {
  const [days, setDays] = useState(5);
  const [interests, setInterests] = useState<string[]>(['Culture', 'Nature']);
  const [budget, setBudget] = useState('Mid-range');
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInterestChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    setError('');
    setIsLoading(true);
    setItinerary('');

    try {
      const result = await generateItinerary({ days, interests, budget });
      setItinerary(result);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [days, interests, budget]);

  return (
    <section id="recommender" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">AI Itinerary Planner</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Let our AI craft your perfect Chhattisgarh journey.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
            <div className="mb-6">
              <label htmlFor="days" className="block text-brand-light font-bold mb-2">Duration (Days)</label>
              <input type="range" id="days" min="1" max="14" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full h-2 bg-brand-primary rounded-lg appearance-none cursor-pointer" />
              <div className="text-center text-brand-secondary mt-2 font-semibold">{days} Day{days > 1 ? 's' : ''}</div>
            </div>
            <div className="mb-6">
              <h4 className="text-brand-light font-bold mb-3">Interests</h4>
              <div className="flex flex-wrap gap-3">
                {interestOptions.map(interest => (
                  <button type="button" key={interest} onClick={() => handleInterestChange(interest)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${interests.includes(interest) ? 'bg-brand-secondary text-brand-dark' : 'bg-brand-primary/50 text-brand-accent hover:bg-brand-primary'}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h4 className="text-brand-light font-bold mb-3">Budget</h4>
              <div className="flex justify-around bg-brand-primary/50 rounded-lg p-1">
                {budgetOptions.map(option => (
                  <button type="button" key={option} onClick={() => setBudget(option)} className={`w-full py-2 rounded-md text-sm font-semibold transition-all duration-300 ${budget === option ? 'bg-brand-light text-brand-dark shadow-md' : 'text-brand-accent/70 hover:bg-brand-primary/70'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light hover:shadow-lg hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
              {isLoading ? 'Crafting Your Adventure...' : 'Generate Itinerary'}
            </button>
          </form>
          <div className="bg-brand-primary/30 p-8 rounded-lg shadow-2xl overflow-y-auto max-h-[600px]">
            {isLoading && <LoadingSpinner />}
            {itinerary && <MarkdownRenderer content={itinerary} />}
            {!isLoading && !itinerary && (
              <div className="text-center text-brand-accent/70 flex flex-col items-center justify-center h-full">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7m0 0l6-3m0 0l6 3m-6-3v10" /></svg>
                <h3 className="text-xl font-semibold">Your Personalized Itinerary</h3>
                <p className="mt-2">Will appear here once you've set your preferences.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryRecommender;