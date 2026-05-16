
import { useState, useEffect, useCallback } from "react";
import { List, Map } from "lucide-react";
import { playbooks, baaChecks } from "@/data/playbook-checks";
import { mockAnalysisResults } from "@/data/analysis-data";
import { useDocument } from "@/providers/DocumentProvider";
import { PlaybookSelector } from "./PlaybookSelector";
import { RunPlaybookDialog } from "./RunPlaybookDialog";
import { PlaybookProgress } from "./PlaybookProgress";
import { RiskOverview } from "@/components/minimap/RiskOverview";
import { SuggestionList } from "@/components/minimap/SuggestionList";
import type { Playbook, PlaybookCheck, PlaybookPhase } from "@/types/playbook";

type ResultsView = "checks" | "risk-overview";

export function PlaybookPanel({
  onFlagSelect,
}: {
  onFlagSelect: (flagId: string | null) => void;
}) {
  const doc = useDocument();
  const [phase, setPhase] = useState<PlaybookPhase>("idle");
  const [checks, setChecks] = useState<PlaybookCheck[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(
    null,
  );
  const [resultsView, setResultsView] = useState<ResultsView>("checks");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

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
    setResultsView("checks");
    setSelectedSectionId(null);
    onFlagSelect(null);
  }

  if (selectedSectionId && phase === "complete") {
    const result = mockAnalysisResults[selectedSectionId];
    const section = doc.getSections().find((s) => s.id === selectedSectionId);
    if (result && section) {
      const sectionTitle = section.number
        ? `${section.number}. ${section.title}`
        : section.title;
      return (
        <div className="flex flex-1 flex-col overflow-y-auto">
          <SuggestionList
            result={result}
            sectionTitle={sectionTitle}
            onBack={() => setSelectedSectionId(null)}
          />
        </div>
      );
    }
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
        <>
          {phase === "complete" && (
            <div className="flex shrink-0 items-center border-b border-gray-200">
              <button
                onClick={() => setResultsView("checks")}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[11px] font-medium transition-colors ${
                  resultsView === "checks"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="size-3" />
                Checks
              </button>
              <button
                onClick={() => setResultsView("risk-overview")}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[11px] font-medium transition-colors ${
                  resultsView === "risk-overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Map className="size-3" />
                Risk Overview
              </button>
            </div>
          )}

          {resultsView === "checks" ? (
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
          ) : (
            <div className="flex-1 overflow-y-auto">
              <RiskOverview onSectionSelect={setSelectedSectionId} />
            </div>
          )}
        </>
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
