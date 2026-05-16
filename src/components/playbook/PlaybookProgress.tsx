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
  const progress = checks.length > 0 ? (revealedCount / checks.length) * 100 : 0;

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

      {phase === "running" && (
        <div className="px-4 py-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-gray-400">
            Analyzing… {revealedCount} of {checks.length} checks
          </p>
        </div>
      )}

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
