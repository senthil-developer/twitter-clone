/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        // {
        //   source: "/api/:path*",
        //   destination: "https://api-twitter.up.railway.app/api/:path*",
        // },
        {
          source: '/api/:path*',
          destination: `${process.env.SERVER_URL}/api/:path*`,
        },
      ],
    }
  },
}

export default nextConfig
