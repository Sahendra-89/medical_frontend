"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  ShoppingCart,
  Heart,
  FileText,
  CheckCircle,
  AlertCircle,
  UploadCloud,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { getProductById, getProducts } from "../../../lib/api";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../../components/ProductCard";
import PrescriptionModal from "../../../components/PrescriptionModal";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rxModal, setRxModal] = useState(false);
  const [uploadedRx, setUploadedRx] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        if (res.product) {
          setProduct(res.product);
          // Fetch related
          const rel = await getProducts({
            category: res.product.category_id,
            limit: 4,
          });
          if (rel.products) {
            setRelatedProducts(
              rel.products.filter((p) => p.id !== res.product.id),
            );
          }
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 text-center">
        <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm font-semibold text-slate-500">
          Loading product details...
        </p>
      </div>
    );
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
        <button
          onClick={() => router.push("/shop")}
          className="bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.prescription_required && !uploadedRx) {
      setRxModal(true);
      return;
    }
    addToCart(product, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(product.category_id
            ? [
                {
                  label: product.category_id,
                  href: `/shop?category=${product.category_id}`,
                },
              ]
            : []),
          { label: product.name },
        ]}
      />

      {/* Back Link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Main Detail Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Product Image */}
        <div className="lg:col-span-5 relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-8 group aspect-square">
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"
            }
            alt={product.name}
            fetchPriority="high"
            className="w-full h-full max-h-96 object-contain group-hover:scale-105 transition duration-500"
          />

          {product.discount_percent > 0 && (
            <span className="absolute top-4 left-4 bg-green-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-sm">
              {product.discount_percent}% OFF
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-red-500 hover:bg-white transition shadow-sm"
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-red-500 text-red-500" : ""}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Brand, SKU & Category */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                  {product.brand}
                </span>
                <span className="text-xs font-bold text-medical-blue uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                  {product.category_id}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                SKU: {product.sku}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating || 4.5)
                        ? "fill-amber-400"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {product.rating || 4.5}
              </span>
              <span className="text-xs text-slate-400">
                ({product.review_count || 128} customer reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.discount_percent > 0 && (
                    <span className="text-sm text-slate-400 line-through font-bold">
                      MRP ₹{product.mrp}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Inclusive of all taxes & local Gurgaon delivery charges
                </p>
              </div>

              {/* Stock Status Badge */}
              <div>
                {product.stock > 10 ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold">
                    <CheckCircle size={16} /> In Stock ({product.stock} units
                    available)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-4 py-2 rounded-xl text-xs font-bold">
                    <AlertCircle size={16} /> Limited Stock ({product.stock}{" "}
                    units left)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-2 rounded-xl text-xs font-bold">
                    <AlertCircle size={16} /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Prescription Requirement Box */}
            {product.prescription_required && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-start gap-3">
                  <FileText
                    size={24}
                    className="text-amber-600 mt-0.5 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-amber-900">
                      Prescription Required (Schedule H / X Drug)
                    </h3>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      This medicine requires a valid doctor's prescription. Our
                      registered pharmacist will verify the uploaded
                      prescription before dispatch.
                    </p>
                  </div>
                </div>

                {/* Upload Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span>Status:</span>
                    {uploadedRx ? (
                      <span className="text-green-700 flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                        <CheckCircle size={14} /> Prescription Attached (ID: #
                        {uploadedRx.id})
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
                        No prescription uploaded yet
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setRxModal(true)}
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                  >
                    <UploadCloud size={16} />{" "}
                    {uploadedRx
                      ? "Re-upload Prescription"
                      : "Upload Prescription Now"}
                  </button>
                </div>
              </div>
            )}

            {/* Description & Usage Tabs/Sections */}
            <div className="space-y-6 pt-4 border-t border-slate-100 flex-1">
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">
                  Advantages & Description
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-medical-blue" /> Uses
                    & Instructions
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.usage_instructions ||
                      "Take as directed by your physician or healthcare professional."}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-amber-600" />{" "}
                    Potential Side Effects
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.side_effects ||
                      "Generally well tolerated. Consult doctor if any unusual symptoms occur."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-inner">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                -
              </button>
              <span className="w-12 text-center font-bold text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition shadow-lg ${
                product.stock > 0
                  ? "bg-medical-blue text-white hover:bg-blue-600 hover:shadow-xl"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />{" "}
              {product.prescription_required && !uploadedRx
                ? "Upload Rx & Add to Cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Trust guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <ShieldCheck size={32} className="text-medical-blue" />
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Genuine Product Guarantee
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Directly from brand manufacturers
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Truck size={32} className="text-green-600" />
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Same Day Delivery
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Gurgaon, Delhi NCR & Faridabad
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <RefreshCw size={32} className="text-purple-600" />
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Automated Monthly Refill
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Subscribe & save 10% extra on refills
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
            Similar Products in Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      <PrescriptionModal
        isOpen={rxModal}
        onClose={() => setRxModal(false)}
        onSuccess={(rx) => {
          setUploadedRx(rx);
          addToCart(product, qty);
        }}
      />
    </div>
  );
}
