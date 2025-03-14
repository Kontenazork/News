
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText } from "lucide-react";

export default function DocumentationPage() {
  const docs = [
    {
      id: "workflow",
      title: "System Workflow",
      description: "Understanding how the system processes and curates news",
      sections: [
        {
          title: "Team Leader Role",
          content: `The Team Leader is responsible for:
          • Setting the base prompt for news curation
          • Configuring vector search parameters
          • Managing company branches and products
          • Overseeing the overall curation strategy`
        },
        {
          title: "Assistant Role",
          content: `The Assistant handles:
          • Integrating with Perplexity API
          • Managing search parameters and keywords
          • Configuring trusted sources
          • Processing search results`
        },
        {
          title: "Editor Role",
          content: `The Editor is responsible for:
          • Content refinement and formatting
          • Relevance scoring
          • Priority and exclusion keyword management
          • Final content presentation`
        }
      ]
    },
    {
      id: "api-integration",
      title: "API Integration",
      description: "Understanding the external API integrations",
      sections: [
        {
          title: "OpenAI Integration",
          content: `OpenAI is used for:
          • Content processing and enhancement
          • Relevance scoring
          • Insight generation
          • Summary creation`
        },
        {
          title: "Perplexity Integration",
          content: `Perplexity is used for:
          • News article search and retrieval
          • Content relevance analysis
          • Topic clustering
          • Trend identification`
        },
        {
          title: "Vector Database Integration",
          content: `Vector database (Pinecone/Weaviate/Qdrant) is used for:
          • Semantic search capabilities
          • Content similarity matching
          • Historical context analysis
          • Trend tracking`
        }
      ]
    },
    {
      id: "data-processing",
      title: "Data Processing",
      description: "Understanding how data flows through the system",
      sections: [
        {
          title: "Content Collection",
          content: `The system collects content through:
          • API-based news searches
          • RSS feed monitoring
          • Trusted source scanning
          • Social media monitoring`
        },
        {
          title: "Processing Pipeline",
          content: `Content processing involves:
          • Initial relevance filtering
          • Semantic analysis
          • Category classification
          • Insight extraction
          • Summary generation`
        },
        {
          title: "Output Generation",
          content: `The system generates:
          • Curated news summaries
          • Relevance scores
          • Action items
          • Trend reports
          • Competitive insights`
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
            System workflow and documentation
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {docs.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
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
