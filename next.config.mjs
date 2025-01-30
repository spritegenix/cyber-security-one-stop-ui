/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: process.env.NEXT_PUBLIC_BASE_GQL_URL,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["cyber-bucket-2.blr1.digitaloceanspaces.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "#",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
