import React from 'react';
import { MapPin, Clock, HeartPulse } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="bg-white">
      <div className="container about-container">
        <div className="about-content fade-in">
          <h2 className="section-title" style={{textAlign: 'left'}}>About HOPE HealthCare</h2>
          <p className="about-text">
            HOPE HealthCare is a trusted family clinic and day care center committed to delivering comprehensive, compassionate, and high-quality medical services. We combine advanced treatments with a personal touch to ensure faster recovery for you and your loved ones.
          </p>
          
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon"><MapPin size={24} /></div>
              <div>
                <h3>Location</h3>
                <p>3440/1, Wesley Road<br/>(Behind Mission Hospital)<br/>Tilaknagar, Mysore – 570001</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon"><Clock size={24} /></div>
              <div>
                <h3>Consultation Timings</h3>
                <p>Morning: 11:00 AM – 2:00 PM<br/>Evening: 7:00 PM – 9:30 PM</p>
                <div className="highlight-time">Day Care: 9:00 AM – 10:00 PM</div>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon"><HeartPulse size={24} /></div>
              <div>
                <h3>Our Promise</h3>
                <p>Modern techniques, painless procedures, and a patient-first approach for all your medical needs.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image-container">
          <div className="about-image-wrapper">
             <div className="about-glass-panel">
               <span className="glass-number">10+</span>
               <span className="glass-text">Years of Trust</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
