"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneOff, Phone, Star, ArrowRight, Video, Send, CheckCircle } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { submitContactForm } from "../../lib/api";

export default function ConsultPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Doctor Consultation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await submitContactForm(form);
      setForm({ name: "", email: "", phone: "", subject: "Doctor Consultation", message: "" });
      alert(
        "Thank you! A representative will call you shortly to connect you with the doctor."
      );
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setSubmitted(false);
    }
  };

  const specialities = [
    { name: 'General Physician', icon: '👨‍⚕️', condition: 'Fever, Cough, Cold' },
    { name: 'Dermatology', icon: '🧴', condition: 'Skin, Hair loss' },
    { name: 'Pediatrics', icon: '👶', condition: 'Child Specialists' },
    { name: 'Gynecology', icon: '👩‍⚕️', condition: 'Women Health' },
    { name: 'Orthopedics', icon: '🦴', condition: 'Bone & Joint issues' },
    { name: 'Psychiatry', icon: '🧠', condition: 'Mental Wellness' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      
      {/* ── BREADCRUMBS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-6 pb-4">
         <Breadcrumbs items={[{ label: 'Online Doctor Consultation' }]} />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="bg-medical-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between py-12 md:py-20 relative z-10">
          
          {/* Left Content */}
          <div className="md:w-[55%] flex flex-col items-start relative z-20">
            {/* Logo Badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-md py-1.5 px-3 mb-6 border border-white/10">
               <div className="bg-white rounded p-1">
                 <Video size={14} className="text-medical-dark" />
               </div>
               <div className="flex flex-col leading-none">
                 <span className="text-[11px] font-bold">Doctor Consult</span>
                 <span className="text-[9px] text-blue-200">by Paridhi Pharma</span>
               </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-[54px] font-bold leading-[1.1] mb-5 tracking-tight italic">
              <span className="text-amber-400">Consult Certified Doctors</span><br/>
              <span className="text-white">Online - 24/7 Access</span>
            </h1>
            
            <p className="text-blue-100 text-[15px] md:text-base font-medium mb-8">
              Video/Audio call • Starting at just ₹199
            </p>
            
            {/* CTA Button & Doctor Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <button className="bg-medical-blue text-white font-bold px-10 py-3.5 rounded-md hover:bg-medical-blue2 transition shadow-lg text-[15px]">
                Consult now
              </button>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Phone size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Chief Consultant</p>
                    <p className="text-white font-bold text-base leading-tight">Dr. Anuj Gupta</p>
                    <a href="tel:+919212041171" className="text-amber-400 text-sm font-bold hover:underline">
                      +91 92120 41171
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Phone size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Assistant Consultant</p>
                    <p className="text-white font-bold text-base leading-tight">Shailendra Kumar</p>
                    <a href="tel:+919971421922" className="text-amber-400 text-sm font-bold hover:underline">
                      +91 99714 21922
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
               <div className="flex items-center gap-2">
                 <div className="bg-white rounded-full p-1 text-medical-blue">
                   <ShieldCheck size={16} />
                 </div>
                 <span className="text-xs font-medium text-blue-100">Private and Secure sessions</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="bg-white/20 rounded-full p-1 text-white">
                   <PhoneOff size={16} />
                 </div>
                 <span className="text-xs font-medium text-blue-100">Free follow up & Cancellation</span>
               </div>
            </div>
          </div>
          
          {/* Right Image/Illustration Area */}
          <div className="md:w-[45%] mt-12 md:mt-0 relative flex justify-center md:justify-end">
            {/* Decorative background blobs */}
            <div className="absolute w-[400px] h-[400px] bg-medical-blue/30 rounded-full blur-3xl right-[-50px] top-[-50px]"></div>
            
            {/* Phone Frame and Doctors */}
            <div className="relative w-[300px] h-[350px] flex items-center justify-center">
              {/* Phone shape */}
              <div className="absolute w-[220px] h-[340px] bg-medical-blue rounded-[30px] border-8 border-medical-dark z-10 flex flex-col items-center pt-3 shadow-2xl">
                 <div className="w-16 h-1.5 bg-medical-dark rounded-full"></div>
                 {/* Center Doctor inside phone */}
                 <div className="w-full h-full bg-white mt-4 rounded-t-xl overflow-hidden relative shadow-inner flex flex-col">
                   <div className="h-[70%] bg-blue-50 flex items-end justify-center pt-8">
                     <div className="w-32 h-32 bg-medical-blue rounded-t-full flex items-center justify-center relative overflow-hidden border-4 border-white shadow-md">
                        <div className="absolute bottom-0 w-24 h-24 bg-white rounded-full flex items-center justify-center border-b-0 translate-y-4">
                           <div className="w-12 h-12 rounded-full bg-slate-200 absolute top-2"></div>
                           <div className="w-20 h-10 bg-blue-100 absolute bottom-2 rounded-t-3xl"></div>
                        </div>
                     </div>
                   </div>
                   <div className="h-[30%] bg-white p-2 text-center flex flex-col justify-center items-center">
                     <h3 className="font-bold text-[9px] text-slate-800 leading-tight">Dr. Anuj Gupta</h3>
                     <p className="text-[8px] font-bold text-medical-blue">92120 41171</p>
                   </div>
                 </div>
              </div>
              
              {/* Left Doctor Card */}
              <div className="absolute left-[-20px] top-[100px] w-28 h-36 bg-white rounded-lg shadow-xl z-20 border border-slate-100 p-2 transform -rotate-3 overflow-hidden flex flex-col">
                 <div className="flex-1 bg-teal-50 rounded mb-2 flex items-end justify-center overflow-hidden pt-4">
                   <div className="w-16 h-16 bg-teal-600 rounded-t-full relative flex flex-col items-center">
                     <div className="w-8 h-8 bg-[#e8c39e] rounded-full mt-1 z-10"></div>
                     <div className="w-12 h-8 bg-white absolute bottom-0 rounded-t-xl"></div>
                   </div>
                 </div>
                 <div className="bg-white px-2 py-1 text-center w-full mt-auto">
                    <h3 className="font-bold text-[8px] text-slate-800 leading-tight">Shailendra Kumar</h3>
                    <p className="text-[7px] text-slate-500">Asst. Consultant</p>
                    <p className="text-[7px] font-bold text-medical-blue">99714 21922</p>
                 </div>
              </div>
              
              {/* Right Doctor Card */}
              <div className="absolute right-[-20px] top-[140px] w-28 h-36 bg-white rounded-lg shadow-xl z-20 border border-slate-100 p-2 transform rotate-3 overflow-hidden flex flex-col">
                 <div className="flex-1 bg-purple-50 rounded mb-2 flex items-end justify-center overflow-hidden pt-4">
                   <div className="w-16 h-16 bg-purple-600 rounded-t-full relative flex flex-col items-center">
                     <div className="w-8 h-8 bg-[#f1d0b4] rounded-full mt-1 z-10"></div>
                     <div className="w-12 h-8 bg-white absolute bottom-0 rounded-t-xl"></div>
                   </div>
                 </div>
                 <div className="h-1.5 w-12 bg-slate-200 rounded mx-auto mb-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wave SVG Divider */}
      <div className="w-full overflow-hidden rotate-180 -mt-1 relative z-20 text-white">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[20px] sm:h-[30px] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* ── STATS SECTION ── */}
      <section className="bg-white py-10 shadow-sm border-b border-slate-100 relative z-30">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
           
           <div className="flex items-center gap-4 px-4 w-full md:w-1/3 justify-center pt-4 md:pt-0">
             <div className="text-medical-blue">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
             <div className="text-center">
               <p className="font-bold text-slate-800 text-lg">40+ <span className="font-medium text-slate-500">Certified</span></p>
               <p className="font-bold text-slate-500 text-sm">Doctors</p>
             </div>
             <div className="text-medical-blue scale-x-[-1]">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
           </div>

           <div className="flex items-center gap-4 px-4 w-full md:w-1/3 justify-center pt-4 md:pt-0">
             <div className="text-medical-blue">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
             <div className="text-center">
               <p className="font-bold text-slate-800 text-lg">50K+ <span className="font-medium text-slate-500">Successful</span></p>
               <p className="font-bold text-slate-500 text-sm">Consultations</p>
             </div>
             <div className="text-medical-blue scale-x-[-1]">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
           </div>

           <div className="flex items-center gap-4 px-4 w-full md:w-1/3 justify-center pt-4 md:pt-0">
             <div className="text-medical-blue">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
             <div className="text-center">
               <p className="font-bold text-slate-800 text-lg flex items-center justify-center gap-1">
                 <Star size={16} className="fill-yellow-400 text-yellow-400" /> 4.8/5
               </p>
               <p className="font-bold text-slate-500 text-sm">12K+ Patients</p>
             </div>
             <div className="text-medical-blue scale-x-[-1]">
               <svg width="32" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
             </div>
           </div>

        </div>
      </section>

      {/* ── SPECIALITIES SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Consult by Speciality</h2>
            <p className="text-sm text-slate-500 mt-1">Find experienced doctors across all specialities</p>
          </div>
          <button className="text-medical-blue font-bold text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialities.map((spec, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 text-center hover:shadow-lg hover:border-blue-200 transition cursor-pointer group flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {spec.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-medical-blue transition">{spec.name}</h3>
              <p className="text-[10px] text-slate-500 mt-1.5 font-medium uppercase tracking-wide">{spec.condition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INQUIRY & CONTACT SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-20 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-bold text-2xl text-slate-900 mb-2">
              Request a Consultation
            </h3>
            <p className="text-sm text-slate-500">
              Fill out the form below and our care team will contact you to confirm your appointment.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6 font-bold flex items-center justify-center gap-2">
              <CheckCircle size={20} /> Request submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medical-blue focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medical-blue focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medical-blue focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Health Issue / Symptoms *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Briefly describe your symptoms so we can connect you to the right specialist..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medical-blue focus:bg-white resize-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-medical-blue hover:bg-medical-blue2 text-white font-bold py-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Send size={18} /> {submitted ? "Sending Request..." : "Request Call Back"}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
