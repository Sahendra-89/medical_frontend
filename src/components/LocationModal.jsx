"use client";

import React, { useState } from 'react';
import { MapPin, X, Navigation } from 'lucide-react';

export default function LocationModal({ isOpen, onClose, onSave }) {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }
    // Simulate lookup
    onSave(`Pincode ${pincode}`);
    onClose();
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        onSave('Current Location');
        onClose();
      }, () => {
        setError('Location access denied');
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800">Choose your Location</h2>
            <p className="text-xs text-slate-500 mt-1">Providing your pincode helps us show you accurate delivery times and product availability.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition shrink-0 self-start">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="relative">
              <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                placeholder="Enter 6 digit PIN Code" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:border-medical-blue focus:bg-white transition"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{error}</p>}
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-medical-blue text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
          >
            Check Delivery
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-xs font-bold text-slate-400">OR</span></div>
          </div>

          <button 
            onClick={useCurrentLocation}
            className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 font-bold py-4 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-100 transition"
          >
            <Navigation size={18} /> Use Current Location
          </button>
        </div>
      </div>
    </div>
  );
}
