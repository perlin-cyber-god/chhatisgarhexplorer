import React from 'react';

const FallingLeaves: React.FC = () => {
  const leafCount = 15;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {Array.from({ length: leafCount }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 15}s, ${Math.random() * 2}s`,
          animationDuration: `${5 + Math.random() * 10}s, ${2 + Math.random() * 2}s`,
          opacity: Math.random() * 0.5 + 0.3,
          transform: `scale(${Math.random() * 0.8 + 0.4})`,
        };

        return (
          <div
            key={i}
            className="absolute top-0 w-8 h-8 bg-brand-secondary rounded-full opacity-70 animate-fall"
            style={{
              ...style,
              borderRadius: '50% 80% 60% 70% / 50% 60% 70% 80%',
            }}
          >
             <div className="animate-sway w-full h-full"></div>
          </div>
        );
      })}
    </div>
  );
};

export default FallingLeaves;