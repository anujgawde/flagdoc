import { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw } from "lucide-react";
import type { SectionAnalysisState, RiskLevel } from "@/types/analysis";
import type { DocumentSection } from "@/types/document";
import { mockAnalysisResults, sectionAnalysisOrder, ERROR_SECTION_ID } from "@/data/analysis-data";
import { useDocument } from "@/providers/DocumentProvider";
import { SectionBar } from "./SectionBar";

interface RiskOverviewProps {
  onSectionSelect: (sectionId: string) => void;
}

export function RiskOverview({ onSectionSelect }: RiskOverviewProps) {
  const doc = useDocument();
  const sections = doc.getSections();
  const [sectionStates, setSectionStates] = useState<Record<string, SectionAnalysisState>>({});
  const hasStarted = useRef(false);

  const analyzeSection = useCallback(
    (sectionId: string, isRetry = false) => {
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: { status: isRetry ? "retrying" : "analyzing" },
      }));

      const delay = 600 + Math.random() * 900;

      setTimeout(() => {
        if (sectionId === ERROR_SECTION_ID && !isRetry) {
          setSectionStates((prev) => ({
            ...prev,
            [sectionId]: { status: "error", message: "Analysis timed out — section too complex" },
          }));
        } else {
          const result = mockAnalysisResults[sectionId];
          if (result) {
            setSectionStates((prev) => ({
              ...prev,
              [sectionId]: { status: "complete", result },
            }));
          } else {
            setSectionStates((prev) => ({
              ...prev,
              [sectionId]: {
                status: "complete",
                result: {
                  sectionId,
                  riskLevel: "low" as RiskLevel,
                  issues: [],
                  summary: "No issues found.",
                },
              },
            }));
          }
        }
      }, delay);
    },
    [],
  );

  const runAnalysis = useCallback(() => {
    const initial: Record<string, SectionAnalysisState> = {};
    for (const id of sectionAnalysisOrder) {
      initial[id] = { status: "pending" };
    }
    setSectionStates(initial);

    sectionAnalysisOrder.forEach((sectionId, index) => {
      setTimeout(() => {
        analyzeSection(sectionId);
      }, index * 400);
    });
  }, [analyzeSection]);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      runAnalysis();
    }
  }, [runAnalysis]);

  const completedSections = Object.values(sectionStates).filter(
    (s) => s.status === "complete",
  );
  const totalIssues = completedSections.reduce(
    (sum, s) => sum + (s.status === "complete" ? s.result.issues.length : 0),
    0,
  );
  const highCount = completedSections.reduce(
    (sum, s) =>
      sum +
      (s.status === "complete"
        ? s.result.issues.filter((i) => i.riskLevel === "high").length
        : 0),
    0,
  );
  const medCount = completedSections.reduce(
    (sum, s) =>
      sum +
      (s.status === "complete"
        ? s.result.issues.filter((i) => i.riskLevel === "medium").length
        : 0),
    0,
  );
  const lowCount = completedSections.reduce(
    (sum, s) =>
      sum +
      (s.status === "complete"
        ? s.result.issues.filter((i) => i.riskLevel === "low").length
        : 0),
    0,
  );

  const isAnalyzing = Object.values(sectionStates).some(
    (s) => s.status === "pending" || s.status === "analyzing" || s.status === "retrying",
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2.5">
        <div>
          <h3 className="text-xs font-semibold text-gray-900">Risk overview</h3>
          <p className="mt-0.5 text-[10px] text-gray-500">
            {isAnalyzing ? (
              "Analyzing document…"
            ) : (
              <>
                {totalIssues} issue{totalIssues !== 1 ? "s" : ""}
                {highCount > 0 && (
                  <span className="text-red-600"> · {highCount} high</span>
                )}
                {medCount > 0 && (
                  <span className="text-amber-600"> · {medCount} med</span>
                )}
                {lowCount > 0 && (
                  <span className="text-emerald-600"> · {lowCount} low</span>
                )}
              </>
            )}
          </p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40"
          title="Re-run analysis"
        >
          <RotateCcw className={`size-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col py-1">
        {sectionAnalysisOrder.map((sectionId) => {
          const section = sections.find((s) => s.id === sectionId);
          if (!section) return null;
          const state = sectionStates[sectionId] ?? { status: "pending" };

          return (
            <SectionBar
              key={sectionId}
              section={section}
              state={state}
              onClick={() => {
                if (state.status === "complete") {
                  doc.navigateToSection(sectionId);
                  onSectionSelect(sectionId);
                }
              }}
              onRetry={() => analyzeSection(sectionId, true)}
            />
          );
        })}
      </div>
    </div>
  );
}
