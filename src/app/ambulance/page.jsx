"use client";

import Link from "next/link";
import { submitAmbulanceRequest } from "../../lib/api";

const AMBULANCE_TYPES = [
  {
    id: "bls",
    icon: "🚑",
    title: "Basic Life Support",
    subtitle: "BLS Ambulance",
    desc: "Equipped with basic medical equipment for non-critical patients.",
    eta: "8–12 min",
    price: "₹499",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    features: [
      "Trained EMT on-board",
      "Oxygen Support",
      "First Aid Kit",
      "Stretcher",
    ],
  },
  {
    id: "als",
    icon: "🏥",
    title: "Advanced Life Support",
    subtitle: "ALS Ambulance",
    desc: "Full ICU-level care during transit for critical emergencies.",
    eta: "10–15 min",
    price: "₹999",
    color: "#dc2626",
    bg: "#fff1f2",
    border: "#fecdd3",
    features: [
      "Paramedic + Doctor",
      "Cardiac Monitor",
      "Defibrillator",
      "Ventilator",
    ],
    badge: "🔥 Most Booked",
  },
];

const STEPS = [
  { icon: "📍", label: "Enter Location", desc: "Share pickup & drop address" },
  { icon: "🚑", label: "Choose Ambulance", desc: "BLS, ALS or Air" },
  { icon: "✅", label: "Confirm Booking", desc: "We dispatch immediately" },
  { icon: "⚡", label: "Help Arrives", desc: "Track live on map" },
];

export default function AmbulancePage() {
  const [selected, setSelected] = useState("als");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    emergency: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pickup) return;
    setLoading(true);
    
    try {
      await submitAmbulanceRequest({
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        drop_location: form.drop,
        emergency_type: form.emergency,
        notes: form.notes,
        ambulance_type: selected
      });
      setSubmitted(true);
    } catch (error) {
      alert("Failed to book ambulance. Please call the helpline.");
    } finally {
      setLoading(false);
    }
  };

  const selectedType = AMBULANCE_TYPES.find((t) => t.id === selected);

  return (
    <>
      <style>{`
        @keyframes ambPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
          50%       { box-shadow: 0 0 0 16px rgba(220,38,38,0); }
        }
        @keyframes ambSiren {
          0%, 100% { background: #dc2626; }
          50%       { background: #f97316; }
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes successBounce {
          0%  { opacity:0; transform: scale(0.6); }
          70% { transform: scale(1.1); }
          100%{ opacity:1; transform: scale(1); }
        }
        .amb-siren { animation: ambSiren 0.8s ease-in-out infinite; }
        .amb-pulse-btn { animation: ambPulse 2s infinite; }
        .amb-slide { animation: slideUp 0.45s cubic-bezier(0.34,1.2,0.64,1) both; }
        .amb-success { animation: successBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
        .amb-card-selected {
          border-color: var(--ac) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--ac) 20%, transparent) !important;
          background: var(--abg) !important;
        }
        .amb-input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
          outline: none;
        }
        .amb-step-line::after {
          content: '';
          position: absolute;
          top: 22px;
          left: calc(50% + 24px);
          width: calc(100% - 48px);
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #fca5a5);
          border-radius: 4px;
        }
        .amb-step:last-child::after { display: none; }
      `}</style>

      <div className="min-h-screen bg-slate-50">
        {/* ── HERO BANNER ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #7f1d1d 60%, #dc2626 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #ef4444 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #f97316 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
            {/* Breadcrumb */}
            <div
              className="flex items-center gap-2 text-xs mb-6"
              style={{ color: "rgba(252,165,165,0.8)" }}
            >
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Book Ambulance</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                {/* Siren badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold mb-5"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full amb-siren inline-block" />
                  24 × 7 Emergency Response
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                  Book Your
                  <br />
                  <span style={{ color: "#fca5a5" }}>Ambulance</span> Now
                </h1>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mb-8">
                  Fastest emergency medical transport in your city. BLS, ALS
                  &amp; Air Ambulance available. Dispatched within minutes —
                  because every second counts.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { val: "< 10 min", label: "Avg. Response" },
                    { val: "500+", label: "Ambulances" },
                    { val: "24/7", label: "Helpline" },
                    { val: "98%", label: "On-time Rate" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-black text-white">{s.val}</p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "rgba(252,165,165,0.8)" }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Call Card */}
              <div className="w-full md:w-auto flex-shrink-0">
                <div
                  className="bg-white rounded-3xl p-6 shadow-2xl text-center"
                  style={{ minWidth: 240 }}
                >
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Emergency Helpline
                  </p>
                  <a
                    href="tel:108"
                    className="flex items-center justify-center gap-2 text-4xl font-black mb-3 transition hover:scale-105"
                    style={{ color: "#dc2626" }}
                  >
                    📞 108
                  </a>
                  <p className="text-[11px] text-slate-400 mb-4">
                    Govt. Free Ambulance Service
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-500 mb-2">
                      Private Booking
                    </p>
                    <a
                      href="tel:+91 9306358009"
                      className="block w-full py-2.5 rounded-2xl text-white text-sm font-bold transition amb-pulse-btn"
                      style={{
                        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      }}
                    >
                      📱 +91 9306358009
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-center text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Simple Process
          </p>
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative amb-step-line amb-step amb-slide flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-md"
                  style={{
                    background:
                      i === 0
                        ? "#fee2e2"
                        : i === 1
                          ? "#fff7ed"
                          : i === 2
                            ? "#f0fdf4"
                            : "#fef3c7",
                  }}
                >
                  {step.icon}
                </div>
                <p className="font-bold text-sm text-slate-900 mb-1">
                  {step.label}
                </p>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN BOOKING SECTION ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT – Ambulance Type Picker */}
            <div className="amb-slide" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-lg font-black text-slate-900 mb-1">
                Choose Ambulance Type
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Select the level of care needed
              </p>

              <div className="flex flex-col gap-4">
                {AMBULANCE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelected(type.id)}
                    className="relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 group"
                    style={{
                      borderColor:
                        selected === type.id ? type.color : "#e2e8f0",
                      background: selected === type.id ? type.bg : "#fff",
                      boxShadow:
                        selected === type.id
                          ? `0 0 0 3px ${type.color}22`
                          : "none",
                    }}
                  >
                    {type.badge && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-black text-white px-2 py-0.5 rounded-full"
                        style={{ background: type.color }}
                      >
                        {type.badge}
                      </span>
                    )}
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">
                        {type.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="font-black text-sm text-slate-900">
                            {type.title}
                          </p>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: type.bg,
                              color: type.color,
                              border: `1px solid ${type.border}`,
                            }}
                          >
                            {type.subtitle}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-500 mb-3">
                          {type.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {type.features.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                              style={{
                                background:
                                  selected === type.id
                                    ? `${type.color}18`
                                    : "#f1f5f9",
                                color:
                                  selected === type.id ? type.color : "#64748b",
                              }}
                            >
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-sm font-black"
                            style={{ color: type.color }}
                          >
                            {type.price}{" "}
                            <span className="text-[10px] font-normal text-slate-400">
                              onwards
                            </span>
                          </span>
                          <span className="text-[11px] text-slate-400">
                            ⏱ ETA: {type.eta}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1"
                        style={{
                          borderColor:
                            selected === type.id ? type.color : "#cbd5e1",
                        }}
                      >
                        {selected === type.id && (
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: type.color }}
                          />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT – Booking Form */}
            <div className="amb-slide" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-lg font-black text-slate-900 mb-1">
                Booking Details
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Fill the form — we'll dispatch immediately
              </p>

              {submitted ? (
                <div className="bg-white rounded-3xl border border-green-200 p-10 flex flex-col items-center text-center shadow-lg amb-success">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4"
                    style={{
                      background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                    }}
                  >
                    ✅
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>{selectedType?.title}</strong> has been dispatched
                  </p>
                  <p className="text-xs text-slate-400 mb-6">
                    ETA:{" "}
                    <strong className="text-slate-700">
                      {selectedType?.eta}
                    </strong>{" "}
                    · Our team will call you shortly
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                      href="tel:+918800000000"
                      className="w-full py-3 rounded-2xl text-white text-sm font-bold text-center"
                      style={{
                        background: "linear-gradient(135deg,#dc2626,#b91c1c)",
                      }}
                    >
                      📞 Call Driver Now
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          phone: "",
                          pickup: "",
                          drop: "",
                          emergency: "",
                          notes: "",
                        });
                      }}
                      className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4"
                >
                  {/* Patient Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Patient / Caller Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9XXXXXXXXX"
                        className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Pickup */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      📍 Pickup Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="pickup"
                      required
                      value={form.pickup}
                      onChange={handleChange}
                      placeholder="House no., street, landmark, city"
                      className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all"
                    />
                  </div>

                  {/* Drop */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      🏥 Drop / Hospital Address
                    </label>
                    <input
                      name="drop"
                      value={form.drop}
                      onChange={handleChange}
                      placeholder="Destination hospital or address (optional)"
                      className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all"
                    />
                  </div>

                  {/* Emergency type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Emergency Type
                    </label>
                    <select
                      name="emergency"
                      value={form.emergency}
                      onChange={handleChange}
                      className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all appearance-none"
                    >
                      <option value="">Select type of emergency</option>
                      <option>Cardiac Emergency (Heart Attack)</option>
                      <option>Road Accident / Trauma</option>
                      <option>Stroke / Brain Emergency</option>
                      <option>Pregnancy / Maternity</option>
                      <option>Breathing Difficulty</option>
                      <option>Burns / Poisoning</option>
                      <option>Hospital Transfer</option>
                      <option>Other Medical Emergency</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any specific requirements, patient condition details, floor number..."
                      className="amb-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs transition-all resize-none"
                    />
                  </div>

                  {/* Selected Summary */}
                  <div
                    className="flex items-center gap-3 rounded-xl p-3.5 border"
                    style={{
                      background: selectedType?.bg,
                      borderColor: selectedType?.border,
                    }}
                  >
                    <span className="text-2xl">{selectedType?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900">
                        {selectedType?.title}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        ETA: {selectedType?.eta} · From {selectedType?.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .querySelector('[data-scroll="types"]')
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-[10px] font-bold underline"
                      style={{ color: selectedType?.color }}
                    >
                      Change
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed amb-pulse-btn"
                    style={{
                      background:
                        "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                    }}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                            opacity="0.25"
                          />
                          <path d="M21 12a9 9 0 0 1-9 9" />
                        </svg>
                        Dispatching...
                      </>
                    ) : (
                      <>🚑 Book Ambulance Now</>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    For life-threatening emergencies, call{" "}
                    <a href="tel:108" className="font-bold text-red-500">
                      108
                    </a>{" "}
                    (free govt. ambulance) immediately.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="border-t border-slate-200 bg-white py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: "🏥", label: "500+ Empanelled Hospitals" },
                { icon: "👨‍⚕️", label: "Certified Paramedics" },
                { icon: "📡", label: "Real-time GPS Tracking" },
                { icon: "💳", label: "Insurance Accepted" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{t.icon}</span>
                  <p className="text-xs font-bold text-slate-700">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
