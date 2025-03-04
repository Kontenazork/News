
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Bot, 
  Edit, 
  Key, 
  FileText, 
  GitBranch, 
  Building2, 
  Activity, 
  Database,
  Settings as SettingsIcon
} from "lucide-react";

export default function SettingsIndexPage() {
  const router = useRouter();

  // Group settings modules by category
  const settingsModules = [
    {
      category: "Role-Based Settings",
      modules: [
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
      ]
    },
    {
      category: "Organization & Content",
      modules: [
        {
          title: "Company Branches",
          description: "Manage company branches and their products",
          icon: <Building2 className="h-8 w-8" />,
          href: "/settings/branches",
        },
        {
          title: "Database Settings",
          description: "Configure database schema and output format",
          icon: <Database className="h-8 w-8" />,
          href: "/settings/database",
        },
      ]
    },
    {
      category: "System & Integration",
      modules: [
        {
          title: "API Settings",
          description: "Configure external API services and credentials",
          icon: <Key className="h-8 w-8" />,
          href: "/settings/api",
        },
        {
          title: "Service Status",
          description: "Monitor the status of all connected services",
          icon: <Activity className="h-8 w-8" />,
          href: "/settings/status",
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
      ]
    }
  ];

  return (
    <div className="container max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure the news curation system parameters
        </p>
      </div>

      {settingsModules.map((category) => (
        <div key={category.category} className="mb-12">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.modules.map((module) => (
              <Card key={module.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    {module.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-sm">{module.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
      ))}
    </div>
  );
}
