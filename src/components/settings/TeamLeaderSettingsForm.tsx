
import { Settings } from '@/types';
import { useState } from 'react';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TeamLeaderSettingsFormProps {
  settings: Settings;
  onUpdate: () => Promise<void>;
}

export function TeamLeaderSettingsForm({ settings, onUpdate }: TeamLeaderSettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [basePrompt, setBasePrompt] = useState(settings.basePrompt || "");
  const { toast } = useToast();

  const handleBasePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBasePrompt(e.target.value);
  };

  const handleVectorDatabaseSettingChange = (
    field: keyof Settings['vectorDatabase'] | 'searchParameters',
    value: any,
    nestedField?: keyof Settings['vectorDatabase']['searchParameters']
  ) => {
    if (!settings) return;

    const updatedSettings = { ...settings };

    if (field === 'searchParameters' && nestedField) {
      updatedSettings.vectorDatabase = {
        ...updatedSettings.vectorDatabase,
        searchParameters: {
          ...updatedSettings.vectorDatabase.searchParameters,
          [nestedField]: value
        }
      };
    } else {
      updatedSettings.vectorDatabase = {
        ...updatedSettings.vectorDatabase,
        [field]: value
      };
    }

    return updatedSettings;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedSettings = {
        ...settings,
        basePrompt,
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
      toast({
        title: "Success",
        description: "Team Leader settings saved successfully.",
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
        <Label htmlFor="base-prompt" className="mb-2 block">
          Base Prompt Template
        </Label>
        <Textarea
          id="base-prompt"
          value={basePrompt}
          onChange={handleBasePromptChange}
          className="min-h-[200px]"
          placeholder="Enter your base prompt for news curation..."
        />
        <p className="text-sm text-muted-foreground mt-2">
          This prompt will be used as the foundation for all news curation. It should include the core objectives and focus areas.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Enable Vector Search</Label>
            <p className="text-sm text-muted-foreground">
              Use semantic search to refine and improve search results
            </p>
          </div>
          <Switch
            checked={settings.vectorDatabase?.enabled || false}
            onCheckedChange={(checked) => 
              handleVectorDatabaseSettingChange('enabled', checked)
            }
          />
        </div>

        {settings.vectorDatabase?.enabled && (
          <>
            <div className="space-y-4">
              <div>
                <Label>Vector Database Provider</Label>
                <Select
                  value={settings.vectorDatabase.provider}
                  onValueChange={(value) => 
                    handleVectorDatabaseSettingChange('provider', value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pinecone">Pinecone</SelectItem>
                    <SelectItem value="weaviate">Weaviate</SelectItem>
                    <SelectItem value="qdrant">Qdrant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Vector Dimension</Label>
                <Input
                  type="number"
                  value={settings.vectorDatabase.dimension}
                  onChange={(e) => 
                    handleVectorDatabaseSettingChange('dimension', parseInt(e.target.value))
                  }
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  The dimension of the vectors used for semantic search
                </p>
              </div>

              <div>
                <Label>Search Parameters</Label>
                <div className="space-y-4 mt-2">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Top K Results</span>
                      <span className="text-sm font-medium">{settings.vectorDatabase.searchParameters.topK}</span>
                    </div>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[settings.vectorDatabase.searchParameters?.topK ?? 5]}
                      onValueChange={(value) => 
                        handleVectorDatabaseSettingChange('searchParameters', value[0], 'topK')
                      }
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Minimum Score</span>
                      <span className="text-sm font-medium">{settings.vectorDatabase.searchParameters.minScore}</span>
                    </div>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[settings.vectorDatabase.searchParameters.minScore]}
                      onValueChange={(value) => 
                        handleVectorDatabaseSettingChange('searchParameters', value[0], 'minScore')
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Metadata</Label>
                    <Switch
                      checked={settings.vectorDatabase.searchParameters.includeMetadata}
                      onCheckedChange={(checked) => 
                        handleVectorDatabaseSettingChange('searchParameters', checked, 'includeMetadata')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
