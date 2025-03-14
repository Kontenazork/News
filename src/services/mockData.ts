import { 
  Settings,
  CompanyBranch,
  Product,
  DatabaseField,
  DatabaseSchema,
  Article,
  ServiceStatus,
  BusinessField,
  DashboardMetrics
} from "@/types";
import { config } from '@/lib/config';

class MockDataService {
  private mockData: {
    settings: Settings;
    branches: CompanyBranch[];
    products: Product[];
    schema: DatabaseSchema;
    articles: Article[];
  } = {
    settings: {
      basePrompt: 'Find the latest news and developments in...',
      editorPrompt: 'Analyze and score articles based on...',
      perplexityPrompt: 'Search for recent developments in...',
      perplexityAutoRetry: true,
      perplexityStream: true,
      perplexityMaxTokens: 1000,
      perplexityTemperature: 0.7,
      companyBranches: [],
      keywords: ['quantum computing', 'ASIC', 'GPU'],
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
        sortBy: 'relevance',
        filterByBusinessField: 'all'
      },
      competitorAnalysis: {
        enabled: true,
        competitors: ['Competitor A', 'Competitor B', 'Competitor C'],
        updateFrequency: 24,
        minMentionsThreshold: 3,
        autoGenerateReports: true
      },
      vectorDatabase: {
        enabled: false,
        provider: 'pinecone',
        apiKey: '',
        environment: '',
        indexName: 'articles',
        dimension: 1536,
        namespace: 'news',
        searchParameters: {
          topK: 5,
          minScore: 0.7,
          includeMetadata: true
        }
      }
    },
    branches: [],
    products: [],
    schema: {
      fields: [],
      outputFormat: 'json',
      formatOptions: {
        prettyPrint: true,
        includeNulls: false
      }
    },
    articles: []
  };

  async getSettings(): Promise<Settings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockData.settings;
  }

  async updateSettings(settings: Settings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.mockData.settings = settings;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    if (!config.app.useMockData) {
      // In production, fetch real data
      throw new Error('Real API implementation pending');
    }
    
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      totalArticles: 42,
      averageRelevanceScore: 4.2,
      articlesByBusinessField: {
        HPC: 15,
        Bitcoin: 12,
        "Energy Storage": 15
      },
      recentArticles: [
        {
          id: "1",
          title: "Latest Developments in HPC",
          content: "Recent advancements in high-performance computing...",
          source: "Tech Weekly",
          sourceUrl: "https://example.com/article1",
          publicationDate: new Date().toISOString(),
          imageUrl: "https://example.com/image1.jpg",
          relevanceScores: {
            technical: 4.5,
            business: 4.2,
            sustainability: 3.8,
            overall: 4.2
          },
          businessField: "HPC",
          keyInnovations: [
            "Innovation 1",
            "Innovation 2"
          ],
          actionableInsights: [
            "Insight 1",
            "Insight 2"
          ]
        }
      ]
    };
  }

  async getCompanyBranches(): Promise<CompanyBranch[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return this.mockData.branches;
  }

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return this.mockData.products;
  }

  async addCompanyBranch(branch: Omit<CompanyBranch, "id" | "products">): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    this.mockData.branches.push({ ...branch, id: String(this.mockData.branches.length + 1), products: [] });
    console.log("Branch added:", branch);
  }

  async updateCompanyBranch(branch: CompanyBranch): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = this.mockData.branches.findIndex(b => b.id === branch.id);
    if (index !== -1) {
      this.mockData.branches[index] = branch;
      console.log("Branch updated:", branch);
    }
  }

  async deleteCompanyBranch(branchId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    this.mockData.branches = this.mockData.branches.filter(b => b.id !== branchId);
    console.log("Branch deleted:", branchId);
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    this.mockData.products.push({ ...product, id: String(this.mockData.products.length + 1) });
    console.log("Product added:", product);
  }

  async updateProduct(product: Product): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = this.mockData.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.mockData.products[index] = product;
      console.log("Product updated:", product);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    this.mockData.products = this.mockData.products.filter(p => p.id !== productId);
    console.log("Product deleted:", productId);
  }

  async getDatabaseSchema(): Promise<DatabaseSchema> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return this.mockData.schema;
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
    this.mockData.schema = schema;
    console.log("Database schema updated:", schema);
  }

  async getServiceStatuses(): Promise<ServiceStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }

  async getArticles(): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockData.articles;
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