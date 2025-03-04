
import { useState, useEffect } from "react";
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
import { Download, Search, RefreshCw } from "lucide-react";

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

  const filterLogs = () => {
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
  };

  useEffect(() => {
    filterLogs();
  }, [logs, searchQuery, levelFilter, sourceFilter]);

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
        <h1 className="text-2xl font-bold">Logging</h1>
        <p className="text-muted-foreground mt-1">
          View system logs and operation history
        </p>
      </div>
      
      <div className="space-y-6">
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
      </div>
    </div>
  );
}
