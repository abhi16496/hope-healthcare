import React from 'react';
import { FlaskConical, HeartPulse, Activity, ShieldAlert, Stethoscope } from 'lucide-react';
import './Facilities.css';

const facilities = [
  {
    icon: <FlaskConical size={48} />,
    title: 'Laboratory Facility',
    desc: 'All Investigations Done',
    subText: 'We provide comprehensive diagnostic testing with a 20% discount on all tests.',
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
  },
  {
    icon: <HeartPulse size={48} />,
    title: 'Free B.P. Check-up',
    desc: 'Daily Complimentary Checks',
    subText: 'We provide free blood pressure check-ups daily for all our patients to promote heart health.',
    color: 'var(--secondary)',
    bg: 'var(--secondary-light)',
  },
  {
    icon: <Activity size={48} />,
    title: 'ECG Service',
    desc: 'Available 24/7',
    subText: 'Round-the-clock Electrocardiogram testing for immediate cardiac evaluations.',
    color: '#e53935',
    bg: '#ffebee',
  },
  {
    icon: <ShieldAlert size={48} />,
    title: 'Cardiac Emergency',
    desc: 'Instant Trop-I Test Available',
    subText: 'Rapid and life-saving Trop-I biomarker test for reliable emergency diagnostics.',
    color: '#fb8c00',
    bg: '#fff3e0',
  },
  {
    icon: <Stethoscope size={48} />,
    title: 'Special Facility',
    desc: 'FNAC Procedure & Test done',
    subText: 'Expert Fine Needle Aspiration Cytology (FNAC) procedures and diagnostics performed with precision.',
    color: '#8e24aa',
    bg: '#f3e5f5',
    special: true
  }
];

const Facilities = () => {
  return (
    <div className="page-wrapper bg-light">
      <div className="page-hero-sm">
        <div className="container text-center">
          <h1>Our Facilities</h1>
          <p>Dedicated medical facilities for accurate diagnostics and preventive care</p>
        </div>
      </div>
      
      <section className="section facilities-page-section">
        <div className="container">
          <div className="facilities-premium-grid">
            {facilities.map((f, i) => (
              <div key={i} className={`facility-premium-card ${f.special ? 'special-highlight' : ''}`}>
                {f.special && <div className="special-badge">Special Facility</div>}
                <div 
                  className="facility-premium-icon" 
                  style={{ color: f.color, backgroundColor: f.bg }}
                >
                  {f.icon}
                </div>
                <h2>{f.special ? f.desc : f.title}</h2>
                <h4 className="facility-premium-subtitle">{f.special ? 'Expert Procedure' : f.desc}</h4>
                <p className="facility-premium-text">{f.subText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
