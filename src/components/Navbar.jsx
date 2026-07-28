"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Clock,
  Pill,
  Activity,
  Stethoscope,
  FlaskConical,
  BookOpen,
  BadgePercent,
  Star,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  Tag,
  Package,
  Siren,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getCategories, getProducts } from "../lib/api";

const OFFERS = [
  "🎉 Use code FLAT100 → ₹100 OFF on orders above ₹999",
  "🚚 Same-Day Delivery in Gurgaon, Delhi & Faridabad",
  "💊 Up to 30% OFF on generics",
  "📋 Prescription medicines — Upload Rx in minutes",
  "🏥 B2B Bulk Pricing for Clinics & Pharmacies — Register Now",
  "⭐ 5000+ Genuine Products | Licensed Pharmacy HR-GUR-2026-98765",
];

// ── Main category nav links (PharmEasy-style)
const NAV_LINKS = [
  {
    label: "Medicine",
    href: "/shop",
    icon: <Pill size={14} />,
    dot: false,
    mega: false,
  },
  {
    label: "Healthcare",
    href: "/shop?category=wellness",
    icon: <Activity size={14} />,
    dot: false,
    mega: "healthcare",
  },
  {
    label: "Doctor Consult",
    href: "/contact",
    icon: <Stethoscope size={14} />,
    dot: true,
    mega: false,
  },
  {
    label: "Lab Tests",
    href: "/shop?category=devices",
    icon: <FlaskConical size={14} />,
    dot: false,
    mega: false,
  },
  {
    label: "Offers",
    href: "/shop?offers=true",
    icon: <BadgePercent size={14} />,
    dot: false,
    mega: false,
  },
  {
    label: "Health Insights",
    href: "/blog",
    icon: <BookOpen size={14} />,
    dot: false,
    mega: false,
  },
  {
    label: "Book Ambulance",
    href: "/ambulance",
    icon: <Siren size={14} />,
    dot: true,
    mega: false,
    emergency: true,
  },
];

// Map category IDs to HEALTHCARE_MEGA_MENU display names
const CATEGORY_TO_MEGA = {
  "must-haves": "Must Haves",
  "vitamin-store": "Vitamin Store",
  "sexual-wellness": "Sexual Wellness",
  "personal-care": "Personal Care",
  homeopathy: "Homeopathy Care",
  "summer-store": "Summer Store",
  "health-food": "Health Food and Drinks",
  "diabetes-essentials": "Diabetes Essentials",
  ayurvedic: "Ayurvedic Care",
  "mother-baby": "Mother and Baby Care",
  "elderly-care": "Mobility & Elderly Care",
};

// Only these 11 categories appear in the Healthcare mega-menu sidebar
const MEGA_MENU_CAT_IDS = [
  "must-haves",
  "vitamin-store",
  "sexual-wellness",
  "personal-care",
  "homeopathy",
  "summer-store",
  "health-food",
  "diabetes-essentials",
  "ayurvedic",
  "mother-baby",
  "elderly-care",
];

const HEALTHCARE_MEGA_MENU = {
  "Must Haves": [
    { title: "Diabetic Care", links: ["All Diabetic Care"] },
    { title: "Feet Problem", links: ["All Feet Problem"] },
    { title: "Skin & hair Care", links: ["All Skin & hair Care"] },
    {
      title: "Never Seen Before Deals",
      links: ["All Never Seen Before Deals"],
    },
    { title: "Vitamin", links: ["All Vitamin"] },
    { title: "Ortho Care", links: ["All Ortho Care"] },
    { title: "Therapy Others", links: ["All Therapy Others"] },
  ],
  "Vitamin Store": [
    {
      title: "Vitamins and Supplements",
      links: [
        "All Vitamins and Supplements",
        "Multi Vitamins",
        "All Multi Vitamins",
      ],
    },
    {
      title: "Biotin",
      links: [
        "All Biotin",
        "Collagen",
        "All Collagen",
        "Gummies",
        "All Gummies",
      ],
    },
    {
      title: "Supplements for Skin",
      links: [
        "All Supplements for Skin",
        "Supplements for Sleep",
        "All Supplements for Sleep",
      ],
    },
    {
      title: "Vitamins & Supplements for Heart",
      links: ["All Vitamins & Supplements for Heart"],
    },
    {
      title: "Vitamins & Supplements for Diabetes",
      links: ["All Vitamins & Supplements for Diabetes"],
    },
  ],
  "Sexual Wellness": [
    {
      title: "Sexual Wellness OTC",
      links: ["All Sexual Wellness OTC", "Condoms", "All Condoms"],
    },
    {
      title: "Vigor & Vitality Supplements",
      links: ["All Vigor & Vitality Supplements"],
    },
    {
      title: "Shilajit",
      links: ["All Shilajit", "Pregnancy Support", "All Pregnancy Support"],
    },
    {
      title: "Oral Contraceptives",
      links: [
        "All Oral Contraceptives",
        "Sexual Devices",
        "All Sexual Devices",
      ],
    },
  ],
  "Personal Care": [
    {
      title: "Skin Care",
      links: ["All Skin Care", "Face Wash", "Moisturizers"],
    },
    { title: "Hair Care", links: ["All Hair Care", "Shampoo", "Conditioners"] },
  ],
  "Homeopathy Care": [
    {
      title: "Explore by Health Needs",
      links: [
        "All Explore by Health Needs",
        "Skin & Hair Care",
        "Diabetes Care",
        "Cold, Cough & Fever",
        "Stomach & Liver Care",
        "Immunity & Wellness",
        "Women's Health",
        "Piles & Fistula",
        "Arthritis",
        "Sexual Wellness",
      ],
    },
    {
      title: "Care for Specific Conditions",
      links: [
        "All Care for Specific Conditions",
        "Heart Care",
        "Eye & Ear Care",
        "Thyroid Care",
        "Mental Health",
        "Obesity Management",
        "Infection & Allergies",
      ],
    },
    {
      title: "Featured Brands",
      links: [
        "All Featured Brands",
        "Wheezal Brand Store",
        "Allen Brand Store",
        "DR.WILLMAR SCHWABE INDIA STORE",
        "Baksons Brand Store",
        "SBL Brand Store",
      ],
    },
  ],
  "Summer Store": [
    {
      title: "Summer Essentials",
      links: ["All Summer Essentials", "Sunscreen", "All Sunscreen"],
    },
    { title: "Vitamin C", links: ["All Vitamin C", "Roll-On", "All Roll-On"] },
    { title: "GLUCOSE", links: ["All GLUCOSE", "ORS", "All ORS"] },
    {
      title: "JUICES",
      links: ["All JUICES", "Anti-Fungal Care", "All Anti-Fungal Care"],
    },
  ],
  "Health Food and Drinks": [
    {
      title: "Health Drinks",
      links: ["All Health Drinks", "Protein Powders", "Energy Drinks"],
    },
  ],
  "Diabetes Essentials": [
    {
      title: "Diabetes Care",
      links: ["All Diabetes Care", "Monitors", "Strips"],
    },
  ],
  "Ayurvedic Care": [
    {
      title: "Ayurveda",
      links: ["All Ayurveda", "Chyawanprash", "Herbal Juices"],
    },
  ],
  "Mother and Baby Care": [
    { title: "Baby Care", links: ["All Baby Care", "Diapers", "Baby Food"] },
  ],
  "Mobility & Elderly Care": [
    {
      title: "Elderly Care",
      links: ["All Elderly Care", "Walking Aids", "Adult Diapers"],
    },
  ],
  "Sports Nutrition": [
    {
      title: "Sports Nutrition",
      links: ["All Sports Nutrition", "Whey Protein", "Mass Gainers"],
    },
  ],
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMegaCategory, setActiveMegaCategory] = useState("Must Haves");
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const dropdownRef = useRef(null);
  const router = useRouter();
  const { cart, wishlist } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    // Fetch dynamic categories
    getCategories().then((res) => {
      if (res.categories && res.categories.length > 0) {
        setDynamicCategories(res.categories);
      }
    });

    // Fetch featured products for profile panel
    getProducts({ is_featured: true }).then((res) => {
      if (res.products && res.products.length > 0) {
        setFeaturedProducts(res.products.slice(0, 4));
      }
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${encodeURIComponent(search)}`);
      setMobileMenu(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
    >


      {/* ── Main Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group">
          <img
            src="/logo.png"
            alt="Paridhi Pharma"
            className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Location Pill */}
        <button className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium hover:border-medical-blue hover:text-medical-blue transition flex-shrink-0">
          <MapPin size={13} className="text-medical-blue" />
          <span>Gurgaon 122001</span>
          <ChevronDown size={12} />
        </button>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center flex-1 relative min-w-0 max-w-2xl mx-3"
        >
          <div className="flex items-center w-full bg-slate-50 border-2 border-slate-200 rounded-2xl focus-within:border-medical-blue focus-within:bg-white focus-within:shadow-md transition-all duration-300 shadow-sm overflow-hidden group">
            <Search
              size={18}
              className="text-slate-400 ml-4 flex-shrink-0 group-focus-within:text-medical-blue transition-colors"
            />
            <input
              type="text"
              placeholder='Search medicines, brands (e.g. "Crocin", "Cipla")…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2 px-3 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-medical-blue text-white font-bold px-5 py-2 text-[13px] hover:bg-blue-700 transition flex-shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-auto md:ml-0">
          <Link
            href="/cart?tab=wishlist"
            className="relative p-2 text-slate-500 hover:text-red-500 transition"
          >
            <Heart size={21} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 bg-medical-blue text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-700 transition shadow-premium"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-medical-blue rounded-full w-5 h-5 flex items-center justify-center font-black text-[10px] shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 border border-slate-200 rounded-full hover:border-medical-blue transition"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-medical-blue flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden xl:inline text-xs font-semibold text-slate-700 pr-1">
                  {user.name}
                </span>
                <ChevronDown
                  size={12}
                  className={`hidden xl:block text-slate-400 transition-transform duration-200 mr-1 ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 z-[9999] animate-fade-in"
                  style={{ animation: "fadeSlideDown 0.18s ease" }}
                >
                  {/* Wide profile panel with products */}
                  <div
                    className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{ width: "420px" }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-medical-blue to-blue-600 px-5 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-base flex items-center justify-center uppercase shadow">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">
                          {user.name}
                        </p>
                        <p className="text-blue-100 text-[11px]">
                          {user.email}
                        </p>
                      </div>
                      <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>

                    {/* Quick Nav Links */}
                    <div className="flex border-b border-slate-100">
                      {user.role !== "admin" && (
                        <Link
                          href="/dashboard?tab=orders"
                          onClick={() => setProfileOpen(false)}
                          className="flex-1 flex flex-col items-center gap-1.5 py-3 text-[11px] font-bold text-slate-600 hover:text-medical-blue hover:bg-blue-50 transition border-r border-slate-100"
                        >
                          <Package size={16} className="text-amber-500" />
                          My Orders
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="flex-1 flex flex-col items-center gap-1.5 py-3 text-[11px] font-bold text-red-500 hover:bg-red-50 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-medical-blue border border-medical-blue/30 bg-blue-50 px-3 py-2 rounded-xl hover:bg-medical-blue hover:text-white transition"
            >
              <User size={14} /> Login
            </Link>
          )}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-slate-600"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Category Nav Bar (PharmEasy-style) ── */}
      <nav
        className="hidden md:block border-t border-slate-100 bg-white relative shadow-sm z-40"
        ref={dropdownRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 lg:gap-6 w-full overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative flex-shrink-0 group">
                {link.mega === "healthcare" ? (
                  // Healthcare with dropdown trigger
                  <button
                    onMouseEnter={() => {
                      setActiveDropdown("healthcare");
                    }}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "healthcare" ? null : "healthcare",
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-bold border-b-2 transition-all duration-200 ${
                      activeDropdown === "healthcare"
                        ? "text-medical-blue border-medical-blue bg-blue-50/50"
                        : "text-slate-700 border-transparent hover:text-medical-blue hover:border-medical-blue hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`transition-colors ${activeDropdown === "healthcare" ? "text-medical-blue" : "text-slate-400 group-hover:text-medical-blue"}`}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === "healthcare" ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onMouseEnter={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-bold border-b-2 border-transparent transition-all duration-200 ${
                      link.emergency
                        ? "text-red-600 hover:text-red-700 hover:border-red-500 hover:bg-red-50"
                        : "text-slate-700 hover:text-medical-blue hover:border-medical-blue hover:bg-slate-50"
                    }`}
                  >
                    {link.dot && (
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        link.emergency ? "bg-red-500 animate-pulse" : "bg-red-500 animate-pulse"
                      }`} />
                    )}
                    <span className={`transition-colors ${
                      link.emergency ? "text-red-500" : "text-slate-400 group-hover:text-medical-blue"
                    }`}>
                      {link.icon}
                    </span>
                    {link.label}
                    {link.emergency && (
                      <span className="ml-1 text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                        24/7
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Healthcare Mega Dropdown (PharmEasy-style) ── */}
        {activeDropdown === "healthcare" && (
          <div
            className="absolute left-0 right-0 top-full z-[9999] bg-white border-b border-slate-200 shadow-xl overflow-hidden"
            style={{ animation: "fadeSlideDown 0.18s ease" }}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto flex h-[450px]">
              {/* Left Sidebar - Categories */}
              <div className="w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto py-4">
                {MEGA_MENU_CAT_IDS.map((catId) => {
                  const megaKey = CATEGORY_TO_MEGA[catId];
                  return (
                    <button
                      key={catId}
                      onMouseEnter={() => setActiveMegaCategory(megaKey)}
                      className={`w-full text-left px-6 py-2.5 text-[13px] transition-colors relative ${
                        activeMegaCategory === megaKey
                          ? "bg-blue-100/50 font-bold text-slate-900 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-medical-blue"
                          : "font-medium text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {megaKey}
                    </button>
                  );
                })}
              </div>

              {/* Middle Content - Subcategories */}
              <div className="flex-1 overflow-y-auto py-6 px-5 bg-white border-r border-slate-100">
                {HEALTHCARE_MEGA_MENU[activeMegaCategory]?.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {HEALTHCARE_MEGA_MENU[activeMegaCategory].map(
                      (section, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-sm text-slate-900 mb-4">
                            {section.title}
                          </h4>
                          <ul className="space-y-3">
                            {section.links.map((link, i) => (
                              <li key={i}>
                                <Link
                                  href={`/shop?category=${encodeURIComponent(link)}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-[13px] text-slate-600 hover:text-medical-blue transition-colors block"
                                >
                                  {link}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Activity size={48} className="mb-4 opacity-20" />
                    <p>Select a sub-category from the left menu.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenu && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3 shadow-lg animate-fade-in">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-medical-blue"
            />
            <button
              type="submit"
              className="absolute right-1 p-2 bg-medical-blue text-white rounded-lg"
            >
              <Search size={14} />
            </button>
          </form>

          <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`py-2.5 px-2 text-sm font-medium flex items-center gap-2 rounded-lg transition ${
                  link.emergency
                    ? "text-red-600 bg-red-50 hover:bg-red-100 font-bold"
                    : "text-slate-700 hover:text-medical-blue"
                }`}
              >
                <span className={link.emergency ? "text-red-500" : "text-medical-blue opacity-70"}>
                  {link.icon}
                </span>
                {link.dot && !link.emergency && (
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                )}
                {link.label}
                {link.emergency && (
                  <span className="ml-auto text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    24/7
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile: Healthcare sub-links */}
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">
              Healthcare Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {dynamicCategories.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-700 hover:text-medical-blue font-medium truncate flex items-center gap-1.5"
                >
                  <span className="text-sm opacity-80">{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
