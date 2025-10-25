
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary py-8">
      <div className="container mx-auto px-6 text-center text-brand-accent/70">
        <p>&copy; {new Date().getFullYear()} Chhattisgarh Tourism Explorer. All Rights Reserved.</p>
        <p className="text-sm mt-2">Crafted with passion for the heart of Incredible India.</p>
      </div>
    </footer>
  );
};

export default Footer;
