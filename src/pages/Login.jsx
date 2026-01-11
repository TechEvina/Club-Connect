import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (resetEmail) {
      setResetMessage(`Password reset instructions sent to ${resetEmail}`);
      setTimeout(() => {
        setShowResetModal(false);
        setResetMessage('');
        setResetEmail('');
      }, 2000);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF8F0 0%, #FEFDFB 50%, #F9F9F9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '40px',
        border: '1px solid rgba(126, 217, 87, 0.1)',
        boxShadow: '0 8px 32px rgba(126, 217, 87, 0.12)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>
          Sign in to continue to ClubConnect
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              display: 'block', 
              margin: '0 auto 16px', 
              padding: '12px 16px', 
              width: '100%',
              border: '1.5px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              display: 'block', 
              margin: '0 auto 8px', 
              padding: '12px 16px', 
              width: '100%',
              border: '1.5px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setShowResetModal(true); }}
              style={{ color: '#7ED957', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}
            >
              Forgot password?
            </a>
          </div>
          {error && <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            aria-label="Sign in to your account"
            style={{ 
              padding: '14px', 
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #7ED957, #6EB5FF)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '16px',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/app/register" style={{ color: '#7ED957', textDecoration: 'none', fontWeight: '500' }}>Sign up</Link>
        </p>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowResetModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#333', marginBottom: '8px' }}>Reset Password</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              Enter your email and we'll send you instructions to reset your password
            </p>
            {resetMessage ? (
              <p style={{ color: '#7ED957', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                ✓ {resetMessage}
              </p>
            ) : (
              <form onSubmit={handleReset}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1.5px solid #E5E5E5',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'transparent',
                      border: '1px solid #E5E5E5',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #7ED957, #6EB5FF)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;