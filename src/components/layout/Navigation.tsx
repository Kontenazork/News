import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Newspaper, Settings as SettingsIcon, FileText } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
  { name: "Documentation", href: "/documentation", icon: FileText }
];

interface NavigationProps {
  onItemClick?: () => void;
}

export function Navigation({ onItemClick }: NavigationProps) {
  const router = useRouter();

  return (
    <nav className="flex-1 space-y-2 px-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
            router.pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={onItemClick}
        >
          <item.icon
            className={cn(
              "mr-3 h-5 w-5",
              router.pathname === item.href 
                ? "text-primary-foreground" 
                : "text-muted-foreground group-hover:text-accent-foreground"
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}