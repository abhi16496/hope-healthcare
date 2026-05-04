import React from 'react';
import { Pill, ShieldCheck, Sparkles, Award } from 'lucide-react';

const Pharmacy = () => {
  return (
    <div className="page-wrapper bg-light">
      {/* Hero Section */}
      <div className="page-hero-sm">
        <div className="container">
          <h1>
            <Pill size={36} /> Hope Pharmacy
          </h1>
          <p>In-house quality medicines backed by professional pharmaceutical care.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Discount Offer Banner */}
          <div style={{
            background: 'linear-gradient(90deg, #ff9900 0%, #ff5500 100%)',
            color: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '30px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 10px 20px rgba(255,85,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={32} />
            <h2 style={{ color: 'var(--white)', fontSize: '2rem', margin: 0, fontWeight: 800 }}>Exclusive 10% Discount</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>On All Medicines & Pharmaceutical Purchases</p>
          </div>

          {/* Chief Pharmacist Profile */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'var(--primary-light)',
              borderRadius: 'var(--radius-lg)',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Award size={80} strokeWidth={1.5} />
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Pharmacy Head</span>
            </div>
            
            <div>
              <span style={{ 
                background: 'var(--secondary-light)', 
                color: 'var(--secondary)', 
                padding: '6px 14px', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                marginBottom: '16px', 
                display: 'inline-block' 
              }}>
                Chief Pharmacist
              </span>
              
              <h3 style={{ fontSize: '2rem', color: 'var(--dark)', marginBottom: '8px' }}>
                Syeda Laiba Firdose
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <span style={{ 
                  background: 'var(--accent-light)', 
                  color: '#b45309', 
                  display: 'inline-block', 
                  padding: '6px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: '700', 
                  fontSize: '1rem' 
                }}>
                  B Pharma
                </span>
              </div>

              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '20px' }}>
                Syeda Laiba Firdose ensures precise, patient-focused medicinal management. She carefully monitors inventory, advises on prescriptions, and drives our 100% genuine pharmaceutical promise.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                <ShieldCheck size={20} />
                <span>100% Genuine & Verified Medicines</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Pharmacy;
