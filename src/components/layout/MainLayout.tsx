import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Newspaper, 
  Settings as SettingsIcon,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setLoading(false);
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Documentation', href: '/documentation', icon: FileText }
  ];

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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    router.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      router.pathname === item.href 
                        ? 'text-primary-foreground' 
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                    )}
                    aria-hidden='true'
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <Button variant='ghost' size='icon' onClick={() => setIsOpen(false)}>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close menu</span>
              </Button>
            </div>
            <nav className='flex-1 space-y-2 p-4 overflow-y-auto'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    router.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      router.pathname === item.href 
                        ? 'text-primary-foreground' 
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                    )}
                    aria-hidden='true'
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <main className='flex-1 p-4 md:p-6 pt-16 md:pt-6'>
          {loading ? (
            <div className='flex items-center justify-center h-[80vh]'>
              <div className='text-center'>
                <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
                <p className='text-muted-foreground'>Loading...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}