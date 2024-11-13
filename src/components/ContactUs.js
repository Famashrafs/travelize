import React from 'react';
import contact from "../images/black-and-white-world-map-free-vector-removebg-preview.png"
const ContactUs = () => {
  return (
    <div className="contact-us">
        <img src={contact} alt="World Map" className="world-map" />
      
      <div className="form-container">
        <h2>Contact Us</h2>
        <form>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit" className="contact-submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
