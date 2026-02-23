# 🚀 Gmate | The Next-Gen Productivity Platform

**Gmate** is a high-performance project management and productivity tool—engineered for teams who need the power of **Jira** with the speed of a modern tech stack.

Built with **React**, **TypeScript**, and **Vite**, Gmate focuses on streamlined workflows, task visualization, and seamless team collaboration.

---

## 🛠️ Tech Stack

- **Core:** [React 19](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Lightning-fast HMR)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Design System:** [Shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router Dom v6](https://reactrouter.com/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/)

---

## ✨ Key Features

- **Interactive Dashboard:** Real-time overview of task statuses (To Do, In Progress, Completed).
- **Project Hub:** Comprehensive grid view for managing multiple projects with progress tracking.
- **Task Management:** Granular task control with priority badges and deadline tracking.
- **Modern Layout:** Responsive Sidebar and Navigation built for professional productivity.
- **Theme Support:** Optimized for readability and focus.

---

## 📂 Architecture

```bash
src/
├── components/      # Reusable Logic (Sidebar, Layout, Task Cards)
│   └── ui/          # Atomic Shadcn components (Buttons, Progress, etc.)
├── pages/           # High-level views (Dashboard, Projects)
├── lib/             # Utilities (Tailwind merge, formatting)
├── App.tsx          # Central Routing System
└── main.tsx         # Entry point
```
