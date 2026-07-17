"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Pill, TrendingUp } from 'lucide-react';
import { getProducts } from '../lib/api';

export default function SearchSuggestions({ query, onSelect }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ search: query, limit: 5 });
        if (res.products) {
          setResults(res.products.slice(0, 5));
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!query || query.length < 2) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
      {loading ? (
        <div className="p-4 text-center text-xs text-slate-500 animate-pulse">Loading suggestions...</div>
      ) : results.length > 0 ? (
        <div className="py-2">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Matches</div>
          {results.map((item) => (
            <Link 
              key={item.id} 
              href={`/shop/${item.id}`}
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition border-b border-slate-50 last:border-0"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center p-1 shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <Pill size={16} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-slate-800 truncate">{item.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{item.brand || item.category_id}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[12px] font-black text-medical-blue">₹{item.price}</div>
              </div>
            </Link>
          ))}
          <Link 
            href={`/shop?search=${encodeURIComponent(query)}`} 
            onClick={onSelect}
            className="block text-center text-[12px] font-bold text-medical-blue py-3 bg-blue-50/50 hover:bg-blue-100 transition"
          >
            See all results for "{query}"
          </Link>
        </div>
      ) : (
        <div className="p-6 text-center text-slate-500">
          <Search size={24} className="mx-auto mb-2 text-slate-300" />
          <div className="text-[13px] font-bold text-slate-800">No results found</div>
          <div className="text-[11px]">Try checking your spelling or use more general terms</div>
        </div>
      )}
    </div>
  );
}
