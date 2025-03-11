
import { z } from "zod";

const configSchema = z.object({
  perplexity: z.object({
    apiKey: z.string().default(""),
    endpoint: z.string().url().optional().default(""),
  }).default({}),
  openai: z.object({
    apiKey: z.string().default(""),
  }).default({}),
  pinecone: z.object({
    apiKey: z.string().default(""),
    url: z.string().url().default(""),
    namespace: z.string().default(""),
    index: z.string().default(""),
    environment: z.string().default(""),
  }).default({}),
  supabase: z.object({
    url: z.string().url().default(""),
    anonKey: z.string().default(""),
    serviceKey: z.string().default(""),
  }).default({}),
  setup: z.object({
    secretKey: z.string().default(""),
  }).default({}),
  app: z.object({
    useMockData: z.boolean().default(false),
  }).default({ useMockData: false }),
}).default({});

export type Config = z.infer<typeof configSchema>;

const getConfig = (): Config => {
  const config = {
    perplexity: {
      apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY || "",
      endpoint: process.env.NEXT_PUBLIC_PERPLEXITY_ENDPOINT || "",
    },
    openai: {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
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

  return configSchema.parse(config);
};

export const config = getConfig();
