
import { useState } from "react";
import { Settings, CompanyBranch, BusinessField } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Save } from "lucide-react";

interface SettingsFormProps {
  initialSettings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsForm({ initialSettings, onSave }: SettingsFormProps) {
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });
  const [newKeyword, setNewKeyword] = useState("");
  const [newTrustedSource, setNewTrustedSource] = useState("");
  const [newPriorityKeyword, setNewPriorityKeyword] = useState("");
  const [newExclusionKeyword, setNewExclusionKeyword] = useState("");

  const handleBasePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings({ ...settings, basePrompt: e.target.value });
  };

  const handleTimeframeChange = (value: number[]) => {
    setSettings({ ...settings, timeframe: value[0] });
  };

  const handleSourceToggle = (key: keyof Settings["sources"]) => {
    setSettings({
      ...settings,
      sources: {
        ...settings.sources,
        [key]: !settings.sources[key],
      },
    });
  };

  const handleRelevanceWeightChange = (key: keyof Settings["relevanceWeights"], value: number[]) => {
    setSettings({
      ...settings,
      relevanceWeights: {
        ...settings.relevanceWeights,
        [key]: value[0] / 10,
      },
    });
  };

  const handleMinimumScoreChange = (value: number[]) => {
    setSettings({ ...settings, minimumScore: value[0] / 10 });
  };

  const handleDisplayOptionChange = (key: keyof Settings["displayOptions"], value: any) => {
    setSettings({
      ...settings,
      displayOptions: {
        ...settings.displayOptions,
        [key]: value,
      },
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
      setSettings({
        ...settings,
        keywords: [...settings.keywords, newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setSettings({
      ...settings,
      keywords: settings.keywords.filter((k) => k !== keyword),
    });
  };

  const addTrustedSource = () => {
    if (newTrustedSource.trim() && !settings.trustedSources.includes(newTrustedSource.trim())) {
      setSettings({
        ...settings,
        trustedSources: [...settings.trustedSources, newTrustedSource.trim()],
      });
      setNewTrustedSource("");
    }
  };

  const removeTrustedSource = (source: string) => {
    setSettings({
      ...settings,
      trustedSources: settings.trustedSources.filter((s) => s !== source),
    });
  };

  const addPriorityKeyword = () => {
    if (newPriorityKeyword.trim() && !settings.priorityKeywords.includes(newPriorityKeyword.trim())) {
      setSettings({
        ...settings,
        priorityKeywords: [...settings.priorityKeywords, newPriorityKeyword.trim()],
      });
      setNewPriorityKeyword("");
    }
  };

  const removePriorityKeyword = (keyword: string) => {
    setSettings({
      ...settings,
      priorityKeywords: settings.priorityKeywords.filter((k) => k !== keyword),
    });
  };

  const addExclusionKeyword = () => {
    if (newExclusionKeyword.trim() && !settings.exclusionKeywords.includes(newExclusionKeyword.trim())) {
      setSettings({
        ...settings,
        exclusionKeywords: [...settings.exclusionKeywords, newExclusionKeyword.trim()],
      });
      setNewExclusionKeyword("");
    }
  };

  const removeExclusionKeyword = (keyword: string) => {
    setSettings({
      ...settings,
      exclusionKeywords: settings.exclusionKeywords.filter((k) => k !== keyword),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form onSubmit={handleSubmit}>
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
              className="min-h-[120px]"
              placeholder="Enter your base prompt for news curation..."
            />
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
              </div>
            </div>
          </CardContent>
        </Card>

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
                  Articles with an overall score below this threshold will be excluded.
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
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </form>
  );
}
