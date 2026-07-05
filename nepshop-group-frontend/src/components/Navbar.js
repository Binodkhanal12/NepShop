import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
    ...(user.role === 'admin' ? [{ label: 'Admin', path: '/admin' }] : [])
  ];

  // Determine navbar style based on page
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const navBg = isHomePage
    ? scrolled ? 'rgba(5,5,6,0.9)' : 'transparent'
    : isAuthPage
    ? 'rgba(11,15,20,0.62)'
    : '#FFFDF5';

  const navBorder = isHomePage || isAuthPage
    ? '1px solid rgba(255,255,255,0.07)'
    : '2px solid rgba(30,41,59,0.1)';

  const linkColor = isHomePage || isAuthPage
    ? 'rgba(255,255,255,0.5)'
    : '#64748B';

  const linkActiveColor = isHomePage || isAuthPage
    ? '#EDEDEF'
    : '#1E293B';

  const logoColor = isHomePage || isAuthPage
    ? '#EDEDEF'
    : '#1E293B';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '64px', padding: '0 6%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: navBg,
        backdropFilter: 'blur(18px) saturate(140%)',
        borderBottom: navBorder,
        transition: 'all 0.3s ease'
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ opacity: 0.8 }}
        onClick={() => navigate('/')}
        style={{
          fontSize: '16px', fontWeight: 700,
          letterSpacing: '3px', cursor: 'pointer',
          color: logoColor,
          fontFamily: '"Space Grotesk", sans-serif'
        }}
      >
        NepShop
      </motion.div>

      {/* Center links */}
      <div style={{
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '40px', alignItems: 'center'
      }}>
        {navLinks.map((link, i) => (
          <motion.span
            key={i}
            onClick={() => navigate(link.path)}
            style={{
              cursor: 'pointer', fontSize: '14px',
              fontWeight: 500, letterSpacing: '0.3px',
              color: location.pathname === link.path ? linkActiveColor : linkColor,
              position: 'relative', transition: 'color 0.2s ease',
              fontFamily: '"Inter", sans-serif'
            }}
            whileHover={{ color: linkActiveColor }}
          >
            {link.label}
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                style={{
                  position: 'absolute', bottom: '-4px',
                  left: 0, right: 0, height: '1px',
                  background: isHomePage || isAuthPage ? '#5E6AD2' : '#8B5CF6'
                }}
              />
            )}
          </motion.span>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {token ? (
          <>
            <span style={{
              fontSize: '13px', color: linkColor,
              fontFamily: '"Inter", sans-serif', letterSpacing: '0.3px'
            }}>
              {user.name}
            </span>
            <motion.button
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              style={{
                padding: '8px 20px', borderRadius: '8px',
                background: isHomePage || isAuthPage
                  ? 'rgba(255,255,255,0.05)'
                  : 'transparent',
                border: isHomePage || isAuthPage
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '2px solid #1E293B',
                color: logoColor, fontSize: '13px',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                transition: 'all 0.2s ease'
              }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <motion.span
  whileHover={{ color: linkActiveColor }}
  onClick={() => navigate('/login')}
  style={{
    fontSize: '14px', color: linkColor,
    cursor: 'pointer', fontFamily: '"Inter", sans-serif',
    transition: 'color 0.2s ease'
  }}
>
  Sign in
</motion.span>
            <motion.button
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '8px 20px', borderRadius: '8px',
                background: isHomePage || isAuthPage ? '#5E6AD2' : '#1E293B',
                border: 'none', color: '#ffffff',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                boxShadow: isHomePage || isAuthPage
                  ? '0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : 'none'
              }}
            >
              Start free
            </motion.button>
          </>
        )}
      </div>
    </motion.nav>
  );
}