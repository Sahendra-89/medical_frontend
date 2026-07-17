import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function InventoryTab({ inventory, setInventory }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Inventory & Stock Tracking</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <th className="p-4">SKU</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Quick Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-mono text-slate-500">{item.sku}</td>
                <td className="p-4 font-bold text-slate-900">{item.name}</td>
                <td className="p-4 text-slate-700">{item.brand}</td>
                <td className="p-4 text-slate-500 uppercase">{item.category}</td>
                <td className="p-4 font-black text-slate-900">₹{item.price.toFixed(2)}</td>
                <td className="p-4">
                  {item.stock < 20 ? (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <AlertCircle size={12} /> Low Stock ({item.stock})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <CheckCircle size={12} /> Healthy ({item.stock})
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => {
                    setInventory(inventory.map(i => i.id === item.id ? { ...i, stock: i.stock + 100 } : i));
                    alert(`Restocked +100 units for ${item.name}`);
                  }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-[10px] transition">
                    +100 Units
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
