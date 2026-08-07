import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
});

export const metadata = {
  metadataBase: new URL('https://www.pridhipharma.in'),
  title: {
    default: 'Pridhi Pharma | Buy Medicines Online — Trusted Pharmacy India',
    template: '%s | Pridhi Pharma',
  },
  description:
    'Pridhi Pharma — India\'s trusted online pharmacy. Order genuine medicines, upload prescriptions, shop healthcare devices & wellness products with fast delivery.',
  keywords:
    'buy medicines online, online pharmacy India, Pridhi Pharma, genuine medicines, prescription medicines online, medical devices, pridhipharma.in',
  openGraph: {
    title: 'Pridhi Pharma | Buy Medicines Online',
    description:
      'Trusted online pharmacy with genuine medicines, fast delivery & licensed pharmacists.',
    url: 'https://www.pridhipharma.in',
    siteName: 'Pridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pridhi Pharma | Buy Medicines Online',
    description: 'Genuine medicines & healthcare devices — fast delivery across India.',
  },
  alternates: {
    canonical: 'https://www.pridhipharma.in',
  },
  verification: {
    google: 'd5e6afae5f41e541',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/8285508282"
      target="_blank"
      rel="noreferrer"
      aria-label="Order via WhatsApp"
      className="whatsapp-float"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-float transition-transform duration-200 hover:scale-110 active:scale-95">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.824 6.51L4 29l7.697-1.798A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white" />
          <path d="M21.5 18.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#0a2540" />
        </svg>
      </div>
    </a>
  );
}

export default function RootLayout({ children }) {
  const pharmacySchema = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'Paridhi Pharma',
    description:
      'Trusted online pharmacy serving Gurgaon, Delhi NCR & Faridabad with genuine medicines, fast delivery, and licensed pharmacist support.',
    url: 'https://paridhipharma.com',
    telephone: '+91-8285508282',
    email: 'info@paridhipharma.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4595,
      longitude: 77.0266,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://wa.me/8285508282',
    ],
    hasMap: 'https://maps.google.com/?q=Paridhi+Pharma+Gurgaon',
    priceRange: '₹₹',
    servesCuisine: undefined,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Paridhi Pharma',
    url: 'https://paridhipharma.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://paridhipharma.com/shop?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="http://localhost:5000" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
