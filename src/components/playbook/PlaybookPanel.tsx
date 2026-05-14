"use client";

import { useState, useEffect, useCallback } from "react";
import { playbooks, baaChecks } from "@/data/playbook-checks";
import { PlaybookSelector } from "./PlaybookSelector";
import { RunPlaybookDialog } from "./RunPlaybookDialog";
import { PlaybookProgress } from "./PlaybookProgress";
import type { Playbook, PlaybookCheck, PlaybookPhase } from "@/types/playbook";

export function PlaybookPanel({
  onFlagSelect,
}: {
  onFlagSelect: (flagId: string | null) => void;
}) {
  const [phase, setPhase] = useState<PlaybookPhase>("idle");
  const [checks, setChecks] = useState<PlaybookCheck[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(
    null,
  );

  useEffect(() => {
    if (phase !== "running") return;

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        const next = prev + 1;
        if (next >= checks.length) {
          clearInterval(interval);
          setPhase("complete");
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [phase, checks.length]);

  function handleSelectPlaybook(playbook: Playbook) {
    setSelectedPlaybook(playbook);
    setDialogOpen(true);
  }

  function handleRun() {
    setDialogOpen(false);
    setChecks(baaChecks);
    setRevealedCount(0);
    setExpandedCheckId(null);
    onFlagSelect(null);
    setPhase("running");
  }

  function handleExpandCheck(checkId: string) {
    const check = checks.find((c) => c.id === checkId);
    if (!check || check.status === "pass") return;
    setExpandedCheckId(checkId);
    onFlagSelect(check.flagId);
  }

  const handleCollapseCheck = useCallback(() => {
    setExpandedCheckId(null);
    onFlagSelect(null);
  }, [onFlagSelect]);

  function handleReset() {
    setPhase("idle");
    setChecks([]);
    setRevealedCount(0);
    setExpandedCheckId(null);
    onFlagSelect(null);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {phase === "idle" && (
        <PlaybookSelector
          playbooks={playbooks}
          onSelect={handleSelectPlaybook}
        />
      )}

      {(phase === "running" || phase === "complete") && (
        <PlaybookProgress
          checks={checks}
          revealedCount={revealedCount}
          phase={phase}
          expandedCheckId={expandedCheckId}
          onExpandCheck={handleExpandCheck}
          onCollapseCheck={handleCollapseCheck}
          onApply={handleCollapseCheck}
          onReset={handleReset}
        />
      )}

      <RunPlaybookDialog
        playbook={selectedPlaybook}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRun={handleRun}
      />
    </div>
  );
}
