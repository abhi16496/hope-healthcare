import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Phone, Calendar, MessageCircle, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import '../layout/AdminLayout.css';

const AdminDashboard = () => {
  const { testimonials, contactMessages, appointments } = useAdminData();

  const totalTestimonials = testimonials.length;
  const pendingTestimonials = testimonials.filter(t => t.approved === false).length;
  const avgRating = testimonials.length
    ? (testimonials.reduce((s, t) => s + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : '—';

  const unreadMessages = contactMessages.filter(m => !m.read).length;
  const totalMessages = contactMessages.length;

  const pendingAppts = appointments.filter(a => a.status === 'Pending').length;
  const unreadAppts = appointments.filter(a => !a.read).length;
  const confirmedAppts = appointments.filter(a => a.status === 'Confirmed').length;
  const totalAppts = appointments.length;

  const recentAppts = [...appointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentMessages = [...contactMessages]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Testimonials',
      value: totalTestimonials,
      icon: Star,
      color: '#f59e0b',
      bg: '#fff7ed',
      sub: pendingTestimonials > 0 ? `${pendingTestimonials} pending approval` : 'All approved',
      link: '/admin/testimonials',
    },
    {
      label: 'Avg Rating',
      value: avgRating,
      icon: TrendingUp,
      color: '#10b981',
      bg: '#ecfdf5',
      sub: 'from all reviews',
      link: '/admin/testimonials',
    },
    {
      label: 'Messages',
      value: totalMessages,
      icon: MessageCircle,
      color: '#6366f1',
      bg: '#eef2ff',
      sub: `${unreadMessages} unread`,
      link: '/admin/contact',
    },
    {
      label: 'Appointments',
      value: totalAppts,
      icon: Calendar,
      color: '#1a73e8',
      bg: '#eff6ff',
      sub: unreadAppts > 0 ? `${unreadAppts} new bookings` : `${pendingAppts} pending`,
      link: '/admin/appointments',
    },
  ];

  const statusColor = { Pending: 'pending', Confirmed: 'confirmed', Completed: 'completed', Cancelled: 'cancelled' };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here's what's happening at Hope HealthCare.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map(({ label, value, icon: Icon, color, bg, sub, link }) => (
          <Link key={label} to={link} style={{ textDecoration: 'none' }}>
            <div className="admin-stat-card">
              <div className="stat-icon" style={{ background: bg, color }}>
                <Icon size={20} />
              </div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
              <div className="stat-trend" style={{ color }}>{sub}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent Appointments */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title"><Calendar size={16} />Recent Appointments</h3>
            <Link to="/admin/appointments" className="admin-btn admin-btn-ghost admin-btn-sm">View All</Link>
          </div>
          {recentAppts.length === 0 ? (
            <div className="admin-empty">
              <Calendar size={32} />
              <h3>No appointments yet</h3>
              <p>Bookings from the site will appear here</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppts.map(a => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>{a.date || '—'}</td>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{a.doctor || '—'}</td>
                      <td><span className={`badge badge-${statusColor[a.status] || 'pending'}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title"><MessageCircle size={16} />Recent Messages</h3>
            <Link to="/admin/contact" className="admin-btn admin-btn-ghost admin-btn-sm">View All</Link>
          </div>
          {recentMessages.length === 0 ? (
            <div className="admin-empty">
              <MessageCircle size={32} />
              <h3>No messages yet</h3>
              <p>Contact form submissions will appear here</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentMessages.map(m => (
                <div key={m.id} style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: m.read ? 'transparent' : 'var(--primary-light)',
                  border: `1px solid ${m.read ? 'var(--admin-border)' : 'var(--admin-primary)'}`,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--admin-primary), var(--primary-dark))',
                    color: 'white', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
                  }}>
                    {m.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--admin-text-main)', fontWeight: 600, fontSize: '0.875rem' }}>{m.name}</span>
                      {!m.read && <span className="badge badge-unread">New</span>}
                    </div>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.78rem', marginTop: 2 }}>{m.subject || 'No subject'}</div>
                    <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem', marginTop: 4 }}>
                      {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card" style={{ marginTop: 20 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title"><CheckCircle size={16} />Quick Actions</h3>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {pendingTestimonials > 0 && (
            <Link to="/admin/testimonials" className="admin-btn admin-btn-primary">
              <Star size={16} /> Review {pendingTestimonials} Pending Testimonial{pendingTestimonials > 1 ? 's' : ''}
            </Link>
          )}
          {pendingAppts > 0 && (
            <Link to="/admin/appointments" className="admin-btn admin-btn-success">
              <Calendar size={16} /> Confirm {pendingAppts} Appointment{pendingAppts > 1 ? 's' : ''}
            </Link>
          )}
          {unreadMessages > 0 && (
            <Link to="/admin/contact" className="admin-btn admin-btn-ghost">
              <MessageCircle size={16} /> Read {unreadMessages} New Message{unreadMessages > 1 ? 's' : ''}
            </Link>
          )}
          {pendingTestimonials === 0 && pendingAppts === 0 && unreadMessages === 0 && (
            <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
              <CheckCircle size={16} /> All caught up! No pending actions.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
