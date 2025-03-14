import { useState, useEffect, useCallback, useRef } from "react";
import { DashboardMetrics, Article } from "@/types";
import { mockDataService } from "@/services/mockData";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { BusinessFieldChart } from "@/components/dashboard/BusinessFieldChart";
import { RecentArticles } from "@/components/dashboard/RecentArticles";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  BarChart3, 
  RefreshCw, 
  Calendar, 
  Newspaper 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [combinedReport, setCombinedReport] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState<string>(new Date().toLocaleDateString());
  const { toast } = useToast();
  const toastRef = useRef(toast);

  const generateReport = useCallback((articles: Article[]) => {
    if (!articles.length) return;
    
    const introduction = '## Industry News Summary\n\nThis week\'s curated news highlights significant developments across our key business fields.';
    
    const businessFieldSections: Record<string, Article[]> = {};
    articles.forEach(article => {
      if (!businessFieldSections[article.businessField]) {
        businessFieldSections[article.businessField] = [];
      }
      businessFieldSections[article.businessField].push(article);
    });
    
    const sections = Object.entries(businessFieldSections).map(([field, fieldArticles]) => {
      const fieldIntro = `\n\n### ${field} Developments\n\n`;
      const fieldContent = fieldArticles.map(article => 
        `**${article.title}**: ${article.content.substring(0, 150)}... `
      ).join("\n\n");
      return fieldIntro + fieldContent;
    });
    
    const insights = "\n\n### Key Insights\n\n" + 
      articles.flatMap(article => article.actionableInsights)
        .slice(0, 5)
        .map(insight => `- ${insight}`)
        .join("\n");
    
    setCombinedReport(introduction + sections.join('') + insights);
    setReportDate(new Date().toLocaleDateString());
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await mockDataService.getDashboardMetrics();
      setMetrics(data);
      
      if (data.recentArticles.length > 0) {
        generateReport(data.recentArticles);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toastRef.current({
        title: 'Error',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []); // Remove loading and refreshing from dependencies

  useEffect(() => {
    fetchDashboardData();
  }, []); // Only run on mount

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await fetchDashboardData();
      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully.",
      });
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
      toast({
        title: "Error",
        description: "Failed to refresh dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Executive Dashboard</h1>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          size="sm"
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>
      
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Metrics Summary
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            News Report
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricsCard
              title="Total Articles"
              value={metrics.totalArticles}
              icon={<FileText />}
              description="Curated articles"
            />
            <MetricsCard
              title="Average Relevance"
              value={metrics.averageRelevanceScore}
              icon={<BarChart3 />}
              description="Overall score"
              trend={{ value: 5.2, isPositive: true }}
            />
            <MetricsCard
              title="HPC Articles"
              value={metrics.articlesByBusinessField.HPC}
              description="High Performance Computing"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BusinessFieldChart data={metrics.articlesByBusinessField} />
            <RecentArticles articles={metrics.recentArticles} />
          </div>
        </TabsContent>
        
        <TabsContent value="report">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Weekly News Report</CardTitle>
                  <CardDescription>
                    Combined summary of all curated articles
                  </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {reportDate}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {combinedReport ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {combinedReport.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return <h2 key={index} className="text-xl font-bold mt-0 mb-4">{paragraph.replace("## ", "")}</h2>;
                    } else if (paragraph.startsWith("### ")) {
                      return <h3 key={index} className="text-lg font-semibold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
                    } else if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc pl-5 my-3">
                          {paragraph.split("\n").map((item, itemIndex) => (
                            <li key={itemIndex} className="mb-1">{item.replace("- ", "")}</li>
                          ))}
                        </ul>
                      );
                    } else {
                      return (
                        <div key={index} className="mb-4" dangerouslySetInnerHTML={{ 
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                        }} />
                      );
                    }
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No report available. Please refresh the data.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export as PDF
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}