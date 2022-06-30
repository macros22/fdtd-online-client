/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/simulation/1D",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
