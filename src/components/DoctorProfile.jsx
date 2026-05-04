import React from 'react';
import { Award, ShieldCheck, CalendarCheck } from 'lucide-react';
import './DoctorProfile.css';

const DoctorProfile = () => {
  return (
    <section className="doctor-section bg-light">
      <div className="container">
        <div className="doctor-wrapper fade-in">
          <div className="doctor-image-col">
            <div className="doctor-image">
               <img src="/doctor-cert.png" alt="Dr. Syed Misbah Ur Rahman" />
            </div>
            <div className="experience-badge">
              <span className="exp-years">10+</span>
              <span className="exp-text">Years Exp.</span>
            </div>
          </div>
          
          <div className="doctor-info-col">
            <span className="doc-subtitle">Meet Our Lead Specialist</span>
            <h2 className="doc-title">Dr. Syed Misbah Ur Rahman</h2>
            <p className="doc-desc">
              Dedicated to providing the highest standard of medical care. Dr. Syed specializes in advanced life support, general medicine, and minor surgical procedures.
            </p>
            
            <div className="cert-box">
              <div className="cert-icon">
                <Award size={32} />
              </div>
              <div className="cert-details">
                <h3>ACLS Provider</h3>
                <p>Advanced Cardiac Life Support</p>
                <div className="cert-meta">
                  <span className="cert-issuer"><ShieldCheck size={16}/> Save a Life / NHCPS</span>
                  <span className="cert-date"><CalendarCheck size={16}/> Valid: Feb 2025 - Feb 2027</span>
                </div>
              </div>
            </div>
            
            <div className="doc-skills">
              <span className="skill-tag">General Medicine</span>
              <span className="skill-tag">Emergency Care</span>
              <span className="skill-tag">Minor Surgery</span>
              <span className="skill-tag">Ritual Circumcision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
