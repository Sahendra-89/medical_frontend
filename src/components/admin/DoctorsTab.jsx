"use client";
import { useState } from 'react';
import { Plus, Edit, Trash2, Stethoscope, CheckCircle } from 'lucide-react';

const INIT = { name:'', specialization:'', clinic:'', phone:'', email:'', available:true };
const SPECS = ['General Physician','Cardiologist','Diabetologist','Dermatologist','Orthopedic','Pediatrician','Neurologist','ENT Specialist'];

const MOCK_DOCTORS = [
  { id:1, name:'Dr. S.K. Sharma', specialization:'General Physician', clinic:'Sharma Clinic, Sec-14, Gurgaon', phone:'9876543210', email:'dr.sharma@email.com', available:true },
  { id:2, name:'Dr. R. Mehta', specialization:'Diabetologist', clinic:'Mehta Diabetes Center, DLF Phase 3', phone:'8888877777', email:'dr.mehta@email.com', available:true },
  { id:3, name:'Dr. Priya Singh', specialization:'Dermatologist', clinic:'Skin Care Clinic, Cyber City', phone:'7777766666', email:'dr.priya@email.com', available:false },
];

export default function DoctorsTab() {
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(INIT);
  const [success, setSuccess] = useState('');

  const inp = 'w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500';

  const flash = (msg) => { setSuccess(msg); setTimeout(()=>setSuccess(''),3000); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId) { setDoctors(doctors.map(d=>d.id===editId?{...d,...form}:d)); flash('Doctor updated!'); }
    else { setDoctors([{id:Date.now(),...form},...doctors]); flash('Doctor added!'); }
    setShowForm(false); setEditId(null); setForm(INIT);
  };

  const handleEdit = (d) => { setForm(d); setEditId(d.id); setShowForm(true); };
  const handleDelete = (id) => { if(confirm('Remove this doctor?')) { setDoctors(doctors.filter(d=>d.id!==id)); flash('Doctor removed.'); }};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Manage Doctors ({doctors.length})</h2>
        <button onClick={()=>{setShowForm(!showForm);setEditId(null);setForm(INIT);}} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition">
          <Plus size={14}/> {showForm?'Cancel':'Add Doctor'}
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle size={14}/>{success}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h3 className="sm:col-span-2 font-bold text-sm">{editId?'Edit Doctor':'Add Doctor'}</h3>
          <input required placeholder="Doctor Full Name*" className={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <select className={inp} value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})}>
            <option value="">Select Specialization</option>
            {SPECS.map(s=><option key={s}>{s}</option>)}
          </select>
          <input placeholder="Clinic / Hospital Name" className={inp} value={form.clinic} onChange={e=>setForm({...form,clinic:e.target.value})}/>
          <input placeholder="Phone Number" className={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input type="email" placeholder="Email Address" className={inp} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input type="checkbox" checked={form.available} onChange={e=>setForm({...form,available:e.target.checked})} className="w-4 h-4"/>
            Available for Consultation
          </label>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={()=>setShowForm(false)} className="px-5 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">{editId?'Update':'Add Doctor'}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {doctors.map(d=>(
          <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center"><Stethoscope size={20}/></div>
              <div>
                <p className="font-bold text-sm text-slate-900">{d.name}</p>
                <p className="text-xs text-blue-600 font-semibold">{d.specialization}</p>
                <p className="text-xs text-slate-500">{d.clinic}</p>
                <p className="text-xs text-slate-500">{d.phone} · {d.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${d.available?'bg-green-100 text-green-700':'bg-red-100 text-red-600'}`}>{d.available?'Available':'Unavailable'}</span>
              <button onClick={()=>handleEdit(d)} className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg"><Edit size={14}/></button>
              <button onClick={()=>handleDelete(d.id)} className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-lg"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
