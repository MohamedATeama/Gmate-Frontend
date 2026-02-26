import { z } from "zod";

export const TaskStatusSchema = z.enum([
  "todo",
  "inProgress",
  "review",
  "completed",
]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: TaskStatusSchema,
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assignee: z.object({
    name: z.string(),
    avatar: z.string().optional(),
  }),
  dueDate: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(["active", "on-hold", "completed"]),
  progress: z.number().min(0).max(100),
  members: z.number(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  department: z.string(),
  capacity: z.number(),
  projects: z.number(),
  status: z.string(),
  avatar: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
