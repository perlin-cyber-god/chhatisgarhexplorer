import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-brand-primary/50 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(78,205,196,0.5)] backdrop-blur-sm group">
      <img className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" src={image} alt={title} />
      <div className="p-6">
        <h3 className="font-serif text-2xl text-brand-light mb-2">{title}</h3>
        <p className="text-brand-accent/80 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Card;