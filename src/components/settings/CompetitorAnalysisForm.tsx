
import { Settings } from '@/types';
import { useState } from 'react';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Save, X, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CompetitorAnalysisFormProps {
  settings: Settings;
  onUpdate: () => Promise<void>;
}

export function CompetitorAnalysisForm({ settings, onUpdate }: CompetitorAnalysisFormProps) {
  const [saving, setSaving] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState("");
  const { toast } = useToast();

  const handleAddCompetitor = async () => {
    if (newCompetitor.trim() && !settings.competitorAnalysis.competitors.includes(newCompetitor.trim())) {
      try {
        const updatedSettings = {
          ...settings,
          competitorAnalysis: {
            ...settings.competitorAnalysis,
            competitors: [...settings.competitorAnalysis.competitors, newCompetitor.trim()]
          }
        };
        await mockDataService.updateSettings(updatedSettings);
        await onUpdate();
        setNewCompetitor("");
        toast({
          title: "Success",
          description: "Competitor added successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add competitor.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveCompetitor = async (competitor: string) => {
    try {
      const updatedSettings = {
        ...settings,
        competitorAnalysis: {
          ...settings.competitorAnalysis,
          competitors: settings.competitorAnalysis.competitors.filter(c => c !== competitor)
        }
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
      toast({
        title: "Success",
        description: "Competitor removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove competitor.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFrequency = async (value: number[]) => {
    try {
      const updatedSettings = {
        ...settings,
        competitorAnalysis: {
          ...settings.competitorAnalysis,
          updateFrequency: value[0]
        }
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update frequency.",
        variant: "destructive",
      });
    }
  };

  const handleMentionsThreshold = async (value: number[]) => {
    try {
      const updatedSettings = {
        ...settings,
        competitorAnalysis: {
          ...settings.competitorAnalysis,
          minMentionsThreshold: value[0]
        }
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update threshold.",
        variant: "destructive",
      });
    }
  };

  const handleToggleEnabled = async (checked: boolean) => {
    try {
      const updatedSettings = {
        ...settings,
        competitorAnalysis: {
          ...settings.competitorAnalysis,
          enabled: checked
        }
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle competitor analysis.",
        variant: "destructive",
      });
    }
  };

  const handleToggleAutoReports = async (checked: boolean) => {
    try {
      const updatedSettings = {
        ...settings,
        competitorAnalysis: {
          ...settings.competitorAnalysis,
          autoGenerateReports: checked
        }
      };
      await mockDataService.updateSettings(updatedSettings);
      await onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle auto reports.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Enable Competitor Analysis</Label>
          <p className="text-sm text-muted-foreground">
            Track and analyze competitor activity across various platforms
          </p>
        </div>
        <Switch
          checked={settings.competitorAnalysis.enabled}
          onCheckedChange={handleToggleEnabled}
        />
      </div>

      {settings.competitorAnalysis.enabled && (
        <>
          <div>
            <Label className="mb-2 block">Competitors</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {settings.competitorAnalysis.competitors.map((competitor) => (
                <div
                  key={competitor}
                  className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {competitor}
                  <button
                    type="button"
                    onClick={() => handleRemoveCompetitor(competitor)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                placeholder="Add a competitor..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddCompetitor}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">
              Update Frequency (hours): {settings.competitorAnalysis.updateFrequency}
            </Label>
            <Slider
              min={1}
              max={48}
              step={1}
              value={[settings.competitorAnalysis.updateFrequency]}
              onValueChange={handleUpdateFrequency}
            />
            <p className="text-sm text-muted-foreground mt-2">
              How often to check for new competitor content and updates
            </p>
          </div>

          <div>
            <Label className="mb-2 block">
              Minimum Mentions Threshold: {settings.competitorAnalysis.minMentionsThreshold}
            </Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[settings.competitorAnalysis.minMentionsThreshold]}
              onValueChange={handleMentionsThreshold}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Minimum number of mentions required to include in analysis
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-generate Reports</Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate competitor analysis reports
              </p>
            </div>
            <Switch
              checked={settings.competitorAnalysis.autoGenerateReports}
              onCheckedChange={handleToggleAutoReports}
            />
          </div>
        </>
      )}
    </div>
  );
}
