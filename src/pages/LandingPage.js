import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHotel, faPlane, faSmile } from '@fortawesome/free-solid-svg-icons';


const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Travel</h1>
        <h2>The World</h2>
      </div>
      <div className="cards-container">
          <div className="card" onClick={() => handleNavigation('/plan')}>
            <FontAwesomeIcon icon={faClipboardList} size="2x" />
            <p>Plan</p>
          </div>
          <div className="card" onClick={() => handleNavigation('/book')}>
            <FontAwesomeIcon icon={faHotel} size="2x" />
            <p>Book</p>
          </div>
          <div className="card" onClick={() => handleNavigation('/travel')}>
            <FontAwesomeIcon icon={faPlane} size="2x" />
            <p>Travel</p>
          </div>
          <div className="card" onClick={() => handleNavigation('/enjoy')}>
            <FontAwesomeIcon icon={faSmile} size="2x" />
            <p>Enjoy</p>
          </div>
        </div>
    </div>
  );
};

export default LandingPage;