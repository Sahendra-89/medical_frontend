// SEO metadata for /blogs page
export const metadata = {
  title: 'Health Blogs & Articles | Paridhi Pharma',
  description:
    'Read expert health articles, medicine guides, wellness tips, and healthcare insights from Paridhi Pharma\'s team of licensed pharmacists and doctors.',
  keywords:
    'health blog india, medicine guide, wellness tips, healthcare articles, pharmacy blog, drug information, health tips hindi',
  openGraph: {
    title: 'Health Blogs & Articles | Paridhi Pharma',
    description:
      'Expert health articles, medicine guides & wellness tips from licensed pharmacists.',
    url: 'https://paridhipharma.com/blogs',
    siteName: 'Paridhi Pharma',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Blogs & Articles | Paridhi Pharma',
    description: 'Expert health & wellness content from licensed pharmacists.',
  },
  alternates: {
    canonical: 'https://paridhipharma.com/blogs',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}
