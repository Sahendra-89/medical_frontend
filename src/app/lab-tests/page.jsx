"use client";

import React from 'react';
import Link from 'next/link';
import { Microscope, ArrowRight, Activity, HeartPulse, Droplet } from 'lucide-react';

export default function LabTestsPage() {
  const popularTests = [
    { title: 'Complete Blood Count (CBC)', price: '₹299', oldPrice: '₹500', time: '12 hrs', icon: <Droplet size={24} /> },
    { title: 'Lipid Profile', price: '₹399', oldPrice: '₹800', time: '12 hrs', icon: <HeartPulse size={24} /> },
    { title: 'Thyroid Profile (T3, T4, TSH)', price: '₹499', oldPrice: '₹950', time: '24 hrs', icon: <Activity size={24} /> },
    { title: 'Comprehensive Full Body Checkup', price: '₹999', oldPrice: '₹2500', time: '24 hrs', icon: <Microscope size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <section className="bg-gradient-to-br from-medical-blue via-blue-800 to-medical-dark text-white pt-16 pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Microscope size={32} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">Book Lab Tests at Home</h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Safe, hygienic, and affordable blood tests from NABL certified labs. Get accurate reports delivered directly to your WhatsApp.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-medical-blue font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition shadow-lg">
              Book a Test
            </button>
            <button className="bg-blue-800/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-800/60 transition border border-blue-700/50">
              Upload Prescription
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 w-full">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Popular Health Checks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTests.map((test, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition flex flex-col">
              <div className="w-12 h-12 bg-blue-50 text-medical-blue rounded-full flex items-center justify-center mb-4">
                {test.icon}
              </div>
              <h3 className="font-bold text-slate-800 leading-tight mb-4 flex-1">{test.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-black text-slate-800">{test.price}</span>
                <span className="text-sm text-slate-400 line-through">{test.oldPrice}</span>
              </div>
              <div className="bg-slate-50 text-slate-600 text-xs font-bold py-2 px-3 rounded-lg flex justify-between items-center mb-4">
                <span>Reports in</span>
                <span className="text-medical-blue">{test.time}</span>
              </div>
              <button className="w-full bg-medical-blue/10 text-medical-blue font-bold py-2.5 rounded-xl hover:bg-medical-blue hover:text-white transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
