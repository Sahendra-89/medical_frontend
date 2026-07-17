import React from 'react';

export default function OrderTab({ orders, handleUpdateOrderStatus }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Customer Order Management</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items Summary</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-bold text-slate-900">{o.id}</td>
                <td className="p-4 text-slate-700">{o.customer}</td>
                <td className="p-4 text-slate-600 max-w-xs truncate">{o.items}</td>
                <td className="p-4 font-black text-medical-blue">₹{o.total.toFixed(2)}</td>
                <td className="p-4"><span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">{o.payment}</span></td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-800' : o.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {o.status === 'confirmed' && (
                    <button onClick={() => handleUpdateOrderStatus(o.id, 'shipped')} className="bg-blue-100 hover:bg-blue-200 text-medical-blue font-bold px-3 py-1 rounded-lg text-[10px] transition">Mark Shipped</button>
                  )}
                  {o.status === 'shipped' && (
                    <button onClick={() => handleUpdateOrderStatus(o.id, 'delivered')} className="bg-green-100 hover:bg-green-200 text-green-700 font-bold px-3 py-1 rounded-lg text-[10px] transition">Mark Delivered</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
