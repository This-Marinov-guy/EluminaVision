
const nextConfig = {
  domains: [
    // Include your existing domains here
    "api.microlink.io",
  ],
  images: {
    remotePatterns: [
      // Include your existing patterns here
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Suppresses ESLint errors in Vercel
  },
  compress: true,
  /* config options here */
};

export default nextConfig;
