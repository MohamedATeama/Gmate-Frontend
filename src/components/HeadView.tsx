import ThemeToggle from "./ThemeToggle";
import { CircleUser, LogOut } from "lucide-react";

export default function HeadView() {
  return (
    <header className="bg-background/90 border-border sticky top-0 z-30 w-full border-b backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 pl-16 lg:px-6 lg:pl-6">
        <div className="flex items-center gap-2">
          <img
            src="/assets/avatar.jpg"
            alt="avatar"
            className="border-border/50 size-10 rounded-full border object-cover"
          />
          <span className="text-foreground text-sm font-semibold sm:text-base">
            Mohamed
          </span>
        </div>
        <ul className="flex items-center gap-3 sm:gap-4">
          <li>
            <CircleUser className="text-muted-foreground hover:text-foreground size-5 cursor-pointer transition-colors sm:size-6" />
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <LogOut className="text-muted-foreground hover:text-foreground size-5 cursor-pointer transition-colors sm:size-6" />
          </li>
        </ul>
      </div>
    </header>
  );
}
