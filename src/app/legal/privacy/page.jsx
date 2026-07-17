import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3 border border-blue-100">
            <ShieldCheck size={14} /> Data Protection
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: May 16, 2026 | Paridhi Pharma Operations</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">1. Information We Collect</h3>
            <p>Paridhi Pharma collects personal and medical information necessary to fulfill your orders and comply with pharmaceutical regulations. This includes your name, contact number, delivery address, email, payment transaction IDs, and uploaded medical prescriptions.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">2. How We Use Your Information</h3>
            <p>We use your information exclusively for order processing, dispensing prescription medicines under pharmacist supervision, providing automated monthly refill reminders, improving our e-commerce platform, and communicating essential tracking updates. We do NOT sell or rent your personal data to third-party marketing agencies.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">3. Prescription Confidentiality</h3>
            <p>Uploaded prescriptions are treated with the highest degree of medical confidentiality. They are stored securely using industry-standard encryption and are accessible strictly by our registered supervising pharmacists for verification purposes as mandated by law.</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-slate-900">4. Payment Security</h3>
            <p>All online payment transactions (UPI, Credit/Debit cards, Net Banking) are processed through secure, PCI-DSS compliant third-party payment gateways. Paridhi Pharma does not store your complete credit card numbers or UPI PINs on our servers.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
