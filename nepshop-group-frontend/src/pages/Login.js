import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Welcome back!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
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
          borderRadius: '9999px', filter: 'blur(80px)', opacity: 0.35,
          background: 'radial-gradient(circle, #ccfbf1, #5eead4, #2dd4bf, #0f766e)',
          top: '-200px', left: '-100px',
          animation: 'float 10s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '9999px', filter: 'blur(80px)', opacity: 0.32,
          background: 'radial-gradient(circle, #fbe9ff, #f0abfc, #e879f9, #a21caf)',
          top: '-100px', right: '-100px',
          animation: 'float2 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '9999px', filter: 'blur(60px)', opacity: 0.25,
          background: 'radial-gradient(circle, #38bdf8, #6366f1, #312e81)',
          bottom: '-100px', left: '30%',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        {/* Grid veil */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,212,191,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} />
        {/* Darkening overlays */}
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
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '9999px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '32px', fontSize: '12px',
              color: '#2dd4bf', letterSpacing: '1px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 6px #2dd4bf' }} />
              NepShop  Store 
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700, lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              <span style={{ color: '#ffffff' }}>Shop smarter</span><br />
              <span style={{
                background: 'linear-gradient(100deg, #2dd4bf 0%, #5eead4 38%, #e879f9 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>with AI power</span>
            </h1>

            <p style={{
              fontSize: '16px', color: '#94a3b8',
              lineHeight: 1.7, marginBottom: '40px', maxWidth: '400px'
            }}>
              Experience next-generation shopping with AI recommendations, real-time chatbot support, and immersive product views.
            </p>

            {/* Features list */}
            {[
              { icon: '🤖', label: 'Chatbot Integration', color: '#2dd4bf' },
              { icon: '💬', label: '24/7 smart chatbot support', color: '#e879f9' },
              { icon: '⚡', label: 'Lightning-fast experience', color: '#2dd4bf' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  marginBottom: '16px'
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: `rgba(${item.color === '#2dd4bf' ? '45,212,191' : '232,121,249'},0.15)`,
                  border: `1px solid rgba(${item.color === '#2dd4bf' ? '45,212,191' : '232,121,249'},0.2)`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '16px', flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{item.label}</span>
              </motion.div>
            ))}

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}
            >
              <div style={{ display: 'flex' }}>
                {['#2dd4bf', '#e879f9', '#6366f1', '#f59e0b'].map((color, i) => (
                  <div key={i} style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${color}, ${color}88)`,
                    border: '2px solid #0b0f14',
                    marginLeft: i > 0 ? '-8px' : '0'
                  }} />
                ))}
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid #0b0f14',
                  marginLeft: '-8px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: '#94a3b8', fontWeight: 600
                }}>9k+</div>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Trusted by thousands of shoppers
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Glass card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Aurora kiss orbs */}
            <div style={{
              position: 'absolute', width: '200px', height: '200px',
              borderRadius: '9999px', filter: 'blur(40px)', opacity: 0.4,
              background: '#e879f9', top: '-60px', right: '-60px', zIndex: 0
            }} />
            <div style={{
              position: 'absolute', width: '150px', height: '150px',
              borderRadius: '9999px', filter: 'blur(40px)', opacity: 0.3,
              background: '#2dd4bf', bottom: '-40px', left: '-40px', zIndex: 0
            }} />

            {/* Glass card */}
            <div className="glass" style={{
              borderRadius: '26px', padding: '40px',
              position: 'relative', zIndex: 1
            }}>
              <h2 style={{
                fontSize: '24px', fontWeight: 600,
                color: '#ffffff', marginBottom: '6px',
                fontFamily: '"Space Grotesk", sans-serif'
              }}>
                Welcome back
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>
                Sign in to your NepShop Group account
              </p>

              {/* Social buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {[
                  { icon: '🌐', label: 'Google' },
                  { icon: '⚡', label: 'GitHub' }
                ].map((btn, i) => (
                  <button
  key={i}
  onClick={() => {
    if (btn.label === "Google") {
      window.open("https://accounts.google.com/", "_blank");
    } else {
      window.open("https://github.com/login", "_blank");
    }
  }}
  style={{
    padding: '10px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.045)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#cbd5e1',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
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

              {/* Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {/* Email */}
                <div>
                  <label style={{
                    fontSize: '12px', fontWeight: 600,
                    color: '#94a3b8', letterSpacing: '1px',
                    textTransform: 'uppercase', display: 'block', marginBottom: '8px'
                  }}>Email</label>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    borderRadius: '12px', height: '48px',
                    background: 'rgba(255,255,255,0.04)',
                    border: focused === 'email'
                      ? '1px solid rgba(45,212,191,0.7)'
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: focused === 'email'
                      ? '0 0 0 4px rgba(45,212,191,0.14), 0 0 26px -4px rgba(45,212,191,0.55)'
                      : 'none',
                    transition: 'all 0.2s ease', padding: '0 16px', gap: '10px'
                  }}>
                    <span style={{ fontSize: '16px' }}>📧</span>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                      style={{
                        flex: 1, background: 'transparent',
                        border: 'none', outline: 'none',
                        color: '#e2e8f0', fontSize: '14px',
                        fontFamily: '"Inter", sans-serif'
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{
                      fontSize: '12px', fontWeight: 600,
                      color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase'
                    }}>Password</label>
                    <span
    onClick={()=>navigate("/forgot-password")}
    style={{
        fontSize:'12px',
        color:'#2dd4bf',
        cursor:'pointer'
    }}
>
Forgot?
</span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    borderRadius: '12px', height: '48px',
                    background: focused === 'password' ? 'rgba(45,212,191,0.06)' : 'rgba(255,255,255,0.04)',
                    border: focused === 'password'
                      ? '1px solid rgba(45,212,191,0.7)'
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: focused === 'password'
                      ? '0 0 0 4px rgba(45,212,191,0.14), 0 0 26px -4px rgba(45,212,191,0.55)'
                      : 'none',
                    transition: 'all 0.2s ease', padding: '0 16px', gap: '10px'
                  }}>
                    <span style={{ fontSize: '16px' }}>🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused('')}
                      onKeyPress={e => e.key === 'Enter' && handleSubmit()}
                      style={{
                        flex: 1, background: 'transparent',
                        border: 'none', outline: 'none',
                        color: '#e2e8f0', fontSize: '14px',
                        fontFamily: '"Inter", sans-serif'
                      }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer', fontSize: '16px', color: '#64748b' }}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(45,212,191,0.3), 0 0 0 1px rgba(45,212,191,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: '12px', border: 'none',
                  background: loading ? 'rgba(45,212,191,0.3)' : 'linear-gradient(100deg, #2dd4bf 0%, #5eead4 38%, #e879f9 100%)',
                  color: '#0b0f14', fontSize: '15px',
                  fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: '"Space Grotesk", sans-serif',
                  boxShadow: '0 4px 20px rgba(45,212,191,0.25)',
                  transition: 'all 0.2s ease', marginBottom: '16px'
                }}
              >
                {loading ? 'Signing in...' : 'Sign in →'}
              </motion.button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                New to NepShop Group?{' '}
                <span
                  onClick={() => navigate('/register')}
                  style={{ color: '#2dd4bf', cursor: 'pointer', fontWeight: 500 }}
                >
                  Create an account
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '48px', flexWrap: 'wrap'
        }}>
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