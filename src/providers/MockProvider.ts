import { baaDocument } from "@/data/baa-document";
import type { DocumentSection } from "@/types/document";
import type { TrackedChange } from "@/types/analysis";
import type { DocumentProvider, DocumentEventType, DocumentEventListener } from "./DocumentProvider";

export class MockDocumentProvider implements DocumentProvider {
  private listeners = new Set<DocumentEventListener>();
  private appliedChanges = new Map<string, TrackedChange>();
  private nextChangeId = 1;

  getSections(): DocumentSection[] {
    return baaDocument.sections;
  }

  navigateToSection(sectionId: string): void {
    this.emit({ type: "scroll", sectionId });
  }

  highlightRange(sectionId: string, paragraphId: string, startOffset: number, endOffset: number): void {
    this.emit({ type: "highlight", sectionId, paragraphId, startOffset, endOffset });
  }

  clearHighlight(): void {
    this.emit({ type: "clearHighlight" });
  }

  insertTrackedChange(change: Omit<TrackedChange, "id">): string {
    const id = `tc-${this.nextChangeId++}`;
    const trackedChange: TrackedChange = { ...change, id };
    this.appliedChanges.set(id, trackedChange);
    this.emit({ type: "applyChange", change: trackedChange });
    return id;
  }

  removeTrackedChange(changeId: string): void {
    this.appliedChanges.delete(changeId);
    this.emit({ type: "removeChange", changeId });
  }

  getAppliedChanges(): Map<string, TrackedChange> {
    return this.appliedChanges;
  }

  subscribe(listener: DocumentEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(event: DocumentEventType): void {
    this.listeners.forEach((listener) => listener(event));
  }
}
