// SEO metadata for /plus page
export const metadata = {
  title: 'Paridhi Pharma PLUS — Subscribe & Save 5% Extra on Every Order',
  description:
    'Join Paridhi Pharma PLUS for exclusive member benefits: 5% extra savings on every order, priority delivery, dedicated pharmacist support, and member-only health deals.',
  keywords:
    'pharmacy subscription india, medicine subscription plan, save on medicines, paridhi pharma plus membership, pharmacy loyalty program',
  openGraph: {
    title: 'Paridhi Pharma PLUS Membership',
    description: 'Save 5% extra on every medicine order with PLUS membership.',
    url: 'https://paridhipharma.com/plus',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paridhi Pharma PLUS Membership',
    description: 'Subscribe to PLUS and save 5% extra on all orders.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/plus',
  },
};

export default function PlusLayout({ children }) {
  return children;
}
