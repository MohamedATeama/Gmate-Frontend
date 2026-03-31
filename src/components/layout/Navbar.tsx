import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useDarkMode } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { isDarkMode } = useDarkMode();
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return (
    <nav className="animate-in fade-in slide-in-from-top-4 fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2 duration-1000">
      <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white/60 px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-indigo-500/30">
            <img
              src={
                isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"
              }
              alt="GMATE Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-900 uppercase transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            GMATE
          </span>
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${isActive ? "text-indigo-600 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${isActive ? "text-indigo-600 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${isActive ? "text-indigo-600 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10" />
          {token ? (
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar?.url || "/assets/avatar.jpg"}
                alt={user?.name}
                className="border-border/50 size-10 rounded-full border object-cover"
              />
              <span className="text-foreground max-w-30 truncate text-sm font-semibold sm:max-w-none sm:text-base">
                {user?.name || "Loading..."}
              </span>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="px-2 text-[10px] font-black tracking-widest text-slate-600 uppercase transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-slate-900 px-5 py-2 text-[10px] font-black tracking-tighter text-white uppercase shadow-lg transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
