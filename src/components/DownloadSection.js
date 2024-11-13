import React from 'react';
import google from '../images/google-play.png'
import appStore from '../images/app-store.png'
import mockup from '../images/phone-mockup.png'
import QR from '../images/qr-code.png'
const DownloadSection = () => {
  return (
    <div className="download-section">
      <div className="app-info">
        <h1>DOWNLOAD OUR APP</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className='download-option'>
            <div className="download-buttons">
            <a href="your-playstore-link" className="download-btn playstore">
                <img src={google} alt="Google Play" />
            </a>
            <a href="your-appstore-link" className="download-btn appstore">
                <img src={appStore} alt="App Store" />
            </a>
            </div>
            {/* QR Code */}
            <div className="qr-code">
            <img src={QR} alt="QR Code" />
            </div>
        </div>
      </div>
      <div className="phone-mockup">
        {/* Add an image of the phone mockup here */}
        <img src={mockup} alt="Phone Mockup" />
      </div>
    </div>
  );
};

export default DownloadSection;
