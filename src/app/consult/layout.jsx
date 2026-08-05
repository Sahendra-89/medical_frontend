// SEO metadata for /consult page
export const metadata = {
  title: 'Consult a Doctor Online | Paridhi Pharma — Video & Chat Consultation',
  description:
    'Book an online doctor consultation at Paridhi Pharma. Talk to verified general physicians, specialists & dermatologists via video or chat. Starting from ₹199.',
  keywords:
    'online doctor consultation, video doctor consultation india, chat with doctor, online GP consultation, specialist doctor online, consult doctor from home',
  openGraph: {
    title: 'Consult a Doctor Online | Paridhi Pharma',
    description:
      'Video & chat consultations with verified doctors starting from ₹199.',
    url: 'https://paridhipharma.com/consult',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consult a Doctor Online | Paridhi Pharma',
    description: 'Talk to verified doctors from home. Starting ₹199.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/consult',
  },
};

export default function ConsultLayout({ children }) {
  return children;
}
