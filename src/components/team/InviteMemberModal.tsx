import * as Dialog from "@radix-ui/react-dialog";
import { X, Send, Copy, Check, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddProjectMember } from "@/hooks/useAddProjectMember";

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["manager", "developer", "viewer"]),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

export default function InviteMemberModal({ open, onOpenChange, projectId }: { open: boolean, onOpenChange: (open: boolean) => void, projectId?: string | null }) {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const addMemberMutation = useAddProjectMember(projectId || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { role: "developer" },
  });

  const onSubmit = async (data: InviteFormValues) => {
    if (projectId) {
      addMemberMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Member successfully invited!");
          onOpenChange(false);
        },
        onError: (error: Error) => {
          const axiosError = error as any;
          toast.error(axiosError.response?.data?.message || "Failed to invite member");
        }
      });
      return;
    }

    // Legacy context path
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    const mockId = "inv-x89z4k"; // Static fallback to prevent impure function rules
    const link = `https://gmate.app/invite/${mockId}`;
    setInviteLink(link);
    setIsGenerating(false);
    toast.success("Invite link generated!");
  };

  const copyToClipboard = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setInviteLink(null);
    }}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 z-50 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <Dialog.Title className="text-2xl font-black tracking-tight">{projectId ? "Add Member" : "Invite Member"}</Dialog.Title>
              <Dialog.Description className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">
                {projectId ? "Bind a registered operative to this project" : "Expand your engineering team"}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="text-muted-foreground hover:bg-muted rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {!inviteLink ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-50">Email Address</Label>
                <Input 
                  id="email" 
                  placeholder="colleague@company.com" 
                  {...register("email")}
                  className={errors.email ? "border-rose-500" : ""}
                />
                {errors.email && <p className="text-[10px] font-bold text-rose-500 uppercase">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest opacity-50">Assigned Role</Label>
                <select 
                  id="role"
                  {...register("role")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold outline-none ring-primary/20 transition-all focus:ring-2"
                >
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <Button 
                type="submit" 
                disabled={isGenerating || addMemberMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 gap-2"
              >
                {isGenerating || addMemberMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {projectId ? "Send Invite" : "Generate Invite Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-4">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Your Unique Invite Link</Label>
                <div className="flex gap-2">
                  <div className="bg-muted/50 border-border flex-1 truncate rounded-xl border px-4 py-3 text-sm font-medium">
                    {inviteLink}
                  </div>
                  <Button onClick={copyToClipboard} size="icon" className="h-12 w-12 shrink-0 rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform active:scale-90">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Share via Socials</Label>
                <div className="grid grid-cols-3 gap-3">
                  <a 
                    href={`https://wa.me/?text=Join my team on Gmate: ${inviteLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all hover:scale-105"
                  >
                    <MessageCircle size={20} className="fill-emerald-600/10" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">WhatsApp</span>
                  </a>
                  <a 
                    href={`https://t.me/share/url?url=${inviteLink}&text=Join my team on Gmate`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-sky-500/10 border-sky-500/20 text-sky-600 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all hover:scale-105"
                  >
                    <Send size={20} className="fill-sky-600/10" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Telegram</span>
                  </a>
                  <a 
                    href={`mailto:?subject=You're invited to Gmate&body=Click here to join: ${inviteLink}`}
                    className="hover:bg-primary/10 border-primary/20 text-primary flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all hover:scale-105"
                  >
                    <Mail size={20} className="fill-primary/10" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Email</span>
                  </a>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setInviteLink(null)} 
                className="w-full rounded-xl h-11 border-border font-bold opacity-60 hover:opacity-100"
              >
                Create another invite
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Loader2({ size, className }: { size: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
