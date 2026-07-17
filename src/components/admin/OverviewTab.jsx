import React from 'react';
import { TrendingUp, DollarSign, Package, FileText, Users, UploadCloud, AlertCircle } from 'lucide-react';

export default function OverviewTab({ stats, loading, setActiveTab }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Business Dashboard Overview</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => <div key={n} className="h-32 bg-slate-100 animate-pulse rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold">Total Revenue (Monthly)</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '3,45,600'}</h3>
              <span className="text-[10px] text-black font-bold flex items-center gap-0.5 mt-1"><TrendingUp size={12} /> +18.4% this month</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-medical-blue flex items-center justify-center"><DollarSign size={24} /></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold">Total Orders</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalOrders || 42}</h3>
              <span className="text-[10px] text-slate-400 mt-1 block">Gurgaon & Delhi NCR</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><Package size={24} /></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold">Pending Prescriptions</span>
              <h3 className="text-2xl font-black text-black mt-1">{stats?.pendingPrescriptions || 3}</h3>
              <span className="text-[10px] text-black font-bold mt-1 block">Verification Required</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><FileText size={24} /></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold">Registered Users</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stats?.totalUsers || 24}</h3>
              <span className="text-[10px] text-slate-400 mt-1 block">B2C Retail + B2B Buyers</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"><Users size={24} /></div>
          </div>
        </div>
      )}

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-medical-black items-center gap-2 mb-2"><UploadCloud size={18} /> Bulk Product Management</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">Need to update inventory or add new medicines? Upload your Excel or CSV catalog to instantly synchronize products, prices, and stock.</p>
          </div>
          <button onClick={() => setActiveTab('products')} className="bg-medical-blue text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md hover:bg-blue-600 transition self-start">
            Go to Bulk Upload Panel
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-black-flex items-center gap-2 mb-2"><AlertCircle size={18} /> Low Stock Alerts</h4>
            <p className="text-xs text-black lading-relaxed mb-6">Certain fast-moving medicines and medical devices are running below the minimum threshold of 20 units. Restock to avoid losing sales.</p>
          </div>
          <button onClick={() => setActiveTab('inventory')} className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md hover:bg-amber-700 transition self-start">
            Review Low Stock Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
