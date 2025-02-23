/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');

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
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = nextTranslate(nextConfig);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = nextTranslate();
