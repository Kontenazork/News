
import { Article, CompanyBranch, Settings, DashboardMetrics, BusinessField, Product, ServiceStatus, DatabaseField, DatabaseSchema } from "@/types";

// Mock products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "SuperCluster X1",
    description: "High-performance computing cluster for scientific research",
    branchId: "1"
  },
  {
    id: "2",
    name: "DataVault Pro",
    description: "Secure storage solution for large datasets",
    branchId: "1"
  },
  {
    id: "3",
    name: "MiningRig 5000",
    description: "Energy-efficient Bitcoin mining hardware",
    branchId: "2"
  },
  {
    id: "4",
    name: "CryptoSecure Wallet",
    description: "Hardware wallet for cryptocurrency storage",
    branchId: "2"
  },
  {
    id: "5",
    name: "FlowCell Battery",
    description: "Grid-scale energy storage solution",
    branchId: "3"
  },
  {
    id: "6",
    name: "SolarStore Home",
    description: "Residential battery system for solar energy storage",
    branchId: "3"
  }
];

// Mock company branches
export const mockCompanyBranches: CompanyBranch[] = [
  {
    id: "1",
    name: "Kontena HPC",
    description: "High Performance Computing division focused on advanced computational solutions",
    location: "Helsinki, Finland",
    businessField: "HPC",
    products: mockProducts.filter(product => product.branchId === "1")
  },
  {
    id: "2",
    name: "Kontena Bitcoin",
    description: "Bitcoin mining and blockchain technology research",
    location: "Oslo, Norway",
    businessField: "Bitcoin",
    products: mockProducts.filter(product => product.branchId === "2")
  },
  {
    id: "3",
    name: "Kontena Energy",
    description: "Sustainable energy storage solutions and research",
    location: "Stockholm, Sweden",
    businessField: "Energy Storage",
    products: mockProducts.filter(product => product.branchId === "3")
  },
];

// Mock service statuses
export const mockServiceStatuses: ServiceStatus[] = [
  {
    id: "1",
    name: "OpenAI API",
    status: "operational",
    lastChecked: new Date().toISOString(),
    uptime: 99.98,
    responseTime: 245
  },
  {
    id: "2",
    name: "Perplexity API",
    status: "operational",
    lastChecked: new Date().toISOString(),
    uptime: 99.95,
    responseTime: 312
  },
  {
    id: "3",
    name: "Reddit API",
    status: "degraded",
    lastChecked: new Date().toISOString(),
    uptime: 97.8,
    responseTime: 520
  },
  {
    id: "4",
    name: "Supabase Database",
    status: "operational",
    lastChecked: new Date().toISOString(),
    uptime: 99.99,
    responseTime: 87
  },
  {
    id: "5",
    name: "Content Curator Service",
    status: "operational",
    lastChecked: new Date().toISOString(),
    uptime: 99.9,
    responseTime: 156
  },
  {
    id: "6",
    name: "Content Editor Service",
    status: "operational",
    lastChecked: new Date().toISOString(),
    uptime: 99.95,
    responseTime: 134
  }
];

// Mock database schema
export const mockDatabaseSchema: DatabaseSchema = {
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
      description: "Article content"
    },
    {
      id: "4",
      name: "source",
      type: "string",
      isRequired: true,
      description: "Source of the article"
    },
    {
      id: "5",
      name: "sourceUrl",
      type: "string",
      isRequired: true,
      description: "URL of the article source"
    },
    {
      id: "6",
      name: "publicationDate",
      type: "date",
      isRequired: true,
      description: "Publication date of the article"
    },
    {
      id: "7",
      name: "imageUrl",
      type: "string",
      isRequired: false,
      description: "URL of the article image"
    },
    {
      id: "8",
      name: "relevanceScores",
      type: "object",
      isRequired: true,
      description: "Relevance scores for the article"
    },
    {
      id: "9",
      name: "businessField",
      type: "string",
      isRequired: true,
      description: "Business field the article belongs to"
    },
    {
      id: "10",
      name: "keyInnovations",
      type: "array",
      isRequired: true,
      description: "Key innovations mentioned in the article"
    },
    {
      id: "11",
      name: "actionableInsights",
      type: "array",
      isRequired: true,
      description: "Actionable insights derived from the article"
    }
  ],
  outputFormat: "json",
  formatOptions: {
    prettyPrint: true,
    includeNulls: false
  }
};

// Mock articles
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Breakthrough in Quantum Computing Could Revolutionize HPC",
    content: "Researchers have achieved a significant breakthrough in quantum computing that could dramatically increase the capabilities of high-performance computing systems. The new approach allows for more stable qubits and reduced error rates.",
    source: "Quantum Computing Today",
    sourceUrl: "https://example.com/quantum-breakthrough",
    publicationDate: "2025-02-28T12:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
    relevanceScores: {
      technical: 4.8,
      business: 4.2,
      sustainability: 3.5,
      overall: 4.5,
    },
    businessField: "HPC",
    keyInnovations: [
      "Stable qubit architecture with 10x longer coherence time",
      "Error correction algorithm reducing computational errors by 75%",
      "Scalable design compatible with existing HPC infrastructure"
    ],
    actionableInsights: [
      "Consider partnership with research team for early access to technology",
      "Evaluate integration potential with current HPC systems",
      "Monitor patent filings in this space for competitive intelligence"
    ],
  },
  {
    id: "2",
    title: "New Bitcoin Mining Technique Reduces Energy Consumption by 40%",
    content: "A startup has developed a novel approach to Bitcoin mining that significantly reduces energy consumption while maintaining hash rates. The technique uses a combination of specialized hardware and optimized algorithms.",
    source: "Crypto Innovation News",
    sourceUrl: "https://example.com/bitcoin-energy-reduction",
    publicationDate: "2025-03-01T09:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000",
    relevanceScores: {
      technical: 4.3,
      business: 4.7,
      sustainability: 4.9,
      overall: 4.6,
    },
    businessField: "Bitcoin",
    keyInnovations: [
      "Custom ASIC design with improved energy efficiency",
      "Dynamic power management based on network difficulty",
      "Heat recapture system for additional energy savings"
    ],
    actionableInsights: [
      "Evaluate technology for potential licensing or acquisition",
      "Consider pilot implementation in smaller mining operations",
      "Analyze ROI based on current energy costs and Bitcoin price"
    ],
  },
  {
    id: "3",
    title: "Advanced Flow Battery Technology Shows Promise for Grid-Scale Storage",
    content: "A new type of flow battery has demonstrated exceptional performance in grid-scale energy storage tests. The technology offers longer cycle life and higher energy density than current lithium-ion solutions.",
    source: "Energy Storage Journal",
    sourceUrl: "https://example.com/flow-battery-advances",
    publicationDate: "2025-03-02T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000",
    relevanceScores: {
      technical: 4.5,
      business: 4.0,
      sustainability: 4.8,
      overall: 4.4,
    },
    businessField: "Energy Storage",
    keyInnovations: [
      "Novel electrolyte chemistry with 2x energy density",
      "Advanced membrane technology reducing crossover and degradation",
      "Modular design allowing for scalable deployment"
    ],
    actionableInsights: [
      "Explore potential for technology licensing for data center backup power",
      "Consider pilot project for renewable energy integration",
      "Monitor material supply chain implications"
    ],
  },
  {
    id: "4",
    title: "Liquid Cooling Breakthrough for Data Centers Cuts Energy Use by 30%",
    content: "A new liquid cooling system for data centers has demonstrated the ability to reduce cooling energy requirements by up to 30%. The system uses a non-conductive fluid and direct-to-chip cooling approach.",
    source: "Data Center Dynamics",
    sourceUrl: "https://example.com/liquid-cooling-innovation",
    publicationDate: "2025-03-03T10:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000",
    relevanceScores: {
      technical: 4.6,
      business: 4.4,
      sustainability: 4.3,
      overall: 4.4,
    },
    businessField: "HPC",
    keyInnovations: [
      "Direct-to-chip cooling with non-conductive fluid",
      "Modular retrofit design for existing data centers",
      "AI-controlled variable flow system optimizing cooling efficiency"
    ],
    actionableInsights: [
      "Evaluate potential implementation in current HPC facilities",
      "Calculate ROI based on current cooling costs",
      "Consider partnership with developer for customized solution"
    ],
  },
  {
    id: "5",
    title: "Bitcoin Lightning Network Capacity Reaches New All-Time High",
    content: "The Bitcoin Lightning Network has reached a new milestone with over 5,000 BTC in channel capacity. This growth indicates increasing adoption of Layer 2 solutions for Bitcoin transactions.",
    source: "Bitcoin Technical Review",
    sourceUrl: "https://example.com/lightning-network-growth",
    publicationDate: "2025-03-03T16:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000",
    relevanceScores: {
      technical: 4.0,
      business: 4.2,
      sustainability: 3.8,
      overall: 4.0,
    },
    businessField: "Bitcoin",
    keyInnovations: [
      "Improved channel management algorithms",
      "Enhanced routing efficiency reducing fees",
      "New node implementations with better stability"
    ],
    actionableInsights: [
      "Consider increasing Lightning Network node operations",
      "Evaluate opportunities for Lightning-based services",
      "Monitor impact on transaction fees and mining revenue"
    ],
  },
  {
    id: "6",
    title: "Solid-State Battery Startup Claims Energy Density Breakthrough",
    content: "A startup has announced a solid-state battery technology with energy density exceeding 400 Wh/kg, potentially doubling the capacity of current lithium-ion batteries while improving safety and longevity.",
    source: "Energy Innovation Today",
    sourceUrl: "https://example.com/solid-state-battery",
    publicationDate: "2025-03-04T08:10:00Z",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53b0097?q=80&w=1000",
    relevanceScores: {
      technical: 4.7,
      business: 4.3,
      sustainability: 4.5,
      overall: 4.5,
    },
    businessField: "Energy Storage",
    keyInnovations: [
      "Novel solid electrolyte with high ionic conductivity",
      "Manufacturing process compatible with existing production lines",
      "Extended cycle life exceeding 2000 full charge-discharge cycles"
    ],
    actionableInsights: [
      "Monitor company for potential investment or partnership opportunities",
      "Evaluate technology for data center backup applications",
      "Consider implications for renewable energy integration projects"
    ],
  },
];

// Mock settings
export const mockSettings: Settings = {
  basePrompt: "Find the latest technological innovations and news related to high-performance computing, Bitcoin mining, and energy storage solutions with a focus on efficiency, sustainability, and business impact.",
  companyBranches: mockCompanyBranches,
  keywords: ["high-performance computing", "HPC", "Bitcoin mining", "energy efficiency", "sustainable energy", "energy storage", "flow battery", "quantum computing"],
  timeframe: 7, // days
  sources: {
    websites: true,
    twitter: true,
    creditSources: false,
  },
  trustedSources: [
    "techcrunch.com",
    "wired.com",
    "nature.com",
    "science.org",
    "ieee.org",
    "arxiv.org"
  ],
  relevanceWeights: {
    technical: 0.4,
    business: 0.4,
    sustainability: 0.2,
  },
  minimumScore: 3.8,
  priorityKeywords: ["efficiency", "breakthrough", "sustainable", "innovation"],
  exclusionKeywords: ["rumor", "speculation", "unconfirmed"],
  displayOptions: {
    sortBy: "date",
    filterByBusinessField: "all",
  },
};

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalArticles: mockArticles.length,
  averageRelevanceScore: Number((mockArticles.reduce((sum, article) => sum + article.relevanceScores.overall, 0) / mockArticles.length).toFixed(1)),
  articlesByBusinessField: {
    "HPC": mockArticles.filter(a => a.businessField === "HPC").length,
    "Bitcoin": mockArticles.filter(a => a.businessField === "Bitcoin").length,
    "Energy Storage": mockArticles.filter(a => a.businessField === "Energy Storage").length,
  },
  recentArticles: mockArticles.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()).slice(0, 4),
};

// Mock service functions
export const mockDataService = {
  getArticles: () => Promise.resolve(mockArticles),
  getArticleById: (id: string) => Promise.resolve(mockArticles.find(article => article.id === id) || null),
  getArticlesByBusinessField: (field: BusinessField | "all") => {
    if (field === "all") {
      return Promise.resolve(mockArticles);
    }
    return Promise.resolve(mockArticles.filter(article => article.businessField === field));
  },
  getSettings: () => Promise.resolve(mockSettings),
  updateSettings: (settings: Settings) => Promise.resolve({ ...settings }),
  getDashboardMetrics: () => Promise.resolve(mockDashboardMetrics),
  getCompanyBranches: () => Promise.resolve(mockCompanyBranches),
  addCompanyBranch: (branch: Omit<CompanyBranch, "id" | "products">) => {
    const newBranch: CompanyBranch = {
      ...branch,
      id: String(mockCompanyBranches.length + 1),
      products: []
    };
    mockCompanyBranches.push(newBranch);
    return Promise.resolve(newBranch);
  },
  updateCompanyBranch: (branch: CompanyBranch) => {
    const index = mockCompanyBranches.findIndex(b => b.id === branch.id);
    if (index !== -1) {
      mockCompanyBranches[index] = branch;
    }
    return Promise.resolve(branch);
  },
  deleteCompanyBranch: (id: string) => {
    const index = mockCompanyBranches.findIndex(b => b.id === id);
    if (index !== -1) {
      mockCompanyBranches.splice(index, 1);
    }
    return Promise.resolve();
  },
  getProducts: () => Promise.resolve(mockProducts),
  getProductsByBranchId: (branchId: string) => Promise.resolve(mockProducts.filter(p => p.branchId === branchId)),
  addProduct: (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: String(mockProducts.length + 1)
    };
    mockProducts.push(newProduct);
    return Promise.resolve(newProduct);
  },
  updateProduct: (product: Product) => {
    const index = mockProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      mockProducts[index] = product;
    }
    return Promise.resolve(product);
  },
  deleteProduct: (id: string) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
    return Promise.resolve();
  },
  getServiceStatuses: () => Promise.resolve(mockServiceStatuses),
  updateServiceStatus: (status: ServiceStatus) => {
    const index = mockServiceStatuses.findIndex(s => s.id === status.id);
    if (index !== -1) {
      mockServiceStatuses[index] = status;
    }
    return Promise.resolve(status);
  },
  getDatabaseSchema: () => Promise.resolve(mockDatabaseSchema),
  updateDatabaseSchema: (schema: DatabaseSchema) => Promise.resolve(schema),
  addDatabaseField: (field: Omit<DatabaseField, "id">) => {
    const newField: DatabaseField = {
      ...field,
      id: String(mockDatabaseSchema.fields.length + 1)
    };
    mockDatabaseSchema.fields.push(newField);
    return Promise.resolve(newField);
  },
  updateDatabaseField: (field: DatabaseField) => {
    const index = mockDatabaseSchema.fields.findIndex(f => f.id === field.id);
    if (index !== -1) {
      mockDatabaseSchema.fields[index] = field;
    }
    return Promise.resolve(field);
  },
  deleteDatabaseField: (id: string) => {
    const index = mockDatabaseSchema.fields.findIndex(f => f.id === id);
    if (index !== -1) {
      mockDatabaseSchema.fields.splice(index, 1);
    }
    return Promise.resolve();
  }
};
