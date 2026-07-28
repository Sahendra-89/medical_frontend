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

// ── Product catalog from price list (24 products) ────────────────────────────
const STATIC_PRODUCTS = [
  {
    id: "A460",
    name: "3M Micropore Surgical Tape 3\" 1×4",
    brand: "ROMSONS",
    category: "Surgical Supplies",
    usage: "Wound Dressing · Post-Surgery · Skin Fixation",
    description: "Medical grade micropore surgical tape. Gentle on skin, strong hold. Pack of 1×4.",
    price: 911, mrp: 1519,
    image: "/medicines/micropore_tape.jpg",
    rating: 4.5, review_count: 320, stock: 5,
    prescription_required: false,
    highlights: ["40% OFF", "Skin friendly", "Strong hold"],
  },
  {
    id: "A221",
    name: "A to Z NS 15Tab",
    brand: "ALKEM",
    category: "Tablets",
    usage: "Multivitamin · Nutritional Support · Immunity",
    description: "Comprehensive multivitamin and mineral supplement. Strip of 15 tablets.",
    price: 145, mrp: 171,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.6, review_count: 1240, stock: 11,
    prescription_required: false,
    highlights: ["15% OFF", "Strip of 15", "Multivitamin"],
  },
  {
    id: "A517",
    name: "AC-03 SG Cap 10Cap",
    brand: "LEGEND PHARMACEUTICAL",
    category: "Capsules",
    usage: "Acidity · Gastric Relief · Heartburn",
    description: "Softgel capsules for fast relief from acidity and gastric discomfort.",
    price: 306, mrp: 360,
    image: "/medicines/capsule_strip.jpg",
    rating: 4.3, review_count: 580, stock: 10,
    prescription_required: false,
    highlights: ["15% OFF", "10 capsules", "Fast acting"],
  },
  {
    id: "A277",
    name: "Acinostop 1GM Injection",
    brand: "GLENMARK",
    category: "Injection",
    usage: "Antibiotic · Bacterial Infections · Post-Surgery",
    description: "Broad spectrum antibiotic injection 1GM. For severe bacterial infections.",
    price: 393, mrp: 655,
    image: "/medicines/injection_vial.jpg",
    rating: 4.4, review_count: 210, stock: 3,
    prescription_required: true,
    highlights: ["40% OFF", "Rx required", "1GM strength"],
  },
  {
    id: "A390",
    name: "Aero Comfort Pro Adult Neb Kit 1×10",
    brand: "ROMSONS",
    category: "Medical Device",
    usage: "Asthma · Nebulization · Respiratory Care",
    description: "Adult nebulizer kit with mask and tubing. Pack of 10. For home & hospital use.",
    price: 310, mrp: 621,
    image: "/medicines/nebulizer_kit.jpg",
    rating: 4.7, review_count: 890, stock: 1,
    prescription_required: false,
    highlights: ["50% OFF", "Pack of 10", "Medical grade"],
  },
  {
    id: "A6",
    name: "Albucell 20% 50ML",
    brand: "INTAS",
    category: "IV Infusion",
    usage: "Hypovolemia · Protein Deficiency · Burns",
    description: "Human albumin 20% solution 50ML for IV infusion. Hospital use.",
    price: 1925, mrp: 3500,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.5, review_count: 145, stock: 2,
    prescription_required: true,
    highlights: ["45% OFF", "20% strength", "50ML vial"],
  },
  {
    id: "A00009",
    name: "Alburel 20% 100ML",
    brand: "RELIANCE",
    category: "IV Infusion",
    usage: "Hypovolemia · Liver Disease · Critical Care",
    description: "Human albumin 20% infusion solution 100ML. For critical care patients.",
    price: 5907, mrp: 10740,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.6, review_count: 98, stock: 3,
    prescription_required: true,
    highlights: ["45% OFF", "100ML", "ICU grade"],
  },
  {
    id: "A541",
    name: "Alcocon SP 10Tab",
    brand: "INTELICO PHARMACEUTICALS",
    category: "Tablets",
    usage: "Pain Relief · Anti-inflammatory · Fever",
    description: "Combination tablet for pain, inflammation and fever. Strip of 10.",
    price: 76, mrp: 89,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.2, review_count: 430, stock: 50,
    prescription_required: false,
    highlights: ["15% OFF", "Strip of 10", "Dual action"],
  },
  {
    id: "A99",
    name: "Alcofix Gold 10Tab",
    brand: "ALNICHE",
    category: "Tablets",
    usage: "Liver Support · Detox · Hepatic Care",
    description: "Gold standard liver support tablet. Promotes liver health and detoxification.",
    price: 263, mrp: 328,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.5, review_count: 275, stock: 3,
    prescription_required: false,
    highlights: ["20% OFF", "Liver support", "Strip of 10"],
  },
  {
    id: "A283",
    name: "Aldigesic SP 10Tab",
    brand: "ALKEM",
    category: "Tablets",
    usage: "Pain · Inflammation · Post-Op Recovery",
    description: "Analgesic and anti-inflammatory tablet combination. Strip of 10 tablets.",
    price: 105, mrp: 124,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.4, review_count: 860, stock: 2,
    prescription_required: false,
    highlights: ["15% OFF", "Strip of 10", "Anti-inflammatory"],
  },
  {
    id: "A435",
    name: "Alfoo Tab 30Tab",
    brand: "DR.REDDY",
    category: "Tablets",
    usage: "Prostate · Urinary Flow · BPH",
    description: "Alpha blocker tablet for benign prostatic hyperplasia. 30 tablet pack.",
    price: 729, mrp: 858,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.3, review_count: 512, stock: 5,
    prescription_required: true,
    highlights: ["15% OFF", "30 tablets", "Rx required"],
  },
  {
    id: "A314",
    name: "AM-Amino T 100ML Infusion",
    brand: "AMNEAL HEALTHCARE PVT LTD",
    category: "IV Infusion",
    usage: "Amino Acids · Nutrition · Post-Surgery Recovery",
    description: "Amino acid infusion solution 100ML for parenteral nutrition support.",
    price: 440, mrp: 880,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.5, review_count: 167, stock: 6,
    prescription_required: true,
    highlights: ["50% OFF", "100ML", "Nutritional IV"],
  },
  {
    id: "A199",
    name: "AM-Amino T 500ML Infusion",
    brand: "AMNEAL HEALTHCARE PVT LTD",
    category: "IV Infusion",
    usage: "Parenteral Nutrition · ICU · Post-Op Support",
    description: "Large volume amino acid infusion 500ML for intensive nutritional support.",
    price: 891, mrp: 1980,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.6, review_count: 134, stock: 5,
    prescription_required: true,
    highlights: ["55% OFF", "500ML", "ICU nutrition"],
  },
  {
    id: "A559",
    name: "Amaryl 2MG 30Tab",
    brand: "EMCURE",
    category: "Tablets",
    usage: "Diabetes · Blood Sugar Control · Type 2 DM",
    description: "Glimepiride 2MG tablets for Type 2 diabetes management. 30 tablet pack.",
    price: 158, mrp: 186,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.5, review_count: 1890, stock: 1,
    prescription_required: true,
    highlights: ["15% OFF", "2MG strength", "30 tablets"],
  },
  {
    id: "A111",
    name: "Aminoven Infrant 100ML",
    brand: "FRESENIUS P.N",
    category: "IV Infusion",
    usage: "Neonatal Nutrition · Premature Infants · ICU",
    description: "Amino acid solution for infants requiring parenteral nutrition. 100ML.",
    price: 571, mrp: 672,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.7, review_count: 89, stock: 5,
    prescription_required: true,
    highlights: ["15% OFF", "Infant use", "100ML"],
  },
  {
    id: "A175",
    name: "Amnealyte Duo 500ML",
    brand: "AMNEAL HEALTHCARE PVT LTD",
    category: "IV Infusion",
    usage: "Electrolyte Balance · Dehydration · IV Fluids",
    description: "Dual electrolyte infusion solution 500ML for fluid & electrolyte replacement.",
    price: 169, mrp: 422,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.4, review_count: 203, stock: 2,
    prescription_required: true,
    highlights: ["60% OFF", "500ML", "Electrolytes"],
  },
  {
    id: "A349",
    name: "Amnepara Duo 100ML",
    brand: "AMNEAL HEALTHCARE PVT LTD",
    category: "IV Infusion",
    usage: "IV Nutrition · Parenteral · Critical Care",
    description: "Combined parenteral nutrition solution 100ML for critical care patients.",
    price: 301, mrp: 861,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.5, review_count: 118, stock: 6,
    prescription_required: true,
    highlights: ["65% OFF", "100ML", "Critical care"],
  },
  {
    id: "A422",
    name: "Amnezin Zinc Injection",
    brand: "AMNEAL HEALTHCARE PVT LTD",
    category: "Injection",
    usage: "Zinc Deficiency · Wound Healing · Immunity",
    description: "Zinc supplement injection for deficiency correction and wound healing support.",
    price: 316, mrp: 703,
    image: "/medicines/injection_vial.jpg",
    rating: 4.3, review_count: 156, stock: 85,
    prescription_required: true,
    highlights: ["55% OFF", "Zinc supplement", "Rx required"],
  },
  {
    id: "A65",
    name: "Amphonex 50MG Injection",
    brand: "BSV",
    category: "Injection",
    usage: "Antifungal · Fungal Infections · Immunocompromised",
    description: "Amphotericin B 50MG injection for serious systemic fungal infections.",
    price: 4880, mrp: 9760,
    image: "/medicines/injection_vial.jpg",
    rating: 4.6, review_count: 67, stock: 45,
    prescription_required: true,
    highlights: ["50% OFF", "50MG", "Antifungal"],
  },
  {
    id: "A183",
    name: "Akynzeo IV Injection",
    brand: "FRESENIUS P.N",
    category: "Injection",
    usage: "Chemotherapy Nausea · Anti-emetic · Vomiting",
    description: "IV antiemetic injection for prevention of chemo-induced nausea and vomiting.",
    price: 4781, mrp: 5625,
    image: "/medicines/injection_vial.jpg",
    rating: 4.7, review_count: 43, stock: 3,
    prescription_required: true,
    highlights: ["15% OFF", "IV grade", "Rx required"],
  },
  {
    id: "A313",
    name: "Acaone 100MG 30Tab",
    brand: "MSN LABORATORIES PVT.LTD",
    category: "Tablets",
    usage: "Osteoporosis · Bone Density · Calcium Metabolism",
    description: "Alendronate 100MG tablet for osteoporosis treatment. 30 tablet pack.",
    price: 10580, mrp: 17634,
    image: "/medicines/tablet_strip.jpg",
    rating: 4.4, review_count: 234, stock: 6,
    prescription_required: true,
    highlights: ["40% OFF", "30 tablets", "Bone health"],
  },
  {
    id: "A247",
    name: "Alburel OS 100ML",
    brand: "RELIANCE",
    category: "IV Infusion",
    usage: "Oncology Support · Fluid Management · Surgery",
    description: "Human albumin oral solution 100ML for nutritional and fluid management.",
    price: 4875, mrp: 8864,
    image: "/medicines/iv_infusion.jpg",
    rating: 4.5, review_count: 91, stock: 6,
    prescription_required: true,
    highlights: ["45% OFF", "100ML", "Oncology use"],
  },
  {
    id: "A352",
    name: "Adalipca 30MG Injection",
    brand: "LPCA",
    category: "Injection",
    usage: "Lipid Metabolism · Specialized Treatment",
    description: "Specialized injection 30MG for lipid metabolism disorders. Hospital use only.",
    price: 10000, mrp: 25000,
    image: "/medicines/injection_vial.jpg",
    rating: 4.3, review_count: 28, stock: 3,
    prescription_required: true,
    highlights: ["60% OFF", "Hospital use", "30MG"],
  },
  {
    id: "A28",
    name: "Adalirel 40MG Injection",
    brand: "RELIANCE",
    category: "Injection",
    usage: "Rheumatoid Arthritis · Crohn's Disease · Psoriasis",
    description: "Adalimumab biosimilar 40MG injection for autoimmune conditions.",
    price: 8735, mrp: 24956,
    image: "/medicines/injection_vial.jpg",
    rating: 4.6, review_count: 52, stock: 5,
    prescription_required: true,
    highlights: ["65% OFF", "Biosimilar", "Rx required"],
  },
];

// ── Individual Product Card ────────────────────────────────────────────────
const MedicineCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const [added, setAdded] = useState(false);

  const savings =
    product.mrp && product.price
      ? +(product.mrp - product.price).toFixed(2)
      : 0;
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
      <div
        className="relative bg-white border-b border-slate-100 overflow-hidden"
        style={{ paddingTop: "85%" }}
      >
        <Link
          href={`/shop/${product.id}`}
          className="absolute inset-0 p-4 flex items-center justify-center bg-slate-50"
        >
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
            }
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400";
            }}
          />
        </Link>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

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
          <Heart
            size={14}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"
            }
          />
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
        <span className="inline-block text-[9px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider w-fit">
          {product.brand || "Generic"}
        </span>

        {/* Product Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-sm text-black group-hover:text-slate-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* ── USAGE SECTION ── */}
        {(product.usage || product.usage_instructions) && (
          <div className="flex items-start gap-1.5 bg-slate-100 rounded-xl px-2.5 py-2 border border-slate-200">
            <Info size={10} className="text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-black font-semibold leading-snug line-clamp-2">
              {product.usage || product.usage_instructions}
            </p>
          </div>
        )}

        {/* Description */}
        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
          {product.description || "Premium quality healthcare product."}
        </p>

        {/* ── Highlights ── */}
        {product.highlights && product.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.highlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="flex items-center gap-0.5 text-[9px] text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full font-semibold"
              >
                <CheckCircle size={8} className="text-slate-500" /> {h}
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
                <span className="text-[9px] text-black font-medium">
                  (
                  {product.review_count > 999
                    ? `${(product.review_count / 1000).toFixed(1)}k`
                    : product.review_count}
                  )
                </span>
              )}
            </div>
          )}
          <div className="text-[9px] font-semibold ml-auto">
            {product.stock > 10 ? (
              <span className="text-emerald-600 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />{" "}
                In Stock
              </span>
            ) : product.stock > 0 ? (
              <span className="text-amber-600">Only {product.stock} left</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>
        </div>

        {/* ── Price + Add to Cart ── */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg text-black">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-slate-500 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {savings > 0 && (
              <div className="text-[9px] text-emerald-700 font-bold mt-0.5">
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
              <>
                <CheckCircle size={13} /> Added!
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer trust bar */}
      <div className="px-4 pb-3 flex items-center gap-1.5 text-[9px] text-slate-600 font-medium border-t border-slate-100 pt-2">
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
const categories = [
    "All",
    "Tablets",
    "Capsules",
    "Injection",
    "IV Infusion",
    "Medical Device",
    "Surgical Supplies",
  ];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) =>
          (p.category || "")
            .toLowerCase()
            .includes(activeCategory.toLowerCase()),
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
              <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">
                Featured Products
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Shop Top Medicines &amp; Healthcare
            </h2>
            <p className="text-sm text-slate-700 mt-1.5 max-w-lg">
              Trusted brands at the best prices — with usage, highlights &amp;
              savings.
            </p>
          </div>
          <Link
            href="/medicine"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-4 py-2 rounded-full transition-all duration-200 group flex-shrink-0"
          >
            View All Medicines
            <ChevronRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
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
              <div
                key={i}
                className="h-96 bg-slate-100 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Pill size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.slice(0, 12).map((product) => (
              <MedicineCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* ── View All CTA Banner ── */}
        {!loading && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none" />
            <div className="relative z-10 text-white text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">
                🎁 Limited Time
              </p>
              <h3 className="text-xl sm:text-2xl font-black">
                Explore 500+ Healthcare Products
              </h3>
              <p className="text-blue-200 text-sm mt-1">
                Genuine medicines · Upto 60% off · Free delivery above ₹499
              </p>
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
