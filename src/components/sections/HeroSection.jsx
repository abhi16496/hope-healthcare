import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, ChevronRight, Shield, Clock, Users } from 'lucide-react';
import './HeroSection.css';
import { useAdminData } from '../../context/AdminDataContext';

const HeroSection = () => {
  const { contactInfo } = useAdminData();
  const phone = contactInfo.phones[0] || '+91 99455 38883';

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text fade-up">
          <span className="hero-badge">
            <Shield size={14} /> Trusted Healthcare Since 2010
          </span>
          <h1 className="hero-title">
            Your Family's Health,<br />
            <span className="hero-title-accent">Our Priority</span>
          </h1>
          <p className="hero-subtitle">
            Experience compassionate, quality healthcare at Hope Healthcare Clinic. 
            Our team of expert doctors is committed to providing the best medical 
            care for you and your loved ones in Mysore.
          </p>
          <div className="hero-actions">
            <Link to="/appointment" className="btn btn-primary btn-lg">
              <Calendar size={20} /> Book Appointment
            </Link>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-outline-white btn-lg">
              <Phone size={20} /> Call Now
            </a>
          </div>
          <div className="hero-features">
            <div className="hero-feature" style={{ alignItems: 'flex-start' }}>
              <Clock size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Day Care: {contactInfo.dayCare}</span>
                <span>Physician: {contactInfo.physicianMorning}, {contactInfo.physicianEvening}</span>
              </div>
            </div>
            <div className="hero-feature">
              <Users size={16} />
              <span>Expert Doctors</span>
            </div>
            <div className="hero-feature">
              <Shield size={16} />
              <span>Quality Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
