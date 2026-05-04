import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Clock, Check, X, Trash2, Plus, Save, Settings } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import '../layout/AdminLayout.css';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const STATUS_CLASS = { Pending: 'pending', Confirmed: 'confirmed', Completed: 'completed', Cancelled: 'cancelled' };

const AdminAppointments = () => {
  const { 
    appointments, updateAppointment, markAppointmentRead, deleteAppointment,
    appointmentSettings, setAppointmentSettings 
  } = useAdminData();
  
  const [activeTab, setActiveTab] = useState('list'); // list | settings
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState({ ...appointmentSettings });
  const [newDoctor, setNewDoctor] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const filtered = appointments.filter(a => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const s = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      a.name?.toLowerCase().includes(s) || 
      a.date?.toLowerCase().includes(s) || 
      a.doctor?.toLowerCase().includes(s) || 
      a.phone?.includes(s);
    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const countByStatus = (s) => appointments.filter(a => a.status === s).length;

  const saveSettings = () => {
    setAppointmentSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const addDoctor = () => {
    if (newDoctor.trim()) {
      setSettings(p => ({ ...p, doctors: [...p.doctors, newDoctor.trim()] }));
      setNewDoctor('');
    }
  };
  const removeDoctor = (i) => setSettings(p => ({ ...p, doctors: p.doctors.filter((_, idx) => idx !== i) }));

  const addSlot = () => {
    if (newSlot.trim()) {
      setSettings(p => ({ ...p, timeSlots: [...p.timeSlots, newSlot.trim()] }));
      setNewSlot('');
    }
  };
  const removeSlot = (i) => setSettings(p => ({ ...p, timeSlots: p.timeSlots.filter((_, idx) => idx !== i) }));

  const unreadCount = appointments.filter(a => !a.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="admin-page-title">Appointments</h1>
            <p className="admin-page-subtitle">
              {appointments.length} total · {countByStatus('Pending')} pending
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!appointmentSettings.isOpen && (
              <span className="badge badge-cancelled" style={{ fontSize: '0.78rem' }}>Bookings Closed</span>
            )}
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`admin-btn admin-btn-sm ${activeTab === 'list' ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
            onClick={() => setActiveTab('list')}
          >
            <Calendar size={14} /> Bookings
            {unreadCount > 0 && <span className="nav-badge" style={{ marginLeft: 6 }}>{unreadCount}</span>}
          </button>
          <button
            className={`admin-btn admin-btn-sm ${activeTab === 'settings' ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={14} /> Settings
          </button>
        </div>

        {activeTab === 'list' && (
          <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by name, date, doctor..."
              className="admin-form-input"
              style={{ paddingLeft: '40px' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Plus size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%) rotate(45deg)', color: 'var(--admin-text-muted)' }} />
          </div>
        )}
      </div>

      {activeTab === 'list' && (
        <>
          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {STATUS_OPTIONS.map(s => (
              <div key={s} style={{
                padding: '10px 18px', borderRadius: 12,
                background: filter === s ? 'var(--primary-light)' : 'var(--admin-card-bg)',
                border: filter === s ? '1px solid var(--admin-primary)' : '1px solid var(--admin-border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }} onClick={() => setFilter(filter === s ? 'all' : s)}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: filter === s ? 'var(--admin-primary)' : 'var(--admin-text-main)' }}>{countByStatus(s)}</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s}</div>
              </div>
            ))}
            <div style={{
              padding: '10px 18px', borderRadius: 12,
              background: filter === 'all' ? 'var(--primary-light)' : 'var(--admin-card-bg)',
              border: filter === 'all' ? '1px solid var(--admin-primary)' : '1px solid var(--admin-border)',
              cursor: 'pointer',
            }} onClick={() => setFilter('all')}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: filter === 'all' ? 'var(--admin-primary)' : 'var(--admin-text-main)' }}>{appointments.length}</div>
              <div style={{ fontSize: '0.73rem', color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>All</div>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className="admin-card">
              <div className="admin-empty">
                <Calendar size={36} />
                <h3>No appointments found</h3>
                <p>Appointment bookings from the site will appear here.</p>
              </div>
            </div>
          ) : (
            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Contact</th>
                      <th>Doctor</th>
                      <th>Date / Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map(a => (
                      <React.Fragment key={a.id}>
                        <tr 
                          style={{ cursor: 'pointer', borderLeft: !a.read ? '3px solid var(--primary)' : 'none' }} 
                          onClick={() => {
                            setExpandedId(p => p === a.id ? null : a.id);
                            if (!a.read) markAppointmentRead(a.id);
                          }}
                        >
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ fontWeight: 600, color: 'var(--admin-text-main)' }}>{a.name}</div>
                              {!a.read && <span className="badge badge-unread">New</span>}
                            </div>
                            {a.age && <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Age: {a.age} · {a.gender}</div>}
                          </td>
                          <td>
                            <div style={{ fontSize: '0.82rem' }}>{a.phone}</div>
                            {a.email && <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{a.email}</div>}
                          </td>
                          <td style={{ fontSize: '0.82rem' }}>{a.doctor || '—'}</td>
                          <td>
                            <div style={{ fontSize: '0.82rem' }}>{a.date || '—'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{a.time || '—'}</div>
                          </td>
                          <td>
                            <span className={`badge badge-${STATUS_CLASS[a.status]}`}>{a.status}</span>
                          </td>
                          <td onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <select 
                                className="admin-form-select admin-btn-sm" 
                                style={{ width: 'auto', padding: '4px 8px' }}
                                value={a.status}
                                onChange={(e) => updateAppointment(a.id, { status: e.target.value })}
                              >
                                {STATUS_OPTIONS.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button 
                                className="admin-btn admin-btn-danger admin-btn-sm" 
                                style={{ padding: '6px' }}
                                onClick={() => {
                                  if(window.confirm('Delete this appointment?')) deleteAppointment(a.id);
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedId === a.id && a.message && (
                          <tr>
                            <td colSpan={6} style={{ background: 'var(--gray-50)', paddingTop: 12, paddingBottom: 16 }}>
                              <div style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', lineHeight: 1.6, padding: '0 10px' }}>
                                <strong style={{ color: 'var(--gray-700)' }}>Message / Symptoms: </strong>
                                {a.message}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: 8, padding: '0 10px' }}>
                                Submitted: {new Date(a.createdAt).toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'settings' && (
        <>
          {/* Open/Close toggle */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><Calendar size={16} />Booking Availability</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="admin-toggle-wrap">
                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={settings.isOpen}
                    onChange={e => setSettings(p => ({ ...p, isOpen: e.target.checked }))}
                  />
                  <span className="admin-toggle-slider" />
                </label>
                <span style={{ color: settings.isOpen ? '#34d399' : '#f87171', fontWeight: 600, fontSize: '0.9rem' }}>
                  Appointment Booking is {settings.isOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              {!settings.isOpen && (
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Closed Message (shown to patients)</label>
                  <textarea
                    className="admin-form-textarea"
                    rows={2}
                    value={settings.closedMessage}
                    onChange={e => setSettings(p => ({ ...p, closedMessage: e.target.value }))}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Doctors list */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><User size={16} />Available Doctors</h3>
            </div>
            <div className="tags-list" style={{ marginBottom: 14 }}>
              {settings.doctors.map((d, i) => (
                <div key={i} className="tag-item">
                  {d}
                  <button className="tag-remove" onClick={() => removeDoctor(i)}>×</button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="admin-form-input"
                style={{ maxWidth: 280 }}
                value={newDoctor}
                onChange={e => setNewDoctor(e.target.value)}
                placeholder="Dr. Name"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDoctor())}
              />
              <button className="admin-btn admin-btn-success admin-btn-sm" onClick={addDoctor}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Time slots */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><Clock size={16} />Available Time Slots</h3>
            </div>
            <div className="tags-list" style={{ marginBottom: 14 }}>
              {settings.timeSlots.map((s, i) => (
                <div key={i} className="tag-item">
                  {s}
                  <button className="tag-remove" onClick={() => removeSlot(i)}>×</button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="admin-form-input"
                style={{ maxWidth: 280 }}
                value={newSlot}
                onChange={e => setNewSlot(e.target.value)}
                placeholder="11:00 AM - 12:00 PM"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSlot())}
              />
              <button className="admin-btn admin-btn-success admin-btn-sm" onClick={addSlot}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="admin-btn admin-btn-primary" onClick={saveSettings}>
              <Save size={16} /> Save Settings
            </button>
            {settingsSaved && (
              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}>
                <Check size={16} /> Saved! Public site updated instantly.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAppointments;
