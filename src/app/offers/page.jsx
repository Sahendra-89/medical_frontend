"use client";

import React, { useState } from 'react';
import { Tag, Copy, CheckCircle2 } from 'lucide-react';

export default function OffersPage() {
  const [copied, setCopied] = useState(null);

  const offers = [
    { code: 'FIRST20', desc: 'Flat 20% off on your first medicine order. Valid for new users only.', type: 'Medicine' },
    { code: 'LAB100', desc: 'Get ₹100 off on any full body checkup or lab test booking.', type: 'Lab Tests' },
    { code: 'HDFC15', desc: 'Flat 15% instant discount using HDFC Bank Credit Cards.', type: 'Bank Offer' },
    { code: 'PAYTM50', desc: 'Up to ₹50 cashback when paying via Paytm Wallet.', type: 'Wallet' },
    { code: 'WINTER30', desc: 'Up to 30% off on all winter skincare and cold relief products.', type: 'Healthcare' },
    { code: 'DOCFREE', desc: '100% off on your first online doctor consultation.', type: 'Consult' },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <section className="bg-medical-blue text-white pt-16 pb-16 px-4 sm:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-black mb-4 flex items-center justify-center gap-3">
          <Tag size={40} /> Exclusive Offers
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Save big on medicines, lab tests, and health products with our verified promo codes and bank offers.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col hover:border-medical-blue transition group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-medical-blue text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {offer.type}
                </span>
              </div>
              <p className="text-slate-600 font-medium mb-6 flex-1">
                {offer.desc}
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                <span className="font-black text-slate-800 text-lg tracking-widest">{offer.code}</span>
                <button 
                  onClick={() => handleCopy(offer.code)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition ${
                    copied === offer.code 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-medical-blue text-white hover:bg-blue-700'
                  }`}
                >
                  {copied === offer.code ? (
                    <><CheckCircle2 size={16} /> Copied</>
                  ) : (
                    <><Copy size={16} /> Copy</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
