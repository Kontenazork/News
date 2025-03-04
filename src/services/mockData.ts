import {
  DashboardMetrics,
  Settings,
  Article,
  ServiceStatus,
  DatabaseSchema,
  CompanyBranch,
  Product,
  BusinessField
} from "@/types";

class MockDataService {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      totalArticles: 42,
      averageRelevanceScore: 4.2,
      articlesByBusinessField: {
        "HPC": 18,
        "Bitcoin": 14,
        "Energy Storage": 10
      },
      recentArticles: [
        {
          id: "1",
          title: "New Breakthrough in Quantum Computing",
          content: "Researchers at MIT...",
          source: "MIT Technology Review",
          sourceUrl: "https://example.com/quantum-breakthrough",
          publicationDate: "2025-03-01T12:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0097?q=80&w=1000",
          relevanceScores: {
            technical: 4.8,
            business: 4.2,
            sustainability: 3.5,
            overall: 4.5
          },
          businessField: "HPC",
          keyInnovations: [
            "Extended quantum coherence time to over 10 minutes",
            "New error correction algorithms for quantum states",
            "Room-temperature quantum operation demonstration"
          ],
          actionableInsights: [
            "Monitor this research team for potential partnership opportunities",
            "Evaluate impact on our current encryption standards",
            "Consider implications for our HPC roadmap"
          ]
        },
        {
          id: "2",
          title: "Bitcoin Mining Using Excess Renewable Energy",
          content: "A new approach to Bitcoin mining...",
          source: "CoinDesk",
          sourceUrl: "https://example.com/bitcoin-renewable",
          publicationDate: "2025-02-28T09:15:00Z",
          relevanceScores: {
            technical: 3.9,
            business: 4.5,
            sustainability: 4.7,
            overall: 4.3
          },
          businessField: "Bitcoin",
          keyInnovations: [
            "Smart switching systems to utilize only excess renewable energy",
            "Predictive algorithms for optimal energy usage timing",
            "Containerized mining operations for mobility to energy sources"
          ],
          actionableInsights: [
            "Explore similar approaches for our data centers",
            "Investigate partnerships with renewable energy providers",
            "Calculate potential cost savings from this model"
          ]
        },
        {
          id: "3",
          title: "Breakthrough in Solid-State Battery Technology",
          content: "Toyota and Panasonic have jointly announced...",
          source: "Electrek",
          sourceUrl: "https://example.com/solid-state-battery",
          publicationDate: "2025-02-25T14:30:00Z",
          relevanceScores: {
            technical: 4.3,
            business: 4.0,
            sustainability: 4.8,
            overall: 4.4
          },
          businessField: "Energy Storage",
          keyInnovations: [
            "New ceramic electrolyte material with superior conductivity",
            "Manufacturing process compatible with existing production lines",
            "Extended cycle life of over 2,000 complete charges"
          ],
          actionableInsights: [
            "Evaluate implications for our energy storage projects",
            "Consider early partnership or licensing opportunities",
            "Assess impact on our current battery suppliers"
          ]
        }
      ]
    };
  }

  async getSettings(): Promise<Settings> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      basePrompt: "Find the latest news and developments in...",
      editorPrompt: "Analyze and score articles based on...",
      perplexityPrompt: "Search for recent developments in...",
      perplexityAutoRetry: true,
      perplexityStream: true,
      perplexityMaxTokens: 1000,
      perplexityTemperature: 0.7,
      companyBranches: [
        {
          id: "1",
          name: "Kontena HPC Division",
          description: "Focuses on high-performance computing...",
          location: "Helsinki, Finland",
          businessField: "HPC",
          products: [
            {
              id: "101",
              name: "KontenaCluster",
              description: "High-density compute cluster solution",
              branchId: "1"
            },
            {
              id: "102",
              name: "KontenaFlow",
              description: "HPC workflow management software",
              branchId: "1"
            }
          ]
        },
        {
          id: "2",
          name: "Kontena Crypto",
          description: "Specializes in cryptocurrency mining...",
          location: "Zurich, Switzerland",
          businessField: "Bitcoin",
          products: [
            {
              id: "201",
              name: "KontenaMiner",
              description: "Energy-efficient Bitcoin mining hardware",
              branchId: "2"
            }
          ]
        },
        {
          id: "3",
          name: "Kontena Energy",
          description: "Develops energy storage solutions for...",
          location: "Stockholm, Sweden",
          businessField: "Energy Storage",
          products: [
            {
              id: "301",
              name: "KontenaStore",
              description: "Grid-scale energy storage system",
              branchId: "3"
            },
            {
              id: "302",
              name: "KontenaBalance",
              description: "Energy management software for data centers",
              branchId: "3"
            }
          ]
        }
      ],
      keywords: ["quantum computing", "ASIC", "GPU", "renewable energy", "solid-state battery", "liquid cooling"],
      timeframe: 7, // days
      sources: {
        websites: true,
        twitter: true,
        creditSources: true
      },
      trustedSources: [
        "techcrunch.com",
        "wired.com",
        "thenextweb.com",
        "coindesk.com",
        "electrek.co"
      ],
      relevanceWeights: {
        technical: 0.5,
        business: 0.3,
        sustainability: 0.2
      },
      minimumScore: 3.8,
      priorityKeywords: ["energy efficiency", "breakthrough", "cost reduction", "scalability"],
      exclusionKeywords: ["rumor", "unconfirmed", "speculation"],
      displayOptions: {
        sortBy: "relevance",
        filterByBusinessField: "all"
      }
    };
  }

  async updateSettings(settings: Settings): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send the settings to an API
    console.log("Settings updated:", settings);
  }

  async getArticles(): Promise<Article[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return a list of all articles
    return [
      {
        id: "1",
        title: "New Breakthrough in Quantum Computing",
        content: "Researchers at MIT have achieved...",
        source: "MIT Technology Review",
        sourceUrl: "https://example.com/quantum-breakthrough",
        publicationDate: "2025-03-01T12:00:00Z",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0097?q=80&w=1000",
        relevanceScores: {
          technical: 4.8,
          business: 4.2,
          sustainability: 3.5,
          overall: 4.5
        },
        businessField: "HPC",
        keyInnovations: [
          "Extended quantum coherence time to over 10 minutes",
          "New error correction algorithms...",
          "Room-temperature quantum operation demonstration",
          "Scalable architecture compatible..."
        ],
        actionableInsights: [
          "Monitor this research team...",
          "Evaluate impact on our current encryption standards...",
          "Consider implications for our HPC roadmap...",
          "Assess potential integration...",
          "Explore training opportunities..."
        ]
      },
      {
        id: "2",
        title: "Bitcoin Mining Using Excess Renewable Energy",
        content: "A new approach to Bitcoin mining is gaining traction...",
        source: "CoinDesk",
        sourceUrl: "https://example.com/bitcoin-renewable",
        publicationDate: "2025-02-28T09:15:00Z",
        relevanceScores: {
          technical: 3.9,
          business: 4.5,
          sustainability: 4.7,
          overall: 4.3
        },
        businessField: "Bitcoin",
        keyInnovations: [
          "Smart switching systems to utilize only excess renewable energy",
          "Predictive algorithms...",
          "Containerized mining operations...",
          "Custom firmware optimizing..."
        ],
        actionableInsights: [
          "Explore similar approaches...",
          "Investigate partnerships with renewable energy providers...",
          "Calculate potential cost savings...",
          "Consider adapting KontenaMiner...",
          "Evaluate regulatory implications..."
        ]
      },
      {
        id: "3",
        title: "Breakthrough in Solid-State Battery Technology",
        content: "Toyota and Panasonic have jointly announced...",
        source: "Electrek",
        sourceUrl: "https://example.com/solid-state-battery",
        publicationDate: "2025-02-25T14:30:00Z",
        relevanceScores: {
          technical: 4.3,
          business: 4.0,
          sustainability: 4.8,
          overall: 4.4
        },
        businessField: "Energy Storage",
        keyInnovations: [
          "New ceramic electrolyte material with superior conductivity",
          "Manufacturing process compatible...",
          "Extended cycle life of over 2,000 complete charges",
          "Energy density of 400 Wh/kg...",
          "Improved safety with elimination..."
        ],
        actionableInsights: [
          "Evaluate implications for our energy storage projects",
          "Consider early partnership...",
          "Assess impact on our current battery suppliers",
          "Explore potential integration...",
          "Update our energy storage roadmap..."
        ]
      },
      {
        id: "4",
        title: "Advanced Cooling Systems for Data Centers",
        content: "A new liquid cooling technology developed by Cooler Master...",
        source: "Data Center Dynamics",
        sourceUrl: "https://example.com/liquid-cooling-datacenter",
        publicationDate: "2025-02-20T10:15:00Z",
        relevanceScores: {
          technical: 4.6,
          business: 4.4,
          sustainability: 4.9,
          overall: 4.6
        },
        businessField: "HPC",
        keyInnovations: [
          "Direct-to-chip liquid cooling technology",
          "Non-conductive fluid with improved thermal properties",
          "Modular design for easy retrofitting...",
          "AI-controlled flow optimization system"
        ],
        actionableInsights: [
          "Evaluate potential for implementation...",
          "Calculate ROI based on our current cooling costs",
          "Consider pilot program...",
          "Assess compatibility with KontenaCluster hardware"
        ]
      },
      {
        id: "5",
        title: "Regulatory Changes for Cryptocurrency Mining in EU",
        content: "The European Parliament has approved new regulations...",
        source: "Bloomberg",
        sourceUrl: "https://example.com/eu-crypto-regulations",
        publicationDate: "2025-02-18T14:30:00Z",
        relevanceScores: {
          technical: 2.8,
          business: 4.7,
          sustainability: 4.5,
          overall: 4.0
        },
        businessField: "Bitcoin",
        keyInnovations: [
          "Standardized energy reporting framework",
          "Tiered compliance requirements based on operation size",
          "Carbon offset marketplace specifically..."
        ],
        actionableInsights: [
          "Review our Zurich operation's compliance...",
          "Accelerate renewable energy integration plans...",
          "Engage with EU regulators...",
          "Consider strategic partnerships..."
        ]
      }
    ];
  }

  async getArticleById(id: string): Promise<Article> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Get all articles and find the one with matching ID
    const articles = await this.getArticles();
    const article = articles.find(a => a.id === id);
    
    if (!article) {
      throw new Error("Article not found");
    }
    
    return article;
  }

  async getServiceStatuses(): Promise<ServiceStatus[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: "1",
        name: "OpenAI API",
        status: "operational",
        lastChecked: new Date().toISOString(),
        uptime: 99.8,
        responseTime: 245
      },
      {
        id: "2",
        name: "Perplexity API",
        status: "operational",
        lastChecked: new Date().toISOString(),
        uptime: 99.5,
        responseTime: 320
      },
      {
        id: "3",
        name: "Supabase Database",
        status: "operational",
        lastChecked: new Date().toISOString(),
        uptime: 100,
        responseTime: 85
      },
      {
        id: "4",
        name: "Reddit API",
        status: "degraded",
        lastChecked: new Date().toISOString(),
        uptime: 95.2,
        responseTime: 850
      }
    ];
  }

  async getDatabaseSchema(): Promise<DatabaseSchema> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      fields: [
        {
          id: "1",
          name: "id",
          type: "string",
          isRequired: true,
          description: "Unique identifier for the article"
        },
        {
          id: "2",
          name: "title",
          type: "string",
          isRequired: true,
          description: "Article title"
        },
        {
          id: "3",
          name: "content",
          type: "string",
          isRequired: true,
          description: "Full article content"
        },
        {
          id: "4",
          name: "source",
          type: "string",
          isRequired: true,
          description: "Source name (e.g., publication)"
        },
        {
          id: "5",
          name: "sourceUrl",
          type: "string",
          isRequired: true,
          description: "URL to the original article"
        },
        {
          id: "6",
          name: "publicationDate",
          type: "date",
          isRequired: true,
          description: "When the article was published"
        },
        {
          id: "7",
          name: "imageUrl",
          type: "string",
          isRequired: false,
          description: "URL to the article's featured image"
        },
        {
          id: "8",
          name: "relevanceScores",
          type: "object",
          isRequired: true,
          description: "Scores for different relevance categories"
        },
        {
          id: "9",
          name: "businessField",
          type: "string",
          isRequired: true,
          description: "Business field the article relates to"
        },
        {
          id: "10",
          name: "keyInnovations",
          type: "array",
          isRequired: true,
          description: "List of key innovations mentioned in the article"
        },
        {
          id: "11",
          name: "actionableInsights",
          type: "array",
          isRequired: true,
          description: "List of actionable insights derived from the article"
        }
      ],
      outputFormat: "json",
      formatOptions: {
        prettyPrint: true,
        includeNulls: false
      }
    };
  }

  // -------------------------------------------
  // Company Branches and Products methods
  // -------------------------------------------
  async getCompanyBranches(): Promise<CompanyBranch[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Get the branches from the settings
    const settings = await this.getSettings();
    return settings.companyBranches;
  }

  async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Get all products from all branches
    const branches = await this.getCompanyBranches();
    const products: Product[] = [];
    
    branches.forEach(branch => {
      if (branch.products) {
        products.push(...branch.products);
      }
    });
    
    return products;
  }

  async addCompanyBranch(branchData: Omit<CompanyBranch, "id" | "products">): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would add the branch to the database
    console.log("Branch added:", branchData);
  }

  async updateCompanyBranch(branch: CompanyBranch): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would update the branch in the database
    console.log("Branch updated:", branch);
  }

  // ------------------------------
  // Missing methods added below
  // ------------------------------

  // 5. Delete a Company Branch
  async deleteCompanyBranch(branchId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // In a real app, this would delete the branch from the database
    console.log("Branch deleted:", branchId);
  }

  // 6. Add a Product
  async addProduct(branchId: string, product: Omit<Product, "id">): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // In a real app, this would add the product to the specified branch in the database
    console.log(`Product added to branch ${branchId}:`, product);
  }

  // 7. Update a Product
  async updateProduct(product: Product): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // In a real app, this would update the product in the database
    console.log("Product updated:", product);
  }

  // 8. Delete a Product
  async deleteProduct(productId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // In a real app, this would delete the product from the database
    console.log("Product deleted:", productId);
  }
}

// Create and export an instance of the service
export const mockDataService = new MockDataService();
