import React from 'react';
import img1 from "../images/user-1.jpg"
import img2 from "../images/user-2.jpg"
const About = () => {
  return (
    <div className="about-container page-margin-top">
      <h1>About Us</h1>
      
      <section className="about-section">
        <h2>Discover Your Next Adventure</h2>
        <p>
          At <strong>TravelSite</strong>, we believe that travel has the power to transform lives. Our mission is to make planning your journey as exciting as the trip itself. Whether you're dreaming of serene beaches, vibrant cities, or breathtaking mountains, we're here to help you explore the world with ease.
        </p>
      </section>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          Founded by passionate travelers, <strong>TravelSite</strong> offers personalized trip-planning tools, curated recommendations, and a vibrant community to share experiences.
        </p>
        <ul>
          <li><strong>Our Vision:</strong> To inspire travelers to embrace adventure.</li>
          <li><strong>Our Mission:</strong> To provide easy and intuitive travel planning tools, helping users create unforgettable journeys.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Customized Travel Plans:</strong> Tailor your itinerary with our easy-to-use tools.</li>
          <li><strong>Community Driven:</strong> Connect with fellow travelers and learn from their experiences.</li>
          <li><strong>Sustainable Travel:</strong> We promote eco-friendly travel and local tourism.</li>
        </ul>
      </section>

      <section className="about-section team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={img2} alt="Founder" />
            <p><strong>John Doe</strong><br />Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={img1} alt="Lead Developer" />
            <p><strong>Jane Smith</strong><br />Lead Developer</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <div className="values">
          <div><strong>Inclusion</strong><p>Travel is for everyone, regardless of background or experience.</p></div>
          <div><strong>Curiosity</strong><p>Explore new cultures and lesser-known destinations.</p></div>
          <div><strong>Sustainability</strong><p>We promote eco-conscious tourism and reducing the environmental impact of travel.</p></div>
        </div>
      </section>

      <section className="about-section">
        <h2>Join Us on This Journey</h2>
        <p>Let <strong>TravelSite</strong> be your companion in exploring the wonders of the world. Whether you're an experienced traveler or planning your first trip, we're here to guide you every step of the way.</p>
      </section>

      <section className="about-section">
        <h2>Get in Touch</h2>
        <p>Have questions? Reach out to us at <strong>info@travelsite.com</strong> or follow us on social media!</p>
      </section>
    </div>
  );
};

export default About;
