import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Zap, 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  MousePointer2,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden selection:bg-indigo-500/30">
      {/* --- Atmospheric Background --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-cyan-500/10 blur-[100px] rounded-full delay-700" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* --- Hero Section --- */}
        <section className="pt-32 pb-20 px-6 sm:pt-40 sm:pb-32">
          <div className="max-w-7xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase shadow-2xl mb-10">
              <Sparkles size={14} className="animate-pulse" />
              <span>The future of workflow is here</span>
            </div>

            <h1 className="text-white mx-auto max-w-5xl text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl leading-[1.05]">
              Orchestrate your workflow beautifully with{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] animate-gradient-x">
                Gmate.
              </span>
            </h1>

            <p className="text-slate-400 mx-auto mt-10 max-w-3xl text-lg font-medium leading-relaxed sm:text-xl lg:text-2xl">
              Powerful task tracking meets seamless team collaboration. 
              Finally, a productivity tool that stays out of your way and lets you build.
            </p>

            {/* CTAs */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/dashboard"
                className="bg-indigo-600 text-white hover:bg-indigo-500 group inline-flex h-16 items-center justify-center rounded-2xl px-10 text-lg font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-white inline-flex h-16 items-center justify-center rounded-2xl border px-10 text-lg font-bold shadow-sm transition-all duration-300 active:scale-95"
              >
                View Features
              </Link>
            </div>
          </div>
        </section>

        {/* --- Floating App Mockup --- */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="group relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
              {/* Mockup Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative border border-slate-800 bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500">
                {/* Mac Toolbar */}
                <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto bg-slate-800/50 rounded-lg px-4 py-1 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                    app.gmate.io/dashboard/kanban
                  </div>
                </div>

                {/* Miniature Kanban UI */}
                <div className="p-8 grid grid-cols-3 gap-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {[
                    { title: "To Do", tasks: ["Design System", "Auth Flow"] },
                    { title: "In Progress", tasks: ["API Integration"] },
                    { title: "Done", tasks: ["Dashboard Setup", "User Profile"] }
                  ].map((col, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{col.title}</span>
                        <div className="w-4 h-4 rounded bg-slate-800 flex items-center justify-center text-[8px] text-slate-400">+</div>
                      </div>
                      {col.tasks.map((task, j) => (
                        <div key={j} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl space-y-3">
                          <div className="h-1.5 w-8 rounded-full bg-indigo-500/50" />
                          <div className="h-3 w-full bg-slate-700/50 rounded" />
                          <div className="h-3 w-2/3 bg-slate-700/50 rounded" />
                          <div className="flex justify-between items-center pt-2">
                            <div className="w-5 h-5 rounded-full bg-slate-700" />
                            <div className="w-10 h-2 bg-slate-700/50 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Feature Grid --- */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-amber-400" />,
                title: "Lightning Fast",
                desc: "Optimized for speed. Zero lag drag-and-drop and sub-second page transitions."
              },
              {
                icon: <LayoutDashboard className="text-indigo-400" />,
                title: "Smart Kanban",
                desc: "Intuitive visual organization that adapts to your team's unique engineering workflow."
              },
              {
                icon: <Users className="text-cyan-400" />,
                title: "Team Sync",
                desc: "Real-time collaboration with instant updates and comprehensive activity tracking."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group border border-slate-800 bg-slate-900/30 p-8 rounded-3xl hover:bg-slate-800/50 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300"
              >
                <div className="bg-slate-900 border border-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {feature.desc}
                </p>
                <div className="mt-6 flex items-center text-indigo-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Mini Footer --- */}
        <footer className="border-t border-slate-900 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center sm:justify-start gap-3 group">
              <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-110 group-hover:shadow-indigo-500/30">
                <img 
                  src="/assets/logo-dark.png" 
                  alt="GMATE Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-white text-lg font-black tracking-tighter uppercase transition-colors group-hover:text-indigo-400">GMATE</span>
            </Link>
            <div className="flex gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest justify-center">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
            <p className="text-slate-600 text-xs font-medium">
              © 2026 Gmate Technologies Inc.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
