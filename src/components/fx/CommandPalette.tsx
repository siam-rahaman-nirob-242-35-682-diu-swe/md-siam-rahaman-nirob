import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type PaletteAction = {
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette({ actions }: { actions: PaletteAction[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    const openEvent = () => setOpen(true);
    window.addEventListener("open-command-palette", openEvent);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openEvent);
    };
  }, []);

  const groups = Array.from(new Set(actions.map((a) => a.group)));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No matching command.</CommandEmpty>
          {groups.map((g) => (
            <CommandGroup key={g} heading={g}>
              {actions
                .filter((a) => a.group === g)
                .map((a) => (
                  <CommandItem
                    key={a.label}
                    onSelect={() => {
                      setOpen(false);
                      setTimeout(a.run, 60);
                    }}
                  >
                    <span className="font-mono text-xs text-primary">&gt;</span>
                    <span>{a.label}</span>
                    {a.hint ? (
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {a.hint}
                      </span>
                    ) : null}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      
    </CommandDialog>
  );
}
