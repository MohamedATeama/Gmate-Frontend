import type { Project, Task, TaskStatus, TeamMember } from "@/types/project";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Mobile App Redesign",
    description: "Redesigning the mobile experience with a focus on usability.",
    status: "active",
    progress: 75,
    members: 5,
  },
  {
    id: "2",
    name: "Backend API v2",
    description: "New REST API architecture for improved performance.",
    status: "active",
    progress: 37,
    members: 3,
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    projectId: "1",
    title: "Project Research",
    description: "Collect requirements and define clear milestones for the sprint.",
    status: "inProgress",
    priority: "urgent",
    assignee: { name: "Mohamed Algoahry", avatar: "/assets/team/mohamed_algoahry.jpg" },
    dueDate: "2026-03-01",
  },
  {
    id: "t2",
    projectId: "1",
    title: "Design System Update",
    description: "Review dashboard cards and refine responsive behavior.",
    status: "todo",
    priority: "high",
    assignee: { name: "Mohamed Teama", avatar: "/assets/team/mohamed_teama.jpg" },
    dueDate: "2026-03-05",
  },
  {
    id: "t3",
    projectId: "1",
    title: "Client Meeting",
    description: "Walk through the latest prototype with stakeholders.",
    status: "review",
    priority: "medium",
    assignee: { name: "Eslam Mohamed", avatar: "/assets/team/eslam_mohamed.jpg" },
    dueDate: "2026-03-10",
  },
];

const MOCK_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Mohamed Algoahry",
    email: "algoahry@gmate.app",
    role: "Project Leader",
    department: "Management",
    capacity: 95,
    projects: 5,
    status: "Active Now",
    avatar: "/assets/team/mohamed_algoahry.jpg",
  },
  {
    id: "2",
    name: "Mohamed Teama",
    email: "teama@gmate.app",
    role: "Full Stack Developer",
    department: "Development",
    capacity: 88,
    projects: 4,
    status: "Coding...",
    avatar: "/assets/team/mohamed_teama.jpg",
  },
  {
    id: "3",
    name: "Eslam Mohamed",
    email: "eslam@gmate.app",
    role: "UI/UX Engineer",
    department: "Design",
    capacity: 72,
    projects: 3,
    status: "In Design Sync",
    avatar: "/assets/team/eslam_mohamed.jpg",
  },
  {
    id: "4",
    name: "Mohamed Ibrahem",
    email: "ibrahem@gmate.app",
    role: "Backend Engineer",
    department: "Development",
    capacity: 65,
    projects: 2,
    status: "Away",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
  },
  {
    id: "5",
    name: "Ammar Yasser",
    email: "ammar@gmate.app",
    role: "QA Automation",
    department: "Operations",
    capacity: 80,
    projects: 4,
    status: "Testing...",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  },
];

export const api = {
  getProjects: async (): Promise<Project[]> => {
    await delay(800);
    return [...MOCK_PROJECTS];
  },
  getProject: async (id: string): Promise<Project | undefined> => {
    await delay(800);
    return MOCK_PROJECTS.find((p) => p.id === id);
  },
  createProject: async (data: Omit<Project, "id" | "progress" | "members">): Promise<Project> => {
    await delay(1000);
    const newProject: Project = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      members: 1,
    };
    MOCK_PROJECTS.push(newProject);
    return newProject;
  },
  deleteProject: async (id: string): Promise<void> => {
    await delay(800);
    const index = MOCK_PROJECTS.findIndex((p) => p.id === id);
    if (index !== -1) {
      MOCK_PROJECTS.splice(index, 1);
    }
  },
  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    await delay(1200); 
    return MOCK_TASKS.filter((t) => t.projectId === projectId);
  },
  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<void> => {
    await delay(500);
    const task = MOCK_TASKS.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
    }
  },
  createTask: async (data: Omit<Task, "id">): Promise<Task> => {
    await delay(800);
    const newTask: Task = { ...data, id: `t${Date.now()}` };
    MOCK_TASKS.push(newTask);
    return newTask;
  },
  deleteTask: async (id: string): Promise<void> => {
    await delay(600);
    const index = MOCK_TASKS.findIndex((t) => t.id === id);
    if (index !== -1) {
      MOCK_TASKS.splice(index, 1);
    }
  },
  getTeam: async (): Promise<TeamMember[]> => {
    await delay(800);
    return [...MOCK_TEAM];
  },
  removeMember: async (id: string): Promise<void> => {
    await delay(800);
    const index = MOCK_TEAM.findIndex((m) => m.id === id);
    if (index !== -1) {
      MOCK_TEAM.splice(index, 1);
    }
  },
};
