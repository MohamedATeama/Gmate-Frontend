import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "in_progress" | "done";

interface Task {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Setup CI/CD pipeline",
    project: "DevOps",
    priority: "high",
    status: "in_progress",
    dueDate: "Feb 24",
  },
  {
    id: "2",
    title: "Design system tokens",
    project: "Frontend",
    priority: "medium",
    status: "done",
    dueDate: "Feb 22",
  },
  {
    id: "3",
    title: "API integration review",
    project: "Backend",
    priority: "high",
    status: "todo",
    dueDate: "Feb 25",
  },
  {
    id: "4",
    title: "User authentication flow",
    project: "Frontend",
    priority: "high",
    status: "in_progress",
    dueDate: "Feb 26",
  },
  {
    id: "5",
    title: "Database schema migration",
    project: "Backend",
    priority: "medium",
    status: "todo",
    dueDate: "Feb 27",
  },
  {
    id: "6",
    title: "Write unit tests",
    project: "QA",
    priority: "low",
    status: "todo",
    dueDate: "Feb 28",
  },
  {
    id: "7",
    title: "Mobile responsive fixes",
    project: "Frontend",
    priority: "medium",
    status: "done",
    dueDate: "Feb 21",
  },
  {
    id: "8",
    title: "Performance optimization",
    project: "DevOps",
    priority: "low",
    status: "in_progress",
    dueDate: "Mar 1",
  },
];

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  high: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    label: "High",
  },
  medium: {
    color: "bg-warning/10 text-warning border-warning/20",
    label: "Medium",
  },
  low: { color: "bg-muted text-muted-foreground border-border", label: "Low" },
};

const statusConfig: Record<Status, { icon: React.ElementType; label: string }> =
  {
    todo: { icon: Circle, label: "To Do" },
    in_progress: { icon: Clock, label: "In Progress" },
    done: { icon: CheckCircle2, label: "Done" },
  };

export default function MyTasksPage() {
  const [filter, setFilter] = useState<Status | "all">("all");
  const filtered =
    filter === "all" ? mockTasks : mockTasks.filter((t) => t.status === filter);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground text-sm">
            {mockTasks.length} tasks assigned to you
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", "todo", "in_progress", "done"] as const).map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "All" : statusConfig[s].label}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.map((task) => {
          const StatusIcon = statusConfig[task.status].icon;
          return (
            <div
              key={task.id}
              className="border-border bg-card hover:border-primary/20 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <StatusIcon
                className={`h-5 w-5 shrink-0 ${task.status === "done" ? "text-success" : task.status === "in_progress" ? "text-primary" : "text-muted-foreground"}`}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${task.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {task.title}
                </p>
                <p className="text-muted-foreground text-xs">{task.project}</p>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${priorityConfig[task.priority].color}`}
              >
                {priorityConfig[task.priority].label}
              </Badge>
              <span className="text-muted-foreground hidden text-xs sm:block">
                {task.dueDate}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
