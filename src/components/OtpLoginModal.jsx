"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Pill, ShieldCheck, Mail, KeyRound, AlertCircle } from "lucide-react";

export default function OtpLoginModal({ isOpen, onClose }) {
  const { otpLoginSend, otpLoginVerify, otpLoginResend, user } = useAuth();
  const [step, setStep] = useState("request"); // "request" | "verify"
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  // Close automatically if logged in
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  // Handle countdown timer
  useEffect(() => {
    let intval;
    if (timer > 0) intval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(intval);
  }, [timer]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("request");
        setIdentifier("");
        setOtp("");
        setError("");
      }, 300); // Wait for transition
    }
  }, [isOpen]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await otpLoginSend(identifier);
    setLoading(false);
    if (res.success) {
      setStep("verify");
      setTimer(60);
    } else {
      setError(res.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await otpLoginVerify(identifier, otp);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Invalid OTP.");
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setError("");
    setLoading(true);
    const res = await otpLoginResend(identifier);
    setLoading(false);
    if (res.success) setTimer(60);
    else setError(res.message || "Failed to resend OTP.");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99998] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[99999] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Area */}
        <div className="bg-gradient-to-r from-medical-blue to-blue-600 px-8 pt-8 pb-12 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-white mt-4 relative z-10">
            Login/Sign up to <br /> continue
          </h2>

          {/* Decorative illustration mimicking the uploaded image */}
          <div className="absolute right-4 bottom-0 flex items-end opacity-90 z-0">
            <div className="w-12 h-16 bg-blue-400 rounded-t-md relative border-b-8 border-white mr-1 shadow-sm flex items-center justify-center">
               <div className="w-6 h-6 bg-white rounded flex-shrink-0" />
            </div>
            <div className="w-14 h-10 bg-blue-200 rounded-t-md relative flex gap-1 p-2 shadow-sm">
               <div className="w-4 h-4 rounded-full bg-medical-blue" />
               <div className="w-4 h-4 rounded-full bg-medical-blue" />
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 bg-white relative -mt-4 rounded-t-2xl px-8 pt-8 pb-6 flex flex-col">
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-6 font-medium">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {step === "request" && (
            <form onSubmit={handleSendOtp} className="flex flex-col flex-1">
              <div className="flex-1">
                <label className="block text-slate-700 font-medium mb-3">
                  Enter your mobile number or email
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 Your Mobile Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-700 focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-medical-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-md transition disabled:opacity-70 flex items-center justify-center"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
                <p className="text-[11px] text-slate-500 mt-6 leading-relaxed">
                  By continuing, you agree with our{" "}
                  <a href="#" className="font-bold text-slate-700 underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-bold text-slate-700 underline">
                    Terms and Conditions
                  </a>
                </p>
              </div>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col flex-1">
              <div className="flex-1">
                <label className="block text-slate-700 font-medium mb-3">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-700 font-black tracking-widest text-lg focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue transition"
                />
                
                <div className="flex justify-between items-center mt-3">
                  <button
                    type="button"
                    onClick={() => setStep("request")}
                    className="text-xs text-slate-500 hover:text-medical-blue font-semibold"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || loading}
                    className="text-xs text-medical-blue font-bold disabled:opacity-50"
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-medical-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-md transition disabled:opacity-70 flex items-center justify-center"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <p className="text-[11px] text-slate-500 mt-6 leading-relaxed">
                  By continuing, you agree with our{" "}
                  <a href="#" className="font-bold text-slate-700 underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-bold text-slate-700 underline">
                    Terms and Conditions
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
