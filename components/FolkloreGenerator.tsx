import React, { useState } from 'react';
import { generateFolklore } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';

const StoryRenderer = ({ content }: { content: string }) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const title = lines.length > 0 && lines[0].startsWith('###') ? lines.shift()?.substring(4) : "A Legend from the Land";
  
    return (
      <div className="prose prose-invert max-w-none text-left">
        <h3 className="font-serif text-3xl text-brand-secondary mb-4">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className="text-brand-accent/90 mb-4 leading-relaxed">{line}</p>
        ))}
      </div>
    );
};

const FolkloreGenerator: React.FC = () => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateStory = async () => {
    setError('');
    setIsLoading(true);
    setStory('');

    try {
      const result = await generateFolklore();
      setStory(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="folklore" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">Whispers of the Land</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Unearth a local legend with the help of AI.</p>
        </div>
        <div className="max-w-3xl mx-auto bg-brand-primary/30 p-8 rounded-lg shadow-2xl text-center min-h-[300px] flex flex-col justify-center items-center">
          {!isLoading && !story && (
            <div className="animate-fade-in-up">
              <p className="text-brand-accent/80 mb-6 max-w-md mx-auto">
                The ancient lands of Chhattisgarh are filled with tales of magic, spirits, and nature. Click the button to discover one.
              </p>
              <button onClick={handleGenerateStory} className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-brand-light hover:shadow-lg hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105">
                Unearth a Legend
              </button>
            </div>
          )}
          
          {isLoading && <LoadingSpinner />}
          
          {error && <p className="text-red-400">{error}</p>}
          
          {!isLoading && story && (
            <div className="animate-fade-in-up w-full">
              <StoryRenderer content={story} />
              <button onClick={handleGenerateStory} className="mt-8 bg-brand-secondary/80 text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-brand-light transition-all duration-300">
                Tell Me Another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FolkloreGenerator;