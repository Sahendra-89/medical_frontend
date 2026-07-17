"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getCategories } from '../../lib/api';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.categories) setCategories(res.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <Breadcrumbs items={[
        { label: 'Categories' }
      ]} />
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Sparkles size={14} /> Medical & Wellness
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">Explore All Categories</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Browse through our specialized pharmaceutical and healthcare categories to find genuine medicines, medical devices, and daily wellness essentials.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-3xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.id}`} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-4xl flex items-center justify-center group-hover:scale-110 transition duration-300 mb-6 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-medical-blue transition mb-2">{cat.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">{cat.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-medical-blue group-hover:translate-x-1 transition">
                <span>View Products</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
