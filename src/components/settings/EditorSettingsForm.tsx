
import { Settings, BusinessField } from '@/types';
import { useState } from 'react';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, X, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditorSettingsFormProps {
  settings: Settings;
  onUpdate: () => Promise<void>;
}

export function EditorSettingsForm({ settings, onUpdate }: EditorSettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [newPriorityKeyword, setNewPriorityKeyword] = useState("");
  const [newExclusionKeyword, setNewExclusionKeyword] = useState("");
  const [editorPrompt, setEditorPrompt] = useState(settings.editorPrompt || "");
  const { toast } = useToast();

  const handleEditorPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorPrompt(e.target.value);
  };

  const handleRelevanceWeightChange = async (key: keyof Settings["relevanceWeights"], value: number[]) => {
    try {
      const updatedSettings = {
        ...settings,
        relevanceWeights: {
          ...settings.relevanceWeights,
          [key]: value[0] / 10,
        },
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update relevance weights.",
        variant: "destructive",
      });
    }
  };

  const handleMinimumScoreChange = async (value: number[]) => {
    try {
      const updatedSettings = {
        ...settings,
        minimumScore: value[0] / 10,
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update minimum score.",
        variant: "destructive",
      });
    }
  };

  const addPriorityKeyword = async () => {
    if (newPriorityKeyword.trim() && !settings.priorityKeywords.includes(newPriorityKeyword.trim())) {
      try {
        const updatedSettings = {
          ...settings,
          priorityKeywords: [...settings.priorityKeywords, newPriorityKeyword.trim()],
        };
        await mockDataService.updateSettings(updatedSettings);
        await onUpdate();
        setNewPriorityKeyword("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add priority keyword.",
          variant: "destructive",
        });
      }
    }
  };

  const removePriorityKeyword = async (keyword: string) => {
    try {
      const updatedSettings = {
        ...settings,
        priorityKeywords: settings.priorityKeywords.filter((k) => k !== keyword),
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove priority keyword.",
        variant: "destructive",
      });
    }
  };

  const addExclusionKeyword = async () => {
    if (newExclusionKeyword.trim() && !settings.exclusionKeywords.includes(newExclusionKeyword.trim())) {
      try {
        const updatedSettings = {
          ...settings,
          exclusionKeywords: [...settings.exclusionKeywords, newExclusionKeyword.trim()],
        };
        await mockDataService.updateSettings(updatedSettings);
        await onUpdate();
        setNewExclusionKeyword("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add exclusion keyword.",
          variant: "destructive",
        });
      }
    }
  };

  const removeExclusionKeyword = async (keyword: string) => {
    try {
      const updatedSettings = {
        ...settings,
        exclusionKeywords: settings.exclusionKeywords.filter((k) => k !== keyword),
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove exclusion keyword.",
        variant: "destructive",
      });
    }
  };

  const handleDisplayOptionChange = async (key: keyof Settings["displayOptions"], value: any) => {
    try {
      const updatedSettings = {
        ...settings,
        displayOptions: {
          ...settings.displayOptions,
          [key]: value,
        },
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update display options.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedSettings = {
        ...settings,
        editorPrompt,
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
      toast({
        title: "Success",
        description: "Editor settings saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save editor settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="editor-prompt" className="mb-2 block">
          Editor Prompt Template
        </Label>
        <Textarea
          id="editor-prompt"
          value={editorPrompt}
          onChange={handleEditorPromptChange}
          className="min-h-[200px]"
          placeholder="Enter instructions for how the Editor should process and edit content..."
        />
        <p className="text-sm text-muted-foreground mt-2">
          This prompt will guide how the Editor processes and formats articles. Include instructions for tone, style, formatting, and what information to prioritize.
        </p>
      </div>

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
        </div>

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
