import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Pill, Upload, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import { getMedicines, createMedicine, updateMedicine, deleteMedicine, uploadImage } from '../../lib/api';

const EMPTY_FORM = {
  medicine_name: '', company_name: '', category: 'Tablets',
  price: '', stock_quantity: 0, description: '', usage: '',
  side_effects: '', dosage: '', precautions: '',
  prescription_required: false, image_url: ''
};

const CATEGORIES = [
  'Tablets', 'Capsules', 'Injection', 'IV Infusion', 'Syrup', 'Drops',
  'Cream / Ointment', 'Medical Device', 'Surgical Supplies', 'Other'
];

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold text-white ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {message}
    </div>
  );
}

export default function MedicinesTab() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchMedicines = async () => {
    setLoading(true);
    const res = await getMedicines({ search: search || undefined });
    if (res.success) setMedicines(res.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMedicines(); }, [search]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      if (res.success) {
        setForm(f => ({ ...f, image_url: res.imageUrl }));
        showToast('Image uploaded!');
      } else {
        showToast('Upload failed', 'error');
      }
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.medicine_name || !form.price) {
      showToast('Medicine name and price are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock_quantity: parseInt(form.stock_quantity) || 0,
      };
      if (editingId) {
        await updateMedicine(editingId, payload);
        showToast('Medicine updated successfully!');
      } else {
        await createMedicine(payload);
        showToast('Medicine added successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      fetchMedicines();
    } catch {
      showToast('Failed to save medicine', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (m) => {
    setForm({
      medicine_name: m.medicine_name || '',
      company_name: m.company_name || '',
      category: m.category || 'Tablets',
      price: m.price || '',
      stock_quantity: m.stock_quantity || 0,
      description: m.description || '',
      usage: m.usage || '',
      side_effects: m.side_effects || '',
      dosage: m.dosage || '',
      precautions: m.precautions || '',
      prescription_required: m.prescription_required || false,
      image_url: m.image_url || '',
    });
    setEditingId(m.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await deleteMedicine(id);
    showToast('Medicine deleted');
    fetchMedicines();
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="text-medical-blue" size={22} /> Medicines Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your medicines database. These appear on the Medicine & Shop pages.
          </p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY_FORM); }}
          className="bg-medical-blue text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition flex items-center gap-1.5"
        >
          <Plus size={16} />
          {showForm && !editingId ? 'Cancel' : 'Add Medicine'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-teal-50 to-slate-50 p-6 rounded-2xl border border-teal-100 shadow-inner space-y-5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            {editingId
              ? <><Edit size={16} className="text-teal-500" /> Edit Medicine</>
              : <><Plus size={16} className="text-teal-500" /> Add New Medicine</>}
          </h3>

          {/* Image Section */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-white flex-shrink-0">
              {form.image_url ? (
                <img src={form.image_url} alt="preview" className="w-full h-full object-contain"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200'; }} />
              ) : (
                <ImageIcon size={28} className="text-slate-300" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-slate-600">Medicine Image</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL..."
                  className="flex-1 p-2.5 rounded-xl text-xs border border-slate-200 outline-none focus:border-teal-400 bg-white"
                  value={form.image_url}
                  onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-3 py-2 rounded-xl text-xs transition disabled:opacity-50"
                >
                  <Upload size={13} />
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Medicine Name *</label>
              <input required type="text" placeholder="e.g. Crocin 500mg 10Tab"
                className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.medicine_name} onChange={e => setForm(f => ({ ...f, medicine_name: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Company / Brand *</label>
              <input required type="text" placeholder="e.g. GSK, Cipla, Sun Pharma"
                className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Category</label>
              <select className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Price (₹) *</label>
              <input required type="number" step="0.01" min="0" placeholder="e.g. 35.00"
                className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Stock Quantity</label>
              <input type="number" min="0" placeholder="0"
                className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Dosage</label>
              <input type="text" placeholder="e.g. 1 tablet twice daily"
                className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
                value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Description</label>
            <textarea rows={2} placeholder="Brief description of what this medicine treats..."
              className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white resize-none"
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Usage / Indications</label>
            <input type="text" placeholder="e.g. Fever · Headache · Pain Relief"
              className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
              value={form.usage} onChange={e => setForm(f => ({ ...f, usage: e.target.value }))} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Side Effects</label>
            <input type="text" placeholder="e.g. Nausea, Dizziness (rare)"
              className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-teal-400 bg-white"
              value={form.side_effects} onChange={e => setForm(f => ({ ...f, side_effects: e.target.value }))} />
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 text-xs font-bold text-amber-700 cursor-pointer select-none">
              <input type="checkbox" checked={form.prescription_required}
                onChange={e => setForm(f => ({ ...f, prescription_required: e.target.checked }))}
                className="w-4 h-4 rounded accent-amber-500" />
              Prescription (Rx) Required
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button"
              onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold px-8 py-2.5 rounded-xl transition shadow-md text-xs disabled:opacity-60">
              {saving ? 'Saving...' : editingId ? '✅ Update Medicine' : '✅ Save Medicine'}
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <div className="p-4 border-b flex items-center bg-slate-50 gap-2">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search medicines by name or company..."
            className="bg-transparent border-none outline-none text-sm w-full"
            value={search} onChange={e => setSearch(e.target.value)} />
          <span className="text-xs text-slate-400 font-bold whitespace-nowrap">{medicines.length} medicines</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Medicine</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Type</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {[...Array(6)].map((__, j) => (
                      <td key={j} className="p-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : medicines.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <Pill size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="font-bold text-slate-400 text-sm">No medicines yet</p>
                    <p className="text-xs text-slate-300 mt-1">Click &quot;Add Medicine&quot; to add your first medicine.</p>
                  </td>
                </tr>
              ) : medicines.map(m => (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50">
                        <img
                          src={m.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'}
                          alt={m.medicine_name}
                          className="w-full h-full object-contain"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'; }}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-xs leading-tight">{m.medicine_name}</span>
                        <span className="text-[10px] text-slate-400">{m.company_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2.5 py-1 rounded-full">{m.category}</span>
                  </td>
                  <td className="p-4 font-bold text-green-600 text-xs">₹{m.price}</td>
                  <td className="p-4 font-bold text-xs">
                    {m.stock_quantity > 10
                      ? <span className="text-green-600">{m.stock_quantity}</span>
                      : m.stock_quantity > 0
                        ? <span className="text-orange-500">{m.stock_quantity} Low</span>
                        : <span className="text-red-500">Out</span>}
                  </td>
                  <td className="p-4">
                    {m.prescription_required
                      ? <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full">Rx Required</span>
                      : <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full">OTC</span>}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleEdit(m)} title="Edit"
                      className="p-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 rounded-lg transition">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(m.id, m.medicine_name)} title="Delete"
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
