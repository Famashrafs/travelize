import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = () => {
  const [flightsData, setFlightsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way',
        params: {
          fromEntityId: 'PARI',
          cabinClass: 'economy',
        },
        headers: {
          'x-rapidapi-key': '2b1ea3327fmsh00039ebf1e3a31fp1df3d5jsna1907662abc5',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const flights = response.data.data.everywhereDestination?.results || [];
        setFlightsData(flights);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('Forbidden: Please check your API key and permissions.');
        } else if (error.response && error.response.status === 429) {
          setError('Too Many Requests: You have exceeded your API rate limit.');
        } else {
          setError('An error occurred while fetching flight data.');
        }
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="flight-container page-margin-top">
      <h1 className="flight-title">Flights</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="flight-list">
        {flightsData && flightsData.length > 0 ? (
          flightsData.map((flight, index) => (
            <div key={index} className="flight-card">
              <img
                src={flight.content?.image?.url || 'default-flight-image.jpg'}
                alt="flight"
                className="flight-image"
              />
              <div className="flight-info">
                <h2>{flight.id || 'No ID available'}</h2>
                <p><strong>Location:</strong> {flight.content?.location?.name || 'N/A'}</p>
                <p><strong>Price:</strong> {flight.content?.flightQuotes?.cheapest?.price || 'N/A'}</p>
                <p><strong>Type:</strong> {flight.type || 'Not specified'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
