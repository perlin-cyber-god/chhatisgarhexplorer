import React, { useState } from 'react';
import { TRIBAL_ITEMS } from '../constants';
import Card from './common/Card';
import TribalDetailModal from './TribalDetailModal'; // Import the new modal component
import type { TribalItem } from '../types';

const TribalLifestyle: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TribalItem | null>(null);

  const handleCardClick = (item: TribalItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section id="tribal-life" className="py-20 bg-brand-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-light font-bold">Rich Tribal Lifestyle</h2>
            <p className="text-lg text-brand-accent/80 mt-2">Immerse yourself in the vibrant culture and ancient traditions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRIBAL_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleCardClick(item)}
                className="text-left focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded-lg"
                aria-label={`Learn more about ${item.name}`}
              >
                <Card title={item.name} description={item.description} image={item.image} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <TribalDetailModal
          item={selectedItem}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default TribalLifestyle;
