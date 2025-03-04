
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";

export default function ApiSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Mock API keys and settings
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    perplexity: "",
    reddit: ""
  });

  const [apiSettings, setApiSettings] = useState({
    useOpenAI: true,
    usePerplexity: true,
    useReddit: false
  });

  const handleApiKeyChange = (key: keyof typeof apiKeys, value: string) => {
    setApiKeys({
      ...apiKeys,
      [key]: value
    });
  };

  const handleApiToggle = (key: keyof typeof apiSettings) => {
    setApiSettings({
      ...apiSettings,
      [key]: !apiSettings[key]
    });
  };

  const handleTestConnection = (service: string) => {
    setTesting({...testing, [service]: true});
    
    // Simulate API test
    setTimeout(() => {
      // Mock success for OpenAI and Perplexity, failure for Reddit
      const success = service !== "reddit";
      setTestResults({...testResults, [service]: success});
      
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? `Successfully connected to ${service} API.` 
          : `Failed to connect to ${service} API. Please check your credentials.`,
        variant: success ? "default" : "destructive",
      });
      
      setTesting({...testing, [service]: false});
    }, 1500);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Success",
        description: "API settings saved successfully.",
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">API Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure external API services and credentials
        </p>
      </div>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>OpenAI API</CardTitle>
            <CardDescription>
              Configure OpenAI API for content processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="openai-toggle">Enable OpenAI API</Label>
                <Switch
                  id="openai-toggle"
                  checked={apiSettings.useOpenAI}
                  onCheckedChange={() => handleApiToggle("useOpenAI")}
                />
              </div>
              
              <div>
                <Label htmlFor="openai-api-key" className="mb-2 block">
                  API Key
                </Label>
                <Input
                  id="openai-api-key"
                  type="password"
                  value={apiKeys.openai}
                  onChange={(e) => handleApiKeyChange("openai", e.target.value)}
                  placeholder="sk-..."
                  disabled={!apiSettings.useOpenAI}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your OpenAI API key will be used for content generation and processing.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => handleTestConnection("openai")}
              disabled={!apiSettings.useOpenAI || !apiKeys.openai || testing.openai}
              className="flex items-center gap-2"
            >
              {testing.openai ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : testResults.openai === true ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : testResults.openai === false ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : null}
              Test Connection
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perplexity API</CardTitle>
            <CardDescription>
              Configure Perplexity API for news search and retrieval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="perplexity-toggle">Enable Perplexity API</Label>
                <Switch
                  id="perplexity-toggle"
                  checked={apiSettings.usePerplexity}
                  onCheckedChange={() => handleApiToggle("usePerplexity")}
                />
              </div>
              
              <div>
                <Label htmlFor="perplexity-api-key" className="mb-2 block">
                  API Key
                </Label>
                <Input
                  id="perplexity-api-key"
                  type="password"
                  value={apiKeys.perplexity}
                  onChange={(e) => handleApiKeyChange("perplexity", e.target.value)}
                  placeholder="pplx-..."
                  disabled={!apiSettings.usePerplexity}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your Perplexity API key will be used for searching and retrieving news articles.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => handleTestConnection("perplexity")}
              disabled={!apiSettings.usePerplexity || !apiKeys.perplexity || testing.perplexity}
              className="flex items-center gap-2"
            >
              {testing.perplexity ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : testResults.perplexity === true ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : testResults.perplexity === false ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : null}
              Test Connection
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reddit API</CardTitle>
            <CardDescription>
              Configure Reddit API for social media content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="reddit-toggle">Enable Reddit API</Label>
                <Switch
                  id="reddit-toggle"
                  checked={apiSettings.useReddit}
                  onCheckedChange={() => handleApiToggle("useReddit")}
                />
              </div>
              
              <div>
                <Label htmlFor="reddit-api-key" className="mb-2 block">
                  API Key
                </Label>
                <Input
                  id="reddit-api-key"
                  type="password"
                  value={apiKeys.reddit}
                  onChange={(e) => handleApiKeyChange("reddit", e.target.value)}
                  placeholder="Enter Reddit API key"
                  disabled={!apiSettings.useReddit}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your Reddit API key will be used for retrieving content from relevant subreddits.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => handleTestConnection("reddit")}
              disabled={!apiSettings.useReddit || !apiKeys.reddit || testing.reddit}
              className="flex items-center gap-2"
            >
              {testing.reddit ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : testResults.reddit === true ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : testResults.reddit === false ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : null}
              Test Connection
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings} 
            disabled={saving}
            className="flex items-center gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save API Settings
          </Button>
        </div>
      </div>
      
      {saving && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Saving API settings...</p>
          </div>
        </div>
      )}
    </div>
  );
}
