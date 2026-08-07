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
import PrescriptionModal from '../components/PrescriptionModal';
import dynamic from 'next/dynamic';

const FeaturesAndTestimonials = dynamic(() => import('../components/FeaturesAndTestimonials'), { ssr: false });

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


export default function HomePage() {
  const searchRef = React.useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rxOpen, setRxOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const router = useRouter();

  // ── Auto-open prescription popup after 2s (once per session) ──
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('rx_popup_shown');
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setRxOpen(true);
      sessionStorage.setItem('rx_popup_shown', '1');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({});
        const all = res.products || [];
        // Skip first 8 items (shown in featured section) and reverse to show newly added items first
        setAllProducts(all.length > 8 ? all.slice(8).reverse() : [...all].reverse());
      } catch (err) {
        console.error(err);
        setAllProducts([]);
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
    const query = searchRef.current?.value || '';
    if (query.trim()) router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── SEARCH & ICONS SECTION ── */}
      <section className="pt-8 sm:pt-10 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title and Upload Link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
            What are you looking for?
          </h1>
          <Link
            href="/upload-prescription"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-black transition flex-shrink-0 group"
          >
            <FileText size={16} className="text-slate-500 group-hover:text-blue-600 transition" />
            <span>Order with prescription. <span className="text-black group-hover:text-blue-600 transition">UPLOAD NOW &gt;</span></span>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto mb-2">
          <div className="flex items-center bg-white border border-slate-300 rounded-full shadow-sm overflow-hidden hover:shadow-md transition pl-3 sm:pl-4">
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for Medicine, Brands..."
              ref={searchRef}
              defaultValue=""
              className="w-full py-3 sm:py-3.5 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold px-5 sm:px-8 py-2.5 sm:py-3 m-1 rounded-full text-sm transition flex-shrink-0">
              Search
            </button>
          </div>
        </form>
      </section>

      {/* ── FEATURED MEDICINE PRODUCTS ── */}
      <MedicineProducts />

      {/* ── ALL PRODUCTS CATALOG ── */}
      <section className="pt-6 pb-4 sm:pt-8 sm:pb-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6 sm:mb-8 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">Explore Our Catalog</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Browse all our premium healthcare and wellness products</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 flex-shrink-0">
              Shop Page <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : allProducts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
              <div className="text-5xl mb-4">💊</div>
              <p className="font-bold text-slate-400 text-base">No products added yet</p>
              <p className="text-sm text-slate-300 mt-2">
                Admin: Go to Dashboard → Products to add medicines.
              </p>
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

      {/* ── PRESCRIPTION MODAL POPUP ── */}
      <PrescriptionModal
        isOpen={rxOpen}
        onClose={() => setRxOpen(false)}
        onSuccess={() => setRxOpen(false)}
      />
    </div>
  );
}
