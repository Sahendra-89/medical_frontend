"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { getProducts, getCategories } from '../../../lib/api';
import ProductCard from '../../../components/ProductCard';

export default function CategoryProductsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatData = async () => {
      setLoading(true);
      try {
        const catRes = await getCategories();
        if (catRes.categories) {
          const found = catRes.categories.find(c => c.id === id);
          if (found) setCategory(found);
        }

        const prodRes = await getProducts({ category: id, limit: 50 });
        if (prodRes.products) setProducts(prodRes.products);
      } catch (err) {
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCatData();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      <button onClick={() => router.push('/categories')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to All Categories
      </button>

      {/* Category Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-12 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 text-5xl flex items-center justify-center shadow-inner shrink-0">
          {category?.icon || '💊'}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{category?.name || id.toUpperCase()}</h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">{category?.description || 'Browse high-quality pharmaceutical and healthcare products in this category.'}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
            <span>Total Products: {products.length}</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl"></div>)}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center justify-center">
          <SlidersHorizontal size={48} className="text-slate-300 mb-4" />
          <h3 className="font-bold text-lg text-slate-900">No products available in this category</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">We are currently restocking our inventory for {category?.name || id}. Please check back later or explore other categories.</p>
          <button onClick={() => router.push('/shop')} className="mt-6 bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-blue-600 transition shadow-md">
            Explore All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
