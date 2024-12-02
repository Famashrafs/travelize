import React from 'react';

const Contact = () => (
  <div className="contact-page-container page-margin-top">
    <h1 className="contact-title">Get in Touch</h1>
    <p className="contact-subtitle">We’re here to help you plan your next adventure.</p>
    <div className="contact-details">
      <div className="contact-item">
        <h3>Email Us</h3>
        <p>
          Have questions? Drop us an email at <strong>famashraf9@gmail.com</strong>, and we’ll get back to you within 24 hours.
        </p>
      </div>
      <div className="contact-item">
        <h3>Call Us</h3>
        <p>
          Speak to our travel experts at <strong>+201010145972</strong>. We’re available Monday to Friday from 9 AM to 6 PM.
        </p>
      </div>
      <div className="contact-item">
        <h3>Visit Us</h3>
        <p>
          Come say hi at our office: <strong>Egypt - Assuit </strong>. We’d love to meet you in person!
        </p>
      </div>
      <div className="contact-item">
        <h3>Follow Us</h3>
        <p>
          Stay inspired by following us on social media:
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
    <div className="contact-map">
      <h3>Find Us</h3>
      <iframe
        title="Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509366!2d144.95373531531695!3d-37.816279742601234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57790b3e92db5!2sVictoria%20Street%20Market!5e0!3m2!1sen!2s!4v1623751589389!5m2!1sen!2s"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
);

export default Contact;
