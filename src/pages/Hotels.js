// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


const Hotels = ({hotelsData , error}) => {
 
  // Utility function to render star ratings
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round(rating || 0);
    const emptyStars = maxStars - filledStars;

    return (
      <span className="star-rating">
        {'★'.repeat(filledStars)}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="hotels-container page-margin-top">
      <h1 className="hotels-title">Hotels</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="hotel-list">
        {hotelsData && hotelsData.length > 0 ? (
          hotelsData.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <a href={hotel.deeplink} target="_blank" rel="noopener noreferrer">
                <img src={hotel.images[0]} alt="Hotel" className="hotel-image" />
                <div className="hotel-info">
                  <h2>{hotel.name}</h2>
                  <p><strong>Price per night:</strong> {hotel.price.total} {hotel.price.currency}</p>
                  <p><strong>Rating:</strong> {hotel.rating ? renderStars(hotel.rating) : 'No Rating'}</p>
                  <p><strong>Address:</strong> {hotel.address}</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p>No hotels available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
