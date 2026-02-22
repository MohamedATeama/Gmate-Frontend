🚀 Gmate | The Next-Gen Productivity Platform
Gmate is a high-performance project management and productivity tool—engineered for teams who need the power of Jira with the speed of a modern tech stack.

Built with React, TypeScript, and Vite, Gmate focuses on streamlined workflows, task visualization, and seamless team collaboration.

🛠️ Tech Stack
Core: React 18 + Vite (Lightning-fast HMR)

Type Safety: TypeScript

Styling: Tailwind CSS

Design System: Shadcn/ui (Radix UI primitives)

Icons: Lucide React & React Icons

Routing: React Router Dom v6

State Management: Zustand

✨ Key Features
Interactive Dashboard: Real-time overview of task statuses (To Do, In Progress, Completed).

Project Hub: Comprehensive grid view for managing multiple projects with progress tracking.

Task Management: Granular task control with priority badges and deadline tracking.

Modern Layout: Responsive Sidebar and Navigation built for professional productivity.

Theme Support: Optimized for readability and focus.

📂 Architecture
Bash
src/
├── components/      # Reusable Logic (Sidebar, Layout, Task Cards)
│   └── ui/          # Atomic Shadcn components (Buttons, Progress, etc.)
├── pages/           # High-level views (Dashboard, Projects)
├── lib/             # Utilities (Tailwind merge, formatting)
├── App.tsx          # Central Routing System
└── main.tsx         # Entry point
⚙️ Development Setup
Prerequisites
Node.js (v18+)

npm

Quick Start
Clone with SSH:

Bash
git clone git@github.com:algoharyx-org/Gmate-Frontend.git
cd Gmate-Frontend
Install Dependencies:

Bash
npm install
Launch Local Dev Server:

Bash
npm run dev
🔧 Maintenance & Fixes (Team Log)
As part of our commitment to code quality, the following improvements were implemented:

Linux Compatibility: Standardized all imports to PascalCase for case-sensitive file systems (Arch Linux/Production).

Router Integration: Migrated to react-router-dom for true single-page application navigation.

Build Stability: Resolved TypeScript export conflicts and optimized the build pipeline.

Dependency Sync: Integrated missing react-icons and shadcn components into the primary build.

🤝 Contribution
Check out a new branch: git checkout -b feature/amazing-feature

Commit your logic: git commit -m "feat: add Jira-style kanban board"

Push: git push origin feature/amazing-feature

Open a Pull Request.

👤 Maintainer
**Gmate Team** (algoharyx)
