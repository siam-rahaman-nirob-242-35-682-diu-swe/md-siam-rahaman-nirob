import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/siam-portrait.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
import { Github, Moon, Sun, ExternalLink, Command as CommandIcon, X, Phone, Copy, Check } from "lucide-react";
import { GlowCard } from "@/components/fx/GlowCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { ScrollProgress, SectionRail } from "@/components/fx/ScrollProgress";
import { EngineeringDashboard } from "@/components/lab/EngineeringDashboard";
import { EngineeringLab } from "@/components/lab/EngineeringLab";
import { CommandPalette, type PaletteAction } from "@/components/fx/CommandPalette";
import { useTheme } from "@/hooks/use-theme";

const SITE_URL = "https://portfolio-dynamo-07.lovable.app";
const CV_URL = "/Muhammad-Siam-Rahaman-Nirob-CV.pdf";
const GITHUB_UNI = "https://github.com/siam-rahaman-nirob-242-35-682-diu-swe";
const GITHUB = "https://github.com/Nirob682";
const EMAIL = "siamrahamannirob@gmail.com";
const PHONE_SHOW = "+8801683818650";
const PHONE_CALL = "+8801349536988";
const FACEBOOK = "https://www.facebook.com/share/19USTsa4Ui/";
const INSTAGRAM = "https://www.instagram.com/mr.rahaman_miya?igsh=MXF2NTNjZmxrd29rag==";
const YOUTUBE = "https://youtube.com/@siamrahamannirob4013?si=xUbPU7qUh8EhkMl-";
const SCHOLAR = "https://scholar.google.com/citations?user=LNyHBBIAAAAJ&hl";
const TWITTER = "https://x.com/swe_nirob";
const THREADS = "https://www.threads.com/@loser_or_not69";
const DEVTO = "https://dev.to/rahaman_dev";
const LINKEDIN = "https://www.linkedin.com/in/siam-rahaman-nirob/";

/** Single source of truth for every social profile — used by contact cards, About, footer and the command palette. */
const SOCIALS: { label: string; short: string; url: string }[] = [
  { label: "University GitHub", short: "siam-rahaman-nirob-242-35-682-diu-swe", url: GITHUB_UNI },
  { label: "Additional GitHub", short: "github.com/Nirob682", url: GITHUB },
  { label: "LinkedIn", short: "in/siam-rahaman-nirob", url: LINKEDIN },
  { label: "Facebook", short: "facebook.com/siam.rahaman.nirob", url: FACEBOOK },
  { label: "Instagram", short: "@mr.rahaman_miya", url: INSTAGRAM },
  { label: "YouTube", short: "@siamrahamannirob4013", url: YOUTUBE },
  { label: "Google Scholar", short: "Muhammad Siam Rahaman Nirob", url: SCHOLAR },
  { label: "X (Twitter)", short: "@swe_nirob", url: TWITTER },
  { label: "Threads", short: "@loser_or_not69", url: THREADS },
  { label: "Dev.to", short: "dev.to/rahaman_dev", url: DEVTO },
];

const TITLE = "Muhammad Siam Rahaman Nirob — Software Engineering & Cyber Security";
const DESCRIPTION =
  "Software Engineering undergraduate at Daffodil International University focused on cyber security, Linux systems, embedded automation and C++/MySQL development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Muhammad Siam Rahaman Nirob" },
      { property: "profile:first_name", content: "Muhammad Siam" },
      { property: "profile:last_name", content: "Rahaman Nirob" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@swe_nirob" },
      { name: "twitter:creator", content: "@swe_nirob" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Siam Rahaman Nirob",
          url: SITE_URL,
          email: `mailto:${EMAIL}`,
          telephone: PHONE_SHOW,
          jobTitle: "Software Engineering Undergraduate",
          address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Daffodil International University",
          },
          sameAs: SOCIALS.map((s) => s.url),
        }),
      },
    ],
  }),
  component: Portfolio,
});


const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[2px]"
      }`}
    >
      {children}
    </div>
  );
}

/** Terminal boot sequence: types each command, prints its output, then idles with a live prompt. */
const BOOT: { cmd: string; out: React.ReactNode; log?: string }[] = [
  {
    cmd: "whoami",
    out: <span className="text-foreground">Muhammad Siam Rahaman Nirob</span>,
    log: "session opened · tty/1 · dhaka",
  },
  {
    cmd: "focus",
    out: (
      <span className="text-foreground">
        software-engineering
        <br />
        cyber-security
        <br />
        linux-systems
        <br />
        embedded-automation
      </span>
    ),
    log: "loaded profile: kali · ubuntu · win11",
  },
  {
    cmd: "status",
    out: (
      <span className="inline-flex items-center gap-2 font-medium text-primary">
        <span className="size-1.5 rounded-full bg-primary" />
        OPEN TO INTERNSHIPS &amp; JUNIOR ROLES
      </span>
    ),
    log: "listening for internships & junior roles",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function TerminalBoot() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setStep(BOOT.length);
      setDone(true);
      return;
    }
    if (step >= BOOT.length) {
      setDone(true);
      return;
    }
    const full = BOOT[step]!.cmd;
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped("");
    }, 700);
    return () => clearTimeout(t);
  }, [typed, step, reduced]);

  const Caret = () => (
    <span
      className={`${reduced ? "" : "caret-blink "}ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.12em] bg-primary`}
    />
  );

  return (
    <div className="mt-6 w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface/60 p-4 font-mono text-[12px] leading-relaxed backdrop-blur sm:text-[13px]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-destructive/70" />
        <span className="size-2 rounded-full bg-signal/70" />
        <span className="size-2 rounded-full bg-primary/70" />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          siam@systems
        </span>
      </div>

      {BOOT.slice(0, step).map((l) => (
        <div key={l.cmd} className="mb-2">
          <div className="break-all text-muted-foreground">
            <span className="text-primary">siam@systems</span>:~$ {l.cmd}
          </div>
          <div className="mt-0.5 break-words">{l.out}</div>
          {l.log ? <div className="mt-0.5 text-[10px] text-muted-foreground/70">[ok] {l.log}</div> : null}
        </div>
      ))}

      {!done && step < BOOT.length ? (
        <div className="text-muted-foreground">
          <span className="text-primary">siam@systems</span>:~$ {typed}
          <Caret />
        </div>
      ) : null}

      {done ? (
        <div className="text-muted-foreground">
          <span className="text-primary">siam@systems</span>:~$<Caret />
        </div>
      ) : null}
    </div>
  );
}


function SectionHeading({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="mono-label">{kicker}</span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
      {children}
    </span>
  );
}

const skillGroups = [
  {
    kicker: "Core engineering foundation",
    title: "Programming & Databases",
    items: ["C++", "SQL", "MySQL", "Database Design", "Programming Fundamentals", "Arduino C++"],
  },
  {
    kicker: "Where the curiosity lives",
    title: "Cyber Security & Systems",
    items: [
      "Kali Linux",
      "Security Fundamentals",
      "Linux Hardening Basics",
      "Triple-boot Configuration",
      "Ubuntu Automation",
      "Windows 11",
    ],
  },
  {
    kicker: "Daily driver toolkit",
    title: "Tools & AI Workflow",
    items: [
      "Prompt Engineering",
      "ChatGPT",
      "Google Gemini",
      "Arduino IDE",
      "MS Office Suite",
      "Hardware Troubleshooting",
    ],
  },
  {
    kicker: "How the work gets shipped",
    title: "Soft Skills",
    items: [
      "Problem Solving",
      "Cross-functional Teamwork",
      "Time Management",
      "Resource Optimization",
      "Quick Learning",
    ],
  },
];

const proficiency = [
  { label: "C++ & Programming Fundamentals", value: 78 },
  { label: "MySQL / SQL & Database Design", value: 72 },
  { label: "Linux (Ubuntu & Kali)", value: 70 },
  { label: "Cyber Security Fundamentals", value: 62 },
  { label: "Embedded / Arduino Systems", value: 74 },
  { label: "AI Tooling & Prompt Engineering", value: 85 },
];

type Project = {
  tag: string;
  state: string;
  title: string;
  blurb: string;
  stack: string[];
  points: string[];
  source: string;
  demo?: string;
  problem: string;
  architecture: string;
  architectureFlow: string[];
  challenge: string;
  solution: string;
  decisions: { title: string; body: string }[];
  contribution: string[];
  outcome: string;
  future: string[];
};

const projects: Project[] = [
  {
    tag: "Embedded Systems",
    state: "Academic Project",
    title: "Automated Car Parking System",
    blurb:
      "A fully automated entry and exit system that removes manual gate handling entirely — sensors detect vehicles, logic decides, barriers respond.",
    stack: ["Arduino Uno", "IR Sensors", "Ultrasonic Sensors", "Servo Motors", "C++", "Arduino IDE"],
    points: [
      "Sensor-based vehicle detection with IR and ultrasonic arrays for reliable entry/exit reads",
      "Real-time slot monitoring that surfaces availability and cuts average parking time",
      "Hand-designed circuit paired with optimized C++ for near-zero-latency hardware handshake",
      "Automated barriers triggered by live slot availability and system-state logic",
    ],
    source: GITHUB,
    problem:
      "Small parking lots still rely on a human at the gate: cars queue, slot counts are guessed, and drivers circle the lot looking for a free space. Every part of that is a measurement problem a microcontroller can solve for a few dollars.",
    architecture:
      "Arduino Uno as the single controller: IR pairs at entry/exit gates, an ultrasonic array per slot row, and two servo-driven barriers. A slot-state table lives in memory and drives both the LCD readout and the barrier logic, so the display and the hardware can never disagree.",
    architectureFlow: [
      "IR gate sensors → debounce layer → entry/exit event",
      "Ultrasonic slot array → occupancy sampler → slot-state table (single source of truth)",
      "Slot-state table → barrier controller (non-blocking servo timer)",
      "Slot-state table → LCD availability readout",
    ],
    challenge:
      "Cheap IR sensors double-trigger when a car creeps through the gate, and ultrasonic echoes bounce off neighbouring cars — which produced phantom occupancy and barriers closing on moving vehicles.",
    solution:
      "I added software debouncing with a per-sensor cooldown window, cross-validated every entry event against the matching slot reading before committing a state change, and moved the servo control into a non-blocking timer loop so sensor polling never stalls behind a barrier animation.",
    decisions: [
      {
        title: "One in-memory state table, never two",
        body: "The LCD and the barriers both read the same slot table instead of tracking their own counters, which removed an entire class of display-vs-hardware desync bugs.",
      },
      {
        title: "Non-blocking servo control over delay()",
        body: "delay() froze sensor polling during every gate animation. A millis()-based timer loop keeps detection live while the barrier moves.",
      },
      {
        title: "Cross-validation before committing state",
        body: "An entry event only counts when the gate sensor and the corresponding slot reading agree, which killed phantom occupancy from ultrasonic echo.",
      },
    ],
    contribution: [
      "Designed and wired the full circuit, including sensor placement and power distribution",
      "Wrote all firmware in C++: debouncing, slot-state machine, barrier and LCD control",
      "Ran repeated physical test cycles and tuned thresholds against real vehicle mock-ups",
    ],
    outcome:
      "Stable detection across repeated test runs, no manual gate handling, and average parking time measurably reduced in the demo lot.",
    future: [
      "ESP32 upgrade with a Wi-Fi dashboard for remote slot availability",
      "RFID or plate recognition for per-vehicle session tracking and billing",
      "Persist session logs to a MySQL backend for occupancy analytics",
    ],
  },
  {
    tag: "Self-directed Lab",
    state: "Ongoing",
    title: "Triple-Boot Security Lab",
    blurb:
      "A personal workstation running Windows 11, Ubuntu and Kali side by side — a permanent sandbox for learning system configuration, automation and defensive basics.",
    stack: ["Kali Linux", "Ubuntu", "Windows 11", "GRUB", "Bash"],
    points: [
      "Partitioned triple-boot setup used to study bootloaders and system configuration",
      "Shell-driven automation experiments and scheduled tasks on Ubuntu",
      "Practising core offensive and defensive security concepts inside Kali Linux",
    ],
    source: GITHUB,
    problem:
      "Security fundamentals do not stick from reading. I needed an environment where I could break bootloaders, permissions and services on purpose — without losing my daily-driver machine.",
    architecture:
      "One physical disk, three OS partitions plus a shared data partition, unified under GRUB. Ubuntu is the automation host (bash scripts + cron), Kali is the isolated practice environment, Windows 11 stays the daily productivity side.",
    architectureFlow: [
      "EFI partition → GRUB → three OS entries",
      "Ubuntu (automation host): bash scripts + cron jobs",
      "Kali (isolated practice): offensive/defensive exercises",
      "Shared NTFS data partition mounted with scripted permissions",
    ],
    challenge:
      "Windows updates repeatedly overwrote the bootloader, and shared-partition permissions kept breaking between Linux and Windows sessions.",
    solution:
      "Rebuilt the boot chain with a dedicated EFI partition and a documented GRUB recovery procedure, then scripted mount options and ownership fixes so the shared partition comes up consistent on every Linux boot.",
    decisions: [
      {
        title: "Dedicated EFI partition instead of shared boot",
        body: "Isolating the EFI partition made Windows update damage recoverable in minutes rather than requiring a reinstall.",
      },
      {
        title: "Documented recovery runbook",
        body: "Every failure got written down as a repeatable procedure, so the lab is rebuildable from notes instead of memory.",
      },
      {
        title: "Automation lives on Ubuntu, never on Kali",
        body: "Keeping the practice environment disposable means nothing important is lost when an experiment goes wrong.",
      },
    ],
    contribution: [
      "Planned the partition scheme and built the boot chain from scratch",
      "Wrote the bash automation and cron schedules on the Ubuntu host",
      "Maintain the recovery runbook and rebuild the lab after each major experiment",
    ],
    outcome:
      "A resilient lab I can wipe and rebuild from notes, used daily for security fundamentals and Linux automation practice.",
    future: [
      "Move the practice environment into isolated VMs with snapshot rollback",
      "Add a home network segment with pfSense for traffic inspection practice",
      "Automate the whole rebuild with a provisioning script",
    ],
  },
  {
    tag: "Full-Stack Web",
    state: "Academic Project · Team of 3",
    title: "ShopNest",
    blurb:
      "A full-stack e-commerce marketplace covering discovery, authentication, cart, wishlist, transaction-safe checkout and protected admin capabilities.",
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "SQLite",
      "JWT",
      "Electron",
    ],
    points: [
      "Authentication with password hashing, signed JWT access tokens and role-based access control",
      "Product discovery, product details, cart and wishlist management",
      "Transaction-oriented checkout: inventory validation, stock decrement, order creation and cart clearing",
      "Profile and address management plus a protected admin dashboard",
      "Assistant, recommendation, comparison and review-analysis interfaces isolated behind an API boundary with fallback handling",
      "Responsive interface evidence captured across desktop, tablet and mobile layouts",
    ],
    source: "https://github.com/siam-rahaman-nirob-242-35-682-diu-swe/ShopNest",
    problem:
      "The project set out to deliver a convenient, responsive digital shopping experience: product discovery, accounts, cart/wishlist, checkout and administration usually live in disconnected demos rather than one coherent, working marketplace.",
    architecture:
      "A layered client-server model. React/Vite provides the responsive interface (with Electron available as a desktop wrapper), Node.js + Express exposes REST APIs and applies business rules and access control, and SQLite stores users, products, carts, orders and related marketplace data. The proposal baseline specified MySQL; the delivered transactional system uses SQLite, and the report documents the delivered implementation rather than the proposal assumptions.",
    architectureFlow: [
      "Web / desktop interface → REST endpoints",
      "JWT authentication → role authorization",
      "Controllers → services (business rules)",
      "Services → SQLite persistence (users, products, carts, orders)",
      "AI assistant behind an API boundary with Node-native fallback",
    ],
    challenge:
      "Keeping checkout consistent — inventory validation, stock decrement, order creation and cart clearing must not drift apart — while keeping the marketplace usable even when an external AI provider is unavailable.",
    solution:
      "The checkout workflow was made transaction-oriented so the inventory and order steps are handled consistently, and the AI assistant was isolated behind an API boundary with graceful fallback so the core marketplace never depends on a live AI provider. Protected frontend routes and role checks prevent unauthorized UI and API access.",
    decisions: [
      {
        title: "Documenting the delivered stack, not the proposal",
        body: "The proposal specified React + Node + Express + MySQL; the delivered transactional system uses SQLite. The report records the implementation as built.",
      },
      {
        title: "Transaction-oriented checkout",
        body: "Inventory validation, stock decrement, order creation and cart clearing are handled together so order and stock state stay consistent.",
      },
      {
        title: "AI behind an API boundary",
        body: "Assistant features are bounded HTTP services with graceful Node-native fallback, so an unavailable provider cannot break the marketplace.",
      },
    ],
    contribution: [
      "Project Lead — MD. Siam Rahaman Nirob (242-35-682), Backend Developer and Frontend Instructor for the team",
      "Owned authentication and role-based access control",
      "Owned AI assistant integration behind the API boundary with fallback handling",
      "Co-owned the checkout and order workflow: business transaction flow and persistence",
    ],
    outcome:
      "A demonstrable end-to-end shopping workflow with more than eight implemented functional requirements, meaningful backend and database operations, and responsive UI evidence across desktop, tablet and mobile.",
    future: [
      "Expanded seller/admin workflows",
      "Broader automated testing and evidence coverage",
      "Revisit the relational backend choice as the data model grows",
    ],
  },
];



const services = [
  {
    n: "01",
    title: "Software Development",
    body: "C++ and database-backed applications built on clean fundamentals, from schema design to working logic.",
  },
  {
    n: "02",
    title: "Embedded & IoT Prototyping",
    body: "Arduino-based automation: sensor integration, circuit design and firmware written for real hardware constraints.",
  },
  {
    n: "03",
    title: "Security Fundamentals",
    body: "Hands-on Kali Linux practice, system hardening basics and security-aware configuration reviews.",
  },
  {
    n: "04",
    title: "IT Support & Operations",
    body: "NTVQF Level-03 certified support: hardware diagnostics, OS setup and workflow optimization.",
  },
  {
    n: "05",
    title: "AI Workflow Consulting",
    body: "Prompt engineering and AI tooling to compress repetitive work for small teams and solo operators.",
  },
  {
    n: "06",
    title: "Database Design",
    body: "Normalized MySQL schemas, query tuning and data models that stay readable as a project grows.",
  },
];

const education = [
  {
    title: "B.Sc. in Software Engineering",
    org: "Daffodil International University",
    meta: "2024 — Present",
    score: "CGPA 3.25 / 4.00",
  },
  {
    title: "Higher Secondary Certificate (H.S.C)",
    org: "Govt. Bangabandhu College — Dhaka Board, Science",
    meta: "2022",
    score: "GPA 4.50 / 5.00",
  },
  {
    title: "Secondary School Certificate (S.S.C)",
    org: "Mirpur Bangla School & College — Dhaka Board, Science",
    meta: "2020",
    score: "GPA 4.67 / 5.00",
  },
];

const certs = [
  {
    title: "NTVQF Computer Operation — Level 03",
    body: "Computer operation, office productivity and digital workflows.",
  },
  {
    title: "NTVQF IT Support — Level 03",
    body: "Hardware diagnostics, end-user support and system maintenance.",
  },
];

const CASE_TABS = [
  "Overview",
  "Architecture",
  "Tech Stack",
  "Engineering Decisions",
  "Challenges",
  "Solution",
  "Future",
] as const;
type CaseTab = (typeof CASE_TABS)[number];

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mono-label">{label}</span>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Glass-morphism case-study modal with tabbed deep dive. */
function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [tab, setTab] = useState<CaseTab>("Overview");

  useEffect(() => {
    if (project) setTab("Overview");
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel flex max-h-[88vh] w-full max-w-3xl animate-[fade-in_0.3s_ease-out] flex-col rounded-t-2xl shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-7 pb-5">
          <div>
            <span className="mono-label">
              {project.tag} · {project.state}
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-7 py-3">
          {CASE_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-6 overflow-y-auto p-7">
          {tab === "Overview" ? (
            <>
              <Block label="The problem">{project.problem}</Block>
              <Block label="Key features">
                <Bullets items={project.points} />
              </Block>
              <Block label="My contribution">
                <Bullets items={project.contribution} />
              </Block>
              <Block label="Result">{project.outcome}</Block>
            </>
          ) : null}

          {tab === "Architecture" ? (
            <>
              <Block label="How it is put together">{project.architecture}</Block>
              <div className="rounded-xl border border-border bg-surface/50 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
                {project.architectureFlow.map((line, i) => (
                  <div key={line} className="flex gap-2">
                    <span className="text-primary">
                      {i === project.architectureFlow.length - 1 ? "└──" : "├──"}
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {tab === "Tech Stack" ? (
            <Block label="Stack">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Block>
          ) : null}

          {tab === "Engineering Decisions" ? (
            <div className="space-y-4">
              {project.decisions.map((d) => (
                <div key={d.title} className="rounded-xl border border-border bg-surface/40 p-5">
                  <h4 className="text-sm font-semibold">{d.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Challenges" ? <Block label="What went wrong">{project.challenge}</Block> : null}

          {tab === "Solution" ? (
            <>
              <Block label="How I solved it">{project.solution}</Block>
              <Block label="Result">{project.outcome}</Block>
            </>
          ) : null}

          {tab === "Future" ? (
            <Block label="Future improvements">
              <Bullets items={project.future} />
            </Block>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border p-7 pt-5">
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" /> View source
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
            >
              <ExternalLink className="size-3.5" /> Live demo
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}


/** Live local status: Dhaka clock + current toolchain. */
function LiveStatus() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const hour = Number(now.slice(0, 2));
  const awake = hour >= 9 && hour < 26;

  return (
    <GlowCard className="mt-6 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="mono-label">Live status</span>
        <p className="mt-3 flex items-center gap-2 font-mono text-sm">
          <span
            className={`size-2 rounded-full ${awake ? "animate-pulse bg-primary" : "bg-muted-foreground"}`}
          />
          {awake ? "Online — usually replies within a few hours" : "Offline — will reply in the morning"}
        </p>
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        <div>
          Dhaka time <span className="text-foreground">{now || "--:--:--"}</span>
        </div>
        <div className="mt-1">
          Currently on <span className="text-primary">Kali Linux · VS Code · Arduino IDE</span>
        </div>
      </div>
    </GlowCard>
  );
}

function Portfolio() {
  const [active, setActive] = useState("about");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PHONE_SHOW);
    } catch {
      return;
    }
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1800);
  }, []);

  const { theme, toggle } = useTheme();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const actions: PaletteAction[] = [
    ...NAV.map((n) => ({
      group: "Navigate",
      label: `Go to ${n.label}`,
      hint: `#${n.id}`,
      run: () => go(n.id),
    })),
    {
      group: "Actions",
      label: "Download CV (PDF)",
      hint: "file",
      run: () => {
        const a = document.createElement("a");
        a.href = CV_URL;
        a.download = "";
        a.click();
      },
    },
    { group: "Actions", label: "Send email", hint: EMAIL, run: () => (window.location.href = `mailto:${EMAIL}`) },
    { group: "Actions", label: "Copy email address", run: () => navigator.clipboard?.writeText(EMAIL) },
    {
      group: "Actions",
      label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
      hint: "theme",
      run: toggle,
    },
    ...projects.map((p) => ({
      group: "Case studies",
      label: `Open case study — ${p.title}`,
      run: () => setOpenProject(p),
    })),
    {
      group: "Actions",
      label: "Call me",
      hint: PHONE_CALL,
      run: () => (window.location.href = `tel:${PHONE_CALL}`),
    },
    {
      group: "Actions",
      label: "Copy phone number",
      hint: PHONE_SHOW,
      run: () => void copyPhone(),
    },
    ...SOCIALS.map((l) => ({
      group: "Links",
      label: l.label,
      hint: "external",
      run: () => window.open(l.url, "_blank"),
    })),

  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <SmoothScroll />
      <CommandPalette actions={actions} />
      <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="font-mono text-sm tracking-tight">
            <span className="text-primary">~/</span>siam
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === n.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <CommandIcon className="size-3.5" />
              <span>Ctrl K</span>
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle colour theme"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <a
              href={CV_URL}
              download
              className="hidden rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
            >
              Download CV
            </a>
            <Magnetic
              href="#contact"
              className="rounded-full bg-primary px-4 py-2 font-mono text-xs font-medium text-primary-foreground"
            >
              Hire me
            </Magnetic>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="grid-veil relative overflow-hidden border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                Available for internships &amp; junior roles
              </span>
              <TerminalBoot />

              <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Muhammad Siam
                <br />
                <span className="text-gradient">Rahaman Nirob</span>
              </h1>
              <p className="mt-4 font-mono text-sm text-muted-foreground">
                Software Engineering × Cybersecurity × Systems
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                I build and study systems across software, Linux, security fundamentals and embedded
                automation — with a focus on understanding how things work under the hood.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Software Engineering Undergraduate",
                  "Cybersecurity & Systems Focus",
                  "Linux / Kali / Ubuntu",
                  "C++ / SQL",
                  "Embedded & Automation",
                ].map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic
                  href="#work"
                  className="inline-flex items-center min-h-11 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                >
                  Explore My Work
                </Magnetic>
                <Magnetic
                  href={GITHUB_UNI}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center min-h-11 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium"
                >
                  View GitHub
                </Magnetic>
                <Magnetic
                  href={CV_URL}
                  download
                  className="inline-flex items-center min-h-11 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary"
                >
                  Download CV
                </Magnetic>
                <Magnetic
                  href="#contact"
                  className="inline-flex items-center min-h-11 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium"
                >
                  Contact Me
                </Magnetic>
              </div>

              <p className="mt-5 font-mono text-[11px] text-muted-foreground">
                Press <span className="rounded border border-border px-1.5 py-0.5 text-foreground">Ctrl</span>{" "}
                + <span className="rounded border border-border px-1.5 py-0.5 text-foreground">K</span> to
                navigate anywhere
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Kali Linux", "C++", "MySQL", "Arduino", "Ubuntu"].map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-5">
              <GlowCard className="overflow-hidden p-2" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img
                  src={portrait}
                  alt="Portrait of Muhammad Siam Rahaman Nirob"
                  className="aspect-square w-full rounded-lg object-cover"
                  width={640}
                  height={640}
                  loading="eager"
                  decoding="async"
                />
                <div className="flex items-center justify-between px-3 py-3 font-mono text-[11px]">
                  <span className="text-foreground">Software Engineer</span>
                  <span className="text-primary">cyber security</span>
                </div>
              </GlowCard>
              <SystemSnapshot />
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="About"
                title="Learning systems by taking them apart."
                lead="Software Engineering undergraduate at Daffodil International University building a foundation in cyber security, systems and automation."
              />
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <Reveal delay={80}>
                <GlowCard className="p-7">
                  <h3 className="mono-label">The short story</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    I'm a Software Engineering undergraduate at Daffodil International University.
                    My focus is cyber security and systems: I run a triple-boot workstation so I can
                    move between Windows 11, Ubuntu and Kali Linux daily — practising security
                    fundamentals on one side, automation on the other, and learning what actually
                    breaks in between.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Alongside the degree I build embedded and database-driven projects, and I keep
                    an IT operations background that taught me how real teams lose time — which is
                    exactly why I build things that remove manual steps.
                  </p>
                </GlowCard>
              </Reveal>
              <Reveal delay={160}>
                <GlowCard className="h-full p-7">
                  <h3 className="mono-label">Details</h3>
                  <dl className="mt-4 space-y-4 text-sm">
                    {[
                      ["Location", "Dhaka, Bangladesh"],
                      ["Passionate about", "Cyber Security"],
                      ["Languages", "Bengali (native) · English (fluent)"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                          {k}
                        </dt>
                        <dd className="mt-1 text-foreground">{v}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        Profiles
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {SOCIALS.map((s) => (
                          <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                          >
                            {s.label}
                          </a>
                        ))}
                      </dd>
                    </div>
                  </dl>


                </GlowCard>
              </Reveal>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <Reveal delay={60}>
                <AsciiDiagram
                  title="How I approach a system"
                  lines={[
                    "OBSERVE  →  how it behaves",
                    "   ↓",
                    "BREAK    →  isolate the failing part",
                    "   ↓",
                    "BUILD    →  smallest working solution",
                    "   ↓",
                    "TEST     →  repeat until stable",
                    "   ↓",
                    "DOCUMENT →  so it is repeatable",
                  ]}
                />
              </Reveal>
              <Reveal delay={120}>
                <EngineeringPhilosophy />
              </Reveal>
            </div>

          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Capabilities"
                title="A toolkit built on fundamentals, not trends."
                lead="Programming and databases at the core, Linux and security as the specialisation, embedded automation and AI tooling as the multipliers."
              />
            </Reveal>

            <div className="mt-12">
              <Reveal delay={60}>
                <EvidenceStrip />
              </Reveal>
            </div>

            <div className="mt-6">
              <Reveal delay={100}>
                <CapabilityStack />
              </Reveal>
            </div>

            <Reveal delay={140}>
              <details className="mt-6 rounded-xl border border-border bg-surface/40 p-6">
                <summary className="mono-label cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Self-assessed comfort level (secondary signal)
                </summary>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {proficiency.map((p) => (
                    <div key={p.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm">{p.label}</span>
                        <span className="font-mono text-xs text-muted-foreground">{p.value}%</span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-muted-foreground/60"
                          style={{ width: `${p.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </Reveal>
          </div>
        </section>


        {/* WORK */}
        <section id="work" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Selected work"
                title="Things I built end to end."
                lead="Hardware and systems — click any project to read the full case study: architecture, challenges and how they were solved."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <GlowCard as="article" className="flex h-full flex-col p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-[11px] text-primary">
                        {p.tag}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{p.state}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-border bg-surface/40 p-4">
                        <span className="mono-label">Problem</span>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {p.problem}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border bg-surface/40 p-4">
                        <span className="mono-label">Result</span>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {p.outcome}
                        </p>
                      </div>
                    </div>

                    <span className="mono-label mt-5 block">Key features</span>
                    <ul className="mt-3 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <span className="mono-label mt-5 block">My contribution</span>
                    <ul className="mt-3 space-y-2.5">
                      {p.contribution.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                      {p.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setOpenProject(p)}
                        className="rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                      >
                        Read case study
                      </button>
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="size-3.5" /> View source
                      </a>
                      {p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-medium text-primary"
                        >
                          <ExternalLink className="size-3.5" /> Live demo
                        </a>
                      ) : null}
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Experience"
                title="Hands-on before the degree."
                lead="IT operations and technical support — the work that built the discipline I now bring to engineering."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal delay={80}>
                <GlowCard className="p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">Operations Support</h3>
                    <span className="font-mono text-xs text-primary">6 Months</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    GlobalTech IT · Dhaka, Bangladesh
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {[
                      "Collaborated with cross-functional teams to streamline tech-support workflows.",
                      "Resolved client inquiries efficiently while documenting recurring issues.",
                      "Handled hardware diagnostics, OS setup and end-user system maintenance.",
                    ].map((t) => (
                      <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
              <Reveal delay={160}>
                <GlowCard className="p-7">
                  <span className="mono-label">Currently</span>
                  <h3 className="mt-3 text-xl font-semibold">Self-directed security practice</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Cyber security fundamentals in Kali Linux, shell automation on Ubuntu, and
                    database-driven application design as part of the B.Sc. curriculum — documented
                    through personal labs and coursework projects.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                    {[
                      ["3", "OS daily-driven"],
                      ["2", "NTVQF Level-03"],
                      ["2024", "Started B.Sc."],
                    ].map(([n, l]) => (
                      <div key={l}>
                        <div className="text-2xl font-semibold text-primary">{n}</div>
                        <div className="mt-1 font-mono text-[11px] text-muted-foreground">{l}</div>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Education & credentials"
                title="Academic track and certified skills."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {education.map((e, i) => (
                  <Reveal key={e.title} delay={i * 70}>
                    <GlowCard className="p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold">{e.title}</h3>
                        <span className="font-mono text-xs text-primary">{e.score}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{e.org}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{e.meta}</p>
                    </GlowCard>
                  </Reveal>
                ))}
              </div>
              <div className="space-y-4">
                {certs.map((c, i) => (
                  <Reveal key={c.title} delay={i * 70}>
                    <GlowCard className="p-6">
                      <h3 className="text-base font-semibold">{c.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                    </GlowCard>
                  </Reveal>
                ))}
                <Reveal delay={160}>
                  <GlowCard className="p-6">
                    <span className="mono-label">Currently studying</span>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Cyber security fundamentals in Kali Linux, shell automation on Ubuntu, and
                      database-driven application design.
                    </p>
                  </GlowCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading kicker="Services" title="What I can take on today." />
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.n} delay={i * 60}>
                  <GlowCard className="h-full p-6 transition-transform hover:-translate-y-1">
                    <span className="font-mono text-xs text-primary">{s.n}</span>
                    <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF OF WORK */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Proof of work"
                title="What the work actually consists of."
                lead="Drawn from the projects, experience and certifications already documented on this site."
              />
            </Reveal>
            <div className="mt-12">
              <Reveal delay={60}>
                <ProofOfWork />
              </Reveal>
            </div>
            <div className="mt-6">
              <Reveal delay={100}>
                <SystemMeta />
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <Reveal>
              <SectionHeading
                kicker="Contact"
                title="Have a system worth building?"
                lead="Available for internships, junior software roles and relevant freelance opportunities. Send a message below — it reaches me directly."
              />
            </Reveal>
            <Reveal delay={60}>
              <GlowCard className="mt-10 p-6 sm:p-8">
                <ContactForm />
              </GlowCard>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Email Me
                </a>
                <a
                  href={GITHUB_UNI}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Github className="size-4" /> View GitHub
                </a>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                { label: "Phone", value: PHONE_SHOW, href: undefined },
                { label: "Location", value: "Dhaka, Bangladesh", href: undefined },
                ...SOCIALS.map((s) => ({ label: s.label, value: s.short, href: s.url as string | undefined })),
              ].map((c, i) => {
                const inner = (
                  <GlowCard className="h-full p-6 transition-colors hover:border-primary/50">
                    <span className="mono-label">{c.label}</span>
                    <p className="mt-3 break-words text-sm">{c.value}</p>
                    {c.label === "Phone" ? (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <a
                          href={`tel:${PHONE_CALL}`}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <Phone className="size-3.5" />
                          Call Me
                        </a>
                        <button
                          type="button"
                          onClick={() => void copyPhone()}
                          aria-label={`Copy phone number ${PHONE_SHOW}`}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          {phoneCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          {phoneCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    ) : null}
                  </GlowCard>
                );

                return (
                  <Reveal key={c.label} delay={i * 60}>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={100}>
              <LiveStatus />
            </Reveal>
            <Reveal delay={120}>
              <GlowCard className="mt-6 flex flex-col items-start justify-between gap-5 p-7 sm:flex-row sm:items-center">
                <div>
                  <span className="mono-label">Curriculum Vitae</span>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Full CV in PDF — education, skills, projects, experience and certifications.
                  </p>
                </div>
                <Magnetic
                  href={CV_URL}
                  download
                  className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                >
                  Download CV (PDF)
                </Magnetic>
              </GlowCard>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <nav
            aria-label="Social profiles"
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 font-mono text-xs text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} Muhammad Siam Rahaman Nirob</span>
            <span>Dhaka, Bangladesh · Ctrl + K</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
