"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('pp_cart');
    const storedWishlist = localStorage.getItem('pp_wishlist');
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('pp_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('pp_wishlist', JSON.stringify(newWishlist));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, qty = 1) => {
    const existing = cart.find(item => item.id === product.id);
    let updated;
    if (existing) {
      updated = cart.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
    } else {
      updated = [...cart, { ...product, qty }];
    }
    saveCart(updated);
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
    showToast('Item removed from cart', 'info');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    const updated = cart.map(item => item.id === id ? { ...item, qty } : item);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setCoupon(null);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    let updated;
    if (exists) {
      updated = wishlist.filter(item => item.id !== product.id);
      showToast('Removed from wishlist', 'info');
    } else {
      updated = [...wishlist, product];
      showToast('Added to wishlist!');
    }
    saveWishlist(updated);
  };

  const applyCoupon = (code) => {
    const validCoupons = {
      'PARIDHI10': { discount: 10, type: 'percent', minOrder: 500, description: '10% off on orders above ₹500' },
      'FIRST20': { discount: 20, type: 'percent', minOrder: 300, description: '20% off on first order' },
      'FLAT100': { discount: 100, type: 'flat', minOrder: 999, description: '₹100 off on orders above ₹999' },
      'HEALTH50': { discount: 50, type: 'flat', minOrder: 499, description: '₹50 off on orders above ₹499' }
    };

    const c = validCoupons[code.toUpperCase()];
    if (!c) {
      showToast('Invalid coupon code', 'error');
      return false;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (subtotal < c.minOrder) {
      showToast(`Minimum order amount for this coupon is ₹${c.minOrder}`, 'error');
      return false;
    }

    setCoupon({ code: code.toUpperCase(), ...c });
    showToast(`Coupon ${code.toUpperCase()} applied successfully!`);
    return true;
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const getMrpTotal = () => cart.reduce((sum, item) => sum + (item.mrp * item.qty), 0);
  
  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    let couponDisc = 0;
    if (coupon) {
      if (coupon.type === 'percent') {
        couponDisc = (subtotal * coupon.discount) / 100;
      } else {
        couponDisc = coupon.discount;
      }
    }
    return (getMrpTotal() - subtotal) + couponDisc;
  };

  const getFinalTotal = () => {
    const subtotal = getSubtotal();
    let couponDisc = 0;
    if (coupon) {
      if (coupon.type === 'percent') {
        couponDisc = (subtotal * coupon.discount) / 100;
      } else {
        couponDisc = coupon.discount;
      }
    }
    return Math.max(0, subtotal - couponDisc);
  };

  const hasPrescriptionItems = () => cart.some(item => item.prescription_required);

  return (
    <CartContext.Provider value={{
      cart, wishlist, coupon, toast,
      addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, applyCoupon,
      getSubtotal, getMrpTotal, getDiscountAmount, getFinalTotal, hasPrescriptionItems
    }}>
      {children}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-premium text-white font-medium animate-bounce ${
          toast.type === 'success' ? 'bg-medical-blue' : toast.type === 'error' ? 'bg-red-600' : 'bg-slate-800'
        }`}>
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
