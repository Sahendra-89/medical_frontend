"use client";
import React, { useState, useEffect } from 'react';
import { Truck, Phone, Calendar, AlertTriangle, MapPin, CheckCircle, Clock } from 'lucide-react';
import { getAmbulanceRequests, updateAmbulanceStatus } from '../../lib/api';

export default function AmbulanceTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await getAmbulanceRequests();
      if (res.success) {
        setRequests(res.requests);
      }
    } catch (err) {
      console.error('Failed to fetch ambulance requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAmbulanceStatus(id, newStatus);
      if (res.success) {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Ambulance Requests ({requests.length})</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center py-10 text-slate-400">No ambulance requests found.</p>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-black">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      {req.name}
                      <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {req.ambulance_type === 'als' ? 'ALS' : 'BLS'}
                      </span>
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center gap-2">
                      <Phone size={12} /> {req.phone}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-red-500"><AlertTriangle size={12} /> {req.emergency_type || 'N/A'}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(req.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <select
                    value={req.status || 'pending'}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                      req.status === 'dispatched' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      req.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                      req.status === 'cancelled' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={10} /> Pickup</p>
                  <p className="text-sm text-slate-700">{req.pickup}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={10} /> Drop</p>
                  <p className="text-sm text-slate-700">{req.drop_location || 'Not provided'}</p>
                </div>
                {req.notes && (
                  <div className="sm:col-span-2 mt-2 pt-2 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notes</p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{req.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
