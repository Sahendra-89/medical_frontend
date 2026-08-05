"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import {
  LayoutDashboard,
  Pill,
  ShoppingCart,
  Users,
  Stethoscope,
  FileText,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Truck,
  ClipboardCheck,
  BarChart3,
  Receipt,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
  AlertTriangle,
  Package,
} from "lucide-react";
import ProductTab from "../../../components/admin/ProductTab";
import MedicinesTab from "../../../components/admin/MedicinesTab";
import OrdersTab from "../../../components/admin/OrdersTab";
import UsersTab from "../../../components/admin/UsersTab";
import DoctorsTab from "../../../components/admin/DoctorsTab";
import PrescriptionsAdminTab from "../../../components/admin/PrescriptionsAdminTab";
import PrescriptionValidationTab from "../../../components/admin/PrescriptionValidationTab";
import DeliveryTab from "../../../components/admin/DeliveryTab";
import InventoryTrackingTab from "../../../components/admin/InventoryTrackingTab";
import GSTBillingTab from "../../../components/admin/GSTBillingTab";


const NAV = [
  { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "products", label: "Products", icon: <Package size={18} /> },
  { id: "medicines", label: "Medicines", icon: <Pill size={18} /> },
  { id: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { id: "users", label: "Users", icon: <Users size={18} /> },
  { id: "doctors", label: "Doctors", icon: <Stethoscope size={18} /> },
  { id: "prescriptions", label: "Prescriptions", icon: <FileText size={18} /> },
  {
    id: "rx-validation",
    label: "Rx Validation",
    icon: <ClipboardCheck size={18} />,
  },
  { id: "delivery", label: "Delivery", icon: <Truck size={18} /> },
  { id: "inventory", label: "Inventory", icon: <BarChart3 size={18} /> },
  { id: "gst-billing", label: "GST Billing", icon: <Receipt size={18} /> },
];

function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { getAdminStats } = await import('../../../lib/api');
        const res = await getAdminStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-10 bg-slate-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1,2,3,4].map(n => <div key={n} className="h-24 bg-slate-200 rounded-2xl"></div>)}
      </div>
    </div>;
  }

  const statCards = [
    {
      label: "Total Medicines",
      value: stats?.totalProducts || 0,
      icon: <Pill size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart size={22} className="text-amber-600" />,
      bg: "bg-amber-50",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <Users size={22} className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: <DollarSign size={22} className="text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          Dashboard Overview
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Paridhi Pharma · Gurgaon, Haryana · License HR-GUR-2026-98765
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <div
              className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {s.label}
              </p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Pending Orders",
            value: 0, // Mock pending orders or extract from stats if available
            color: "text-black-600",
            bg: "bg-black-50 border-black-200",
          },
          {
            label: "Pending Prescriptions",
            value: stats?.pendingPrescriptions || 0,
            color: "text-black-600",
            bg: "bg-black-50 border-black-200",
          },
          {
            label: "Low Stock Items",
            value: stats?.lowStockProducts || 0,
            color: "text-black-600",
            bg: "bg-black-50 border-black-200",
          },
        ].map((a, i) => (
          <div key={i} className={`border ${a.bg} rounded-2xl p-4`}>
            <p className="text-xs font-bold text-slate-500">{a.label}</p>
            <p className={`text-3xl font-black ${a.color} mt-1`}>{a.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminLoginGate({ onSuccess }) {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success && res.user.role === "admin") {
      onSuccess();
    } else if (res.success && res.user.role !== "admin") {
      setError("Access denied. This portal is for administrators only.");
    } else {
      setError(res.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Paridhi Pharma Management System
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            License: HR-GUR-2026-98765
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-blue-600" />
            <h2 className="font-bold text-slate-800 text-sm">
              Secure Administrator Login
            </h2>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-5 font-medium">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@paridhipharma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              🔒 This portal is restricted to authorized pharmacy administrators
              only.
              <br />
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  // Auto-grant access if already logged in as admin
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Checking credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin && !authed) {
    return <AdminLoginGate onSuccess={() => setAuthed(true)} />;
  }

  const TABS = {
    overview: <Overview />,
    products: <ProductTab />,
    medicines: <MedicinesTab />,
    orders: <OrdersTab />,
    users: <UsersTab />,
    doctors: <DoctorsTab />,
    prescriptions: <PrescriptionsAdminTab />,
    "rx-validation": <PrescriptionValidationTab />,
    delivery: <DeliveryTab />,
    inventory: <InventoryTrackingTab />,
    "gst-billing": <GSTBillingTab />,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-60 bg-white border-r border-slate-200 z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-5 border-b border-slate-100">
          <h1 className="font-black text-lg text-slate-900">
            Paridhi<span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Pharmacy Management System
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setActive(n.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition text-left ${active === n.id ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-400">Pharmacist · Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1.5 text-slate-500 hover:text-slate-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="font-bold text-sm text-slate-700 capitalize">
              {NAV.find((n) => n.id === active)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500 bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 rounded-full font-bold">
              ● Live
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {TABS[active]}
        </main>
      </div>
    </div>
  );
}
