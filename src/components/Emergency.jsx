import React from 'react';
import { Activity, ShieldAlert, HeartPulse } from 'lucide-react';
import './Emergency.css';

const Emergency = () => {
  return (
    <section className="emergency-section">
      <div className="container">
        <div className="emergency-wrapper fade-in">
          <div className="emergency-content">
            <h2>Emergency & Special Facilities</h2>
            <p>We are equipped to handle urgent medical situations with round-the-clock facilities and expert specialists on call.</p>
          </div>
          <div className="emergency-cards">
            <div className="e-card">
              <Activity className="e-icon" size={32} />
              <h4>24/7 ECG</h4>
              <p>Continuous heart monitoring available at any time.</p>
            </div>
            <div className="e-card">
              <ShieldAlert className="e-icon" size={32} />
              <h4>FNAC Procedure</h4>
              <p>Fine Needle Aspiration Cytology testing.</p>
            </div>
            <div className="e-card">
              <HeartPulse className="e-icon" size={32} />
              <h4>On-Call Specialist</h4>
              <p>Expert consultation available when you need it most.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
