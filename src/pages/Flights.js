import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = () => {
  const [flightsData, setFlightsData] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
        setFilteredFlights(flights); // Initialize filteredFlights with all flights
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

  // Handle search query input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter flights based on location name
    const filtered = flightsData.filter((flight) =>
      flight.content?.location?.name.toLowerCase().includes(query)
    );
    setFilteredFlights(filtered);
  };
  console.log(filteredFlights)
  return (
    <div className="flight-container page-margin-top">
      <h1 className="flight-title">Flights</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="flight-list">
        {filteredFlights && filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <img
                src={flight.content?.image?.url || 'default-flight-image.jpg'}
                alt="flight"
                className="flight-image"
              />
              <div className="flight-info">
                <h2>{flight.id || 'No ID available'}</h2>
                <div className='more-flight-info'>
                  <p><strong>Location:</strong> {flight.content?.location?.name || 'N/A'}</p>
                  <p><strong>Price:</strong> {flight.content?.flightQuotes?.cheapest?.price || 'N/A'}</p>
                  <p><strong>Type:</strong> {flight.type || 'Not specified'}</p>
                  <p><strong>Type:</strong> {flight.type || 'Not specified'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available for the selected location.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
