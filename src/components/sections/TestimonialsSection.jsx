import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="section bg-white" id="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Patient Feedback</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">
            Real experiences from real patients who trust Hope Healthcare 
            with their family's health.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="testimonial-card card">
              <div className="testimonial-quote"><Quote size={24} /></div>
              <p className="testimonial-text">{t.review}</p>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="testimonial-name">{t.name}</h4>
                  <p className="testimonial-service">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
