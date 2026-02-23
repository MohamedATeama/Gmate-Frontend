import {
  CheckSquare,
  FolderKanban,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";

const kpis = [
  {
    label: "Total Projects",
    value: "12",
    icon: FolderKanban,
    change: "+2 this week",
  },
  { label: "Total Tasks", value: "84", icon: CheckSquare, change: "+8 today" },
  { label: "Overdue", value: "5", icon: AlertTriangle, change: "3 critical" },
  { label: "Completed", value: "62", icon: TrendingUp, change: "74% rate" },
];

const recentActivity = [
  {
    action: "Created task",
    detail: "Setup CI/CD pipeline",
    time: "2 min ago",
    color: "bg-primary",
  },
  {
    action: "Completed task",
    detail: "Design system tokens",
    time: "15 min ago",
    color: "bg-success",
  },
  {
    action: "Commented on",
    detail: "API integration review",
    time: "1 hour ago",
    color: "bg-warning",
  },
  {
    action: "Assigned to you",
    detail: "User authentication flow",
    time: "3 hours ago",
    color: "bg-primary",
  },
  {
    action: "Project updated",
    detail: "Mobile app redesign",
    time: "5 hours ago",
    color: "bg-muted-foreground",
  },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here's your overview.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="border-border bg-card shadow-card rounded-xl border p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{kpi.label}</span>
              <kpi.icon className="text-muted-foreground h-4 w-4" />
            </div>
            <div className="text-foreground text-3xl font-bold">
              {kpi.value}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="border-border bg-card shadow-card rounded-xl border p-6">
        <div className="mb-5 flex items-center gap-2">
          <Clock className="text-muted-foreground h-4 w-4" />
          <h2 className="text-foreground font-semibold">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`mt-2 h-2 w-2 rounded-full ${item.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm">
                  <span className="font-medium">{item.action}</span>{" "}
                  <span className="text-muted-foreground">{item.detail}</span>
                </p>
                <p className="text-muted-foreground text-xs">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
