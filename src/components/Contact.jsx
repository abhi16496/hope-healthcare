import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          We are here to help. Reach out to us for appointments, inquiries, or emergency assistance.
        </p>
        
        <div className="contact-wrapper">
          <div className="contact-info fade-in">
            <div className="contact-card">
              <div className="contact-icon"><MapPin /></div>
              <div className="contact-details">
                <h3>Our Location</h3>
                <p>3440/1, Wesley Road, (Behind Mission Hospital), Tilaknagar, Mysore – 570001</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon"><Phone /></div>
              <div className="contact-details">
                <h3>Phone Number</h3>
                <p>+91 99455 38883</p>
              </div>
            </div>
            
            <div className="contact-actions">
              <a href="tel:+919945538883" className="btn btn-primary contact-btn">
                <Phone size={18} /> Call Now
              </a>
              <a href="https://wa.me/919945538883" target="_blank" rel="noopener noreferrer" className="btn btn-accent contact-btn whatsapp-btn">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          
          <div className="contact-map fade-in">
            <div className="map-placeholder">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.3!2d76.6!3d12.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE4JzAwLjAiTiA3NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="HOPE HealthCare Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
