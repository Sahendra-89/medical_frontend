"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, FileText, ChevronRight, ChevronLeft, Star, ShieldCheck, Clock
} from 'lucide-react';
import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import MedicineProducts from '../components/MedicineProducts';
import FeaturesAndTestimonials from '../components/FeaturesAndTestimonials';

const HOME_ICONS = [
  { img: '💊', title: 'Medicine', sub: 'SAVE 27%', link: '/shop?category=medicine' },
  { img: '🔬', title: 'Lab Tests', sub: 'BUY 1 GET 1', link: '/lab-tests' },
  { img: '👨‍⚕️', title: 'Doctor Consult', sub: 'FROM ₹199', link: '/consult' },
  { img: '🔄', title: 'Branded Substitute', sub: 'UPTO 50% OFF', link: '/substitute' },
  { img: '🧴', title: 'Healthcare', sub: 'UPTO 60% OFF', link: '/shop' },
  { img: '❤️', title: 'Health Blogs', sub: '', link: '/blogs' },
  { img: '➕', title: 'PLUS', sub: 'Save 5% Extra', link: '/plus' },
  { img: '🎁', title: 'Offers', sub: '', link: '/offers' },
  { img: '🛒', title: 'Value Store', sub: 'UPTO 50% OFF', link: '/shop' },
];

// ── Static catalog products (always visible, no API dependency) ──
const STATIC_CATALOG_PRODUCTS = [
  {
    id: 'cat-1',
    name: 'Paracetamol 500mg Strip',
    brand: 'Cipla Ltd.',
    description: 'Fast-acting pain relief & fever reducer. Strip of 10 tablets.',
    price: 35,
    mrp: 52,
    image: '/medicines/paracetamol.jpg',
    rating: 4.7,
    review_count: 2340,
    stock: 150,
    is_bestseller: true,
    prescription_required: false,
    discount_percent: 33,
  },
  {
    id: 'cat-2',
    name: 'Honitus Cough Syrup 100ml',
    brand: 'Dabur India',
    description: 'Ayurvedic cough formula with Tulsi, Honey & Mulethi.',
    price: 95,
    mrp: 130,
    image: '/medicines/cough_syrup.jpg',
    rating: 4.5,
    review_count: 1856,
    stock: 85,
    is_bestseller: true,
    prescription_required: false,
    discount_percent: 27,
  },
  {
    id: 'cat-3',
    name: 'Boroline Antiseptic Cream 20g',
    brand: 'G.D. Pharmaceuticals',
    description: 'Night repair antiseptic cream for cuts, cracks & dry skin.',
    price: 42,
    mrp: 55,
    image: '/medicines/antiseptic_cream.jpg',
    rating: 4.6,
    review_count: 3120,
    stock: 200,
    is_bestseller: false,
    prescription_required: false,
    discount_percent: 24,
  },
  {
    id: 'cat-4',
    name: 'Vitamin D3 2000 IU Capsules',
    brand: 'HealthKart',
    description: '60 capsules — supports bone health, immunity & calcium absorption.',
    price: 349,
    mrp: 499,
    image: '/medicines/vitamin_d3.jpg',
    rating: 4.8,
    review_count: 4580,
    stock: 120,
    is_bestseller: true,
    prescription_required: false,
    discount_percent: 30,
  },
  {
    id: 'cat-5',
    name: 'Omega-3 Fish Oil 1000mg',
    brand: 'Healthvit',
    description: 'Triple-strength EPA & DHA for heart, brain & joint health.',
    price: 425,
    mrp: 699,
    image: '/medicines/omega3.jpg',
    rating: 4.4,
    review_count: 1290,
    stock: 75,
    is_bestseller: false,
    prescription_required: false,
    discount_percent: 39,
  },
  {
    id: 'cat-6',
    name: 'Dr. Morepen BP Monitor BPOne',
    brand: 'Dr. Morepen',
    description: 'Fully automatic digital BP monitor with WHO indicator.',
    price: 999,
    mrp: 1799,
    image: '/medicines/bp_monitor.jpg',
    rating: 4.3,
    review_count: 876,
    stock: 40,
    is_bestseller: false,
    prescription_required: false,
    discount_percent: 44,
  },
  {
    id: 'cat-7',
    name: 'Dolo 650 Paracetamol Tablets',
    brand: 'Micro Labs',
    description: 'Trusted fever & headache relief. Strip of 15 tablets.',
    price: 30,
    mrp: 35,
    image: '/medicines/paracetamol.jpg',
    rating: 4.9,
    review_count: 8640,
    stock: 300,
    is_bestseller: true,
    prescription_required: false,
    discount_percent: 14,
  },
  {
    id: 'cat-8',
    name: 'Benadryl Cough Formula 150ml',
    brand: 'Johnson & Johnson',
    description: 'Fast relief from dry & wet cough. Non-drowsy formula.',
    price: 115,
    mrp: 145,
    image: '/medicines/cough_syrup.jpg',
    rating: 4.3,
    review_count: 1540,
    stock: 60,
    is_bestseller: false,
    prescription_required: false,
    discount_percent: 21,
  },
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({}); // Fetch all without limit
        const apiProducts = res.products || [];
        // Merge API products with static catalog; static products fill in if API returns few/none
        const existingIds = new Set(apiProducts.map(p => p.id));
        const extras = STATIC_CATALOG_PRODUCTS.filter(p => !existingIds.has(p.id));
        setAllProducts([...apiProducts, ...extras]);
      } catch (err) {
        console.error(err);
        // On error, fall back to static products so the section is never empty
        setAllProducts(STATIC_CATALOG_PRODUCTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/shop?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── SEARCH & ICONS SECTION ── */}
      <section className="pt-10 pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Title and Upload Link */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            What are you looking for?
          </h1>
          <Link href="/upload-prescription" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-black transition mt-4 md:mt-0">
            <FileText size={18} className="text-slate-500" />
            <span>Order with prescription. <span className="text-black">UPLOAD NOW &gt;</span></span>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto mb-12">
          <div className="flex items-center bg-white border border-slate-300 rounded-full shadow-sm overflow-hidden hover:shadow-md transition pl-4">
            <Search size={20} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for Medicine"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3.5 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold px-6 sm:px-8 py-3 m-1 rounded-full text-sm transition flex-shrink-0">
              Search
            </button>
          </div>
        </form>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4 text-center">
          {HOME_ICONS.map((item, idx) => (
            <Link key={idx} href={item.link} className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-3xl mb-3 group-hover:shadow-md transition">
                {item.img}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight group-hover:text-teal-600 transition">{item.title}</span>
              {item.sub && <span className="text-[10px] sm:text-xs font-bold text-red-500 mt-1">{item.sub}</span>}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED MEDICINE PRODUCTS ── */}
      <MedicineProducts />

      {/* ── ALL PRODUCTS CATALOG ── */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Explore Our Catalog</h2>
              <p className="text-sm text-slate-500 mt-1">Browse all our premium healthcare and wellness products</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
              Shop Page <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-medical-blue hover:text-white transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="text-sm font-bold text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-medical-blue hover:text-white transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── FEATURES & TESTIMONIALS ── */}
      <FeaturesAndTestimonials />
    </div>
  );
}
