"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import { getAllPrescriptions, updatePrescriptionStatus } from '../../lib/api';

const STATUS = {
  pending: { style:'bg-amber-100 text-amber-800', icon:<Clock size={12}/> },
  approved: { style:'bg-green-100 text-green-700', icon:<CheckCircle size={12}/> },
  rejected: { style:'bg-red-100 text-red-700', icon:<XCircle size={12}/> },
};

export default function PrescriptionsAdminTab() {
  const [rxList, setRxList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await getAllPrescriptions();
      if (res.success) {
        setRxList(res.prescriptions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, status) => {
    try {
      const res = await updatePrescriptionStatus(id, { approvalStatus: status });
      if (res.success) {
        setRxList(rxList.map(r => r.id === id ? { ...r, approval_status: status } : r));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };
  
  const filtered = filter==='all' ? rxList : rxList.filter(r=>r.approval_status===filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Prescriptions ({rxList.length})</h2>
        <div className="flex gap-2 flex-wrap">
          {['all','pending','approved','rejected'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filter===s?'bg-blue-600 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s} {s==='pending' && <span className="ml-1 bg-amber-200 text-amber-800 rounded-full px-1">{rxList.filter(r=>r.approval_status==='pending').length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400">Loading prescriptions...</p>
        ) : filtered.map(rx=>(
          <div key={rx.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <a href={rx.file_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img src={rx.file_url || 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200'} alt="Prescription" className="w-16 h-16 object-cover rounded-xl border border-slate-200 hover:opacity-80 transition"/>
              </a>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <p className="font-bold text-sm text-slate-900">Rx #{rx.id} — {rx.patient_name || rx.patient}</p>
                  <span className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full capitalize ${STATUS[rx.approval_status || rx.status]?.style || STATUS.pending.style}`}>
                    {STATUS[rx.approval_status || rx.status]?.icon || STATUS.pending.icon} {rx.approval_status || rx.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Doctor: {rx.doctor_name || rx.doctor || 'N/A'} · {rx.created_at ? new Date(rx.created_at).toLocaleDateString() : rx.date}</p>
                <p className="text-xs text-slate-600 italic mt-1">"{rx.notes || 'No additional notes'}"</p>
              </div>
            </div>
            {(rx.approval_status === 'pending' || rx.status === 'pending') && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button onClick={()=>update(rx.id,'approved')} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition">
                  <CheckCircle size={13}/> Approve
                </button>
                <button onClick={()=>update(rx.id,'rejected')} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition border border-red-200">
                  <XCircle size={13}/> Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {!loading && filtered.length===0 && <p className="text-center py-10 text-slate-400">No prescriptions found.</p>}
      </div>
    </div>
  );
}
