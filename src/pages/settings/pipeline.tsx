
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PipelineExplanationPage() {
  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pipeline Explanation</h1>
        <p className="text-muted-foreground mt-1">
          Understand the news curation workflow
        </p>
      </div>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>News Curation Pipeline</CardTitle>
            <CardDescription>
              Overview of the complete news curation process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Pipeline Visualization */}
              <div className="border rounded-lg p-6 bg-card/50">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
                  {/* Team Leader */}
                  <div className="flex-1 border rounded-md p-4 bg-purple-50 dark:bg-purple-950/20 text-center">
                    <div className="font-medium mb-2">Team Leader</div>
                    <div className="text-sm text-muted-foreground">
                      Defines base prompt and company context
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:block absolute left-1/4 top-1/2 -translate-y-1/2 w-[12%] h-0 border-t-2 border-dashed border-muted-foreground/50">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-muted-foreground">→</div>
                  </div>
                  
                  {/* Assistant */}
                  <div className="flex-1 border rounded-md p-4 bg-green-50 dark:bg-green-950/20 text-center">
                    <div className="font-medium mb-2">Assistant</div>
                    <div className="text-sm text-muted-foreground">
                      Fetches and processes content
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[12%] h-0 border-t-2 border-dashed border-muted-foreground/50">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-muted-foreground">→</div>
                  </div>
                  
                  {/* Editor */}
                  <div className="flex-1 border rounded-md p-4 bg-orange-50 dark:bg-orange-950/20 text-center">
                    <div className="font-medium mb-2">Editor</div>
                    <div className="text-sm text-muted-foreground">
                      Scores and finalizes articles
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:block absolute left-3/4 top-1/2 -translate-y-1/2 w-[12%] h-0 border-t-2 border-dashed border-muted-foreground/50">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-muted-foreground">→</div>
                  </div>
                  
                  {/* Database */}
                  <div className="flex-1 border rounded-md p-4 bg-blue-50 dark:bg-blue-950/20 text-center">
                    <div className="font-medium mb-2">Database</div>
                    <div className="text-sm text-muted-foreground">
                      Stores curated articles
                    </div>
                  </div>
                </div>
                
                {/* Mobile Arrows */}
                <div className="md:hidden flex flex-col items-center my-2">
                  <div className="h-8 border-l-2 border-dashed border-muted-foreground/50"></div>
                  <div className="text-muted-foreground">↓</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                The news curation system follows a modular pipeline approach with distinct roles and responsibilities. Each component is configured separately but works together to produce high-quality, relevant news content.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="flow">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="flow">Data Flow</TabsTrigger>
            <TabsTrigger value="roles">Role Details</TabsTrigger>
            <TabsTrigger value="integration">API Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Flow</CardTitle>
                <CardDescription>
                  How information flows through the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>1. Base Prompt Configuration</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        The Team Leader configures the base prompt that defines the scope and focus of news curation. This includes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Core objectives and focus areas</li>
                        <li>Company context and business fields</li>
                        <li>Strategic priorities</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>2. Content Fetching</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        The Assistant uses the base prompt to fetch relevant content from configured sources:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Sends queries to Perplexity API (via OpenAI)</li>
                        <li>Retrieves content from websites and social media</li>
                        <li>Filters initial content based on keywords and timeframe</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>3. Content Processing</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        The Editor processes the raw content to create finalized articles:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Scores relevance based on technical, business, and sustainability factors</li>
                        <li>Filters articles based on minimum score threshold</li>
                        <li>Enriches with metadata (business field, key innovations, actionable insights)</li>
                        <li>Formats for storage and display</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>4. Storage & Presentation</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        The final steps in the pipeline:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Curated articles are stored in Supabase database</li>
                        <li>Articles are presented through the ZORK CMS interface</li>
                        <li>Users can filter, sort, and search articles based on various criteria</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role Details</CardTitle>
                <CardDescription>
                  Responsibilities of each component in the pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-md p-4 bg-purple-50 dark:bg-purple-950/20">
                    <h3 className="font-medium text-lg mb-2">Team Leader</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The Team Leader is responsible for defining the strategic direction of news curation:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Creates and refines the base prompt</li>
                      <li>Defines company context and business fields</li>
                      <li>Sets the overall scope and focus of news curation</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20">
                    <h3 className="font-medium text-lg mb-2">Assistant</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The Assistant is responsible for content discovery and initial processing:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Configures search parameters (keywords, timeframe)</li>
                      <li>Manages content sources (websites, social media)</li>
                      <li>Fetches and performs initial filtering of content</li>
                      <li>Passes raw content to the Editor for further processing</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-orange-50 dark:bg-orange-950/20">
                    <h3 className="font-medium text-lg mb-2">Editor</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The Editor is responsible for content refinement and finalization:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Configures relevance scoring weights</li>
                      <li>Sets minimum score thresholds</li>
                      <li>Manages priority and exclusion keywords</li>
                      <li>Enriches articles with metadata</li>
                      <li>Formats articles for storage and display</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>
                  How external services are integrated into the pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-lg mb-2">OpenAI</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for processing prompts and generating content:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Processes the base prompt</li>
                      <li>Generates queries for content retrieval</li>
                      <li>Helps with content summarization and metadata generation</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-lg mb-2">Perplexity</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for news search and retrieval:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Searches for relevant news articles based on queries</li>
                      <li>Retrieves article content and metadata</li>
                      <li>Provides initial relevance assessment</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-lg mb-2">Reddit API</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for social media content (optional):
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Retrieves content from relevant subreddits</li>
                      <li>Monitors discussions about key topics</li>
                      <li>Provides community sentiment and trending topics</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-lg mb-2">Supabase</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for data storage and retrieval:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Stores curated articles and metadata</li>
                      <li>Stores system settings and configuration</li>
                      <li>Provides API for frontend to retrieve and display content</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
