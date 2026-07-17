"use client";
import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, UploadCloud, CheckCircle, X } from 'lucide-react';
import { getMedicines, createMedicine, updateMedicine, deleteMedicine, importMedicines, uploadImage } from '../../lib/api';

const EMPTY = { medicine_name:'', company_name:'', price:'', category:'Tablets', description:'', usage:'', dosage:'', side_effects:'', precautions:'', stock_quantity:'', image_url:'' };
const CATS = ['Tablets','Capsules','Injections','Syrups','Nutrition Products','Surgical Products','Devices','OTC'];

export default function MedicinesTab() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [success, setSuccess] = useState('');
  const [csvMsg, setCsvMsg] = useState('');
  const [uploadingImg, setUploadingImg] = useState(false);
  const csvRef = useRef();

  const load = async () => { setLoading(true); const r = await getMedicines({search,limit:200}); if(r.success) setMedicines(r.data||[]); setLoading(false); };
  useEffect(()=>{ load(); },[search]);

  const flash = (msg) => { setSuccess(msg); setTimeout(()=>setSuccess(''),3000); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImg(true);
    const res = await uploadImage(file);
    if (res.success) {
      setForm({...form, image_url: res.imageUrl});
      flash('Image uploaded successfully!');
    } else {
      alert('Upload failed: ' + res.message);
    }
    setUploadingImg(false);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...form,
      price: parseFloat(form.price) || 0,
      stock_quantity: parseInt(form.stock_quantity, 10) || 0
    };

    let res;
    try {
      if(editId) res = await updateMedicine(editId, payload);
      else res = await createMedicine(payload);

      if (res?.success || res?.message?.includes('success')) {
        setShowForm(false); setEditId(null); setForm(EMPTY);
        flash(editId ? 'Medicine updated!' : 'Medicine added!');
        load();
      } else {
        alert('Failed to save medicine: ' + (res?.message || res?.error?.message || 'Check database connection'));
      }
    } catch (err) {
      alert('Failed to save medicine: ' + (err?.message || err || 'Check database connection'));
    }
  };

  const handleEdit = (m) => { setForm(m); setEditId(m.id); setShowForm(true); window.scrollTo(0,0); };

  const handleDelete = async (id) => {
    if(!confirm('Delete this medicine?')) return;
    await deleteMedicine(id); flash('Medicine deleted.'); load();
  };

  const handleCSV = (e) => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const lines = ev.target.result.split('\n').filter(Boolean);
        const headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(h=>h.trim().toLowerCase().replace(/"/g,''));
        const rows = lines.slice(1).map(line => {
          const vals = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v=>v.trim().replace(/^"|"$/g,''));
          const obj = {}; headers.forEach((h,i)=>{ obj[h]=vals[i]||''; }); return obj;
        });
        const r = await importMedicines(rows);
        if (r.success || r.message?.includes('successfully')) {
          setCsvMsg(r.message || 'Imported!');
        } else {
          setCsvMsg('Failed: ' + (r.message || r.error?.message || 'Unknown error'));
        }
        load();
        setTimeout(()=>setCsvMsg(''), 5000);
      } catch (err) { setCsvMsg('Failed to parse CSV: ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value='';
  };

  const inp = 'w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Medicine Catalog</h2>
        <div className="flex gap-2 flex-wrap">
          <label className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-green-700 transition">
            <UploadCloud size={14}/> Upload CSV <input type="file" accept=".csv,.json" className="hidden" ref={csvRef} onChange={handleCSV}/>
          </label>
          <button onClick={()=>{setShowForm(!showForm);setEditId(null);setForm(EMPTY);}} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition">
            <Plus size={14}/> {showForm?'Cancel':'Add Medicine'}
          </button>
        </div>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle size={14}/>{success}</div>}
      {csvMsg && <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-xl text-xs font-bold">{csvMsg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h3 className="sm:col-span-2 font-bold text-sm text-slate-800">{editId?'Edit Medicine':'Add New Medicine'}</h3>
          <input required placeholder="Medicine Name*" className={inp} value={form.medicine_name} onChange={e=>setForm({...form,medicine_name:e.target.value})}/>
          <input required placeholder="Company/Brand*" className={inp} value={form.company_name} onChange={e=>setForm({...form,company_name:e.target.value})}/>
          <input required type="number" step="0.01" placeholder="Price (₹)*" className={inp} value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
          <select className={inp} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {CATS.map(c=><option key={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="Stock Quantity" className={inp} value={form.stock_quantity} onChange={e=>setForm({...form,stock_quantity:e.target.value})}/>
          
          {/* Enhanced Image Field */}
          <div className="flex gap-2">
            <input type="url" placeholder="Image URL (or upload ->)" className={`${inp} flex-1`} value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})}/>
            <label className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition">
              {uploadingImg ? 'Uploading...' : 'Upload'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImg}/>
            </label>
          </div>

          <textarea placeholder="Description" rows={2} className={`${inp} sm:col-span-2 resize-none`} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <textarea placeholder="Usage" rows={2} className={`${inp} resize-none`} value={form.usage} onChange={e=>setForm({...form,usage:e.target.value})}/>
          <textarea placeholder="Dosage" rows={2} className={`${inp} resize-none`} value={form.dosage} onChange={e=>setForm({...form,dosage:e.target.value})}/>
          <textarea placeholder="Side Effects" rows={2} className={`${inp} resize-none`} value={form.side_effects} onChange={e=>setForm({...form,side_effects:e.target.value})}/>
          <textarea placeholder="Precautions" rows={2} className={`${inp} resize-none`} value={form.precautions} onChange={e=>setForm({...form,precautions:e.target.value})}/>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={()=>setShowForm(false)} className="px-5 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">{editId?'Update':'Save Medicine'}</button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
        <Search size={14} className="text-slate-400"/>
        <input className="flex-1 text-xs outline-none" placeholder="Search medicines..." value={search} onChange={e=>setSearch(e.target.value)}/>
        {search && <button onClick={()=>setSearch('')}><X size={14} className="text-slate-400"/></button>}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b">
            <tr>{['Medicine','Company','Category','Price','Stock','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading...</td></tr>
            : medicines.length===0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No medicines found.</td></tr>
            : medicines.map(m=>(
              <tr key={m.id} className="border-b hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-bold text-slate-800 max-w-[180px] truncate">{m.medicine_name}</td>
                <td className="px-4 py-3 text-slate-600">{m.company_name}</td>
                <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{m.category}</span></td>
                <td className="px-4 py-3 font-bold text-green-700">₹{m.price}</td>
                <td className="px-4 py-3 font-bold">{m.stock_quantity>0?<span className="text-green-600">{m.stock_quantity}</span>:<span className="text-red-500">Out</span>}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={()=>handleEdit(m)} className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition"><Edit size={14}/></button>
                  <button onClick={()=>handleDelete(m.id)} className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-lg transition"><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
