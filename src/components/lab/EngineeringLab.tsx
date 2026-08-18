import { useCallback, useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/fx/GlowCard";

const TABS = [
  "Algorithm",
  "Query flow",
  "Architecture",
  "Linux environment",
  "Embedded signal",
  "Security basics",
] as const;
type Tab = (typeof TABS)[number];

/* ---------------- Algorithm visualizer (bubble sort, self-contained) --------------- */

const START = [34, 12, 78, 45, 8, 61, 23, 90, 17, 52];

function AlgorithmViz() {
  const [bars, setBars] = useState<number[]>(START);
  const [pair, setPair] = useState<[number, number]>([-1, -1]);
  const [running, setRunning] = useState(false);
  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const stop = useRef(false);

  const reset = useCallback(() => {
    stop.current = true;
    setRunning(false);
    setBars(START);
    setPair([-1, -1]);
    setSwaps(0);
    setComparisons(0);
  }, []);

  useEffect(() => () => void (stop.current = true), []);

  const run = useCallback(async () => {
    if (running) return;
    stop.current = false;
    setRunning(true);
    const a = [...bars];
    let sw = 0;
    let cp = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (stop.current) return setRunning(false);
        setPair([j, j + 1]);
        cp++;
        setComparisons(cp);
        await new Promise((r) => setTimeout(r, 55));
        if (a[j]! > a[j + 1]!) {
          [a[j], a[j + 1]] = [a[j + 1]!, a[j]!];
          sw++;
          setSwaps(sw);
          setBars([...a]);
        }
      }
    }
    setPair([-1, -1]);
    setRunning(false);
  }, [bars, running]);

  const max = Math.max(...bars);

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Bubble sort, stepped one comparison at a time — a teaching visual for programming
        fundamentals. Nothing here reads or reports any personal data.
      </p>
      <div className="mt-6 flex h-44 items-end gap-1.5 rounded-xl border border-border bg-surface/40 p-4">
        {bars.map((b, i) => (
          <div
            key={`${b}-${i}`}
            className="flex-1 rounded-t transition-all duration-150"
            style={{
              height: `${(b / max) * 100}%`,
              background:
                i === pair[0] || i === pair[1] ? "var(--signal)" : "var(--gradient-signal)",
              opacity: i === pair[0] || i === pair[1] ? 1 : 0.65,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
        <button
          onClick={() => void run()}
          disabled={running}
          className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
        >
          {running ? "Sorting…" : "Run sort"}
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-border px-4 py-2 text-xs transition-colors hover:text-foreground"
        >
          Reset
        </button>
        <span>
          comparisons <span className="text-primary">{comparisons}</span>
        </span>
        <span>
          swaps <span className="text-primary">{swaps}</span>
        </span>
        <span>O(n²) worst case</span>
      </div>
    </div>
  );
}

/* ---------------------------- Query flow visualizer ---------------------------- */

const QUERY_STAGES = [
  { k: "FROM", d: "Resolve the source table and its row set." },
  { k: "WHERE", d: "Filter rows before anything is grouped." },
  { k: "GROUP BY", d: "Collapse remaining rows into groups." },
  { k: "HAVING", d: "Filter the groups themselves." },
  { k: "SELECT", d: "Project the columns and expressions." },
  { k: "ORDER BY", d: "Sort the projected result." },
  { k: "LIMIT", d: "Trim the result to the requested window." },
];

function QueryFlow() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Logical execution order of a SQL statement — the mental model behind normalized schema and
        query design. Step through it to see why <span className="font-mono">WHERE</span> can never
        see an alias created in <span className="font-mono">SELECT</span>.
      </p>
      <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface/50 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
{`SELECT slot_row, COUNT(*) AS taken
FROM parking_session
WHERE exit_time IS NULL
GROUP BY slot_row
HAVING COUNT(*) > 1
ORDER BY taken DESC
LIMIT 5;`}
      </pre>
      <div className="mt-5 flex flex-wrap gap-2">
        {QUERY_STAGES.map((s, i) => (
          <button
            key={s.k}
            onClick={() => setStep(i)}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
              i === step
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {i + 1}. {s.k}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-surface/40 p-5 text-sm text-muted-foreground">
        <span className="font-mono text-primary">{QUERY_STAGES[step]!.k}</span> —{" "}
        {QUERY_STAGES[step]!.d}
      </div>
    </div>
  );
}

/* --------------------------- Architecture visualizer --------------------------- */

export type LabProject = { title: string; flow: string[] };

function ArchitectureViz({ projects }: { projects: LabProject[] }) {
  const [idx, setIdx] = useState(0);
  const p = projects[idx];
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Interactive view of the architecture already documented in each case study — no components
        are inferred or added.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {projects.map((pr, i) => (
          <button
            key={pr.title}
            onClick={() => setIdx(i)}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
              i === idx
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {pr.title}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {p?.flow.map((line, i) => (
          <div key={line} className="flex items-start gap-3">
            <span className="mt-2 font-mono text-[10px] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 rounded-xl border border-border bg-surface/40 p-4 font-mono text-xs leading-relaxed text-muted-foreground transition-colors hover:border-primary/50">
              {line}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Linux environment ------------------------------ */

const BOOT_CHAIN = [
  { k: "Firmware / EFI", d: "Dedicated EFI partition holds the boot entries." },
  { k: "GRUB", d: "Bootloader menu presenting the three installed systems." },
  { k: "Windows 11", d: "Daily productivity side of the workstation." },
  { k: "Ubuntu", d: "Automation host — bash scripts and cron schedules." },
  { k: "Kali Linux", d: "Isolated environment for security fundamentals practice." },
];

function LinuxEnv() {
  const [sel, setSel] = useState(1);
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Concept view of the triple-boot workstation described in the Security Lab case study.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-border bg-surface/50 p-4 font-mono text-xs">
          {BOOT_CHAIN.map((b, i) => (
            <button
              key={b.k}
              onClick={() => setSel(i)}
              className={`flex w-full gap-2 py-1.5 text-left transition-colors ${
                sel === i ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-primary">
                {i === BOOT_CHAIN.length - 1 ? "└──" : "├──"}
              </span>
              <span>{b.k}</span>
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-5">
          <span className="mono-label">{BOOT_CHAIN[sel]!.k}</span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{BOOT_CHAIN[sel]!.d}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Embedded signal ------------------------------- */

const PIPELINE = ["Sensor", "Debounce", "State table", "Logic", "Actuator", "Display"];

function EmbeddedSignal() {
  const [tick, setTick] = useState(0);
  const [live, setLive] = useState(true);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setTick((t) => (t + 1) % PIPELINE.length), 700);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Signal path of the embedded parking system: a reading only becomes an action after it passes
        through debounce and the single in-memory state table.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {PIPELINE.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`rounded-lg border px-4 py-3 font-mono text-[11px] transition-all duration-300 ${
                i === tick
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-surface/40 text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {i < PIPELINE.length - 1 ? <span className="text-primary/60">→</span> : null}
          </div>
        ))}
      </div>
      <button
        onClick={() => setLive((l) => !l)}
        className="mt-5 rounded-full border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {live ? "Pause signal" : "Resume signal"}
      </button>
    </div>
  );
}

/* ------------------------------- Security basics ------------------------------- */

const DEFENSIVE = [
  {
    k: "CIA triad",
    d: "Confidentiality, integrity and availability — the three properties every defensive control is measured against.",
  },
  {
    k: "Least privilege",
    d: "Accounts and services get only the permissions they need, so one compromised process cannot reach everything.",
  },
  {
    k: "Defence in depth",
    d: "Multiple independent layers, so a single failed control is not a single point of failure.",
  },
  {
    k: "Patch & update hygiene",
    d: "Most real incidents exploit known, already-fixed issues; timely updates remove that surface.",
  },
  {
    k: "Backups & recovery drills",
    d: "A backup that has never been restored is a hypothesis, not a safeguard.",
  },
  {
    k: "Logging & monitoring",
    d: "You cannot respond to what you never recorded — logs turn incidents into something reviewable.",
  },
];

function SecurityBasics() {
  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Educational, defence-oriented fundamentals only. This lab contains no exploits, attack
        tooling or offensive demonstrations of any kind.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {DEFENSIVE.map((d) => (
          <div
            key={d.k}
            className="rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-primary/50"
          >
            <span className="mono-label">{d.k}</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------- Shell ----------------------------------- */

export function EngineeringLab({ projects }: { projects: LabProject[] }) {
  const [tab, setTab] = useState<Tab>("Algorithm");

  return (
    <GlowCard className="p-7">
      <div className="flex flex-wrap gap-1.5 border-b border-border pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {tab === "Algorithm" ? <AlgorithmViz /> : null}
        {tab === "Query flow" ? <QueryFlow /> : null}
        {tab === "Architecture" ? <ArchitectureViz projects={projects} /> : null}
        {tab === "Linux environment" ? <LinuxEnv /> : null}
        {tab === "Embedded signal" ? <EmbeddedSignal /> : null}
        {tab === "Security basics" ? <SecurityBasics /> : null}
      </div>
    </GlowCard>
  );
}
