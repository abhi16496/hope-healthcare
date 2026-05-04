import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Heart, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import './Footer.css';
import { useAdminData } from '../../context/AdminDataContext';

const Footer = () => {
  const { contactInfo } = useAdminData();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-col">
            <div className="footer-brand">
              <img src="/logo/logo.jpeg" alt="Hope Healthcare" className="footer-logo" />
              <h3 className="footer-brand-name">HOPE HealthCare</h3>
            </div>
            <p className="footer-desc">
              At HOPE HealthCare, we are committed to providing compassionate, reliable, and quality healthcare services for individuals and families. Our clinic focuses on patient-centered care with experienced medical support, preventive healthcare, and personalized treatment to ensure the well-being of every patient who walks through our doors.
            </p>
            <div className="footer-social">
              <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/doctors">Our Doctors</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Wound Care & Suturing</Link></li>
              <li><Link to="/services">Ingrown Nail Correction</Link></li>
              <li><Link to="/services">Foreign Body Extraction</Link></li>
              <li><Link to="/services">Abscesses Incision & Drainage</Link></li>
              <li><Link to="/services">Lipoma, Cysts & Corn Excision</Link></li>
              <li><Link to="/services">IV Fluid Infusion & Nebulization</Link></li>
              <li><Link to="/services">On-Call Consultation</Link></li>
              <li><Link to="/services">Anti-Rabies Vaccine</Link></li>
              <li><Link to="/services">Circumcision (Ritual Khatna)</Link></li>
              <li><Link to="/services">Seasonal Fevers & Allergies</Link></li>
              <li><Link to="/services">Chronic Disease Management</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={16} />
                <span style={{ whiteSpace: 'pre-line' }}>{contactInfo.address}</span>
              </li>
              <li>
                <Phone size={16} />
                <span>
                  {contactInfo.phones.map((phone, index) => (
                    <React.Fragment key={index}>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                      {index < contactInfo.phones.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li>
                <Mail size={16} />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>
                <Clock size={16} />
                <span>
                  <strong>Physician & Dentist:</strong><br />
                  Morning: {contactInfo.physicianMorning}<br />
                  Evening: {contactInfo.physicianEvening}<br /><br />
                  <strong>Day Care:</strong><br />
                  {contactInfo.dayCare}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hope Healthcare Clinic. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
