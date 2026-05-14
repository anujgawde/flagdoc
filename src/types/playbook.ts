export type CheckStatus = "pass" | "fail" | "warning" | "pending";

export interface PlaybookCheck {
  id: string;
  label: string;
  status: CheckStatus;
  flagId: string | null;
  issue: string;
  suggestedFix: string;
}

export interface Playbook {
  id: string;
  name: string;
}

export type PlaybookPhase = "idle" | "running" | "complete";
