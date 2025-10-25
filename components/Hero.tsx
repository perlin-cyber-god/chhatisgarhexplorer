import React from 'react';
import FallingLeaves from './common/FallingLeaves';
import { IMAGES } from '../assets';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}></div>
      <FallingLeaves />
      <div className="absolute inset-0 bg-brand-dark opacity-60"></div>
      <div className="text-center z-10 p-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-accent font-bold mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
            Discover Chhattisgarh
          </h1>
          <p className="text-lg md:text-2xl text-brand-secondary font-light max-w-3xl mx-auto">
            The Land of Surprising Wonders and Ancient Tribes
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
