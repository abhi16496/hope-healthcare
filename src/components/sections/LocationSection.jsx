import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './LocationSection.css';
import { useAdminData } from '../../context/AdminDataContext';

const LocationSection = () => {
  const { contactInfo } = useAdminData();

  return (
    <section className="section bg-light" id="location-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Visit Us</span>
          <h2 className="section-title">Our Location</h2>
          <p className="section-subtitle">
            Conveniently located in Mysore for easy access to quality healthcare.
          </p>
        </div>
        <div className="location-grid">
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.9141945055826!2d76.6465367759439!3d12.321562087937226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf71558f6f7649%3A0x9d55b44e9c29143e!2sHOPE%20HealthCare!5e0!3m2!1sen!2sin!4v1777368062544!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hope Healthcare Location"
            ></iframe>
          </div>
          <div className="location-info">
            <div className="location-item">
              <div className="location-item-icon"><MapPin size={22} /></div>
              <div>
                <h4>Address</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.address}</p>
              </div>
            </div>
            <div className="location-item">
              <div className="location-item-icon"><Phone size={22} /></div>
              <div>
                <h4>Phone</h4>
                {contactInfo.phones.map((phone, index) => (
                  <p key={index}><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
                ))}
              </div>
            </div>
            <div className="location-item">
              <div className="location-item-icon"><Mail size={22} /></div>
              <div>
                <h4>Email</h4>
                <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
              </div>
            </div>
            <div className="location-item">
              <div className="location-item-icon"><Clock size={22} /></div>
              <div>
                <h4>Working Hours</h4>
                <p><strong>Physician & Dentist:</strong><br/>Morning: {contactInfo.physicianMorning}<br/>Evening: {contactInfo.physicianEvening}</p>
                <p style={{ marginTop: '8px' }}><strong>Day Care:</strong><br/>{contactInfo.dayCare}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
