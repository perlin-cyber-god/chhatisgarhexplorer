import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import TribalLifestyle from './components/TribalLifestyle';
import ItineraryRecommender from './components/ItineraryRecommender';
import Footer from './components/Footer';
import BusFinder from './components/BusFinder';
import AIArtPainter from './components/AIArtPainter';
import InteractiveCalendar from './components/InteractiveCalendar';
import DraggableStickyNote from './components/DraggableStickyNote';
import AnimatedSection from './components/common/AnimatedSection';
import HiddenGems from './components/HiddenGems';
import Weather from './components/Weather';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <AnimatedSection>
          <Destinations />
        </AnimatedSection>
        <AnimatedSection>
          <TribalLifestyle />
        </AnimatedSection>
        <AnimatedSection>
          <HiddenGems />
        </AnimatedSection>
        <AnimatedSection>
          <AIArtPainter />
        </AnimatedSection>
        <AnimatedSection>
          <BusFinder />
        </AnimatedSection>
        <AnimatedSection>
          <Weather />
        </AnimatedSection>
        <AnimatedSection>
          <ItineraryRecommender />
        </AnimatedSection>
        <AnimatedSection>
          <InteractiveCalendar />
        </AnimatedSection>
      </main>
      <DraggableStickyNote />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;