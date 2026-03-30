import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Settings,
  Mail,
  Calendar,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useUser";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import type { Task, Project } from "@/types/project";

const recentSuccess = [
  {
    name: "VisionOS Dashboard",
    tag: "CORE",
    date: "2 days ago",
    color: "bg-indigo-500",
  },
  {
    name: "Neural Sync Engine",
    tag: "API",
    date: "1 week ago",
    color: "bg-purple-500",
  },
  {
    name: "Gmate Rebranding",
    tag: "DESIGN",
    date: "2 weeks ago",
    color: "bg-cyan-500",
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isPending: isUserPending } = useUser();
  const { tasks, isPending: isTasksPending } = useTasks();
  const { projects, isLoading: isProjectsPending } = useProjects();

  const isPending = isUserPending || isTasksPending || isProjectsPending;

  if (isPending) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  const completedTasksCount =
    tasks?.filter((t: Task) => t.status === "completed").length || 0;
  const activeProjectsCount =
    projects?.filter((p: Project) => p.status === "active").length || 0;
  const completedProjectsCount =
    projects?.filter((p: Project) => p.status === "completed").length || 0;

  const profile = {
    name: user?.name || "Unknown User",
    role: user?.role || "Team Member",
    email: user?.email || "",
    bio: user?.bio || "No bio provided.",
    joined: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Recently",
    avatar: user?.avatar?.url || "/assets/avatar.jpg",
    stats: [
      {
        label: "Tasks Completed",
        value: completedTasksCount.toString(),
        icon: <Zap className="text-amber-500" />,
      },
      {
        label: "Active Projects",
        value: activeProjectsCount.toString(),
        icon: <ShieldCheck className="text-emerald-500" />,
      },
      {
        label: "Completed Projects",
        value: completedProjectsCount.toString(),
        icon: <TrendingUp className="text-indigo-500" />,
      },
    ],
  };

  return (
    <div className="animate-fade-in mx-auto w-full max-w-7xl space-y-10 p-4 pb-32 text-slate-900 md:p-10 dark:text-slate-100">
      {/* --- Unified Cover & Profile Header --- */}
      <div className="group relative">
        {/* Cover Photo Area */}
        <div className="relative h-48 w-full overflow-hidden rounded-[2.5rem] bg-linear-to-br from-indigo-600 via-purple-600 to-cyan-500 shadow-2xl md:h-72">
          <div className="bg-mesh absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-black/0" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 rounded-xl border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Profile Info Overlay Card */}
        <div className="relative -mt-16 px-6 md:-mt-24 md:px-12">
          <div className="flex flex-col items-start gap-10 rounded-[3rem] border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-3xl md:flex-row md:items-end md:p-12 dark:border-white/10 dark:bg-slate-950/60">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-full border-[6px] border-white shadow-2xl md:h-44 md:w-44 dark:border-slate-900">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full transform object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="absolute right-2 bottom-2 h-6 w-6 rounded-full border-4 border-white bg-emerald-500 dark:border-slate-900" />
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl leading-none font-black tracking-tighter md:text-5xl">
                    {profile.name}
                  </h1>
                  <Badge className="border-none bg-indigo-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                    PRO MEMBER
                  </Badge>
                </div>
                <p className="text-lg font-black tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                  {profile.role}
                </p>
              </div>

              <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="opacity-50" /> Joined{" "}
                  {profile.joined}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex w-full gap-3 pt-6 md:w-auto md:pt-0">
              <Button
                onClick={() => navigate("/dashboard/profile/edit")}
                className="h-14 flex-1 rounded-2xl bg-slate-900 px-8 font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 active:scale-95 md:flex-none dark:bg-white dark:text-slate-900"
              >
                <Settings size={18} className="mr-3" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Sidebar: Bio & Stats */}
        <div className="space-y-10 lg:col-span-4">
          <section className="bg-card/50 border-border space-y-6 rounded-[2.5rem] border p-10 backdrop-blur-xl">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
              About Me
            </h3>
            <p className="text-lg leading-relaxed font-medium text-slate-600 italic dark:text-slate-300">
              "{profile.bio}"
            </p>
            <div className="border-border/50 flex items-center gap-4 border-t pt-6">
              <div className="rounded-xl bg-indigo-500/10 p-3">
                <Mail size={20} className="text-indigo-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                  Direct Contact
                </span>
                <span className="truncate text-sm font-bold">
                  {profile.email}
                </span>
              </div>
            </div>
          </section>

          <div className="grid gap-4">
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card/50 border-border group hover:border-primary/40 flex cursor-default items-center justify-between rounded-3xl border p-6 backdrop-blur-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-slate-100 p-3 transition-transform group-hover:scale-110 dark:bg-white/5">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                    {stat.label}
                  </span>
                </div>
                <span className="text-2xl font-black tracking-tighter">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Portfolio & Activity */}
        <div className="space-y-10 lg:col-span-8">
          <section className="bg-card/50 border-border space-y-8 rounded-[2.5rem] border p-10 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
                Recent Milestones
              </h3>
              <Badge
                variant="outline"
                className="rounded-full border-slate-200 px-3 text-[9px] font-black"
              >
                Last 30 Days
              </Badge>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {recentSuccess.map((item, i) => (
                <div
                  key={i}
                  className="group hover:border-border flex cursor-pointer flex-col gap-4 rounded-3xl border border-transparent bg-slate-50 p-6 transition-all dark:bg-white/5"
                >
                  <div className={`h-2 w-12 rounded-full ${item.color}`} />
                  <h4 className="group-hover:text-primary text-base leading-tight font-black tracking-tight transition-colors">
                    {item.name}
                  </h4>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase opacity-40">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="group relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-indigo-600 to-purple-700 p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-1000 group-hover:scale-125">
              <Globe size={200} />
            </div>
            <div className="relative z-10 max-w-lg space-y-6">
              <h2 className="text-4xl leading-none font-black tracking-tighter">
                Your Workspace is 100% Secure.
              </h2>
              <p className="text-lg leading-relaxed font-medium text-indigo-100/70">
                We've enhanced your architectural footprint with the latest
                Gmate Neural Core. All projects are now optimized for real-time
                collaboration.
              </p>
              <div className="flex gap-4">
                <Button className="h-14 rounded-2xl bg-white px-10 font-black tracking-widest text-indigo-600 uppercase shadow-xl hover:bg-indigo-50">
                  View Security Audit
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
