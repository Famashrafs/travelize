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
import Blogs from './components/Blogs';
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

  useEffect(() => {
    const fetchHotels = async () => {
      const options = {
        method: 'GET',
        url: 'https://airbnb13.p.rapidapi.com/search-geo',
        params: {
          ne_lat: '52.51',
          ne_lng: '13.41',
          sw_lat: '52.41',
          sw_lng: '13.31',
          checkin: '2025-01-12',
          checkout: '2025-01-13',
          adults: '1',
          children: '0',
          infants: '0',
          pets: '0',
          page: '1',
          currency: 'USD',
        },
        headers: {
          'x-rapidapi-key': 'dab7f2d7femsh9a39b95de1793b0p100eaejsn700693c9ed0a',
          'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log('Response Data:', response.data.results);

        setHotelsData(response.data.results || []);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('Forbidden: Please check your API key and permissions.');
        } else if (error.response && error.response.status === 429) {
          setError('Too Many Requests: You have exceeded your API rate limit.');
        } else {
          setError('An error occurred while fetching hotel data.');
        }
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotels();
  }, [setError]);

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
