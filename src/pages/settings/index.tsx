import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Bot, 
  Edit, 
  Key, 
  FileText, 
  Activity, 
  Database,
  Building2,
  GitBranch
} from "lucide-react";

export default function SettingsIndexPage() {
  const router = useRouter();

  const settingsModules = [
    {
      category: 'Core Agent Configuration',
      description: 'Configure the core AI agents and their behavior',
      modules: [
        {
          title: 'Team Leader Settings',
          description: 'Configure base prompt and vector search refinement',
          icon: <Users className='h-8 w-8' />,
          href: '/settings/team-leader',
        },
        {
          title: 'Assistant Settings',
          description: 'Configure Perplexity integration and content fetching',
          icon: <Bot className='h-8 w-8' />,
          href: '/settings/assistant',
        },
        {
          title: 'Editor Settings',
          description: 'Configure relevance scoring and content refinement',
          icon: <Edit className='h-8 w-8' />,
          href: '/settings/editor',
        },
      ]
    },
    {
      category: 'Infrastructure & Monitoring',
      description: 'Configure system infrastructure and monitor performance',
      modules: [
        {
          title: 'Database Settings',
          description: 'Configure vector database and output schema',
          icon: <Database className='h-8 w-8' />,
          href: '/settings/database',
        },
        {
          title: 'API Connections',
          description: 'Manage API keys and service credentials',
          icon: <Key className='h-8 w-8' />,
          href: '/settings/api',
        },
        {
          title: 'System Status',
          description: 'Monitor services and token usage',
          icon: <Activity className='h-8 w-8' />,
          href: '/settings/status',
        },
      ]
    },
    {
      category: 'Organization & Analysis',
      description: 'Manage company structure and workflow',
      modules: [
        {
          title: 'Company Branches',
          description: 'Manage branches and their business fields',
          icon: <Building2 className='h-8 w-8' />,
          href: '/settings/branches',
        },
        {
          title: 'System Logs',
          description: 'View detailed system logs and events',
          icon: <FileText className='h-8 w-8' />,
          href: '/settings/logging',
        },
        {
          title: 'Pipeline Overview',
          description: 'Understand the news curation workflow',
          icon: <GitBranch className='h-8 w-8' />,
          href: '/settings/pipeline',
        },
      ]
    }
  ];

  return (
    <div className='container max-w-6xl'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-muted-foreground mt-1'>
          Configure and monitor the news curation system
        </p>
      </div>

      {settingsModules.map((category) => (
        <div key={category.category} className='mb-12'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold border-b pb-2'>{category.category}</h2>
            <p className='text-sm text-muted-foreground mt-2'>{category.description}</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {category.modules.map((module) => (
              <Link href={module.href} key={module.title}>
                <Card className='hover:shadow-md transition-shadow cursor-pointer h-full'>
                  <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                    <div className='p-2 bg-primary/10 rounded-md text-primary'>
                      {module.icon}
                    </div>
                    <div>
                      <CardTitle className='text-lg'>{module.title}</CardTitle>
                      <CardDescription className='text-sm'>{module.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className='pt-4'>
                    <Button 
                      variant='outline' 
                      className='w-full'
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}