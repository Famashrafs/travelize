// BudgetPlanner.js
import React, { useState } from 'react';

const BudgetPlanner = () => {
  const [accommodation, setAccommodation] = useState(0);
  const [food, setFood] = useState(0);
  const [transport, setTransport] = useState(0);
  const [activities, setActivities] = useState(0);

  const totalBudget = accommodation + food + transport + activities;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Plan Your Budget</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Accommodation: ${accommodation}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={accommodation}
          onChange={(e) => setAccommodation(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Food: ${food}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={food}
          onChange={(e) => setFood(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Transport: ${transport}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={transport}
          onChange={(e) => setTransport(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Activities: ${activities}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={activities}
          onChange={(e) => setActivities(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <h3 className="text-xl font-semibold">Total Budget: ${totalBudget}</h3>
    </div>
  );
};

export default BudgetPlanner;
