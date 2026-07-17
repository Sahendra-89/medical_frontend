const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const faviconPath = path.join(publicDir, 'favicon.ico');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(faviconPath)) {
  const base64Favicon = 'AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAADYPgAA/+7hANtdLwD98eoA7l8IAPh+JQDoYRcA3EQAAN1EAAD/9vAA/fj2AOFKAAD//PkA8qmBAM4zBADoWQkA0DwNAP2UQwD7eBQA93ojAPqZUgD0fi8A/bmEAONjJwDdRwEA9sCiAPjEpQDdURYA88e3AOdTAQC8GQAA13RjAMAfAADBHwAAwiIAAL8jDADFJQAA9bqaAMcoAADIKAAAySsAAMorAADMLgAA/t7GAN9MCADiTQIA9qh3ANA0AADRNAAA0jcAAPmRRQDVOgAA/82mAPGxkgDXPQAA/HsWAOqYdQD2mFoA1kAJAPF8NAD78vAA20MAANxDAAD/8+oA2UYJAP728wD6vpUA4Wc1AOtpIADtilUA+ap1ANBTOQD1q4EA8auKAOyPZADNWEgA+7N+AN1GAQDsvbcAuRUAAL0bAAC/HgAAwB4AAO55NgDCIQAA1UALAO17PADkXx8AxCQAAPl/JADqYhYAxicAAMcnAADvhUgAyy0AAP2ILQD+pV8AzzMAANAzAADONQYA8aqJANI2AADROQkA/uveANY8AADXPAAA5loRAOSVgQDcXzIA20IAAPWgbAD++vkA4ksAAOSjmQDhTAMA+8KbAONPAwD///8A9o5JAP2POgDvrJAA97GEAPObZwD9fx0A7WIPAPa6lgD0gjgA+b2WANJqXQD/x5kA9qt8ANtwVAC8GgAAvRoAAPKVXwDqlXEAwSAAAPSYXwD7mVAA+LeOAP//fjl1dXV2FUZClXN1dXV1khNndXV1CTIFFEx1dXV1ilkrdXV1dXUMFhI3XxF3e2ABdXV1dXV1dXUMjIGBND91dXV1dQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  fs.writeFileSync(faviconPath, Buffer.from(base64Favicon, 'base64'));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' }
    ]
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  }
};

module.exports = nextConfig;



