import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setForm(initialFormState);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="resources"
      className="border-border bg-background relative min-h-screen overflow-hidden border-b"
    >
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="bg-primary text-primary-foreground flex items-center justify-center px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-3xl leading-tight font-black tracking-tight sm:text-4xl lg:text-5xl">
              Get in touch
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Have a question or feedback? Send us a message and we&apos;ll
              respond as soon as we can.
            </p>
            <div className="text-primary-foreground/90 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-primary-foreground font-medium">Email</p>
                  <a
                    href="mailto:support@gmate.com"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    support@gmate.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-primary-foreground font-medium">Phone</p>
                  <p>+20 (000) 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-primary-foreground font-medium">
                    Location
                  </p>
                  <p>NTI Hire-Ready · Cairo, Egypt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 flex items-center justify-center px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="border-border bg-card rounded-[2rem] border-8 p-4 shadow-2xl">
              <div className="bg-background rounded-xl">
                <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-3">
                  <h4 className="text-sm font-semibold">Send a message</h4>
                  <div className="bg-muted-foreground/20 h-1.5 w-12 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-foreground text-xs leading-none font-medium"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="inputBase"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-destructive text-[10px]">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-foreground text-xs leading-none font-medium"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="inputBase"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-destructive text-[10px]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-foreground text-xs leading-none font-medium"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="inputBase"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-[10px]">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-foreground text-xs leading-none font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={3}
                      className={`inputBase min-h-[80px] resize-y`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-destructive text-[10px]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "success" && (
                    <div className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      Message sent. We&apos;ll get back soon.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Something went wrong. Try again or email us.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    size="sm"
                    className="mt-1 w-full gap-2 rounded-lg"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
