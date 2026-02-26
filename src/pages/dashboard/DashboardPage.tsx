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

const kpis = [
  {
    label: "Tasks Due Today",
    value: "14",
    icon: Calendar,
    change: "+4 today",
    color: "bg-primary",
  },
  {
    label: "Active Projects",
    value: "06",
    icon: FolderKanban,
    change: "2 new this week",
    color: "bg-blue-500",
  },
  {
    label: "Completed this Week",
    value: "28",
    icon: CheckSquare,
    change: "+12 vs last week",
    color: "bg-emerald-500",
  },
];

const recentTasks = [
  {
    title: "Project Research",
    project: "Mobile App Redesign",
    due: "Today, 5:00 PM",
    status: "urgent",
  },
  {
    title: "API Endpoint Specs",
    project: "Backend API v2",
    due: "Tomorrow",
    status: "in-progress",
  },
  {
    title: "Client Feedback Loop",
    project: "Marketing Site",
    due: "Wed, Oct 13",
    status: "todo",
  },
  {
    title: "UI Design Audit",
    project: "Design System",
    due: "Completed",
    status: "completed",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-10 animate-fade-in pb-12 px-2 lg:px-6 text-slate-900 dark:text-slate-100">
      {/* Greeting Section */}
      <header className="flex flex-col gap-2 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm">
            <Zap size={20} className="fill-primary" />
          </div>
          <h1 className="text-foreground text-3xl font-black tracking-tight lg:text-4xl">
            Welcome back, Mohamed
          </h1>
        </div>
        <p className="text-muted-foreground lg:ml-13 max-w-2xl text-sm font-medium leading-relaxed lg:text-base">
          You have <span className="text-foreground font-bold italic underline decoration-primary/40 underline-offset-4">14 tasks</span> due today and 2 projects waiting for review.
        </p>
      </header>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white dark:hover:bg-slate-900/60 hover:border-primary/40 hover:-translate-y-1 shadow-md hover:shadow-2xl"
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

      {/* Split View: Recent Tasks vs Quick Actions */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Recent Tasks List */}
        <section className="lg:col-span-8">
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden">
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
          </div>
        </section>

        {/* Quick Actions Menu */}
        <section className="lg:col-span-4 lg:sticky lg:top-6">
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-sm space-y-6 p-8">
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
                  <div className="bg-primary h-full w-[65%] shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                </div>
                <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest">65%</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isAddTaskOpen && <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />}
    </div>
  );
}
