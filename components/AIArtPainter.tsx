import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import LoadingSpinner from './common/LoadingSpinner';

const AIArtPainter: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a description for your art.');
      return;
    }
    setError('');
    setIsLoading(true);
    setImageUrl('');

    try {
      const result = await generateImage(prompt);
      setImageUrl(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-art" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">AI Art Painter</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Visualize the wonders of Chhattisgarh with AI.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-semibold text-brand-secondary mb-4">Describe Your Vision</h3>
            <p className="text-brand-accent/80 mb-6">Enter a prompt, and let our AI create a unique artwork inspired by Chhattisgarh's culture. Try "a tribal village at sunset" or "the majestic Chitrakote falls in monsoon".</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A vibrant Gond painting of a peacock..."
                className="w-full h-24 p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-all duration-300 text-brand-accent"
                aria-label="Art description prompt"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              <button type="submit" disabled={isLoading} className="mt-4 w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light hover:shadow-lg hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading ? 'Painting...' : 'Generate Art'}
              </button>
            </form>
          </div>
          <div className="aspect-square bg-brand-dark/50 rounded-lg shadow-2xl flex items-center justify-center p-4">
            {isLoading && <LoadingSpinner />}
            {imageUrl && !isLoading && (
              <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-md animate-fade-in-up" />
            )}
            {!isLoading && !imageUrl && (
              <div className="text-center text-brand-accent/70">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h3 className="text-xl font-semibold">Your Artwork Awaits</h3>
                <p className="mt-2 text-sm">The generated image will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIArtPainter;