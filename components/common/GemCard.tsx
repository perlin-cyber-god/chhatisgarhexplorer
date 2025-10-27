import React from 'react';
import type { HiddenGem } from '../../types';

interface GemCardProps {
  gem: HiddenGem;
}

const GemCard: React.FC<GemCardProps> = ({ gem }) => {
  const placeholderImage = `https://via.placeholder.com/400x300.png/2D3A3A/F7F7F7?text=${encodeURIComponent(gem.name)}`;
  const displayTags = gem.aiTags && gem.aiTags.length > 0 ? gem.aiTags : gem.userTags;

  return (
    <div className="flex-shrink-0 w-80 bg-brand-primary/50 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-brand-secondary/40 backdrop-blur-sm group overflow-hidden flex flex-col">
      <img
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        src={gem.imageUrl || placeholderImage}
        alt={gem.name}
        onError={(e) => { (e.target as HTMLImageElement).src = placeholderImage; }}
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl text-brand-light mb-2">{gem.name}</h3>
        <p className="text-brand-accent/80 text-sm leading-relaxed mb-3 flex-grow h-20 overflow-y-auto scrollbar-thin">
            {gem.description}
        </p>

        {gem.aiInsight && (
            <div className="my-2 p-3 bg-brand-dark/40 rounded-lg border-l-4 border-brand-secondary">
                <p className="text-xs italic text-brand-secondary">✨ AI Insight</p>
                <p className="text-sm text-brand-accent/90 mt-1">{gem.aiInsight}</p>
            </div>
        )}

        {displayTags && displayTags.length > 0 && (
          <div className="mt-auto pt-3 border-t border-brand-primary/50">
             <div className="flex flex-wrap gap-2">
              {displayTags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-brand-secondary/20 text-brand-secondary px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GemCard;
