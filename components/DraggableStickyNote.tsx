import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';

const DraggableStickyNote: React.FC = () => {
  const [note, setNote] = useState('My Chhattisgarh travel notes...');
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Animate in after a short delay
    const timer = setTimeout(() => setIsMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);


  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!noteRef.current) return;
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={noteRef}
      className={`fixed z-50 w-64 h-64 p-4 shadow-2xl transform transition-all duration-500 ease-out ${
        isMounted ? 'opacity-100 scale-100 -rotate-2' : 'opacity-0 scale-90 -rotate-6'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#FFE66D', // brand-light
      }}
    >
      <div
        className="w-full h-8 absolute top-0 left-0"
        onMouseDown={handleMouseDown}
      ></div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-brand-dark font-sans text-lg pt-6"
        placeholder="Jot down your ideas..."
      />
    </div>
  );
};

export default DraggableStickyNote;