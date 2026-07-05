import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Sphere, Torus, OrbitControls } from "@react-three/drei";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const COLORS = [
  { name: 'Obsidian', hex: '#1a1a2e' },
  { name: 'Crimson', hex: '#cc0000' },
  { name: 'Ocean', hex: '#0055cc' },
  { name: 'Forest', hex: '#006622' },
  { name: 'Violet', hex: '#8B5CF6' },
];

// 3D Product Viewer
function Product3DViewer({ category, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  const mat = (
    <meshStandardMaterial
      color={color || '#8B5CF6'}
      metalness={0.9}
      roughness={0.1}
      emissive={color || '#6D28D9'}
      emissiveIntensity={0.2}
    />
  );

  if (category === 'Electronics') {
    return <Box ref={meshRef} args={[2, 2, 2]}>{mat}</Box>;
  }
  if (category === 'Footwear') {
    return <Torus ref={meshRef} args={[1.2, 0.5, 16, 32]}>{mat}</Torus>;
  }
  return <Sphere ref={meshRef} args={[1.3, 32, 32]}>{mat}</Sphere>;
}

// Image Carousel (3D style from DevDesign)
function ProductCarousel({ product, selectedColor }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const views = product?.images?.length > 0
    ? product.images.map((img, i) => ({
        label: ['Front', 'Side', 'Detail', 'Pack', 'Style'][i] || `View ${i + 1}`,
        img
      }))
    : [{ label: 'Front', img: product?.image }];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % views.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + views.length) % views.length);

  useEffect(() => {
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: '#ffffff',
      border: '2px solid #1E293B',
      borderRadius: '20px',
      boxShadow: '6px 6px 0px #1E293B',
      overflow: 'hidden'
    }}>
      {/* Main Image Carousel */}
      <div style={{
        height: '380px', position: 'relative',
        background: 'linear-gradient(135deg, #FFFDF5, #F1F5F9)',
        borderBottom: '2px solid #1E293B',
        overflow: 'hidden'
      }}>
        {/* Dot pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #1E293B12 1px, transparent 1px)',
          backgroundSize: '20px 20px', zIndex: 0
        }} />

        {/* 3D Perspective carousel */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px'
        }}>
          {views.map((view, index) => {
            const offset = index - currentIndex;
            let pos = (offset + views.length) % views.length;
            if (pos > Math.floor(views.length / 2)) pos = pos - views.length;

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return (
              <motion.div
                key={index}
                animate={{
                  x: `${pos * 45}%`,
                  scale: isCenter ? 1 : isAdjacent ? 0.75 : 0.6,
                  rotateY: pos * -12,
                  opacity: isCenter ? 1 : isAdjacent ? 0.5 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  width: '180px', height: '240px',
                  visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible'
                }}
              >
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '16px',
                  border: '2px solid #1E293B',
                  overflow: 'hidden',
                  boxShadow: isCenter ? '4px 4px 0px #1E293B' : 'none',
                  background: selectedColor
                    ? `${selectedColor.hex}15`
                    : '#F1F5F9'
                }}>
                  {view.img ? (
                    <img
                      src={view.img}
                      alt={view.label}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '48px'
                    }}>
                      {product?.category === 'Electronics' ? '📱' :
                       product?.category === 'Footwear' ? '👟' :
                       product?.category === 'Clothing' ? '👕' : '🛍️'}
                    </div>
                  )}
                </div>

                {/* View label */}
                <div style={{
                  position: 'absolute', bottom: '-28px',
                  left: '50%', transform: 'translateX(-50%)',
                  padding: '3px 10px', borderRadius: '9999px',
                  background: '#1E293B', color: '#ffffff',
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '1px', textTransform: 'uppercase',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  whiteSpace: 'nowrap'
                }}>
                  {view.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nav buttons */}
        <motion.button
          whileHover={{ scale: 1.1, background: '#8B5CF6', color: '#ffffff' }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', zIndex: 20,
            width: '40px', height: '40px', borderRadius: '9999px',
            background: '#ffffff', border: '2px solid #1E293B',
            cursor: 'pointer', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 2px 0px #1E293B',
            transition: 'all 0.2s ease'
          }}
        >←</motion.button>
        <motion.button
          whileHover={{ scale: 1.1, background: '#8B5CF6', color: '#ffffff' }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          style={{
            position: 'absolute', right: '16px', top: '50%',
            transform: 'translateY(-50%)', zIndex: 20,
            width: '40px', height: '40px', borderRadius: '9999px',
            background: '#ffffff', border: '2px solid #1E293B',
            cursor: 'pointer', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 2px 0px #1E293B',
            transition: 'all 0.2s ease'
          }}
        >→</motion.button>
      </div>

      {/* Dots */}
      <div style={{
        padding: '20px 16px 16px',
        display: 'flex', justifyContent: 'center', gap: '8px'
      }}>
        {views.map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.3 }}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? '24px' : '8px',
              height: '8px', borderRadius: '9999px',
              background: currentIndex === i ? '#8B5CF6' : '#E2E8F0',
              border: '2px solid #1E293B',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLORS[4]);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API}/products/${id}`);
      setProduct(res.data);
      fetchRecommendations(res.data.category);
    } catch (err) {
      toast.error('Product not found');
      navigate('/products');
    }
    setLoading(false);
  };

  const fetchRecommendations = async (category) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API}/ai/recommend`,
        { category, current_product_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(res.data.recommendations);
    } catch (err) { }
  };

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) { toast.error('Please login first!'); navigate('/login'); return; }
      await axios.post(`${API}/cart/add`,
        { productId: product._id, quantity, price: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Added to cart! 🛒`);
    } catch (err) {
      toast.error('Failed to add to cart');
    }
    setAddingToCart(false);
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
      position: 'relative'
    }}>
      {/* Decorative shapes */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', background: '#8B5CF620',
          top: '5%', right: '-80px', border: '2px solid #8B5CF630'
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          background: '#FBBF2420', bottom: '20%', left: '-60px',
          border: '2px solid #FBBF2430', transform: 'rotate(45deg)'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '100px 6% 60px' }}>

        {/* Back button */}
        <motion.button
          whileHover={{ x: -4, boxShadow: '4px 4px 0px #8B5CF6' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '9999px',
            background: '#ffffff', border: '2px solid #1E293B',
            color: '#1E293B', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', marginBottom: '40px',
            boxShadow: '3px 3px 0px #1E293B',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          ← Back to Products
        </motion.button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'start'
        }}>

          {/* Left — 3D Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCarousel
  product={product}
  selectedColor={selectedColor}
/>
          </motion.div>

          {/* Right — Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 16px', borderRadius: '9999px',
              background: '#8B5CF6', color: '#ffffff',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              border: '2px solid #1E293B',
              boxShadow: '3px 3px 0px #1E293B',
              marginBottom: '20px',
              fontFamily: '"Plus Jakarta Sans", sans-serif'
            }}>
              {product?.category}
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, color: '#1E293B',
              letterSpacing: '-1px', lineHeight: 1.1,
              marginBottom: '16px',
              fontFamily: '"Outfit", sans-serif'
            }}>
              {product?.name}
            </h1>

            <p style={{
              fontSize: '15px', color: '#64748B',
              lineHeight: 1.8, marginBottom: '28px'
            }}>
              {product?.description}
            </p>

            {/* Price */}
            <div style={{
              fontSize: '42px', fontWeight: 800,
              color: '#1E293B', marginBottom: '28px',
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-2px'
            }}>
              Rs. {product?.price?.toLocaleString()}
            </div>

            {/* Color selector */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{
                fontSize: '12px', fontWeight: 700,
                color: '#64748B', letterSpacing: '2px',
                textTransform: 'uppercase', marginBottom: '12px'
              }}>
                Select Colour — {selectedColor.name}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {COLORS.map((color, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    style={{
                      width: '32px', height: '32px',
                      borderRadius: '9999px',
                      background: color.hex,
                      border: selectedColor.name === color.name
                        ? '3px solid #1E293B'
                        : '2px solid #E2E8F0',
                      cursor: 'pointer',
                      boxShadow: selectedColor.name === color.name
                        ? '2px 2px 0px #1E293B'
                        : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{
                fontSize: '12px', fontWeight: 700,
                color: '#64748B', letterSpacing: '2px',
                textTransform: 'uppercase', marginBottom: '12px'
              }}>
                Quantity
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0',
                border: '2px solid #1E293B', borderRadius: '12px',
                overflow: 'hidden', boxShadow: '3px 3px 0px #1E293B'
              }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '44px', height: '44px',
                    background: '#F1F5F9', border: 'none',
                    borderRight: '2px solid #1E293B',
                    color: '#1E293B', fontSize: '20px',
                    fontWeight: 700, cursor: 'pointer'
                  }}
                >−</motion.button>
                <span style={{
                  padding: '0 24px', fontSize: '18px',
                  fontWeight: 700, color: '#1E293B',
                  fontFamily: '"Outfit", sans-serif',
                  minWidth: '60px', textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '44px', height: '44px',
                    background: '#F1F5F9', border: 'none',
                    borderLeft: '2px solid #1E293B',
                    color: '#1E293B', fontSize: '20px',
                    fontWeight: 700, cursor: 'pointer'
                  }}
                >+</motion.button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <motion.button
                whileHover={{ y: -3, boxShadow: '6px 6px 0px #1E293B' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
                onClick={addToCart}
                disabled={addingToCart}
                style={{
                  flex: 1, padding: '16px',
                  background: addingToCart ? '#E2E8F0' : '#8B5CF6',
                  border: '2px solid #1E293B',
                  borderRadius: '12px',
                  color: addingToCart ? '#94A3B8' : '#ffffff',
                  fontSize: '15px', fontWeight: 700,
                  cursor: addingToCart ? 'not-allowed' : 'pointer',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '4px 4px 0px #1E293B',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
              </motion.button>

              <motion.button
                whileHover={{ y: -3, boxShadow: '6px 6px 0px #8B5CF6', background: '#FBBF24' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
                onClick={() => navigate('/cart')}
                style={{
                  padding: '16px 24px',
                  background: '#ffffff',
                  border: '2px solid #1E293B',
                  borderRadius: '12px',
                  color: '#1E293B', fontSize: '15px',
                  fontWeight: 700, cursor: 'pointer',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '4px 4px 0px #1E293B',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                View Cart
              </motion.button>
            </div>

            {/* Product details */}
            <div style={{
              padding: '20px',
              background: '#ffffff',
              border: '2px solid #1E293B',
              borderRadius: '16px',
              boxShadow: '4px 4px 0px #1E293B'
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '16px'
              }}>
                {[
                  { icon: '📦', label: 'In Stock', value: `${product?.stock} units` },
                  { icon: '🚚', label: 'Delivery', value: 'Free · 3-5 days' },
                  { icon: '↩️', label: 'Returns', value: '7-day policy' },
                ].map((detail, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{detail.icon}</div>
                    <div style={{
                      fontSize: '11px', color: '#64748B',
                      letterSpacing: '1px', textTransform: 'uppercase',
                      marginBottom: '2px'
                    }}>{detail.label}</div>
                    <div style={{
                      fontSize: '13px', fontWeight: 700,
                      color: '#1E293B',
                      fontFamily: '"Outfit", sans-serif'
                    }}>{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginTop: '80px' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginBottom: '28px'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '9999px',
                background: '#8B5CF6', border: '2px solid #1E293B',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
                boxShadow: '3px 3px 0px #1E293B'
              }}>🤖</div>
              <h2 style={{
                fontSize: '24px', fontWeight: 700,
                color: '#1E293B',
                fontFamily: '"Outfit", sans-serif'
              }}>
                You might also like
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -4,
                    boxShadow: '6px 6px 0px #8B5CF6',
                    rotate: -1
                  }}
                  style={{
                    padding: '20px',
                    background: '#ffffff',
                    border: '2px solid #1E293B',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0px #1E293B',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
                  <div style={{
                    fontWeight: 700, fontSize: '14px',
                    color: '#1E293B', marginBottom: '6px',
                    fontFamily: '"Outfit", sans-serif'
                  }}>{rec.name}</div>
                  <div style={{
                    fontSize: '16px', fontWeight: 800,
                    color: '#8B5CF6',
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    Rs. {rec.price?.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}