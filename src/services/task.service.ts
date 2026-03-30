import api from "@/api/axios";
import type { Task } from "../types/project";

export interface GetTasksParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  project?: string;
}

export interface TasksResponse {
  tasks: Task[];
  length: number;
  totalPages: number;
  currentPage: number;
}

export const taskService = {
  async getTasks(params?: GetTasksParams): Promise<TasksResponse> {
    const res = await api.get("/tasks/me", { params });
    const data = res.data.data;
    if (Array.isArray(data)) {
       return { tasks: data, length: data.length, totalPages: 1, currentPage: 1 };
    }
    return {
      tasks: data.tasks || [],
      length: data.length || 0,
      totalPages: data.metadata?.totalPages || 1,
      currentPage: data.metadata?.currentPage || 1,
    };
  },

  async getTaskById(id: number | string): Promise<Task> {
    const res = await api.get(`/tasks/${id}`);
    return res.data.data;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    const res = await api.post("/tasks", data);
    return res.data;
  },

  async updateTask(id: number | string, data: Partial<Task>): Promise<Task> {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  async assignTask(taskId: string | number, email: string): Promise<Task> {
    const res = await api.patch(`/tasks/${taskId}/assign`, { email });
    return res.data.data || res.data;
  },

  async uploadAttachments(taskId: string | number, formData: FormData): Promise<Task> {
    const res = await api.post(`/tasks/${taskId}/attachments`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  async deleteAttachment(taskId: string | number, attachmentId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}/attachments/${attachmentId}`);
  },

  async addComment(taskId: string | number, text: string): Promise<Task> {
    const res = await api.post(`/comments`, { content: text, taskId });
    return res.data.data || res.data;
  },

  async updateComment(commentId: string, text: string): Promise<Task> {
    const res = await api.put(`/comments/${commentId}`, { content: text });
    return res.data.data || res.data;
  },

  async deleteComment(commentId: string): Promise<void> {
    await api.delete(`/comments/${commentId}`);
  },

  async deleteTask(id: number | string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
