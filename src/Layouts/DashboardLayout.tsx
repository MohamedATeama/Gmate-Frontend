import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import HeadView from "@/components/layout/HeadView";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-slate-950">
      {/* Premium Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-65 bg-slate-950/40 backdrop-blur-xl duration-500"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="bg-mesh relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`group cubic-bezier(0.16, 1, 0.3, 1) fixed bottom-8 left-8 z-100 transition-all duration-300 will-change-transform ${sidebarOpen ? "translate-x-72" : "translate-x-0"}`}
          aria-label="Toggle Navigation"
        >
          <div className="relative">
            {/* Dynamic Glow */}
            <div
              className={`absolute -inset-4 rounded-full opacity-40 blur-2xl transition-all duration-700 ${sidebarOpen ? "bg-rose-500/20" : "bg-indigo-500/20"}`}
            />

            {/* Main Glass Pill */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 active:scale-95 dark:border-white/10 dark:bg-slate-900/40">
              {sidebarOpen ? (
                <X
                  size={24}
                  className="animate-in spin-in-90 text-white duration-300 dark:text-slate-100"
                />
              ) : (
                <Menu
                  size={24}
                  className="animate-in zoom-in text-slate-900 duration-300 dark:text-slate-100"
                />
              )}

              {/* Status Dot */}
              <div
                className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-[3px] border-slate-950 shadow-sm transition-colors duration-500 ${sidebarOpen ? "bg-rose-500" : "animate-bounce bg-indigo-500"}`}
              />
            </div>
          </div>
        </button>

        <HeadView />

        <div className="custom-scrollbar w-full flex-1 overflow-x-hidden overflow-y-auto px-4 py-8 md:px-8">
          <div className="mx-auto h-full max-w-7xl">
            <Outlet />
          </div>
        </div>

        {/* Global AI Assistant Button */}
        {/* <AIAssistant /> */}
      </main>
    </div>
  );
}
