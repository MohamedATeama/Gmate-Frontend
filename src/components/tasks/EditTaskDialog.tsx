import * as Dialog from "@radix-ui/react-dialog";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Task } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateTask } from "@/hooks/useUpdateTask";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["to-do", "in-progress", "review", "completed", "important", "upcoming", "overdue"] as const),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type Props = {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditTaskDialog({ task, open, onOpenChange }: Props) {
  const { updateTask, isPending: isUpdating } = useUpdateTask();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    values: {
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority || "medium",
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    const payload = { ...data };
    if (!payload.dueDate) delete (payload as any).dueDate;

    updateTask({ id: task._id!, data: payload }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 animate-in fade-in fixed inset-0 z-50 backdrop-blur-sm duration-200" />
        <Dialog.Content className="bg-card border-border animate-in zoom-in-95 fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-4xl border p-8 shadow-2xl duration-200">
          <div className="mb-8 flex items-center justify-between">
            <Dialog.Title className="text-xl font-black tracking-tight">
              Edit Task
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl p-2 transition-all">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
              >
                Title
              </Label>
              <Input
                {...register("title")}
                className="bg-muted/30 h-12 rounded-xl border-none font-bold"
              />
              {errors.title && (
                <p className="text-[10px] font-bold text-rose-500 uppercase">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="desc"
                className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
              >
                Description
              </Label>
              <Textarea
                {...register("description")}
                className="bg-muted/30 min-h-[120px] resize-none rounded-xl border-none font-medium"
              />
              {errors.description && (
                <p className="text-[10px] font-bold text-rose-500 uppercase">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
                >
                  Status
                </Label>
                <select
                  {...register("status")}
                  className="bg-muted/30 focus:ring-primary/20 flex h-12 w-full cursor-pointer appearance-none rounded-xl border-none px-4 py-2 text-sm font-bold transition-all outline-none focus:ring-2"
                >
                  <option
                    value="to-do"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    To Do
                  </option>
                  <option
                    value="in-progress"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    In Progress
                  </option>
                  <option
                    value="completed"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    Completed
                  </option>
                  <option
                    value="important"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    Important
                  </option>
                  <option
                    value="upcoming"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    Upcoming
                  </option>
                  <option
                    value="review"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    Review
                  </option>
                  <option
                    value="overdue"
                    className="focus:bg-primary focus:text-primary-foreground text-foreground bg-muted/90"
                  >
                    Overdue
                  </option>
                </select>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="priority"
                    className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
                  >
                    Priority
                  </Label>
                  <Select
                    value={watch("priority")}
                    onValueChange={(val: any) => setValue("priority", val)}
                  >
                    <SelectTrigger
                      id="priority"
                      className="bg-muted/30 focus:ring-primary/20 flex h-20 w-full cursor-pointer appearance-none rounded-xl border-none px-4 py-6 text-sm font-bold transition-all outline-none focus:ring-2"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="dueDate"
                  className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
                >
                  Due Date
                </Label>
                <Input
                  type="date"
                  {...register("dueDate")}
                  className="bg-muted/30 h-12 rounded-xl border-none font-bold tracking-widest uppercase"
                />
              </div>
            </div>

            <div className="border-border/50 flex items-center justify-end border-t pt-8 gap-3">
                <Dialog.Close asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-12 rounded-xl text-[10px] font-black tracking-widest uppercase"
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="h-12 rounded-xl bg-slate-900 px-8 text-[10px] font-black tracking-widest text-white uppercase shadow-xl transition-all active:scale-[0.98] dark:bg-white dark:text-slate-900"
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
