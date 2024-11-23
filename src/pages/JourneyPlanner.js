import React, { useState , useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import SearchBar from '../SearchBar'; // Adjust the path if necessary
import axios from 'axios'
const JourneyPlanner = () => {
  const [destinations, setDestinations] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState({
    adults: false,
    teens: false,
    kids: false,
  });
  const [activity, setActivity] = useState('');
  const [transportation, setTransportation] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [mealPreference, setMealPreference] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageData, setImageData] = useState([]);
  const handleSearch = async (query) => {
    setSearchQuery(query);
  
    // Fetch images based on search query using Pexels API
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
      headers: {
        Authorization: 'jgXdXv1qjqOMr88dzyMnRtlAxHPfGxkCVbFgsRwv7OK4gN0VtvvixCtc'
      }
    });
  
    setImageData(response.data.photos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newToDoList = [
      `Book ${transportation} for the trip to ${destinations}`,
      `Reserve ${accommodation} for accommodation`,
      `Plan activities: ${activity}`,
      'Pack essential items',
      `Look for meal options: ${mealPreference}`,
    ];
    setToDoList(newToDoList);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  });
  return (
    <div className="journey-planner">
      <SearchBar onSearch={handleSearch} />
      <div className="planner-content">
        <div className="itinerary-planner">
          <h2>Itinerary Planner</h2>
          <form onSubmit={handleSubmit} className="planner-form">
            <label>
              Destinations & Dates
              <input 
                type="text" 
                placeholder="Country, Region, or City" 
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
                required
              />
            </label>
            <div className="date-inputs">
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                required 
              />
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                required 
              />
            </div>

            <label>Travelers</label>
            <div className="traveler-options">
              {['Adults', 'Teens', 'Kids'].map((type) => (
                <label key={type}>
                  <input 
                    type="checkbox" 
                    checked={travelers[type.toLowerCase()]} 
                    onChange={() =>
                      setTravelers({ ...travelers, [type.toLowerCase()]: !travelers[type.toLowerCase()] })
                    } 
                  />
                  {type}
                </label>
              ))}
            </div>

            <label>Activities</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="">Select activities</option>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
            </select>

            <label>Transportation</label>
            <select value={transportation} onChange={(e) => setTransportation(e.target.value)}>
              <option value="">Select Transportation</option>
              <option value="Car Rental">Car Rental</option>
              <option value="Flight">Flight</option>
            </select>

            <label>Accommodation</label>
            <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)}>
              <option value="">Select Accommodation</option>
              <option value="Hotel">Hotel</option>
              <option value="Airbnb">Airbnb</option>
            </select>

            <label>Meal Preferences</label>
            <select value={mealPreference} onChange={(e) => setMealPreference(e.target.value)}>
              <option value="">Select Meal Preferences</option>
              <option value="Local Cuisine">Local Cuisine</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>

            <button type="submit" className='plan'>See the Plan</button>
          </form>

          {toDoList.length > 0 && (
            <div className="to-do-list">
              <h3>Your To-Do List</h3>
              <ul>
                {toDoList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='country-data-show'>
          <div className="carousel-container">
            <div
              className="carousel"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {imageData.map((image, index) => (
                <div key={image.id} className="carousel-item">
                  <img src={image.src.large2x} alt={image.alt} />
                  <div className="carousel-caption">
                    <h3>{image.alt || 'City Tour'}</h3>
                    <p>Guided Tours - $99/day</p>
                    <p>7 days tour</p>
                    <div className="rating-stars">★★★★☆</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-prev" onClick={prevSlide}>❮</button>
            <button className="carousel-next" onClick={nextSlide}>❯</button>
          </div>
          <MapComponent searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanner;
