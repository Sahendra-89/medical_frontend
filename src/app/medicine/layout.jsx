// SEO metadata for /medicine page
export const metadata = {
  title: 'Buy Medicines Online | Paridhi Pharma — Genuine Prescription & OTC Drugs',
  description:
    'Browse thousands of genuine prescription and OTC medicines at Paridhi Pharma. Order online with valid prescription, get fast delivery in Gurgaon, Delhi NCR & Faridabad.',
  keywords:
    'buy medicines online, prescription medicines india, OTC medicines, generic medicines, branded medicines, online pharmacy Gurgaon',
  openGraph: {
    title: 'Buy Medicines Online | Paridhi Pharma',
    description:
      'Genuine prescription & OTC medicines. Fast delivery in Delhi NCR. Upload prescription online.',
    url: 'https://paridhipharma.com/medicine',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Medicines Online | Paridhi Pharma',
    description: 'Prescription & OTC medicines delivered to your door.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/medicine',
  },
};

export default function MedicineLayout({ children }) {
  return children;
}
