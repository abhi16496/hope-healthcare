import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Stethoscope, Building2, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contact.css';
import { sendEmail } from '../utils/emailService';
import { useAdminData } from '../context/AdminDataContext';

const Contact = () => {
  const { contactInfo, addContactMessage } = useAdminData();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save message to admin inbox
    addContactMessage({ ...form });

    const emailBody = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #1a73e8;">New Contact Message</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Phone:</strong> ${form.phone}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Subject:</strong> ${form.subject}</p>
        <hr />
        <p><strong>Message:</strong><br />${form.message}</p>
      </div>
    `;

    const result = await sendEmail({
      to: contactInfo.email || 'hope.hc@outlook.com',
      subject: `Contact: ${form.subject || 'No Subject'} - From ${form.name}`,
      body: emailBody,
      fromName: 'Hope HealthCare Portal'
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      // Still mark as submitted since we saved to local inbox
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="page-hero-sm">
          <div className="container">
            <h1>Message Sent!</h1>
          </div>
        </div>
        <section className="section bg-light">
          <div className="container-sm text-center">
            <div className="card" style={{ padding: '60px 40px', borderRadius: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--secondary-light)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ marginBottom: '16px' }}>Thank You, {form.name}!</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)', marginBottom: '32px' }}>
                Your message has been received. We will get back to you at <strong>{form.email || form.phone}</strong> as soon as possible.
              </p>
              <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>

      {/* Full-Width Map */}
      <section className="contact-map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.9141945055826!2d76.6465367759439!3d12.321562087937226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf71558f6f7649%3A0x9d55b44e9c29143e!2sHOPE%20HealthCare!5e0!3m2!1sen!2sin!4v1777368062544!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HOPE HealthCare Location"
        ></iframe>
      </section>

      {/* Contact Info Cards - Horizontal Row */}
      <section className="section-sm bg-white">
        <div className="container">
          <div className="contact-cards-row">

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><MapPin size={24} /></div>
              <h4>Address</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.address}</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><Phone size={24} /></div>
              <h4>Phone</h4>
              {contactInfo.phones.map((ph, i) => (
                <p key={i}><a href={`tel:${ph.replace(/\s/g,'')}`}>{ph}</a></p>
              ))}
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}><Mail size={24} /></div>
              <h4>Email</h4>
              <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}><Stethoscope size={24} /></div>
              <h4>Physician &amp; Dentist</h4>
              <p><strong>Morning:</strong> {contactInfo.physicianMorning}</p>
              <p><strong>Evening:</strong> {contactInfo.physicianEvening}</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}><Building2 size={24} /></div>
              <h4>Day Care</h4>
              <p>{contactInfo.dayCare}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form - Centered */}
      <section className="section bg-light">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and our team will get back to you shortly.</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    name="name"
                    className="form-input" 
                    placeholder="Your full name" 
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    name="phone"
                    className="form-input" 
                    placeholder="+91 XXXXX XXXXX" 
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    placeholder="your@email.com" 
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    name="subject"
                    className="form-input" 
                    placeholder="How can we help?" 
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea 
                  name="message"
                  className="form-textarea" 
                  placeholder="Write your message here..." 
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="contact-form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  style={{ minWidth: '200px' }}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
                <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Contact;
