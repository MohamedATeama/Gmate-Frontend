import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Plus, 
  Share2, 
  Users as UsersIcon, 
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { api } from "@/services/api.mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Mail, Briefcase, Percent } from "lucide-react";

type ViewTab = "board" | "team";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ViewTab>("board");

  const { data: project, isLoading, isError } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id!),
    enabled: !!id,
  });

  const { data: team = [] } = useQuery({
    queryKey: ["team"],
    queryFn: () => api.getTeam(),
    enabled: activeTab === "team",
  });

  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 flex flex-col items-center justify-center space-y-4 text-slate-900 dark:text-slate-100 h-[80vh]">
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <Button onClick={() => navigate("/dashboard/projects")} className="rounded-full">Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Unified Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} /> Back to Projects
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {isLoading ? <Skeleton className="h-9 w-64 rounded-xl bg-slate-200 dark:bg-white/5" /> : <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">{project?.name}</h1>}
            {!isLoading && (
              <Badge variant="outline" className="bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest">
                {project?.status}
              </Badge>
            )}
          </div>
          {!isLoading && <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-sm sm:text-base font-medium leading-relaxed">{project?.description}</p>}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-full gap-2 px-5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5 h-10">
            <Share2 size={16} /> Share
          </Button>
          <Button size="sm" className="h-10 px-8 bg-primary hover:bg-indigo-500 rounded-lg font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center gap-2">
            <Plus size={18} /> New Task
          </Button>
        </div>
      </header>

      {/* View Tabs */}
      <div className="flex items-center border-b border-slate-200/50 dark:border-white/5 px-2">
        <button 
          onClick={() => setActiveTab("board")}
          className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
            activeTab === "board" 
              ? "border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400" 
              : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          Board View
        </button>
        <button 
          onClick={() => setActiveTab("team")}
          className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
            activeTab === "team" 
              ? "border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400" 
              : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          Project Team
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-[500px]">
        {activeTab === "board" && id && <KanbanBoard projectId={id} />}
        
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 text-slate-900 dark:text-slate-100">
            {team.slice(0, project?.members || 3).map((member) => (
              <div key={member.id} className="universal-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl border-2 border-white dark:border-slate-800 shadow-xl overflow-hidden">
                    <img src={member.avatar} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight">{member.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{member.role}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Current Workload</span>
                    <span className={member.capacity > 80 ? "text-rose-500" : "text-emerald-500"}>{member.capacity}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${member.capacity > 80 ? "bg-rose-500" : "bg-indigo-500"}`} 
                      style={{ width: `${member.capacity}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg">
                      <Mail size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-indigo-500/20 text-indigo-500 bg-indigo-500/5 px-2">
                    {member.department}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
