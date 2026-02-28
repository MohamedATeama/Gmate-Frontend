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
  BarChart3,
  ArrowUpRight,
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

const weeklyPulse = [
  { day: "Mon", count: 12, height: "h-[45%]" },
  { day: "Tue", count: 18, height: "h-[65%]" },
  { day: "Wed", count: 24, height: "h-[85%]" },
  { day: "Thu", count: 16, height: "h-[55%]" },
  { day: "Fri", count: 28, height: "h-[100%]" },
  { day: "Sat", count: 8, height: "h-[30%]" },
  { day: "Sun", count: 5, height: "h-[20%]" },
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
          
          {/* Weekly Pulse Chart */}
          <section className="universal-card overflow-hidden !p-0">
            <header className="border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 py-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-indigo-500 h-5 w-5" />
                <h2 className="text-foreground text-lg font-black tracking-tight">Weekly Pulse</h2>
              </div>
              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-indigo-500/20 text-indigo-500 bg-indigo-500/5 px-2">
                Velocity: 85%
              </Badge>
            </header>
            
            <div className="p-8">
              <div className="flex items-end justify-between h-48 gap-2 mb-6">
                {weeklyPulse.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="relative w-full flex flex-col items-center justify-end h-full">
                      {/* Tooltip */}
                      <div className="absolute -top-8 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {item.count} Tasks
                      </div>
                      <div className={`w-full sm:w-8 rounded-t-xl bg-slate-100 dark:bg-white/5 group-hover:bg-primary/20 transition-all duration-500 relative overflow-hidden ${item.height}`}>
                        <div className={`absolute bottom-0 w-full bg-linear-to-t from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.3)] group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all duration-500 h-full`} />
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5 gap-4">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Completion Rate</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">94.2%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Hours</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">142h</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest px-6 h-10 group">
                  Detailed Insights <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* Recent Tasks List */}
          <section className="universal-card overflow-hidden !p-0 flex flex-col">
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
                  <div className="bg-primary h-full w-[65%] shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                </div>
                <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest">65%</span>
              </div>
            </div>
          </div>
          
          {/* AI Productivity Block */}
          <div className="relative group overflow-hidden bg-linear-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12">
              <Zap size={100} fill="white" />
            </div>
            <div className="relative z-10 space-y-4">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[8px] font-black uppercase tracking-widest px-2">
                Gmate Intelligence
              </Badge>
              <h4 className="text-xl font-black leading-tight">Focus Peak Detected</h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Your highest output is between 9:00 AM and 11:30 AM. We suggest scheduling deep-work for tomorrow.
              </p>
              <button className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-xl">
                Block Calendar <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {isAddTaskOpen && <AddTaskDialog onClose={() => setIsAddTaskOpen(false)} />}
    </div>
  );
}
