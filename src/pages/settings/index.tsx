import { useState, useEffect, useCallback, useRef } from "react";
import { Settings } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Bot, 
  Edit, 
  Key, 
  Database,
  Settings as SettingsIcon,
  Activity,
  BarChart 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { APISettingsForm } from "@/components/settings/APISettingsForm";
import { DatabaseSettingsForm } from "@/components/settings/DatabaseSettingsForm";
import { EditorSettingsForm } from "@/components/settings/EditorSettingsForm";
import { AssistantSettingsForm } from "@/components/settings/AssistantSettingsForm";
import { TeamLeaderSettingsForm } from "@/components/settings/TeamLeaderSettingsForm";
import { CompetitorAnalysisForm } from "@/components/settings/CompetitorAnalysisForm";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const unmountedRef = useRef(false);
  const settingsRef = useRef<Settings | null>(null);
  
  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  const fetchSettings = useCallback(async () => {
    if (unmountedRef.current) return;
    try {
      const data = await mockDataService.getSettings();
      if (!unmountedRef.current) {
        setSettings(data);
        settingsRef.current = data;
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      if (!unmountedRef.current) {
        toast({
          title: 'Error',
          description: 'Failed to load settings. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      if (!unmountedRef.current) {
        setLoading(false);
      }
    }
  }, []); // Remove toast dependency

  const handleUpdate = useCallback(() => {
    return fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  const settingsSections = [
    {
      id: "team-leader",
      title: "Team Leader Settings",
      description: "Configure base prompt and vector search refinement",
      icon: <Users className="h-5 w-5" />,
      component: <TeamLeaderSettingsForm settings={settings} onUpdate={handleUpdate} />
    },
    {
      id: "competition",
      title: "Competition Monitoring",
      description: "Configure competitor tracking and analysis settings",
      icon: <BarChart className="h-5 w-5" />,
      component: <CompetitorAnalysisForm settings={settings} onUpdate={handleUpdate} />
    },
    {
      id: "assistant",
      title: "Assistant Settings",
      description: "Configure Perplexity integration and content fetching",
      icon: <Bot className="h-5 w-5" />,
      component: <AssistantSettingsForm settings={settings} onUpdate={handleUpdate} />
    },
    {
      id: "editor",
      title: "Editor Settings",
      description: "Configure relevance scoring and content refinement",
      icon: <Edit className="h-5 w-5" />,
      component: <EditorSettingsForm settings={settings} onUpdate={handleUpdate} />
    },
    {
      id: "api",
      title: "API Settings",
      description: "Manage API keys and service credentials",
      icon: <Key className="h-5 w-5" />,
      component: <APISettingsForm settings={settings} onUpdate={handleUpdate} />
    },
    {
      id: "database",
      title: "Database Settings",
      description: "Configure vector database and output schema",
      icon: <Database className="h-5 w-5" />,
      component: <DatabaseSettingsForm settings={settings} onUpdate={handleUpdate} />
    }
  ];

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center gap-2 mb-8">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure and manage all system settings
          </p>
        </div>
      </div>

      <Card className="p-6">
        <Accordion type="multiple" className="space-y-4">
          {settingsSections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    {section.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                {section.component}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}