import { 
  Settings,
  CompanyBranch,
  Product,
  DatabaseField,
  DatabaseSchema,
  Article,
  ServiceStatus,
  BusinessField
} from "@/types";

class MockDataService {
  async getSettings(): Promise<Settings> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      basePrompt: "Find the latest news and developments in...",
      editorPrompt: "Analyze and score articles based on...",
      perplexityPrompt: "Search for recent developments in...",
      perplexityAutoRetry: true,
      perplexityStream: true,
      perplexityMaxTokens: 1000,
      perplexityTemperature: 0.7,
      companyBranches: [],
      keywords: ["quantum computing", "ASIC", "GPU"],
      timeframe: 7,
      sources: {
        websites: true,
        twitter: true,
        creditSources: true
      },
      trustedSources: [],
      relevanceWeights: {
        technical: 0.5,
        business: 0.3,
        sustainability: 0.2
      },
      minimumScore: 3.8,
      priorityKeywords: [],
      exclusionKeywords: [],
      displayOptions: {
        sortBy: "relevance",
        filterByBusinessField: "all"
      }
    };
  }

  async updateSettings(settings: Settings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Settings updated:", settings);
  }

  async getCompanyBranches(): Promise<CompanyBranch[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return [];
  }

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return [];
  }

  async addCompanyBranch(branch: Omit<CompanyBranch, "id" | "products">): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Branch added:", branch);
  }

  async updateCompanyBranch(branch: CompanyBranch): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Branch updated:", branch);
  }

  async deleteCompanyBranch(branchId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Branch deleted:", branchId);
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Product added:", product);
  }

  async updateProduct(product: Product): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Product updated:", product);
  }

  async deleteProduct(productId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Product deleted:", productId);
  }

  async getDatabaseSchema(): Promise<DatabaseSchema> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      fields: [],
      outputFormat: "json",
      formatOptions: {
        prettyPrint: true,
        includeNulls: false
      }
    };
  }

  async addDatabaseField(field: Omit<DatabaseField, "id">): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Database field added:", field);
  }

  async updateDatabaseField(field: DatabaseField): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Database field updated:", field);
  }

  async deleteDatabaseField(fieldId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Database field deleted:", fieldId);
  }

  async updateDatabaseSchema(schema: DatabaseSchema): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Database schema updated:", schema);
  }

  async getServiceStatuses(): Promise<ServiceStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }

  async getArticles(): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [];
  }

  async getArticleById(id: string): Promise<Article> {
    const articles = await this.getArticles();
    const article = articles.find(a => a.id === id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  }
}

export const mockDataService = new MockDataService();
