"use client";
import { useState } from 'react';
import { AlertTriangle, Package, RefreshCw, TrendingDown, Plus, Minus } from 'lucide-react';

const INIT_STOCK = [
  { id: 1, name: 'Crocin Advance 500mg', sku: 'PP-OTC-001', category: 'OTC', stock: 250, minStock: 50, price: 35.70, supplier: 'GSK India', lastUpdated: '2026-06-15' },
  { id: 2, name: 'Amoxicillin 500mg', sku: 'PP-RX-001', category: 'Prescription', stock: 12, minStock: 30, price: 68.00, supplier: 'Cipla Ltd', lastUpdated: '2026-06-14' },
  { id: 3, name: 'Omron BP Monitor', sku: 'PP-DEV-001', category: 'Devices', stock: 5, minStock: 10, price: 1499.25, supplier: 'Omron Healthcare', lastUpdated: '2026-06-13' },
  { id: 4, name: 'Himalaya Liv.52', sku: 'PP-WEL-001', category: 'Wellness', stock: 400, minStock: 100, price: 148.75, supplier: 'Himalaya Drug Co', lastUpdated: '2026-06-15' },
  { id: 5, name: 'Vicks VapoRub 50ml', sku: 'PP-OTC-002', category: 'OTC', stock: 8, minStock: 20, price: 130.50, supplier: 'P&G India', lastUpdated: '2026-06-12' },
  { id: 6, name: 'Metformin 500mg', sku: 'PP-RX-002', category: 'Prescription', stock: 350, minStock: 50, price: 31.50, supplier: 'USV Pharma', lastUpdated: '2026-06-16' },
];

export default function InventoryTab() {
  const [stock, setStock] = useState(INIT_STOCK);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const adjust = (id, delta) => setStock(stock.map(s => s.id === id ? { ...s, stock: Math.max(0, s.stock + delta), lastUpdated: new Date().toISOString().slice(0, 10) } : s));
  const low = stock.filter(s => s.stock <= s.minStock);
  const filtered = stock
    .filter(s => filter === 'low' ? s.stock <= s.minStock : true)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900">Inventory Tracking</h2>
        <p className="text-xs text-slate-500 mt-1">Monitor stock levels and get low-stock alerts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-black-200 rounded-2xl p-4"><p className="text-xs font-bold text-slate-500">Total SKUs</p><p className="text-2xl font-black text-blue-700">{stock.length}</p></div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4"><p className="text-xs font-bold text-slate-500">Low Stock Alerts</p><p className="text-2xl font-black text-red-600">{low.length}</p></div>
        <div className="bg-black-50 border border-black-200 rounded-2xl p-4"><p className="text-xs font-bold text-slate-500">Total Stock Value</p><p className="text-2xl font-black text-black">₹{stock.reduce((a, s) => a + (s.stock * s.price), 0).toFixed(0)}</p></div>
      </div>

      {low.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="flex items-center gap-2 text-xs font-black text-red-700 mb-2"><AlertTriangle size={14} />LOW STOCK ALERTS</p>
          <div className="flex flex-wrap gap-2">
            {low.map(s => <span key={s.id} className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">{s.name}: {s.stock} left</span>)}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 items-center">
        <input className="flex-1 min-w-[200px] bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none" placeholder="Search by name or SKU..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex gap-2">
          {['all', 'low'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f === 'low' ? '⚠ Low Stock' : 'All Stock'}</button>)}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b">
            <tr>{['Product', 'SKU', 'Category', 'Stock', 'Min Stock', 'Value', 'Last Updated', 'Adjust'].map(h => <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className={`border-b transition ${s.stock <= s.minStock ? 'bg-red-50/40 hover:bg-red-50' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3 font-bold text-slate-800 max-w-[180px]"><p className="truncate">{s.name}</p><p className="text-slate-400 font-normal">{s.supplier}</p></td>
                <td className="px-4 py-3 font-mono text-slate-500">{s.sku}</td>
                <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{s.category}</span></td>
                <td className="px-4 py-3">
                  <span className={`font-black text-sm ${s.stock <= s.minStock ? 'text-red-600' : 'text-green-700'}`}>{s.stock}</span>
                  {s.stock <= s.minStock && <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">LOW</span>}
                </td>
                <td className="px-4 py-3 text-slate-500">{s.minStock}</td>
                <td className="px-4 py-3 font-bold text-slate-700">₹{(s.stock * s.price).toFixed(0)}</td>
                <td className="px-4 py-3 text-slate-400">{s.lastUpdated}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => adjust(s.id, -10)} className="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"><Minus size={12} /></button>
                    <button onClick={() => adjust(s.id, 10)} className="p-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition"><Plus size={12} /></button>
                    <button onClick={() => adjust(s.id, 50)} className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold rounded-lg transition">+50</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
