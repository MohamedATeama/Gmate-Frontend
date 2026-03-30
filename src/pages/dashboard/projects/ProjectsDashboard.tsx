import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, LayoutGrid, List, BarChart2, CheckCircle2, Clock } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectDialog } from "@/components/projects/ProjectDialogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

const ProjectsDashboard: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { projects, metadata, length, isLoading } = useProjects({
    search: debouncedSearch || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit: 6,
  });

  const projectStats = [
    { label: "Total Projects", value: length || 0, icon: <BarChart2 size={16} />, color: "text-indigo-500" },
    { label: "Active", value: projects?.filter((p: Project) => p.status === 'active').length || 0, icon: <Clock size={16} />, color: "text-emerald-500" },
    { label: "Completed", value: projects?.filter((p: Project) => p.status === 'completed').length || 0, icon: <CheckCircle2 size={16} />, color: "text-slate-400" },
  ];

  return (
    <div className="flex flex-col gap-10 p-6 lg:p-10 animate-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Header with Stats */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight leading-none">Projects</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Coordinate your workspace and manage high-level goals.</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)} 
            className="h-12 px-8 bg-primary hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all active:scale-95 gap-2"
          >
            <Plus size={18} /> New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectStats.map((stat, i) => (
            <div key={i} className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 transition-all hover:bg-white dark:hover:bg-slate-900/60 group">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
              </div>
              <span className="text-2xl font-black tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-white/5 pb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Filter projects by name or owner..."
            className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="appearance-none h-10 border border-slate-200 dark:border-white/10 rounded-full pl-10 pr-8 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer bg-white dark:bg-slate-900"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="planning">Planning</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-white/5 rounded-full p-1 flex items-center">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-white dark:bg-white/10 shadow-sm text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
            />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] bg-white/30 dark:bg-white/5">
          <Badge className="bg-indigo-500/10 text-indigo-500 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">Workspace Empty</Badge>
          <h2 className="text-2xl font-black tracking-tight">No projects found.</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mt-2 mb-8">Adjust your filters or query to find existing projects.</p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setPage(1);
            }}
            className="rounded-2xl h-12 px-10 bg-primary hover:bg-indigo-500 font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {metadata.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 border-t border-slate-200 dark:border-white/5 pt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing page <span className="text-foreground font-black">{metadata.currentPage}</span> of <span className="text-foreground font-black">{metadata.totalPages}</span>
            <span className="opacity-60 ml-1">({length} total projects)</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={metadata.currentPage <= 1 || isLoading}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="rounded-xl border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px]"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={metadata.currentPage >= metadata.totalPages || isLoading}
              onClick={() => setPage(p => p + 1)}
              className="rounded-xl border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px]"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default ProjectsDashboard;
