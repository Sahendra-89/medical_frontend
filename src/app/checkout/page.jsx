"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Truck, CreditCard, FileText, CheckCircle, ArrowRight, Lock, AlertCircle, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../lib/api';

// Load Razorpay script dynamically
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getSubtotal, getFinalTotal, hasPrescriptionItems, getDiscountAmount } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    if (!user) router.push('/cart?tab=login');
  }, [user]);

  if (!user) return null;

  // ── Success Screen ──────────────────────────────────────
  if (successOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Order Placed Successfully! 🎉</h1>
        <p className="text-xs text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-bold text-slate-800">{user.name}</span>! Your order ID is{' '}
          <span className="font-bold text-medical-blue">{successOrder.id}</span>. Confirmation has been sent to your registered mobile & email.
        </p>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-premium text-left mb-8 space-y-4 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-500">Order Reference</span>
            <span className="font-bold text-slate-900">{successOrder.id}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-500">Payment Mode</span>
            <span className="font-bold text-slate-900 uppercase">{successOrder.payment_method || paymentMethod}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-500">Delivery Address</span>
            <span className="font-medium text-slate-800 text-right max-w-xs">{shippingAddress}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-500">Estimated Delivery</span>
            <span className="font-bold text-green-600">Today — Same-Day Gurgaon NCR</span>
          </div>
          <div className="flex justify-between pt-2 text-sm font-bold text-slate-900">
            <span>{(successOrder.payment_method || paymentMethod) === 'COD' ? 'Amount to be Paid' : 'Amount Paid'}</span>
            <span className="text-medical-blue">₹{Number(successOrder.final_amount || successOrder.total_amount || getFinalTotal()).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/dashboard?tab=orders')}
          className="bg-medical-blue text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-md hover:bg-blue-600 transition"
        >
          Track Order in Dashboard
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-24 text-center">
        <h3 className="font-bold text-xl text-slate-900 mb-2">Your cart is empty</h3>
        <p className="text-xs text-slate-500 mb-6">Please add some medicines or healthcare products to proceed to checkout.</p>
        <button onClick={() => router.push('/shop')} className="bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition">
          Return to Shop
        </button>
      </div>
    );
  }

  // ── Razorpay Payment Handler ────────────────────────────
  const handleRazorpayPayment = async (placedOrder) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentError('Razorpay failed to load. Please try again or use COD.');
      setLoading(false);
      return;
    }

    try {
      const payRes = await api.post('/orders/create-payment', {
        amount: getFinalTotal(),
        currency: 'INR',
        receipt: placedOrder.id
      });

      const { order: rzpOrder, key, mock } = payRes.data;

      // If mock keys, show error instead of auto-succeeding
      if (mock) {
        setPaymentError('Online payments are currently disabled. Please select Cash on Delivery (COD).');
        setLoading(false);
        return;
      }

      const options = {
        key,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: 'Paridhi Pharma',
        description: `Order ${placedOrder.id}`,
        image: '/logo.png',
        order_id: rzpOrder.id,
        handler: async (response) => {
          try {
            await api.post('/orders/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: placedOrder.id
            });
            clearCart();
            setSuccessOrder({ ...placedOrder, payment_method: paymentMethod });
          } catch {
            setPaymentError('Payment verification failed. Contact support with your payment ID.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ''
        },
        notes: { shipping_address: shippingAddress },
        theme: { color: '#2563eb' },
        modal: {
          ondismiss: () => {
            setPaymentError('Payment cancelled. Your order is pending — please retry payment.');
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaymentError('Could not initiate payment: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  // ── Main Order Submit ───────────────────────────────────
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPaymentError('');
    if (!shippingAddress.trim()) {
      alert('Please enter a valid shipping address');
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        userId: user.id || user.email,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || 'N/A',
        items: cart,
        totalAmount: getSubtotal(),
        discountAmount: getDiscountAmount(),
        finalAmount: getFinalTotal(),
        paymentMethod,
        shippingAddress,
        prescriptionId: hasPrescriptionItems() ? 1 : null
      };

      const res = await createOrder(orderData);
      const placedOrder = res.order || { id: 'ORD-' + Date.now().toString().slice(-8), final_amount: getFinalTotal() };

      if (paymentMethod === 'COD') {
        clearCart();
        setSuccessOrder({ ...placedOrder, payment_method: 'COD' });
        setLoading(false);
      } else {
        // UPI / CARD → open Razorpay
        await handleRazorpayPayment(placedOrder);
      }
    } catch (err) {
      setPaymentError('Failed to place order: ' + err.message);
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Lock size={24} className="text-medical-blue" /> Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">End-to-end encrypted & verified pharmacy processing</p>
        </div>
      </div>

      {paymentError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl mb-6 font-medium flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" /> {paymentError}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── Left column ── */}
        <div className="lg:col-span-7 space-y-8">

          {/* 1. Shipping Address */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Truck size={18} className="text-medical-blue" /> 1. Delivery Address
            </h3>
            <textarea
              rows={3}
              required
              placeholder="Flat/House No, Building, Street, Sector, Landmark, Gurgaon, Haryana 122001"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs focus:outline-none focus:border-medical-blue focus:bg-white transition resize-none leading-relaxed font-medium"
            />
            <p className="text-[10px] text-slate-400">💡 Same-day delivery active in all Gurgaon, Delhi NCR & Faridabad sectors.</p>
          </div>

          {/* 2. Prescription (if required) */}
          {hasPrescriptionItems() && (
            <div className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-200 shadow-card space-y-4">
              <h3 className="font-bold text-base text-amber-900 flex items-center gap-2 border-b border-amber-200/60 pb-3">
                <FileText size={18} className="text-amber-600" /> 2. Doctor Prescription Verification
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Your cart contains Schedule H/X prescription drugs. Your verified prescription has been linked automatically.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-amber-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Verified Prescription Attached</h4>
                    <p className="text-[10px] text-slate-500">Patient: {user.name} | Ref: #RX-2026-001</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-full">Approved</span>
              </div>
            </div>
          )}

          {/* 3. Payment Method */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard size={18} className="text-medical-blue" /> {hasPrescriptionItems() ? '3.' : '2.'} Payment Method
            </h3>

            <div className="space-y-3">
              {/* UPI / Online (Razorpay) */}
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-medical-blue bg-blue-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="w-4 h-4 text-medical-blue focus:ring-medical-blue" />
                  <div>
                    <span className="font-bold text-xs text-slate-900 block flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-500" /> UPI / Google Pay / PhonePe (Razorpay)
                    </span>
                    <span className="text-[10px] text-slate-500">Instant payment via Razorpay secure gateway</span>
                  </div>
                </div>
              </label>

              {/* Card (Razorpay) */}
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'CARD' ? 'border-medical-blue bg-blue-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="w-4 h-4 text-medical-blue focus:ring-medical-blue" />
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">Credit / Debit Card (Razorpay)</span>
                    <span className="text-[10px] text-slate-500">Visa, MasterCard, RuPay, Maestro — 3D Secure</span>
                  </div>
                </div>
              </label>

              {/* COD */}
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'COD' ? 'border-medical-blue bg-blue-50/50' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-4 h-4 text-medical-blue focus:ring-medical-blue" />
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[10px] text-slate-500">Pay cash or UPI at your doorstep upon delivery</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* ── Right column — Order Summary ── */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6 sticky top-28">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-4">Order Summary</h3>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                  <span className="text-[10px] text-slate-400">Qty: {item.qty} × ₹{item.price}</span>
                </div>
                <span className="font-bold text-slate-900">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal (After Discount)</span>
              <span className="font-semibold text-slate-800">₹{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Local Delivery (Gurgaon NCR)</span>
              <span className="text-black-600 font-bold">FREE</span>
            </div>
            <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-sm text-slate-900">Final Payable</span>
              <span className="font-black text-2xl text-medical-blue">₹{getFinalTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Razorpay Note for online payments */}
          {(paymentMethod === 'UPI' || paymentMethod === 'CARD') && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-[10px] text-blue-800 font-medium flex items-start gap-2">
              <Zap size={14} className="text-blue-600 shrink-0 mt-0.5" />
              Clicking "Pay Now" will open the secure Razorpay checkout window for completing your payment.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-medical-blue hover:bg-blue-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider mt-4"
          >
            {loading
              ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing...</span>
              : paymentMethod === 'COD'
                ? `Confirm COD Order — ₹${getFinalTotal().toFixed(2)}`
                : `Pay Now — ₹${getFinalTotal().toFixed(2)}`
            }
            {!loading && <ArrowRight size={16} />}
          </button>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By placing this order you agree to Paridhi Pharma's Terms & Conditions, Privacy Policy, and Drug License compliance regulations.
          </p>
        </div>
      </form>
    </div>
  );
}
