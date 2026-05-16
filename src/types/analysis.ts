export type RiskLevel = "high" | "medium" | "low";

export interface SuggestionIssue {
  id: string;
  title: string;
  riskLevel: RiskLevel;
  originalText: string;
  suggestedText: string;
  explanation: string;
  sectionId: string;
  paragraphId: string;
}

export interface AnalysisResult {
  sectionId: string;
  riskLevel: RiskLevel;
  issues: SuggestionIssue[];
  summary: string;
}

export type CardState =
  | { status: "idle" }
  | { status: "accepting" }
  | { status: "accepted"; undoTimeRemaining: number }
  | { status: "undoing" }
  | { status: "rejecting" }
  | { status: "rejected" };

export type SectionAnalysisState =
  | { status: "pending" }
  | { status: "analyzing" }
  | { status: "complete"; result: AnalysisResult }
  | { status: "error"; message: string }
  | { status: "retrying" };

export interface DiffSegment {
  type: "equal" | "insert" | "delete";
  text: string;
}

export interface TrackedChange {
  id: string;
  sectionId: string;
  paragraphId: string;
  originalText: string;
  newText: string;
}
