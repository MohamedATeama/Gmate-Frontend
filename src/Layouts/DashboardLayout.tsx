import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import HeadView from "@/components/layout/HeadView";
import AIAssistant from "@/components/ui/AIAssistant";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="bg-transparent flex h-screen w-full overflow-hidden">
      {/* Premium Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        
        {/* --- Standardized iPhone Glass Floating Menu Button --- */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-6 left-6 z-[60] lg:hidden group"
            aria-label="Open Navigation"
          >
            {/* Multi-layered Glass Effect */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
              
              {/* Main Pill */}
              <div className="relative h-12 w-12 bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:border-indigo-500/50">
                <Menu size={20} className="text-white dark:text-slate-100" />
                
                {/* Visual indicator dot */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-950 shadow-sm" />
              </div>
            </div>
          </button>
        )}

        <HeadView />

        <div className="w-full flex-1 overflow-x-hidden overflow-y-auto px-6 py-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>

        {/* Global AI Assistant Button */}
        <AIAssistant />
      </main>
    </div>
  );
}
