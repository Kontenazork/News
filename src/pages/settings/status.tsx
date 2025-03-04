
import { useState, useEffect, useCallback } from "react";
import { ServiceStatus } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  Play, 
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
  Loader2,
  Coins
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ServiceStatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [testingPipeline, setTestingPipeline] = useState(false);
  const [testResults, setTestResults] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [testSettings, setTestSettings] = useState({
    keyword: "artificial intelligence",
    timeframe: 7,
    includeTwitter: true,
    maxResults: 5
  });
  const { toast } = useToast();

  // Token usage data
  const [tokenUsage, setTokenUsage] = useState({
    openai: { used: 1250000, limit: 5000000, cost: 25.00 },
    perplexity: { used: 750000, limit: 2000000, cost: 15.00 },
    reddit: { used: 50000, limit: 100000, cost: 0 },
    twitter: { used: 35000, limit: 50000, cost: 0 }
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getServiceStatuses();
      setServices(data);
    } catch (error) {
      console.error("Error fetching service statuses:", error);
      toast({
        title: "Error",
        description: "Failed to load service statuses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchServices();
      toast({
        title: "Success",
        description: "Service statuses refreshed successfully.",
      });
    } catch (error) {
      console.error("Error refreshing service statuses:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 500); // Add a small delay for better UX
    }
  };

  const handleTestPipeline = async () => {
    setTestingPipeline(true);
    setTestResults(null);
    
    try {
      // Simulate API call to test pipeline
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock test results
      setTestResults(
        `Pipeline test completed successfully!\n\n` +
        `Keyword: ${testSettings.keyword}\n` +
        `Timeframe: ${testSettings.timeframe} days\n` +
        `Include Twitter: ${testSettings.includeTwitter ? 'Yes' : 'No'}\n` +
        `Max Results: ${testSettings.maxResults}\n\n` +
        `Found 3 relevant articles matching criteria.`
      );
      
      toast({
        title: "Success",
        description: "Pipeline test completed successfully.",
      });
    } catch (error) {
      console.error("Error testing pipeline:", error);
      toast({
        title: "Error",
        description: "Failed to test pipeline. Please try again.",
        variant: "destructive",
      });
      setTestResults("Pipeline test failed. Please check your settings and try again.");
    } finally {
      setTestingPipeline(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "outage":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "maintenance":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded Performance";
      case "outage":
        return "Service Outage";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "degraded":
        return "text-amber-500";
      case "outage":
        return "text-red-500";
      case "maintenance":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 100) return "text-green-500";
    if (time < 300) return "text-blue-500";
    if (time < 500) return "text-amber-500";
    return "text-red-500";
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min(100, (used / limit) * 100);
  };

  const getUsageColor = (used: number, limit: number) => {
    const percentage = getUsagePercentage(used, limit);
    if (percentage < 50) return "bg-green-500";
    if (percentage < 75) return "bg-amber-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service statuses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Service Status</h1>
        <p className="text-muted-foreground mt-1">
          Monitor the status of all connected services and test the pipeline
        </p>
      </div>
      
      <Tabs defaultValue="services">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="tokens">Token Usage</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>
                  Current status of all external services and APIs
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Service</TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      <TableHead className="w-[150px]">Uptime</TableHead>
                      <TableHead className="w-[150px]">Response Time</TableHead>
                      <TableHead className="w-[200px]">Last Checked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className={getStatusColor(service.status)}>
                              {getStatusText(service.status)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{service.uptime.toFixed(2)}%</span>
                            </div>
                            <Progress value={service.uptime} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getResponseTimeColor(service.responseTime)}>
                            {service.responseTime} ms
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(service.lastChecked)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>
                Overall system health and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">API Services</div>
                  <div className="text-2xl font-bold">
                    {services.filter(s => s.status === "operational").length}/{services.filter(s => s.name.includes("API")).length}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Operational services</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">Average Response Time</div>
                  <div className="text-2xl font-bold">
                    {Math.round(services.reduce((sum, service) => sum + service.responseTime, 0) / services.length)} ms
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Across all services</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">Average Uptime</div>
                  <div className="text-2xl font-bold">
                    {(services.reduce((sum, service) => sum + service.uptime, 0) / services.length).toFixed(2)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident History</CardTitle>
              <CardDescription>
                Recent service incidents and resolutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div className="font-medium">Perplexity API Degraded Performance</div>
                    <div className="text-xs text-muted-foreground ml-auto">2025-03-03</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The Perplexity API experienced degraded performance due to high traffic. The issue was resolved after 45 minutes.
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Resolution: Automatic scaling was triggered to handle increased load.
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div className="font-medium">Reddit API Outage</div>
                    <div className="text-xs text-muted-foreground ml-auto">2025-03-01</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The Reddit API was unavailable for approximately 2 hours due to scheduled maintenance.
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Resolution: Service was restored after maintenance was completed.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
              <CardDescription>
                Monitor token usage across all connected services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(tokenUsage).map(([service, data]) => (
                  <div key={service} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-primary" />
                        <h3 className="font-medium capitalize">{service} API</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(data.used)} / {formatNumber(data.limit)} tokens
                      </div>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getUsageColor(data.used, data.limit)}`} 
                        style={{ width: `${getUsagePercentage(data.used, data.limit)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(getUsagePercentage(data.used, data.limit))}% used</span>
                      {data.cost > 0 && <span>Cost: ${data.cost.toFixed(2)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>Token usage is updated hourly. Last updated: {new Date().toLocaleString()}</p>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Token usage trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Token usage chart will be displayed here</p>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>This chart shows token usage trends over the past 30 days.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Testing</CardTitle>
              <CardDescription>
                Test the news curation pipeline with custom parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                className="space-y-4"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-between w-full"
                  >
                    <span>Test Settings</span>
                    {isSettingsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 border rounded-md p-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="test-keyword">Test Keyword</Label>
                      <Input
                        id="test-keyword"
                        value={testSettings.keyword}
                        onChange={(e) => setTestSettings({...testSettings, keyword: e.target.value})}
                        placeholder="Enter keyword to test"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="test-timeframe" className="mb-2 block">
                        Timeframe (days): {testSettings.timeframe}
                      </Label>
                      <Slider
                        id="test-timeframe"
                        min={1}
                        max={30}
                        step={1}
                        value={[testSettings.timeframe]}
                        onValueChange={(value) => setTestSettings({...testSettings, timeframe: value[0]})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="test-twitter">Include Twitter</Label>
                      <Switch
                        id="test-twitter"
                        checked={testSettings.includeTwitter}
                        onCheckedChange={(checked) => setTestSettings({...testSettings, includeTwitter: checked})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="test-max-results" className="mb-2 block">
                        Max Results: {testSettings.maxResults}
                      </Label>
                      <Slider
                        id="test-max-results"
                        min={1}
                        max={20}
                        step={1}
                        value={[testSettings.maxResults]}
                        onValueChange={(value) => setTestSettings({...testSettings, maxResults: value[0]})}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="mt-6">
                <Button 
                  onClick={handleTestPipeline} 
                  disabled={testingPipeline}
                  className="flex items-center gap-2 w-full"
                >
                  {testingPipeline ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Testing Pipeline...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Pipeline Test
                    </>
                  )}
                </Button>
              </div>
              
              {testResults && (
                <div className="mt-6 border rounded-md p-4">
                  <h3 className="font-medium mb-2">Test Results</h3>
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md overflow-auto max-h-[300px]">
                    {testResults}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Logs</CardTitle>
              <CardDescription>
                View recent pipeline execution logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Pipeline Run #1245</h3>
                    <span className="text-xs text-muted-foreground">2025-03-04 10:15:22</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed successfully. Found 7 articles matching criteria.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Success
                    </Badge>
                    <Badge variant="outline">
                      Duration: 45s
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Pipeline Run #1244</h3>
                    <span className="text-xs text-muted-foreground">2025-03-04 08:30:15</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed with warnings. Found 3 articles matching criteria.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                      Warning
                    </Badge>
                    <Badge variant="outline">
                      Duration: 38s
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Pipeline Run #1243</h3>
                    <span className="text-xs text-muted-foreground">2025-03-03 22:45:10</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Failed due to Perplexity API error. No articles retrieved.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      Failed
                    </Badge>
                    <Badge variant="outline">
                      Duration: 12s
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View All Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
