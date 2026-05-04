import React from 'react';
import { Stethoscope, Activity, Scissors, Syringe, Shield, Thermometer, Droplets, FlaskConical, Pill } from 'lucide-react';
import './Services.css';

const servicesList = [
  { icon: <Scissors />, title: "Wound Care & Suturing", desc: "Expert care for open wounds, clean suturing, and regular dressing." },
  { icon: <Activity />, title: "Ingrown Nail Correction", desc: "Painless removal and correction of painful ingrown toenails." },
  { icon: <Stethoscope />, title: "Foreign Body Extraction", desc: "Safe removal of splinters, glass, or other foreign objects." },
  { icon: <Droplets />, title: "Abscess Incision & Drainage", desc: "Hygienic drainage of painful skin abscesses and boils." },
  { icon: <Scissors />, title: "Lipoma, Cysts & Corn Excision", desc: "Minor surgical removal of skin lesions and painful corns." },
  { icon: <Syringe />, title: "IV Fluid Infusion & Nebulization", desc: "Immediate relief through IV drips and respiratory nebulization." },
  { icon: <Shield />, title: "Anti-Rabies Vaccine", desc: "Post-exposure prophylaxis for dog and cat bites." },
  { icon: <Thermometer />, title: "Fever, Allergy & Chest Treatment", desc: "Comprehensive care for seasonal illnesses and allergies." },
  { icon: <Activity />, title: "Hypertension, Diabetes, Thyroid", desc: "Long-term management of chronic lifestyle diseases." },
  { icon: <FlaskConical />, title: "Laboratory Services", desc: "In-house testing for GRBS, HB, Urine, and more." }
];

const Services = () => {
  return (
    <section id="services" className="bg-light">
      <div className="container">
        <h2 className="section-title">Our Medical Services</h2>
        <p className="section-subtitle">
          Comprehensive healthcare services under one roof. We provide expert care for a wide range of medical needs.
        </p>
        
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div className="service-card fade-in" key={index} style={{animationDelay: `${index * 0.1}s`}}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
