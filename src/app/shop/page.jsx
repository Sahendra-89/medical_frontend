"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { getProducts, getCategories } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const catRes = await getCategories();
        if (catRes.categories) setCategories(catRes.categories);

        const prodRes = await getProducts({
          category,
          limit: 50,
        });

        if (prodRes.products) {
          setProducts(prodRes.products);
        }
      } catch (err) {
        console.error("Error fetching shop data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
      <Breadcrumbs
        items={
          category
            ? [
                { label: "Shop", href: "/shop" },
                {
                  label:
                    categories.find((c) => c.id === category)?.name || category,
                },
              ]
            : [{ label: "Shop" }]
        }
      />

      {/* Header */}
      <div className="flex flex-col mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {category
            ? categories.find((c) => c.id === category)?.name ||
              "Category Products"
            : "All Products"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Browse our complete catalog of genuine medicines, healthcare devices,
          and wellness products
        </p>
      </div>

      {/* Product Count */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-slate-600">
          Showing <span className="text-slate-900">{products.length}</span>{" "}
          Products
        </span>
      </div>

      {/* Product Grid — full width */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-80 bg-slate-100 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center justify-center">
          <SlidersHorizontal size={48} className="text-slate-300 mb-4" />
          <h3 className="font-bold text-lg text-slate-900">
            No products found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            We couldn&apos;t find any products in this category. Try browsing
            all products.
          </p>
          <button
            onClick={() => {
              setCategory("");
              router.push("/shop");
            }}
            className="mt-6 bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-medical-blue2 transition shadow-blue"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading shop catalog...</div>}
    >
      <ShopContent />
    </Suspense>
  );
}
