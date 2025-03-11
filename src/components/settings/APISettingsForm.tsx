
import { Settings } from '@/types';
import { useState } from 'react';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface APISettingsFormProps {
  settings: Settings;
  onUpdate: () => Promise<void>;
}

export function APISettingsForm({ settings, onUpdate }: APISettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const [apiKeys, setApiKeys] = useState({
    openai: settings.apiKeys?.openai || '',
    perplexity: settings.apiKeys?.perplexity || '',
    reddit: settings.apiKeys?.reddit || ''
  });

  const [apiSettings, setApiSettings] = useState({
    useOpenAI: settings.apiSettings?.useOpenAI || false,
    usePerplexity: settings.apiSettings?.usePerplexity || false,
    useReddit: settings.apiSettings?.useReddit || false
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
    
    setTimeout(() => {
      const success = service !== 'reddit';
      setTestResults({...testResults, [service]: success});
      
      toast({
        title: success ? 'Connection Successful' : 'Connection Failed',
        description: success 
          ? `Successfully connected to ${service} API.` 
          : `Failed to connect to ${service} API. Please check your credentials.`,
        variant: success ? 'default' : 'destructive',
      });
      
      setTesting({...testing, [service]: false});
    }, 1500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await mockDataService.updateSettings({
        ...settings,
        apiKeys,
        apiSettings
      });
      await onUpdate();
      toast({
        title: 'Success',
        description: 'API settings saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save API settings.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='space-y-4'>
          <h4 className='font-medium'>OpenAI Configuration</h4>
          <div className='flex items-center justify-between'>
            <Label htmlFor='openai-toggle'>Enable OpenAI API</Label>
            <Switch
              id='openai-toggle'
              checked={apiSettings.useOpenAI}
              onCheckedChange={() => handleApiToggle('useOpenAI')}
            />
          </div>
          <div>
            <Label htmlFor='openai-api-key'>API Key</Label>
            <div className='flex gap-2 mt-1'>
              <Input
                id='openai-api-key'
                type='password'
                value={apiKeys.openai}
                onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                placeholder='sk-...'
                disabled={!apiSettings.useOpenAI}
              />
              <Button
                variant='outline'
                onClick={() => handleTestConnection('openai')}
                disabled={!apiSettings.useOpenAI || !apiKeys.openai || testing.openai}
                className='flex items-center gap-2 whitespace-nowrap'
              >
                {testing.openai ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : testResults.openai === true ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : testResults.openai === false ? (
                  <AlertTriangle className='h-4 w-4 text-amber-500' />
                ) : null}
                Test
              </Button>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Perplexity Configuration</h4>
          <div className='flex items-center justify-between'>
            <Label htmlFor='perplexity-toggle'>Enable Perplexity API</Label>
            <Switch
              id='perplexity-toggle'
              checked={apiSettings.usePerplexity}
              onCheckedChange={() => handleApiToggle('usePerplexity')}
            />
          </div>
          <div>
            <Label htmlFor='perplexity-api-key'>API Key</Label>
            <div className='flex gap-2 mt-1'>
              <Input
                id='perplexity-api-key'
                type='password'
                value={apiKeys.perplexity}
                onChange={(e) => handleApiKeyChange('perplexity', e.target.value)}
                placeholder='pplx-...'
                disabled={!apiSettings.usePerplexity}
              />
              <Button
                variant='outline'
                onClick={() => handleTestConnection('perplexity')}
                disabled={!apiSettings.usePerplexity || !apiKeys.perplexity || testing.perplexity}
                className='flex items-center gap-2 whitespace-nowrap'
              >
                {testing.perplexity ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : testResults.perplexity === true ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : testResults.perplexity === false ? (
                  <AlertTriangle className='h-4 w-4 text-amber-500' />
                ) : null}
                Test
              </Button>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h4 className='font-medium'>Reddit Configuration</h4>
          <div className='flex items-center justify-between'>
            <Label htmlFor='reddit-toggle'>Enable Reddit API</Label>
            <Switch
              id='reddit-toggle'
              checked={apiSettings.useReddit}
              onCheckedChange={() => handleApiToggle('useReddit')}
            />
          </div>
          <div>
            <Label htmlFor='reddit-api-key'>API Key</Label>
            <div className='flex gap-2 mt-1'>
              <Input
                id='reddit-api-key'
                type='password'
                value={apiKeys.reddit}
                onChange={(e) => handleApiKeyChange('reddit', e.target.value)}
                placeholder='Enter Reddit API key'
                disabled={!apiSettings.useReddit}
              />
              <Button
                variant='outline'
                onClick={() => handleTestConnection('reddit')}
                disabled={!apiSettings.useReddit || !apiKeys.reddit || testing.reddit}
                className='flex items-center gap-2 whitespace-nowrap'
              >
                {testing.reddit ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : testResults.reddit === true ? (
                  <Check className='h-4 w-4 text-green-500' />
                ) : testResults.reddit === false ? (
                  <AlertTriangle className='h-4 w-4 text-amber-500' />
                ) : null}
                Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className='flex items-center gap-2'
        >
          {saving ? <Loader2 className='h-4 w-4 animate-spin' /> : <Save className='h-4 w-4' />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
