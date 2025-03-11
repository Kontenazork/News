
import { Article, BusinessField } from "@/types";

export interface ResearchTask {
  id: string;
  businessField: BusinessField;
  keywords: string[];
  status: "pending" | "in_progress" | "completed";
  results?: Article[];
}

export interface AgentResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface ResearchLeaderConfig {
  basePrompt: string;
  businessFields: BusinessField[];
  keywords: string[];
  timeframe: number;
}

export interface ProjectPlannerConfig {
  maxParallelTasks: number;
  taskPriority: "balanced" | "depth" | "breadth";
}

export interface ResearchAssistantConfig {
  perplexityPrompt: string;
  perplexityMaxTokens: number;
  perplexityTemperature: number;
  autoRetry: boolean;
  stream: boolean;
}

export interface EditorConfig {
  editorPrompt: string;
  relevanceWeights: {
    technical: number;
    business: number;
    sustainability: number;
  };
  minimumScore: number;
}
