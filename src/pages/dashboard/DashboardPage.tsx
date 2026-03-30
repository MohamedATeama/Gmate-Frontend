import {
  CheckSquare,
  FolderKanban,
  Zap,
  Clock,
  Plus,
  TrendingUp,
  Calendar,
  MoreVertical,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import { useUser } from "@/hooks/useUser";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";
import type { Task } from "@/types/project";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const { user, isPending: isUserPending } = useUser();
  const { tasks, isPending: isTasksPending } = useTasks();
  const { projects, isLoading: isProjectsLoading } = useProjects();

  const isPending = isUserPending || isTasksPending || isProjectsLoading;

  if (isPending) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const tasksDueTodayCount = tasks.filter((t: Task) => t.dueDate?.includes(today)).length;
  const activeProjectsCount = projects.filter(p => p.status === "active").length;
  const completedTasksCount = tasks.filter((t: Task) => t.status === "completed").length;
  const reviewTasksCount = tasks.filter((t: Task) => t.status === "review").length;
  const todayGoal = tasksDueTodayCount / tasks.length * 100;

  const kpis = [
    {
      label: "Tasks Due Today",
      value: tasksDueTodayCount.toString().padStart(2, "0"),
      icon: Calendar,
      change: "today",
      color: "bg-primary",
    },
    {
      label: "Active Projects",
      value: activeProjectsCount.toString().padStart(2, "0"),
      icon: FolderKanban,
      change: "active",
      color: "bg-blue-500",
    },
    {
      label: "Completed Tasks",
      value: completedTasksCount.toString().padStart(2, "0"),
      icon: CheckSquare,
      change: "total",
      color: "bg-emerald-500",
    },
  ];

  const recentTasks = [...tasks].slice(0, 4).map((t: Task) => {
    let mappedStatus = "to-do";
    if (t.status === "in-progress" || t.status === "review") mappedStatus = "in-progress";
    if (t.status === "completed") mappedStatus = "completed";
    if (t.priority === "urgent" || t.priority === "high" || t.status === "overdue" || t.status === "important") mappedStatus = "urgent";

    return {
      title: t.title,
      project: t.project ? projects.find(p => p._id === t.project)?.title || "Unknown Project" : "Personal",
      due: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No Due Date",
      status: mappedStatus,
    };
  });

  return (
    <div className="flex flex-col space-y-10 animate-fade-in pb-12 px-2 lg:px-6 text-slate-900 dark:text-slate-100">
      {/* Greeting Section */}
      <header className="flex flex-col gap-2 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm">
            <Zap size={20} className="fill-primary" />
          </div>
          <h1 className="text-foreground text-3xl font-black tracking-tight lg:text-4xl">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}
          </h1>
        </div>
        <p className="text-muted-foreground lg:ml-13 max-w-2xl text-sm font-medium leading-relaxed lg:text-base">
          You have <span className="text-foreground font-bold italic underline decoration-primary/40 underline-offset-4">{tasksDueTodayCount} tasks</span> due today and {reviewTasksCount} tasks waiting for review.
        </p>
      </header>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="universal-card group"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 transition-all group-hover:bg-primary/10 group-hover:text-primary`}>
                <kpi.icon size={22} />
              </div>
              <Badge variant="outline" className="border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                {kpi.change}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <span className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {kpi.label}
              </span>
              <div className="text-slate-900 dark:text-white flex items-baseline gap-2 text-4xl font-black">
                {kpi.value}
                <TrendingUp size={18} className="text-emerald-500 opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Weekly Pulse & Split View */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Weekly Pulse & Recent Tasks */}
        <div className="lg:col-span-8 space-y-10">

          {/* Recent Tasks List */}
          <section className="universal-card overflow-hidden p-0! flex flex-col">
            <header className="border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 py-6">
              <div className="flex items-center gap-3">
                <Clock className="text-slate-400 dark:text-slate-500 h-5 w-5" />
                <h2 className="text-foreground text-lg font-black tracking-tight">Recent Tasks</h2>
              </div>
              <Link to="/dashboard/my-tasks" className="text-primary hover:opacity-80 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                View All
              </Link>
            </header>
            
            <div className="divide-y divide-slate-200 dark:divide-white/5">
              {recentTasks.map((task, i) => (
                <div key={i} className="group flex items-center justify-between p-6 transition-all hover:bg-white/40 dark:hover:bg-white/5">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`h-2.5 w-2.5 rounded-full ${
                      task.status === "urgent" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : 
                      task.status === "in-progress" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" :
                      task.status === "todo" ? "bg-slate-300 dark:bg-slate-700" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    }`} />
                    <div className="min-w-0">
                      <h4 className="text-slate-900 dark:text-white truncate text-sm font-bold group-hover:text-primary transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-500 mt-0.5 truncate text-[10px] font-black uppercase tracking-widest">
                        {task.project}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-slate-400 dark:text-slate-500 hidden text-[10px] font-black uppercase tracking-widest sm:block">
                      {task.due}
                    </span>
                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Quick Actions & Productivity */}
        <section className="lg:col-span-4 space-y-10 lg:sticky lg:top-6">
          <div className="universal-card space-y-6">
            <h2 className="text-foreground text-lg font-black tracking-tight mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => setIsAddTaskOpen(true)}
                size="lg" 
                className="bg-primary hover:bg-indigo-500 h-12 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <Plus size={18} /> Add New Task
              </Button>
              <Button 
                onClick={() => navigate("/dashboard/projects")}
                size="lg" 
                variant="outline" 
                className="border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 h-12 rounded-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <FolderKanban size={18} /> Projects Board
              </Button>
              <Button 
                onClick={() => navigate("/dashboard/team")}
                size="lg" 
                variant="outline" 
                className="border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 h-12 rounded-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <Users size={18} /> Team Overview
              </Button>
            </div>
            
            <div className="bg-slate-50/50 dark:bg-white/5 mt-8 rounded-3xl p-6 border border-slate-200/50 dark:border-white/5">
              <h4 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Today's Goal</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs font-bold leading-relaxed mb-4 italic">
                "Productivity is never an accident. It is always the result of a commitment to excellence."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <Progress value={Math.round(todayGoal)} className="w-full text-primary" />
                </div>
                <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest">{Math.round(todayGoal)}%</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isAddTaskOpen && <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />}
    </div>
  );
}
