import React from 'react';

const images = [
  { src: '/WhatsApp Image 2026-04-27 at 5.31.37 PM (2).jpeg', caption: 'Clinic Interior' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.37 PM.jpeg', caption: 'Our Facility' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.38 PM (1).jpeg', caption: 'Medical Equipment' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.38 PM (2).jpeg', caption: 'Consultation Room' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.38 PM (3).jpeg', caption: 'Patient Care' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.38 PM.jpeg', caption: 'Treatment Area' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.39 PM (1).jpeg', caption: 'Clinic Services' },
  { src: '/WhatsApp Image 2026-04-27 at 5.31.39 PM.jpeg', caption: 'Healthcare Team' },
];

const Gallery = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container">
          <h1>Gallery</h1>
          <p>Take a look inside Hope Healthcare Clinic</p>
        </div>
      </div>
      <section className="section bg-light">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {images.map((img, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: '280px',
                  overflow: 'hidden',
                  background: 'var(--gray-100)',
                }}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dark)' }}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
