import React, { useState, useEffect } from 'react';
import { fetchHiddenGems } from '../services/mongoService';
import type { HiddenGem } from '../types';
import GemCard from './common/GemCard';
import SubmitGemModal from './SubmitGemModal';
import LoadingSpinner from './common/LoadingSpinner';

const HiddenGems: React.FC = () => {
  const [gems, setGems] = useState<HiddenGem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadGems = async () => {
    try {
      setIsLoading(true);
      setError('');
      const fetchedGems = await fetchHiddenGems();
      setGems(fetchedGems);
    } catch (err) {
      setError('Failed to load hidden gems. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGems();
  }, []);

  const handleGemSubmitted = (newGem: HiddenGem) => {
    // Add the new gem to the start of the list to show it immediately
    setGems(prevGems => [newGem, ...prevGems]);
  };

  return (
    <section id="hidden-gems" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">Community's Hidden Gems</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Discover spots loved by locals and fellow travelers.</p>
        </div>
        
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        {!isLoading && !error && (
          <div className="relative">
            <div className="flex overflow-x-auto space-x-8 pb-8 scrollbar-thin scrollbar-thumb-brand-secondary/50 scrollbar-track-brand-primary/50">
              {gems.map((gem) => (
                <GemCard key={gem._id || gem.name} gem={gem} />
              ))}
               {/* This card is now the button to open the modal */}
              <div 
                className="flex-shrink-0 w-80 bg-brand-primary/50 rounded-lg shadow-lg flex flex-col justify-center items-center text-center p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-brand-secondary/40"
                onClick={() => setIsModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="font-serif text-2xl text-brand-light">Share Your Own!</h3>
                <p className="text-brand-accent/70 mt-2">Found a special place? Add it to the collection for others to see.</p>
              </div>
            </div>
          </div>
        )}
        
      </div>
      
      {isModalOpen && (
        <SubmitGemModal 
          onClose={() => setIsModalOpen(false)} 
          onGemSubmitted={handleGemSubmitted} 
        />
      )}
    </section>
  );
};

export default HiddenGems;
