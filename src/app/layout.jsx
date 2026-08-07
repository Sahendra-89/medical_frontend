import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/Footer"), {
  ssr: true,
});

export const metadata = {
  metadataBase: new URL("https://www.paridhipharma.in"),

  title: {
    default: "Pridhi Pharma | Buy Medicines Online — Trusted Pharmacy India",
    template: "%s | Pridhi Pharma",
  },

  description:
    "Pridhi Pharma — India's trusted online pharmacy. Order genuine medicines, upload prescriptions, shop healthcare devices & wellness products with fast delivery.",

  keywords:
    "buy medicines online, online pharmacy India, Pridhi Pharma, genuine medicines, prescription medicines online, medical devices, pridhipharma.in",

  openGraph: {
    title: "Pridhi Pharma | Buy Medicines Online",
    description:
      "Trusted online pharmacy with genuine medicines, fast delivery & licensed pharmacists.",
    url: "https://www.paridhipharma.in",
    siteName: "Pridhi Pharma",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pridhi Pharma | Buy Medicines Online",
    description:
      "Genuine medicines & healthcare devices — fast delivery across India.",
  },

  alternates: {
    canonical: "https://www.paridhipharma.in/",
  },

  verification: {
    google: "d5e6afae5f41e541",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function WhatsAppFloat() {
  return null;
}

export default function RootLayout({ children }) {
  const pharmacySchema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",

    name: "Paridhi Pharma",

    description:
      "Trusted online pharmacy serving Gurgaon, Delhi NCR & Faridabad with genuine medicines, fast delivery and licensed pharmacist support.",

    url: "https://www.paridhipharma.in",

    telephone: "+91-8285508282",

    email: "info@paridhipharma.in",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4595,
      longitude: 77.0266,
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],

    sameAs: ["https://wa.me/918285508282"],

    hasMap: "https://maps.google.com/?q=Paridhi+Pharma+Gurgaon",

    priceRange: "₹₹",

    currenciesAccepted: "INR",

    paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking",
  };

  const websiteSchema = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: "Paridhi Pharma",

    url: "https://www.paridhipharma.in",

    potentialAction: {
      "@type": "SearchAction",

      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.paridhipharma.in/shop?search={search_term_string}",
      },

      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />

            {children}

            <Footer />

            <WhatsAppFloat />
          </CartProvider>
        </AuthProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pharmacySchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </body>
    </html>
  );
}
