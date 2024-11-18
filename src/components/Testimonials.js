import React from 'react';

const testimonials = [
  {
    name: "Alishba",
    title: "Traveler",
    quote: "The customer support was outstanding, ensuring a worry-free vacation. Anyone seeking top-notch travel services!",
    image: require("../images/user-1.jpg") 
  },
  {
    name: "Sonia Alam",
    title: "Bloger",
    quote: "The attention to detail and personalized service exceeded all expectations. Can't wait to embark on another journey!",
    image: require("../images/user-2.jpg") 
  },
  {
    name: "Anisha",
    title: "Content Creator",
    quote: "Our recent getaway was a breeze to plan, thanks to the user-friendly interface recommendations provided.",
    image: require("../images/user-3.jpg") 
  }
];

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">Traveller's Experirnces</h2>
      <p className="testimonial-intro">"Unlock your next adventure with our exclusive Special Discount – limited time offer! Enjoy unparalleled savings on dream destinations."</p>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-title">{testimonial.title}</p>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
