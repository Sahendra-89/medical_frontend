"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { uploadPrescription } from "../lib/api";

const PrescriptionModal = ({ isOpen, onClose, onSuccess }) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorNumber, setDoctorNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger enter animation when isOpen becomes true
  useEffect(() => {
    if (isOpen) {
      // Slight delay so the DOM mounts before animation starts
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    // Wait for exit animation before unmounting
    setTimeout(() => {
      onClose();
      // Reset form
      setPatientName("");
      setDoctorName("");
      setDoctorNumber("");
      setNotes("");
      setSelectedFile(null);
      setSuccessMsg("");
    }, 300);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Patient name is required");
      return;
    }
    setUploading(true);
    try {
      const fileUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400";
      const finalNotes = doctorNumber.trim()
        ? `Doctor Number: ${doctorNumber}\n${notes}`
        : notes;
      const res = await uploadPrescription({
        fileUrl,
        patientName,
        doctorName,
        notes: finalNotes,
      });
      setSuccessMsg(
        "Prescription uploaded successfully! Pharmacist approval pending.",
      );
      setTimeout(() => {
        setSuccessMsg("");
        setUploading(false);
        if (onSuccess) onSuccess(res.prescription);
        handleClose();
      }, 2500);
    } catch (err) {
      alert("Upload failed: " + err.message);
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes rxOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rxOverlayOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes rxCardIn {
          from { opacity: 0; transform: scale(0.88) translateY(32px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        @keyframes rxCardOut {
          from { opacity: 1; transform: scale(1)   translateY(0); }
          to   { opacity: 0; transform: scale(0.88) translateY(32px); }
        }
        @keyframes rxSuccessIn {
          0%   { opacity: 0; transform: scale(0.6) rotate(-8deg); }
          60%  { transform: scale(1.15) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes rxPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
        }
        .rx-overlay {
          animation: ${visible ? "rxOverlayIn 0.28s ease forwards" : "rxOverlayOut 0.28s ease forwards"};
        }
        .rx-card {
          animation: ${visible ? "rxCardIn 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards" : "rxCardOut 0.28s ease forwards"};
        }
        .rx-success-icon {
          animation: rxSuccessIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .rx-submit-btn {
          animation: rxPulse 2s infinite;
        }
        .rx-dropzone-active {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          transform: scale(1.01);
        }
        .rx-input:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .rx-close-btn:hover {
          background: rgba(255,255,255,0.15);
          transform: rotate(90deg);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="rx-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(6px)",
        }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        {/* Modal Card */}
        <div
          className="rx-card bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "92vh" }}
        >
          {/* ── Header ── */}
          <div
            className="p-5 flex justify-between items-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(59,130,246,0.2)" }}
              >
                <FileText size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  Upload Prescription
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(148,163,184,1)" }}
                >
                  Required for Schedule H &amp; X medicines
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="rx-close-btn w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="p-6 overflow-y-auto flex-1">
            {successMsg ? (
              /* Success State */
              <div className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="rx-success-icon">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-1"
                    style={{
                      background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                    }}
                  >
                    <CheckCircle size={48} className="text-emerald-600" />
                  </div>
                </div>
                <h4 className="font-bold text-lg text-slate-900 mt-2">
                  Upload Successful!
                </h4>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  {successMsg}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Our licensed pharmacist will review your prescription shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* ── Dropzone ── */}
                <div
                  className={`rx-dropzone border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${dragOver ? "rx-dropzone-active" : "border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <UploadCloud
                    size={38}
                    className={`mx-auto mb-2 transition-colors duration-200 ${dragOver ? "text-blue-500" : "text-slate-400"}`}
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-blue-600">
                        {selectedFile.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {(selectedFile.size / 1024).toFixed(1)} KB · Click to
                        change
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-slate-700">
                        Click to upload or drag &amp; drop
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        JPG, PNG, PDF — Max 10 MB
                      </p>
                    </>
                  )}
                </div>

                {/* ── Fields ── */}
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter patient's full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="rx-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Doctor Name{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Shailendra Kuma"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="rx-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Doctor Number{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g., +91 "
                      value={doctorNumber}
                      onChange={(e) => setDoctorNumber(e.target.value)}
                      className="rx-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Notes / Refill Instructions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add specific instructions for the pharmacist or refill details..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="rx-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* ── Warning ── */}
                <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-800 leading-relaxed">
                  <AlertCircle
                    size={14}
                    className="text-amber-500 flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <span className="font-bold">
                      Pharmacist Verification Notice:{" "}
                    </span>
                    As per the Drugs &amp; Cosmetics Act, all prescription
                    orders are subject to verification by our registered
                    pharmacist before dispatch.
                  </span>
                </div>

                {/* ── Actions ── */}
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="rx-submit-btn px-6 py-2.5 rounded-xl text-white font-bold text-xs transition-all duration-200 shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    }}
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                            opacity="0.25"
                          />
                          <path d="M21 12a9 9 0 0 1-9 9" />
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud size={14} />
                        Submit Prescription
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionModal;
