
import React from 'react';
import { TRIBAL_ITEMS } from '../constants';
import Card from './common/Card';

const TribalLifestyle: React.FC = () => {
  return (
    <section id="tribal-life" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">Rich Tribal Lifestyle</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Immerse yourself in the ancient culture and art forms.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRIBAL_ITEMS.map((item) => (
            <Card key={item.name} title={item.name} description={item.description} image={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TribalLifestyle;
