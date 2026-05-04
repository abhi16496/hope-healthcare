import React from 'react';
import { Stethoscope, Scissors, Thermometer, Syringe, Heart, Shield, Activity, Users, Baby, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services';
import './Services.css';

const iconMap = { Stethoscope, Scissors, Thermometer, Syringe, Heart, Shield, Activity, Users, Baby };

const ServicesPage = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container text-center relative z-10">
          <h1>Our Medical Services</h1>
          <p>Comprehensive, specialized, and family-friendly healthcare under one roof</p>
        </div>
        {/* Decorative background shapes */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </div>
      
      <section className="section services-page-section">
        <div className="container">
          <div className="services-grid-premium">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon];
              return (
                <div 
                  key={service.id} 
                  className="service-premium-card fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="service-premium-header">
                    <div className="service-premium-icon">
                      {Icon && <Icon size={32} strokeWidth={1.5} />}
                    </div>
                    <h3>{service.title}</h3>
                  </div>
                  
                  <div className="service-premium-body">
                    <p className="service-premium-desc">{service.fullDesc}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <ul className="service-premium-list">
                        {service.features.map((feature, i) => (
                          <li key={i}>
                            <CheckCircle2 size={18} className="list-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};


export default ServicesPage;
