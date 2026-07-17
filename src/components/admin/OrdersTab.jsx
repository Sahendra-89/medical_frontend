"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../lib/api';

const STATUS_COLORS = {
  confirmed: 'bg-amber-100 text-amber-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrders();
    if (res.orders) setOrders(res.orders);
    setLoading(false);
  };

  const update = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Order Management</h2>
        <div className="flex gap-2 flex-wrap">
          {['all','confirmed','shipped','delivered','cancelled'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filter===s?'bg-blue-600 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-12 text-slate-400 text-sm">Loading orders...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-12 text-slate-400 text-sm">No orders found.</p>
        ) : (
          filtered.map(order => (
            <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-sm text-slate-900">{order.id}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    <span className="text-slate-700">{order.customerName || order.customer || 'Guest User'}</span>
                    {order.customerPhone && ` · ${order.customerPhone}`}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {order.shippingAddress?.substring(0, 40) || 'No address provided'}... · {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-600">{order.paymentMethod || 'COD'}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold capitalize ${STATUS_COLORS[order.status] || STATUS_COLORS.confirmed}`}>{order.status}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                📦 {order.items?.map(i => `${i.name} (x${i.qty})`).join(', ') || 'Various items'}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <span className="font-black text-base text-blue-700">₹{(order.finalAmount || order.total || 0).toFixed(2)}</span>
                <div className="flex gap-2 flex-wrap">
                  {['confirmed', 'shipped', 'delivered', 'cancelled'].filter(s => s !== order.status).map(s => (
                    <button key={s} onClick={() => update(order.id, s)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition capitalize ${s === 'cancelled' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      → {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
