import React, { useState} from 'react';

const Hotels = ({hotelsData}) => {

  const [error] = useState(null);

 

  // Utility function to render star ratings
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round(rating); // Round the rating to the nearest integer
    const emptyStars = maxStars - filledStars;

    return (
      <span className="star-rating">
        {'★'.repeat(filledStars)}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="hotels-container">
      <h1 className="hotels-title">Hotels</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="hotel-list">
        {hotelsData && hotelsData.length > 0 ? (
          hotelsData.map((hotel, index) => (
            <div key={index} className="hotel-card">
              {/* Wrap each card in an anchor tag that links to the deeplink */}
              <a href={hotel.deeplink} target="_blank" rel="noopener noreferrer">
                <img src={hotel.images[0] || 'default-hotel-image.jpg'} alt="Hotel" className="hotel-image" />
                <div className="hotel-info">
                  <h2>{hotel.name || 'No Name Available'}</h2>
                  <p><strong>Price per night:</strong> {hotel.price.total} {hotel.price.currency}</p>
                  <p>
                    <strong>Rating:</strong> {hotel.rating || 'No Rating'} {renderStars(hotel.rating || 0)}
                  </p>
                  <p><strong>Address:</strong> {hotel.address || 'No Address Available'}</p>
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
