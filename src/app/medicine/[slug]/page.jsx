import React from "react";
import { getMedicineBySlug, getMedicines } from "../../../lib/api";
import Link from "next/link";
import {
  Shield,
  Info,
  AlertTriangle,
  Pill,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import MedicineActions from "../../../components/MedicineActions";

// ─── generateStaticParams ────────────────────────────────────────────────────
// Pre-renders known slugs at build time so Vercel doesn't hit the API at build.
// Falls back to static medicines if the API is unavailable.
export async function generateStaticParams() {
  try {
    const res = await getMedicines({ limit: 100 });
    const medicines = res?.data || [];
    return medicines
      .filter((m) => m?.slug)
      .map((m) => ({ slug: String(m.slug) }));
  } catch {
    // Return static slugs so the build never fails
    return [
      { slug: "paracetamol-500mg-cipla" },
      { slug: "honitus-cough-syrup-dabur" },
      { slug: "boroline-antiseptic-cream" },
    ];
  }
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  try {
    // Next.js 15: params must be awaited
    const { slug } = await params;
    const res = await getMedicineBySlug(slug);
    const medicine = res?.data;
    if (!medicine) return { title: "Medicine Not Found" };

    return {
      title: `${medicine.medicine_name} - ${medicine.company_name} | Paridhi Pharma`,
      description: `Buy ${medicine.medicine_name} online. Uses: ${
        medicine.usage?.substring(0, 80) || "N/A"
      }... Learn about side effects, dosage, and price at Paridhi Pharma.`,
      openGraph: {
        title: `${medicine.medicine_name} - Buy Online`,
        description: `Information and uses of ${medicine.medicine_name}.`,
        images: [{ url: medicine.image_url || "/placeholder-medicine.png" }],
      },
    };
  } catch {
    return { title: "Medicine Details | Paridhi Pharma" };
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function MedicineDetailPage({ params }) {
  // Next.js 15: params must be awaited
  const { slug } = await params;

  let data = null;
  let related = [];

  try {
    const res = await getMedicineBySlug(slug);
    data = res?.data ?? null;
    related = Array.isArray(res?.related) ? res.related : [];
  } catch {
    // Any error → show not-found UI (never crash the build)
  }

  // ── Not Found UI ──────────────────────────────────────────────────────────
  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Medicine Not Found
          </h1>
          <p className="text-slate-500 mb-6">
            The medicine you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/medicine"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold"
          >
            <ArrowLeft size={18} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // ── Schema Markup ─────────────────────────────────────────────────────────
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: data.medicine_name,
    image: data.image_url,
    description: data.description,
    brand: {
      "@type": "Brand",
      name: data.company_name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: data.price,
      availability:
        (data.stock_quantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Medicines", href: "/medicine" },
            ...(data.category
              ? [
                  {
                    label: data.category,
                    href: `/medicine?category=${data.category}`,
                  },
                ]
              : []),
            { label: data.medicine_name },
          ]}
        />

        {/* Back Link */}
        <Link
          href="/medicine"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition"
        >
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        {/* Product Header Section */}
        <div className="bg-white rounded-3xl p-6 lg:p-12 border border-slate-200 shadow-sm mb-12 flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center p-8 relative overflow-hidden">
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.medicine_name}
                  className="object-contain w-full h-full mix-blend-multiply"
                />
              ) : (
                <div className="text-slate-300 font-bold text-2xl">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold w-max mb-4">
              <Pill size={14} /> {data.category || "Medicine"}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
              {data.medicine_name}
            </h1>
            <p className="text-lg text-slate-500 font-medium mb-6">
              By {data.company_name}
            </p>

            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
              <span className="text-4xl font-black text-slate-900">
                ₹{data.price ?? "—"}
              </span>
              {(data.stock_quantity ?? 0) > 0 ? (
                <span className="text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-bold mb-1.5">
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 bg-red-50 px-3 py-1 rounded-lg text-xs font-bold mb-1.5">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Action Buttons — client component to allow onClick handlers */}
            <MedicineActions
              medicineName={data.medicine_name}
              companyName={data.company_name}
            />
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Info size={22} className="text-blue-600" /> Description
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.description || "No detailed description available."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Stethoscope size={22} className="text-blue-600" /> Uses &amp;
                Dosage
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-2">
                    Primary Uses
                  </h3>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                    {data.usage || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-2">
                    Recommended Dosage
                  </h3>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                    {data.dosage ||
                      "Please consult your doctor for dosage instructions."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10"></div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-red-50 pb-4">
                <AlertTriangle size={22} className="text-red-500" /> Precautions
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.precautions || "Always consult a doctor before use."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10"></div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-orange-50 pb-4">
                <Shield size={22} className="text-orange-500" /> Side Effects
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {data.side_effects ||
                  "May cause mild side effects. Stop use if allergic reaction occurs."}
              </p>
            </div>
          </div>
        </div>

        {/* Related Medicines */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-8">
              Related Medicines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((med) => (
                <Link
                  href={`/medicine/${med.slug}`}
                  key={med.id}
                  className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300"
                >
                  <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center p-2">
                    {med.image_url ? (
                      <img
                        src={med.image_url}
                        alt={med.medicine_name}
                        className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="text-slate-300 text-xs font-bold">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-600 transition">
                    {med.medicine_name}
                  </h3>
                  <div className="font-black text-md text-slate-900">
                    ₹{med.price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Global Disclaimer */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center">
          <p className="text-xs text-slate-600 font-medium max-w-4xl mx-auto flex items-center justify-center gap-2">
            <Shield size={16} className="text-blue-600" />
            <strong className="text-blue-600">Disclaimer:</strong> Medicine
            information is for educational purposes only. Consult a qualified
            healthcare professional before use.
          </p>
        </div>
      </div>
    </div>
  );
}
