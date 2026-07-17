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
  <div style={{ marginBottom: "18px" }}>
    <h4
      style={{
        color: "#1e3a6e",
        fontWeight: "700",
        fontSize: "15px",
        margin: "0 0 8px 0",
        letterSpacing: "0.2px",
      }}
    >
      {children}
    </h4>
    <div
      style={{
        width: "36px",
        height: "3px",
        background: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
        borderRadius: "2px",
      }}
    />
  </div>
);

/* ─────────────────────────────────────────
   Reusable: Contact icon badge
───────────────────────────────────────── */
const ContactBadge = ({ icon }) => (
  <div
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: "2px",
    }}
  >
    {icon}
  </div>
);

/* ─────────────────────────────────────────
   Main Footer
───────────────────────────────────────── */
const Footer = () => {
  return (
    <footer
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      {/* ══ Top accent line ══ */}
      <div
        style={{
          height: "4px",
          background:
            "linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #f97316 100%)",
        }}
      />

      {/* ══ Main Grid ══ */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "44px 32px 36px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.3fr",
          gap: "48px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {/* ── Brand Column ── */}
        <div>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "16px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <img
              src="/logo.png"
              alt="MediCure"
              style={{
                height: "80px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>

          {/* Description */}
          <p
            style={{
              fontSize: "13.5px",
              color: "#475569",
              lineHeight: "1.8",
              marginBottom: "18px",
              maxWidth: "300px",
            }}
          >
            MediCure is a leading B2C &amp; B2B pharmaceutical e-commerce
            platform offering genuine medicines, devices, and wellness products
            across Wellness City.
          </p>

          {/* License Box */}
          <div
            style={{
              background: "#f0f7ff",
              border: "1px solid #bfdbfe",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                marginBottom: "10px",
              }}
            >
              <ShieldCheck size={15} color="#2563eb" />
              <span
                style={{
                  color: "#1e3a6e",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                Legal Compliance &amp; Licenses
              </span>
            </div>
            {[
              ["Drug License", "HR-GUR-2026-98765"],
              ["FSSAI License", "10826005001234"],
              ["GSTIN", "06AAAAA0000A1Z5"],
              ["Pharmacist", "RITESH (B.Pharm)"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  fontSize: "12.5px",
                  color: "#475569",
                  marginBottom: "3px",
                  lineHeight: "1.65",
                }}
              >
                <span style={{ color: "#64748b" }}>{k}: </span>
                <span style={{ color: "#1e3a6e", fontWeight: "700" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = s.hoverBg;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = s.hoverBg;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
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
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "13.5px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#2563eb";
                    e.currentTarget.style.paddingLeft = "3px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <span style={{ color: "#2563eb", flexShrink: 0 }}>
                    {icon}
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <SectionHeading>Quick Links</SectionHeading>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "13.5px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#2563eb";
                    e.currentTarget.style.paddingLeft = "3px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <ChevronRight
                    size={13}
                    color="#2563eb"
                    style={{ flexShrink: 0 }}
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
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Address */}
            <li
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <ContactBadge icon={<MapPin size={14} color="#2563eb" />} />
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.65",
                }}
              >
                123 Health Ave,
                <br />
                Gurugram , 122001, Haryana, India
              </span>
            </li>

            {/* Phone */}
            <li
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <ContactBadge icon={<PhoneCall size={14} color="#2563eb" />} />
              <div>
                <a
                  href="tel:8285508282"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "13px",
                    display: "block",
                    lineHeight: "1.65",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#475569")
                  }
                >
                  8285508282
                </a>
                <a
                  href="tel:+918376868282"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "13px",
                    display: "block",
                    lineHeight: "1.65",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#475569")
                  }
                >
                  +91 8376868282
                </a>
              </div>
            </li>

            {/* Email */}
            <li
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <ContactBadge icon={<Mail size={14} color="#2563eb" />} />
              <a
                href="mailto:paridhipharmasurgical@gmail.com"
                style={{
                  color: "#475569",
                  textDecoration: "none",
                  fontSize: "13px",
                  lineHeight: "1.65",
                  wordBreak: "break-all",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                paridhipharmasurgical@gmail.com
              </a>
            </li>

            {/* Hours */}
            <li
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <ContactBadge icon={<Clock size={14} color="#2563eb" />} />
              <span
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.65",
                }}
              >
                24/7 Online &nbsp;·&nbsp; Store: 8 AM – 10 PM
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ══ Bottom Bar ══ */}
      <div
        style={{
          background: "#0f2652",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            © 2026 MediCure. All Rights Reserved.
            <br />
            <span style={{ color: "#64748b", fontSize: "12px" }}>
              Built for B2C + B2B Pharma E-commerce.
            </span>
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {[
              ["Terms & Conditions", "/legal/terms"],
              ["Privacy Policy", "/legal/privacy"],
              ["Drug License", "/legal/license"],
            ].map(([label, href], i) => (
              <React.Fragment key={href}>
                {i > 0 && (
                  <span
                    style={{
                      color: "#334155",
                      fontSize: "13px",
                      padding: "0 2px",
                    }}
                  >
                    |
                  </span>
                )}
                <Link
                  href={href}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "13px",
                    padding: "2px 8px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#94a3b8")
                  }
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
