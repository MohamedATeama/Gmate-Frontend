import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useRemoveProjectMember } from "@/hooks/useRemoveProjectMember";
import { Button } from "@/components/ui/button";
import { Briefcase, Crown, Users, Search as SearchIcon, ChevronLeft, ChevronRight, UserPlus, UserMinus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";
import { Link } from "react-router-dom";
import InviteMemberModal from "@/components/team/InviteMemberModal";

const projectStatuses = ["All", "Active", "Planning", "On-Hold", "Completed"];

export default function TeamPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteProjectId, setInviteProjectId] = useState<string | null>(null);

  const { projects = [], isLoading } = useProjects({ limit: 50 });
  const removeMemberMutation = useRemoveProjectMember();

  const filteredProjects = projects.filter((p: Project) => {
    // 1. Status Filter
    if (selectedStatus !== "All" && p.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }

    // 2. Search Filter (by Project Title, Owner Name, or Member Name)
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchOwner = p.owner?.name?.toLowerCase().includes(q);
      const matchMember = p.members?.some((m) => m?.user?.name?.toLowerCase().includes(q));
      if (!matchTitle && !matchOwner && !matchMember) {
        return false;
      }
    }

    return true;
  });

  // 3. Local Pagination
  const limit = 9;
  const totalPages = Math.ceil(filteredProjects.length / limit) || 1;
  const safePage = Math.min(page, totalPages);
  
  const displayProjects = filteredProjects.slice((safePage - 1) * limit, safePage * limit);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />
          <div className="h-11 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-white/40 dark:bg-white/5" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">Teams & Projects</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">Overview of all active workspaces and their constituent members.</p>
        </div>

        <div className="relative w-full sm:w-[300px]">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search projects by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page on search
            }}
            className="w-full h-11 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {projectStatuses.map((status) => (
          <Button
            key={status}
            size="sm"
            className={`rounded-full px-6 text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedStatus === status 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-lg" 
                : "bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10"
            }`}
            onClick={() => {
              setSelectedStatus(status);
              setPage(1);
            }}
          >
            {status}
          </Button>
        ))}
      </div>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project: Project) => (
          <div
            key={project._id}
            className="group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white dark:hover:bg-slate-900/60 hover:border-indigo-500/40 hover:-translate-y-1 shadow-md hover:shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between border-b border-border/50 pb-6">
              <div className="space-y-1">
                <Badge variant="outline" className="bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black tracking-widest uppercase rounded-full mb-2">{project.status}</Badge>
                <h3 className="text-xl font-black tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1" title={project.title}>{project.title}</h3>
              </div>
              <Link to={`/dashboard/projects/${project._id}`} className="text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl p-2 transition-all opacity-0 group-hover:opacity-100 shrink-0">
                <Briefcase size={18} />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-black">
                  <Crown size={12} className="text-amber-500" /> <span>Project Owner</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-white dark:border-slate-800 shadow-sm shrink-0">
                    {project.owner?.avatar?.url ? (
                      <img src={project.owner.avatar.url} alt={project.owner.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                        {project.owner?.name?.charAt(0).toUpperCase() || "O"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{project.owner?.name || "Unknown"}</span>
                    <span className="text-[10px] text-slate-500 truncate">{project.owner?.email || "No email"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-black">
                    <Users size={12} /> <span>Team Members ({project.members?.length || 0})</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full hover:bg-slate-200 dark:hover:bg-white/10"
                    onClick={() => {
                      setInviteProjectId(project._id);
                      setInviteOpen(true);
                    }}
                  >
                    <UserPlus size={12} className="text-slate-500" />
                  </Button>
                </div>
                
                {project.members && project.members.length > 0 ? (
                  <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-2 scrollbar-hide">
                    {project.members.map((member: { user: { _id: string; name: string; email: string; avatar?: {url?: string} } } | undefined, i: number) => {
                      if (!member) return null;
                      return (
                        <div key={i} className="flex items-center gap-3 relative group">
                          <div className="flex flex-1 items-center gap-3 overflow-hidden">
                            <div className="h-8 w-8 overflow-hidden rounded-xl border border-white dark:border-slate-800 shrink-0">
                              {member.user.avatar?.url ? (
                                <img src={member.user.avatar.url} alt={member.user.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
                                  {member.user.name?.charAt(0).toUpperCase() || "?"}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{member.user.name}</span>
                              <span className="text-[9px] text-slate-500 truncate opacity-70">{member.user.email}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={removeMemberMutation.isPending && removeMemberMutation.variables?.memberId === member.user._id && removeMemberMutation.variables?.projectId === project._id}
                            onClick={() => {
                              removeMemberMutation.mutate({ projectId: project._id, memberId: member.user._id });
                            }}
                            className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                          >
                            {removeMemberMutation.isPending && removeMemberMutation.variables?.memberId === member.user._id && removeMemberMutation.variables?.projectId === project._id ? (
                              <Loader2 size={14} className="animate-spin text-rose-500" />
                            ) : (
                              <UserMinus size={14} />
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No additional members</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl bg-white/30 dark:bg-white/5">
            <span className="text-slate-500 font-bold font-sm">No projects matched these criteria.</span>
          </div>
        )}
      </main>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="rounded-full shadow-sm"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Prev
          </Button>
          <div className="flex items-center gap-1 px-4 text-sm font-medium text-slate-500">
            Page <span className="text-slate-900 dark:text-white font-bold">{safePage}</span> of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="rounded-full shadow-sm"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} projectId={inviteProjectId} />
    </div>
  );
}
