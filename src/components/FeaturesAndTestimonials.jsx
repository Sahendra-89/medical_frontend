import React from "react";
import { ShieldCheck, Clock, FileText, Star } from "lucide-react";

const FEATURES = [
  {
    icon: <ShieldCheck size={28} className="text-blue-600" />,
    iconBg: "bg-blue-50",
    title: "100% Genuine",
    description: "Every product sourced from licensed manufacturers only",
  },
  {
    icon: <Clock size={28} className="text-orange-500" />,
    iconBg: "bg-orange-50",
    title: "Same-Day Delivery",
    description: "Order before 4 PM for guaranteed same-day delivery",
  },
  {
    icon: <FileText size={28} className="text-sky-500" />,
    iconBg: "bg-sky-50",
    title: "Easy Rx Upload",
    description: "Upload prescription & get medicines delivered to your door",
  },
  {
    icon: <Star size={28} className="text-amber-500" />,
    iconBg: "bg-amber-50",
    title: "4.8★ Rated",
    description: "Loved by 5000+ customers across Gurgaon and NCR",
  },
];

const REVIEWS = [
  {
    text: '"Fast delivery and genuine products. Ordered BP monitor and monthly medicines — all arrived same day!"',
  },
  {
    text: '"Found all my monthly medicines at great discounts. Prescription upload was very convenient."',
  },
  {
    text: '"Good range of products. Same-day delivery in Gurgaon is amazing. Highly recommended."',
  },
  {
    text: '"As a clinic owner I love the bulk ordering. Great B2B prices and reliable service."',
  },
];

export default function FeaturesAndTestimonials() {
  return (
    <div className="w-full bg-white">
      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2">
            Why Choose Paridhi Pharma?
          </h2>
          <p className="text-slate-500 font-medium">
            Trusted by thousands of families and clinics across Delhi NCR
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition duration-300"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${feature.iconBg}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-8 sm:py-8 px-4 sm:px-4 lg:px-8 max-w-6xl mx-auto border-t border-slate-100">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 font-medium">
            Trusted by families, clinics, and retail buyers across Delhi NCR
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
