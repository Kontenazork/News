import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Newspaper, 
  Settings as SettingsIcon,
  Menu,
  X,
  Users,
  Bot,
  Edit,
  Key,
  FileText,
  GitBranch,
  Building2,
  Activity,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'News', href: '/news', icon: Newspaper },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: SettingsIcon,
      children: [
        { name: 'Team Leader', href: '/settings/team-leader', icon: Users },
        { name: 'Assistant', href: '/settings/assistant', icon: Bot },
        { name: 'Editor', href: '/settings/editor', icon: Edit },
        { name: 'API Settings', href: '/settings/api', icon: Key },
        { name: 'Company Branches', href: '/settings/branches', icon: Building2 },
        { name: 'Service Status', href: '/settings/status', icon: Activity },
        { name: 'Database Settings', href: '/settings/database', icon: Database },
        { name: 'Logging', href: '/settings/logging', icon: FileText },
        { name: 'Pipeline', href: '/settings/pipeline', icon: GitBranch },
      ]
    },
  ];

  const isSettingsActive = router.pathname.startsWith('/settings');
  const isSettingsChildActive = (href: string) => router.pathname === href;

  return (
    <div className='flex min-h-screen bg-background'>
      {/* Desktop Sidebar */}
      <div className='hidden md:flex md:w-72 md:flex-col'>
        <div className='flex flex-col flex-grow border-r border-border bg-card px-4 py-5'>
          <div className='flex items-center h-16 flex-shrink-0 px-4'>
            <h1 className='text-2xl font-bold text-primary'>ZORK News</h1>
          </div>
          <div className='mt-5 flex-1 flex flex-col overflow-y-auto'>
            <nav className='flex-1 space-y-2 px-2'>
              {navigation.map((item) => {
                const isActive = item.href === '/settings' 
                  ? isSettingsActive 
                  : router.pathname === item.href;
                
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 h-5 w-5',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                    
                    {item.children && isSettingsActive && (
                      <div className='ml-6 mt-2 space-y-1'>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'group flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
                              isSettingsChildActive(child.href)
                                ? 'bg-secondary text-secondary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            <child.icon
                              className={cn(
                                'mr-3 h-4 w-4',
                                isSettingsChildActive(child.href) ? 'text-secondary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                              )}
                              aria-hidden='true'
                            />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className='md:hidden'>
          <Button variant='ghost' size='icon' className='fixed top-4 left-4 z-40'>
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-72 p-0'>
          <div className='flex flex-col h-full bg-card'>
            <div className='flex items-center justify-between h-16 px-4 border-b border-border'>
              <h1 className='text-2xl font-bold text-primary'>ZORK News</h1>
              <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close menu</span>
              </Button>
            </div>
            <nav className='flex-1 space-y-2 p-4 overflow-y-auto'>
              {navigation.map((item) => {
                const isActive = item.href === '/settings' 
                  ? isSettingsActive 
                  : router.pathname === item.href;
                
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                      onClick={() => !item.children && setOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 h-5 w-5',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                    
                    {item.children && isSettingsActive && (
                      <div className='ml-6 mt-2 space-y-1'>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'group flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
                              isSettingsChildActive(child.href)
                                ? 'bg-secondary text-secondary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <child.icon
                              className={cn(
                                'mr-3 h-4 w-4',
                                isSettingsChildActive(child.href) ? 'text-secondary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                              )}
                              aria-hidden='true'
                            />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <main className='flex-1 p-4 md:p-6 pt-16 md:pt-6'>
          {children}
        </main>
      </div>
    </div>
  );
}