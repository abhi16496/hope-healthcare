import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Scissors, Thermometer, Syringe, Heart, Shield, Activity, Users, Baby, ArrowRight } from 'lucide-react';
import { services } from '../../data/services';
import './ServicesPreview.css';

const iconMap = { Stethoscope, Scissors, Thermometer, Syringe, Heart, Shield, Activity, Users, Baby };

const ServicesPreview = () => {
  const featured = services.filter(s => s.featured);

  return (
    <section className="section bg-light" id="services-preview">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Medical Services</h2>
          <p className="section-subtitle">
            We provide a comprehensive range of healthcare services to meet 
            all your medical needs under one roof.
          </p>
        </div>
        <div className="services-grid">
          {featured.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card card">
                <div className="service-card-icon">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.shortDesc}</p>
                <Link to="/services" className="service-card-link">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center" style={{ marginTop: '50px' }}>
          <Link to="/services" className="btn btn-outline">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
