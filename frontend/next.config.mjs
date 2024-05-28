/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-twitter.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
