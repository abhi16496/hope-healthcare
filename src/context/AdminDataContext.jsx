import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { testimonials as defaultTestimonials } from '../data/testimonials';

// ─── Storage Keys ──────────────────────────────────────────────────────────────
const KEYS = {
  testimonials: 'hopehc_testimonials',
  contactInfo: 'hopehc_contactInfo',
  appointmentSettings: 'hopehc_appointmentSettings',
  appointments: 'hopehc_appointments',
  contactMessages: 'hopehc_contactMessages',
};

// ─── Default Data ──────────────────────────────────────────────────────────────
const defaultContactInfo = {
  address: '3440/1, Wesley Road,\n(Behind Mission Hospital),\nTilaknagar, Mysore - 570001',
  phones: ['+91 99455 38883', '+91 821 4252657'],
  email: 'hope.hc@outlook.com',
  whatsapp: '919945538883',
  physicianMorning: '11:00 AM – 2:00 PM',
  physicianEvening: '7:00 PM – 9:30 PM',
  dayCare: '9:00 AM – 10:00 PM',
};

const defaultAppointmentSettings = {
  isOpen: true,
  closedMessage: 'Appointment booking is temporarily unavailable. Please call us directly.',
  doctors: [
    'Dr. Prem Kumar',
    'Dr. Rajesh Kumar',
    'Dr. Priya Sharma',
    'Dr. Anil Mehta',
    'Dr. Suresh Babu',
    'Dr. Kavitha Rao',
  ],
  timeSlots: [
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 9:30 PM',
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write error:', e);
  }
};

// Seed default testimonials with approved flag on first load
const seedTestimonials = () => {
  const existing = localStorage.getItem(KEYS.testimonials);
  if (!existing) {
    const seeded = defaultTestimonials.map(t => ({ ...t, approved: true, createdAt: new Date().toISOString() }));
    write(KEYS.testimonials, seeded);
    return seeded;
  }
  return JSON.parse(existing);
};

// ─── Context ───────────────────────────────────────────────────────────────────
const AdminDataContext = createContext(null);

export const AdminDataProvider = ({ children }) => {
  const [testimonials, _setTestimonials] = useState(() => seedTestimonials());
  const [contactInfo, _setContactInfo] = useState(() => read(KEYS.contactInfo, defaultContactInfo));
  const [appointmentSettings, _setAppointmentSettings] = useState(() => read(KEYS.appointmentSettings, defaultAppointmentSettings));
  const [appointments, _setAppointments] = useState(() => read(KEYS.appointments, []));
  const [contactMessages, _setContactMessages] = useState(() => read(KEYS.contactMessages, []));

  // Persist + update state
  const setTestimonials = useCallback((val) => {
    const next = typeof val === 'function' ? val(testimonials) : val;
    write(KEYS.testimonials, next);
    _setTestimonials(next);
  }, [testimonials]);

  const setContactInfo = useCallback((val) => {
    const next = typeof val === 'function' ? val(contactInfo) : val;
    write(KEYS.contactInfo, next);
    _setContactInfo(next);
  }, [contactInfo]);

  const setAppointmentSettings = useCallback((val) => {
    const next = typeof val === 'function' ? val(appointmentSettings) : val;
    write(KEYS.appointmentSettings, next);
    _setAppointmentSettings(next);
  }, [appointmentSettings]);

  const addAppointment = useCallback((appt) => {
    const next = [{ ...appt, id: Date.now(), status: 'Pending', read: false, createdAt: new Date().toISOString() }, ...appointments];
    write(KEYS.appointments, next);
    _setAppointments(next);
  }, [appointments]);

  const markAppointmentRead = useCallback((id) => {
    const next = appointments.map(a => a.id === id ? { ...a, read: true } : a);
    write(KEYS.appointments, next);
    _setAppointments(next);
  }, [appointments]);

  const updateAppointment = useCallback((id, changes) => {
    const next = appointments.map(a => a.id === id ? { ...a, ...changes } : a);
    write(KEYS.appointments, next);
    _setAppointments(next);
  }, [appointments]);

  const deleteAppointment = useCallback((id) => {
    const next = appointments.filter(a => a.id !== id);
    write(KEYS.appointments, next);
    _setAppointments(next);
  }, [appointments]);

  const addContactMessage = useCallback((msg) => {
    const next = [{ ...msg, id: Date.now(), read: false, createdAt: new Date().toISOString() }, ...contactMessages];
    write(KEYS.contactMessages, next);
    _setContactMessages(next);
  }, [contactMessages]);

  const markMessageRead = useCallback((id) => {
    const next = contactMessages.map(m => m.id === id ? { ...m, read: true } : m);
    write(KEYS.contactMessages, next);
    _setContactMessages(next);
  }, [contactMessages]);

  const deleteMessage = useCallback((id) => {
    const next = contactMessages.filter(m => m.id !== id);
    write(KEYS.contactMessages, next);
    _setContactMessages(next);
  }, [contactMessages]);

  // ── Cross-tab sync via storage event ────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === KEYS.testimonials) _setTestimonials(JSON.parse(e.newValue));
      if (e.key === KEYS.contactInfo) _setContactInfo(JSON.parse(e.newValue));
      if (e.key === KEYS.appointmentSettings) _setAppointmentSettings(JSON.parse(e.newValue));
      if (e.key === KEYS.appointments) _setAppointments(JSON.parse(e.newValue));
      if (e.key === KEYS.contactMessages) _setContactMessages(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AdminDataContext.Provider value={{
      testimonials, setTestimonials,
      contactInfo, setContactInfo,
      appointmentSettings, setAppointmentSettings,
      appointments, addAppointment, updateAppointment, markAppointmentRead, deleteAppointment,
      contactMessages, addContactMessage, markMessageRead, deleteMessage,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider');
  return ctx;
};
