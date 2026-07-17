"use client";
import { MessageCircle, Info } from 'lucide-react';

export default function MedicineActions({ medicineName, companyName }) {
  const whatsappMessage = `Hello, I would like to order: ${medicineName} (Company: ${companyName})`;

  const handleEnquiry = () => {
    alert(`Enquiry submitted for ${medicineName}. Our team will contact you shortly.`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <a
        href={`https://wa.me/918285508282?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center font-bold py-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
      >
        <MessageCircle size={20} /> Order via WhatsApp
      </a>
      <button
        onClick={handleEnquiry}
        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-center font-bold py-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
      >
        <Info size={20} /> General Enquiry
      </button>
    </div>
  );
}
