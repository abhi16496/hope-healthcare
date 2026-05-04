import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import BackToTop from './components/layout/BackToTop';
import Home from './pages/Home';
import About from './pages/About';
import DoctorsPage from './pages/Doctors';
import ServicesPage from './pages/Services';
import Facilities from './pages/Facilities';
import Appointment from './pages/Appointment';
import TestimonialsPage from './pages/Testimonials';
import FAQPage from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Pharmacy from './pages/Pharmacy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Admin
import { AdminDataProvider } from './context/AdminDataContext';
import AdminAuth from './admin/components/AdminAuth';
import AdminLayout from './admin/layout/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminContact from './admin/pages/AdminContact';
import AdminAppointments from './admin/pages/AdminAppointments';

function App() {
  return (
    <AdminDataProvider>
      <Router>
        <Routes>
          {/* ── Admin routes (no public layout) ───────────────────── */}
          <Route
            path="/admin/*"
            element={
              <AdminAuth>
                <AdminLayout />
              </AdminAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="appointments" element={<AdminAppointments />} />
          </Route>

          {/* ── Public routes (with Navbar / Footer) ──────────────── */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/pharmacy" element={<Pharmacy />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
                <BackToTop />
              </>
            }
          />
        </Routes>
      </Router>
    </AdminDataProvider>
  );
}

export default App;
