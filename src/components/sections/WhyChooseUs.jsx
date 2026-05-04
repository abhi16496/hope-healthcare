import React from 'react';
import { CheckCircle, HeartHandshake, ShieldCheck, Clock, Wallet, Smile } from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
  { icon: <HeartHandshake size={24} />, title: 'Compassionate Care', desc: 'We treat every patient like family with empathy, respect, and personalized attention.' },
  { icon: <ShieldCheck size={24} />, title: 'Experienced Doctors', desc: 'Our team of qualified doctors brings years of experience and clinical expertise.' },
  { icon: <Clock size={24} />, title: 'Convenient Timings', desc: <><strong>Physician & Dentist:</strong><br />11 AM - 2 PM, 7 PM - 9:30 PM<br /><br /><strong>Day Care:</strong><br />9 AM - 10 PM</> },
  { icon: <Wallet size={24} />, title: 'Affordable Pricing', desc: 'Quality healthcare at competitive prices with transparent billing practices.' },
  { icon: <CheckCircle size={24} />, title: 'Modern Facilities', desc: 'In-house Laboratory Facility (GRBS, HB & Urine Routine) and Free daily B.P. Check-ups.' },
  { icon: <Smile size={24} />, title: 'Patient Satisfaction', desc: 'Thousands of satisfied patients trust us with their family\'s health.' },
];

const WhyChooseUs = () => {
  return (
    <section className="section bg-light" id="why-choose-us">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Hope Healthcare</span>
          <h2 className="section-title">Why Patients Choose Us</h2>
          <p className="section-subtitle">
            We combine medical excellence with genuine care to deliver 
            healthcare experiences that make a difference.
          </p>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-card-icon">{r.icon}</div>
              <h4 className="why-card-title">{r.title}</h4>
              <p className="why-card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
