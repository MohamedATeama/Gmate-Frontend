import { useLocation, Link } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Bell } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function HeadView() {
  const { pathname } = useLocation();
  const { unreadCount } = useNotifications();
  
  // Basic breadcrumb logic
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || "Dashboard";
  const formattedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace(/-/g, " ");

  return (
    <header className="bg-background/80 border-border sticky top-0 z-30 w-full border-b backdrop-blur-md h-16">
      <div className="h-full flex items-center px-6">
        
        {/* Left Spacer for Mobile Toggle Placeholder */}
        <div className="w-12 lg:hidden shrink-0" />

        {/* --- Surprising Centered Breadcrumb --- */}
        <div className="flex-1 flex justify-center items-center">
          <div className="inline-flex items-center gap-2 bg-muted/30 dark:bg-white/5 border border-border/50 px-4 py-1.5 rounded-full shadow-inner animate-in fade-in zoom-in duration-500">
            <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
              Workspace
            </span>
            <div className="w-1 h-1 bg-primary rounded-full" />
            <h2 className="text-foreground text-[11px] font-black uppercase tracking-widest leading-none">
              {formattedPageName}
            </h2>
          </div>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            to="/dashboard/notifications" 
            className="p-2 rounded-md hover:bg-muted transition-all relative group"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-background animate-pulse" />
            )}
          </Link>
          
          <ThemeToggle />
          
          <div className="bg-border h-4 w-px hidden sm:block mx-1" />
          <div className="text-muted-foreground hidden text-[10px] font-black uppercase tracking-widest sm:block opacity-50">
            Premium
          </div>
        </div>
      </div>
    </header>
  );
}
