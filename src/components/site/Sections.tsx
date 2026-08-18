import { GlowCard } from "@/components/fx/GlowCard";

/** Monospace ASCII flow diagram — presentational only. */
export function AsciiDiagram({ title, lines }: { title: string; lines: string[] }) {
  return (
    <figure className="rounded-xl border border-border bg-surface/50 p-4 sm:p-5">
      <figcaption className="mono-label">{title}</figcaption>
      <pre
        aria-hidden="true"
        className="mt-3 overflow-x-auto whitespace-pre font-mono text-[10.5px] leading-[1.5] text-muted-foreground sm:text-xs"
      >
        {lines.join("\n")}
      </pre>
      <span className="sr-only">{lines.join(", ")}</span>
    </figure>
  );
}

const SNAPSHOT: { label: string; values: string[] }[] = [
  { label: "Role", values: ["Software Engineering Undergraduate"] },
  { label: "Focus", values: ["Cybersecurity / Systems"] },
  { label: "Environment", values: ["Windows 11", "Ubuntu", "Kali Linux"] },
  { label: "Core", values: ["C++", "SQL / MySQL", "Arduino"] },
  { label: "Status", values: ["Learning • Building • Experimenting"] },
];

export function SystemSnapshot() {
  return (
    <GlowCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label">System profile</span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          online
        </span>
      </div>
      <dl className="mt-5 divide-y divide-border">
        {SNAPSHOT.map((row) => (
          <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{row.label}</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground">
              {row.values.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </GlowCard>
  );
}

const PHILOSOPHY = [
  "Understand the system.",
  "Break down the problem.",
  "Build the solution.",
  "Test it.",
  "Learn what failed.",
  "Improve it.",
];

export function EngineeringPhilosophy() {
  return (
    <GlowCard className="h-full p-6 sm:p-7">
      <span className="mono-label">Engineering philosophy</span>
      <ol className="mt-5 space-y-3">
        {PHILOSOPHY.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm text-foreground">
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </GlowCard>
  );
}

const CAPABILITIES: { n: string; title: string; items: string[] }[] = [
  {
    n: "01",
    title: "Software & Programming",
    items: ["C++", "Programming Fundamentals", "SQL", "MySQL", "Database Design"],
  },
  {
    n: "02",
    title: "Cybersecurity & Systems",
    items: [
      "Kali Linux",
      "Linux",
      "Ubuntu",
      "Security Fundamentals",
      "Linux Hardening Basics",
      "Windows 11",
      "GRUB / Triple Boot",
    ],
  },
  {
    n: "03",
    title: "Embedded & Automation",
    items: ["Arduino", "IR Sensors", "Ultrasonic Sensors", "Servo Motors", "Automation", "Firmware"],
  },
  {
    n: "04",
    title: "Tools & Workflow",
    items: ["Arduino IDE", "Bash", "AI Tooling", "Prompt Engineering", "Hardware Troubleshooting"],
  },
];

export function CapabilityStack() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CAPABILITIES.map((g) => (
        <GlowCard key={g.n} className="h-full p-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-primary">{g.n}</span>
            <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </GlowCard>
      ))}
    </div>
  );
}

const EVIDENCE: { label: string; items: string }[] = [
  { label: "Foundation", items: "C++ · SQL · MySQL" },
  { label: "Working with", items: "Linux · Ubuntu · Kali · Arduino" },
  { label: "Current focus", items: "Cybersecurity · Systems · Automation" },
];

export function EvidenceStrip() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {EVIDENCE.map((e) => (
        <GlowCard key={e.label} className="p-6">
          <span className="mono-label">{e.label}</span>
          <p className="mt-3 font-mono text-sm text-foreground">{e.items}</p>
        </GlowCard>
      ))}
    </div>
  );
}

const PROOF: { n: string; label: string; body: string }[] = [
  { n: "01", label: "Automation", body: "Arduino + Sensors + C++" },
  { n: "02", label: "Systems", body: "Windows + Ubuntu + Kali" },
  { n: "03", label: "Database", body: "MySQL + Database Design" },
  { n: "04", label: "Security", body: "Linux + Security Fundamentals" },
  { n: "05", label: "Operations", body: "IT Support + Hardware + OS" },
];

export function ProofOfWork() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PROOF.map((p) => (
        <GlowCard key={p.n} className="h-full p-6">
          <span className="font-mono text-xs text-primary">{p.n}</span>
          <h3 className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">{p.label}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
        </GlowCard>
      ))}
    </div>
  );
}

/** Small technical metadata bar — all values derived from existing portfolio content. */
export function SystemMeta() {
  const rows = [
    ["System status", "Portfolio online"],
    ["Current focus", "Cybersecurity / Systems"],
    ["Environment", "Linux / Windows"],
    ["Build", String(new Date().getFullYear())],
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {rows.map(([k, v]) => (
        <div key={k} className="bg-surface/70 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</div>
          <div className="mt-1.5 font-mono text-xs uppercase tracking-wider text-foreground">{v}</div>
        </div>
      ))}
    </div>
  );
}
