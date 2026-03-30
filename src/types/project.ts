import { z } from "zod";

export const TaskStatusSchema = z.enum([
  "to-do",
  "in-progress",
  "review",
  "completed",
  "important",
  "upcoming",
  "overdue",
]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  _id: z.string(),
  project: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: TaskStatusSchema,
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assignee: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.object({ url: z.string().optional() }).optional(),
  }).optional(),
  createdBy: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
  }),
  attachments: z.array(z.any()).optional(),
  comments: z.array(z.any()).optional(),
  dueDate: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["active", "on-hold", "completed", "planning"]),
  progressPercentage: z.number().min(0).max(100),
  members: z
    .array(
      z.object({
        user: z.object({
          _id: z.string(),
          name: z.string(),
          email: z.string(),
          avatar: z.object({
            url: z.string().optional(),
          }).optional(),
        }),
        role: z.enum(["manager", "developer", "viewer"]).optional(),
      }).optional(),
    )
    .min(0),
  owner: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.object({
      url: z.string().optional(),
    }).optional(),
  }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectFormSchema = ProjectSchema.omit({
  _id: true,
  progressPercentage: true,
  createdAt: true,
  owner: true,
  members: true,
});

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;
