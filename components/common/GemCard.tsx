import React from 'react';
import type { HiddenGem } from '../../types';

interface GemCardProps {
  gem: HiddenGem;
}

const GemCard: React.FC<GemCardProps> = ({ gem }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-brand-primary/50 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(78,205,196,0.5)] backdrop-blur-sm group">
      <img className="w-full h-40 object-cover" src={gem.imageUrl} alt={gem.name} />
      <div className="p-5">
        <div className="flex justify-between items-start">
            <h3 className="font-serif text-xl text-brand-light mb-2">{gem.name}</h3>
            <span className="text-xs text-brand-light/70 whitespace-nowrap">by {gem.submittedBy}</span>
        </div>
        <p className="text-brand-accent/80 text-sm leading-relaxed mb-4 h-20 overflow-hidden">{gem.description}</p>
        <div className="flex flex-wrap gap-2">
            {gem.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-brand-secondary/20 text-brand-secondary text-xs rounded-full font-medium">
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GemCard;
