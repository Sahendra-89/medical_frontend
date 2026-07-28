"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Star,
  Shield,
  ChevronRight,
  Pill,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProducts } from "../lib/api";

// ── Static fallback products (shown if API returns nothing) ──
const STATIC_PRODUCTS = [
  {
    id: "med-1",
    name: "Paracetamol 500mg Tablets",
    brand: "Cipla Ltd.",
    category: "Tablets",
    description: "Effective pain relief & fever reducer. Each strip contains 10 tablets.",
    price: 35, mrp: 52,
    image: "/medicines/paracetamol.jpg",
    rating: 4.7, review_count: 2340, stock: 150,
    prescription_required: false,
  },
  {
    id: "med-2",
    name: "Honitus Cough Syrup 100ml",
    brand: "Dabur India",
    category: "Syrups",
    description: "Ayurvedic cough formula with Tulsi, Honey & Mulethi. Non-drowsy relief.",
    price: 95, mrp: 130,
    image: "/medicines/cough_syrup.jpg",
    rating: 4.5, review_count: 1856, stock: 85,
    prescription_required: false,
  },
  {
    id: "med-3",
    name: "Boroline Antiseptic Cream 20g",
    brand: "G.D. Pharmaceuticals",
    category: "OTC",
    description: "Night repair antiseptic cream for cuts, cracks & dry skin.",
    price: 42, mrp: 55,
    image: "/medicines/antiseptic_cream.jpg",
    rating: 4.6, review_count: 3120, stock: 200,
    prescription_required: false,
  },
  {
    id: "med-4",
    name: "HealthKart Vitamin D3 (2000 IU)",
    brand: "HealthKart",
    category: "Nutrition Products",
    description: "60 capsules. Supports bone health, immunity & calcium absorption.",
    price: 349, mrp: 499,
    image: "/medicines/vitamin_d3.jpg",
    rating: 4.8, review_count: 4580, stock: 120,
    prescription_required: false,
  },
  {
    id: "med-5",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "Healthvit",
    category: "Capsules",
    description: "Triple strength EPA & DHA for heart, brain & joint health. 60 softgels.",
    price: 425, mrp: 699,
    image: "/medicines/omega3.jpg",
    rating: 4.4, review_count: 1290, stock: 75,
    prescription_required: false,
  },
  {
    id: "med-6",
    name: "Dr. Morepen BP Monitor BPOne",
    brand: "Dr. Morepen",
    category: "Devices",
    description: "Fully automatic digital BP monitor with WHO indicator & memory recall.",
    price: 999, mrp: 1799,
    image: "/medicines/bp_monitor.jpg",
    rating: 4.3, review_count: 876, stock: 40,
    prescription_required: false,
  },
];

// ── Individual card ──
const MedicineCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const savings =
    product.mrp && product.price ? +(product.mrp - product.price).toFixed(2) : 0;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden">
      {/* Glow on hover */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400/0 via-cyan-400/0 to-emerald-400/0 group-hover:from-blue-400/20 group-hover:via-cyan-400/10 group-hover:to-emerald-400/20 transition-all duration-500 -z-10 blur-xl" />

      {/* Image */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 overflow-hidden" style={{ paddingTop: "80%" }}>
        <Link href={`/shop/${product.id}`} className="absolute inset-0 p-5 flex items-center justify-center">
          <img
            src={product.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-lg"
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-red-50 border border-red-200 scale-110"
              : "bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:border hover:border-red-200 hover:scale-110"
          }`}
        >
          <Heart size={15} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400 group-hover:text-red-400 transition-colors"} />
        </button>

        {/* Category pill */}
        {product.category && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-600 text-[9px] font-bold px-2.5 py-1 rounded-full border border-slate-200/50 flex items-center gap-1">
            <Pill size={9} className="text-blue-500" /> {product.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <span className="inline-block text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
          {product.brand || "Generic"}
        </span>

        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {product.description || product.usage_instructions || "Premium quality healthcare product."}
        </p>

        {/* Rating + Stock */}
        <div className="flex items-center justify-between">
          {product.rating > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm">
                <Star size={8} fill="white" /> {product.rating}
              </div>
              {product.review_count > 0 && (
                <span className="text-[9px] text-slate-400 font-medium">
                  ({product.review_count > 999 ? `${(product.review_count / 1000).toFixed(1)}k` : product.review_count})
                </span>
              )}
            </div>
          )}
          <div className="text-[9px] font-semibold ml-auto">
            {product.stock > 10 ? (
              <span className="text-emerald-600 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> In Stock
              </span>
            ) : product.stock > 0 ? (
              <span className="text-amber-500">Only {product.stock} left</span>
            ) : null}
          </div>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg text-slate-900">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {savings > 0 && (
              <div className="text-[9px] text-emerald-600 font-bold mt-0.5">You save ₹{savings}</div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1.5 font-bold py-2 px-4 rounded-xl text-[11px] transition-all duration-300 shadow-sm flex-shrink-0 ${
              product.stock <= 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-lg hover:shadow-blue-200/50 active:scale-95"
            }`}
          >
            <ShoppingCart size={13} /> Add
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 flex items-center gap-1.5 text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-2">
        <Shield size={9} className="text-emerald-500" />
        100% Genuine · Express Delivery
      </div>
    </div>
  );
};

// ── Section ──
const MedicineProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({});
        const apiProducts = res.products || [];
        if (apiProducts.length > 0) {
          setProducts(apiProducts);
        } else {
          setProducts(STATIC_PRODUCTS);
        }
      } catch {
        setProducts(STATIC_PRODUCTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shop Top Medicines &amp; Healthcare
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-lg">
              Trusted brands at the best prices. Genuine products with fast doorstep delivery.
            </p>
          </div>
          <Link
            href="/medicine"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-4 py-2 rounded-full transition-all duration-200 group flex-shrink-0"
          >
            View All Medicines
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <MedicineCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicineProducts;
