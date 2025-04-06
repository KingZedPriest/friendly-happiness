/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
//   serverExternalPackages: [
//     "@aws-sdk/client-s3",
//     "@aws-sdk/s3-request-presigner",
//   ],
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
