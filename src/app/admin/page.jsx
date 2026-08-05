"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package, DollarSign, FileText, AlertCircle, TrendingUp, ShieldCheck, FileCode, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getAdminStats, getBlogPosts, createBlogPost, deleteBlogPost,
  getCoupons, createCoupon, deleteCoupon,
  getOrders, updateOrderStatus
} from '../../lib/api';

// Import modular tab components
import OverviewTab from '../../components/admin/OverviewTab';
import ProductTab from '../../components/admin/ProductTab';
import OrderTab from '../../components/admin/OrderTab';
import PrescriptionTab from '../../components/admin/PrescriptionTab';
import InventoryTab from '../../components/admin/InventoryTab';
import ContentTab from '../../components/admin/ContentTab';
import MedicinesTab from '../../components/admin/MedicinesTab';
import InquiriesTab from '../../components/admin/InquiriesTab';
import AmbulanceTab from '../../components/admin/AmbulanceTab';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, prescriptions, inventory, content
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Content Management states
  const [contentSubTab, setContentSubTab] = useState('blogs'); // blogs, coupons
  const [blogs, setBlogs] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSuccess, setContentSuccess] = useState('');

  // New Blog form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Medicine Education',
    author: 'Ritesh(B.Pharm)',
    excerpt: '',
    content: '',
    image: '',
    readTime: ''
  });

  // New Coupon form state
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percent',
    discount_value: '',
    min_order_value: '',
    max_discount: ''
  });

  // Bulk Upload state
  const [bulkFile, setBulkFile] = useState(null);
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [bulkSuccess, setBulkSuccess] = useState('');

  // Prescription Approval state
  const [prescriptions, setPrescriptions] = useState([
    { id: 101, patient_name: 'Rajesh Kumar', doctor_name: 'Dr. S.K. Sharma', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Monthly Amoxicillin Refill', status: 'pending', date: '2026-05-16' },
    { id: 102, patient_name: 'Priya Sharma', doctor_name: 'Dr. R. Mehta', file_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', notes: 'Metformin verification', status: 'approved', date: '2026-05-15' }
  ]);

  // Inventory state
  const [inventory, setInventory] = useState([
    { id: 9, name: 'Omron HEM-7120 Automatic BP Monitor', brand: 'Omron', category: 'devices', stock: 5, price: 1499.25, sku: 'PP-DEV-001' },
    { id: 5, name: 'Amoxicillin 500mg (Strip of 10)', brand: 'Cipla', category: 'prescription', stock: 12, price: 68.00, sku: 'PP-RX-001' },
    { id: 1, name: 'Crocin Advance 500mg', brand: 'GSK', category: 'otc', stock: 250, price: 35.70, sku: 'PP-OTC-001' },
    { id: 2, name: 'Vicks VapoRub 50ml', brand: 'P&G', category: 'otc', stock: 300, price: 130.50, sku: 'PP-OTC-002' },
    { id: 12, name: 'Himalaya Liv.52 Tablets', brand: 'Himalaya', category: 'wellness', stock: 400, price: 148.75, sku: 'PP-WEL-001' }
  ]);

  // Orders state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    } else {
      const fetchStats = async () => {
        try {
          const res = await getAdminStats();
          if (res.stats) setStats(res.stats);
        } catch (err) {
          console.error('Error fetching admin stats:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();

      // Load blogs and coupons for Content Management
      const loadContentData = async () => {
        try {
          const blogsRes = await getBlogPosts();
          if (blogsRes.blogs) setBlogs(blogsRes.blogs);
          const couponsRes = await getCoupons();
          if (couponsRes.coupons) setCoupons(couponsRes.coupons);
        } catch (err) {
          console.error('Error loading content dashboard data:', err);
        }
      };
      loadContentData();

      // Fetch actual orders
      const fetchOrdersData = async () => {
        try {
          const res = await getOrders();
          if (res.orders) {
            const formatted = res.orders.map(o => ({
              id: o.id,
              customer: o.user_id ? `User #${o.user_id}` : 'Guest',
              items: o.items ? o.items.map(i => `${i.product_name} (x${i.quantity})`).join(', ') : '',
              total: Number(o.final_amount || o.total_amount || 0),
              status: o.status,
              payment: o.payment_method,
              date: new Date(o.created_at).toLocaleDateString()
            }));
            setOrders(formatted);
          }
        } catch (err) {
          console.error('Error loading orders:', err);
        }
      };
      fetchOrdersData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') return null;

  const handleBulkUpload = (e) => {
    e.preventDefault();
    if (!bulkFile) {
      alert('Please select an Excel or CSV file to upload.');
      return;
    }
    setUploadingBulk(true);
    setTimeout(() => {
      setUploadingBulk(false);
      setBulkSuccess('Successfully bulk uploaded and synchronized 24 products from Excel/CSV.');
      // Add mock products to inventory
      setInventory([...inventory, { id: Date.now(), name: 'Strepsils Lozenges (Bulk Add)', brand: 'Reckitt', category: 'otc', stock: 500, price: 51.52, sku: 'PP-OTC-BULK' }]);
      setTimeout(() => setBulkSuccess(''), 4000);
    }, 2000);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.excerpt) {
      alert('Please fill out all required blog fields.');
      return;
    }
    setContentLoading(true);
    try {
      const res = await createBlogPost(newBlog);
      if (res.success) {
        setContentSuccess('Blog article published successfully!');
        setBlogs([res.blog, ...blogs]);
        // Reset form
        setNewBlog({
          title: '',
          category: 'Medicine Education',
          author: 'Dr. S. K. Sharma (B.Pharm)',
          excerpt: '',
          content: '',
          image: '',
          readTime: ''
        });
        setTimeout(() => setContentSuccess(''), 4000);
      }
    } catch (err) {
      alert('Failed to publish blog post.');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await deleteBlogPost(id);
      if (res.success) {
        setBlogs(blogs.filter(b => b.id !== id));
        setContentSuccess('Blog article removed.');
        setTimeout(() => setContentSuccess(''), 3000);
      }
    } catch (err) {
      alert('Failed to delete blog post.');
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount_value || !newCoupon.min_order_value) {
      alert('Please fill out all required coupon fields.');
      return;
    }
    setContentLoading(true);
    try {
      const res = await createCoupon({
        ...newCoupon,
        discount_value: parseFloat(newCoupon.discount_value),
        min_order_value: parseFloat(newCoupon.min_order_value),
        max_discount: newCoupon.max_discount ? parseFloat(newCoupon.max_discount) : null
      });
      if (res.success) {
        setContentSuccess('New coupon code created successfully!');
        setCoupons([res.coupon, ...coupons]);
        setNewCoupon({
          code: '',
          type: 'percent',
          discount_value: '',
          min_order_value: '',
          max_discount: ''
        });
        setTimeout(() => setContentSuccess(''), 4000);
      }
    } catch (err) {
      alert('Failed to create coupon.');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteCoupon = async (code) => {
    if (!confirm(`Are you sure you want to delete coupon code "${code}"?`)) return;
    try {
      const res = await deleteCoupon(code);
      if (res.success) {
        setCoupons(coupons.filter(c => c.code !== code));
        setContentSuccess('Coupon code deleted.');
        setTimeout(() => setContentSuccess(''), 3000);
      }
    } catch (err) {
      alert('Failed to delete coupon.');
    }
  };

  const handleApproveRx = (id, status) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">



      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 mb-8 pb-4">
        {[
          { id: 'overview', label: 'Overview Stats', icon: <TrendingUp size={16} /> },
          { id: 'products', label: 'Products', icon: <Package size={16} /> },
          { id: 'medicines', label: 'Medicines', icon: <ShieldCheck size={16} /> },
          { id: 'orders', label: 'Orders', icon: <DollarSign size={16} /> },
          { id: 'prescriptions', label: 'Prescriptions', icon: <FileText size={16} /> },
          { id: 'inventory', label: 'Inventory', icon: <AlertCircle size={16} /> },
          { id: 'content', label: 'Content', icon: <FileCode size={16} /> },
          { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare size={16} /> },
          { id: 'ambulance', label: 'Ambulance', icon: <AlertCircle size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition ${activeTab === tab.id ? 'bg-medical-blue text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
        {activeTab === 'overview' && (
          <OverviewTab stats={stats} loading={loading} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'products' && (
          <ProductTab />
        )}

        {activeTab === 'medicines' && (
          <MedicinesTab />
        )}

        {activeTab === 'orders' && (
          <OrderTab orders={orders} handleUpdateOrderStatus={handleUpdateOrderStatus} />
        )}

        {activeTab === 'prescriptions' && (
          <PrescriptionTab prescriptions={prescriptions} handleApproveRx={handleApproveRx} />
        )}

        {activeTab === 'inventory' && (
          <InventoryTab inventory={inventory} setInventory={setInventory} />
        )}

        {activeTab === 'content' && (
          <ContentTab
            blogs={blogs}
            coupons={coupons}
            contentSubTab={contentSubTab}
            setContentSubTab={setContentSubTab}
            contentSuccess={contentSuccess}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            newCoupon={newCoupon}
            setNewCoupon={setNewCoupon}
            contentLoading={contentLoading}
            handleCreateBlog={handleCreateBlog}
            handleDeleteBlog={handleDeleteBlog}
            handleCreateCoupon={handleCreateCoupon}
            handleDeleteCoupon={handleDeleteCoupon}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesTab />
        )}

        {activeTab === 'ambulance' && (
          <AmbulanceTab />
        )}
      </div>
    </div>
  );
}
