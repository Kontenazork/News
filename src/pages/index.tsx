
import { useState, useEffect } from "react";
import { DashboardMetrics } from "@/types";
import { mockDataService } from "@/services/mockData";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { BusinessFieldChart } from "@/components/dashboard/BusinessFieldChart";
import { RecentArticles } from "@/components/dashboard/RecentArticles";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh delay
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
    <div className="container">
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
    </div>
  );
}
