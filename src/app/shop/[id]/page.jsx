import React from "react";
import Link from "next/link";
import { getProductById, getProducts } from "../../../lib/api";
import ProductDetailClient from "../../../components/ProductDetailClient";

// ─── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return [{ id: "72" }, { id: "72-give" }];
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const res = await getProductById(id);
    const product = res?.product;
    if (!product) return { title: "Product Not Found | Paridhi Pharma" };

    return {
      title: `${product.name} - Buy Online | Paridhi Pharma`,
      description: `${product.description?.substring(0, 150) || "N/A"}... Order genuine medicines with fast same-day delivery.`,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.image || "/placeholder.png" }],
      },
    };
  } catch {
    return { title: "Product Details | Paridhi Pharma" };
  }
}

// ─── Server-Side Rendered Page ───────────────────────────────────────────────
export default async function ProductDetailPage({ params }) {
  const { id } = params;
  let product = null;
  let relatedProducts = [];

  try {
    const res = await getProductById(id);
    product = res?.product || null;

    if (product) {
      const rel = await getProducts({
        category: product.category_id,
        limit: 5,
      });
      if (rel.products) {
        relatedProducts = rel.products.filter((p) => p.id !== product.id).slice(0, 4);
      }
    }
  } catch (err) {
    console.error("Error fetching product on server:", err);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 text-center">
        <h3 className="font-bold text-xl text-slate-900 mb-2">
          Product Not Found
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
