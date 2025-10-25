import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#destinations', label: 'Destinations' },
    { href: '#tribal-life', label: 'Tribal Life' },
    { href: '#hidden-gems', label: 'Hidden Gems' },
    { href: '#ai-art', label: 'AI Painter' },
    { href: '#bus-finder', label: 'Bus Finder' },
    { href: '#weather', label: 'Weather' },
    { href: '#recommender', label: 'Itinerary AI' },
    { href: '#calendar', label: 'Calendar' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-primary/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold text-brand-light">C.G. Tourism</a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-brand-accent hover:text-brand-secondary transition-colors duration-300 font-medium">
              {link.label}
            </a>
          ))}
        </nav>
        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
};

export default Header;