import React, { useState } from 'react';
import { Star, Plus, Trash2, Edit3, Check, X, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import '../layout/AdminLayout.css';

const emptyForm = { name: '', service: '', rating: 5, review: '', source: 'Admin' };

const AdminTestimonials = () => {
  const { testimonials, setTestimonials } = useAdminData();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all'); // all | pending | approved
  const [deleteId, setDeleteId] = useState(null);

  // ── Approve / Hide ────────────────────────────────────────────────────────
  const toggleApprove = (id) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !t.approved } : t));
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const confirmDelete = () => {
    setTestimonials(prev => prev.filter(t => t.id !== deleteId));
    setDeleteId(null);
  };

  // ── Add ───────────────────────────────────────────────────────────────────
  const handleAdd = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      ...form,
      approved: true,
      createdAt: new Date().toISOString(),
    };
    setTestimonials(prev => [entry, ...prev]);
    setForm(emptyForm);
    setShowAdd(false);
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const startEdit = (t) => { setEditId(t.id); setEditForm({ ...t }); };
  const cancelEdit = () => { setEditId(null); setEditForm({}); };
  const saveEdit = () => {
    setTestimonials(prev => prev.map(t => t.id === editId ? { ...t, ...editForm } : t));
    cancelEdit();
  };

  // ── Reorder ───────────────────────────────────────────────────────────────
  const moveUp = (idx) => {
    if (idx === 0) return;
    setTestimonials(prev => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };
  const moveDown = (idx) => {
    setTestimonials(prev => {
      if (idx >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const filtered = testimonials.filter(t => {
    if (filter === 'pending') return t.approved === false;
    if (filter === 'approved') return t.approved !== false;
    return true;
  });

  const pendingCount = testimonials.filter(t => t.approved === false).length;

  const StarRow = ({ value, onChange, size = 20 }) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          fill={n <= value ? '#f59e0b' : 'none'}
          color={n <= value ? '#f59e0b' : '#475569'}
          style={{ cursor: onChange ? 'pointer' : 'default' }}
          onClick={() => onChange && onChange(n)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="admin-page-title">Testimonials</h1>
            <p className="admin-page-subtitle">
              {testimonials.length} total · {pendingCount} pending approval
            </p>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(p => !p)}>
            <Plus size={16} /> Add Testimonial
          </button>
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="admin-card" style={{ border: '1px solid rgba(99,102,241,0.4)' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title"><Plus size={16} />New Testimonial</h3>
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => { setShowAdd(false); setForm(emptyForm); }}>
              <X size={14} /> Cancel
            </button>
          </div>
          <form onSubmit={handleAdd}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Patient Name *</label>
                <input className="admin-form-input" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Service</label>
                <input className="admin-form-input" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} placeholder="e.g. Physiotherapy" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Source</label>
                <input className="admin-form-input" value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))} placeholder="e.g. Justdial, Google" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Rating</label>
                <StarRow value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} size={24} />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Review *</label>
              <textarea className="admin-form-textarea" required rows={4} value={form.review} onChange={e => setForm(p => ({ ...p, review: e.target.value }))} placeholder="Patient's testimonial text..." />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="admin-btn admin-btn-primary"><Check size={16} /> Add Testimonial</button>
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => { setShowAdd(false); setForm(emptyForm); }}><X size={16} /> Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'approved', 'pending'].map(f => (
          <button
            key={f}
            className={`admin-btn admin-btn-sm ${filter === f ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'approved' ? 'Approved' : `Pending (${pendingCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <Star size={36} />
            <h3>No testimonials here</h3>
            <p>{filter === 'pending' ? 'No pending reviews to approve.' : 'Add your first testimonial.'}</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((t, idx) => (
            <div key={t.id} className="admin-card" style={{
              borderColor: t.approved === false ? 'rgba(251,191,36,0.3)' : 'rgba(99,102,241,0.15)',
              padding: '18px 20px',
              marginBottom: 0,
            }}>
              {editId === t.id ? (
                /* ── Edit Mode ── */
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-form-label">Name</label>
                      <input className="admin-form-input" value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-form-label">Service</label>
                      <input className="admin-form-input" value={editForm.service} onChange={e => setEditForm(p => ({ ...p, service: e.target.value }))} />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-form-label">Source</label>
                      <input className="admin-form-input" value={editForm.source} onChange={e => setEditForm(p => ({ ...p, source: e.target.value }))} />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-form-label">Rating</label>
                      <StarRow value={editForm.rating} onChange={v => setEditForm(p => ({ ...p, rating: v }))} size={22} />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 14 }}>
                    <label className="admin-form-label">Review</label>
                    <textarea className="admin-form-textarea" rows={3} value={editForm.review} onChange={e => setEditForm(p => ({ ...p, review: e.target.value }))} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={saveEdit}><Check size={14} /> Save</button>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={cancelEdit}><X size={14} /> Cancel</button>
                  </div>
                </div>
              ) : (
                /* ── View Mode ── */
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  {/* Reorder */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ padding: '3px 6px' }} onClick={() => moveUp(testimonials.indexOf(t))}>
                      <ChevronUp size={14} />
                    </button>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ padding: '3px 6px' }} onClick={() => moveDown(testimonials.indexOf(t))}>
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {/* Avatar */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: t.approved === false ? 'rgba(251,191,36,0.15)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1rem',
                  }}>
                    {t.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{t.service}</span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>· {t.source}</span>
                      <span className={`badge ${t.approved === false ? 'badge-unapproved' : 'badge-approved'}`}>
                        {t.approved === false ? 'Pending' : 'Approved'}
                      </span>
                      {t.createdAt && (
                        <span style={{ color: '#475569', fontSize: '0.73rem', marginLeft: 'auto' }}>
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <StarRow value={t.rating} />
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '8px 0 0', lineHeight: 1.6 }}>
                      "{t.review}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button
                      className={`admin-btn admin-btn-sm ${t.approved === false ? 'admin-btn-success' : 'admin-btn-ghost'}`}
                      onClick={() => toggleApprove(t.id)}
                      title={t.approved === false ? 'Approve' : 'Hide from site'}
                    >
                      {t.approved === false ? <Eye size={14} /> : <EyeOff size={14} />}
                      {t.approved === false ? 'Approve' : 'Hide'}
                    </button>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => startEdit(t)}>
                      <Edit3 size={14} />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteId(t.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999,
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: '#1e293b', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 16, padding: '32px', maxWidth: 380, width: '90%', textAlign: 'center',
          }}>
            <Trash2 size={40} style={{ color: '#f87171', marginBottom: 16 }} />
            <h3 style={{ color: '#e2e8f0', margin: '0 0 8px' }}>Delete Testimonial?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 24 }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="admin-btn admin-btn-danger" onClick={confirmDelete}><Trash2 size={15} /> Delete</button>
              <button className="admin-btn admin-btn-ghost" onClick={() => setDeleteId(null)}><X size={15} /> Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
