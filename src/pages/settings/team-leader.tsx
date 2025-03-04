
import { useState, useEffect, useCallback } from "react";
import { Settings } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function TeamLeaderSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleBasePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (settings) {
      setSettings({ ...settings, basePrompt: e.target.value });
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await mockDataService.updateSettings(settings);
      toast({
        title: "Success",
        description: "Team Leader settings saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Team Leader Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure the core base prompt and company context
        </p>
      </div>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Base Prompt</CardTitle>
            <CardDescription>
              Define the core prompt used for news curation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.basePrompt}
              onChange={handleBasePromptChange}
              className="min-h-[200px]"
              placeholder="Enter your base prompt for news curation..."
            />
            <p className="text-sm text-muted-foreground mt-2">
              This prompt will be used as the foundation for all news curation. It should include the core objectives and focus areas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Branches</CardTitle>
            <CardDescription>
              Configure company branches for news categorization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.companyBranches.map((branch) => (
                <div key={branch.id} className="border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`branch-name-${branch.id}`}>Name</Label>
                      <Input
                        id={`branch-name-${branch.id}`}
                        value={branch.name}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor={`branch-field-${branch.id}`}>Business Field</Label>
                      <Input
                        id={`branch-field-${branch.id}`}
                        value={branch.businessField}
                        disabled
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`branch-desc-${branch.id}`}>Description</Label>
                      <Input
                        id={`branch-desc-${branch.id}`}
                        value={branch.description}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-2">
                Note: Company branches are fixed and cannot be modified in this interface.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings} 
            disabled={saving}
            className="flex items-center gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </Button>
        </div>
      </div>
      
      {saving && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Saving settings...</p>
          </div>
        </div>
      )}
    </div>
  );
}
