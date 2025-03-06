
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Suppresses ESLint errors in Vercel
  },
  /* config options here */
  output: "standalone",
};

export default nextConfig;
