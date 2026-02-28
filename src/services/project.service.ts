import type { Project } from "../types/project";

// Initial mock data
let projects: Project[] = [
  {
    id: "1",
    name: "Gmate Rebranding",
    description: "Modernizing the brand identity and visual language.",
    status: "active",
    progress: 65,
    members: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Core API Refactor",
    description: "Migrating to a more scalable architecture.",
    status: "planning",
    progress: 20,
    members: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mobile App v2",
    description: "Building the next generation mobile experience.",
    status: "completed",
    progress: 100,
    members: 6,
    createdAt: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectService = {
  async getProjects(): Promise<Project[]> {
    await delay(800);
    return [...projects];
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    await delay(500);
    return projects.find((p) => p.id === id);
  },

  async createProject(data: Omit<Project, "id" | "createdAt" | "progress">): Promise<Project> {
    await delay(1000);
    const newProject: Project = {
      ...data,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    return newProject;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    await delay(1000);
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Project not found");
    
    projects[index] = { ...projects[index], ...data };
    return projects[index];
  },

  async deleteProject(id: string): Promise<void> {
    await delay(1000);
    projects = projects.filter((p) => p.id !== id);
  },
};
