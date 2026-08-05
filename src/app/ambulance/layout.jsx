// SEO metadata for /ambulance page
export const metadata = {
  title: 'Book Ambulance Online | Paridhi Pharma — Emergency & Non-Emergency',
  description:
    'Book an ambulance online instantly with Paridhi Pharma. 24/7 emergency and non-emergency ambulance services in Gurgaon, Delhi & Faridabad. BLS & ALS ambulances available.',
  keywords:
    'ambulance booking online Gurgaon, emergency ambulance Delhi NCR, book ambulance near me, ALS BLS ambulance, ambulance service Faridabad',
  openGraph: {
    title: 'Book Ambulance Online | Paridhi Pharma',
    description: '24/7 emergency & non-emergency ambulance — Gurgaon, Delhi & Faridabad.',
    url: 'https://paridhipharma.com/ambulance',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Ambulance | Paridhi Pharma',
    description: '24/7 ambulance booking in Gurgaon & Delhi NCR.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/ambulance',
  },
};

export default function AmbulanceLayout({ children }) {
  return children;
}
