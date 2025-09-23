/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["nexlog"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  serverExternalPackages: [
    "@aws-sdk/client-s3",
  ],
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
