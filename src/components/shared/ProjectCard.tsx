import { CheckSquare, FolderKanban, Users, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api.mock";
import { toast } from "sonner";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
  });

  return (
    <Link
      to={`/dashboard/projects/${project.id}`}
      className="universal-card group flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div className="bg-primary/10 p-2 rounded-lg">
          <FolderKanban className="w-5 h-5 text-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0">
            {project.status}
          </Badge>
          <button 
            onClick={(e) => {
              e.preventDefault();
              if(confirm("Delete project?")) deleteMutation.mutate(project.id);
            }}
            className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
          >
            {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
          {project.description}
        </p>
      </div>

      <div className="mt-2 space-y-3 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Progress</span>
          <span className="text-[10px] text-foreground font-black">{Math.round(project.progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
          <div 
            className="bg-primary h-full transition-all duration-500 shadow-[0_0_10px_rgba(79,70,229,0.3)]" 
            style={{ width: `${project.progress}%` }} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckSquare className="h-3.5 w-3.5 opacity-60" />
          <span>Tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 opacity-60" />
          <span className="text-foreground">{project.members} Team</span>
        </div>
      </div>
    </Link>
  );
}
