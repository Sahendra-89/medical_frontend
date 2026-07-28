"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, FileText, CheckCircle, AlertCircle, Zap, Star, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const savings = product.mrp && product.price ? +(product.mrp - product.price).toFixed(2) : 0;
  const discountPercent = product.discount_percent
    ? Math.round(product.discount_percent)
    : product.mrp && product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">

      {/* ── Image Area ── */}
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden" style={{ paddingTop: '72%' }}>
        <Link href={`/shop/${product.id}`} className="absolute inset-0 p-4 flex items-center justify-center">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
          />
        </Link>

        {/* Gradient overlay on hover for "Quick Add" */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />




        {/* Rx Badge */}
        {product.prescription_required && (
          <div className="absolute bottom-3 left-2 bg-amber-500/90 backdrop-blur-sm text-white font-bold text-[9px] px-2 py-0.5 flex items-center gap-0.5 rounded-full shadow">
            <FileText size={8} /> Rx Required
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-red-50 border border-red-200'
              : 'bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:border hover:border-red-200'
          }`}
        >
          <Heart
            size={15}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 group-hover:text-red-400 transition-colors'}
          />
        </button>

        {/* Out of Stock Overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-black text-xs px-4 py-1.5 rounded-full shadow-lg rotate-[-6deg]">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-3.5 flex-1 flex flex-col gap-1.5">

        {/* Brand pill */}
        <span className="inline-block text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider w-fit">
          {product.brand || 'Generic'}
        </span>

        {/* Title */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-[13px] text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {product.description || product.usage_instructions || 'Premium quality healthcare product.'}
        </p>

        {/* Rating + Stock row */}
        <div className="flex items-center justify-between">
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                <Star size={8} fill="white" />
                {product.rating}
              </div>
              {product.review_count > 0 && (
                <span className="text-[9px] text-slate-400">({product.review_count > 999 ? `${(product.review_count/1000).toFixed(1)}k` : product.review_count})</span>
              )}
            </div>
          )}
          <div className="text-[9px] font-semibold ml-auto">
            {product.stock > 10 ? (
              <span className="text-green-600 flex items-center gap-0.5"><CheckCircle size={9} /> In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-amber-500 flex items-center gap-0.5"><AlertCircle size={9} /> Only {product.stock} left</span>
            ) : null}
          </div>
        </div>

        {/* Pricing + Add to Cart */}
        <div className="mt-1 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-base text-slate-900">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[11px] text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {savings > 0 && (
              <div className="text-[9px] text-emerald-600 font-bold">Save ₹{savings}</div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1 font-bold py-1.5 px-3 rounded-xl text-[11px] transition-all duration-200 shadow-sm flex-shrink-0 ${
              product.stock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-md hover:shadow-blue-200 active:scale-95'
            }`}
          >
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>

      {/* Bottom Guarantee strip — only for non-Rx */}
      {!product.prescription_required && (
        <div className="px-3.5 pb-2.5 flex items-center gap-1 text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-1.5">
          <Shield size={9} className="text-green-500" />
          100% Genuine · Fast Delivery
        </div>
      )}
    </div>
  );
};

export default ProductCard;
