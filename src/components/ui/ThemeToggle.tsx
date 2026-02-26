import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="inline-flex items-center justify-center rounded-md w-9 h-9 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <Sun size={16} className="text-foreground transition-all" />
      ) : (
        <Moon size={16} className="text-foreground transition-all" />
      )}
    </button>
  );
}
