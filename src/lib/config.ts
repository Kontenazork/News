
import { z } from "zod";

const configSchema = z.object({
  perplexity: z.object({
    apiKey: z.string().optional(),
    endpoint: z.string().url().optional(),
  }).optional(),
  openai: z.object({
    apiKey: z.string().optional(),
  }).optional(),
  pinecone: z.object({
    apiKey: z.string().optional(),
    url: z.string().url().optional(),
    namespace: z.string().optional(),
    index: z.string().optional(),
    environment: z.string().optional(),
  }).optional(),
  supabase: z.object({
    url: z.string().url().optional(),
    anonKey: z.string().optional(),
    serviceKey: z.string().optional(),
  }).optional(),
  setup: z.object({
    secretKey: z.string().optional(),
  }).optional(),
  app: z.object({
    useMockData: z.boolean().optional(),
  }).optional(),
}).partial();

export type Config = z.infer<typeof configSchema>;

const getConfig = (): Config => {
  const config = {
    perplexity: {
      apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY || "",
      endpoint: process.env.NEXT_PUBLIC_PERPLEXITY_ENDPOINT || "",
    },
    openai: {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    },
    pinecone: {
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY || "",
      url: process.env.NEXT_PUBLIC_PINECONE_URL || "",
      namespace: process.env.NEXT_PUBLIC_PINECONE_NAMESPACE || "",
      index: process.env.NEXT_PUBLIC_PINECONE_INDEX || "",
      environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT || "",
    },
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      serviceKey: process.env.SUPABASE_SERVICE_KEY || "",
    },
    setup: {
      secretKey: process.env.SETUP_SECRET_KEY || "",
    },
    app: {
      useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
    },
  };

  try {
    return configSchema.parse(config);
  } catch (error) {
    console.error("Configuration validation failed:", error);
    return config; // Return config even if validation fails
  }
};

export const config = getConfig();
