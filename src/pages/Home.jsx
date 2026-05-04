import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ServicesPreview from '../components/sections/ServicesPreview';
import DoctorsPreview from '../components/sections/DoctorsPreview';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AppointmentCTA from '../components/sections/AppointmentCTA';
import LocationSection from '../components/sections/LocationSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <WhyChooseUs />
      <DoctorsPreview />
      <TestimonialsSection />
      <AppointmentCTA />
      <LocationSection />
    </>
  );
};

export default Home;
