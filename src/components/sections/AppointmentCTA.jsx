import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import './AppointmentCTA.css';
import { useAdminData } from '../../context/AdminDataContext';

const AppointmentCTA = () => {
  const { contactInfo } = useAdminData();
  const phone = contactInfo.phones[0] || '+91 99455 38883';

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Experience Better Healthcare?</h2>
            <p className="cta-subtitle">
              Book your appointment today and take the first step towards 
              better health for you and your family.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/appointment" className="btn btn-white btn-lg">
              <Calendar size={20} /> Book Appointment
            </Link>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-outline-white btn-lg">
              <Phone size={20} /> Call: {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
