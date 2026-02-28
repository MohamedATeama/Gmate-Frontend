import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Users,
  LogOut,
  CalendarDays,
  Plus,
  Settings,
  User,
  Sparkles
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
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
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleQuickTask = () => {
    setIsAddTaskOpen(true);
    if (onClose) onClose();
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 h-screen border-r border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex flex-col transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-hidden px-4">
          
          {/* --- Premium Logo Section --- */}
          <div className="py-8 px-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-11 w-11 shrink-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-transform group-hover:scale-110 group-active:scale-95 duration-500">
                  <img 
                    src="/assets/logo-light.png" 
                    alt="Gmate" 
                    className="h-full w-full object-cover dark:hidden"
                  />
                  <img 
                    src="/assets/logo-dark.png" 
                    alt="Gmate" 
                    className="h-full w-full object-cover hidden dark:block"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-lg font-black tracking-tighter uppercase leading-none">GMATE</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500">Systems</span>
              </div>
            </Link>
          </div>

          {/* --- Premium Action Button --- */}
          <div className="px-4 py-6">
            <button 
              onClick={handleQuickTask}
              className="w-full flex items-center justify-center gap-3 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.25rem] font-black uppercase tracking-[0.15em] text-[10px] shadow-2xl shadow-indigo-500/30 transition-all active:scale-95 hover:scale-[1.02] duration-500 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              Quick Task
            </button>
          </div>

          {/* --- Premium Navigation --- */}
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 nav-font transition-all duration-500 group ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-white/5"
                      : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform duration-500" />
                <span className="flex-1">{item.label}</span>
                <Sparkles size={12} className="opacity-0 group-hover:opacity-40 transition-opacity" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* --- Premium Footer Section --- */}
        <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
          <Link to="/dashboard/profile" className="flex items-center gap-4 px-2 mb-6 group cursor-pointer">
            <div className="relative shrink-0">
              <div className="h-11 w-11 rounded-full border-2 border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-transform group-hover:scale-110 duration-500">
                <img src="/assets/team/mohamed_algoahry.jpg" alt="Mohamed Algoahry" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black text-foreground truncate uppercase tracking-tight">M. Algoahry</p>
              <p className="text-[9px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-[0.1em] truncate">Architect</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-11 flex items-center justify-center">
              <ThemeToggle />
            </div>
            <button className="flex-[2] flex items-center justify-center gap-3 rounded-2xl h-11 px-4 text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white active:scale-95">
              <LogOut size={16} />
              Exit
            </button>
          </div>
        </div>
      </aside>

      {isAddTaskOpen && <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />}
    </>
  );
}
