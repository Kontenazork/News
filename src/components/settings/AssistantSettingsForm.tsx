
import { Settings } from '@/types';
import { useState } from 'react';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, X, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AssistantSettingsFormProps {
  settings: Settings;
  onUpdate: () => Promise<void>;
}

export function AssistantSettingsForm({ settings, onUpdate }: AssistantSettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newTrustedSource, setNewTrustedSource] = useState("");
  const [perplexityPrompt, setPerplexityPrompt] = useState(settings.perplexityPrompt || "");
  const { toast } = useToast();

  const handleTimeframeChange = async (value: number[]) => {
    try {
      const updatedSettings = {
        ...settings,
        timeframe: value[0]
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update timeframe.",
        variant: "destructive",
      });
    }
  };

  const handleSourceToggle = async (key: keyof Settings["sources"]) => {
    try {
      const updatedSettings = {
        ...settings,
        sources: {
          ...settings.sources,
          [key]: !settings.sources[key],
        },
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update sources.",
        variant: "destructive",
      });
    }
  };

  const handlePerplexityPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPerplexityPrompt(e.target.value);
  };

  const addKeyword = async () => {
    if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
      try {
        const updatedSettings = {
          ...settings,
          keywords: [...settings.keywords, newKeyword.trim()],
        };
        await mockDataService.updateSettings(updatedSettings);
        await onUpdate();
        setNewKeyword("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add keyword.",
          variant: "destructive",
        });
      }
    }
  };

  const removeKeyword = async (keyword: string) => {
    try {
      const updatedSettings = {
        ...settings,
        keywords: settings.keywords.filter((k) => k !== keyword),
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove keyword.",
        variant: "destructive",
      });
    }
  };

  const addTrustedSource = async () => {
    if (newTrustedSource.trim() && !settings.trustedSources.includes(newTrustedSource.trim())) {
      try {
        const updatedSettings = {
          ...settings,
          trustedSources: [...settings.trustedSources, newTrustedSource.trim()],
        };
        await mockDataService.updateSettings(updatedSettings);
        await onUpdate();
        setNewTrustedSource("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add trusted source.",
          variant: "destructive",
        });
      }
    }
  };

  const removeTrustedSource = async (source: string) => {
    try {
      const updatedSettings = {
        ...settings,
        trustedSources: settings.trustedSources.filter((s) => s !== source),
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove trusted source.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedSettings = {
        ...settings,
        perplexityPrompt,
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
      toast({
        title: "Success",
        description: "Assistant settings saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
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
          This template will be used when communicating with Perplexity. You can use variables like {"{keywords}"}, {"{timeframe}"}, and {"{branches}"}.
        </p>
      </div>

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
        </div>

        <div className="space-y-4">
          <Label className="mb-2 block">Sources</Label>
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
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
