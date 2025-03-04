
import { useState, useEffect, useCallback } from "react";
import { Settings } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Loader2, Save, X, Plus, Bot, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AssistantSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newTrustedSource, setNewTrustedSource] = useState("");
  const [perplexityPrompt, setPerplexityPrompt] = useState("");
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getSettings();
      setSettings(data);
      setPerplexityPrompt(data.perplexityPrompt || "");
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

  const handleTimeframeChange = (value: number[]) => {
    if (settings) {
      setSettings({ ...settings, timeframe: value[0] });
    }
  };

  const handleSourceToggle = (key: keyof Settings["sources"]) => {
    if (settings) {
      setSettings({
        ...settings,
        sources: {
          ...settings.sources,
          [key]: !settings.sources[key],
        },
      });
    }
  };

  const handlePerplexityPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPerplexityPrompt(e.target.value);
    if (settings) {
      setSettings({
        ...settings,
        perplexityPrompt: e.target.value
      });
    }
  };

  const addKeyword = () => {
    if (!settings) return;
    
    if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
      setSettings({
        ...settings,
        keywords: [...settings.keywords, newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      keywords: settings.keywords.filter((k) => k !== keyword),
    });
  };

  const addTrustedSource = () => {
    if (!settings) return;
    
    if (newTrustedSource.trim() && !settings.trustedSources.includes(newTrustedSource.trim())) {
      setSettings({
        ...settings,
        trustedSources: [...settings.trustedSources, newTrustedSource.trim()],
      });
      setNewTrustedSource("");
    }
  };

  const removeTrustedSource = (source: string) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      trustedSources: settings.trustedSources.filter((s) => s !== source),
    });
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await mockDataService.updateSettings(settings);
      toast({
        title: "Success",
        description: "Assistant settings saved successfully.",
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
        <h1 className="text-2xl font-bold">Assistant Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure Perplexity integration and content fetching
        </p>
      </div>
      
      <Tabs defaultValue="perplexity">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="perplexity" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Perplexity Integration
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Parameters
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="perplexity" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Perplexity Configuration</CardTitle>
              <CardDescription>
                Configure how the Assistant communicates with Perplexity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="perplexity-prompt" className="mb-2 block">
                    Perplexity Prompt Template
                  </Label>
                  <Textarea
                    id="perplexity-prompt"
                    value={perplexityPrompt}
                    onChange={handlePerplexityPromptChange}
                    className="min-h-[200px]"
                    placeholder="Enter the prompt template for Perplexity API..."
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    This template will be used when communicating with Perplexity. You can use variables like {"{keywords}"}, {"{timeframe}"}, and {"{branches}"} which will be replaced with actual values.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="perplexity-auto-retry">Auto-retry on failure</Label>
                    <Switch
                      id="perplexity-auto-retry"
                      checked={settings.perplexityAutoRetry || false}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, perplexityAutoRetry: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="perplexity-stream">Use streaming responses</Label>
                    <Switch
                      id="perplexity-stream"
                      checked={settings.perplexityStream || false}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, perplexityStream: checked})
                      }
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="perplexity-max-tokens" className="mb-2 block">
                    Max Tokens: {settings.perplexityMaxTokens || 1000}
                  </Label>
                  <Slider
                    id="perplexity-max-tokens"
                    min={100}
                    max={4000}
                    step={100}
                    value={[settings.perplexityMaxTokens || 1000]}
                    onValueChange={(value) => 
                      setSettings({...settings, perplexityMaxTokens: value[0]})
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Maximum number of tokens to generate in the response.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="perplexity-temperature" className="mb-2 block">
                    Temperature: {settings.perplexityTemperature || 0.7}
                  </Label>
                  <Slider
                    id="perplexity-temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[settings.perplexityTemperature || 0.7]}
                    onValueChange={(value) => 
                      setSettings({...settings, perplexityTemperature: value[0]})
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Controls randomness: lower values are more focused, higher values more creative.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Keywords & Timeframe</CardTitle>
              <CardDescription>
                Configure search keywords and timeframe for news curation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="timeframe" className="mb-2 block">
                    Timeframe (days): {settings.timeframe}
                  </Label>
                  <Slider
                    id="timeframe"
                    min={1}
                    max={30}
                    step={1}
                    value={[settings.timeframe]}
                    onValueChange={handleTimeframeChange}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Limit news search to articles published within this timeframe.
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.keywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add a keyword..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addKeyword}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    These keywords will be used to search for relevant news articles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sources</CardTitle>
              <CardDescription>
                Configure news sources and trusted domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="websites-toggle">Include Websites</Label>
                    <Switch
                      id="websites-toggle"
                      checked={settings.sources.websites}
                      onCheckedChange={() => handleSourceToggle("websites")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twitter-toggle">Include Twitter</Label>
                    <Switch
                      id="twitter-toggle"
                      checked={settings.sources.twitter}
                      onCheckedChange={() => handleSourceToggle("twitter")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="credit-sources-toggle">Credit Sources</Label>
                    <Switch
                      id="credit-sources-toggle"
                      checked={settings.sources.creditSources}
                      onCheckedChange={() => handleSourceToggle("creditSources")}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Trusted Sources</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.trustedSources.map((source) => (
                      <div
                        key={source}
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {source}
                        <button
                          type="button"
                          onClick={() => removeTrustedSource(source)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTrustedSource}
                      onChange={(e) => setNewTrustedSource(e.target.value)}
                      placeholder="Add a trusted source..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addTrustedSource}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Articles from these domains will be prioritized in the curation process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSaveSettings} 
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Settings
        </Button>
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
