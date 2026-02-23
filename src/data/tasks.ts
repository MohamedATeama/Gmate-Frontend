export type TaskStatus = "important" | "inProgress" | "upcoming" | "completed";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  tag: string;
  date: string;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Project Research",
    description: "Collect requirements and define clear milestones for the sprint.",
    status: "important",
    tag: "URGENT",
    date: "Mon, Oct 11, 2025",
  },
  {
    id: 2,
    title: "Design System Update",
    description: "Review dashboard cards and refine responsive behavior.",
    status: "inProgress",
    tag: "IN PROGRESS",
    date: "Tue, Oct 12, 2025",
  },
  {
    id: 3,
    title: "Client Meeting",
    description: "Walk through the latest GMATE LMS prototype with stakeholders.",
    status: "upcoming",
    tag: "MEETING",
    date: "Wed, Oct 13, 2025",
  },
  {
    id: 4,
    title: "Weekly Sync",
    description: "Align on course roadmap, blockers and next actions.",
    status: "upcoming",
    tag: "TEAM",
    date: "Thu, Oct 14, 2025",
  },
  {
    id: 5,
    title: "Fix Bug #104",
    description: "Resolve layout issues on the student dashboard grid view.",
    status: "important",
    tag: "BUG",
    date: "Fri, Oct 15, 2025",
  },
  {
    id: 6,
    title: "API Integration",
    description: "Connect progress tracking endpoints with the frontend.",
    status: "completed",
    tag: "BACKEND",
    date: "Sat, Oct 16, 2025",
  },
];

