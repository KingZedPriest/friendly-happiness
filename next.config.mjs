/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["nexlog"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "extraordinairetalents.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
