
import { useState, useEffect, useCallback } from "react";
import { Settings, BusinessField } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, X, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function EditorSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPriorityKeyword, setNewPriorityKeyword] = useState("");
  const [newExclusionKeyword, setNewExclusionKeyword] = useState("");
  const [editorPrompt, setEditorPrompt] = useState("");
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getSettings();
      setSettings(data);
      setEditorPrompt(data.editorPrompt || "");
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

  const handleEditorPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorPrompt(e.target.value);
    if (settings) {
      setSettings({
        ...settings,
        editorPrompt: e.target.value
      });
    }
  };

  const handleRelevanceWeightChange = (key: keyof Settings["relevanceWeights"], value: number[]) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      relevanceWeights: {
        ...settings.relevanceWeights,
        [key]: value[0] / 10,
      },
    });
  };

  const handleMinimumScoreChange = (value: number[]) => {
    if (!settings) return;
    
    setSettings({ 
      ...settings, 
      minimumScore: value[0] / 10 
    });
  };

  const addPriorityKeyword = () => {
    if (!settings) return;
    
    if (newPriorityKeyword.trim() && !settings.priorityKeywords.includes(newPriorityKeyword.trim())) {
      setSettings({
        ...settings,
        priorityKeywords: [...settings.priorityKeywords, newPriorityKeyword.trim()],
      });
      setNewPriorityKeyword("");
    }
  };

  const removePriorityKeyword = (keyword: string) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      priorityKeywords: settings.priorityKeywords.filter((k) => k !== keyword),
    });
  };

  const addExclusionKeyword = () => {
    if (!settings) return;
    
    if (newExclusionKeyword.trim() && !settings.exclusionKeywords.includes(newExclusionKeyword.trim())) {
      setSettings({
        ...settings,
        exclusionKeywords: [...settings.exclusionKeywords, newExclusionKeyword.trim()],
      });
      setNewExclusionKeyword("");
    }
  };

  const removeExclusionKeyword = (keyword: string) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      exclusionKeywords: settings.exclusionKeywords.filter((k) => k !== keyword),
    });
  };

  const handleDisplayOptionChange = (key: keyof Settings["displayOptions"], value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      displayOptions: {
        ...settings.displayOptions,
        [key]: value,
      },
    });
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await mockDataService.updateSettings(settings);
      toast({
        title: "Success",
        description: "Editor settings saved successfully.",
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
        <h1 className="text-2xl font-bold">Editor Settings</h1>
        <p className="text-muted-foreground mt-1">
          Fine-tune relevance scoring and article finalization
        </p>
      </div>
      
      <Tabs defaultValue="prompt">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="prompt">Editor Prompt</TabsTrigger>
          <TabsTrigger value="scoring">Scoring & Display</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Editor Prompt</CardTitle>
              <CardDescription>
                Define how the Editor should process and edit content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editorPrompt}
                onChange={handleEditorPromptChange}
                className="min-h-[200px]"
                placeholder="Enter instructions for how the Editor should process and edit content..."
              />
              <p className="text-sm text-muted-foreground mt-2">
                This prompt will guide how the Editor processes and formats articles. Include instructions for tone, style, formatting, and what information to prioritize.
              </p>
            </CardContent>
            <CardContent className="pt-0">
              <Button 
                onClick={handleSaveSettings} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Editor Prompt
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scoring" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Relevance & Scoring</CardTitle>
              <CardDescription>
                Configure relevance weights and scoring thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="mb-4 block">Relevance Weights</Label>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Technical</span>
                        <span className="text-sm font-medium">{settings.relevanceWeights.technical}</span>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={[settings.relevanceWeights.technical * 10]}
                        onValueChange={(value) => handleRelevanceWeightChange("technical", value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Weight given to technical relevance when calculating overall score.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Business</span>
                        <span className="text-sm font-medium">{settings.relevanceWeights.business}</span>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={[settings.relevanceWeights.business * 10]}
                        onValueChange={(value) => handleRelevanceWeightChange("business", value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Weight given to business impact when calculating overall score.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Sustainability</span>
                        <span className="text-sm font-medium">{settings.relevanceWeights.sustainability}</span>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={[settings.relevanceWeights.sustainability * 10]}
                        onValueChange={(value) => handleRelevanceWeightChange("sustainability", value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Weight given to sustainability factors when calculating overall score.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="minimum-score" className="mb-2 block">
                    Minimum Score Threshold: {settings.minimumScore}
                  </Label>
                  <Slider
                    id="minimum-score"
                    min={0}
                    max={50}
                    step={1}
                    value={[settings.minimumScore * 10]}
                    onValueChange={handleMinimumScoreChange}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Articles with an overall score below this threshold will be excluded from the final curation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Priority & Exclusion Keywords</CardTitle>
              <CardDescription>
                Configure keywords to prioritize or exclude in news curation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Priority Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.priorityKeywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removePriorityKeyword(keyword)}
                          className="ml-2 text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newPriorityKeyword}
                      onChange={(e) => setNewPriorityKeyword(e.target.value)}
                      placeholder="Add a priority keyword..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addPriorityKeyword}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Articles containing these keywords will receive a higher relevance score.
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Exclusion Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.exclusionKeywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeExclusionKeyword(keyword)}
                          className="ml-2 text-red-700 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newExclusionKeyword}
                      onChange={(e) => setNewExclusionKeyword(e.target.value)}
                      placeholder="Add an exclusion keyword..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addExclusionKeyword}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Articles containing these keywords will be excluded from the curation process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Options</CardTitle>
              <CardDescription>
                Configure default display options for news articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="sort-by" className="mb-2 block">
                    Default Sort Order
                  </Label>
                  <Select
                    value={settings.displayOptions.sortBy}
                    onValueChange={(value) => handleDisplayOptionChange("sortBy", value as "date" | "relevance")}
                  >
                    <SelectTrigger id="sort-by">
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Latest First</SelectItem>
                      <SelectItem value="relevance">Relevance Score</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Choose how articles are sorted by default in the news feed.
                  </p>
                </div>

                <div>
                  <Label htmlFor="filter-by-field" className="mb-2 block">
                    Default Business Field Filter
                  </Label>
                  <Select
                    value={settings.displayOptions.filterByBusinessField}
                    onValueChange={(value) => handleDisplayOptionChange("filterByBusinessField", value as BusinessField | "all")}
                  >
                    <SelectTrigger id="filter-by-field">
                      <SelectValue placeholder="Select business field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="HPC">HPC</SelectItem>
                      <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="Energy Storage">Energy Storage</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Choose which business field to show by default in the news feed.
                  </p>
                </div>
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
        </TabsContent>
      </Tabs>
      
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
