import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Share2, Workflow, Zap } from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import mermaid to avoid SSR issues
const Mermaid = dynamic(
  () => import('mermaid').then(mod => {
    mod.default.initialize({
      startOnLoad: true,
      theme: 'dark',
      flowchart: {
        curve: 'basis',
        padding: 20
      }
    });
    return mod.default;
  }),
  { ssr: false }
);

const flowchartDefinitions = {
  workflow: `
    graph TB
      TeamLeader[Team Leader] --> BasePrompt[Set Base Prompt]
      TeamLeader --> VectorSearch[Configure Vector Search]
      TeamLeader --> Branches[Manage Branches]
      
      Assistant[Assistant] --> Keywords[Manage Keywords]
      Assistant --> Sources[Configure Sources]
      Assistant --> Search[Perplexity Search]
      
      Editor[Editor] --> Scoring[Relevance Scoring]
      Editor --> Content[Content Refinement]
      Editor --> Quality[Quality Assurance]
      
      BasePrompt --> Pipeline[Processing Pipeline]
      Keywords --> Pipeline
      Sources --> Pipeline
      
      Pipeline --> FinalOutput[Final Output]
      Scoring --> FinalOutput
      Quality --> FinalOutput
  `,
  apiFlow: `
    graph TB
      Input[User Input] --> OpenAI[OpenAI API]
      Input --> Perplexity[Perplexity API]
      Input --> Vector[Vector Database]
      
      OpenAI --> Processing[Content Processing]
      Perplexity --> Search[News Search]
      Vector --> Semantic[Semantic Search]
      
      Processing --> Integration[Integration Layer]
      Search --> Integration
      Semantic --> Integration
      
      Integration --> Output[Final Output]
      
      class OpenAI,Perplexity,Vector emphasis;
  `,
  pricing: `
    graph TB
      OpenAI[OpenAI Costs] --> Processing[$0.0005/1K tokens]
      OpenAI --> Generation[$0.0015/1K tokens]
      OpenAI --> Embedding[$0.0001/1K tokens]
      
      Perplexity[Perplexity Costs] --> Basic[$0.05/query]
      Perplexity --> Advanced[$0.10/query]
      Perplexity --> Streaming[$0.15/query]
      
      Vector[Vector DB Costs] --> Storage[Storage Volume]
      Vector --> Queries[Query Frequency]
      Vector --> Dimensions[Vector Dimensions]
      
      class OpenAI,Perplexity,Vector emphasis;
  `
};

export default function DocumentationPage() {
  const docs = [
    {
      id: "workflow",
      title: "System Workflow",
      description: "Understanding how the system processes and curates news",
      icon: <Workflow className="h-5 w-5" />,
      sections: [
        {
          title: "Team Leader Role",
          content: `The Team Leader is responsible for:
          • Setting the base prompt for news curation
          • Configuring vector search parameters
          • Managing company branches and products
          • Overseeing the overall curation strategy
          • Reviewing and approving final outputs`
        },
        {
          title: "Assistant Role",
          content: `The Assistant handles:
          • Integrating with Perplexity API
          • Managing search parameters and keywords
          • Configuring trusted sources
          • Processing search results
          • Initial content filtering`
        },
        {
          title: "Editor Role",
          content: `The Editor is responsible for:
          • Content refinement and formatting
          • Relevance scoring
          • Priority and exclusion keyword management
          • Final content presentation
          • Quality assurance`
        }
      ]
    },
    {
      id: "system-flow",
      title: "System Architecture & Flow",
      description: "Detailed system architecture and data flow",
      icon: <Share2 className="h-5 w-5" />,
      sections: [
        {
          title: "Content Collection Flow",
          content: `1. User Configuration
          • Team Leader sets base parameters
          • Assistant configures search criteria
          • Editor defines relevance rules
          
          2. Data Gathering
          • Perplexity API searches news sources
          • RSS feeds are monitored
          • Social media streams are tracked
          • Competitor websites are analyzed
          
          3. Initial Processing
          • Content is vectorized for semantic search
          • Preliminary relevance scoring
          • Duplicate detection
          • Source verification`
        },
        {
          title: "Processing Pipeline",
          content: `1. Content Enhancement
          • OpenAI processes raw content
          • Key insights are extracted
          • Summaries are generated
          • Relevance scores are calculated
          
          2. Categorization
          • Business field classification
          • Topic clustering
          • Trend identification
          • Priority assignment
          
          3. Final Processing
          • Editor reviews and refines
          • Format standardization
          • Quality checks
          • Final approval`
        },
        {
          title: "Output Generation",
          content: `1. Report Generation
          • Executive summaries created
          • Trend analysis compiled
          • Action items identified
          • Competitive insights formatted
          
          2. Distribution
          • Reports are stored in vector database
          • Notifications are sent
          • Dashboard is updated
          • Archives are maintained`
        }
      ]
    },
    {
      id: "api-integration",
      title: "API Integration",
      description: "Understanding the external API integrations",
      icon: <Zap className="h-5 w-5" />,
      sections: [
        {
          title: "OpenAI Integration",
          content: `OpenAI API Flow:
          1. Content Processing
          • Raw text enhancement
          • Structure standardization
          • Key point extraction
          
          2. Analysis
          • Relevance scoring
          • Insight generation
          • Summary creation
          • Topic classification
          
          3. Enhancement
          • Style consistency
          • Clarity improvement
          • Format standardization`
        },
        {
          title: "Perplexity Integration",
          content: `Perplexity API Flow:
          1. Search Process
          • Keyword-based search
          • Semantic search
          • Source filtering
          
          2. Content Analysis
          • Relevance evaluation
          • Topic clustering
          • Trend identification
          • Duplicate detection
          
          3. Result Processing
          • Content structuring
          • Metadata extraction
          • Priority scoring`
        },
        {
          title: "Vector Database Integration",
          content: `Vector Database Flow:
          1. Content Vectorization
          • Text embedding generation
          • Metadata association
          • Index management
          
          2. Search Operations
          • Semantic similarity search
          • Historical context matching
          • Trend pattern detection
          
          3. Data Management
          • Vector storage
          • Index optimization
          • Archive management`
        }
      ]
    },
    {
      id: "pricing",
      title: "API Pricing & Usage",
      description: "Understanding API costs and usage optimization",
      icon: <FileText className="h-5 w-5" />,
      sections: [
        {
          title: "OpenAI API Costs",
          content: `Cost Breakdown:
          • Text processing: $0.0005 per 1K tokens
          • Content generation: $0.0015 per 1K tokens
          • Embedding creation: $0.0001 per 1K tokens
          
          Usage Optimization:
          • Batch processing for efficiency
          • Token count optimization
          • Caching frequently used results
          • Rate limiting implementation`
        },
        {
          title: "Perplexity API Costs",
          content: `Cost Structure:
          • Basic search: $0.05 per query
          • Advanced search: $0.10 per query
          • Streaming results: $0.15 per query
          
          Optimization Strategies:
          • Query batching
          • Result caching
          • Search parameter optimization
          • Request throttling`
        },
        {
          title: "Vector Database Costs",
          content: `Pricing Factors:
          • Storage volume
          • Query frequency
          • Vector dimensions
          • Index updates
          
          Cost Management:
          • Data lifecycle management
          • Index optimization
          • Query optimization
          • Storage cleanup`
        }
      ]
    }
  ];

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center gap-2 mb-8">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive system documentation and workflows
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {docs.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {section.icon}
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {section.sections.map((subsection, idx) => (
                  <AccordionItem key={idx} value={`${section.id}-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {subsection.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-4 pt-2 text-muted-foreground whitespace-pre-line">
                        {subsection.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}