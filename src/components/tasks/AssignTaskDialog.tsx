import * as Dialog from "@radix-ui/react-dialog";
import { X, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssignTask } from "@/hooks/useAssignTask";
import { useProject } from "@/hooks/useProject";
import { useParams } from "react-router-dom";
import type { Task } from "@/types/project";

const assignSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  taskId: z.union([z.string(), z.number()]).optional(),
});

type AssignFormValues = z.infer<typeof assignSchema>;

export default function AssignTaskDialog({
  open,
  onOpenChange,
  taskId,
  projectId,
  tasks,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId?: string | number;
  projectId?: string;
  tasks?: Task[];
}) {
  const { projectId: paramProjectId } = useParams<{ projectId: string }>();
  const activeProjectId = projectId || paramProjectId;
  const { project, isLoading: isProjectLoading } = useProject(activeProjectId);
  const assignMutation = useAssignTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AssignFormValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      taskId: taskId,
    },
  });

  const selectedTaskId = watch("taskId");

  const onSubmit = (data: AssignFormValues) => {
    const finalTaskId = taskId || data.taskId;
    if (!finalTaskId) return;

    assignMutation.mutate(
      { taskId: finalTaskId, email: data.email },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      },
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="border-border bg-card animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-8 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-1">
              <Dialog.Title className="text-xl font-black tracking-tight">
                Assign Task
              </Dialog.Title>
              <Dialog.Description className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
                Delegate to a project member
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                disabled={assignMutation.isPending}
                className="text-muted-foreground hover:bg-muted rounded-full p-2 transition-colors"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!taskId && tasks && (
              <div className="space-y-2">
                <Label
                  htmlFor="taskId"
                  className="text-[10px] font-black tracking-widest uppercase opacity-50"
                >
                  Select Task
                </Label>
                <select
                  id="taskId"
                  {...register("taskId")}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={assignMutation.isPending}
                >
                  <option value="">-- Select a Task --</option>
                  {tasks.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.title}
                    </option>
                  ))}
                </select>
                {!selectedTaskId && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase">
                    Please select a task
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[10px] font-black tracking-widest uppercase opacity-50"
              >
                Assignee
              </Label>
              {project ? (
                <select
                  id="email"
                  {...register("email")}
                  className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? "border-rose-500" : ""}`}
                  disabled={assignMutation.isPending || isProjectLoading}
                >
                  <option value="">-- Select Team Member --</option>
                  {project.owner && (
                    <option value={project.owner.email}>
                      {project.owner.name} (Owner)
                    </option>
                  )}
                  {project.members?.map(
                    (member) =>
                      member?.user?.email && (
                        <option key={member.user._id} value={member.user.email}>
                          {member.user.name} ({member.user.email})
                        </option>
                      ),
                  )}
                </select>
              ) : (
                <Input
                  id="email"
                  placeholder="colleague@company.com"
                  {...register("email")}
                  className={errors.email ? "border-rose-500" : ""}
                  disabled={assignMutation.isPending}
                />
              )}
              {errors.email && (
                <p className="text-[10px] font-bold text-rose-500 uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={
                assignMutation.isPending || (!taskId && !selectedTaskId)
              }
              className="bg-primary hover:bg-primary/90 h-11 w-full gap-2 rounded-2xl font-bold"
            >
              {assignMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Assign User
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
