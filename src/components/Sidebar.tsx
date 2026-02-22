import { MdAccessTime, MdStarBorder } from "react-icons/md";
import { Button } from "./ui/button";
import { RiGalleryView2 } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { X, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col justify-between border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-inline-background text-muted-foreground hover:text-foreground"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        <div className="border-sidebar-border flex items-center gap-3 border-b p-4 sm:p-6">
          <div className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-primary truncate text-sm font-semibold sm:text-base lg:text-lg">
              Mohamed Teama
            </p>
            <p className="text-inline-primary truncate text-xs font-medium">
              Manage Profile
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 sm:p-6">
          <Link
            to="/dashboard"
            className={`${
              currentPath === "/dashboard"
                ? "bg-secondary text-primary before:bg-primary"
                : "text-muted-foreground hover:bg-secondary/50"
            } relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors sm:px-4 sm:py-3 before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:before:w-2`}
          >
            <RiGalleryView2 className="shrink-0" size={20} />
            <span className="truncate">All Tasks</span>
          </Link>
          <Link
            to="/projects"
            className={`${
              currentPath === "/projects"
                ? "bg-secondary text-primary before:bg-primary"
                : "text-muted-foreground hover:bg-secondary/50"
            } relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors sm:px-4 sm:py-3 before:absolute before:inset-0 before:top-0 before:left-0 before:block before:h-full before:w-1 before:rounded-l-md sm:before:w-2`}
          >
            <Briefcase className="shrink-0" size={20} />
            <span className="truncate">Projects</span>
          </Link>
          <button className="text-muted-foreground hover:bg-secondary/50 relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3">
            <MdStarBorder className="shrink-0" size={20} />
            <span className="truncate">Important</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary/50 relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3">
            <GrStatusGood className="shrink-0" size={20} />
            <span className="truncate">Completed</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary/50 relative inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-colors sm:px-4 sm:py-3">
            <MdAccessTime className="shrink-0" size={20} />
            <span className="truncate">Do It Now</span>
          </button>
        </nav>

        <div className="border-sidebar-border border-t p-4 sm:p-6">
          <Button
            className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
            size="sm"
          >
            <FaPlus className="shrink-0" />
            <span className="truncate">Add New Task</span>
          </Button>
        </div>
      </aside>
    </>
  );
}

