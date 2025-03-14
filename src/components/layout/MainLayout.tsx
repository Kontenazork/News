import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Navigation } from "@/components/layout/Navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleRouteChange = useCallback(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router.events]);

  useEffect(() => {
    return handleRouteChange();
  }, [handleRouteChange]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card px-4 py-5">
          <div className="flex items-center h-16 flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold text-primary">ZORK News</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
            <Navigation />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full bg-card">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <h1 className="text-2xl font-bold text-primary">ZORK News</h1>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetTrigger>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <Navigation />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          {loading ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading...</p>
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