import type { SectionAnalysisState } from "@/types/analysis";
import type { DocumentSection } from "@/types/document";
import { AlertTriangle, RotateCcw } from "lucide-react";

const riskBarColors = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-emerald-500",
};

interface SectionBarProps {
  section: DocumentSection;
  state: SectionAnalysisState;
  onClick: () => void;
  onRetry: () => void;
}

export function SectionBar({ section, state, onClick, onRetry }: SectionBarProps) {
  const sectionLabel = section.number ? `${section.number}. ${section.title}` : section.title;
  const truncatedLabel =
    sectionLabel.length > 24 ? sectionLabel.slice(0, 22) + "…" : sectionLabel;

  if (state.status === "pending") {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5">
        <div className="h-2.5 flex-1 animate-pulse rounded-full bg-gray-200" />
        <span className="w-24 shrink-0 truncate text-xs text-gray-400" title={sectionLabel}>
          {truncatedLabel}
        </span>
      </div>
    );
  }

  if (state.status === "analyzing" || state.status === "retrying") {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-blue-300" />
        </div>
        <span className="w-24 shrink-0 truncate text-xs text-gray-400" title={sectionLabel}>
          {truncatedLabel}
        </span>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5">
        <AlertTriangle className="size-3.5 shrink-0 text-red-500" />
        <span className="flex-1 truncate text-xs text-gray-600" title={sectionLabel}>
          {truncatedLabel}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRetry();
          }}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          <RotateCcw className="size-3" />
          Retry
        </button>
      </div>
    );
  }

  const { result } = state;
  const issueCount = result.issues.length;
  const barColor = riskBarColors[result.riskLevel];

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-gray-50"
      title={`${sectionLabel} — ${issueCount} issue${issueCount !== 1 ? "s" : ""}`}
    >
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: "100%" }} />
      </div>
      <span className="w-24 shrink-0 truncate text-xs text-gray-600" title={sectionLabel}>
        {truncatedLabel}
      </span>
      {issueCount > 0 && (
        <span className="shrink-0 text-[10px] font-medium text-gray-400">{issueCount}</span>
      )}
    </button>
  );
}
