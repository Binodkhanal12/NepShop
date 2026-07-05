import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      const res = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    } catch (err) {
      toast.error('Failed to load cart');
    }
    setLoading(false);
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Item removed!');
      fetchCart();
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/orders`, {
        items: cart.items,
        totalPrice: cart.totalPrice,
        shippingAddress: { street: 'TBD', city: 'Kathmandu', country: 'Nepal' }
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Order placed! 🎉');
      fetchCart();
    } catch (err) {
      toast.error('Failed to place order');
    }
    setPlacing(false);
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#FFFDF5',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: '48px', height: '48px',
          border: '3px solid #E2E8F0',
          borderTop: '3px solid #8B5CF6',
          borderRadius: '50%'
        }}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#FFFDF5',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Decorative shapes */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '250px', height: '250px',
          borderRadius: '50%', background: '#FBBF2420',
          top: '5%', right: '-60px', border: '2px solid #FBBF2430'
        }} />
        <div style={{
          position: 'absolute', width: '180px', height: '180px',
          background: '#F472B615', bottom: '20%', left: '-50px',
          border: '2px solid #F472B625', transform: 'rotate(45deg)'
        }} />
        <div style={{
          position: 'absolute', width: '120px', height: '120px',
          borderRadius: '50%', background: '#34D39915',
          bottom: '10%', right: '8%', border: '2px solid #34D39925'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '100px 6% 60px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            background: '#FBBF24', color: '#1E293B',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            border: '2px solid #1E293B',
            boxShadow: '3px 3px 0px #1E293B',
            marginBottom: '16px'
          }}>
            🛒 Your Cart
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800, letterSpacing: '-3px',
            color: '#1E293B',
            fontFamily: '"Outfit", sans-serif'
          }}>
            Shopping Cart
          </h1>
        </motion.div>

        {!cart || cart.items?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <div style={{
              width: '120px', height: '120px', margin: '0 auto 24px',
              background: '#ffffff', borderRadius: '50%',
              border: '3px solid #1E293B',
              boxShadow: '6px 6px 0px #1E293B',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '48px'
            }}>
              🛒
            </div>
            <h2 style={{
              fontSize: '28px', fontWeight: 700,
              color: '#1E293B', marginBottom: '12px',
              fontFamily: '"Outfit", sans-serif'
            }}>
              Your cart is empty!
            </h2>
            <p style={{ color: '#64748B', marginBottom: '32px' }}>
              Add some amazing products to get started
            </p>
            <motion.button
              whileHover={{ y: -3, boxShadow: '6px 6px 0px #1E293B' }}
              whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
              onClick={() => navigate('/products')}
              style={{
                padding: '16px 40px', borderRadius: '9999px',
                background: '#8B5CF6', border: '2px solid #1E293B',
                color: '#ffffff', fontSize: '15px',
                fontWeight: 700, cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                boxShadow: '4px 4px 0px #1E293B',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              Start Shopping →
            </motion.button>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '32px', alignItems: 'start'
          }}>

            {/* Cart items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AnimatePresence>
                {cart.items.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, scale: 0.9 }}
                    transition={{
                      delay: i * 0.08,
                      type: 'spring', bounce: 0.3
                    }}
                    whileHover={{ y: -2, boxShadow: '6px 6px 0px #8B5CF6' }}
                    style={{
                      background: '#ffffff',
                      border: '2px solid #1E293B',
                      borderRadius: '16px', padding: '20px 24px',
                      display: 'flex', alignItems: 'center', gap: '20px',
                      boxShadow: '4px 4px 0px #1E293B',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Product icon */}
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #8B5CF620, #F472B620)',
                      border: '2px solid #1E293B',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '32px',
                      flexShrink: 0, boxShadow: '2px 2px 0px #1E293B'
                    }}>
                      🛍️
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px', fontWeight: 700,
                        color: '#1E293B', marginBottom: '4px',
                        fontFamily: '"Outfit", sans-serif'
                      }}>
                        {item.product?.name || 'Product'}
                      </h3>
                      <p style={{
                        fontSize: '13px', color: '#64748B',
                        fontFamily: '"Plus Jakarta Sans", sans-serif'
                      }}>
                        Qty: {item.quantity} × Rs. {item.price?.toLocaleString()}
                      </p>
                    </div>

                    <div style={{
                      fontSize: '20px', fontWeight: 800,
                      color: '#8B5CF6',
                      fontFamily: '"Outfit", sans-serif',
                      flexShrink: 0
                    }}>
                      Rs. {(item.price * item.quantity)?.toLocaleString()}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, background: '#FEE2E2', borderColor: '#EF4444' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.product?._id)}
                      style={{
                        width: '36px', height: '36px',
                        borderRadius: '9999px',
                        background: '#ffffff',
                        border: '2px solid #1E293B',
                        color: '#64748B', cursor: 'pointer',
                        fontSize: '14px', fontWeight: 700,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '2px 2px 0px #1E293B',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}
                    >
                      ✕
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
              style={{
                background: '#ffffff',
                border: '2px solid #1E293B',
                borderRadius: '20px', padding: '28px',
                boxShadow: '6px 6px 0px #1E293B',
                position: 'sticky', top: '80px'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '2px dashed #E2E8F0'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9999px',
                  background: '#FBBF24', border: '2px solid #1E293B',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px',
                  boxShadow: '2px 2px 0px #1E293B'
                }}>🧾</div>
                <h2 style={{
                  fontSize: '18px', fontWeight: 700,
                  color: '#1E293B',
                  fontFamily: '"Outfit", sans-serif'
                }}>Order Summary</h2>
              </div>

              {/* Items */}
              <div style={{ marginBottom: '20px' }}>
                {cart.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '12px', fontSize: '13px',
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}>
                    <span style={{ color: '#64748B' }}>
                      {item.product?.name?.substring(0, 20) || 'Product'} ×{item.quantity}
                    </span>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>
                      Rs. {(item.price * item.quantity)?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{
                borderTop: '2px dashed #E2E8F0',
                paddingTop: '16px', marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '8px', fontSize: '13px',
                  fontFamily: '"Plus Jakarta Sans", sans-serif'
                }}>
                  <span style={{ color: '#64748B' }}>Subtotal</span>
                  <span style={{ color: '#1E293B', fontWeight: 600 }}>Rs. {cart.totalPrice?.toLocaleString()}</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '8px', fontSize: '13px',
                  fontFamily: '"Plus Jakarta Sans", sans-serif'
                }}>
                  <span style={{ color: '#64748B' }}>Delivery</span>
                  <span style={{ color: '#34D399', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '16px', paddingTop: '16px',
                  borderTop: '2px solid #1E293B'
                }}>
                  <span style={{
                    fontSize: '16px', fontWeight: 700,
                    color: '#1E293B',
                    fontFamily: '"Outfit", sans-serif'
                  }}>Total</span>
                  <span style={{
                    fontSize: '24px', fontWeight: 800,
                    color: '#8B5CF6',
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    Rs. {cart.totalPrice?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place order button */}
              <motion.button
                whileHover={{ y: -3, boxShadow: '6px 6px 0px #1E293B' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
                onClick={placeOrder}
                disabled={placing}
                style={{
                  width: '100%', padding: '16px',
                  background: placing ? '#E2E8F0' : '#8B5CF6',
                  border: '2px solid #1E293B',
                  borderRadius: '12px',
                  color: placing ? '#94A3B8' : '#ffffff',
                  fontSize: '16px', fontWeight: 700,
                  cursor: placing ? 'not-allowed' : 'pointer',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '4px 4px 0px #1E293B',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  marginBottom: '12px'
                }}
              >
                {placing ? 'Placing Order...' : '🚀 Place Order'}
              </motion.button>

              <motion.button
                whileHover={{ background: '#F1F5F9' }}
                onClick={() => navigate('/products')}
                style={{
                  width: '100%', padding: '12px',
                  background: 'transparent',
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px',
                  color: '#64748B', fontSize: '14px',
                  fontWeight: 600, cursor: 'pointer',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  transition: 'all 0.2s ease'
                }}
              >
                ← Continue Shopping
              </motion.button>

              {/* Trust badges */}
              <div style={{
                marginTop: '20px', paddingTop: '20px',
                borderTop: '2px dashed #E2E8F0',
                display: 'flex', gap: '12px',
                justifyContent: 'center', flexWrap: 'wrap'
              }}>
                {['🔐 Secure', '🚚 Free Delivery', '↩️ Easy Returns'].map((badge, i) => (
                  <span key={i} style={{
                    fontSize: '11px', color: '#64748B',
                    fontWeight: 600,
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}>{badge}</span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}