import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatsSection from "@/components/landing/StatsSection";
import ProfileCard from "@/components/shared/ProfileCard";
import CompletedProjects from "@/components/landing/CompletedProjects";
import { ArrowLeft, Settings } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">User Profile</h1>
        </div>
        <Button 
          onClick={() => navigate("/dashboard/profile/edit")}
          className="bg-primary hover:bg-indigo-500 rounded-full h-11 px-8 font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          <Settings size={18} className="mr-2" /> Edit Profile
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <StatsSection />
          <CompletedProjects />
        </div>
      </div>
    </div>
  );
}
