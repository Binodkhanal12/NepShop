import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '',
    category: 'Electronics', stock: '', images: ''
  });

  const categories = ['Electronics', 'Clothing', 'Footwear', 'Accessories', 'Books'];

  const statColors = [
    { bg: '#8B5CF6', shadow: '#6D28D9' },
    { bg: '#F472B6', shadow: '#BE185D' },
    { bg: '#FBBF24', shadow: '#B45309' },
    { bg: '#34D399', shadow: '#065F46' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      toast.error('Admin access only!');
      navigate('/');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load products');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const imagesArray = form.images
        ? form.images.split(',').map(url => url.trim()).filter(url => url)
        : [];
      const productData = {
        ...form,
        images: imagesArray,
        image: imagesArray[0] || ''
      };
      if (editProduct) {
        await axios.put(`${API}/products/${editProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Product updated! ✅');
      } else {
        await axios.post(`${API}/products`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Product added! 🎉');
      }
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: '', description: '', price: '', category: 'Electronics', stock: '', images: '' });
      fetchProducts();
    } catch (err) {
      toast.error('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name, description: product.description,
      price: product.price, category: product.category,
      stock: product.stock,
      images: Array.isArray(product.images) && product.images.length > 0
        ? product.images.join(', ')
        : product.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product deleted!');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: '#FFFDF5',
    border: '2px solid #1E293B',
    borderRadius: '10px', color: '#1E293B',
    fontSize: '14px', outline: 'none',
    marginBottom: '12px',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    boxShadow: '2px 2px 0px #E2E8F0',
    transition: 'box-shadow 0.2s ease'
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: '🛍️' },
    { label: 'Total Stock', value: products.reduce((a, p) => a + (p.stock || 0), 0), icon: '📦' },
    { label: 'Avg Price', value: `Rs.${Math.round(products.reduce((a, p) => a + p.price, 0) / (products.length || 1)).toLocaleString()}`, icon: '💰' },
    { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, icon: '📂' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#FFFDF5',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', background: '#8B5CF615',
          top: '5%', right: '-80px', border: '2px solid #8B5CF620'
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          background: '#FBBF2415', bottom: '20%', left: '-60px',
          border: '2px solid #FBBF2420', transform: 'rotate(45deg)'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '100px 6% 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '40px',
            flexWrap: 'wrap', gap: '20px'
          }}
        >
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '9999px',
              background: '#FBBF24', color: '#1E293B',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              border: '2px solid #1E293B',
              boxShadow: '3px 3px 0px #1E293B', marginBottom: '16px'
            }}>⚙️ Admin Panel</div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 800, letterSpacing: '-2px',
              color: '#1E293B', fontFamily: '"Outfit", sans-serif'
            }}>Store Dashboard</h1>
            <p style={{ color: '#64748B', marginTop: '8px' }}>
              Manage your NepShop Group products
            </p>
          </div>
          <motion.button
            whileHover={{ y: -3, boxShadow: '6px 6px 0px #1E293B' }}
            whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
            onClick={() => {
              setShowForm(true);
              setEditProduct(null);
              setForm({ name: '', description: '', price: '', category: 'Electronics', stock: '', images: '' });
            }}
            style={{
              padding: '14px 28px', borderRadius: '12px',
              background: '#8B5CF6', border: '2px solid #1E293B',
              color: '#ffffff', fontSize: '15px',
              fontWeight: 700, cursor: 'pointer',
              fontFamily: '"Outfit", sans-serif',
              boxShadow: '4px 4px 0px #1E293B',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >+ Add Product</motion.button>
        </motion.div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px', marginBottom: '40px'
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', bounce: 0.4 }}
              whileHover={{ y: -4, rotate: -1, boxShadow: `6px 6px 0px ${statColors[i].shadow}` }}
              style={{
                padding: '24px', background: statColors[i].bg,
                border: '2px solid #1E293B', borderRadius: '16px',
                boxShadow: '4px 4px 0px #1E293B',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '32px', fontWeight: 800, color: '#ffffff',
                letterSpacing: '-1px', fontFamily: '"Outfit", sans-serif'
              }}>{stat.value}</div>
              <div style={{
                fontSize: '12px', color: 'rgba(255,255,255,0.8)',
                fontWeight: 600, letterSpacing: '1px',
                textTransform: 'uppercase', marginTop: '4px'
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: '#ffffff', border: '2px solid #1E293B',
            borderRadius: '20px', boxShadow: '6px 6px 0px #1E293B',
            overflow: 'hidden'
          }}
        >
          <div style={{
            padding: '16px 24px', background: '#1E293B',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '16px', fontSize: '11px', color: '#94A3B8',
            letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700
          }}>
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{
                  width: '40px', height: '40px', margin: '0 auto',
                  border: '3px solid #E2E8F0',
                  borderTop: '3px solid #8B5CF6', borderRadius: '50%'
                }}
              />
            </div>
          ) : products.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <p style={{ fontWeight: 600 }}>No products yet. Add your first one!</p>
            </div>
          ) : (
            <AnimatePresence>
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    padding: '16px 24px',
                    borderBottom: '1px dashed #E2E8F0',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                    gap: '16px', alignItems: 'center',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FFFDF5'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Product thumbnail */}
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '8px',
                      overflow: 'hidden', border: '2px solid #1E293B',
                      flexShrink: 0, background: '#F1F5F9',
                      boxShadow: '2px 2px 0px #E2E8F0'
                    }}>
                      {product.image ? (
                        <img src={product.image} alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '20px'
                        }}>
                          {product.category === 'Electronics' ? '📱' :
                           product.category === 'Footwear' ? '👟' :
                           product.category === 'Clothing' ? '👕' : '🛍️'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 700, fontSize: '14px',
                        color: '#1E293B', marginBottom: '2px',
                        fontFamily: '"Outfit", sans-serif'
                      }}>{product.name}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                        {product.description?.substring(0, 35)}...
                      </div>
                      {product.images?.length > 1 && (
                        <div style={{ fontSize: '11px', color: '#8B5CF6', marginTop: '2px', fontWeight: 600 }}>
                          {product.images.length} images
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-flex', padding: '4px 10px',
                    borderRadius: '9999px', background: '#8B5CF620',
                    border: '1px solid #8B5CF640',
                    color: '#8B5CF6', fontSize: '11px', fontWeight: 700
                  }}>{product.category}</div>

                  <div style={{
                    fontWeight: 700, color: '#1E293B',
                    fontFamily: '"Outfit", sans-serif'
                  }}>Rs. {product.price?.toLocaleString()}</div>

                  <div style={{
                    color: product.stock < 10 ? '#EF4444' : '#64748B',
                    fontWeight: product.stock < 10 ? 700 : 400
                  }}>
                    {product.stock}{product.stock < 10 && ' ⚠️'}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button
                      whileHover={{ y: -2, boxShadow: '3px 3px 0px #8B5CF6' }}
                      whileTap={{ y: 1 }}
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: '6px 14px', borderRadius: '8px',
                        background: '#ffffff', border: '2px solid #1E293B',
                        color: '#1E293B', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 700,
                        boxShadow: '2px 2px 0px #1E293B',
                        transition: 'all 0.2s ease'
                      }}
                    >Edit</motion.button>
                    <motion.button
                      whileHover={{ y: -2, boxShadow: '3px 3px 0px #EF4444' }}
                      whileTap={{ y: 1 }}
                      onClick={() => handleDelete(product._id)}
                      style={{
                        padding: '6px 14px', borderRadius: '8px',
                        background: '#FEE2E2', border: '2px solid #EF4444',
                        color: '#EF4444', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 700,
                        boxShadow: '2px 2px 0px #EF444440',
                        transition: 'all 0.2s ease'
                      }}
                    >Delete</motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(30,41,59,0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '20px'
            }}
            onClick={e => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              style={{
                width: '100%', maxWidth: '500px',
                background: '#FFFDF5', border: '2px solid #1E293B',
                borderRadius: '24px', padding: '36px',
                boxShadow: '8px 8px 0px #1E293B',
                maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', marginBottom: '28px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '9999px',
                  background: editProduct ? '#FBBF24' : '#8B5CF6',
                  border: '2px solid #1E293B',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px',
                  boxShadow: '3px 3px 0px #1E293B'
                }}>{editProduct ? '✏️' : '➕'}</div>
                <h2 style={{
                  fontSize: '22px', fontWeight: 700, color: '#1E293B',
                  fontFamily: '"Outfit", sans-serif'
                }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
              </div>

              {/* Form fields */}
              <input placeholder="Product Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '2px 2px 0px #8B5CF6'}
                onBlur={e => e.target.style.boxShadow = '2px 2px 0px #E2E8F0'}
              />
              <textarea placeholder="Description" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.boxShadow = '2px 2px 0px #8B5CF6'}
                onBlur={e => e.target.style.boxShadow = '2px 2px 0px #E2E8F0'}
              />
              <input placeholder="Price (Rs.)" type="number" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '2px 2px 0px #8B5CF6'}
                onBlur={e => e.target.style.boxShadow = '2px 2px 0px #E2E8F0'}
              />
              <input placeholder="Stock quantity" type="number" value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '2px 2px 0px #8B5CF6'}
                onBlur={e => e.target.style.boxShadow = '2px 2px 0px #E2E8F0'}
              />

              {/* Images field */}
              <label style={{
                fontSize: '11px', fontWeight: 700, color: '#64748B',
                letterSpacing: '2px', textTransform: 'uppercase',
                display: 'block', marginBottom: '6px'
              }}>
                Image URLs (separate multiple with comma)
              </label>
              <textarea
                placeholder="https://images.unsplash.com/..., https://images.unsplash.com/..."
                value={form.images}
                onChange={e => setForm({ ...form, images: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.boxShadow = '2px 2px 0px #8B5CF6'}
                onBlur={e => e.target.style.boxShadow = '2px 2px 0px #E2E8F0'}
              />

              {/* Image previews */}
              {form.images && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ marginBottom: '12px' }}
                >
                  <p style={{
                    fontSize: '11px', fontWeight: 700, color: '#64748B',
                    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px'
                  }}>Preview</p>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {form.images.split(',').map((url, i) => url.trim() && (
                      <div key={i} style={{
                        width: '72px', height: '72px', borderRadius: '10px',
                        overflow: 'hidden', border: '2px solid #1E293B',
                        flexShrink: 0, boxShadow: '2px 2px 0px #1E293B',
                        background: '#F1F5F9'
                      }}>
                        <img src={url.trim()} alt={`Preview ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => e.target.style.display = 'none'}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <select value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '6px 6px 0px #1E293B' }}
                  whileTap={{ y: 2, boxShadow: '2px 2px 0px #1E293B' }}
                  onClick={handleSubmit}
                  style={{
                    flex: 1, padding: '14px', background: '#8B5CF6',
                    border: '2px solid #1E293B', borderRadius: '12px',
                    color: '#ffffff', fontSize: '15px', fontWeight: 700,
                    cursor: 'pointer', fontFamily: '"Outfit", sans-serif',
                    boxShadow: '4px 4px 0px #1E293B',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >{editProduct ? '✅ Update' : '🚀 Add Product'}</motion.button>
                <motion.button
                  whileHover={{ background: '#F1F5F9' }}
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: '14px 20px', background: '#ffffff',
                    border: '2px solid #E2E8F0', borderRadius: '12px',
                    color: '#64748B', fontSize: '15px', cursor: 'pointer',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                >Cancel</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
