import React from 'react';
import { Heart, Eye, Target, Shield, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container"><h1>About Hope Healthcare</h1><p>Caring for your family's health since 2010</p></div>
      </div>

      <section className="section bg-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <span className="section-label">Our Story</span>
              <h2 style={{ marginTop: '16px', marginBottom: '20px' }}>A Legacy of Compassionate Care</h2>
              <p style={{ marginBottom: '16px' }}>Hope Healthcare Clinic was established in 2010 with a simple yet powerful vision — to provide quality, affordable, and compassionate healthcare to every family in Mysore.</p>
              <p style={{ marginBottom: '16px' }}>What started as a small family clinic has grown into a trusted multi-specialty healthcare center, serving over 25,000 patients with a team of 6+ experienced doctors across multiple specializations.</p>
              <p>We believe that healthcare is not just about treating illness — it's about building lasting relationships with our patients, understanding their needs, and walking with them on their journey to better health.</p>
            </div>
            <div style={{ background: 'var(--primary-light)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <img src="/logo/logo.jpeg" alt="Hope Healthcare" style={{ maxWidth: '250px', margin: '0 auto' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="grid-3">
            <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Target size={28} /></div>
              <h3 style={{ marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ fontSize: '0.9rem' }}>To deliver accessible, affordable, and high-quality healthcare services that improve the well-being of our community.</p>
            </div>
            <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Eye size={28} /></div>
              <h3 style={{ marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ fontSize: '0.9rem' }}>To be the most trusted and preferred family healthcare partner in the region, known for clinical excellence and patient satisfaction.</p>
            </div>
            <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Heart size={28} /></div>
              <h3 style={{ marginBottom: '12px' }}>Our Values</h3>
              <p style={{ fontSize: '0.9rem' }}>Compassion, integrity, respect, excellence, and teamwork guide everything we do for our patients and community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Our Commitment to You</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {['Patient-centered care approach', 'Strict hygiene and safety standards', 'Transparent billing and pricing', 'Experienced and qualified doctors', 'Modern diagnostic equipment', 'Comfortable and clean facilities'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--gray-50)', borderRadius: '8px' }}>
                <CheckCircle size={20} color="var(--secondary)" />
                <span style={{ fontWeight: 600, color: 'var(--dark)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
