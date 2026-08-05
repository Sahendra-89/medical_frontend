// SEO metadata for /lab-tests page
export const metadata = {
  title: 'Book Lab Tests Online | Paridhi Pharma — Home Sample Collection',
  description:
    'Book diagnostic lab tests online with Paridhi Pharma. Home sample collection available in Gurgaon & Delhi NCR. NABL-certified labs, reports delivered digitally.',
  keywords:
    'book lab tests online, home blood test Gurgaon, diagnostic tests Delhi NCR, NABL lab tests, blood test home collection, affordable lab tests',
  openGraph: {
    title: 'Book Lab Tests Online | Paridhi Pharma',
    description:
      'NABL-certified diagnostic tests with home collection in Gurgaon & Delhi NCR.',
    url: 'https://paridhipharma.com/lab-tests',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Lab Tests Online | Paridhi Pharma',
    description: 'Home sample collection for lab tests in Gurgaon & Delhi NCR.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/lab-tests',
  },
};

export default function LabTestsLayout({ children }) {
  return children;
}
