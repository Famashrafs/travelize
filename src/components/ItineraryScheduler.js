// ItineraryScheduler.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ItineraryScheduler = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Schedule Your Itinerary</h2>
      <Calendar onChange={setDate} value={date} className="mb-4" />
      <div>
        <h3 className="text-xl font-semibold mb-2">Activities on {date.toDateString()}</h3>
        <ul className="list-disc pl-5">
          <li>Visit the Eiffel Tower</li>
          <li>Lunch at a local cafe</li>
          <li>Explore the Louvre Museum</li>
        </ul>
      </div>
    </div>
  );
};

export default ItineraryScheduler;
