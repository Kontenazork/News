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
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    REDDIT_API_KEY: process.env.REDDIT_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    WEAVIATE_API_KEY: process.env.WEAVIATE_API_KEY,
    QDRANT_API_KEY: process.env.QDRANT_API_KEY,
  },
  experimental: {
    optimizePackageImports: ['@/components/ui'],
    optimizeFonts: true,
  },
};

export default nextConfig;