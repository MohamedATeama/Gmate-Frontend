import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/context/TasksContext";
import type { TaskStatus } from "@/data/tasks";
import { Label } from "@/components/ui/label";

type Props = {
  onClose: () => void;
};

export default function AddTaskDialog({ onClose }: Props) {
  const { addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "upcoming" as TaskStatus,
    tag: "GENERAL",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    addTask({ ...form, date: form.date || new Date().toLocaleDateString() });
    setIsSubmitting(false);
    onClose();
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
              <Label htmlFor="tag" className="text-xs font-medium">Tag</Label>
              <Input id="tag" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-medium">Due Date</Label>
              <Input id="date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="bg-background" />
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
