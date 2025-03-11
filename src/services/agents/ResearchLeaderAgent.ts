import { ResearchLeaderConfig, AgentResult, ResearchTask } from "./types";
import { BusinessField } from "@/types";

export class ResearchLeaderAgent {
  private config: ResearchLeaderConfig;
  private vectorEnabled: boolean;

  constructor(config: ResearchLeaderConfig) {
    this.config = config;
    this.vectorEnabled = config.vectorEnabled || false;
  }

  async establishScope(): Promise<AgentResult> {
    try {
      const tasks: ResearchTask[] = await Promise.all(
        this.config.businessFields.map(async field => ({
          id: `task-${field}-${Date.now()}`,
          businessField: field,
          keywords: await this.refineKeywords(field),
          status: "pending"
        }))
      );

      return {
        success: true,
        data: tasks
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error in ResearchLeaderAgent"
      };
    }
  }

  private async refineKeywords(field: BusinessField): Promise<string[]> {
    const baseKeywords = this.config.keywords.filter(k => this.isKeywordRelevant(k, field));
    
    if (!this.vectorEnabled) {
      return baseKeywords;
    }

    try {
      // If vector search is enabled, refine keywords using semantic search
      const refinedKeywords = await this.performVectorSearch(field, baseKeywords);
      return [...new Set([...baseKeywords, ...refinedKeywords])];
    } catch (error) {
      console.warn('Vector search failed, falling back to base keywords:', error);
      return baseKeywords;
    }
  }

  private async performVectorSearch(field: BusinessField, baseKeywords: string[]): Promise<string[]> {
    // This would be implemented to use the configured vector database
    // For now, return base keywords
    return baseKeywords;
  }

  private isKeywordRelevant(keyword: string, field: BusinessField): boolean {
    const fieldKeywords = {
      HPC: ['computing', 'supercomputer', 'processor', 'quantum', 'performance'],
      Bitcoin: ['mining', 'cryptocurrency', 'blockchain', 'hash', 'power'],
      'Energy Storage': ['battery', 'renewable', 'grid', 'storage', 'efficiency']
    };

    const relevantKeywords = fieldKeywords[field] || [];
    return relevantKeywords.some(k => 
      keyword.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}