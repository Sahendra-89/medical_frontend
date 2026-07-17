"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Trash2,
  ShoppingCart,
  Heart,
  ArrowRight,
  Tag,
  ShieldCheck,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Lock,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../../components/ProductCard";

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "cart";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [couponCode, setCouponCode] = useState("");
  const [authMode, setAuthMode] = useState("login"); // login or signup
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const {
    cart,
    wishlist,
    removeFromCart,
    updateQty,
    clearCart,
    getSubtotal,
    getMrpTotal,
    getDiscountAmount,
    getFinalTotal,
    hasPrescriptionItems,
    applyCoupon,
    coupon,
  } = useCart();
  const { user, login, signup } = useAuth();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (authMode === "login") {
        const res = await login(authForm.email, authForm.password);
        if (res.success) {
          setActiveTab("cart");
        } else {
          setAuthError(res.message || "Invalid login credentials");
        }
      } else {
        const res = await signup(authForm);
        if (res.success) {
          setActiveTab("cart");
        } else {
          setAuthError(res.message || "Signup failed");
        }
      }
    } catch (err) {
      setAuthError("Authentication error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      {/* Tabs Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 mb-8 pb-4">
        <button
          onClick={() => setActiveTab("cart")}
          className={`flex items-center gap-2 font-bold text-sm sm:text-base pb-4 -mb-[17px] border-b-2 transition ${activeTab === "cart" ? "border-medical-blue text-medical-blue" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <ShoppingCart size={18} /> My Cart (
          {cart.reduce((sum, item) => sum + item.qty, 0)})
        </button>

        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex items-center gap-2 font-bold text-sm sm:text-base pb-4 -mb-[17px] border-b-2 transition ${activeTab === "wishlist" ? "border-medical-blue text-medical-blue" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Heart size={18} /> My Wishlist ({wishlist.length})
        </button>

        {!user && (
          <button
            onClick={() => setActiveTab("login")}
            className={`flex items-center gap-2 font-bold text-sm sm:text-base pb-4 -mb-[17px] border-b-2 transition ${activeTab === "login" ? "border-medical-blue text-medical-blue" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            <User size={18} /> Login / Signup
          </button>
        )}
      </div>

      {/* Cart Tab */}
      {activeTab === "cart" &&
        (cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center justify-center my-8">
            <div className="w-24 h-24 rounded-full bg-blue-50 text-medical-blue flex items-center justify-center mb-6 shadow-inner">
              <ShoppingCart size={40} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-xs text-slate-500 mb-8 max-w-sm">
              Looks like you haven't added any medicines or healthcare products
              to your cart yet.
            </p>
            <Link
              href="/shop"
              className="bg-medical-blue text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-md hover:bg-blue-600 transition"
            >
              Explore Medicines & Add Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between bg-slate-100 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  Review Cart Items
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <Trash2 size={14} /> Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-premium transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
                      }
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-xl bg-slate-50 border border-slate-100 p-2 shrink-0"
                    />
                    <div>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">
                        {item.brand}
                      </span>
                      <Link href={`/shop/${item.id}`}>
                        <h4 className="font-bold text-sm text-slate-900 hover:text-medical-blue transition mt-1">
                          {item.name}
                        </h4>
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-black text-sm text-slate-900">
                          ₹{item.price}
                        </span>
                        {item.discount_percent > 0 && (
                          <span className="text-xs text-slate-400 line-through font-medium">
                            ₹{item.mrp}
                          </span>
                        )}
                      </div>
                      {item.prescription_required && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded mt-2">
                          <FileText size={10} /> Prescription Required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-inner">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm hover:bg-slate-50 transition"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-xs">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm hover:bg-slate-50 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-base text-slate-900 block">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-red-500 hover:underline font-semibold mt-1 flex items-center gap-0.5 ml-auto"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6 sticky top-28">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-4">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Apply Promo Code / Coupon
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. PARIDHI10, FLAT100"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-medical-blue focus:bg-white uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-sm"
                  >
                    Apply
                  </button>
                </form>
                {coupon && (
                  <div className="mt-3 flex items-center justify-between bg-green-50 border border-green-200 p-2.5 rounded-xl text-xs text-green-800 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} /> Coupon {coupon.code} applied
                    </span>
                    <button
                      onClick={() => applyCoupon("")}
                      className="text-red-600 hover:underline text-[10px] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <div className="mt-2 text-[10px] text-slate-400 flex flex-wrap gap-2">
                  <span>Available:</span>
                  <button
                    onClick={() => applyCoupon("PARIDHI10")}
                    className="underline hover:text-medical-blue font-semibold"
                  >
                    PARIDHI10 (10%)
                  </button>{" "}
                  •
                  <button
                    onClick={() => applyCoupon("FLAT100")}
                    className="underline hover:text-medical-blue font-semibold"
                  >
                    FLAT100 (₹100 off)
                  </button>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total MRP</span>
                  <span className="font-semibold line-through text-slate-400">
                    ₹{getMrpTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Price after Discount</span>
                  <span className="font-semibold text-slate-800">
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount ({coupon.code})</span>
                    <span>
                      - ₹{(getSubtotal() - getFinalTotal()).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Local Delivery</span>
                  <span className="text-green-600 font-bold">
                    FREE (Gurgaon NCR)
                  </span>
                </div>

                <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">
                    Total Payable
                  </span>
                  <span className="font-black text-2xl text-medical-blue">
                    ₹{getFinalTotal().toFixed(2)}
                  </span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-xs text-green-700 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck size={16} /> Total Savings: ₹
                  {getDiscountAmount().toFixed(2)}
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => {
                  if (!user) {
                    setActiveTab("login");
                  } else {
                    router.push("/checkout");
                  }
                }}
                className="w-full bg-medical-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider mt-4"
              >
                {user ? "Proceed to Secure Checkout" : "Login to Checkout"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" &&
        (wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center justify-center my-8">
            <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6 shadow-inner">
              <Heart size={40} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-slate-500 mb-8 max-w-sm">
              Save your favorite medicines and healthcare products to your
              wishlist for easy reordering later.
            </p>
            <Link
              href="/shop"
              className="bg-medical-blue text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-md hover:bg-blue-600 transition"
            >
              Browse & Add Favorites
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}

      {/* Login / Signup Tab */}
      {activeTab === "login" && !user && (
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-premium p-8 my-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-medical-blue flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {authMode === "login" ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {authMode === "login"
                ? "Login to access your orders, prescriptions, and fast checkout"
                : "Join Paridhi Pharma for exclusive discounts and automated refills"}
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-6 font-medium flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /> {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === "signup" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={authForm.name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
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
                    value={authForm.phone}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Sector/Locality, Gurgaon"
                    value={authForm.address}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, address: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm({ ...authForm, password: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-medical-blue focus:bg-white"
              />
              {authMode === "login" && (
                <div className="text-right mt-1.5">
                  <a
                    href="#forgot"
                    onClick={() =>
                      alert("Mock password reset link sent to email")
                    }
                    className="text-[10px] text-medical-blue hover:underline font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-medical-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2 mt-6 uppercase tracking-wider"
            >
              {authLoading
                ? "Processing..."
                : authMode === "login"
                  ? "Login to Account"
                  : "Create Account"}
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            {authMode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setAuthMode("signup")}
                  className="font-bold text-medical-blue hover:underline"
                >
                  Sign up now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setAuthMode("login")}
                  className="font-bold text-medical-blue hover:underline"
                >
                  Login here
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading cart details...</div>}
    >
      <CartPageContent />
    </Suspense>
  );
}
