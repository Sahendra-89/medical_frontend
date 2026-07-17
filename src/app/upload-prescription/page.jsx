"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  ChevronRight,
  Info,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Percent,
  Activity,
  CalendarCheck,
  CreditCard,
  FileImage,
  X,
  Check,
} from "lucide-react";

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      // Simulate upload delay
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        setSuccess(true);
      }, 1500);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setFile(null);
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-br from-medical-blue via-blue-800 to-medical-dark text-white pt-16 pb-12 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3">
              Order via Prescription
            </h1>
            <p className="text-white-500 font-semibold mb-8">
              Upload prescription and we will do the rest for you!
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl opacity-70"></span>
              <span className="text-xl font-bold">
                1 Lakh users prefer this method
              </span>
              <span
                className="text-2xl opacity-70"
                style={{ transform: "scaleX(-1)" }}
              ></span>
            </div>

            {/* Features Box */}
            <div className="border border-blue-700/50 rounded-xl p-4 bg-blue-900/40 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={24} className="text-slate-300" />
                <span className="text-sm font-medium leading-tight">
                  Licensed
                  <br />
                  Pharmacists
                </span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={24} className="text-slate-300" />
                <span className="text-sm font-medium leading-tight">
                  Genuine
                  <br />
                  medicines
                </span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <PhoneCall size={24} className="text-slate-300" />
                <span className="text-sm font-medium leading-tight">
                  Secure
                  <br />
                  calls
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Image */}
          <div className="md:w-1/2 flex justify-end relative h-80 mt-10 md:mt-0">
            {/* The Circle Outline */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-blue-300/40 mr-4 sm:mr-10 relative">
              {/* The Nurse Image */}
              <img
                src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_1280.png"
                alt="Pharmacist"
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-[120%] max-w-none object-contain z-20 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-8 relative z-20 w-full flex flex-col md:flex-row gap-6">
        {/* Left Card - Upload Action */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 flex-1 overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 flex-1">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                Enjoy Easy and hassle
                <br />
                free ordering
              </h2>
              <div className="flex items-center gap-1.5 text-medical-blue bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                <div className="text-[10px] font-bold leading-none text-right">
                  In Just
                  <br />
                  <span className="text-sm">5 mins</span>
                </div>
                <Clock size={16} />
              </div>
            </div>

            {/* Upload Box */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />

            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 rounded-2xl p-5 sm:p-6 mb-4 max-w-xs hover:bg-blue-50 transition cursor-pointer bg-white group flex flex-col items-center justify-center text-center"
              >
                <Upload
                  size={32}
                  className="text-medical-blue mb-4 group-hover:-translate-y-1 transition duration-300"
                />
                <span className="font-bold text-blue-900 text-lg leading-tight mb-1">
                  Click to Upload
                  <br />
                  Prescription
                </span>
                <span className="text-[10px] text-slate-500">
                  JPG, PNG, or PDF up to 5MB
                </span>
              </div>
            ) : (
              <div className="border border-blue-200 rounded-2xl p-4 sm:p-5 mb-4 max-w-xs bg-white shadow-sm relative">
                {uploading ? (
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-medical-blue rounded-full animate-spin mb-3"></div>
                    <p className="text-sm font-semibold text-slate-600">
                      Uploading...
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleClear}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <FileImage size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-0.5">
                          <Check size={12} /> Uploaded Successfully
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/checkout"
                      className="w-full bg-medical-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2"
                    >
                      Proceed to Checkout <ChevronRight size={16} />
                    </Link>
                  </>
                )}
              </div>
            )}

            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition">
              <Info size={14} />
              <span className="underline">What is valid prescription?</span>
            </button>
          </div>

          {/* Bottom Discount Banner */}
          <div className="bg-blue-50/80 border-t border-blue-100 p-4 sm:p-5 flex items-center gap-3">
            <Percent size={20} className="text-blue-500" />
          </div>
        </div>

        {/* Right Card - How it works */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 flex-1 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">
            How will the Pharmacist help you?
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-black text-xl relative">
                1
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium pt-1">
                  Pharmacist will check items on prescription and add to cart
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-black text-xl relative">
                2
                <div className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow-sm border border-slate-100"></div>
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium pt-1">
                  You can ask for additional items if needed
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-black text-xl relative">
                3
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium pt-1">
                  They will apply the best coupon & get you the max savings
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-black text-xl relative">
                4
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium pt-1">
                  Choose the earliest delivery date
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-black text-xl relative">
                5
              </div>
              <div>
                <p className="text-sm text-slate-700 font-medium pt-1">
                  Finally, Share payment methods options
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
