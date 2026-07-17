import React from "react";
import {
  ShieldCheck,
  Truck,
  Clock,
  RotateCcw,
  BadgePercent,
  Star,
} from "lucide-react";

const BADGES = [
  {
    icon: <ShieldCheck size={26} />,
    color: "bg-blue-50 text-medical-blue",
    title: "100% Genuine",
    sub: "Verified licensed stock",
  },
  {
    icon: <Truck size={26} />,
    color: "bg-green-50 text-green-600",
    title: "Same-Day Delivery",
    sub: "Gurgaon, Delhi & NCR",
  },
  {
    icon: <BadgePercent size={26} />,
    color: "bg-orange-50 text-orange-600",
    title: "Up to 30% OFF",
    sub: "On generics & OTC brands",
  },
  {
    icon: <Clock size={26} />,
    color: "bg-sky-50 text-sky-600",
    title: "24/7 Ordering",
    sub: "Online + WhatsApp orders",
  },
  {
    icon: <RotateCcw size={26} />,
    color: "bg-purple-50 text-purple-600",
    title: "Easy Refills",
    sub: "Monthly subscription plans",
  },
  {
    icon: <Star size={26} />,
    color: "bg-amber-50 text-amber-600",
    title: "Expert Pharmacist",
    sub: "Every order verified",
  },
];

const TrustBadges = () => {
  return (
    <div className="bg-white border-y border-slate-100 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors duration-200 group cursor-default"
            >
              <div
                className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform duration-200`}
              >
                {badge.icon}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 leading-tight truncate">
                  {badge.title}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  {badge.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
