"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { submitContactForm } from "../../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await submitContactForm(form);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      alert(
        "Thank you for contacting Paridhi Pharma. Our support team will get back to you within 24 hours.",
      );
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <div className="text-center max-1w-xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Get in Touch with Us
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have questions about your order, prescription verification, or B2B
          bulk buying? Reach out to our dedicated support team in Gurgaon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-medical-blue flex items-center justify-center shrink-0 shadow-inner">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                Call Our Pharmacy Helpline
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                Available 8 AM to 10 PM for order assistance & refills
              </p>
              <a
                href="tel:+919876543210"
                className="text-xs font-bold text-medical-blue hover:underline block"
              >
                +91 98765 43210
              </a>
              <a
                href="tel:98765 43210"
                className="text-xs font-bold text-medical-blue hover:underline block"
              >
                98765 43210
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 shadow-inner">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                Email Customer Support
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                For prescription verification, refunds & B2B inquiries
              </p>
              <a
                href="mailto:support@paridhipharma.com"
                className="text-xs font-bold text-medical-blue hover:underline block"
              >
                support@paridhipharma.com
              </a>
              <a
                href="mailto:b2b@paridhipharma.com"
                className="text-xs font-bold text-medical-blue hover:underline block"
              >
                b2b@paridhipharma.com
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-inner">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                Visit Our Pharmacy Store
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                Shop No. 12, Main Market, Sector 14, Gurgaon, Haryana - 122001
              </p>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                Open 7 Days a Week
              </span>
            </div>
          </div>

          <Link href="/consult" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex items-start gap-4 hover:border-medical-blue hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 group-hover:bg-medical-blue group-hover:text-white transition flex items-center justify-center shrink-0 shadow-inner">
              <Stethoscope size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-medical-blue transition">
                Doctor Consultation
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                Available for online prescription and medical advice
              </p>
              <span
                className="text-xs font-bold text-medical-blue group-hover:underline block"
              >
                Book Consultation Now &rarr;
              </span>
            </div>
          </Link>
        </div>

        {/* Doctor Consultant Section (Replaced Contact Form) */}
        <div className="lg:col-span-7 bg-medical-dark rounded-3xl p-8 sm:p-12 shadow-card text-white relative overflow-hidden flex flex-col justify-center">
          {/* Background Decorative Element */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-medical-blue/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 bg-white/10 w-max rounded-md py-1 px-3 mb-6 border border-white/10">
               <Stethoscope size={14} className="text-medical-blue" />
               <span className="text-xs font-bold">Doctor Consult</span>
            </div>
            
            <h3 className="font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
              <span className="text-amber-400">Consult Certified Doctors</span><br/>
              Online - 24/7 Access
            </h3>
            
            <p className="text-blue-100 text-sm mb-8 max-w-md leading-relaxed">
              Skip the waiting room. Get expert medical advice, digital prescriptions, and free follow-ups from top doctors starting at just ₹199.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/consult" className="bg-medical-blue hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2">
                Consult Now
              </Link>
              <a href="tel:+919123456789" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2">
                <Phone size={16} /> Call Us
              </a>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle size={14} className="text-green-400" />
                </div>
                <span className="text-xs font-medium text-blue-100">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle size={14} className="text-green-400" />
                </div>
                <span className="text-xs font-medium text-blue-100">Verified Doctors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
