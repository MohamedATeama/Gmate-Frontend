import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Mail, 
  MapPin, 
  Send, 
 
  Loader2, 
  Globe,
  Github,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    console.log("Contact form data:", data);
    setIsGenerating(false);
    toast.success("Message sent! We will be in touch.");
    reset();
  };

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden selection:bg-indigo-500/30">
      {/* --- Atmospheric Background --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[35%] h-[35%] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* --- Left Side: Info --- */}
            <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase shadow-sm">
                  <Globe size={14} />
                  <span>Available Worldwide</span>
                </div>
                <h1 className="text-foreground text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
                  Let's build something{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 dark:from-indigo-400 dark:to-cyan-400">
                    great
                  </span>{" "}
                  together.
                </h1>
                <p className="text-muted-foreground text-xl font-medium leading-relaxed max-w-lg">
                  Have a question about enterprise plans, custom workflows, or just want to say hi? We're all ears.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-6 flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
                  <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Mail className="text-indigo-500 dark:text-indigo-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email us at</p>
                    <p className="text-foreground font-bold text-lg">hello@gmate.app</p>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-6 flex items-center gap-6 group hover:border-cyan-500/30 transition-all">
                  <div className="bg-cyan-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <MapPin className="text-cyan-500 dark:text-cyan-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Our Studio</p>
                    <p className="text-foreground font-bold text-lg">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-center pt-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={24} />
                </a>
                <div className="h-px w-12 bg-border" />
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Follow our journey</p>
              </div>
            </div>

            {/* --- Right Side: Form --- */}
            <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="bg-card/50 backdrop-blur-2xl border border-border rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 bg-indigo-500/5 w-32 h-32 blur-3xl rounded-full" />
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Wick" 
                      {...register("name")}
                      className={`h-14 rounded-2xl bg-background/50 border-border focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all placeholder:text-muted-foreground/50 text-foreground font-medium ${errors.name ? 'border-rose-500/50' : ''}`}
                    />
                    {errors.name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="wick@high-table.com" 
                      {...register("email")}
                      className={`h-14 rounded-2xl bg-background/50 border-border focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all placeholder:text-muted-foreground/50 text-foreground font-medium ${errors.email ? 'border-rose-500/50' : ''}`}
                    />
                    {errors.email && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your team's goals..." 
                      {...register("message")}
                      className={`min-h-[160px] rounded-2xl bg-background/50 border-border focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all placeholder:text-muted-foreground/50 text-foreground font-medium resize-none ${errors.message ? 'border-rose-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-1">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-[0.98] group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
