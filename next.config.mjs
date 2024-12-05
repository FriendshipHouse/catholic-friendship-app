import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tcupa6ohiuf8fs5q.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
