import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Share2, Workflow, Zap } from "lucide-react";
import Script from "next/script";

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
  const initialized = useRef(false);

  useEffect(() => {
    const initMermaid = async () => {
      if (!initialized.current && typeof window !== 'undefined') {
        try {
          const mermaid = (await import('mermaid')).default;
          mermaid.initialize({
            theme: 'dark',
            securityLevel: 'loose',
            flowchart: {
              curve: 'basis',
              padding: 20
            }
          });

          document.querySelectorAll('.mermaid').forEach(async (element) => {
            try {
              const { svg } = await mermaid.render(
                `mermaid-${Math.random()}`,
                element.textContent || ''
              );
              element.innerHTML = svg;
            } catch (error) {
              console.error('Mermaid rendering error:', error);
            }
          });

          initialized.current = true;
        } catch (error) {
          console.error('Mermaid initialization error:', error);
        }
      }
    };

    initMermaid();
  }, []); // Run only on mount

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js" strategy="beforeInteractive" />
      
      <div className="container max-w-4xl py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Documentation</h1>
          <p className="text-muted-foreground mt-1">
            System overview and technical documentation
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Workflow</CardTitle>
              <CardDescription>
                High-level overview of the system workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid bg-card p-4 rounded-lg overflow-auto">
                {flowchartDefinitions.workflow}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Integration Flow</CardTitle>
              <CardDescription>
                How different APIs interact within the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid bg-card p-4 rounded-lg overflow-auto">
                {flowchartDefinitions.apiFlow}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Pricing Overview</CardTitle>
              <CardDescription>
                Cost breakdown for various API services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid bg-card p-4 rounded-lg overflow-auto">
                {flowchartDefinitions.pricing}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Documentation</CardTitle>
              <CardDescription>
                Detailed technical information and guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Setup Guide
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <h3 className="font-medium">Environment Setup</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Configure API keys in settings</li>
                      <li>Set up vector database connection</li>
                      <li>Configure Perplexity integration</li>
                      <li>Set up competitor tracking</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="api">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      API Documentation
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <h3 className="font-medium">Available Endpoints</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>GET /api/articles - Fetch curated articles</li>
                      <li>POST /api/settings - Update system settings</li>
                      <li>GET /api/metrics - Get dashboard metrics</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="workflow">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Workflow className="h-5 w-5" />
                      Content Workflow
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <h3 className="font-medium">Content Processing Steps</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Source content discovery</li>
                      <li>Relevance scoring</li>
                      <li>Content refinement</li>
                      <li>Final validation</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="optimization">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Optimization Guide
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <h3 className="font-medium">Performance Tips</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Adjust relevance weights</li>
                      <li>Fine-tune vector search</li>
                      <li>Optimize API usage</li>
                      <li>Cache frequent requests</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}