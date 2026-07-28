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
  Zap,
  Info,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProducts } from "../lib/api";

// ── Rich static fallback products with usage info ──────────────────────────
const STATIC_PRODUCTS = [
  {
    id: "med-1",
    name: "Paracetamol 500mg Tablets",
    brand: "Cipla Ltd.",
    category: "Tablets",
    usage: "Fever · Headache · Body Pain",
    description: "Fast-acting pain relief & fever reducer. Strip of 10 tablets.",
    price: 35, mrp: 52,
    image: "/medicines/paracetamol.jpg",
    rating: 4.7, review_count: 2340, stock: 150,
    prescription_required: false,
    highlights: ["Non-drowsy", "Clinically tested", "Strip of 10"],
  },
  {
    id: "med-2",
    name: "Honitus Cough Syrup 100ml",
    brand: "Dabur India",
    category: "Syrups",
    usage: "Dry Cough · Throat Relief · Cold",
    description: "Ayurvedic cough formula with Tulsi, Honey & Mulethi. Non-drowsy relief.",
    price: 95, mrp: 130,
    image: "/medicines/cough_syrup.jpg",
    rating: 4.5, review_count: 1856, stock: 85,
    prescription_required: false,
    highlights: ["Ayurvedic", "Non-drowsy", "100ml bottle"],
  },
  {
    id: "med-3",
    name: "Boroline Antiseptic Cream 20g",
    brand: "G.D. Pharmaceuticals",
    category: "Topical Cream",
    usage: "Cuts · Dry Skin · Cracked Heels",
    description: "Night repair antiseptic cream for cuts, cracks & dry skin.",
    price: 42, mrp: 55,
    image: "/medicines/antiseptic_cream.jpg",
    rating: 4.6, review_count: 3120, stock: 200,
    prescription_required: false,
    highlights: ["Antiseptic", "Night repair", "20g tube"],
  },
  {
    id: "med-4",
    name: "HealthKart Vitamin D3 (2000 IU)",
    brand: "HealthKart",
    category: "Supplements",
    usage: "Bone Health · Immunity · Calcium Absorption",
    description: "60 capsules. Supports bone health, immunity & calcium absorption.",
    price: 349, mrp: 499,
    image: "/medicines/vitamin_d3.jpg",
    rating: 4.8, review_count: 4580, stock: 120,
    prescription_required: false,
    highlights: ["60 capsules", "2000 IU", "Bone health"],
  },
  {
    id: "med-5",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "Healthvit",
    category: "Supplements",
    usage: "Heart Health · Brain Function · Joint Support",
    description: "Triple strength EPA & DHA for heart, brain & joint health. 60 softgels.",
    price: 425, mrp: 699,
    image: "/medicines/omega3.jpg",
    rating: 4.4, review_count: 1290, stock: 75,
    prescription_required: false,
    highlights: ["Triple strength", "60 softgels", "EPA & DHA"],
  },
  {
    id: "med-6",
    name: "Dr. Morepen BP Monitor BPOne",
    brand: "Dr. Morepen",
    category: "Medical Device",
    usage: "Blood Pressure · Heart Rate · Memory Recall",
    description: "Fully automatic digital BP monitor with WHO indicator & memory recall.",
    price: 999, mrp: 1799,
    image: "/medicines/bp_monitor.jpg",
    rating: 4.3, review_count: 876, stock: 40,
    prescription_required: false,
    highlights: ["Auto inflate", "WHO indicator", "Memory recall"],
  },
  {
    id: "med-7",
    name: "Dolo 650 Paracetamol",
    brand: "Micro Labs",
    category: "Tablets",
    usage: "Fever · Headache · Mild Pain Relief",
    description: "Trusted fever & headache relief. Strip of 15 tablets.",
    price: 30, mrp: 35,
    image: "/medicines/paracetamol.jpg",
    rating: 4.9, review_count: 8640, stock: 300,
    prescription_required: false,
    highlights: ["Strip of 15", "650mg", "Doctor trusted"],
  },
  {
    id: "med-8",
    name: "Benadryl Cough Formula 150ml",
    brand: "Johnson & Johnson",
    category: "Syrups",
    usage: "Wet Cough · Dry Cough · Congestion",
    description: "Fast relief from dry & wet cough. Non-drowsy formula.",
    price: 115, mrp: 145,
    image: "/medicines/cough_syrup.jpg",
    rating: 4.3, review_count: 1540, stock: 60,
    prescription_required: false,
    highlights: ["150ml", "Non-drowsy", "Dual action"],
  },
];

// ── Individual Product Card ────────────────────────────────────────────────
const MedicineCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const [added, setAdded] = useState(false);

  const savings =
    product.mrp && product.price ? +(product.mrp - product.price).toFixed(2) : 0;
  const discountPct =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden">
      {/* Glow on hover */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/15 group-hover:to-emerald-400/15 transition-all duration-500 -z-10 blur-xl" />

      {/* ── Image Section ── */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 overflow-hidden" style={{ paddingTop: "75%" }}>
        <Link href={`/shop/${product.id}`} className="absolute inset-0 p-5 flex items-center justify-center">
          <img
            src={product.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400";
            }}
          />
        </Link>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Discount Badge */}
        {discountPct > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1">
            <Zap size={9} fill="white" /> {discountPct}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-red-50 border border-red-200 scale-110"
              : "bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:border hover:border-red-200 hover:scale-110"
          }`}
        >
          <Heart size={14} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"} />
        </button>

        {/* Category Pill */}
        {product.category && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-600 text-[9px] font-bold px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1 shadow-sm">
            <Pill size={9} className="text-blue-500" /> {product.category}
          </div>
        )}

        {/* Rx Badge */}
        {product.prescription_required && (
          <div className="absolute bottom-3 right-3 bg-orange-100 text-orange-600 text-[8px] font-black px-2 py-0.5 rounded-full border border-orange-200">
            Rx
          </div>
        )}
      </div>

      {/* ── Content Section ── */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Brand */}
        <span className="inline-block text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
          {product.brand || "Generic"}
        </span>

        {/* Product Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* ── USAGE SECTION (new) ── */}
        {(product.usage || product.usage_instructions) && (
          <div className="flex items-start gap-1.5 bg-blue-50/70 rounded-xl px-2.5 py-2 border border-blue-100/60">
            <Info size={10} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-700 font-semibold leading-snug line-clamp-2">
              {product.usage || product.usage_instructions}
            </p>
          </div>
        )}

        {/* Description */}
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {product.description || "Premium quality healthcare product."}
        </p>

        {/* ── Highlights (new) ── */}
        {product.highlights && product.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="flex items-center gap-0.5 text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                <CheckCircle size={8} className="text-emerald-500" /> {h}
              </span>
            ))}
          </div>
        )}

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
            ) : (
              <span className="text-red-400">Out of Stock</span>
            )}
          </div>
        </div>

        {/* ── Price + Add to Cart ── */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg text-slate-900">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {savings > 0 && (
              <div className="text-[9px] text-emerald-600 font-bold mt-0.5">
                You save ₹{savings}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1.5 font-bold py-2 px-4 rounded-xl text-[11px] transition-all duration-300 shadow-sm flex-shrink-0 ${
              product.stock <= 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : added
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-95 shadow-emerald-200/60 shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-lg hover:shadow-blue-200/50 active:scale-95"
            }`}
          >
            {added ? (
              <><CheckCircle size={13} /> Added!</>
            ) : (
              <><ShoppingCart size={13} /> Add</>
            )}
          </button>
        </div>
      </div>

      {/* Footer trust bar */}
      <div className="px-4 pb-3 flex items-center gap-1.5 text-[9px] text-slate-400 font-medium border-t border-slate-50 pt-2">
        <Shield size={9} className="text-emerald-500" />
        100% Genuine · Fast Delivery
      </div>
    </div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────
const MedicineProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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

  const categories = ["All", "Tablets", "Syrups", "Supplements", "Topical Cream", "Medical Device"];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) =>
            (p.category || "").toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-md" />
              <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Featured Products</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shop Top Medicines &amp; Healthcare
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-lg">
              Trusted brands at the best prices — with name, price, usage &amp; highlights.
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

        {/* ── Category Filter Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200/50"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Pill size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.slice(0, 8).map((product) => (
              <MedicineCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* ── View All CTA Banner ── */}
        {!loading && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none" />
            <div className="relative z-10 text-white text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">🎁 Limited Time</p>
              <h3 className="text-xl sm:text-2xl font-black">Explore 500+ Healthcare Products</h3>
              <p className="text-blue-200 text-sm mt-1">Genuine medicines · Upto 60% off · Free delivery above ₹499</p>
            </div>
            <Link
              href="/shop"
              className="relative z-10 flex-shrink-0 bg-white text-blue-700 hover:bg-blue-50 font-black px-8 py-3 rounded-2xl text-sm transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Shop Now <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicineProducts;
