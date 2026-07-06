import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Sphere, Torus } from "@react-three/drei";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Accessories', 'Books'];

const COLORS = [
  { name: 'Obsidian', hex: '#1a1a2e' },
  { name: 'Crimson', hex: '#cc0000' },
  { name: 'Ocean', hex: '#0055cc' },
  { name: 'Forest', hex: '#006622' },
  { name: 'Violet', hex: '#8B5CF6' },
];

// 3D shape per category
function ProductShape({ category, hovered }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.025 : 0.006;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const color = hovered ? '#8B5CF6' : '#6D28D9';
  const emissive = hovered ? '#7C3AED' : '#4C1D95';

  if (category === 'Electronics') {
    return (
      <Box ref={meshRef} args={[1.4, 1.4, 1.4]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={emissive} emissiveIntensity={0.3} />
      </Box>
    );
  }
  if (category === 'Footwear') {
    return (
      <Torus ref={meshRef} args={[0.8, 0.35, 16, 32]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={emissive} emissiveIntensity={0.3} />
      </Torus>
    );
  }
  if (category === 'Clothing') {
    return (
      <Sphere ref={meshRef} args={[0.9, 32, 32]}>
        <meshStandardMaterial color="#F472B6" metalness={0.6} roughness={0.3} emissive="#BE185D" emissiveIntensity={0.2} />
      </Sphere>
    );
  }
  return (
    <Sphere ref={meshRef} args={[0.9, 32, 32]}>
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={emissive} emissiveIntensity={0.3} />
    </Sphere>
  );
}

// Product card — Playful Geometric style
function ProductCard({ product, index, onAddToCart, selectedColor }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const cardColors = [
    { shadow: '#8B5CF6', accent: '#8B5CF6' },
    { shadow: '#F472B6', accent: '#F472B6' },
    { shadow: '#FBBF24', accent: '#FBBF24' },
    { shadow: '#34D399', accent: '#34D399' },
    { shadow: '#8B5CF6', accent: '#8B5CF6' },
    { shadow: '#F472B6', accent: '#F472B6' },
  ];
  const cardColor = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6, delay: index * 0.08,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        rotate: hovered ? -1 : 0,
        scale: hovered ? 1.02 : 1,
        boxShadow: hovered
          ? `8px 8px 0px 0px ${cardColor.shadow}`
          : `4px 4px 0px 0px #1E293B`
      }}
      style={{
        background: '#ffffff',
        border: '2px solid #1E293B',
        borderRadius: '16px', overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '4px 4px 0px 0px #1E293B',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* 3D Canvas */}
      {/* Product Image */}
<div
  onClick={() => navigate(`/products/${product.slug}`)}
  style={{
    height: '220px',
    borderBottom: '2px solid #1E293B',
    position: 'relative', overflow: 'hidden',
    background: `linear-gradient(135deg, ${cardColor.accent}10, ${cardColor.accent}05)`,
    cursor: 'pointer'
  }}
>
  {product.image ? (
    <motion.img
      src={product.image}
      alt={product.name}
      animate={{ scale: hovered ? 1.08 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%', height: '100%',
        objectFit: 'cover', display: 'block'
      }}
    />
  ) : (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #1E293B15 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '64px'
      }}>
        {product.category === 'Electronics' ? '📱' :
         product.category === 'Footwear' ? '👟' :
         product.category === 'Clothing' ? '👕' :
         product.category === 'Books' ? '📚' : '🛍️'}
      </div>
    </>
  )}

  {/* Hover overlay */}
  <motion.div
    animate={{ opacity: hovered ? 1 : 0 }}
    style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(to top, ${cardColor.accent}40, transparent)`,
      pointerEvents: 'none'
    }}
  />

  {/* Category badge */}
  <div style={{
    position: 'absolute', top: '12px', left: '12px',
    padding: '4px 12px', borderRadius: '9999px',
    background: cardColor.accent, color: '#ffffff',
    fontSize: '10px', fontWeight: 700,
    letterSpacing: '1px', textTransform: 'uppercase',
    border: '2px solid #1E293B',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    boxShadow: '2px 2px 0px #1E293B'
  }}>
    {product.category}
  </div>
</div>

      {/* Product info */}
      <div style={{ padding: '20px' }}>
        <h3
          onClick={() => navigate(`/products/${product.slug}`)}
          style={{
            fontSize: '16px', fontWeight: 700,
            color: '#1E293B', marginBottom: '6px',
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: '-0.3px', lineHeight: 1.3
          }}
        >
          {product.name}
        </h3>

        <p style={{
          fontSize: '13px', color: '#64748B',
          marginBottom: '16px', lineHeight: 1.6,
          fontFamily: '"Plus Jakarta Sans", sans-serif'
        }}>
          {product.description?.substring(0, 60)}...
        </p>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '20px', fontWeight: 800,
            color: '#1E293B',
            fontFamily: '"Outfit", sans-serif'
          }}>
            Rs. {product.price?.toLocaleString()}
          </div>

          <motion.button
            whileHover={{
              background: cardColor.accent,
              color: '#ffffff',
              boxShadow: `4px 4px 0px ${cardColor.shadow}88`
            }}
            whileTap={{ scale: 0.95, x: 2, y: 2 }}
            onClick={() => onAddToCart(product)}
            style={{
              padding: '10px 20px', borderRadius: '9999px',
              background: 'transparent',
              border: `2px solid #1E293B`,
              color: '#1E293B', fontSize: '12px',
              fontWeight: 700, cursor: 'pointer',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '2px 2px 0px #1E293B'
            }}
          >
            + Cart
          </motion.button>
        </div>

        <div style={{
          marginTop: '12px', paddingTop: '12px',
          borderTop: '1px dashed #E2E8F0',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '12px', color: '#94A3B8',
          fontFamily: '"Plus Jakarta Sans", sans-serif'
        }}>
          <span>📦 {product.stock} in stock</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => { fetchProducts(); fetchRecommendations(); }, []);

  useEffect(() => {
    let result = products;
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [category, search, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error('Failed to load products');
    }
    setLoading(false);
  };

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API}/ai/recommend`,
        { category: 'Electronics' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(res.data.recommendations);
    } catch (err) { }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { toast.error('Please login first!'); navigate('/login'); return; }
      await axios.post(`${API}/cart/add`,
        { productId: product._id, quantity: 1, price: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${product.name} added! 🛒`);
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #071426 0%, #0A192F 35%, #102A43 70%, #16324F 100%)",
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background shapes */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', background: '#8B5CF620',
          top: '10%', right: '-100px', border: '2px solid #8B5CF630'
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          background: '#FBBF2420', top: '60%', left: '-60px',
          border: '2px solid #FBBF2430',
          transform: 'rotate(45deg)'
        }} />
        <div style={{
          position: 'absolute', width: '150px', height: '150px',
          borderRadius: '50%', background: '#F472B615',
          bottom: '15%', right: '5%', border: '2px solid #F472B625'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ padding: '120px 6% 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '9999px',
              background: '#8B5CF6', color: '#ffffff',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              border: '2px solid #1E293B',
              boxShadow: '3px 3px 0px #1E293B',
              marginBottom: '24px',
              fontFamily: '"Plus Jakarta Sans", sans-serif'
            }}>
              ✦ NepShop Group Store
            </div>
            <h1 style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 800, letterSpacing: '-3px',
              lineHeight: 0.95, color: '#1E293B',
              fontFamily: '"Outfit", sans-serif',
              marginBottom: '16px'
            }}>
              All Products
            </h1>
            <p style={{
              fontSize: '16px', color: '#64748B',
              maxWidth: '500px', lineHeight: 1.7
            }}>
              Discover our AI-curated collection. Every product, hand-picked for you.
            </p>
          </motion.div>
        </div>

        {/* Color selector */}
        <div style={{ padding: '0 6% 32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '16px',
              padding: '16px 24px', borderRadius: '16px',
              background: '#ffffff', border: '2px solid #1E293B',
              boxShadow: '4px 4px 0px #1E293B'
            }}
          >
            <span style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', color: '#64748B',
              textTransform: 'uppercase'
            }}>
              Filter Colour
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(null)}
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6, #F472B6, #FBBF24)',
                  border: selectedColor === null ? '3px solid #1E293B' : '2px solid #E2E8F0',
                  cursor: 'pointer',
                  boxShadow: selectedColor === null ? '2px 2px 0px #1E293B' : 'none',
                  transition: 'all 0.2s ease'
                }}
              />
              {COLORS.map((color, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(color.hex)}
                  title={color.name}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: color.hex,
                    border: selectedColor === color.hex
                      ? '3px solid #1E293B'
                      : '2px solid #E2E8F0',
                    cursor: 'pointer',
                    boxShadow: selectedColor === color.hex ? '2px 2px 0px #1E293B' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Search + Categories */}
        <div style={{ padding: '0 6% 48px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '360px' }}
          >
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 44px',
                background: '#ffffff',
                border: '2px solid #1E293B',
                borderRadius: '12px', color: '#1E293B',
                fontSize: '14px', outline: 'none',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                boxShadow: '3px 3px 0px #1E293B',
                transition: 'box-shadow 0.2s ease'
              }}
              onFocus={e => e.target.style.boxShadow = '3px 3px 0px #8B5CF6'}
              onBlur={e => e.target.style.boxShadow = '3px 3px 0px #1E293B'}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
          >
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -2, boxShadow: `4px 4px 0px #8B5CF6` }}
                whileTap={{ y: 2, boxShadow: '1px 1px 0px #1E293B' }}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '10px 20px', borderRadius: '9999px',
                  background: category === cat ? '#8B5CF6' : '#ffffff',
                  border: '2px solid #1E293B',
                  color: category === cat ? '#ffffff' : '#1E293B',
                  fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  boxShadow: category === cat
                    ? '3px 3px 0px #1E293B'
                    : '2px 2px 0px #1E293B',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '0 6% 48px' }}
          >
            <div style={{
              padding: '24px 28px',
              background: '#ffffff',
              border: '2px solid #1E293B',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px #8B5CF6'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '20px'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9999px',
                  background: '#8B5CF6', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', border: '2px solid #1E293B',
                  boxShadow: '2px 2px 0px #1E293B'
                }}>🤖</div>
                <h3 style={{
                  fontSize: '16px', fontWeight: 700,
                  color: '#1E293B',
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  AI Picks For You
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, boxShadow: '4px 4px 0px #8B5CF6' }}
                    style={{
                      minWidth: '160px', padding: '16px',
                      background: '#FFFDF5',
                      border: '2px solid #1E293B',
                      borderRadius: '12px', cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: '2px 2px 0px #1E293B',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                    <div style={{
                      fontWeight: 700, fontSize: '13px',
                      color: '#1E293B', marginBottom: '4px',
                      fontFamily: '"Outfit", sans-serif'
                    }}>{rec.name}</div>
                    <div style={{
                      fontSize: '14px', fontWeight: 800,
                      color: '#8B5CF6',
                      fontFamily: '"Outfit", sans-serif'
                    }}>Rs. {rec.price?.toLocaleString()}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div style={{ padding: '0 6% 80px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{
                  width: '48px', height: '48px', margin: '0 auto',
                  border: '3px solid #E2E8F0',
                  borderTop: '3px solid #8B5CF6',
                  borderRadius: '50%'
                }}
              />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '80px' }}
            >
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{
                fontSize: '24px', fontWeight: 700,
                color: '#64748d', marginBottom: '8px',
                fontFamily: '"Outfit", sans-serif'
              }}>No products found</h3>
              <p style={{ color: '#64748B' }}>Try a different search or category</p>
            </motion.div>
          ) : (
            <>
              <p style={{
                fontSize: '12px', fontWeight: 700,
                color: '#94A3B8', letterSpacing: '2px',
                textTransform: 'uppercase', marginBottom: '32px'
              }}>
                {filtered.length} PRODUCTS
              </p>
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px'
                }}
              >
                <AnimatePresence>
                  {filtered.map((product, i) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      index={i}
                      onAddToCart={addToCart}
                      selectedColor={selectedColor}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}