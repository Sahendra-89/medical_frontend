// SEO metadata for /offers page
export const metadata = {
  title: 'Medicine Offers & Discounts | Paridhi Pharma — Up to 60% OFF',
  description:
    'Grab the best deals on medicines and healthcare products at Paridhi Pharma. Exclusive discounts, seasonal offers, and coupon codes. Save up to 60% on top brands.',
  keywords:
    'medicine discount offers, pharmacy coupons india, medicine deals, healthcare offers, buy medicine cheap, pharmacy promo codes india',
  openGraph: {
    title: 'Medicine Offers & Discounts | Paridhi Pharma',
    description: 'Exclusive deals on medicines & healthcare products — up to 60% OFF.',
    url: 'https://paridhipharma.com/offers',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicine Offers | Paridhi Pharma',
    description: 'Up to 60% OFF on medicines & healthcare. Grab deals now!',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/offers',
  },
};

export default function OffersLayout({ children }) {
  return children;
}
