import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import { tasks } from "@/data/tasks";
import Empty from "@/components/Empty";

function MainTaskDashboard() {
  const isEmpty = tasks.length === 0;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <header className="mb-6 flex flex-col flex-wrap gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between md:mb-10">
        <div className="min-w-0 space-y-1">
          <h1 className="text-primary text-lg font-black tracking-tight sm:text-xl md:text-2xl lg:text-4xl">
            Welcome back, Mohamed
          </h1>
          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            {tasks.length} Tasks Total · You have 3 tasks due today
          </p>
        </div>

        <div className="border-border bg-background relative w-full rounded-lg border p-1 shadow-sm backdrop-blur-sm sm:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
            <Search className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>
          <input
            type="search"
            placeholder="Search tasks..."
            className="text-foreground placeholder-ring w-full rounded-lg border-0 bg-transparent py-2 pr-3 pl-10 text-sm outline-none sm:py-2 sm:pr-4 sm:pl-12 sm:text-base"
          />
        </div>
      </header>

      <section className="mt-4 space-y-4 md:mt-6">
        <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm">
            Showing{" "}
            <span className="text-foreground font-semibold">
              {tasks.length}
            </span>{" "}
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

        {isEmpty ? (
          <Empty />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            <article className="border-muted-foreground/40 bg-muted/40 hover:bg-muted/60 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-4 text-center transition-colors sm:min-h-[160px] md:min-h-[180px]">
              <div className="bg-background text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm transition-transform hover:scale-110 sm:mb-3 sm:h-12 sm:w-12">
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
        )}
      </section>
    </div>
  );
}

export default MainTaskDashboard;
