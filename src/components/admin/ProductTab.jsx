import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from '../../lib/api';

const CAT_COLORS = {
  'must-haves':        'bg-amber-100 text-amber-700',
  'vitamin-store':     'bg-green-100 text-green-700',
  'sexual-wellness':   'bg-rose-100 text-rose-700',
  'personal-care':     'bg-pink-100 text-pink-700',
  'homeopathy':        'bg-violet-100 text-violet-700',
  'summer-store':      'bg-orange-100 text-orange-700',
  'health-food':       'bg-lime-100 text-lime-700',
  'diabetes-essentials': 'bg-red-100 text-red-700',
  'ayurvedic':         'bg-teal-100 text-teal-700',
  'mother-baby':       'bg-sky-100 text-sky-700',
  'elderly-care':      'bg-slate-200 text-slate-700',
  'otc':               'bg-blue-100 text-blue-700',
  'prescription':      'bg-indigo-100 text-indigo-700',
  'devices':           'bg-cyan-100 text-cyan-700',
  'wellness':          'bg-emerald-100 text-emerald-700',
};

export default function ProductTab() {
  // ── State ──
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [products, setProducts] = useState([]);
  const [prodLoading, setProdLoading] = useState(true);
  const [prodSearch, setProdSearch] = useState('');
  const [showProdForm, setShowProdForm] = useState(false);
  const [editingProd, setEditingProd] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '', brand: '', category_id: 'must-haves', mrp: '', discount_percent: 0,
    price: '', stock: 0, description: '', prescription_required: false, image: ''
  });

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
    const res = await getProducts({ category: activeCat === 'all' ? undefined : activeCat, search: prodSearch || undefined });
    if (res.success) {
      // Calculate missing fields for fallback data if needed
      const enrichedProducts = res.products.map(p => ({
        ...p,
        discount_percent: p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : (p.discount_percent || 0)
      }));
      setProducts(enrichedProducts);
    }
    setProdLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [activeCat, prodSearch]);

  // ── Handlers ──
  const handleProdSubmit = async (e) => {
    e.preventDefault();
    if (editingProd) {
      await updateProduct(editingProd, prodForm);
    } else {
      await createProduct({ ...prodForm, sku: 'PP-NEW-' + Date.now(), is_featured: false, is_bestseller: false });
    }
    setShowProdForm(false); setEditingProd(null);
    setProdForm({ name: '', brand: '', category_id: 'must-haves', mrp: '', discount_percent: 0, price: '', stock: 0, description: '', prescription_required: false, image: '' });
    fetchProducts();
  };

  const handleProdEdit = (p) => {
    setProdForm({ ...p, mrp: p.mrp || '', price: p.price || '', stock: p.stock || 0, discount_percent: p.discount_percent || 0 }); 
    setEditingProd(p.id); setShowProdForm(true);
  };

  const handleProdDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    fetchProducts();
  };

  const filteredProds = products.filter(p =>
    !prodSearch || p.name?.toLowerCase().includes(prodSearch.toLowerCase()) || p.brand?.toLowerCase().includes(prodSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Package className="text-medical-blue" size={22} /> All Products</h2>
        <button onClick={() => { setShowProdForm(!showProdForm); setEditingProd(null); }} className="bg-medical-blue text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:bg-blue-600 transition flex items-center gap-1.5">
          <Plus size={16} /> {showProdForm && !editingProd ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCat('all')} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${activeCat === 'all' ? 'bg-medical-blue text-white border-medical-blue' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
          🏪 All Categories
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition ${activeCat === c.id ? 'bg-medical-blue text-white border-medical-blue' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Category Stats */}
      {activeCat !== 'all' && (() => {
        const cat = categories.find(c => c.id === activeCat);
        return cat ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
            <span className="text-3xl">{cat.icon}</span>
            <div>
              <h3 className="font-bold text-slate-800">{cat.name}</h3>
              <p className="text-xs text-slate-500">{cat.description} • <span className="font-bold text-medical-blue">{filteredProds.length} products</span></p>
            </div>
          </div>
        ) : null;
      })()}

      {/* Add/Edit Product Form */}
      {showProdForm && (
        <form onSubmit={handleProdSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h3 className="sm:col-span-2 font-bold text-slate-800 text-sm">{editingProd ? 'Edit Product' : 'Add New Product'}</h3>
          <input required type="text" placeholder="Product Name" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} />
          <input required type="text" placeholder="Brand" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.brand} onChange={e => setProdForm({...prodForm, brand: e.target.value})} />
          <select className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.category_id} onChange={e => setProdForm({...prodForm, category_id: e.target.value})}>
            <optgroup label="Main Categories">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              <option value="must-haves">Must Haves</option>
              <option value="vitamin-store">Vitamin Store</option>
              <option value="personal-care">Personal Care</option>
              <option value="homeopathy">Homeopathy Care</option>
              <option value="ayurvedic">Ayurvedic Care</option>
              <option value="diabetes-essentials">Diabetes Essentials</option>
            </optgroup>
            <optgroup label="Sexual Wellness & Supplements">
              <option value="sexual-wellness">Sexual Wellness (All)</option>
              <option value="sexual-wellness-otc">Sexual Wellness OTC</option>
              <option value="condoms">Condoms</option>
              <option value="vigor-vitality">Vigor & Vitality Supplements</option>
              <option value="shilajit">Shilajit</option>
              <option value="pregnancy-support">Pregnancy Support</option>
              <option value="oral-contraceptives">Oral Contraceptives</option>
              <option value="sexual-devices">Sexual Devices</option>
            </optgroup>
            <optgroup label="Other">
              <option value="otc">OTC Medicines</option>
              <option value="prescription">Prescription Medicines</option>
              <option value="devices">Medical Devices</option>
            </optgroup>
          </select>
          <input type="number" step="0.01" placeholder="MRP (₹)" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.mrp} onChange={e => setProdForm({...prodForm, mrp: e.target.value})} />
          <input type="number" step="0.01" placeholder="Selling Price (₹)" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} />
          <input type="number" placeholder="Discount %" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.discount_percent} onChange={e => setProdForm({...prodForm, discount_percent: e.target.value})} />
          <input type="number" placeholder="Stock Quantity" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.stock} onChange={e => setProdForm({...prodForm, stock: e.target.value})} />
          <input type="url" placeholder="Image URL" className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue" value={prodForm.image} onChange={e => setProdForm({...prodForm, image: e.target.value})} />
          <textarea placeholder="Description" rows={3} className="p-3 rounded-xl text-sm border outline-none focus:border-medical-blue sm:col-span-2 resize-none" value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} />
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input type="checkbox" checked={prodForm.prescription_required} onChange={e => setProdForm({...prodForm, prescription_required: e.target.checked})} />
            Prescription Required
          </label>
          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => { setShowProdForm(false); setEditingProd(null); }} className="px-6 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-100 transition">Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2.5 rounded-xl transition shadow-md text-xs">{editingProd ? 'Update Product' : 'Save Product'}</button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <div className="p-4 border-b flex items-center bg-slate-50 gap-2">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search products..." className="bg-transparent border-none outline-none text-sm w-full" value={prodSearch} onChange={e => setProdSearch(e.target.value)} />
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
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prodLoading ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-400">Loading products...</td></tr>
              ) : filteredProds.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-400">No products found in this category.</td></tr>
              ) : filteredProds.map(p => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-100" />}
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
                  <td className="p-4 text-slate-400 line-through text-xs">₹{p.mrp}</td>
                  <td className="p-4 font-bold text-green-600 text-xs">₹{p.price} <span className="text-[10px] text-orange-500 no-underline">({p.discount_percent}% off)</span></td>
                  <td className="p-4 font-bold text-xs">{p.stock > 10 ? <span className="text-green-600">{p.stock}</span> : p.stock > 0 ? <span className="text-orange-500">{p.stock} Low</span> : <span className="text-red-500">Out</span>}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleProdEdit(p)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"><Edit size={14} /></button>
                    <button onClick={() => handleProdDelete(p.id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition"><Trash2 size={14} /></button>
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
