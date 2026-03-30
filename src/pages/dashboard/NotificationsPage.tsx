import {
  ClipboardList,
  TriangleAlert,
  Info,
  AtSign,
  Clock,
  Check,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useState } from "react";
import {
  useNotifications,
  type NotificationType,
} from "@/context/NotificationContext";
import { Link } from "react-router-dom";

type FilterTab = "All" | "Unread" | "Tasks" | "Projects";

type TypeStyle = {
  icon: React.ReactNode;
  iconBgClass: string;
  iconColorClass: string;
  unreadBorderClass: string;
  unreadTitleClass: string;
};

const TYPE_STYLES: Record<NotificationType | "system", TypeStyle> = {
  task_assigned: {
    icon: <ClipboardList size={18} />,
    iconBgClass: "bg-indigo-500/10",
    iconColorClass: "text-indigo-600 dark:text-indigo-400",
    unreadBorderClass: "border-l-indigo-600 dark:border-l-indigo-400",
    unreadTitleClass: "text-indigo-600 dark:text-indigo-400",
  },
  task_overdue: {
    icon: <TriangleAlert size={18} />,
    iconBgClass: "bg-rose-500/10",
    iconColorClass: "text-rose-600 dark:text-rose-400",
    unreadBorderClass: "border-l-rose-600 dark:border-l-rose-400",
    unreadTitleClass: "text-foreground",
  },
  task_comment: {
    icon: <AtSign size={18} />,
    iconBgClass: "bg-indigo-500/10",
    iconColorClass: "text-indigo-600 dark:text-indigo-400",
    unreadBorderClass: "border-l-indigo-600 dark:border-l-indigo-400",
    unreadTitleClass: "text-indigo-600 dark:text-indigo-400",
  },
  project_member_added: {
    icon: <Info size={18} />,
    iconBgClass: "bg-emerald-500/10",
    iconColorClass: "text-emerald-600 dark:text-emerald-400",
    unreadBorderClass: "border-l-emerald-600 dark:border-l-emerald-400",
    unreadTitleClass: "text-emerald-600 dark:text-emerald-400",
  },
  system: {
    icon: <Info size={18} />,
    iconBgClass: "bg-slate-500/10",
    iconColorClass: "text-slate-600 dark:text-slate-400",
    unreadBorderClass: "border-l-slate-600 dark:border-l-slate-400",
    unreadTitleClass: "text-slate-600 dark:text-slate-400",
  },
};

const TABS: FilterTab[] = ["All", "Unread", "Tasks", "Projects"];

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, markAsRead } =
    useNotifications();
  const [tab, setTab] = useState<FilterTab>("All");

  const visible = notifications.filter((n) => {
    if (tab === "Unread") return !n.read;
    if (tab === "Tasks") return n.type?.startsWith("task_");
    if (tab === "Projects") return n.type === "project_member_added";
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  return (
    <div className="animate-fade-in mx-auto w-full max-w-4xl space-y-8 p-6 text-slate-900 md:p-8 dark:text-slate-100">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <h1 className="text-3xl leading-none font-black tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="animate-pulse rounded-full bg-indigo-600 px-3 py-0.5 text-[10px] font-black tracking-widest text-white uppercase">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="mt-2 text-center text-sm font-medium text-slate-500 sm:text-left dark:text-slate-400">
            Stay updated with your latest activities and mentions.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-xs font-bold transition-all hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:hover:bg-white/5"
        >
          <Check size={14} />
          Mark all as read
        </button>
      </div>

      <div className="border-b border-slate-200 dark:border-white/5">
        <div className="scrollbar-hide flex overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                tab === t
                  ? "text-indigo-600 dark:text-white"
                  : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-indigo-600 dark:bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-4xl border border-dashed border-slate-200 bg-white/30 py-24 text-center dark:border-white/5 dark:bg-white/5">
            <Bell
              size={40}
              className="mb-4 text-slate-200 dark:text-slate-800"
            />
            <p className="font-medium text-slate-400">
              No notifications found.
            </p>
          </div>
        )}

        {visible.map((notif) => {
          const ts = TYPE_STYLES[notif.type] || TYPE_STYLES["system"];
          return (
            <div
              key={notif._id}
              onClick={() => markAsRead(notif._id)}
              className={`group relative flex cursor-pointer gap-5 rounded-4xl border p-6 transition-all duration-300 ${
                !notif.read
                  ? "border-indigo-500/20 bg-white shadow-md dark:bg-white/5"
                  : "border-slate-200 bg-white/50 opacity-70 hover:opacity-100 dark:border-white/5 dark:bg-transparent"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-transform group-hover:scale-110 ${ts.iconBgClass} border-current/10 ${ts.iconColorClass}`}
              >
                {ts.icon}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-sm font-black tracking-tight ${!notif.read ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {notif.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold text-slate-400 me-4 uppercase dark:text-slate-500">
                    <Clock size={12} className="opacity-50" />
                    {formatDate(notif.createdAt)}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                  {notif.body}
                </p>

                {notif.task && (
                  <div className="pt-3">
                    <Link to={`/dashboard/tasks/${notif.task}`} className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-indigo-600 uppercase transition-all hover:opacity-80 dark:text-indigo-400">
                      View details
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                )}
              </div>

              {!notif.read && (
                <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-indigo-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
