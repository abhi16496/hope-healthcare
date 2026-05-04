import React, { useState, useEffect } from 'react';
import { Stethoscope, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import './AdminAuth.css';

const SESSION_KEY = 'hopehc_admin_auth';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'hope@admin123';

const AdminAuth = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthed(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate slight delay for UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setAuthed(true);
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 600);
  };

  if (authed) return children;

  return (
    <div className="admin-auth-wrap">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <Stethoscope size={32} />
        </div>
        <div className="auth-header">
          <h1>Admin Panel</h1>
          <p>Hope HealthCare Clinic Management</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label>
              <Lock size={14} />
              Admin Password
            </label>
            <div className="auth-input-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password"
                autoFocus
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw(p => !p)}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading || !password}>
            {loading ? (
              <span className="auth-spinner" />
            ) : (
              <>
                <ShieldCheck size={18} />
                Access Dashboard
              </>
            )}
          </button>
        </form>

        <p className="auth-hint">
          Default password: <code>hope@admin123</code>
          <br />
          <small>Set <code>VITE_ADMIN_PASSWORD</code> in .env.local to change.</small>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
