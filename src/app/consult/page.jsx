"use client";

import React from 'react';
import Link from 'next/link';
import { Video, Calendar, Clock, Star, ShieldCheck, UserRound, ArrowRight, Activity, Phone } from 'lucide-react';

export default function ConsultPage() {
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
      
      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-br from-medical-blue via-blue-800 to-medical-dark text-white pt-16 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-200 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-700/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Doctors Available Now
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Consult Top Doctors<br/>Online, 24/7.
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Get expert medical advice, prescriptions, and follow-ups over video or audio call from the comfort of your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-medical-blue font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-2">
                <Video size={20} /> Consult Now
              </button>
              <button className="bg-blue-800/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-800/60 transition border border-blue-700/50 flex items-center justify-center gap-2">
                <Calendar size={20} /> Book Appointment
              </button>
            </div>
            
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-blue-800/50">
              <div>
                <p className="text-2xl font-black">100+</p>
                <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Top Doctors</p>
              </div>
              <div className="w-px h-8 bg-blue-800/50"></div>
              <div>
                <p className="text-2xl font-black">20+</p>
                <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Specialities</p>
              </div>
              <div className="w-px h-8 bg-blue-800/50"></div>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="text-xl font-black leading-none">4.9/5</p>
                  <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Patient Rating</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-end relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full transform translate-y-10 scale-90"></div>
            
            <div className="bg-white p-6 rounded-3xl shadow-2xl relative z-10 max-w-sm w-full border border-blue-100 text-slate-800">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                <Activity className="text-medical-blue" />
                How it works
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-medical-blue font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold">Choose Speciality</p>
                    <p className="text-sm text-slate-500 mt-1">Select the right doctor for your health issue</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-medical-blue font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold">Pay & Connect</p>
                    <p className="text-sm text-slate-500 mt-1">Pay the consultation fee securely online</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-medical-blue font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold">Get Digital Prescription</p>
                    <p className="text-sm text-slate-500 mt-1">Receive valid prescription & order medicines immediately</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
                  <ShieldCheck size={18} />
                  100% Private & Secure
                </div>
              </div>
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

    </div>
  );
}
