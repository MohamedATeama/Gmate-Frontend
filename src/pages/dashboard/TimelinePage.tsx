import { useTasks } from "@/hooks/useTasks";
import { 
  Calendar as CalendarIcon, 
  Search, 
  ArrowRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Task } from "@/types/project";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "important":
      return "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
    case "inProgress":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "upcoming":
      return "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
    case "completed":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

export default function TimelinePage() {
  const { tasks, isPending } = useTasks({ limit: 100 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<'all' | 'with_project' | 'without_project'>('all');
  const fallbackDate = useMemo(() => Date.now(), []);

  // Sort tasks chronologically mapped over genuine network dates
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a: Task, b: Task) => {
      const dateA = new Date(a.dueDate || a.createdAt || fallbackDate).getTime();
      const dateB = new Date(b.dueDate || b.createdAt || fallbackDate).getTime();
      return dateA - dateB;
    });
  }, [tasks, fallbackDate]);

  const filteredTasks = sortedTasks.filter((task: Task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.priority?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Evaluate mapped Project property status
    const matchesProject = filterMode === 'all' 
      ? true 
      : filterMode === 'with_project' 
        ? !!task.project 
        : !task.project;
        
    return matchesSearch && matchesProject;
  });

  // Group tasks by Month/Year for a better timeline experience
  const groupedTasks = useMemo(() => {
    const groups: Record<string, typeof tasks> = {};
    filteredTasks.forEach((task: Task) => {
      const date = new Date(task.dueDate || task.createdAt || fallbackDate);
      const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });
    return groups;
  }, [filteredTasks]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-10 animate-fade-in text-slate-900 dark:text-slate-100 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">Timeline</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">
            Comprehensive roadmap of all workspace activities.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          <div className="flex bg-muted/30 border border-border rounded-xl p-1 shrink-0 w-full sm:w-auto overflow-x-auto">
            <button onClick={() => setFilterMode('all')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${filterMode === 'all' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>All</button>
            <button onClick={() => setFilterMode('with_project')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${filterMode === 'with_project' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Project Tasks</button>
            <button onClick={() => setFilterMode('without_project')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${filterMode === 'without_project' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Standalone</button>
          </div>
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search timeline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Timeline List */}
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] bg-white/30 dark:bg-white/5">
           <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
           <p className="text-slate-500 font-medium">Fetching active timeline...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedTasks).length > 0 ? Object.entries(groupedTasks).map(([month, tasksInMonth]) => (
            <section key={month} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary whitespace-nowrap">{month}</h2>
                <div className="h-px w-full bg-slate-200 dark:bg-white/5" />
              </div>

              <div className="relative space-y-4 ml-2 pl-8 border-l border-slate-200 dark:border-white/5">
                {tasksInMonth.map((task: Task) => {
                  const safeDateString = new Date(task.dueDate || task.createdAt || fallbackDate).toDateString();
                  const dateParts = safeDateString.split(" ");
                  const dayStr = dateParts[0]; // Mon
                  const dateNum = dateParts[2]; // 11
                  const author = task.assignee?.name || task.createdBy?.name || "Unassigned";

                  return (
                    <div key={task._id} className="group relative">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[37px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background z-10 transition-transform group-hover:scale-125 ${
                        task.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 
                        task.status === 'important' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-indigo-500'
                      }`} />

                      <div className="universal-card p-5 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border/50 shrink-0">
                          <span className="text-[9px] font-black uppercase opacity-50">{dayStr}</span>
                          <span className="text-xl font-black leading-none">{dateNum}</span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={`px-2 py-0 text-[8px] font-black tracking-widest uppercase transition-all duration-500 ${getStatusStyles(task.status)}`}>
                              {task.status}
                            </Badge>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-50">{task.priority || "Normal"}</span>
                            {task.project && (
                              <span className="text-indigo-400 text-[9px] font-black uppercase tracking-widest opacity-70 border border-indigo-400/20 px-1.5 rounded-full bg-indigo-500/10">Project Bound</span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">{task.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 font-medium opacity-70">{task.description || "No description provided."}</p>
                        </div>

                        <div className="flex items-center gap-4 sm:border-l border-border/50 sm:pl-6">
                          <div className="flex flex-col items-end sm:items-start max-w-[100px] sm:max-w-[120px] truncate">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Assigned To</span>
                            <span className="text-xs font-bold text-foreground truncate w-full" title={author}>{author}</span>
                          </div>
                          <Link 
                            to={`/dashboard/tasks/${task._id}`} 
                            className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 shrink-0"
                          >
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] bg-white/30 dark:bg-white/5">
              <CalendarIcon className="h-16 w-16 text-slate-200 dark:text-slate-800 mb-6" />
              <h3 className="text-xl font-black tracking-tight">Timeline Empty</h3>
              <p className="text-slate-500 max-w-xs mt-2 font-medium">No tasks found for the current timeline filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
