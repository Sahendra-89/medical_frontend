"use client";

import React, { useState } from 'react';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';

export default function SubstitutePage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <section className="bg-gradient-to-br from-medical-blue via-blue-800 to-medical-dark text-white pt-16 pb-20 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black mb-4">Find Cheaper Substitutes</h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Search for your prescribed medicine and find generic alternatives with the same composition to save up to 50% on your medical bills.
          </p>
          
          <div className="relative max-w-2xl mx-auto flex items-center bg-white rounded-full p-1.5 shadow-xl">
            <Search className="text-slate-400 ml-4 absolute" size={24} />
            <input 
              type="text" 
              placeholder="Enter medicine name (e.g. Crocin, Dolo)"
              className="w-full py-4 pl-14 pr-4 text-slate-800 bg-transparent outline-none rounded-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-medical-blue hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12 w-full">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4 mb-8">
          <AlertCircle className="text-medical-blue flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">What is a Substitute?</h3>
            <p className="text-sm text-blue-800/80 leading-relaxed">
              Substitutes are generic medicines that have the exact same active ingredients, strength, and effectiveness as your branded medicine, but are manufactured by a different company. They are significantly more affordable because manufacturers do not have to repeat the clinical trials.
            </p>
          </div>
        </div>

        {query.trim() !== '' ? (
          <div className="text-center py-20">
            <RefreshCw className="animate-spin text-slate-300 mx-auto mb-4" size={32} />
            <p className="text-slate-500 font-medium">Searching for alternatives for "{query}"...</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <img src="https://cdn-icons-png.flaticon.com/512/3024/3024310.png" alt="Search" className="w-24 h-24 mx-auto mb-4 opacity-50 grayscale" />
            <p className="text-slate-400 font-medium">Enter a medicine name above to find alternatives.</p>
          </div>
        )}
      </section>
    </div>
  );
}
