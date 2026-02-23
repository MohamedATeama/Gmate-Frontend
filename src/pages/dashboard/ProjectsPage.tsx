import { Plus, FolderKanban, Users, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    id: "1",
    name: "Mobile App Redesign",
    desc: "Redesigning the mobile experience",
    tasks: 24,
    completed: 18,
    members: 4,
    status: "active",
  },
  {
    id: "2",
    name: "Backend API v2",
    desc: "New REST API architecture",
    tasks: 32,
    completed: 12,
    members: 3,
    status: "active",
  },
  {
    id: "3",
    name: "DevOps Pipeline",
    desc: "CI/CD and infrastructure setup",
    tasks: 15,
    completed: 10,
    members: 2,
    status: "active",
  },
  {
    id: "4",
    name: "Design System",
    desc: "Component library and tokens",
    tasks: 20,
    completed: 20,
    members: 3,
    status: "completed",
  },
  {
    id: "5",
    name: "User Research",
    desc: "Interviews and surveys",
    tasks: 8,
    completed: 5,
    members: 2,
    status: "active",
  },
  {
    id: "6",
    name: "Marketing Site",
    desc: "Landing pages and SEO",
    tasks: 12,
    completed: 3,
    members: 2,
    status: "active",
  },
];

export default function ProjectsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground text-sm">
            {projects.length} projects
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const progress = Math.round(
            (project.completed / project.tasks) * 100,
          );
          return (
            <div
              key={project.id}
              className="border-border bg-card hover:border-primary/20 shadow-card cursor-pointer rounded-xl border p-5 transition-colors"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                  <FolderKanban className="text-primary h-4 w-4" />
                </div>
                <Badge
                  variant="outline"
                  className={
                    project.status === "completed"
                      ? "text-success border-success/20 bg-success/10"
                      : "text-primary border-primary/20 bg-primary/10"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <h3 className="text-foreground mb-1 font-semibold">
                {project.name}
              </h3>
              <p className="text-muted-foreground mb-4 text-xs">
                {project.desc}
              </p>

              <Progress value={progress} className="mb-3 h-1.5" />

              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <CheckSquare className="h-3 w-3" />
                  {project.completed}/{project.tasks}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.members}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
