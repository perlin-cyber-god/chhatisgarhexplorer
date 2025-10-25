import React, { useState, useEffect } from 'react';
import { fetchHiddenGems } from '../services/mongoService';
import type { HiddenGem } from '../types';
import LoadingSpinner from './common/LoadingSpinner';
import GemCard from './common/GemCard';

const HiddenGems: React.FC = () => {
  const [gems, setGems] = useState<HiddenGem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHiddenGems();
        setGems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not fetch hidden gems.');
      } finally {
        setIsLoading(false);
      }
    };
    loadGems();
  }, []);

  return (
    <section id="hidden-gems" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">Community's Hidden Gems</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Discover spots shared by fellow travelers.</p>
        </div>
        
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-center text-red-400">{error}</p>}
        
        {!isLoading && !error && (
          <div className="flex overflow-x-auto space-x-8 pb-8 -mx-6 px-6 scrollbar-thin scrollbar-thumb-brand-primary scrollbar-track-brand-dark/50">
            {gems.map((gem, index) => (
              <GemCard key={gem.name + index} gem={gem} />
            ))}
             <div className="flex-shrink-0 w-64 flex flex-col items-center justify-center bg-brand-primary/30 rounded-lg text-center p-6">
                <h3 className="font-serif text-2xl text-brand-light">Your Turn?</h3>
                <p className="text-brand-accent/80 text-sm mt-2">Found a gem? Share it with the community!</p>
                <div className="w-16 h-16 mt-4 rounded-full bg-brand-secondary/20 flex items-center justify-center text-3xl text-brand-secondary">+</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HiddenGems;