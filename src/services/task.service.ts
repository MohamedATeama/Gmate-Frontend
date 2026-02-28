import { tasks } from "../data/tasks";
import type { Task } from "../data/tasks";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  async getTasks(projectId?: string): Promise<Task[]> {
    await delay(500);
    if (projectId) {
      return tasks.filter((t) => t.projectId === projectId);
    }
    return [...tasks];
  },

  async getTaskById(id: number): Promise<Task | undefined> {
    await delay(300);
    return tasks.find((t) => t.id === id);
  },
};
