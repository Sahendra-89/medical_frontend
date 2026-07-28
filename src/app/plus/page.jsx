"use client";

import React from "react";
import { Plus, Check, Zap, Truck, HeartHandshake } from "lucide-react";

export default function PlusPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <section className="bg-[#111827] text-white pt-20 pb-20 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-medical-blue/30 blur-3xl"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 rounded-full text-white font-black tracking-wider text-sm mb-6 shadow-lg shadow-purple-500/30">
            PARIDHI PHARMA <Plus size={16} strokeWidth={4} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6">
            Healthcare that rewards you.
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Join the PLUS membership program to get flat 5% extra cashback on
            all medicines, free delivery, and priority doctor consultations.
          </p>
          <button className="bg-white text-slate-900 font-black text-lg py-4 px-10 rounded-xl hover:scale-105 transition shadow-xl shadow-white/10">
            Join Now at ₹199 / 3 Months
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-8 -mt-10 relative z-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <Zap size={32} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">
              Extra 5% Cashback
            </h3>
            <p className="text-slate-500 text-sm">
              Earn an extra 5% cashback on every single medicine and healthcare
              order.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
              <Truck size={32} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">
              Free Delivery
            </h3>
            <p className="text-slate-500 text-sm">
              No minimum order value required. Get your medicines delivered for
              free.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6">
              <HeartHandshake size={32} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">
              Priority Support
            </h3>
            <p className="text-slate-500 text-sm">
              Jump the queue. Get priority access to customer support and doctor
              consults.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
