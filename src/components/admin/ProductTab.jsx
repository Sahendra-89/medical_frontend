import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Package, Upload, CheckCircle, XCircle, Star, Zap, Image as ImageIcon } from 'lucide-react';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct, uploadImage } from '../../lib/api';

const EMPTY_FORM = {
  name: '', brand: '', category_id: 'otc', mrp: '', discount_percent: 0,
  price: '', stock: 0, description: '', usage_instructions: '', side_effects: '',
  prescription_required: false, image: '', is_featured: false, is_bestseller: false
};

const CAT_COLORS = {
  'must-haves': 'bg-amber-100 text-amber-700',
  'vitamin-store': 'bg-green-100 text-green-700',
  'sexual-wellness': 'bg-rose-100 text-rose-700',
  'personal-care': 'bg-pink-100 text-pink-700',
  'homeopathy': 'bg-violet-100 text-violet-700',
  'summer-store': 'bg-orange-100 text-orange-700',
  'health-food': 'bg-lime-100 text-lime-700',
  'diabetes-essentials': 'bg-red-100 text-red-700',
  'ayurvedic': 'bg-teal-100 text-teal-700',
  'mother-baby': 'bg-sky-100 text-sky-700',
  'elderly-care': 'bg-slate-200 text-slate-700',
  'otc': 'bg-blue-100 text-blue-700',
  'prescription': 'bg-indigo-100 text-indigo-700',
  'devices': 'bg-cyan-100 text-cyan-700',
  'wellness': 'bg-emerald-100 text-emerald-700',
};

// ── Toast notification component ──
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold text-white transition-all animate-bounce-in ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {message}
    </div>
  );
}

export default function ProductTab() {
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [products, setProducts] = useState([]);
  const [prodLoading, setProdLoading] = useState(true);
  const [prodSearch, setProdSearch] = useState('');
  const [showProdForm, setShowProdForm] = useState(false);
  const [editingProd, setEditingProd] = useState(null);
  const [prodForm, setProdForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  const showToast = (message, type = 'success') => setToast({ message, type });

  // ── Load categories ──
  useEffect(() => {
    (async () => {
      const catRes = await getCategories();
      if (catRes.success) setCategories(catRes.categories);
    })();
  }, []);

  // ── Load products ──
  const fetchProducts = async () => {
    setProdLoading(true);
    const res = await getProducts({
      category: activeCat === 'all' ? undefined : activeCat,
      search: prodSearch || undefined
    });
    if (res.success) {
      setProducts(res.products.map(p => ({
        ...p,
        discount_percent: p.mrp && p.mrp > p.price
          ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
          : (p.discount_percent || 0)
      })));
    }
    setProdLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [activeCat, prodSearch]);

  // ── Image upload handler ──
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      if (res.success) {
        setProdForm(f => ({ ...f, image: res.imageUrl }));
        showToast('Image uploaded!');
      } else {
        showToast('Image upload failed', 'error');
      }
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Save product ──
  const handleProdSubmit = async (e) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.price) {
      showToast('Name and Price are required', 'error');
      return;
    }
    setSaving(true);
    try {
      if (editingProd) {
        await updateProduct(editingProd, {
          ...prodForm,
          mrp: parseFloat(prodForm.mrp) || null,
          price: parseFloat(prodForm.price),
          stock: parseInt(prodForm.stock) || 0,
          discount_percent: parseFloat(prodForm.discount_percent) || 0,
        });
        showToast('Product updated successfully!');
      } else {
        await createProduct({
          ...prodForm,
          mrp: parseFloat(prodForm.mrp) || null,
          price: parseFloat(prodForm.price),
          stock: parseInt(prodForm.stock) || 0,
          discount_percent: parseFloat(prodForm.discount_percent) || 0,
          sku: 'PP-' + Date.now(),
        });
        showToast('Product added successfully!');
      }
      setShowProdForm(false);
      setEditingProd(null);
      setProdForm(EMPTY_FORM);
      fetchProducts();
    } catch {
      showToast('Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleProdEdit = (p) => {
    setProdForm({
      name: p.name || '',
      brand: p.brand || '',
      category_id: p.category_id || 'otc',
      mrp: p.mrp || '',
      price: p.price || '',
      stock: p.stock || 0,
      discount_percent: p.discount_percent || 0,
      description: p.description || '',
      usage_instructions: p.usage_instructions || '',
      side_effects: p.side_effects || '',
      prescription_required: p.prescription_required || false,
      image: p.image || '',
      is_featured: p.is_featured || false,
      is_bestseller: p.is_bestseller || false,
    });
    setEditingProd(p.id);
    setShowProdForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProdDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await deleteProduct(id);
    showToast('Product deleted');
    fetchProducts();
  };

  const filteredProds = products.filter(p =>
    !prodSearch ||
    p.name?.toLowerCase().includes(prodSearch.toLowerCase()) ||
    p.brand?.toLowerCase().includes(prodSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="text-medical-blue" size={22} /> Product Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Products added here appear on the website homepage, shop & medicine pages instantly.
          </p>
        </div>
        <button
          onClick={() => { setShowProdForm(!showProdForm); setEditingProd(null); setProdForm(EMPTY_FORM); }}
          className="bg-medical-blue text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition flex items-center gap-1.5"
        >
          <Plus size={16} />
          {showProdForm && !editingProd ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* ── Add / Edit Form ── */}
      {showProdForm && (
        <form onSubmit={handleProdSubmit} className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100 shadow-inner space-y-5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            {editingProd ? <><Edit size={16} className="text-blue-500" /> Edit Product</> : <><Plus size={16} className="text-blue-500" /> Add New Product</>}
          </h3>

          {/* Image Upload Section */}
          <div className="flex items-start gap-4">
            {/* Preview */}
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-white flex-shrink-0">
              {prodForm.image ? (
                <img src={prodForm.image} alt="preview" className="w-full h-full object-contain" onError={e => e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200'} />
              ) : (
                <ImageIcon size={28} className="text-slate-300" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-slate-600">Product Image</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL (https://...)"
                  className="flex-1 p-2.5 rounded-xl text-xs border border-slate-200 outline-none focus:border-blue-400 bg-white"
                  value={prodForm.image}
                  onChange={e => setProdForm(f => ({ ...f, image: e.target.value }))}
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
              <p className="text-[10px] text-slate-400">Upload from your device OR paste an image URL from the web</p>
            </div>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Product Name *</label>
              <input required type="text" placeholder="e.g. Crocin 500mg Strip of 10" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.name} onChange={e => setProdForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Brand</label>
              <input type="text" placeholder="e.g. GSK, Cipla, Sun Pharma" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.brand} onChange={e => setProdForm(f => ({ ...f, brand: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Category</label>
              <select className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.category_id} onChange={e => setProdForm(f => ({ ...f, category_id: e.target.value }))}>
                <optgroup label="Main Categories">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  <option value="must-haves">Must Haves</option>
                  <option value="vitamin-store">Vitamin Store</option>
                  <option value="personal-care">Personal Care</option>
                  <option value="homeopathy">Homeopathy</option>
                  <option value="ayurvedic">Ayurvedic</option>
                  <option value="diabetes-essentials">Diabetes Essentials</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="otc">OTC Medicines</option>
                  <option value="prescription">Prescription Medicines</option>
                  <option value="devices">Medical Devices</option>
                  <option value="wellness">Wellness</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Stock Quantity</label>
              <input type="number" min="0" placeholder="0" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.stock} onChange={e => setProdForm(f => ({ ...f, stock: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">MRP (₹)</label>
              <input type="number" step="0.01" min="0" placeholder="e.g. 50.00" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.mrp} onChange={e => setProdForm(f => ({ ...f, mrp: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Selling Price (₹) *</label>
              <input required type="number" step="0.01" min="0" placeholder="e.g. 35.00" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.price} onChange={e => setProdForm(f => ({ ...f, price: e.target.value }))} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Discount %</label>
              <input type="number" min="0" max="100" placeholder="e.g. 30" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.discount_percent} onChange={e => setProdForm(f => ({ ...f, discount_percent: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Description</label>
            <textarea placeholder="Describe the product — what it does, key ingredients, pack size..." rows={3} className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white resize-none" value={prodForm.description} onChange={e => setProdForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1 block">Usage Instructions</label>
            <input type="text" placeholder="e.g. Take 1 tablet twice daily after meals" className="w-full p-3 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-400 bg-white" value={prodForm.usage_instructions} onChange={e => setProdForm(f => ({ ...f, usage_instructions: e.target.value }))} />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input type="checkbox" checked={prodForm.prescription_required} onChange={e => setProdForm(f => ({ ...f, prescription_required: e.target.checked }))} className="w-4 h-4 rounded accent-amber-500" />
              <span className="text-amber-600">Rx Required</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input type="checkbox" checked={prodForm.is_featured} onChange={e => setProdForm(f => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 rounded accent-blue-500" />
              <Zap size={13} className="text-blue-500" />
              <span>Show in "Shop Top Medicines" (Featured) <span className="text-[10px] text-slate-400 font-normal">(If unchecked, it goes to "Explore Our Catalog")</span></span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input type="checkbox" checked={prodForm.is_bestseller} onChange={e => setProdForm(f => ({ ...f, is_bestseller: e.target.checked }))} className="w-4 h-4 rounded accent-emerald-500" />
              <Star size={13} className="text-emerald-500" />
              <span>Bestseller (Trending)</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setShowProdForm(false); setEditingProd(null); setProdForm(EMPTY_FORM); }} className="px-6 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-100 transition">Cancel</button>
            <button type="submit" disabled={saving} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-2.5 rounded-xl transition shadow-md text-xs disabled:opacity-60 flex items-center gap-2">
              {saving ? 'Saving...' : editingProd ? '✅ Update Product' : '✅ Save Product'}
            </button>
          </div>
        </form>
      )}

      {/* ── Category Filter Pills ── */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCat('all')} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${activeCat === 'all' ? 'bg-medical-blue text-white border-medical-blue' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
          🏪 All
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${activeCat === c.id ? 'bg-medical-blue text-white border-medical-blue' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* ── Products Table ── */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <div className="p-4 border-b flex items-center bg-slate-50 gap-2">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search products by name or brand..." className="bg-transparent border-none outline-none text-sm w-full" value={prodSearch} onChange={e => setProdSearch(e.target.value)} />
          <span className="text-xs text-slate-400 font-bold whitespace-nowrap">{filteredProds.length} items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Flags</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prodLoading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {[...Array(7)].map((__, j) => <td key={j} className="p-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>)}
                  </tr>
                ))
              ) : filteredProds.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <Package size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="font-bold text-slate-400 text-sm">No products yet</p>
                    <p className="text-xs text-slate-300 mt-1">Click "Add New Product" to add your first product.</p>
                  </td>
                </tr>
              ) : filteredProds.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50">
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          onError={e => e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-xs leading-tight">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.brand} • {p.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${CAT_COLORS[p.category_id] || 'bg-slate-100 text-slate-600'}`}>
                      {categories.find(c => c.id === p.category_id)?.name || p.category_id}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 line-through text-xs">₹{p.mrp || '—'}</td>
                  <td className="p-4 font-bold text-green-600 text-xs">
                    ₹{p.price}
                    {p.discount_percent > 0 && <span className="text-[10px] text-orange-500 ml-1">({p.discount_percent}% off)</span>}
                  </td>
                  <td className="p-4 font-bold text-xs">
                    {p.stock > 10 ? <span className="text-green-600">{p.stock}</span>
                      : p.stock > 0 ? <span className="text-orange-500">{p.stock} Low</span>
                        : <span className="text-red-500">Out</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {p.is_featured ? (
                        <span className="bg-blue-100 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5" title="Displays in Shop Top Medicines section">
                          <Zap size={9} /> Top Medicines
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5" title="Displays in Explore Our Catalog section">
                          Catalog
                        </span>
                      )}
                      {p.is_bestseller && <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5"><Star size={9} />Best</span>}
                      {p.prescription_required && <span className="bg-amber-100 text-amber-600 text-[9px] font-black px-2 py-0.5 rounded-full">Rx</span>}
                    </div>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleProdEdit(p)} className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg transition" title="Edit">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleProdDelete(p.id, p.name)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition" title="Delete">
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
