/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "https://octopus-app-wjlta.ondigitalocean.app/graphql",
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["cyber-bucket-2.blr1.digitaloceanspaces.com"],
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
