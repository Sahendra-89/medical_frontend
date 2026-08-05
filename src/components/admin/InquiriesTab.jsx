"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { getInquiries, updateInquiryStatus } from '../../lib/api';

export default function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await getInquiries();
      if (res.success) {
        setInquiries(res.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateInquiryStatus(id, newStatus);
      if (res.success) {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Contact Inquiries ({inquiries.length})</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400">Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-center py-10 text-slate-400">No inquiries found.</p>
        ) : (
          inquiries.map(inq => (
            <div key={inq.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-medical-blue flex items-center justify-center font-black">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{inq.subject}</h3>
                    <p className="text-sm font-semibold text-slate-700">{inq.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Mail size={12} /> {inq.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {inq.phone}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(inq.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <select
                    value={inq.status || 'pending'}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                      inq.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{inq.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
