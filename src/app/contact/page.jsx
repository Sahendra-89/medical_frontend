"use client";

import React, { useState } from "react";
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

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
              <Stethoscope size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">
                Doctor Consultation
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                Available for online prescription and medical advice
              </p>
              <a
                href="tel:+919123456789"
                className="text-xs font-bold text-medical-blue hover:underline block"
              >
                +91 91234 56789
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <h3 className="font-bold text-xl text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Send Us a Message
          </h3>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-4 rounded-2xl mb-6 font-bold flex items-center gap-2">
              <CheckCircle size={18} /> Sending message to support team...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject / Inquiry Type *
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white font-medium text-slate-700"
                >
                  <option value="">Select Subject</option>
                  <option value="Order Status">Order Tracking / Status</option>
                  <option value="Prescription Inquiry">
                    Prescription Verification
                  </option>
                  <option value="B2B Bulk Order">
                    B2B Bulk Buying / Pharmacy Tie-up
                  </option>
                  <option value="Refund / Cancellation">
                    Refund / Cancellation
                  </option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Message / Inquiry Details *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Provide detailed information regarding your inquiry or medicine requirements..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-medical-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wider mt-4"
            >
              <Send size={16} /> {submitted ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
