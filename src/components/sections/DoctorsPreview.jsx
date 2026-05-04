import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './DoctorsPreview.css';

const DoctorsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const currentDoc = doctors[currentIndex];

  if (!currentDoc) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <section className="section bg-light doctors-preview-section">
      <div className="container preview-container">
        
        <div className="section-header text-center">
          <span className="section-label">Meet Our Team</span>
          <h2 className="section-title">Our Medical Experts</h2>
        </div>

        <div className="slider-wrapper">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="doctor-preview-card"
              style={{
                gridTemplateColumns: currentDoc.id === 1 ? '1fr 1.5fr' : '1fr',
                textAlign: currentDoc.id === 1 ? 'left' : 'center'
              }}
            >
              {currentDoc.id === 1 && (
                <div className="preview-image-box">
                  <img src={currentDoc.image} alt={currentDoc.name} className="preview-img" />
                </div>
              )}
              
              <div className="preview-content">
                <h3 className="preview-name">{currentDoc.name}</h3>
                <p className="preview-qual">{currentDoc.qualification}</p>
                <p className="preview-spec">{currentDoc.specialization}</p>
                
                <Link to="/doctors" className="btn btn-primary preview-cta">
                  <Award size={18} /> View Profile & Timings
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button className="slider-nav-btn prev" onClick={handlePrev} aria-label="Previous doctor">
            <ArrowLeft size={20} />
          </button>

          <button className="slider-nav-btn next" onClick={handleNext} aria-label="Next doctor">
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="slider-dots">
          {doctors.map((_, idx) => (
            <span
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorsPreview;

