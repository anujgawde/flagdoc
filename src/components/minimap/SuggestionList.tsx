import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import type { AnalysisResult, RiskLevel } from "@/types/analysis";
import { SuggestionCard } from "./SuggestionCard";
import { RiskBadge } from "./RiskBadge";

interface SuggestionListProps {
  result: AnalysisResult;
  sectionTitle: string;
  onBack: () => void;
}

type FilterLevel = "all" | RiskLevel;

const filters: { value: FilterLevel; label: string }[] = [
  { value: "all", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Med" },
  { value: "low", label: "Low" },
];

export function SuggestionList({ result, sectionTitle, onBack }: SuggestionListProps) {
  const [filter, setFilter] = useState<FilterLevel>("all");

  const filteredIssues = useMemo(
    () =>
      filter === "all"
        ? result.issues
        : result.issues.filter((i) => i.riskLevel === filter),
    [result.issues, filter],
  );

  const highCount = result.issues.filter((i) => i.riskLevel === "high").length;
  const medCount = result.issues.filter((i) => i.riskLevel === "medium").length;
  const lowCount = result.issues.filter((i) => i.riskLevel === "low").length;

  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-200 px-3 py-2.5">
        <button
          onClick={onBack}
          className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft className="size-3" />
          Risk overview
        </button>
        <h3 className="text-xs font-semibold text-gray-900">{sectionTitle}</h3>
        <p className="mt-0.5 text-[10px] text-gray-500">
          {result.issues.length} issue{result.issues.length !== 1 ? "s" : ""}
          {highCount > 0 && <span className="text-red-600"> · {highCount} high</span>}
          {medCount > 0 && <span className="text-amber-600"> · {medCount} med</span>}
          {lowCount > 0 && <span className="text-emerald-600"> · {lowCount} low</span>}
        </p>
      </div>

      {result.issues.length > 1 && (
        <div className="flex gap-1 border-b border-gray-100 px-3 py-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                filter === f.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {filteredIssues.length === 0 ? (
          <p className="px-3 py-6 text-center text-xs text-gray-400">
            No {filter} risk issues in this section.
          </p>
        ) : (
          filteredIssues.map((issue) => (
            <SuggestionCard key={issue.id} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
}
