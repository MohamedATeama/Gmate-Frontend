import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/context/ThemeContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <div className="bg-background flex min-h-screen relative">
      {/* Premium Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all group"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform group-hover:-translate-x-1">
          <ArrowLeft size={14} />
        </div>
        <span>Home</span>
      </Link>

      <div className="bg-muted/30 border-border relative hidden items-center justify-center border-r lg:flex lg:w-1/2">
        <div className="max-w-md p-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-2xl transition-transform hover:scale-105">
              <img 
                src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"} 
                alt="GMATE Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-foreground text-3xl font-black tracking-tighter uppercase">GMATE</span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-black tracking-tight">
            Start shipping faster
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            Join thousands of engineering teams who use Gmate to manage their 
            most ambitious projects.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="mb-6 h-16 w-16 overflow-hidden rounded-full border-2 border-white dark:border-slate-800 shadow-xl">
              <img 
                src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"} 
                alt="GMATE Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-foreground text-2xl font-black tracking-tight">Create Account</h1>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-foreground text-3xl font-black tracking-tight">Sign up</h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-widest opacity-60">
              Get started for free
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest opacity-50">Full Name</Label>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 pl-11 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-50">Email Address</Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 pl-11 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest opacity-50">Password</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pr-11 pl-11 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" size="lg">
              Create Workspace
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:opacity-80 transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
