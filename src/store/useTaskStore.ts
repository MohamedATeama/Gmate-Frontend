import { create } from "zustand";
import { tasks as initialTasks } from "@/data/tasks";

// Convert initial tasks to string IDs for consistency
const normalizedTasks = initialTasks.map(t => ({...t, id: String(t.id)}));

interface TaskState {
  tasks: any[]; // Using any temporarily to avoid deep type conflicts during unification
  addTask: (task: any) => void;
  updateTask: (id: string, updates: any) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: any[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: normalizedTasks,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => {
      const nextId = `t${Date.now()}`;
      return { tasks: [...state.tasks, { ...task, id: nextId }] };
    }),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        String(task.id) === String(id) ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => String(task.id) !== String(id)),
    })),
}));
