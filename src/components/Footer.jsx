"use client";

import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Pill,
  FileText,
  Monitor,
  Salad,
  ShoppingBag,
  Baby,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

/* ─────────────────────────────────────────
   Reusable: Section Heading with blue line
───────────────────────────────────────── */
const SectionHeading = ({ children }) => (
  <div className="mb-4">
    <h4 className="text-[#1e3a6e] font-bold text-[15px] mb-2 tracking-[0.2px]">
      {children}
    </h4>
    <div className="w-9 h-[3px] bg-gradient-to-r from-orange-500 to-orange-400 rounded-sm" />
  </div>
);

/* ─────────────────────────────────────────
   Reusable: Contact icon badge
───────────────────────────────────────── */
const ContactBadge = ({ icon }) => (
  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
    {icon}
  </div>
);

/* ─────────────────────────────────────────
   Main Footer
───────────────────────────────────────── */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 font-sans">
      {/* ══ Top accent line ══ */}
      <div className="h-1 bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-orange-500" />

      {/* ══ Main Grid ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ── Brand Column ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center mb-4 hover:opacity-85 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Paridhi Pharma"
                className="h-16 sm:h-20 w-auto object-contain block"
              />
            </Link>

            {/* Description */}
            <p className="text-[13.5px] text-slate-500 leading-[1.8] mb-4 max-w-xs">
              MediCure is a leading B2C &amp; B2B pharmaceutical e-commerce
              platform offering genuine medicines, devices, and wellness
              products across Wellness City.
            </p>

            {/* License Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 mb-5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <ShieldCheck size={15} color="#2563eb" />
                <span className="text-[#1e3a6e] font-bold text-[13px]">
                  Legal Compliance &amp; Licenses
                </span>
              </div>
              {[
                [
                  "Drug Licence Details",
                  "Form 20: RLF20HR2025001073, Form 20B: WLF20B2025HR000348, Form 21: RLF21HR2025001068, Form 21B: WLF21B2025HR000346, GSTIN: ( 06ESAPS2100F1Z9)",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="text-[12.5px] text-slate-500 mb-0.5 leading-[1.65]"
                >
                  <span className="text-slate-400">{k}: </span>
                  <span className="text-[#1e3a6e] font-bold">{v}</span>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5 items-center">
              {[
                {
                  icon: <Facebook size={17} />,
                  href: "#",
                  label: "Facebook",
                  hoverBg: "#1877f2",
                },
                {
                  icon: <Instagram size={17} />,
                  href: "#",
                  label: "Instagram",
                  hoverBg: "#e1306c",
                },
                {
                  icon: <Twitter size={17} />,
                  href: "#",
                  label: "Twitter",
                  hoverBg: "#1da1f2",
                },
                {
                  icon: <Youtube size={17} />,
                  href: "#",
                  label: "YouTube",
                  hoverBg: "#ff0000",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.hoverBg;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = s.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Categories ── */}
          <div>
            <SectionHeading>Categories</SectionHeading>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                {
                  label: "OTC Medicines",
                  href: "/shop?category=otc",
                  icon: <Pill size={14} />,
                },
                {
                  label: "Prescription Rx",
                  href: "/shop?category=prescription",
                  icon: <FileText size={14} />,
                },
                {
                  label: "Medical Devices",
                  href: "/shop?category=devices",
                  icon: <Monitor size={14} />,
                },
                {
                  label: "Wellness & Nutrition",
                  href: "/shop?category=wellness",
                  icon: <Salad size={14} />,
                },
                {
                  label: "Personal Care",
                  href: "/shop?category=personal-care",
                  icon: <ShoppingBag size={14} />,
                },
                {
                  label: "Baby Care",
                  href: "/shop?category=baby-care",
                  icon: <Baby size={14} />,
                },
              ].map(({ label, href, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-slate-500 no-underline text-[13.5px] transition-all duration-200 hover:text-blue-600 hover:pl-1"
                  >
                    <span className="text-blue-600 flex-shrink-0">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                ["All Products", "/shop"],
                ["B2B / Bulk Orders", "/shop?b2b=true"],
                ["View Cart", "/cart"],
                ["My Dashboard", "/dashboard"],
                ["Health Blog", "/blog"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 text-slate-500 no-underline text-[13.5px] transition-all duration-200 hover:text-blue-600 hover:pl-1"
                  >
                    <ChevronRight
                      size={13}
                      color="#2563eb"
                      className="flex-shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact & Support ── */}
          <div>
            <SectionHeading>Contact &amp; Support</SectionHeading>
            <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
              {/* Address */}
              <li className="flex items-start gap-2.5">
                <ContactBadge icon={<MapPin size={14} color="#2563eb" />} />
                <span className="text-[13px] text-slate-500 leading-[1.65]">
                  Shop No. 4, VPO jharsa, Sector 39, Near Police Chowki
                  <br />
                  Gurugram, Haryana – 122003 India
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-2.5">
                <ContactBadge icon={<PhoneCall size={14} color="#2563eb" />} />
                <div>
                  <a
                    href="tel:8285508282"
                    className="text-slate-500 no-underline text-[13px] block leading-[1.65] transition-colors hover:text-blue-600"
                  >
                    8285508282
                  </a>
                  <a
                    href="tel:+918376868282"
                    className="text-slate-500 no-underline text-[13px] block leading-[1.65] transition-colors hover:text-blue-600"
                  >
                    8376868282
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2.5">
                <ContactBadge icon={<Mail size={14} color="#2563eb" />} />
                <a
                  href="mailto:paridhipharmasurgical@gmail.com"
                  className="text-slate-500 no-underline text-[13px] leading-[1.65] break-all transition-colors hover:text-blue-600"
                >
                  paridhipharmasurgical@gmail.com
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-2.5">
                <ContactBadge icon={<Clock size={14} color="#2563eb" />} />
                <span className="text-[13px] text-slate-500 leading-[1.65]">
                  24/7 Online &nbsp;·&nbsp; Store: 8 AM – 10 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ══ Bottom Bar ══ */}
      <div className="bg-[#0f2652]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-3">
          <p className="text-[13px] text-slate-400 m-0 leading-[1.5] text-center sm:text-left">
            © 2026 MediCure. All Rights Reserved.
            <br />
            <span className="text-slate-500 text-[12px]">
              Built for B2C + B2B Pharma E-commerce.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-1">
            {[
              ["Terms & Conditions", "/legal/terms"],
              ["Privacy Policy", "/legal/privacy"],
              ["Drug License", "/legal/license"],
            ].map(([label, href], i) => (
              <React.Fragment key={href}>
                {i > 0 && (
                  <span className="text-slate-600 text-[13px] px-0.5">|</span>
                )}
                <Link
                  href={href}
                  className="text-slate-400 no-underline text-[13px] px-2 py-0.5 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
