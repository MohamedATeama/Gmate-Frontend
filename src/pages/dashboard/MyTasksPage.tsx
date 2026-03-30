import { useState, useEffect } from "react";
import { Search, Plus, LayoutDashboard, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/shared/TaskCard";
import Empty from "@/components/shared/Empty";
import { useTasks } from "@/hooks/useTasks";
import type { TaskStatus, Task } from "@/types/project";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const statusFilterOptions: { value: TaskStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "to-do", label: "To Do" },
  { value: "important", label: "Important" },
  { value: "in-progress", label: "In Progress" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
];

const neonStyles: Record<string, string> = {
  all: "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5",
  "to-do": "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5",
  important: "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)] dark:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  "in-progress": "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  upcoming: "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)] dark:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
  completed: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  overdue: "border-red-500/20 text-red-600 dark:text-red-400 bg-red-500/5 dark:bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)] dark:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
};

export default function MyTasksPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { tasks: taskList, isPending, totalPages, currentPage } = useTasks({
    page,
    limit: 6,
    search: debouncedSearch || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const isEmpty = !isPending && taskList.length === 0 && !searchQuery && statusFilter === "all";

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">My Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {taskList.length} tasks assigned to you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button 
            onClick={() => setIsAdding(true)} 
            className="w-full sm:w-auto gap-2 rounded-full h-11 px-6 shadow-md font-black tracking-widest uppercase text-[10px]"
          >
            <Plus size={16} /> Add Task
          </Button>

          <div className="relative w-full sm:w-64 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search tasks..."
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="bg-slate-100 dark:bg-white/5 rounded-full p-1 flex items-center">
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode("board")}
              className={`p-2 rounded-full transition-all ${viewMode === "board" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <LayoutDashboard size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        {/* Neon Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilterOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  isActive 
                    ? neonStyles[opt.value] 
                    : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {isEmpty ? (
          <Empty onAdd={() => setIsAdding(true)} />
        ) : taskList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] bg-white/30 dark:bg-white/5">
            <p className="text-slate-400 font-medium mb-6">No tasks match your filter.</p>
            <Button
              variant="outline"
              className="rounded-full px-8 h-10"
              onClick={() => {
                setStatusFilter("all");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {taskList.map((task: Task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-6">
                <Button variant="outline" disabled={currentPage <= 1 || isPending} onClick={() => setPage(p => p - 1)}>
                  Previous
                </Button>
                <span className="text-sm font-medium text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>
                <Button variant="outline" disabled={currentPage >= totalPages || isPending} onClick={() => setPage(p => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-2">
            <KanbanBoard tasks={taskList} />
          </div>
        )}

        {isAdding && <AddTaskDialog onClose={() => setIsAdding(false)} />}
      </section>
    </div>
  );
}
