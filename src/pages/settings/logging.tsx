
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Download, Search, RefreshCw, GitBranch, FileText } from "lucide-react";

// Mock log entry type
interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  source: "team-leader" | "assistant" | "editor" | "system";
  message: string;
  details?: string;
}

// Mock log data
const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-03-04T10:15:23Z",
    level: "info",
    source: "team-leader",
    message: "Base prompt updated",
    details: "Base prompt was updated to include new focus on energy efficiency."
  },
  {
    id: "2",
    timestamp: "2025-03-04T10:20:45Z",
    level: "info",
    source: "assistant",
    message: "Content fetching started",
    details: "Started fetching content with 8 keywords and 7-day timeframe."
  },
  {
    id: "3",
    timestamp: "2025-03-04T10:25:12Z",
    level: "warning",
    source: "assistant",
    message: "Perplexity API rate limit approaching",
    details: "90% of rate limit used. Consider spacing out requests."
  },
  {
    id: "4",
    timestamp: "2025-03-04T10:30:05Z",
    level: "info",
    source: "editor",
    message: "Content processing complete",
    details: "Processed 15 articles, 12 met minimum score threshold."
  },
  {
    id: "5",
    timestamp: "2025-03-04T10:35:18Z",
    level: "error",
    source: "system",
    message: "Database connection error",
    details: "Failed to connect to database. Retrying in 5 seconds."
  },
  {
    id: "6",
    timestamp: "2025-03-04T10:36:23Z",
    level: "info",
    source: "system",
    message: "Database connection restored",
    details: "Successfully reconnected to database."
  },
  {
    id: "7",
    timestamp: "2025-03-04T10:40:45Z",
    level: "info",
    source: "editor",
    message: "Articles saved to database",
    details: "12 articles successfully saved to database."
  }
];

export default function LoggingPage() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(mockLogs);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const filterLogs = useCallback(() => {
    let filtered = [...logs];
    
    // Apply level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter(log => log.level === levelFilter);
    }
    
    // Apply source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter(log => log.source === sourceFilter);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(query) || 
        (log.details && log.details.toLowerCase().includes(query))
      );
    }
    
    setFilteredLogs(filtered);
  }, [logs, levelFilter, sourceFilter, searchQuery]);

  useEffect(() => {
    filterLogs();
  }, [filterLogs]);

  const handleRefresh = () => {
    setLoading(true);
    
    // Simulate fetching new logs
    setTimeout(() => {
      // Add a new mock log entry
      const newLog: LogEntry = {
        id: String(logs.length + 1),
        timestamp: new Date().toISOString(),
        level: "info",
        source: "system",
        message: "Log refreshed",
        details: "Logs were manually refreshed by user."
      };
      
      const updatedLogs = [newLog, ...logs];
      setLogs(updatedLogs);
      setLoading(false);
    }, 1000);
  };

  const handleDownload = () => {
    // Create a JSON string of the logs
    const logsJson = JSON.stringify(logs, null, 2);
    
    // Create a blob from the JSON string
    const blob = new Blob([logsJson], { type: "application/json" });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `zork-news-logs-${new Date().toISOString().split("T")[0]}.json`;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link
    link.click();
    
    // Remove the link
    document.body.removeChild(link);
    
    // Revoke the URL
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "team-leader":
        return "text-purple-600 dark:text-purple-400";
      case "assistant":
        return "text-green-600 dark:text-green-400";
      case "editor":
        return "text-orange-600 dark:text-orange-400";
      case "system":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="container max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Logging & Pipeline</h1>
        <p className="text-muted-foreground mt-1">
          View system logs and understand the news curation workflow
        </p>
      </div>
      
      <Tabs defaultValue="logs">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            System Logs
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Pipeline Explanation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>
                    View and filter logs from all system components
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={levelFilter}
                      onValueChange={setLevelFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={sourceFilter}
                      onValueChange={setSourceFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="team-leader">Team Leader</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead className="w-[100px]">Level</TableHead>
                        <TableHead className="w-[120px]">Source</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No logs found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLogs.map((log) => (
                          <TableRow key={log.id} className="group cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-mono text-xs">
                              {formatDate(log.timestamp)}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                                {log.level}
                              </span>
                            </TableCell>
                            <TableCell className={`font-medium ${getSourceColor(log.source)}`}>
                              {log.source}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div>{log.message}</div>
                                {log.details && (
                                  <div className="text-xs text-muted-foreground mt-1 group-hover:block hidden">
                                    {log.details}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Showing {filteredLogs.length} of {logs.length} logs
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipeline" className="space-y-8">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
