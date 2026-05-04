import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, MapPin, HeartPulse, ChevronDown } from 'lucide-react';
import './Navbar.css';
import { useAdminData } from '../../context/AdminDataContext';

const Navbar = () => {
  const { contactInfo } = useAdminData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/pharmacy', label: 'Pharmacy' },
    { path: '/services', label: 'Services' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/contact', label: 'Contact' },
  ];

  const moreLinks = [
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <Clock size={14} /> Day Care: {contactInfo.dayCare} | Physician: {contactInfo.physicianMorning}, {contactInfo.physicianEvening}
            </span>
            <span className="top-bar-item">
              <MapPin size={14} /> {contactInfo.address.split(',').slice(0, 4).join(',')}
            </span>
          </div>
          <div className="top-bar-right">
            {contactInfo.phones.map((phone, index) => (
              <React.Fragment key={index}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="top-bar-item top-bar-link">
                  <Phone size={14} /> {phone}
                </a>
                {index < contactInfo.phones.length - 1 && (
                  <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <img src="/logo/logo.jpeg" alt="Hope Healthcare" className="navbar-logo" />
            <div className="navbar-brand-text">
              <span className="navbar-brand-name">HOPE HealthCare</span>
              <span className="navbar-brand-tagline">Family Clinic & Day Care Center</span>
            </div>
          </Link>

          <div className="navbar-actions">
            <div className={`navbar-menu ${isOpen ? 'navbar-menu-open' : ''}`}>
              <ul className="navbar-links">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="navbar-dropdown">
                  <span className="navbar-link navbar-dropdown-trigger">
                    More <ChevronDown size={14} className="dropdown-icon" />
                  </span>
                  <ul className="navbar-dropdown-menu">
                    {moreLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className={`navbar-dropdown-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>

            <Link to="/appointment" className="btn btn-primary btn-sm navbar-cta">
              Book Appointment
            </Link>

            <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Quote Banner - Attached to Navbar */}
        <div className="quote-banner">
          <div className="container quote-banner-inner">
            <HeartPulse size={18} className="quote-icon" />
            <span className="quote-text">I TREAT "HE" CURES</span>
            <HeartPulse size={18} className="quote-icon" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
