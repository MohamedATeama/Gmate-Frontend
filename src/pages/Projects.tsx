import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const projects = [
  { id: 1, title: "Next.js LMS Platform", progress: 75 },
  { id: 2, title: "Mobile App Redesign", progress: 40 },
  { id: 3, title: "Backend API Integration", progress: 90 },
  { id: 4, title: "Dashboard UI Kit", progress: 25 },
  { id: 5, title: "Customer Success Portal", progress: 60 },
  { id: 6, title: "AI Integration Module", progress: 15 },
];

export default function Projects() {
  return (
    <div className="bg-muted-foreground/10 p-4 sm:p-6 md:p-8 lg:p-10 min-h-full">
      <header className="mb-6 flex flex-col gap-4 flex-wrap sm:mb-8 md:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-primary text-lg font-black tracking-tight sm:text-xl md:text-2xl lg:text-4xl">
            Projects
          </h1>
          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            Manage and track your active projects
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group bg-card border-border flex flex-col justify-between rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:rounded-2xl sm:p-4 md:p-5"
          >
            <div className="space-y-4">
              <h2 className="text-card-foreground line-clamp-1 text-sm font-semibold sm:text-base md:text-lg">
                {project.title}
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] sm:text-xs font-medium">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5 sm:h-2" />
              </div>
            </div>
            <div className="mt-4 sm:mt-6">
              <Button variant="outline" size="sm" className="w-full text-[10px] sm:text-xs font-semibold h-8 sm:h-9">
                Details
              </Button>
            </div>
          </article>
        ))}

        {/* Add project card matching the style in Dashboard */}
        <article className="border-muted-foreground/40 bg-muted/40 flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-dashed p-4 text-center sm:min-h-[160px] md:min-h-[180px]">
          <div className="bg-background text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm sm:mb-3 sm:h-12 sm:w-12">
            <span className="text-xl leading-none sm:text-2xl">+</span>
          </div>
          <h2 className="text-foreground text-xs font-semibold sm:text-sm md:text-base">
            Add New Project
          </h2>
          <p className="text-muted-foreground mt-1 text-[11px] sm:text-xs md:text-[13px]">
            Create a new workspace for your team.
          </p>
          <Button
            size="sm"
            className="mt-2 rounded-full px-3 text-[11px] font-medium shadow-sm sm:mt-3 sm:px-4 sm:text-xs"
          >
            + Add Project
          </Button>
        </article>
      </div>
    </div>
  );
}
