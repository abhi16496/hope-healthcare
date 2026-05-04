import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Save, Plus, Trash2, Check, X, Eye } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import '../layout/AdminLayout.css';

const AdminContact = () => {
  const { contactInfo, setContactInfo, contactMessages, markMessageRead, deleteMessage } = useAdminData();
  const [info, setInfo] = useState({ ...contactInfo });
  const [saved, setSaved] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // info | inbox
  const [expandedMsg, setExpandedMsg] = useState(null);

  const handleSave = () => {
    setContactInfo(info);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addPhone = () => {
    if (newPhone.trim()) {
      setInfo(p => ({ ...p, phones: [...p.phones, newPhone.trim()] }));
      setNewPhone('');
    }
  };

  const removePhone = (idx) => {
    setInfo(p => ({ ...p, phones: p.phones.filter((_, i) => i !== idx) }));
  };

  const unread = contactMessages.filter(m => !m.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Contact & Info</h1>
        <p className="admin-page-subtitle">Edit clinic contact details and view incoming messages.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          className={`admin-btn admin-btn-sm ${activeTab === 'info' ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
          onClick={() => setActiveTab('info')}
        >
          <MapPin size={14} /> Contact Info
        </button>
        <button
          className={`admin-btn admin-btn-sm ${activeTab === 'inbox' ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
          onClick={() => setActiveTab('inbox')}
        >
          <MessageCircle size={14} /> Inbox
          {unread > 0 && <span className="nav-badge" style={{ marginLeft: 6 }}>{unread}</span>}
        </button>
      </div>

      {activeTab === 'info' && (
        <>
          {/* Address */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><MapPin size={16} />Clinic Address</h3>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Address (use \n for line breaks)</label>
              <textarea
                className="admin-form-textarea"
                rows={3}
                value={info.address}
                onChange={e => setInfo(p => ({ ...p, address: e.target.value }))}
              />
            </div>
          </div>

          {/* Phones */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><Phone size={16} />Phone Numbers</h3>
            </div>
            <div className="tags-list" style={{ marginBottom: 14 }}>
              {info.phones.map((ph, i) => (
                <div key={i} className="tag-item">
                  {ph}
                  <button className="tag-remove" onClick={() => removePhone(i)}>×</button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="admin-form-input"
                style={{ maxWidth: 280 }}
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPhone())}
              />
              <button className="admin-btn admin-btn-success admin-btn-sm" onClick={addPhone}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Email & WhatsApp */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><Mail size={16} />Email & WhatsApp</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Email Address</label>
                <input
                  className="admin-form-input"
                  type="email"
                  value={info.email}
                  onChange={e => setInfo(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">WhatsApp Number (digits only, with country code)</label>
                <input
                  className="admin-form-input"
                  value={info.whatsapp}
                  onChange={e => setInfo(p => ({ ...p, whatsapp: e.target.value }))}
                  placeholder="919945538883"
                />
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title"><Clock size={16} />Consultation Timings</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Physician Morning</label>
                <input
                  className="admin-form-input"
                  value={info.physicianMorning}
                  onChange={e => setInfo(p => ({ ...p, physicianMorning: e.target.value }))}
                  placeholder="11:00 AM – 2:00 PM"
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Physician Evening</label>
                <input
                  className="admin-form-input"
                  value={info.physicianEvening}
                  onChange={e => setInfo(p => ({ ...p, physicianEvening: e.target.value }))}
                  placeholder="7:00 PM – 9:30 PM"
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Day Care Hours</label>
                <input
                  className="admin-form-input"
                  value={info.dayCare}
                  onChange={e => setInfo(p => ({ ...p, dayCare: e.target.value }))}
                  placeholder="9:00 AM – 10:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
            {saved && (
              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}>
                <Check size={16} /> Saved! The public site is updated.
              </span>
            )}
          </div>
        </>
      )}

      {activeTab === 'inbox' && (
        <div>
          {contactMessages.length === 0 ? (
            <div className="admin-card">
              <div className="admin-empty">
                <MessageCircle size={36} />
                <h3>No messages yet</h3>
                <p>Contact form submissions will appear here.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...contactMessages]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(m => (
                  <div key={m.id} className="admin-card" style={{
                    padding: '16px 20px',
                    marginBottom: 0,
                    borderColor: !m.read ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.1)',
                  }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '1rem',
                      }}>
                        {m.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--admin-text-main)', fontWeight: 600 }}>{m.name}</span>
                          {!m.read && <span className="badge badge-unread">New</span>}
                          <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>
                            {new Date(m.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: '0.8rem', color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                          <span><Phone size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{m.phone}</span>
                          {m.email && <span><Mail size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{m.email}</span>}
                        </div>
                        {m.subject && (
                          <div style={{ color: 'var(--gray-600)', fontSize: '0.85rem', marginTop: 6, fontWeight: 500 }}>
                            Re: {m.subject}
                          </div>
                        )}
                        {expandedMsg === m.id && (
                          <div style={{
                            marginTop: 10, padding: '16px', background: 'var(--gray-50)',
                            borderRadius: 12, color: 'var(--admin-text-main)', fontSize: '0.875rem', lineHeight: 1.6,
                            border: '1px solid var(--admin-border)'
                          }}>
                            {m.message}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button
                          className="admin-btn admin-btn-ghost admin-btn-sm"
                          onClick={() => {
                            setExpandedMsg(p => p === m.id ? null : m.id);
                            if (!m.read) markMessageRead(m.id);
                          }}
                        >
                          <Eye size={14} /> {expandedMsg === m.id ? 'Collapse' : 'Read'}
                        </button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteMessage(m.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminContact;
