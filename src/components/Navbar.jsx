import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar for contact info (hidden on mobile) */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-info">
            <span className="info-item"><MapPin size={14} /> Tilaknagar, Mysore</span>
            <span className="info-item"><Clock size={14} /> Daily: 9:00 AM - 10:00 PM</span>
          </div>
          <div className="top-contact">
            <a href="tel:+919945538883" className="top-phone">
              <Phone size={14} /> +91 99455 38883
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar container">

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#khatna" className="highlight-link">Circumcision</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="tel:+919945538883" className="btn btn-accent nav-btn">
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#home" onClick={closeMenu}>Home</a></li>
            <li><a href="#services" onClick={closeMenu}>Services</a></li>
            <li><a href="#khatna" onClick={closeMenu} className="highlight-link">Circumcision (Khatna)</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
          <a href="tel:+919945538883" className="btn btn-accent mobile-nav-btn">
            Call: +91 99455 38883
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
