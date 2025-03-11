
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_PERPLEXITY_API_KEY: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY,
    NEXT_PUBLIC_PINECONE_API_KEY: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    NEXT_PUBLIC_PINECONE_URL: process.env.NEXT_PUBLIC_PINECONE_URL,
    NEXT_PUBLIC_PINECONE_NAMESPACE: process.env.NEXT_PUBLIC_PINECONE_NAMESPACE,
    NEXT_PUBLIC_PINECONE_INDEX: process.env.NEXT_PUBLIC_PINECONE_INDEX,
    NEXT_PUBLIC_PINECONE_ENVIRONMENT: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT,
    NEXT_PUBLIC_USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA
  },
  experimental: {
    optimizePackageImports: ['@/components/ui']
  },
};

export default nextConfig;
