
import { useState, useEffect, useCallback } from "react";
import { ServiceStatus } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, CheckCircle, AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

export default function ServiceStatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

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
          Monitor the status of all connected services
        </p>
      </div>
      
      <div className="space-y-6">
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
      </div>
    </div>
  );
}
