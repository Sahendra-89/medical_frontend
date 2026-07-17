"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileText, CheckCircle } from "lucide-react";
import { uploadPrescription } from "../lib/api";

const PrescriptionModal = ({ isOpen, onClose, onSuccess }) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");
  const [fileUrl, setFileUrl] = useState(
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
  ); // Mock default image
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Patient name is required");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadPrescription({
        fileUrl,
        patientName,
        doctorName,
        notes,
      });
      setSuccessMsg(
        "Prescription uploaded successfully! Pharmacist approval pending.",
      );
      setTimeout(() => {
        setSuccessMsg("");
        setUploading(false);
        onSuccess(res.prescription);
        onClose();
      }, 2000);
    } catch (err) {
      alert("Upload failed: " + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-premium overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-medical-dark text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Upload Prescription</h3>
            <p className="text-xs text-slate-300 mt-1">
              Required for Schedule H & X prescription medicines
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {successMsg ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CheckCircle
                size={60}
                className="text-green-600 mb-4 animate-bounce"
              />
              <h4 className="font-bold text-lg text-slate-900">{successMsg}</h4>
              <p className="text-xs text-slate-500 mt-2 max-w-xs">
                Our licensed pharmacist will review and approve your
                prescription shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Dropzone */}
              <div className="border-2 border-dashed border-slate-200 hover:border-medical-blue bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition group">
                <UploadCloud
                  size={40}
                  className="mx-auto text-slate-400 group-hover:text-medical-blue transition mb-2"
                />
                <p className="text-xs font-semibold text-slate-700">
                  Click to upload or drag & drop prescription
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports JPG, PNG, PDF (Max 10MB)
                </p>
                <div className="mt-3 inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
                  <FileText size={14} className="text-medical-blue" />{" "}
                  sample_rx_2026.jpg
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter patient's full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Doctor Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dr. Harsh"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pharmacist Notes / Refill Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add any specific instructions for the pharmacist or monthly refill details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white transition resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-800 leading-relaxed">
                <span className="font-bold block mb-0.5">
                  ⚠️ Pharmacist Verification Notice:
                </span>
                As per the Drugs & Cosmetics Act, all prescription orders are
                subject to verification by our registered pharmacist before
                dispatch.
              </div>

              {/* Submit */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-medical-blue text-white font-bold text-xs hover:bg-blue-600 transition shadow-md flex items-center gap-2"
                >
                  {uploading ? "Uploading..." : "Submit Prescription"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
