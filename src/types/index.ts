
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

export interface CompanyBranch {
  id: string;
  name: string;
  description: string;
  location: string;
  businessField: BusinessField;
}

export interface Settings {
  basePrompt: string;
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
