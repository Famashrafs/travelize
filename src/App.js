import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Header  from './components/Header';
import Footer from './components/Footer';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetail from './components/BlogDetail';
import JourneyPlanner from './pages/JourneyPlanner';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProfileSetup from './components/ProfileSetup';
import Loading from './components/Loading';

import './App.css';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [setError] = useState(null);
  // add Hotels to home page 
const PEXELS_API_KEY = 'jgXdXv1qjqOMr88dzyMnRtlAxHPfGxkCVbFgsRwv7OK4gN0VtvvixCtc'; 

  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query: `${hotelName} hotel`,
          per_page: 1,
        },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      return response.data.photos[0]?.src.medium || 'default-hotel-image.jpg';
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      return 'default-hotel-image.jpg'; // Fallback image if there's an error
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const query = `
        [out:json];
        area["name"="Berlin"]["admin_level"="4"];
        node["tourism"="hotel"](area);
        out;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const response = await axios.get(url);
        const hotelNodes = response.data.elements;

        // Fetch images for each hotel in parallel, limit to 30 hotels
        const hotelsWithImages = await Promise.all(
          hotelNodes.slice(0, 30).map(async (hotel) => { // Limit to 30 hotels
            const imageUrl = await fetchHotelImage(hotel.tags.name || 'Hotel');
            return {
              name: hotel.tags.name || 'No Name Available',
              address: hotel.tags['addr:street']
                ? `${hotel.tags['addr:street']}, ${hotel.tags['addr:city'] || ''}`
                : 'No Address Available',
              deeplink: `https://www.openstreetmap.org/?mlat=${hotel.lat}&mlon=${hotel.lon}#map=18/${hotel.lat}/${hotel.lon}`,
              images: [imageUrl],
              rating: null,
              price: { total: '100', currency: '$' },
            };
          })
        );
        setHotelsData(hotelsWithImages);
      } catch (err) {
        setError('An error occurred while fetching hotel data.');
        console.error(err);
      }
    };

    fetchHotels();
  });

  // Add new blog at the top
  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);  
  };
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  }, []);

  // dark mode
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  // login 
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // loading
  if (loading) {
    return  <Loading />;
  }

  // App
  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header />
      <NavBar user={user} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} hotelsData = {hotelsData} />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels hotelsData = {hotelsData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} addBlog={addBlog} />} />
        <Route path="/blog/:id" element={<BlogDetail />} /> {/* Dynamic blog page */}
        <Route path="/journey-planner" element={<JourneyPlanner />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile-setup" element={user ? <ProfileSetup/> : <Navigate to="/dashboard" />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
