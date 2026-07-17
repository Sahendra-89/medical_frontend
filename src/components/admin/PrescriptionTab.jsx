import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PrescriptionTab({ prescriptions, handleApproveRx }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Pharmacist Prescription Approval Panel</h2>

      <div className="space-y-6">
        {prescriptions.map(rx => (
          <div key={rx.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={rx.file_url} alt="Rx" className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">Prescription #{rx.id}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${rx.status === 'approved' ? 'bg-green-100 text-green-800' : rx.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{rx.status}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Patient: {rx.patient_name} | Doctor: {rx.doctor_name}</p>
                <p className="text-xs text-slate-600 italic mt-1 max-w-sm">Notes: "{rx.notes}"</p>
              </div>
            </div>

            {rx.status === 'pending' && (
              <div className="flex items-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200 w-full sm:w-auto justify-end">
                <button onClick={() => handleApproveRx(rx.id, 'rejected')} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs transition border border-red-200">Reject</button>
                <button onClick={() => handleApproveRx(rx.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-1"><CheckCircle size={14} /> Verify & Approve</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
