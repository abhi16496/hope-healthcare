import React, { useState } from 'react';
import { Star, Quote, Send, CheckCircle } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './Testimonials.css';

const TestimonialsPage = () => {
  const { testimonials, setTestimonials } = useAdminData();
  // Only show approved ones on public page
  const approvedList = testimonials.filter(t => t.approved !== false);

  const [newReview, setNewReview] = useState({
    name: '',
    service: '',
    rating: 5,
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (val) => setNewReview({ ...newReview, rating: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const testimonial = {
        id: Date.now(),
        ...newReview,
        source: 'Website User',
        approved: false, // goes into pending queue for admin approval
        createdAt: new Date().toISOString(),
      };
      setTestimonials(prev => [testimonial, ...prev]);
      setNewReview({ name: '', service: '', rating: 5, review: '' });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="page-wrapper testimonials-page">
        <div className="page-hero-sm">
          <div className="container"><h1>Thank You!</h1></div>
        </div>
        <section className="section">
          <div className="container-sm text-center">
            <div className="card" style={{ padding: '60px 40px', borderRadius: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--secondary-light)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ marginBottom: '12px' }}>Review Submitted!</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>Your review is pending approval and will appear on this page shortly.</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Back to Testimonials</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper testimonials-page">
      <div className="page-hero-sm">
        <div className="container">
          <h1>Patient Testimonials</h1>
          <p>Real stories of healing and care from our community</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="testimonials-grid">
            {approvedList.map((t) => (
              <div key={t.id} className="testimonial-card-premium fade-up">
                <Quote size={40} className="quote-icon-premium" />
                
                <div className="stars-row">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < t.rating ? "#f59e0b" : "none"} 
                      color={i < t.rating ? "#f59e0b" : "#d1d5db"} 
                    />
                  ))}
                </div>

                <p className="testimonial-text">"{t.review}"</p>

                <div className="testimonial-author">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Review Form Section */}
          <div className="review-form-section">
            <div className="review-form-container">
              <div className="review-form-header">
                <h2>Share Your Experience</h2>
                <p>Your feedback helps us improve and helps other patients find the care they need.</p>
              </div>

              <form className="review-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label text-white">Full Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="form-input dark-input" 
                        required 
                        placeholder="Your name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label text-white">Service Received</label>
                    <input 
                      type="text" 
                      className="form-input dark-input" 
                      placeholder="e.g. General Medicine, Pharmacy"
                      value={newReview.service}
                      onChange={(e) => setNewReview({...newReview, service: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: '24px 0' }}>
                  <label className="form-label text-white">Your Rating</label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star 
                        key={num}
                        size={32}
                        className="rating-star"
                        fill={num <= newReview.rating ? "#f59e0b" : "none"}
                        color={num <= newReview.rating ? "#f59e0b" : "#4b5563"}
                        onClick={() => handleRating(num)}
                      />
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label text-white">Your Review *</label>
                  <textarea 
                    className="form-textarea dark-input" 
                    required 
                    placeholder="Tell us about your visit..."
                    rows="4"
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  style={{ width: '100%', marginTop: '30px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : (
                    <>
                      <Send size={18} /> Post My Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
