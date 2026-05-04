import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, GraduationCap, Clock } from 'lucide-react';
import { doctors } from '../data/doctors';

const DoctorsPage = () => {
  const mainDoc = doctors.find(d => d.id === 1);
  const otherDocs = doctors.filter(d => d.id !== 1);

  return (
    <div className="page-wrapper bg-light">
      <div className="page-hero-sm">
        <div className="container">
          <h1>Our Medical Team</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Meet the expert healthcare professionals dedicated to your wellness.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Featured Doctor Section */}
          {mainDoc && (
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              marginBottom: '60px',
              border: '2px solid var(--primary)',
            }}>
              <div style={{ height: '500px', overflow: 'hidden' }}>
                <img src={mainDoc.image} alt={mainDoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', alignSelf: 'flex-start', marginBottom: '16px' }}>Lead Consultant</span>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--dark)', marginBottom: '8px' }}>{mainDoc.name}</h2>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ background: 'var(--accent-light)', color: '#b45309', display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '1rem' }}>
                    {mainDoc.qualification}
                  </span>
                </div>
                <p style={{ color: 'var(--gray-700)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '24px' }}>{mainDoc.specialization}</p>
                <p style={{ fontSize: '1rem', color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '30px' }}>{mainDoc.about}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-200)', paddingTop: '24px' }}>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={18} /> {mainDoc.experience} Experience
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} /> {mainDoc.timings}
                    </p>
                  </div>
                  <Link to="/appointment" className="btn btn-primary btn-lg"><Calendar size={18} /> Book Appointment</Link>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Doctors Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            {otherDocs.map((doc) => (
              <div key={doc.id} style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '30px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border)',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '8px' }}>{doc.name}</h3>
                  <p style={{ background: 'var(--accent-light)', color: '#b45309', display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '16px' }}>
                    {doc.qualification}
                  </p>
                  <p style={{ color: 'var(--gray-700)', fontWeight: 600, fontSize: '1rem', marginBottom: '12px' }}>{doc.specialization}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '20px' }}>{doc.about}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-100)', paddingTop: '16px' }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600, marginBottom: '2px' }}>{doc.experience} Practice</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{doc.timings}</p>
                  </div>
                  <Link to="/appointment" className="btn btn-outline btn-sm"><Calendar size={14} /> Book</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
