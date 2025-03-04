
import { DashboardMetrics, Settings, Article, ServiceStatus, DatabaseSchema } from "@/types";

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
          content: "Researchers at MIT have achieved a significant breakthrough in quantum computing stability, maintaining quantum coherence for over 10 minutes. This development could accelerate the path to practical quantum computing applications in various fields including cryptography and complex system modeling.",
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
          content: "A new approach to Bitcoin mining is gaining traction, utilizing excess renewable energy that would otherwise be wasted. Several operations in Iceland and Norway are now using geothermal and hydroelectric power during off-peak hours, significantly reducing the carbon footprint of cryptocurrency mining while maintaining profitability.",
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
          content: "Toyota and Panasonic have jointly announced a major breakthrough in solid-state battery technology, achieving energy densities of 400 Wh/kg while maintaining fast charging capabilities. The new batteries are expected to enter production within two years and could revolutionize both electric vehicles and grid-scale energy storage.",
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
      basePrompt: "Find the latest news and developments in high-performance computing, Bitcoin mining, and energy storage technologies. Focus on technical innovations, business implications, and sustainability aspects.",
      editorPrompt: "Analyze and score articles based on their relevance to our business fields. Prioritize technical innovations and actionable insights. Format articles with clear structure and highlight key points.",
      perplexityPrompt: "Search for recent developments in HPC, Bitcoin mining, and energy storage with a focus on technical breakthroughs and business implications.",
      perplexityAutoRetry: true,
      perplexityStream: true,
      perplexityMaxTokens: 1000,
      perplexityTemperature: 0.7,
      companyBranches: [
        {
          id: "1",
          name: "Kontena HPC Division",
          description: "Focuses on high-performance computing solutions and services",
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
          description: "Specializes in cryptocurrency mining and blockchain solutions",
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
          description: "Develops energy storage solutions for data centers",
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

  async getArticleById(id: string): Promise<Article> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // This would normally fetch from an API, but we'll return mock data
    const articles = [
      {
        id: "1",
        title: "New Breakthrough in Quantum Computing",
        content: "Researchers at MIT have achieved a significant breakthrough in quantum computing stability, maintaining quantum coherence for over 10 minutes. This development could accelerate the path to practical quantum computing applications in various fields including cryptography and complex system modeling.\n\nThe team, led by Professor Sarah Chen, used a novel approach combining superconducting qubits with a new type of error correction algorithm that continuously monitors and adjusts for quantum decoherence.\n\n\"What makes this particularly exciting is that we're now approaching coherence times that could make quantum computing practical for certain real-world applications,\" explained Chen. \"Previously, maintaining quantum states for even a few seconds was challenging.\"\n\nThe implications for high-performance computing are substantial. Quantum computers excel at solving certain types of problems that are practically impossible for classical computers, such as simulating complex quantum systems for drug discovery or optimizing massive datasets.\n\nIndustry experts suggest this breakthrough could accelerate the timeline for practical quantum advantage in commercial applications by several years. Companies including IBM, Google, and Microsoft have already expressed interest in the new techniques.",
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
          "Room-temperature quantum operation demonstration",
          "Scalable architecture compatible with existing fabrication methods"
        ],
        actionableInsights: [
          "Monitor this research team for potential partnership opportunities",
          "Evaluate impact on our current encryption standards",
          "Consider implications for our HPC roadmap",
          "Assess potential integration with KontenaCluster for hybrid quantum-classical computing",
          "Explore training opportunities for our engineering team on quantum algorithms"
        ]
      },
      {
        id: "2",
        title: "Bitcoin Mining Using Excess Renewable Energy",
        content: "A new approach to Bitcoin mining is gaining traction, utilizing excess renewable energy that would otherwise be wasted. Several operations in Iceland and Norway are now using geothermal and hydroelectric power during off-peak hours, significantly reducing the carbon footprint of cryptocurrency mining while maintaining profitability.\n\nThe concept, known as \"opportunistic mining,\" involves deploying mobile mining units that can be quickly activated when excess renewable energy is available and shut down when demand from other sectors increases.\n\n\"The beauty of this approach is that we're essentially monetizing energy that would otherwise be wasted,\" said Erik Larsen, CEO of GreenHash, one of the companies pioneering this method. \"Renewable energy sources like wind and hydroelectric often generate excess capacity that can't be stored or transmitted efficiently.\"\n\nThe economics are compelling. By negotiating rates for otherwise wasted energy, these mining operations can secure electricity at costs 70-90% below standard industrial rates. This dramatically improves profitability even during periods of lower cryptocurrency prices.\n\nEnvironmental benefits are equally significant. Traditional Bitcoin mining has faced criticism for its substantial carbon footprint, with some estimates suggesting it consumes as much electricity as entire countries. This new approach could transform mining into a net positive for renewable energy development by providing a flexible demand source that improves the economic viability of new renewable projects.",
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
          "Containerized mining operations for mobility to energy sources",
          "Custom firmware that optimizes mining hardware for variable power conditions"
        ],
        actionableInsights: [
          "Explore similar approaches for our data centers",
          "Investigate partnerships with renewable energy providers",
          "Calculate potential cost savings from this model",
          "Consider adapting KontenaMiner hardware for opportunistic mining scenarios",
          "Evaluate regulatory implications in different jurisdictions"
        ]
      },
      {
        id: "3",
        title: "Breakthrough in Solid-State Battery Technology",
        content: "Toyota and Panasonic have jointly announced a major breakthrough in solid-state battery technology, achieving energy densities of 400 Wh/kg while maintaining fast charging capabilities. The new batteries are expected to enter production within two years and could revolutionize both electric vehicles and grid-scale energy storage.\n\nThe key innovation lies in a novel ceramic electrolyte material that allows for faster ion transport while eliminating the risk of thermal runaway that plagues traditional lithium-ion batteries. The solid-state design also enables higher energy density, longer cycle life, and improved safety.\n\n\"This represents the culmination of over a decade of research,\" said Dr. Takashi Yamamoto, lead scientist on the project. \"We've overcome the primary challenges that have limited solid-state battery commercialization: interface stability and manufacturing scalability.\"\n\nPerhaps most significantly, the companies claim their manufacturing process can be implemented using modified versions of existing production lines, potentially accelerating the timeline for mass production.\n\nFor grid-scale energy storage applications, the technology offers compelling advantages. The higher energy density means smaller footprint requirements for storage facilities, while the improved safety profile could reduce regulatory hurdles and insurance costs. The extended cycle life—reportedly over 2,000 complete charge-discharge cycles with minimal degradation—would significantly improve the economics of large-scale deployment.\n\nAnalysts suggest this development could accelerate the transition to renewable energy by addressing one of its primary challenges: cost-effective storage for intermittent generation sources like solar and wind.",
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
          "Extended cycle life of over 2,000 complete charges",
          "Energy density of 400 Wh/kg—nearly double current lithium-ion batteries",
          "Improved safety with elimination of flammable liquid electrolytes"
        ],
        actionableInsights: [
          "Evaluate implications for our energy storage projects",
          "Consider early partnership or licensing opportunities",
          "Assess impact on our current battery suppliers",
          "Explore potential integration with KontenaStore systems",
          "Update our energy storage roadmap to account for this technology"
        ]
      }
    ];
    
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
}

export const mockDataService = new MockDataService();
