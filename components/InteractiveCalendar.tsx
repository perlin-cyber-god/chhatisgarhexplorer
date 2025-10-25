import React, { useState } from 'react';

const InteractiveCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = [];
    // Blank days before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
      days.push(
        <div
          key={day}
          className={`p-2 text-center rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 w-10 h-10 mx-auto ${
            isToday
              ? 'bg-brand-secondary text-brand-dark font-bold'
              : 'hover:bg-brand-primary'
          }`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <section id="calendar" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary font-bold">Plan Your Trip</h2>
          <p className="text-lg text-brand-accent/80 mt-2">Use the calendar to schedule your adventure.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-brand-primary/30 p-8 rounded-lg shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-brand-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h3 className="text-2xl font-semibold text-brand-light font-serif">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-brand-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-brand-accent/70 mb-4">
            {daysOfWeek.map(day => <div key={day} className="font-bold">{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-2">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCalendar;