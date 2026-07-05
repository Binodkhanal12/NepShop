import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Welcome to Patas Group! 🎉');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0b0f14',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Inter", sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Aurora blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '9999px', filter: 'blur(80px)', opacity: 0.32,
          background: 'radial-gradient(circle, #fbe9ff, #f0abfc, #e879f9, #a21caf)',
          top: '-200px', right: '-100px',
          animation: 'float 10s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '9999px', filter: 'blur(80px)', opacity: 0.35,
          background: 'radial-gradient(circle, #ccfbf1, #5eead4, #2dd4bf, #0f766e)',
          bottom: '-100px', left: '-100px',
          animation: 'float2 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '9999px', filter: 'blur(60px)', opacity: 0.25,
          background: 'radial-gradient(circle, #38bdf8, #6366f1, #312e81)',
          top: '30%', left: '40%',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,212,191,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,15,20,0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11,15,20,0.8) 100%)' }} />
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '80px 24px 40px',
        position: 'relative', zIndex: 2
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '80px', maxWidth: '1100px', width: '100%',
          alignItems: 'center'
        }}>

          {/* Left pitch */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '9999px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '32px', fontSize: '12px',
              color: '#e879f9', letterSpacing: '1px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e879f9', boxShadow: '0 0 6px #e879f9' }} />
              Join 50,000+ shoppers
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700, lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              <span style={{ color: '#ffffff' }}>Start your</span><br />
              <span style={{
                background: 'linear-gradient(100deg, #e879f9 0%, #f0abfc 38%, #2dd4bf 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>journey today</span>
            </h1>

            <p style={{
              fontSize: '16px', color: '#94a3b8',
              lineHeight: 1.7, marginBottom: '40px', maxWidth: '400px'
            }}>
              Create your free account and discover a world of Chatbot Integrated shopping, exclusive deals, and premium products.
            </p>

            {[
              { icon: '🎯', label: 'Personalized AI recommendations', color: '#e879f9' },
              { icon: '🛒', label: 'Smart cart & order tracking', color: '#2dd4bf' },
              { icon: '🔐', label: 'Secure & private shopping', color: '#e879f9' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: '14px', marginBottom: '16px'
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: `rgba(${item.color === '#e879f9' ? '232,121,249' : '45,212,191'},0.15)`,
                  border: `1px solid rgba(${item.color === '#e879f9' ? '232,121,249' : '45,212,191'},0.2)`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '16px', flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Glass card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'absolute', width: '200px', height: '200px',
              borderRadius: '9999px', filter: 'blur(40px)', opacity: 0.4,
              background: '#2dd4bf', top: '-60px', right: '-60px', zIndex: 0
            }} />
            <div style={{
              position: 'absolute', width: '150px', height: '150px',
              borderRadius: '9999px', filter: 'blur(40px)', opacity: 0.3,
              background: '#e879f9', bottom: '-40px', left: '-40px', zIndex: 0
            }} />

            <div className="glass" style={{ borderRadius: '26px', padding: '40px', position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: '24px', fontWeight: 600,
                color: '#ffffff', marginBottom: '6px',
                fontFamily: '"Space Grotesk", sans-serif'
              }}>
                Create account
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>
                Join NepShop Group Store for free
              </p>

              {/* Social buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {[{ icon: '🌐', label: 'Google' }, { icon: '⚡', label: 'GitHub' }].map((btn, i) => (
                  <button key={i} style={{
                    padding: '10px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#cbd5e1', fontSize: '13px',
                    fontWeight: 500, cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s ease',
                    fontFamily: '"Inter", sans-serif'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.045)'}
                  >
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1))' }} />
                <span style={{ fontSize: '11px', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase' }}>or with email</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.1))' }} />
              </div>

              {/* Form fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Name', icon: '👤' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', icon: '📧' },
                  { key: 'password', label: 'Password', type: showPassword ? 'text' : 'password', placeholder: '••••••••', icon: '🔒' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{
                      fontSize: '12px', fontWeight: 600,
                      color: '#94a3b8', letterSpacing: '1px',
                      textTransform: 'uppercase', display: 'block', marginBottom: '8px'
                    }}>{field.label}</label>
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      borderRadius: '12px', height: '48px',
                      background: focused === field.key ? 'rgba(232,121,249,0.06)' : 'rgba(255,255,255,0.04)',
                      border: focused === field.key
                        ? '1px solid rgba(232,121,249,0.7)'
                        : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: focused === field.key
                        ? '0 0 0 4px rgba(232,121,249,0.14), 0 0 26px -4px rgba(232,121,249,0.55)'
                        : 'none',
                      transition: 'all 0.2s ease',
                      padding: '0 16px', gap: '10px'
                    }}>
                      <span style={{ fontSize: '16px' }}>{field.icon}</span>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused('')}
                        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                        style={{
                          flex: 1, background: 'transparent',
                          border: 'none', outline: 'none',
                          color: '#e2e8f0', fontSize: '14px',
                          fontFamily: '"Inter", sans-serif'
                        }}
                      />
                      {field.key === 'password' && (
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: 'pointer', fontSize: '16px', color: '#64748b' }}
                        >
                          {showPassword ? '👁️' : '🙈'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(232,121,249,0.3), 0 0 0 1px rgba(232,121,249,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: '12px', border: 'none',
                  background: loading ? 'rgba(232,121,249,0.3)' : 'linear-gradient(100deg, #e879f9 0%, #f0abfc 38%, #2dd4bf 100%)',
                  color: '#0b0f14', fontSize: '15px',
                  fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: '"Space Grotesk", sans-serif',
                  boxShadow: '0 4px 20px rgba(232,121,249,0.25)',
                  transition: 'all 0.2s ease', marginBottom: '16px'
                }}
              >
                {loading ? 'Creating account...' : 'Create Account →'}
              </motion.button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                Already have an account?{' '}
                <span
                  onClick={() => navigate('/login')}
                  style={{ color: '#e879f9', cursor: 'pointer', fontWeight: 500 }}
                >
                  Sign in
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.015)',
        padding: '24px 6%', position: 'relative', zIndex: 2
      }}>
        <p style={{
          textAlign: 'center', fontSize: '10px',
          letterSpacing: '3px', color: '#475569',
          textTransform: 'uppercase', marginBottom: '16px'
        }}>
          Powering shoppers everywhere
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {['🏪 NepShop Mart', '🛍️ NepShop Fashion', '📱 NepShop Tech', '🏠 NepShop Home', '⚡ NepShop Quick'].map((brand, i) => (
            <span key={i} style={{
              fontSize: '13px', color: '#475569',
              fontWeight: 600, letterSpacing: '1px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>{brand}</span>
          ))}
        </div>
      </div>
    </div>
  );
}