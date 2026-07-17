"use client";
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, AlertTriangle } from 'lucide-react';

const MOCK = [
  { id:201, patient:'Sunita Devi', doctor:'Dr. S.K. Sharma', medicine:'Amoxicillin 500mg', date:'2026-06-16', status:'pending', image:'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200', expiry:'2026-09-01', notes:'Monthly refill for respiratory infection' },
  { id:202, patient:'Mohan Lal', doctor:'Dr. R. Mehta', medicine:'Metformin 500mg', date:'2026-06-15', status:'pending', image:'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200', expiry:'2026-12-31', notes:'Type 2 diabetes management' },
  { id:203, patient:'Renu Sharma', doctor:'Dr. Priya Singh', medicine:'Dexamethasone Cream', date:'2026-06-14', status:'approved', image:'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200', expiry:'2026-08-15', notes:'Skin allergy treatment' },
  { id:204, patient:'Vikram Singh', doctor:'Unknown', medicine:'Alprazolam 0.25mg', date:'2026-06-13', status:'rejected', image:'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200', expiry:'Invalid', notes:'Schedule X — prescription unclear', flag:'high' },
];

const S = { pending:'bg-amber-100 text-amber-800', approved:'bg-green-100 text-green-700', rejected:'bg-red-100 text-red-700' };

export default function PrescriptionValidationTab() {
  const [list, setList] = useState(MOCK);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [note, setNote] = useState('');

  const update = (id, status) => { setList(list.map(r=>r.id===id?{...r,status}:r)); setSelected(null); setNote(''); };
  const filtered = filter==='all'?list:list.filter(r=>r.status===filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900">Prescription Validation</h2>
          <p className="text-xs text-slate-500">Review prescriptions before dispatching Schedule H/X medicines</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','pending','approved','rejected'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filter===s?'bg-blue-600 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s}{s==='pending'&&<span className="ml-1 bg-amber-300 text-amber-900 rounded-full px-1.5">{list.filter(r=>r.status==='pending').length}</span>}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-black text-slate-900">Review Rx #{selected.id}</h3>
              <button onClick={()=>setSelected(null)} className="text-slate-400 hover:text-slate-700"><XCircle size={20}/></button>
            </div>
            <img src={selected.image} alt="Prescription" className="w-full h-40 object-cover rounded-xl border"/>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl"><p className="text-slate-400 font-bold mb-1">PATIENT</p><p className="font-bold text-slate-800">{selected.patient}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl"><p className="text-slate-400 font-bold mb-1">DOCTOR</p><p className="font-bold text-slate-800">{selected.doctor}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl"><p className="text-slate-400 font-bold mb-1">MEDICINE</p><p className="font-bold text-slate-800">{selected.medicine}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl"><p className="text-slate-400 font-bold mb-1">RX EXPIRY</p><p className={`font-bold ${selected.expiry==='Invalid'?'text-red-600':'text-slate-800'}`}>{selected.expiry}</p></div>
            </div>
            {selected.flag==='high' && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold"><AlertTriangle size={14}/>HIGH RISK — Schedule X drug. Verify carefully.</div>}
            <textarea rows={2} placeholder="Pharmacist notes (optional)..." value={note} onChange={e=>setNote(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500 resize-none"/>
            <div className="flex gap-2">
              <button onClick={()=>update(selected.id,'approved')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition"><CheckCircle size={14}/>Approve & Dispatch</button>
              <button onClick={()=>update(selected.id,'rejected')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl hover:bg-red-100 transition"><XCircle size={14}/>Reject</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(rx=>(
          <div key={rx.id} className={`bg-white border rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4 ${rx.flag==='high'?'border-red-200':'border-slate-200'}`}>
            {rx.flag==='high'&&<div className="w-full flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg"><AlertTriangle size={12}/>Schedule X — High Risk</div>}
            <img src={rx.image} alt="Rx" className="w-14 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"/>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-900">Rx #{rx.id} — {rx.patient}</p>
              <p className="text-xs text-slate-500">Doctor: {rx.doctor} · {rx.date}</p>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">{rx.medicine}</p>
              <p className="text-xs text-slate-600 italic">"{rx.notes}"</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${S[rx.status]}`}>{rx.status}</span>
              {rx.status==='pending'&&<button onClick={()=>setSelected(rx)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100 transition"><Eye size={12}/>Review</button>}
            </div>
          </div>
        ))}
        {filtered.length===0&&<p className="text-center py-10 text-slate-400">No prescriptions found.</p>}
      </div>
    </div>
  );
}
