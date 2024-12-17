import React, { useState, useEffect } from "react";
import axios from "axios";
import barcode from '../images/qrs.JPG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      const API_KEY = "ea0d5b20ea16c37e1461928406328a39"; 
      const apiUrl = 'https://api.aviationstack.com/v1/flights?';
      const options = {
        method: "GET",
        url: `${apiUrl}access_key=${API_KEY}`,
      };

      try {
        const response = await axios.request(options);
        const flightData = response.data.data || [];
        setFlights(flightData);
        setFilteredFlights(flightData);
      } catch (error) {
        setError("Failed to fetch flight data. Please try again.");
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter flights based on departure airport, arrival airport, or flight number
    const filtered = flights.filter((flight) =>
      (flight.departure?.iata || "").toLowerCase().includes(query) ||
      (flight.arrival?.iata || "").toLowerCase().includes(query) ||
      (flight.flight?.number || "").toString().toLowerCase().includes(query)
    );
    setFilteredFlights(filtered);
  };

  return (
    <div className="flights-container page-margin-top">
      <h1>Available Flights</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by departure, arrival, or flight number"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="flights-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-ticket">
              <div className="ticket-header">
                <div className="sub-header">
                  <div className="from-to">
                    <strong>From:</strong>
                    <h1>{flight.departure?.iata || "N/A"}</h1>
                    <p>{flight.departure?.airport || "N/A"}</p>
                    <span>{flight.flight_date || "N/A"}</span>
                  </div>
                  <FontAwesomeIcon icon={faPlane} className="plane" />
                  <div className="from-to">
                    <strong>To:</strong>
                    <h1>{flight.arrival?.iata || "N/A"}</h1>
                    <p>{flight.arrival?.airport || "N/A"}</p>
                    <span>{flight.flight_date || "N/A"}</span>
                  </div>
                </div>
                <div className="header-footer">
                  <p>
                    <strong>Passenger:</strong> John Doe
                  </p>
                  <p>
                    <strong>Flight:</strong> {flight.flight?.number || "426"}
                  </p>
                  <p>
                    <strong>Seat:</strong> {flight.arrival?.baggage || "A25"}
                  </p>
                  <p>
                    <strong>Gate:</strong> {flight.departure?.gate || "F63"}
                  </p>
                  <p>
                    <strong>Terminal:</strong> {flight.departure?.terminal || "4"}
                  </p>
                </div>
              </div>
              <div className="ticket-footer">
                <h2>BOARDING PASS</h2>
                <div className="sub-footer">
                  <div className="from">
                    <strong>FROM:</strong>
                    <h1>{flight.departure?.iata || "N/A"}</h1>
                  </div>
                  <div className="to">
                    <strong>To:</strong>
                    <h1>{flight.arrival?.iata || "N/A"}</h1>
                  </div>
                </div>
                <div className="pass-flight">
                  <p>
                    <strong>Passenger:</strong> John Doe
                  </p>
                  <p>
                    <strong>Flight:</strong> {flight.flight?.number || "426"}
                  </p>
                </div>
                <div className="seat-gate">
                  <p>
                    <strong>Seat:</strong> {flight.arrival?.baggage || "A25"}
                  </p>
                  <p>
                    <strong>Gate:</strong> {flight.departure?.gate || "F63"}
                  </p>
                  <p>
                    <strong>Terminal:</strong> {flight.departure?.terminal || "4"}
                  </p>
                </div>
                <img src={barcode} alt="barcode" />
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
