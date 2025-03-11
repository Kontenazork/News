
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, ArrowRight } from "lucide-react";

export default function PipelinePage() {
  const router = useRouter();

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pipeline Explanation</h1>
        <p className="text-muted-foreground mt-1">
          Understand how the news curation workflow operates
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Workflow</CardTitle>
            <CardDescription>
              How our AI agents work together to curate news
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Research Leader Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Establishes the scope and coordinates research tasks
                </p>
              </div>
            </div>
            <div className="ml-6 border-l-2 border-border pl-10 relative">
              <ArrowRight className="h-4 w-4 text-muted-foreground absolute -left-2 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Project Planner Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Breaks down tasks and creates research batches
                </p>
              </div>
            </div>
            <div className="ml-6 border-l-2 border-border pl-10 relative">
              <ArrowRight className="h-4 w-4 text-muted-foreground absolute -left-2 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Research Assistant Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Perform parallel research using Perplexity API
                </p>
              </div>
            </div>
            <div className="ml-6 border-l-2 border-border pl-10 relative">
              <ArrowRight className="h-4 w-4 text-muted-foreground absolute -left-2 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Editor Agent</h3>
                <p className="text-sm text-muted-foreground">
                  Compiles and formats the final articles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configure Agents</CardTitle>
            <CardDescription>
              Adjust settings for each agent in the pipeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push("/settings/team-leader")}
            >
              Configure Research Leader
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push("/settings/assistant")}
            >
              Configure Research Assistant
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push("/settings/editor")}
            >
              Configure Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
