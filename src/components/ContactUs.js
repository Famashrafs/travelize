import React from 'react';
import contact from "../images/contact.png"
const ContactUs = () => {
  return (
    <div className="contact-us">
        <h2 className='pre-heading'>Speak</h2>
        <h2 className='heading'>Contact Us</h2>
        <div className='contact-container'>
          <div className="world-map" > 
            <img src={contact} alt="World Map"/>
          </div>
          <div className="form-container">
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
    </div>
  );
};

export default ContactUs;
