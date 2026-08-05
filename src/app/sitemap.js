// Auto-generated sitemap for Paridhi Pharma
// Next.js will serve this at /sitemap.xml

export default function sitemap() {
  const baseUrl = 'https://paridhipharma.com'; // 🔁 Update to your actual domain

  const staticRoutes = [
    { url: `${baseUrl}/`,              priority: 1.0,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/shop`,          priority: 0.9,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/medicine`,      priority: 0.9,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/categories`,    priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/lab-tests`,     priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/consult`,       priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/substitute`,    priority: 0.7,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/ambulance`,     priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/blogs`,         priority: 0.7,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/offers`,        priority: 0.7,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/plus`,          priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`,         priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`,       priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/legal/privacy`, priority: 0.3,  changeFrequency: 'yearly'  },
    { url: `${baseUrl}/legal/terms`,   priority: 0.3,  changeFrequency: 'yearly'  },
    { url: `${baseUrl}/legal/license`, priority: 0.2,  changeFrequency: 'yearly'  },
  ];

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
