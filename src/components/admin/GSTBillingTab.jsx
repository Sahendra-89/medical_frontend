"use client";
import { useState } from 'react';
import { FileText, Download, Printer, CheckCircle, Building } from 'lucide-react';

const GST_RATES = { OTC: 12, Prescription: 5, Devices: 18, Wellness: 12, 'Baby Care': 0, 'Personal Care': 18 };
const MOCK_ORDERS = [
  { id: 'ORD-20260616-001', date: '2026-06-16', customer: 'Rajesh Kumar', gstin: '', address: 'Sector 14, Gurgaon, Haryana 122001', items: [{ name: 'Crocin Advance 500mg', category: 'OTC', qty: 2, rate: 35.70 }, { name: 'Digene Gel 200ml', category: 'OTC', qty: 1, rate: 101.20 }] },
  { id: 'ORD-20260615-002', date: '2026-06-15', customer: 'City Hospital Pharmacy', gstin: '06AADFC2230M1ZP', address: 'DLF Phase 3, Gurgaon, Haryana 122002', items: [{ name: 'Omron BP Monitor HEM-7120', category: 'Devices', qty: 2, rate: 1499.25 }, { name: 'Amoxicillin 500mg', category: 'Prescription', qty: 5, rate: 68.00 }] },
];

function calcGST(items) {
  return items.map(item => {
    const gstRate = GST_RATES[item.category] || 12;
    const taxable = item.qty * item.rate;
    const cgst = taxable * (gstRate / 2) / 100;
    const sgst = taxable * (gstRate / 2) / 100;
    return { ...item, taxable, gstRate, cgst, sgst, total: taxable + cgst + sgst };
  });
}

function Invoice({ order, onClose }) {
  const items = calcGST(order.items);
  const subtotal = items.reduce((a, i) => a + i.taxable, 0);
  const totalCGST = items.reduce((a, i) => a + i.cgst, 0);
  const totalSGST = items.reduce((a, i) => a + i.sgst, 0);
  const grandTotal = items.reduce((a, i) => a + i.total, 0);
  const isB2B = !!order.gstin;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl" id="invoice-print">
        {/* Invoice Header */}
        <div className="bg-slate-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-black text-lg">TAX INVOICE</h2>
              <p className="text-slate-300 text-xs mt-0.5">Paridhi Pharma & Surgical</p>
              <p className="text-slate-400 text-[10px]">Shop No. 4, VPO Jharsa, near police choaki, Gurgaon, Haryana - 122001</p>
              <p className="text-slate-400 text-[10px]">GSTIN: 06AADFC2230M1ZP | Drug Lic: HR-GUR-2026-98765</p>
            </div>
            <div className="text-right">
              <p className="font-black text-xl">{order.id}</p>
              <p className="text-slate-300 text-xs">{order.date}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Bill to */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="font-black text-slate-500 text-[10px] uppercase mb-1">Bill To</p>
              <p className="font-bold text-slate-800">{order.customer}</p>
              <p className="text-slate-500">{order.address}</p>
              {order.gstin && <p className="text-blue-600 font-bold mt-1">GSTIN: {order.gstin}</p>}
              {!order.gstin && <p className="text-slate-400 italic">B2C Consumer</p>}
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <p className="font-black text-slate-500 text-[10px] uppercase mb-1">Invoice Details</p>
              <p className="text-slate-600">Type: <span className="font-bold">{isB2B ? 'B2B Tax Invoice' : 'B2C Invoice'}</span></p>
              <p className="text-slate-600">Supply Type: <span className="font-bold">Intra-State (Haryana)</span></p>
              <p className="text-slate-600">Place of Supply: <span className="font-bold">06 — Haryana</span></p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-800 text-white">
                <tr>{['Item', 'HSN', 'Cat', 'Qty', 'Rate', 'Taxable Amt', 'GST%', 'CGST', 'SGST', 'Total'].map(h => <th key={h} className="px-3 py-2 text-left whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 font-bold max-w-[140px]"><p className="truncate">{item.name}</p></td>
                    <td className="px-3 py-2 text-slate-400">3004</td>
                    <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{item.category}</span></td>
                    <td className="px-3 py-2">{item.qty}</td>
                    <td className="px-3 py-2">₹{item.rate.toFixed(2)}</td>
                    <td className="px-3 py-2 font-bold">₹{item.taxable.toFixed(2)}</td>
                    <td className="px-3 py-2 font-bold text-blue-600">{item.gstRate}%</td>
                    <td className="px-3 py-2">₹{item.cgst.toFixed(2)}</td>
                    <td className="px-3 py-2">₹{item.sgst.toFixed(2)}</td>
                    <td className="px-3 py-2 font-black text-slate-900">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold text-xs border-t border-slate-200">
                <tr><td colSpan={5} className="px-3 py-2 text-right">Subtotal:</td><td className="px-3 py-2">₹{subtotal.toFixed(2)}</td><td /><td className="px-3 py-2">₹{totalCGST.toFixed(2)}</td><td className="px-3 py-2">₹{totalSGST.toFixed(2)}</td><td className="px-3 py-2 text-blue-700">₹{grandTotal.toFixed(2)}</td></tr>
              </tfoot>
            </table>
          </div>

          {/* Grand Total */}
          <div className="bg-slate-900 text-white rounded-xl p-4 flex justify-between items-center">
            <div><p className="text-xs text-slate-300">Grand Total (Incl. GST)</p><p className="text-[10px] text-slate-400">CGST: ₹{totalCGST.toFixed(2)} + SGST: ₹{totalSGST.toFixed(2)}</p></div>
            <p className="text-2xl font-black">₹{grandTotal.toFixed(2)}</p>
          </div>

          <p className="text-[10px] text-slate-400 text-center">This is a computer-generated invoice and is valid without a signature. • Goods once sold are non-returnable except in case of manufacturing defect.</p>

          <div className="flex gap-2 justify-end">
            <button onClick={onClose} className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Close</button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"><Printer size={13} />Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GSTBillingTab() {
  const [selected, setSelected] = useState(null);

  const getTotal = (order) => {
    const items = calcGST(order.items);
    return items.reduce((a, i) => a + i.total, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900">GST Billing & Tax Invoices</h2>
        <p className="text-xs text-slate-500 mt-1">Generate CGST/SGST compliant invoices for B2B and B2C orders</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ label: 'Invoices This Month', val: '42', color: 'text-black -600', bg: 'bg-blue-50 border-blue-200' }, { label: 'GST Collected', val: '₹8,234', color: 'text-black-600', bg: 'bg-black-50 border-black-200' }, { label: 'B2B Invoices', val: '12', color: 'text-black-600', bg: 'bg-green-50 border-green-200' }].map((s, i) => (
          <div key={i} className={`border ${s.bg} rounded-2xl p-4`}>
            <p className="text-xs font-bold text-slate-500">{s.label}</p>
            <p className={`text-2xl font-black ${s.color} mt-1`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold text-sm text-slate-900">{order.id}</p>
              <p className="text-xs text-slate-500">{order.customer} · {order.date}</p>
              {order.gstin ? <p className="text-xs text-blue-600 font-semibold mt-0.5"><Building size={10} className="inline mr-1" />B2B · GSTIN: {order.gstin}</p> : <p className="text-xs text-slate-400">B2C Consumer</p>}
              <p className="text-xs text-slate-500 mt-0.5">{order.items.length} item(s): {order.items.map(i => i.name).join(', ')}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-black text-base text-slate-900">₹{getTotal(order).toFixed(2)}</p>
              <button onClick={() => setSelected(order)} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition">
                <FileText size={13} />Generate Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && <Invoice order={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
