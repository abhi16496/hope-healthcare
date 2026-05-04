import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Star, Phone, Calendar, LogOut,
  Menu, X, ExternalLink, Stethoscope
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import './AdminLayout.css';

const NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/contact', icon: Phone, label: 'Contact & Info' },
  { to: '/admin/appointments', icon: Calendar, label: 'Appointments' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { contactMessages, testimonials, appointments } = useAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unreadMessages = contactMessages.filter(m => !m.read).length;
  const pendingTestimonials = testimonials.filter(t => t.approved === false).length;
  const unreadAppointments = appointments.filter(a => !a.read).length;

  const handleLogout = () => {
    sessionStorage.removeItem('hopehc_admin_auth');
    navigate('/admin');
    window.location.reload();
  };

  const badges = {
    '/admin/contact': unreadMessages,
    '/admin/testimonials': pendingTestimonials,
    '/admin/appointments': unreadAppointments,
  };

  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <Stethoscope size={22} />
            {sidebarOpen && <span>HOPE Admin</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(p => !p)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{label}</span>}
              {sidebarOpen && badges[to] > 0 && (
                <span className="nav-badge">{badges[to]}</span>
              )}
              {!sidebarOpen && badges[to] > 0 && (
                <span className="nav-badge-dot" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item view-site"
          >
            <ExternalLink size={18} />
            {sidebarOpen && <span>View Site</span>}
          </a>
          <button className="admin-nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        <header className="admin-topbar">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(p => !p)}>
            <Menu size={20} />
          </button>
          <div className="topbar-brand">
            <Stethoscope size={18} />
            <span>Hope HealthCare — Admin Panel</span>
          </div>
          <div className="topbar-actions">
            {unreadMessages > 0 && (
              <span className="topbar-badge">
                {unreadMessages} new message{unreadMessages > 1 ? 's' : ''}
              </span>
            )}
            <button className="btn-logout-sm" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
