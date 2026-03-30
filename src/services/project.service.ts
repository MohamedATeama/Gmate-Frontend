import api from "@/api/axios";
import type { Project } from "../types/project";

export interface GetProjectsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ProjectsResponse {
  projects: Project[];
  length: number;
  totalPages: number;
  currentPage: number;
}

export const projectService = {
  async getProjects(params?: GetProjectsParams): Promise<ProjectsResponse> {
    const res = await api.get("/projects/me", { params });
    return {
      projects: res.data.data.projects || [],
      length: res.data.data.length || 0,
      totalPages: res.data.data.metadata.totalPages || 1,
      currentPage: res.data.data.metadata.currentPage || 1,
    };
  },

  async getProjectById(id: string): Promise<Project> {
    const res = await api.get(`/projects/${id}`);
    return res.data.data;
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    const res = await api.post("/projects", data);
    return res.data;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  },

  async addMember(projectId: string, email: string, role?: string): Promise<Project> {
    const res = await api.post(`/projects/${projectId}/members`, { email, role });
    return res.data.data || res.data;
  },

  async removeMember(projectId: string, memberId: string): Promise<void> {
    await api.delete(`/projects/${projectId}/members/${memberId}`);
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
