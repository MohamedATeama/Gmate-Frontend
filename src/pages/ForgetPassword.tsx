import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgetPassword() {
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
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg shadow-primary/20 transition-transform">
              <span className="text-primary-foreground text-xl font-black">G</span>
            </div>
            <span className="text-foreground text-2xl font-black tracking-tighter">GMATE</span>
          </div>
          <h2 className="text-foreground mb-4 text-4xl font-black tracking-tight">
            Reset your password
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            Don't worry, it happens to the best of us. Enter your email and we'll 
            send you recovery instructions.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-primary/20">
              <span className="text-primary-foreground text-2xl font-black">G</span>
            </div>
            <h1 className="text-foreground text-2xl font-black tracking-tight">Recover Account</h1>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-foreground text-3xl font-black tracking-tight">Forgot Password?</h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-widest opacity-60">
              No stress, we got you
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
            
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" size="lg">
              Send Reset Instructions
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm font-medium">
            Remembered your password?{" "}
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
