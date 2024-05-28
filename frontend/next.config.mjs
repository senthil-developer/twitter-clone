/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-twitter.up.railway.app/api/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
