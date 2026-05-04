import React from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';
import './Highlight.css';

const Highlight = () => {
  const features = [
    "Latest Technique",
    "Painless Procedure",
    "Rapid Healing",
    "Faster Recovery",
    "Minimal Medication"
  ];

  return (
    <section id="khatna" className="highlight-section">
      <div className="container highlight-container">
        <div className="highlight-image fade-in">
          <div className="khatna-card">
            <div className="khatna-icon">👶</div>
            <h3>Safe & Hygienic</h3>
          </div>
        </div>
        
        <div className="highlight-content fade-in">
          <div className="highlight-badge">Special Service</div>
          <h2 className="highlight-title">Circumcision (Ritual Khatna)</h2>
          <p className="highlight-desc">
            We provide safe, hygienic, and professional circumcision services using the latest medical techniques. Our priority is a painless experience with faster recovery for your child.
          </p>
          
          <ul className="highlight-features">
            {features.map((feature, index) => (
              <li key={index}>
                <CheckCircle2 className="check-icon" size={20} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="highlight-note">
            <strong>Note:</strong> Available by prior booking on all days.
          </div>
          
          <a href="tel:+919945538883" className="btn btn-primary highlight-btn">
            <Calendar size={18} /> Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
