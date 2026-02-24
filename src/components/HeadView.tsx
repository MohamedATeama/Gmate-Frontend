import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { BellRing, LogOut } from "lucide-react";

export default function HeadView() {
  return (
    <header className="bg-background/90 border-border sticky top-0 z-30 w-full border-b backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 pl-16 lg:px-6 lg:pl-6">
        <Link to="/dashboard/profile" className="flex items-center gap-2">
          <img
            src="/assets/avatar.jpg"
            alt="avatar"
            className="border-border/50 size-10 rounded-full border object-cover"
          />
          <span className="text-foreground text-sm font-semibold sm:text-base">
            Mohamed
          </span>
        </Link>
        <ul className="flex items-center gap-3 sm:gap-4">
          <li>
            <button className="hover:bg-accent w-fit rounded-md p-2 transition-colors">
              <Link
                to="/dashboard/notification"
                // className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <BellRing className="h-5 w-5" />
              </Link>
            </button>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <button className="hover:bg-accent w-fit rounded-md p-2 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
