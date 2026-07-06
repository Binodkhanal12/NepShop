import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey! 👋 Welcome to NepShop Store! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${API}/ai/chat`,
        { message: userMessage },
        { headers }
      );
      setMessages(prev => [...prev, { from: 'bot', text: response.data.reply }]);
    } catch (err) {
      try {
        const response = await axios.post(`${API}/ai/chat`, { message: userMessage });
        setMessages(prev => [...prev, { from: 'bot', text: response.data.reply }]);
      } catch (err2) {
        setMessages(prev => [...prev, {
          from: 'bot',
          text: 'Sorry, I am temporarily unavailable. Please try again! 😊'
        }]);
      }
    }
    setLoading(false);
  };

  const quickReplies = [
    'Track my order', 'Delivery info',
    'Payment options', 'Return policy'
  ];

  return (
    <>
      <motion.button
        animate={{
          boxShadow: open
            ? '4px 4px 0px #1E293B'
            : ['4px 4px 0px #8B5CF6', '4px 4px 0px #F472B6', '4px 4px 0px #FBBF24', '4px 4px 0px #8B5CF6']
        }}
        transition={{ duration: 3, repeat: Infinity }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '30px', right: '30px',
          zIndex: 9999, width: '60px', height: '60px',
          borderRadius: '9999px',
          background: open ? '#1E293B' : '#8B5CF6',
          border: '2px solid #1E293B',
          cursor: 'pointer', fontSize: '24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '4px 4px 0px #1E293B',
          transition: 'background 0.3s ease'
        }}
      >
        {open ? '✕' : '🤖'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            style={{
              position: 'fixed', bottom: '104px', right: '30px',
              zIndex: 9998, width: '360px', height: '520px',
              background: '#FFFDF5',
              border: '2px solid #1E293B',
              borderRadius: '24px',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '6px 6px 0px #1E293B',
              fontFamily: '"Plus Jakarta Sans", sans-serif'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              background: '#8B5CF6',
              borderBottom: '2px solid #1E293B',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '9999px', background: '#ffffff',
                  border: '2px solid #1E293B',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px',
                  boxShadow: '2px 2px 0px #1E293B'
                }}
              >🤖</motion.div>
              <div>
                <div style={{
                  fontWeight: 700, fontSize: '15px', color: '#ffffff',
                  fontFamily: '"Outfit", sans-serif'
                }}>NepShop AI</div>
                <div style={{
                  fontSize: '11px', color: 'rgba(255,255,255,0.8)',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#34D399', display: 'inline-block'
                  }} />
                  Always online
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                style={{
                  marginLeft: 'auto', width: '32px', height: '32px',
                  borderRadius: '9999px', background: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: '#ffffff', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >✕</motion.button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '12px'
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {msg.from === 'bot' && (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '9999px',
                      background: '#8B5CF6', border: '2px solid #1E293B',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '14px',
                      marginRight: '8px', flexShrink: 0,
                      alignSelf: 'flex-end', boxShadow: '2px 2px 0px #1E293B'
                    }}>🤖</div>
                  )}
                  <div style={{
                    maxWidth: '75%', padding: '10px 14px',
                    borderRadius: msg.from === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    background: msg.from === 'user' ? '#8B5CF6' : '#ffffff',
                    color: msg.from === 'user' ? '#ffffff' : '#1E293B',
                    fontSize: '13px', lineHeight: 1.6,
                    border: '2px solid #1E293B',
                    boxShadow: '2px 2px 0px #1E293B',
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {messages.length === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                      whileHover={{ y: -2, boxShadow: '3px 3px 0px #8B5CF6' }}
                      whileTap={{ y: 1 }}
                      onClick={() => sendMessage(reply)}
                      style={{
                        padding: '6px 12px', borderRadius: '9999px',
                        background: '#ffffff', border: '2px solid #1E293B',
                        color: '#1E293B', fontSize: '11px',
                        fontWeight: 700, cursor: 'pointer',
                        boxShadow: '2px 2px 0px #1E293B',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '9999px',
                    background: '#8B5CF6', border: '2px solid #1E293B',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px',
                    boxShadow: '2px 2px 0px #1E293B'
                  }}>🤖</div>
                  <div style={{
                    padding: '10px 14px', background: '#ffffff',
                    border: '2px solid #1E293B',
                    borderRadius: '16px 16px 16px 4px',
                    boxShadow: '2px 2px 0px #1E293B',
                    display: 'flex', gap: '4px', alignItems: 'center'
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        style={{
                          width: '6px', height: '6px',
                          borderRadius: '50%', background: '#8B5CF6'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '2px solid #1E293B',
              background: '#ffffff',
              display: 'flex', gap: '10px', alignItems: 'center'
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1, padding: '10px 14px',
                  background: '#FFFDF5',
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px', color: '#1E293B',
                  fontSize: '13px', outline: 'none',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
              <motion.button
                whileHover={{ scale: 1.1, background: '#7C3AED' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage()}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '12px', background: '#8B5CF6',
                  border: '2px solid #1E293B', cursor: 'pointer',
                  fontSize: '16px', color: '#ffffff',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px #1E293B',
                  transition: 'all 0.2s ease'
                }}
              >➤</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
