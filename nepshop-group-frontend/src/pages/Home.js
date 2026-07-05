import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '🤖', title: 'AI Recommendations', desc: 'Our engine learns your preferences and surfaces products you\'ll love before you even search.' },
  { icon: '💬', title: 'Smart Chatbot', desc: '24/7 AI assistant handles order tracking, product queries, and instant support.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Redis-powered caching ensures every page loads instantly. Zero friction.' },
  { icon: '🔐', title: 'Secure by Design', desc: 'JWT authentication and end-to-end encryption keeps your data safe.' },
  { icon: '📦', title: 'Real-time Inventory', desc: 'Live stock updates across all products. Never order something out of stock.' },
  { icon: '🌍', title: 'Cloud-Native', desc: 'Built on MongoDB Atlas. Always available, always fast, globally distributed.' },
];

export default function Home() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });



  useEffect(() => {
    let ticking = false;
    const handleMouse = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div style={{
      background: '#050506',
      minHeight: '100vh',
      fontFamily: '"Space Grotesk", system-ui, sans-serif'
    }} className="noise">

      {/* ═══ HERO ═══ */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient blobs — CSS only, no 3D */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: '800px', height: '800px',
            top: '-300px', left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(94,106,210,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            top: '100px', left: '-150px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)', animation: 'float2 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            top: '200px', right: '-150px',
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)', animation: 'float 12s ease-in-out infinite reverse'
          }} />
          {/* Floating geometric shapes — CSS only */}
          {[
            { size: 80, top: '15%', left: '8%', delay: 0, color: 'rgba(94,106,210,0.15)' },
            { size: 50, top: '25%', right: '10%', delay: 1, color: 'rgba(99,102,241,0.12)' },
            { size: 100, bottom: '20%', left: '12%', delay: 2, color: 'rgba(79,70,229,0.1)' },
            { size: 60, bottom: '30%', right: '8%', delay: 0.5, color: 'rgba(94,106,210,0.12)' },
            { size: 40, top: '50%', left: '5%', delay: 1.5, color: 'rgba(129,140,248,0.1)' },
            { size: 70, top: '60%', right: '6%', delay: 2.5, color: 'rgba(94,106,210,0.08)' },
          ].map((shape, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                delay: shape.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: shape.size, height: shape.size,
                top: shape.top, left: shape.left,
                right: shape.right, bottom: shape.bottom,
                background: shape.color,
                border: `1px solid ${shape.color}`,
                borderRadius: i % 2 === 0 ? '8px' : '50%',
                backdropFilter: 'blur(4px)'
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} />

        {/* Radial overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 20%, #050506 75%)'
        }} />

        {/* Mouse spotlight */}
        <div style={{
          position: 'absolute', zIndex: 1, pointerEvents: 'none',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,106,210,0.06) 0%, transparent 70%)',
          left: mousePos.x - 200, top: mousePos.y - 200,
          transition: 'left 0.15s ease, top 0.15s ease'
        }} />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 24px'
          }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '9999px',
                background: 'rgba(94,106,210,0.1)',
                border: '1px solid rgba(94,106,210,0.3)',
                marginBottom: '32px', fontSize: '12px',
                color: '#818CF8', letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#5E6AD2', display: 'inline-block',
                boxShadow: '0 0 8px #5E6AD2'
              }} />
              Chatbot Integrated Commerce
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 600, lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: '24px', maxWidth: '900px'
              }}
            >
              <span className="gradient-text-linear">The Future of</span>
              <br />
              <span className="gradient-text-accent">Shopping</span>
              <span className="gradient-text-linear"> is Here</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: '#8A8F98', maxWidth: '560px',
                lineHeight: 1.7, marginBottom: '48px',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              NepShop Group Store brings AI-powered recommendations, real-time chatbot support, and an immersive shopping experience unlike anything else.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 0 1px rgba(94,106,210,0.5), 0 8px 32px rgba(94,106,210,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/products')}
                style={{
                  padding: '14px 32px', borderRadius: '8px',
                  background: '#5E6AD2', border: 'none',
                  color: '#ffffff', fontSize: '15px',
                  fontWeight: 600, cursor: 'pointer',
                  fontFamily: '"Space Grotesk", sans-serif',
                  boxShadow: '0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transition: 'all 0.2s ease'
                }}
              >
                Explore Store →
              </motion.button>
              <motion.button
                whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                style={{
                  padding: '14px 32px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#EDEDEF', fontSize: '15px',
                  fontWeight: 600, cursor: 'pointer',
                  fontFamily: '"Space Grotesk", sans-serif',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                Join Free
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                display: 'flex', gap: '48px', marginTop: '80px',
                flexWrap: 'wrap', justifyContent: 'center'
              }}
            >
              {[
                { num: '10K+', label: 'Products' },
                { num: '50K+', label: 'Customers' },
                { num: '99.9%', label: 'Uptime' },
                { num: 'Chatbot', label: 'Integrated' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontSize: '28px', fontWeight: 600,
                    letterSpacing: '-1px', color: '#EDEDEF'
                  }}>{stat.num}</div>
                  <div style={{
                    fontSize: '11px', letterSpacing: '2px',
                    color: '#8A8F98', textTransform: 'uppercase',
                    fontFamily: '"Inter", sans-serif', marginTop: '4px'
                  }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', bottom: '40px',
            left: '50%', transform: 'translateX(-50%)',
            zIndex: 3, display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: '8px'
          }}
        >
          <span style={{
            fontSize: '10px', letterSpacing: '4px',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif'
          }}>Scroll</span>
          <div style={{
            width: '1px', height: '48px',
            background: 'linear-gradient(to bottom, rgba(94,106,210,0.6), transparent)'
          }} />
        </motion.div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: '128px 6%', position: 'relative' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '80px' }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: '64px' }}
        >
          <p style={{
            fontSize: '11px', letterSpacing: '4px',
            color: '#5E6AD2', textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif', marginBottom: '16px'
          }}>
            Why NepShop  Group
          </p>
          <h2
            className="gradient-text-linear"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 600, letterSpacing: '-0.03em',
              maxWidth: '600px'
            }}
          >
            Built for the future of commerce
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
          maxWidth: '1200px', margin: '0 auto'
        }}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '128px 6%' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '80px' }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '800px', margin: '0 auto',
            textAlign: 'center', padding: '80px 48px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.4)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '400px', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(94,106,210,0.5), transparent)'
          }} />

          <h2
            className="gradient-text-linear"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 600, letterSpacing: '-0.03em',
              marginBottom: '16px'
            }}
          >
            Ready to experience<br />
            <span className="gradient-text-accent">NepShop Group Store?</span>
          </h2>

          <p style={{
            fontSize: '16px', color: '#8A8F98',
            lineHeight: 1.7, marginBottom: '40px',
            fontFamily: '"Inter", sans-serif'
          }}>
            Join thousands of customers shopping the future. Chatbot-integrated, beautifully designed, effortlessly fast.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 0 1px rgba(94,106,210,0.5), 0 8px 32px rgba(94,106,210,0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/products')}
              style={{
                padding: '16px 40px', borderRadius: '8px',
                background: '#5E6AD2', border: 'none',
                color: '#ffffff', fontSize: '16px',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: '"Space Grotesk", sans-serif',
                boxShadow: '0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              Start Shopping →
            </motion.button>
            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '16px 40px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#EDEDEF', fontSize: '16px',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: '"Space Grotesk", sans-serif'
              }}
            >
              Create Account
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 6%',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px'
      }}>
        <span style={{
          fontSize: '16px', fontWeight: 700,
          letterSpacing: '2px', color: '#EDEDEF'
        }}>NEPSHOP GROUP</span>
        <span style={{
          fontSize: '12px', color: '#8A8F98',
          letterSpacing: '1px',
          fontFamily: '"Inter", sans-serif'
        }}>
          © 2026 NepShop Group Store. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Contact'].map((link, i) => (
            <span key={i} style={{
              fontSize: '13px', color: '#8A8F98',
              cursor: 'pointer',
              fontFamily: '"Inter", sans-serif',
              transition: 'color 0.2s ease'
            }}
              onMouseEnter={e => e.target.style.color = '#EDEDEF'}
              onMouseLeave={e => e.target.style.color = '#8A8F98'}
            >{link}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// Feature Card with mouse spotlight
function FeatureCard({ feature, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef();

  const gridSpans = [
    { col: 'span 3', row: 'span 2' },
    { col: 'span 3', row: 'span 1' },
    { col: 'span 3', row: 'span 1' },
    { col: 'span 2', row: 'span 1' },
    { col: 'span 2', row: 'span 1' },
    { col: 'span 2', row: 'span 1' },
  ];

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: gridSpans[index]?.col || 'span 2',
        gridRow: gridSpans[index]?.row || 'span 1',
        padding: '32px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        border: hovered ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered
          ? '0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)'
          : '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Mouse spotlight */}
      {hovered && (
        <div style={{
          position: 'absolute', pointerEvents: 'none',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,106,210,0.15) 0%, transparent 70%)',
          left: mousePos.x - 150, top: mousePos.y - 150,
          transition: 'left 0.05s ease, top 0.05s ease'
        }} />
      )}

      {/* Top edge glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(94,106,210,0.4), transparent)'
      }} />

      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: 'rgba(94,106,210,0.15)',
        border: '1px solid rgba(94,106,210,0.2)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '22px', marginBottom: '20px'
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontSize: '18px', fontWeight: 600,
        color: '#EDEDEF', marginBottom: '12px',
        letterSpacing: '-0.3px',
        fontFamily: '"Space Grotesk", sans-serif'
      }}>
        {feature.title}
      </h3>
      <p style={{
        fontSize: '14px', color: '#8A8F98',
        lineHeight: 1.7, fontFamily: '"Inter", sans-serif'
      }}>
        {feature.desc}
      </p>
    </motion.div>
  );
}