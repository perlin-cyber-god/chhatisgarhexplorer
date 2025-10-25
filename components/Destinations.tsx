
import React from 'react';
import { DESTINATIONS } from '../constants';
import Card from './common/Card';

const Destinations: React.FC = () => {
  return (
    <section id="destinations" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">Trendy Destinations</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Explore the most captivating sights of Chhattisgarh.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTINATIONS.map((dest) => (
            <Card key={dest.name} title={dest.name} description={dest.description} image={dest.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
