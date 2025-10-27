import React, { useState, useEffect } from 'react';
import { getTribalDetail } from '../services/geminiService';
import type { TribalItem } from '../types';
import LoadingSpinner from './common/LoadingSpinner';

interface TribalDetailModalProps {
  item: TribalItem;
  onClose: () => void;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return (
        <div className="space-y-4">
            {paragraphs.map((p, i) => (
                <p key={i} className="text-brand-accent/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
        </div>
    );
};

const TribalDetailModal: React.FC<TribalDetailModalProps> = ({ item, onClose }) => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        const result = await getTribalDetail(item.name);
        setDetails(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [item.name]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-brand-dark/70 z-50 flex justify-center items-center backdrop-blur-sm animate-fade-in-up"
      onClick={handleBackdropClick}
      style={{ animationDuration: '0.3s' }}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-brand-primary p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl m-4 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-serif text-brand-light">{item.name}</h2>
            <p className="text-brand-accent/70">{item.description}</p>
          </div>
          <button onClick={onClose} className="text-brand-accent/70 hover:text-brand-accent text-3xl leading-none" aria-label="Close modal">&times;</button>
        </div>
        
        <div className="overflow-y-auto pr-4 scrollbar-thin">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {!isLoading && details && <MarkdownRenderer content={details} />}
        </div>
      </div>
    </div>
  );
};

export default TribalDetailModal;
