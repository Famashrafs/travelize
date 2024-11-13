import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Get In Touch</h3>
          <p>Address</p>
          <p>Egypt</p>
          <p>65 West 54th Street,<br />New York, NY 10019</p>
          <p>Support Phone: +201010145972</p>
          <p>Email: famashraf9@gmail.com</p>
          <p>Response time usually 4 hours</p>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#v">How it Works</a></li>
            <li><a href="#v">Start Planning</a></li>
            <li><a href="#v">About Us</a></li>
            <li><a href="#v">Blog</a></li>
            <li><a href="#v">Reviews</a></li>
            <li><a href="#v">Trip Inspiration</a></li>
            <li><a href="#v">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>From the Blog</h3>
          <ul>
            <li><a href="#v">Travelling Guides</a></li>
            <li><a href="#v">Planning Your Trip</a></li>
            <li><a href="#v">Product Guides</a></li>
            <li><a href="#v">Guest Posts</a></li>
            <li><a href="#v">Destinations</a></li>
            <li><a href="#v">Tours</a></li>
            <li><a href="#v">Webinars</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Get Social</h3>
          <p>Keep up-to-date with the latest social media news. Exciting things happening this year.</p>
          <div className="social-icons">
            <a href="#v"> <FontAwesomeIcon icon="fa-brands fa-facebook" /></a>
{/*            
            <a href="#"><i className="fa fa-google"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a> */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Fam. All trademarks, service marks, and designs are registered or unregistered trademarks of Peredrift Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
