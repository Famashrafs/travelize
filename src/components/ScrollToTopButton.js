import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpLong} from '@fortawesome/free-solid-svg-icons';
const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.7) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to the top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && (
        <button onClick={scrollToTop} style={scrollToTopButtonStyle} className='scroll-to-top'>
          <FontAwesomeIcon icon={faUpLong} />
        </button>
      )}
    </div>
  );
};

// Style for the Scroll to Top button
const scrollToTopButtonStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  backgroundColor: 'var(--secondary-color)',
  color: 'var(--primary-color)',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '50%',
  fontSize: '18px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: '1000',
};

export default ScrollToTopButton;
