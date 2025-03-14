
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Share2, Workflow, Zap } from "lucide-react";
import Script from "next/script";
import { useEffect } from "react";

interface MermaidConfig {
  initialize: (config: any) => void;
  run: () => Promise<void>;
}

declare global {
  interface Window {
    mermaid: MermaidConfig;
  }
}

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

const initMermaid = async () => {
  if (typeof window !== "undefined") {
    try {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        theme: "dark",
        securityLevel: "loose",
        flowchart: {
          curve: "basis",
          padding: 20
        }
      });
      await mermaid.run();
    } catch (error) {
      console.error("Mermaid initialization error:", error);
    }
  }
};

export default function DocumentationPage() {
  useEffect(() => {
    initMermaid();
  }, []);

  // Rest of the component remains the same...
  // (Keeping just the critical changes for brevity)
  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.mermaid?.initialize({
            theme: "dark",
            securityLevel: "loose"
          });
        }}
      />
      <div className="container max-w-4xl py-6">
        {/* Rest of the JSX remains the same */}
      </div>
    </>
  );
}
