"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Package, FileText, CheckCircle, Clock, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import Breadcrumbs from '../../components/Breadcrumbs';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', address: '' });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/cart?tab=login');
    } else {
      setProfileForm({ name: user.name || '', phone: user.phone || '', address: user.address || '' });
    }
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await getUserOrders();
        if (res.orders) setOrders(res.orders);
      } catch (err) {
        console.error('Error fetching user orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (user && activeTab === 'orders') fetchOrders();
  }, [user, activeTab]);

  if (!user) return null;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await supabase
        .from('profiles')
        .update({ name: profileForm.name, phone: profileForm.phone })
        .eq('id', user.id);
    } catch (err) {
      console.error('Profile update error:', err);
    }
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const mockPrescriptions = [
    { id: 101, patient_name: user.name, doctor_name: 'Dr. S.K. Sharma', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Monthly Amoxicillin Refill', status: 'approved', date: '2026-05-12' },
    { id: 102, patient_name: user.name, doctor_name: 'Dr. R. Mehta', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Metformin 500mg verification', status: 'pending', date: '2026-05-15' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      <Breadcrumbs items={[
        { label: 'Dashboard' }
      ]} />
      {/* Dashboard Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-medical-blue text-white font-bold text-2xl flex items-center justify-center shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{user.email} • <span className="capitalize font-semibold text-medical-blue">{user.role} Account</span></p>
          </div>
        </div>
        <button onClick={logout} className="bg-red-50 text-red-600 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-red-100 transition border border-red-200">
          Logout Account
        </button>
      </div>

      {/* Tabs & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-2 sticky top-28">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-3 ${activeTab === 'profile' ? 'bg-medical-blue text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <User size={18} /> My Profile
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-3 ${activeTab === 'orders' ? 'bg-medical-blue text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Package size={18} /> Order History
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-3 ${activeTab === 'prescriptions' ? 'bg-medical-blue text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <FileText size={18} /> Uploaded Prescriptions
          </button>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Personal Profile & Address</h2>

              {updateSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-4 rounded-2xl mb-6 font-bold flex items-center gap-2 animate-pulse">
                  <CheckCircle size={18} /> Profile details updated successfully!
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Email Address (Read-Only)</label>
                  <input
                    type="text"
                    disabled
                    value={user.email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Default Delivery Address</label>
                  <textarea
                    rows={3}
                    required
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-medical-blue focus:bg-white font-medium resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="bg-medical-blue text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-md hover:bg-blue-600 transition">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* 2. Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">My Order History</h2>

              {loadingOrders ? (
                <div className="space-y-4">
                  {[1, 2].map(n => <div key={n} className="h-40 bg-slate-100 animate-pulse rounded-2xl"></div>)}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-slate-900 mb-1">No orders placed yet</h3>
                  <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">You haven't ordered any medicines or healthcare products yet. Explore our shop to get started.</p>
                  <button onClick={() => router.push('/shop')} className="bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition">
                    Browse Medicines
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{order.id}</span>
                          <span className="text-[10px] text-slate-500">Placed on: {new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                            {order.payment_method}
                          </span>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full capitalize flex items-center gap-1 ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status === 'delivered' ? <CheckCircle size={12} /> : <Clock size={12} />} {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-slate-700 font-medium">
                            <span>{item.product_name} <span className="text-slate-400">×{item.quantity}</span></span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Purchased Steps / Tracking Level */}
                      <div className="pt-4 mt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between relative">
                          {/* Progress Line */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0">
                            <div 
                              className="h-full bg-medical-blue rounded-full transition-all duration-500"
                              style={{ 
                                width: order.status === 'delivered' ? '100%' : order.status === 'shipped' ? '50%' : '15%' 
                              }}
                            />
                          </div>
                          
                          {/* Step 1: Placed */}
                          <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-2">
                            <div className="w-5 h-5 rounded-full bg-medical-blue text-white flex items-center justify-center shadow-sm">
                              <CheckCircle size={10} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-800">Order Placed</span>
                          </div>

                          {/* Step 2: Shipped */}
                          <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-medical-blue text-white' : 'bg-slate-200 text-slate-400'}`}>
                              <Truck size={10} />
                            </div>
                            <span className={`text-[9px] font-bold ${order.status === 'shipped' || order.status === 'delivered' ? 'text-slate-800' : 'text-slate-400'}`}>Shipped</span>
                          </div>

                          {/* Step 3: Delivered */}
                          <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                              <CheckCircle size={10} />
                            </div>
                            <span className={`text-[9px] font-bold ${order.status === 'delivered' ? 'text-green-600' : 'text-slate-400'}`}>Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xs">
                          <span className="text-slate-500">Tracking: </span>
                          <span className="font-bold text-slate-800">{order.tracking_number || 'TRK-GUR-9876543'} ({order.courier_partner || 'Local Delivery'})</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-slate-500">Final Total:</span>
                          <span className="font-black text-base text-medical-blue">₹{order.final_amount || order.total_amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900">My Uploaded Prescriptions</h2>
                <button onClick={() => router.push('/shop?category=prescription')} className="bg-medical-blue text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:bg-blue-600 transition flex items-center gap-1.5">
                  <FileText size={14} /> Upload New Rx
                </button>
              </div>

              <div className="space-y-6">
                {mockPrescriptions.map(rx => (
                  <div key={rx.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img src={rx.file_url} alt="Prescription" className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Prescription #{rx.id}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Doctor: {rx.doctor_name} | Patient: {rx.patient_name}</p>
                        <p className="text-xs text-slate-600 italic mt-1 max-w-sm">"{rx.notes}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs text-slate-400 font-medium">{rx.date}</span>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full capitalize flex items-center gap-1 ${
                        rx.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rx.status === 'approved' ? <CheckCircle size={12} /> : <Clock size={12} />} {rx.status === 'approved' ? 'Verified & Approved' : 'Verification Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
