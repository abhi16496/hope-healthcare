import React from 'react';
import { Calendar, PhoneCall } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-split-section">
      
      {/* LEFT SIDE: Brand & Text */}
      <div className="hero-brand-side fade-in">
        <div className="hero-brand-content">
          
          <div className="hero-massive-logo">
            <img src="/logo/logo.jpeg" alt="HOPE HealthCare Logo" className="hero-logo-img" />
            <p className="hero-logo-tagline">Family Clinic &bull; Day Care Center</p>
          </div>

          <h1 className="hero-title">Quality Healthcare for Your Family</h1>
          <p className="hero-subtitle">
            Experienced care with modern techniques and compassionate service. 
            We are dedicated to providing the best medical attention to our community in Mysore.
          </p>
          
          <div className="hero-actions">
            <a href="tel:+919945538883" className="btn btn-primary hero-btn">
              <PhoneCall size={20} /> Call Now
            </a>
            <a href="#contact" className="btn btn-outline hero-btn text-dark">
              <Calendar size={20} /> Book Appointment
            </a>
          </div>
          
        </div>
      </div>
      
      {/* RIGHT SIDE: Color-Matched Imagery */}
      <div className="hero-image-side">
        <div className="hero-image-overlay"></div>
      </div>
      
    </section>
  );
};

export default Hero;
