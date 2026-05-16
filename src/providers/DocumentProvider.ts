import { createContext, useContext } from "react";
import type { DocumentSection } from "@/types/document";
import type { TrackedChange } from "@/types/analysis";

export type DocumentEventType =
  | { type: "scroll"; sectionId: string }
  | { type: "highlight"; sectionId: string; paragraphId: string; startOffset: number; endOffset: number }
  | { type: "clearHighlight" }
  | { type: "applyChange"; change: TrackedChange }
  | { type: "removeChange"; changeId: string };

export type DocumentEventListener = (event: DocumentEventType) => void;

export interface DocumentProvider {
  getSections(): DocumentSection[];
  navigateToSection(sectionId: string): void;
  highlightRange(sectionId: string, paragraphId: string, startOffset: number, endOffset: number): void;
  clearHighlight(): void;
  insertTrackedChange(change: Omit<TrackedChange, "id">): string;
  removeTrackedChange(changeId: string): void;
  getAppliedChanges(): Map<string, TrackedChange>;
  subscribe(listener: DocumentEventListener): () => void;
}

const DocumentContext = createContext<DocumentProvider | null>(null);

export const DocumentContextProvider = DocumentContext.Provider;

export function useDocument(): DocumentProvider {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocument must be used within a DocumentProvider");
  return ctx;
}
