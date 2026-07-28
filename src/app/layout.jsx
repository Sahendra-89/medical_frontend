import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export const metadata = {
  title: 'MediCure | Buy Medicines Online',
  description: 'MediCure — India\'s trusted online pharmacy. Order genuine medicines, upload prescriptions, shop healthcare devices & wellness products.',
  keywords: 'buy medicines online, online pharmacy, MediCure, genuine medicines, prescription medicines online, medical devices',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    title: 'MediCure | Buy Medicines Online',
    description: 'Trusted online pharmacy with genuine medicines and healthcare devices.',
    url: 'https://medicure.com',
    siteName: 'MediCure',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediCure | Buy Medicines Online',
    description: 'Genuine medicines and healthcare devices.',
  },
  alternates: {
    canonical: 'https://medicure.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
  return (
    <html lang="en">
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
