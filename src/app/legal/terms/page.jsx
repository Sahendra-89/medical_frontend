import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3 border border-blue-100">
            <ShieldCheck size={14} /> Legal & Compliance
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: May 16, 2026 | Paridhi Pharma Operations</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">1. Acceptance of Terms</h3>
            <p>By accessing and using the Paridhi Pharma e-commerce platform (website, mobile application, B2B wholesale portal), you agree to comply with and be legally bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">2. Drug Prescription Policy (Schedule H & X)</h3>
            <p>Paridhi Pharma strictly adheres to the Drugs and Cosmetics Act, 1940 and Rules, 1945. Any order containing Schedule H or Schedule X prescription medicines requires a valid, legible prescription issued by a registered medical practitioner. Our licensed pharmacists inspect and verify every prescription prior to order dispatch. We reserve the right to cancel any order if the prescription is deemed invalid, outdated, or fraudulent.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">3. B2B Wholesale & Bulk Orders</h3>
            <p>Business entities (clinics, hospitals, retail pharmacies) ordering through our B2B portal must provide valid GSTIN and Drug License details. Wholesale pricing and bulk discounts are subject to minimum order quantities and stock availability.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">4. Local Delivery & Same-Day Dispatch</h3>
            <p>Same-day delivery guarantees apply strictly to orders placed within our local service areas in Gurgaon, Delhi NCR, and Faridabad before the designated cutoff time (6:00 PM). Unforeseen weather conditions, traffic disruptions, or stock verification delays may extend delivery times.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">5. Returns, Refunds & Cancellations</h3>
            <p>Due to the sensitive nature of pharmaceutical products and temperature-control requirements, medicines cannot be returned once delivered and unsealed. In case of damaged, incorrect, or expired products received, customers must initiate a return request within 48 hours of delivery with photographic evidence.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
