import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Users,
  UserCircle,
  X,
  LogOut,
  CalendarDays,
  Plus,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useDarkMode } from "@/context/ThemeContext";
import { useState } from "react";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/my-tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/timeline", label: "Timeline", icon: CalendarDays },
  { to: "/dashboard/team", label: "Team", icon: Users },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { isDarkMode } = useDarkMode();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleQuickTask = () => {
    setIsAddTaskOpen(true);
    if (onClose) onClose(); // Auto-close sidebar on mobile
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-64 h-screen border-r border-border bg-background flex flex-col transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden text-slate-900 dark:text-slate-100">
          {/* --- Logo Section --- */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden border border-border shadow-md transition-transform group-hover:scale-105">
                <img 
                  src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"} 
                  alt="Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-foreground text-sm font-black tracking-tighter uppercase">GMATE</span>
            </Link>
            
            <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>

          {/* --- Quick Action --- */}
          <div className="px-4 py-4">
            <button 
              onClick={handleQuickTask}
              className="w-full flex items-center justify-center gap-2 h-10 bg-primary hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Plus size={14} />
              Quick Task
            </button>
          </div>

          {/* --- Navigation --- */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* --- Footer Profile --- */}
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="h-9 w-9 rounded-full border border-border overflow-hidden shadow-sm">
              <img src="/assets/team/mohamed_algoahry.jpg" alt="Mohamed Algoahry" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-foreground truncate">Mohamed Algoahry</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase truncate">Project Leader</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-9 px-3 text-xs font-bold border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isAddTaskOpen && <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />}
    </>
  );
}
