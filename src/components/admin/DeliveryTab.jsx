"use client";
import { useState } from 'react';
import { Truck, MapPin, CheckCircle, Clock, Package, RefreshCw } from 'lucide-react';

const STAGES = ['Order Confirmed','Packed','Dispatched','Out for Delivery','Delivered'];
const MOCK = [
  { id:'ORD-001', customer:'Rajesh Kumar', address:'Sector 14, Gurgaon, 122001', phone:'9876543210', items:'Crocin (x2), Digene (x1)', stage:1, courier:'Local Delivery', tracking:'TRK-GUR-9001', eta:'Today 4 PM', distance:'3.2 km' },
  { id:'ORD-002', customer:'City Hospital', address:'DLF Phase 3, Gurgaon, 122002', phone:'9999988888', items:'Omron BP Monitor (x2)', stage:3, courier:'Blue Dart', tracking:'BD-9876543', eta:'Tomorrow 12 PM', distance:'7.5 km' },
  { id:'ORD-003', customer:'Priya Sharma', address:'Sushant Lok, Gurgaon, 122009', phone:'8888877777', items:'Metformin (x3)', stage:4, courier:'Local Delivery', tracking:'TRK-GUR-9002', eta:'Delivered', distance:'5.1 km' },
];

const STAGE_COLORS = ['bg-slate-200 text-slate-600','bg-amber-400 text-white','bg-blue-500 text-white','bg-orange-500 text-white','bg-green-500 text-white'];

export default function DeliveryTab() {
  const [orders, setOrders] = useState(MOCK);
  const advance = (id) => setOrders(orders.map(o=>o.id===id&&o.stage<4?{...o,stage:o.stage+1}:o));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900">Delivery Tracking System</h2>
        <p className="text-xs text-slate-500 mt-1">Monitor real-time delivery status for all active orders</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{label:'Active Deliveries',val:'2',color:'text-blue-600',bg:'bg-blue-50 border-blue-200'},{label:'Delivered Today',val:'1',color:'text-green-600',bg:'bg-green-50 border-green-200'},{label:'Avg Delivery Time',val:'2.4 hrs',color:'text-purple-600',bg:'bg-purple-50 border-purple-200'}].map((s,i)=>(
          <div key={i} className={`border ${s.bg} rounded-2xl p-4`}>
            <p className="text-xs font-bold text-slate-500">{s.label}</p>
            <p className={`text-2xl font-black ${s.color} mt-1`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map(o=>(
          <div key={o.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-slate-900">{o.id} — {o.customer}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={11}/>{o.address}</p>
                <p className="text-xs text-slate-500">{o.phone} · {o.items}</p>
              </div>
              <div className="text-right text-xs">
                <p className="font-bold text-slate-700">{o.courier}</p>
                <p className="text-slate-400">{o.tracking}</p>
                <p className="text-blue-600 font-semibold">{o.distance} away</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                {STAGES.map((s,i)=>(
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition ${i<=o.stage?STAGE_COLORS[i]:'bg-slate-100 text-slate-400'}`}>
                      {i<o.stage?<CheckCircle size={12}/>:i===o.stage?<Truck size={12}/>:<span>{i+1}</span>}
                    </div>
                    {i<STAGES.length-1&&<div className={`h-0.5 w-full mt-3 ${i<o.stage?'bg-green-400':'bg-slate-200'}`}/>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {STAGES.map((s,i)=>(
                  <p key={i} className={`text-[9px] font-bold text-center flex-1 ${i===o.stage?'text-blue-600':i<o.stage?'text-green-600':'text-slate-400'}`}>{s}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500"><Clock size={12}/> ETA: <span className="font-bold text-slate-800">{o.eta}</span></div>
              {o.stage<4&&(
                <button onClick={()=>advance(o.id)} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition">
                  <RefreshCw size={12}/> Advance Stage
                </button>
              )}
              {o.stage===4&&<span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl"><CheckCircle size={12}/>Delivered</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
