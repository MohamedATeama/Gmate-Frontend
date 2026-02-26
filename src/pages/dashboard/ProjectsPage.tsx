import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api.mock";
import ProjectCard from "@/components/shared/ProjectCard";
import ProjectDialog from "@/components/shared/ProjectDialog";
import { FolderKanban, Info } from "lucide-react";

export default function ProjectsPage() {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getProjects(),
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />
          <div className="h-11 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/5" />
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-[2rem] bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10" />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center text-slate-900 dark:text-slate-100">
        <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl"><Info size={40} /></div>
        <h3 className="text-2xl font-black tracking-tight">Error loading projects</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm font-medium">We encountered a problem while fetching your projects.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="bg-indigo-600/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex h-9 w-9 items-center justify-center rounded-xl shadow-sm"><FolderKanban size={20} /></div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Projects</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 sm:ml-12 text-sm font-medium tracking-tight">You have <span className="text-slate-900 dark:text-white font-black italic">{projects.length} active</span> workspaces.</p>
        </div>
        <ProjectDialog />
      </header>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10 py-32 text-center bg-white/30 dark:bg-white/5">
          <div className="bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-700 mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] shadow-inner"><FolderKanban size={48} /></div>
          <h3 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">No projects yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs text-sm font-medium">Start by creating your first workspace to organize your tasks.</p>
          <div className="mt-10"><ProjectDialog /></div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
