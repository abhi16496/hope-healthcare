import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, Mail, Clock as ClockIcon } from 'lucide-react';
import './Appointment.css';
import { sendEmail } from '../utils/emailService';
import { useAdminData } from '../context/AdminDataContext';

const Appointment = () => {
  const { appointmentSettings, contactInfo, addAppointment } = useAdminData();
  const { isOpen, closedMessage, doctors, timeSlots } = appointmentSettings;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', age: '', gender: '',
    doctor: '', service: '', date: '', time: '', message: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to admin appointments queue
    addAppointment({ ...form });

    const emailBody = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #1a73e8;">New Appointment Request</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Phone:</strong> ${form.phone}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Age:</strong> ${form.age}</p>
        <p><strong>Gender:</strong> ${form.gender}</p>
        <p><strong>Doctor:</strong> ${form.doctor}</p>
        <p><strong>Date:</strong> ${form.date}</p>
        <p><strong>Time:</strong> ${form.time}</p>
        <hr />
        <p><strong>Message:</strong><br />${form.message}</p>
      </div>
    `;

    const result = await sendEmail({
      to: contactInfo?.email || 'hope.hc@outlook.com',
      subject: `Appointment: ${form.name} - ${form.date}`,
      body: emailBody,
      fromName: 'Hope HealthCare Portal'
    });

    // Regardless of email result, show success (appointment is saved)
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <div className="page-wrapper">
        <div className="page-hero-sm">
          <div className="container"><h1>Book an Appointment</h1></div>
        </div>
        <section className="section bg-light">
          <div className="container-sm text-center">
            <div className="card" style={{ padding: '60px 40px', borderRadius: '24px' }}>
              <Calendar size={48} style={{ color: 'var(--primary)', margin: '0 auto 20px', display: 'block' }} />
              <h2 style={{ marginBottom: '12px' }}>Bookings Temporarily Unavailable</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>{closedMessage}</p>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="page-hero-sm">
          <div className="container"><h1>Appointment Booked!</h1></div>
        </div>
        <div className="section">
          <div className="container-sm text-center">
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h2>Thank You, {form.name}!</h2>
              <p>Your appointment request has been submitted successfully. Our team will contact you at <strong>{form.phone}</strong> to confirm your appointment.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Schedule your visit with our expert doctors. It's quick and easy.</p>
        </div>
      </div>
      <section className="section bg-light">
        <div className="container">
          <div className="appointment-layout">
            <div className="appointment-info">
              <h3>Consultation Timings</h3>
              <p>Choose a slot that works best for you.</p>
              <div className="appointment-contact-list">
                <div className="appointment-contact-item">
                  <ClockIcon size={20} />
                  <div style={{ width: '100%' }}>
                    <strong style={{ marginBottom: '8px', display: 'block' }}>Physician & Dentist</strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>Morning:</span>
                      <span>Morning: {contactInfo?.physicianMorning || '11:00 AM – 2:00 PM'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>Evening:</span>
                      <span>Evening: {contactInfo?.physicianEvening || '7:00 PM – 9:30 PM'}</span>
                    </div>
                  </div>
                </div>
                <div className="appointment-contact-item">
                  <ClockIcon size={20} />
                  <div style={{ width: '100%' }}>
                    <strong style={{ marginBottom: '8px', display: 'block' }}>Day Care Facilities</strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>All Day:</span>
                      <span>{contactInfo?.dayCare || '9:00 AM – 10:00 PM'}</span>
                    </div>
                  </div>
                </div>
                <div className="appointment-contact-item">
                  <Phone size={20} />
                  <div>
                    <strong>Phone</strong>
                    {(contactInfo?.phones || []).map((ph, i) => (
                      <a key={i} href={`tel:${ph.replace(/\s/g,'')}`}>{ph}</a>
                    ))}
                  </div>
                </div>
                <div className="appointment-contact-item">
                  <Mail size={20} />
                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${contactInfo?.email || 'hope.hc@outlook.com'}`}>{contactInfo?.email || 'hope.hc@outlook.com'}</a>
                  </div>
                </div>
              </div>
            </div>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="name" className="form-input" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" name="phone" className="form-input" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input type="number" name="age" className="form-input" value={form.age} onChange={handleChange} placeholder="Your age" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select name="gender" className="form-select" value={form.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Doctor</label>
                  <select name="doctor" className="form-select" value={form.doctor} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input type="date" name="date" className="form-input" required value={form.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <select name="time" className="form-select" value={form.time} onChange={handleChange}>
                    <option value="">Select Time</option>
                    {timeSlots.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message / Symptoms</label>
                <textarea name="message" className="form-textarea" value={form.message} onChange={handleChange} placeholder="Briefly describe your symptoms or reason for visit..."></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Calendar size={20} /> Confirm Appointment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
