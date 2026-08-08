// Auto-generated robots.txt for Paridhi Pharma
// Next.js will serve this at /robots.txt

export default function robots() {
  const baseUrl = 'https://www.paridhipharma.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',       // Block admin panel from indexing
          '/dashboard',   // Block user dashboard
          '/checkout',    // Block checkout pages
          '/cart',        // Block cart page
          '/auth',        // Block auth pages
          '/api/',        // Block API routes
          '/_next/',      // Block Next.js internals
        ],
      },
      {
        // Block AI scrapers from crawling sensitive pages
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
