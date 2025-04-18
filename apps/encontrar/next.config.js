/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');
const apiUrl = process.env.API_PATH ?? process.env.NEXT_PUBLIC_API_PATH ?? 'http://localhost';

const parsedUrl = new URL(apiUrl);

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: parsedUrl.protocol.replace(':', ''), // Remove ':' do protocolo
        hostname: parsedUrl.hostname,
      },
    ],
    domains: ['localhost', 'https://encontrarshopping-api.up.railway.app', 'https://encontrarshopping.com'], // Permite imagens locais
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = nextTranslate(nextConfig);
// module.exports = nextConfig;
