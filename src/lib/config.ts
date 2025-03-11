
import { z } from "zod";

const configSchema = z.object({
  perplexity: z.object({
    apiKey: z.string(),
    endpoint: z.string().url(),
  }),
  openai: z.object({
    apiKey: z.string().optional(),
  }),
  pinecone: z.object({
    apiKey: z.string(),
    url: z.string().url(),
    namespace: z.string(),
    index: z.string(),
    environment: z.string(),
  }),
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string(),
    serviceKey: z.string(),
  }),
  setup: z.object({
    secretKey: z.string(),
  }),
  app: z.object({
    useMockData: z.boolean(),
  }),
});

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
    throw new Error("Invalid configuration");
  }
};

export const config = getConfig();
