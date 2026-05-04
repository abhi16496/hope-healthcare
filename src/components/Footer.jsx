import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo/logo.jpeg" alt="HOPE HealthCare Logo" className="logo-img" />
            <p>Family Clinic &bull; Day Care &bull; Dentist</p>
          </div>
          
          <div className="footer-info">
            <p>3440/1, Wesley Road, (Behind Mission Hospital), Tilaknagar, Mysore – 570001</p>
            <p>Phone: +91 99455 38883</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 HOPE HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
