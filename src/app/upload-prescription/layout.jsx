// SEO metadata for /upload-prescription page
export const metadata = {
  title: 'Upload Prescription Online | Paridhi Pharma — Order Medicines with Rx',
  description:
    'Upload your doctor\'s prescription at Paridhi Pharma to order prescription medicines online. Verified by licensed pharmacists. Fast, secure, and confidential.',
  keywords:
    'upload prescription online, order medicine with prescription, prescription medicine delivery, online pharmacy prescription, Rx medicines online india',
  openGraph: {
    title: 'Upload Prescription | Paridhi Pharma',
    description:
      'Upload your prescription online and get medicines delivered. Verified by licensed pharmacists.',
    url: 'https://paridhipharma.com/upload-prescription',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upload Prescription | Paridhi Pharma',
    description: 'Order prescription medicines — upload Rx, get delivered fast.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/upload-prescription',
  },
};

export default function UploadPrescriptionLayout({ children }) {
  return children;
}
