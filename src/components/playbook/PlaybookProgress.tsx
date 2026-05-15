
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckItem } from "./CheckItem";
import { CheckDetail } from "./CheckDetail";
import { BoundsResults } from "./BoundsResults";
import type { PlaybookCheck, PlaybookPhase } from "@/types/playbook";

export function PlaybookProgress({
  checks,
  revealedCount,
  phase,
  expandedCheckId,
  onExpandCheck,
  onCollapseCheck,
  onApply,
  onReset,
}: {
  checks: PlaybookCheck[];
  revealedCount: number;
  phase: PlaybookPhase;
  expandedCheckId: string | null;
  onExpandCheck: (checkId: string) => void;
  onCollapseCheck: () => void;
  onApply: (checkId: string) => void;
  onReset: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "running") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [revealedCount, phase]);

  const expandedCheck = expandedCheckId
    ? checks.find((c) => c.id === expandedCheckId) ?? null
    : null;

  if (expandedCheck) {
    return (
      <CheckDetail
        check={expandedCheck}
        onClose={onCollapseCheck}
        onApply={() => onApply(expandedCheck.id)}
      />
    );
  }

  const visible = checks.slice(0, revealedCount);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Progress</h2>
        {phase === "complete" && (
          <Button variant="ghost" size="icon-xs" onClick={onReset}>
            <ArrowLeft className="size-3.5" />
          </Button>
        )}
      </div>

      {phase === "complete" && <BoundsResults checks={checks} />}

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {visible.map((check) => (
            <CheckItem
              key={check.id}
              check={check}
              onClick={() => onExpandCheck(check.id)}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
