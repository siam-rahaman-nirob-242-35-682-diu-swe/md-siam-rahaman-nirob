import { GlowCard } from "@/components/fx/GlowCard";

export type DashboardData = {
  currentFocus: string[];
  coreTechnologies: string[];
  projectCategories: string[];
  learningAreas: string[];
  environment: string[];
  services: string[];
};

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <GlowCard className="h-full p-6">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-primary" />
        <span className="mono-label">{label}</span>
      </div>
      <div className="mt-4">{children}</div>
    </GlowCard>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 font-mono text-xs text-muted-foreground">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <span className="text-primary">›</span>
          <span className="text-foreground/90">{i}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Read-only engineering dashboard.
 * Every value is passed in from existing portfolio content — nothing is invented,
 * and no metric is displayed unless it can be derived from that content.
 */
export function EngineeringDashboard({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Panel label="Current focus">
        <List items={data.currentFocus} />
      </Panel>
      <Panel label="Core technologies">
        <div className="flex flex-wrap gap-2">
          {data.coreTechnologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </Panel>
      <Panel label="Project categories">
        <List items={data.projectCategories} />
      </Panel>
      <Panel label="Learning areas">
        <List items={data.learningAreas} />
      </Panel>
      <Panel label="Current environment">
        <div className="rounded-lg border border-border bg-surface/50 p-4 font-mono text-xs leading-relaxed">
          {data.environment.map((e, i) => (
            <div key={e} className="flex gap-2 text-muted-foreground">
              <span className="text-primary">
                {i === data.environment.length - 1 ? "└──" : "├──"}
              </span>
              <span className="text-foreground/90">{e}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel label="Available services">
        <List items={data.services} />
      </Panel>
    </div>
  );
}
