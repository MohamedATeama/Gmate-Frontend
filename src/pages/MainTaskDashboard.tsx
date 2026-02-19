import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import TaskCard from "@/components/taskCard";

type TaskStatus = "important" | "inProgress" | "upcoming" | "completed";

type TaskCard = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  tag: string;
  date: string;
};

const tasks: TaskCard[] = [
  {
    id: 1,
    title: "Project Research",
    description:
      "Collect requirements and define clear milestones for the sprint.",
    status: "important",
    tag: "URGENT",
    date: "Mon, Oct 11, 2025",
  },
  {
    id: 2,
    title: "Design System Update",
    description: "Review dashboard cards and refine responsive behavior.",
    status: "inProgress",
    tag: "IN PROGRESS",
    date: "Tue, Oct 12, 2025",
  },
  {
    id: 3,
    title: "Client Meeting",
    description:
      "Walk through the latest GMATE LMS prototype with stakeholders.",
    status: "upcoming",
    tag: "MEETING",
    date: "Wed, Oct 13, 2025",
  },
  {
    id: 4,
    title: "Weekly Sync",
    description: "Align on course roadmap, blockers and next actions.",
    status: "upcoming",
    tag: "TEAM",
    date: "Thu, Oct 14, 2025",
  },
  {
    id: 5,
    title: "Fix Bug #104",
    description: "Resolve layout issues on the student dashboard grid view.",
    status: "important",
    tag: "BUG",
    date: "Fri, Oct 15, 2025",
  },
  {
    id: 6,
    title: "API Integration",
    description: "Connect progress tracking endpoints with the frontend.",
    status: "completed",
    tag: "BACKEND",
    date: "Sat, Oct 16, 2025",
  },
];

function MainTaskDashboard() {
  return (
    <div className="bg-muted-foreground/10 p-4 sm:p-6 md:p-8 lg:p-10">
      <header className="mb-6 flex flex-col gap-4 flex-wrap sm:mb-8 md:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-primary text-lg font-black tracking-tight sm:text-xl md:text-2xl lg:text-4xl">
            Welcome back, Mohamed
          </h1>
          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            12 Tasks Total · You have 3 tasks due today
          </p>
        </div>

        <div className="relative w-full rounded-lg border border-border bg-background p-1 shadow-sm backdrop-blur-sm sm:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
            <CiSearch className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>
          <input
            type="search"
            placeholder="Search tasks..."
            className="w-full rounded-lg border-0 bg-transparent py-2 pr-3 pl-10 text-sm text-foreground placeholder-ring outline-none sm:py-2 sm:pr-4 sm:pl-12 sm:text-base"
          />
        </div>
      </header>

      {/* Task grid */}
      <section className="mt-4 space-y-4 md:mt-6">
        <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm">
            Showing <span className="text-foreground font-semibold">6</span>{" "}
            tasks for this week.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-[11px]">
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 sm:text-[11px]">
              <span className="mr-1 h-1 w-1 rounded-full bg-red-500 sm:mr-1.5 sm:h-1.5 sm:w-1.5" />
              Important
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 sm:text-[11px]">
              <span className="mr-1 h-1 w-1 rounded-full bg-amber-500 sm:mr-1.5 sm:h-1.5 sm:w-1.5" />
              In Progress
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:text-[11px]">
              <span className="mr-1 h-1 w-1 rounded-full bg-emerald-500 sm:mr-1.5 sm:h-1.5 sm:w-1.5" />
              Completed
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          {/* Add task card */}
          <article className="border-muted-foreground/40 bg-muted/40 flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-dashed p-4 text-center sm:min-h-[160px] md:min-h-[180px]">
            <div className="bg-background text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm sm:mb-3 sm:h-12 sm:w-12">
              <span className="text-xl leading-none sm:text-2xl">+</span>
            </div>
            <h2 className="text-foreground text-xs font-semibold sm:text-sm md:text-base">
              Add New Task
            </h2>
            <p className="text-muted-foreground mt-1 text-[11px] sm:text-xs md:text-[13px]">
              Quickly create a new task and place it into your schedule.
            </p>
            <Button
              size="sm"
              className="mt-2 rounded-full px-3 text-[11px] font-medium shadow-sm sm:mt-3 sm:px-4 sm:text-xs"
            >
              + Add Task
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
}

export default MainTaskDashboard;
