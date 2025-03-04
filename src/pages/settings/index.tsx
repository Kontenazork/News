
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Bot, Edit, Key, FileText, GitBranch, Building2, Activity, Database } from "lucide-react";

export default function SettingsIndexPage() {
  const router = useRouter();

  // Redirect to team-leader settings by default
  useEffect(() => {
    router.push("/settings/team-leader");
  }, [router]);

  const settingsModules = [
    {
      title: "Team Leader Settings",
      description: "Configure the core base prompt and company context",
      icon: <Users className="h-8 w-8" />,
      href: "/settings/team-leader",
    },
    {
      title: "Assistant Settings",
      description: "Configure content fetching and preliminary processing",
      icon: <Bot className="h-8 w-8" />,
      href: "/settings/assistant",
    },
    {
      title: "Editor Settings",
      description: "Fine-tune relevance scoring and article finalization",
      icon: <Edit className="h-8 w-8" />,
      href: "/settings/editor",
    },
    {
      title: "API Settings",
      description: "Configure external API services and credentials",
      icon: <Key className="h-8 w-8" />,
      href: "/settings/api",
    },
    {
      title: "Company Branches",
      description: "Manage company branches and their products",
      icon: <Building2 className="h-8 w-8" />,
      href: "/settings/branches",
    },
    {
      title: "Service Status",
      description: "Monitor the status of all connected services",
      icon: <Activity className="h-8 w-8" />,
      href: "/settings/status",
    },
    {
      title: "Database Settings",
      description: "Configure database schema and output format",
      icon: <Database className="h-8 w-8" />,
      href: "/settings/database",
    },
    {
      title: "Logging",
      description: "View system logs and operation history",
      icon: <FileText className="h-8 w-8" />,
      href: "/settings/logging",
    },
    {
      title: "Pipeline Explanation",
      description: "Understand the news curation workflow",
      icon: <GitBranch className="h-8 w-8" />,
      href: "/settings/pipeline",
    },
  ];

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure the news curation system parameters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsModules.map((module) => (
          <Card key={module.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-md text-primary">
                {module.icon}
              </div>
              <div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push(module.href)}
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
