import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

/** Direct-to-backend contact form. Anyone may insert; nobody can read back. */
export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim() || null,
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(payload);
    setSending(false);

    if (error) {
      toast.error("Message could not be sent. Please email me directly.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Message sent — I'll get back to you.");
  }

  const field =
    "mt-2 w-full rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mono-label">
            Name
          </label>
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="mono-label">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="mono-label">
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="cf-subject" name="subject" maxLength={200} className={field} placeholder="Internship · Role · Project" />
      </div>
      <div>
        <label htmlFor="cf-message" className="mono-label">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={`${field} resize-y`}
          placeholder="What are you building, and where could I help?"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
        >
          {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {sending ? "Sending…" : "Start a Conversation"}
        </button>
        <p aria-live="polite" className="font-mono text-[11px] text-muted-foreground">
          {sent ? "Delivered — reply usually within a day." : "Goes straight to my inbox."}
        </p>
      </div>
    </form>
  );
}
