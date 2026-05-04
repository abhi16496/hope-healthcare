import React from 'react';
import './LogoBanner.css';

const LogoBanner = () => {
  return (
    <div className="logo-banner">
      <div className="container">
        <div className="logo-container">
          <img src="/logo/logo.jpeg" alt="HOPE HealthCare Logo" className="logo-banner-img" />
          <p className="logo-banner-tagline">Family Clinic &bull; Day Care</p>
        </div>
      </div>
    </div>
  );
};

export default LogoBanner;
