"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  KeyRound,
  Home,
} from "lucide-react";
import { Suspense } from "react";

const inp =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition";

// ─── Login Form ──────────────────────────────────────────
function LoginForm({ onSwitch, onSuccess }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);
    if (res.success) onSuccess(res.user);
    else setError(res.message || "Invalid email or password.");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Lock size={26} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Welcome Back</h2>
        <p className="text-xs text-slate-500 mt-1">
          Login to your Paridhi Pharma account
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-5 font-medium">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={handle} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3.5 top-3.5 text-slate-400"
            />
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`${inp} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3.5 top-3.5 text-slate-400"
            />
            <input
              type={showPw ? "text" : "password"}
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`${inp} pl-10 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="text-right mt-1.5">
            <button
              type="button"
              onClick={() => onSwitch("forgot")}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              Login to Account
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
        Don't have an account?{" "}
        <button
          onClick={() => onSwitch("signup")}
          className="font-bold text-blue-600 hover:underline"
        >
          Sign up free
        </button>
      </div>
    </div>
  );
}

// ─── Signup Form ─────────────────────────────────────────
function SignupForm({ onSwitch, onSuccess }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    const res = await signup({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      address: form.address,
    });
    setLoading(false);
    if (res.success) onSuccess(res.user);
    else setError(res.message || "Signup failed. Please try again.");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <User size={26} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Join Paridhi Pharma for fast, trusted medicine delivery
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-5 font-medium">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={handle} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type="text"
                required
                placeholder="Rajesh Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`${inp} pl-10`}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <Phone
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type="tel"
                required
                placeholder="10-digit mobile"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`${inp} pl-10`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3.5 top-3.5 text-slate-400"
            />
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`${inp} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Delivery Address
          </label>
          <input
            type="text"
            placeholder="House No, Sector, Gurgaon, Haryana"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inp}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inp} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-3.5 text-slate-400"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className={`${inp} pl-10`}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
          ✅ By signing up, you agree to Paridhi Pharma's Terms of Service and
          Privacy Policy.
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              Create My Account
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
        Already have an account?{" "}
        <button
          onClick={() => onSwitch("login")}
          className="font-bold text-blue-600 hover:underline"
        >
          Login here
        </button>
      </div>
    </div>
  );
}

// ─── Forgot Password Form ─────────────────────────────────
function ForgotPasswordForm({ onSwitch }) {
  const [step, setStep] = useState("email"); // email | otp | reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const MOCK_OTP = "123456";

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("otp");
    setSuccess(`A 6-digit OTP has been sent to ${email}. (Demo OTP: 123456)`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError("");
    if (otp !== MOCK_OTP) {
      setError("Incorrect OTP. Please try again. (Demo: 123456)");
      return;
    }
    setStep("reset");
    setSuccess("");
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (newPw !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    if (newPw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("done");
  };

  return (
    <div>
      <button
        onClick={() => onSwitch("login")}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-semibold mb-6 transition"
      >
        <ArrowLeft size={14} /> Back to Login
      </button>

      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <KeyRound size={26} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {step === "email" && "Forgot Password"}
          {step === "otp" && "Verify OTP"}
          {step === "reset" && "Set New Password"}
          {step === "done" && "Password Reset!"}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {step === "email" && "We'll send a reset code to your email"}
          {step === "otp" && "Enter the 6-digit code sent to your email"}
          {step === "reset" && "Choose a strong new password"}
          {step === "done" && "Your password has been successfully updated"}
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-4 font-medium">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 text-xs px-4 py-3 rounded-xl mb-4 font-medium">
          <CheckCircle size={14} className="shrink-0 mt-0.5" />
          {success}
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Registered Email
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inp} pl-10`}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <Mail size={16} />
                Send Reset OTP
              </>
            )}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              6-Digit OTP
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`${inp} text-center text-2xl tracking-[0.5em] font-black`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm"
          >
            <ShieldCheck size={16} /> Verify OTP
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-xs text-slate-500 hover:text-blue-600 font-semibold mt-1"
          >
            Resend OTP
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="Min. 6 characters"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className={`${inp} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-3.5 text-slate-400"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="Re-enter password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className={`${inp} pl-10`}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                Update Password
              </>
            )}
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="text-center space-y-5 py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <p className="text-sm text-slate-600">
            Your password has been reset. You can now login with your new
            password.
          </p>
          <button
            onClick={() => onSwitch("login")}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user]);

  const handleSuccess = (u) => {
    router.replace(u?.role === "admin" ? "/admin/dashboard" : redirect);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-xs font-semibold transition"
        >
          <ArrowLeft size={14} /> Back to Store
        </Link>
        <Link href="/" className="font-black text-lg text-slate-900">
          Paridhi<span className="text-blue-600">Pharma</span>
        </Link>
        <Link
          href="/"
          className="text-slate-400 hover:text-slate-600 transition"
        >
          <Home size={18} />
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          {mode === "login" && (
            <LoginForm onSwitch={setMode} onSuccess={handleSuccess} />
          )}
          {mode === "signup" && (
            <SignupForm onSwitch={setMode} onSuccess={handleSuccess} />
          )}
          {mode === "forgot" && <ForgotPasswordForm onSwitch={setMode} />}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
