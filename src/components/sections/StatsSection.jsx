import React from 'react';
import { Award, Users, Stethoscope, Clock } from 'lucide-react';
import './StatsSection.css';

const stats = [
  { icon: <Award size={28} />, number: '15+', label: 'Years Experience' },
  { icon: <Stethoscope size={28} />, number: '6+', label: 'Expert Doctors' },
  { icon: <Users size={28} />, number: '25,000+', label: 'Patients Treated' },
  { icon: <Clock size={28} />, number: '24/7', label: 'Emergency Care' },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
