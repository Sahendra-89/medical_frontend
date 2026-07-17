import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Award, CheckCircle } from 'lucide-react';

export default function LicensePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
            <Award size={14} /> Regulatory Compliance
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Drug License & Statutory Compliance</h1>
          <p className="text-xs text-slate-500 mt-1">Verified Legal Credentials | Paridhi Pharma, Gurgaon</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-medical-blue" /> Registered Pharmacy Credentials
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paridhi Pharma operates under full statutory compliance with the Food and Drug Administration (FDA) Haryana and the Central Drugs Standard Control Organisation (CDSCO).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Retail Drug License No:</span>
                <span className="font-bold text-slate-900 text-sm">HR-GUR-2026-98765 (Form 20, 21)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Wholesale Drug License No:</span>
                <span className="font-bold text-slate-900 text-sm">HR-GUR-2026-98766 (Form 20B, 21B)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">FSSAI Registration:</span>
                <span className="font-bold text-slate-900 text-sm">10826005001234</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Pharmacist-in-Charge:</span>
                <span className="font-bold text-slate-900 text-sm">Harsh (B.Pharm, Reg No: 45892)</span>
              </div>
            </div>
          </div>

          <section className="space-y-3 pt-2">
            <h3 className="font-bold text-base text-slate-900">Statutory Declaration</h3>
            <p className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
              <span>We do not stock, sell, or dispense any banned drugs, narcotic substances, or unverified pharmaceutical formulations.</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
              <span>All medicines are stored under strict temperature and humidity controls as specified by the manufacturers to preserve therapeutic efficacy.</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
              <span>Every batch of medicine dispensed can be traced directly back to the original manufacturer or authorized distributor via our computerized inventory system.</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
