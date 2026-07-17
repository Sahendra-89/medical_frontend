import React from 'react';
import { ShieldCheck, Target, Users, MapPin, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3">
          <ShieldCheck size={14} /> Licensed Pharma E-commerce
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
          Pioneering Accessible Healthcare in Gurgaon & Delhi NCR
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          Paridhi Pharma is a state-of-the-art medical and pharmaceutical e-commerce platform offering genuine medicines, healthcare devices, and wellness essentials. We combine licensed local pharmacy expertise with digital convenience.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-medical-blue flex items-center justify-center mb-6 shadow-inner">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Goal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              To establish a highly efficient, trust-driven online pharmacy serving retail buyers (B2C) and clinics/pharmacies (B2B), achieving ₹3–4 lakh monthly sales through seamless online ordering.
            </p>
          </div>
          <span className="text-xs font-bold text-medical-blue">100% Goal Aligned</span>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 shadow-inner">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Local NCR Focus</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Currently delivering same-day across Gurgaon, Delhi, and Faridabad. We maintain our own verified delivery fleet to ensure temperature-controlled and timely medicine drop-offs.
            </p>
          </div>
          <span className="text-xs font-bold text-green-600">Gurgaon • Delhi • Faridabad</span>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-inner">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pan-India Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Building a robust digital supply chain with top courier partners (Delhivery, BlueDart) to expand our B2B wholesale and B2C retail operations to customers across India.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-600">Future Pan-India Expansion</span>
        </div>
      </div>

      {/* Leadership & Compliance */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-premium">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-blue-300">
            <Award size={14} /> Quality & Compliance
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Backed by Registered Pharmacists & Drug Licenses</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unlike marketplace aggregators, Paridhi Pharma operates its own licensed retail and wholesale pharmacy store in Sector 14, Gurgaon. Every prescription is physically inspected and verified by our Pharmacist-in-Charge before any medicine leaves our premises.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Drug License Number:</span>
              <span className="font-bold text-white text-sm">HR-GUR-2026-98765</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">GSTIN Registration:</span>
              <span className="font-bold text-white text-sm">06AAAAA0000A1Z5</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-slate-800 p-8 rounded-2xl border border-slate-700/80 space-y-4">
          <h3 className="font-bold text-lg text-white">Visit Our Physical Pharmacy</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Shop No. 12, Main Market, Sector 14, Gurgaon, Haryana - 122001
          </p>
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-1">Store Timings:</span>
            <span className="text-xs font-bold text-green-400">Open 7 Days a week (8:00 AM - 10:00 PM)</span>
          </div>
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-1">24/7 Helpline:</span>
            <span className="text-xs font-bold text-blue-300">+91 98765 43210</span>
          </div>
        </div>
      </div>
    </div>
  );
}
