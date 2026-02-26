import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2, Loader2, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services/api.mock";
import type { Task, TaskStatus } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["todo", "inProgress", "review", "completed", "important", "upcoming"] as const),
  tag: z.string().min(1, "Tag is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type Props = {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditTaskDialog({ task, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status as any,
      tag: task.tag,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TaskFormValues) => api.updateTaskStatus(task.id, data.status as TaskStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated");
      onOpenChange(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
      onOpenChange(false);
      if (window.location.pathname.includes(`/tasks/${task.id}`)) {
        navigate("/dashboard/my-tasks");
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 backdrop-blur-sm fixed inset-0 z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-card border border-border p-6 shadow-lg rounded-lg animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold">Edit Task</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-medium">Title</Label>
              <Input {...register("title")} className="bg-background" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs font-medium">Description</Label>
              <Textarea {...register("description")} className="min-h-[100px] bg-background resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs font-medium">Status</Label>
                <select {...register("status")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="important">Important</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tag" className="text-xs font-medium">Tag</Label>
                <Input {...register("tag")} className="bg-background" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  if(confirm("Permanently delete this task?")) deleteMutation.mutate();
                }} 
                className="text-destructive hover:bg-destructive/10 h-9 rounded-md"
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Dialog.Close asChild>
                  <Button type="button" variant="outline" className="h-9 rounded-md">Cancel</Button>
                </Dialog.Close>
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending} 
                  className="h-10 px-6 bg-primary hover:bg-indigo-500 rounded-lg font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                >
                  {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
