// src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { GiPlainCircle } from "react-icons/gi";
import logo from "../images/logo.png";
import Logout from '../pages/Logout';
import Loading from '../components/Loading';

const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown-menu') == null && event.target.closest('.nav-profile-pic') == null) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const handleEditProfile = () => {
    navigate('/profile-setup');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" style={{ fontWeight: "bold" }}>
          <img className='logo' src={logo} alt='TRAVELIZE' />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item"><Link to="/" className="nav-links">Home</Link></li>
          <li className="nav-item"><Link to="/journey-planner" className="nav-links">Journey Planner</Link  ></li>
          <li className="nav-item"><Link to="/flights" className="nav-links">Flights</Link></li>
          <li className="nav-item"><Link to="/hotels" className="nav-links">Hotels</Link></li>
          <li className="nav-item"><Link to="/blogs" className="nav-links">Blogs</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-links">About</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-links">Contact</Link></li>
          {user ? (
            <>
              <li>
                <div className="nav-profile-pic" onClick={toggleDropdown}>
                  <img src={userData?.profilePicUrl || '../images/avater.png'} alt="Profile" className="nav-profile-pic-img" />
                  <span>{userData?.displayName || `${userData?.firstName} ${userData?.lastName}` || 'User'} <i className="fas fa-caret-down"></i></span>
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={handleDashboard}><FaUserCircle /> Account</li>
                    <li onClick={handleEditProfile}><FaCog /> Edit Profile</li>
                    <li><FaSignOutAlt className="logout-icon" /><Logout /></li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="login"><Link to="/login">Login</Link></li>
              <li className="signup"><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
        <div className="dark-mode-switch" onClick={toggleDarkMode}>
          <div className={`switch ${isDarkMode ? 'dark' : 'light'}`}>
            <GiPlainCircle className="icon sun-icon" /> <FaMoon className="icon moon-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
