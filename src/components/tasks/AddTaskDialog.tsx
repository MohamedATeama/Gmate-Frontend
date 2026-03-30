import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/useCreateTask";
import type { TaskStatus } from "@/types/project";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  projectId?: string;
  onClose: () => void;
};

export default function AddTaskDialog({ projectId, onClose }: Props) {
  const { createTask, isPending: isSubmitting } = useCreateTask();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "to-do" as TaskStatus,
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    const payload = { ...form, project: projectId };
    if (!payload.dueDate) delete (payload as any).dueDate;

    createTask(
      payload,
      {
        onSuccess: () => onClose(),
      }
    );
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-card border border-border rounded-lg p-6 shadow-lg animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">New Task</h2>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-medium">Title</Label>
            <Input id="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="What needs to be done?" className="bg-background" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc" className="text-xs font-medium">Description</Label>
            <Textarea id="desc" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Add details..." className="min-h-[100px] bg-background resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="priority" className="text-xs font-medium">Priority</Label>
              <Select value={form.priority} onValueChange={(val: any) => setForm({...form, priority: val})}>
                <SelectTrigger id="priority" className="bg-background">
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
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-medium">Due Date</Label>
              <Input id="date" type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className="bg-background" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="h-9 rounded-md">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="h-9 px-4 rounded-md">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
