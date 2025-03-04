
export interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  publicationDate: string;
  imageUrl?: string;
  relevanceScores: {
    technical: number;
    business: number;
    sustainability: number;
    overall: number;
  };
  businessField: BusinessField;
  keyInnovations: string[];
  actionableInsights: string[];
}

export type BusinessField = "HPC" | "Bitcoin" | "Energy Storage";

export interface Product {
  id: string;
  name: string;
  description: string;
  branchId: string;
}

export interface CompanyBranch {
  id: string;
  name: string;
  description: string;
  location: string;
  businessField: BusinessField;
  products?: Product[];
}

export interface Settings {
  basePrompt: string;
  perplexityPrompt?: string;
  perplexityAutoRetry?: boolean;
  perplexityStream?: boolean;
  perplexityMaxTokens?: number;
  perplexityTemperature?: number;
  companyBranches: CompanyBranch[];
  keywords: string[];
  timeframe: number; // in days
  sources: {
    websites: boolean;
    twitter: boolean;
    creditSources: boolean;
  };
  trustedSources: string[];
  relevanceWeights: {
    technical: number;
    business: number;
    sustainability: number;
  };
  minimumScore: number;
  priorityKeywords: string[];
  exclusionKeywords: string[];
  displayOptions: {
    sortBy: "date" | "relevance";
    filterByBusinessField: BusinessField | "all";
  };
}

export interface DashboardMetrics {
  totalArticles: number;
  averageRelevanceScore: number;
  articlesByBusinessField: Record<BusinessField, number>;
  recentArticles: Article[];
}

export interface DatabaseField {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object" | "date";
  isRequired: boolean;
  description: string;
}

export interface DatabaseSchema {
  fields: DatabaseField[];
  outputFormat: "json" | "csv" | "xml";
  formatOptions: {
    prettyPrint: boolean;
    includeNulls: boolean;
  };
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  lastChecked: string;
  uptime: number; // percentage
  responseTime: number; // in ms
}
