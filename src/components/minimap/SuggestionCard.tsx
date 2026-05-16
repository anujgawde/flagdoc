import { useState, useEffect, useCallback, useRef } from "react";
import { Check, X, ChevronRight, Undo2 } from "lucide-react";
import type { SuggestionIssue, CardState } from "@/types/analysis";
import { useDocument } from "@/providers/DocumentProvider";
import { RiskBadge } from "./RiskBadge";
import { DiffPreview } from "./DiffPreview";

interface SuggestionCardProps {
  issue: SuggestionIssue;
  onStateChange?: (state: CardState) => void;
}

const UNDO_DURATION = 5;

export function SuggestionCard({ issue, onStateChange }: SuggestionCardProps) {
  const doc = useDocument();
  const [state, setState] = useState<CardState>({ status: "idle" });
  const [explanationOpen, setExplanationOpen] = useState(false);
  const changeIdRef = useRef<string | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateState = useCallback(
    (next: CardState) => {
      setState(next);
      onStateChange?.(next);
    },
    [onStateChange],
  );

  const clearUndoTimer = useCallback(() => {
    if (undoTimerRef.current) {
      clearInterval(undoTimerRef.current);
      undoTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearUndoTimer(), [clearUndoTimer]);

  const handleAccept = useCallback(() => {
    updateState({ status: "accepting" });

    setTimeout(() => {
      const changeId = doc.insertTrackedChange({
        sectionId: issue.sectionId,
        paragraphId: issue.paragraphId,
        originalText: issue.originalText,
        newText: issue.suggestedText,
      });
      changeIdRef.current = changeId;

      updateState({ status: "accepted", undoTimeRemaining: UNDO_DURATION });

      undoTimerRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.status !== "accepted") {
            clearUndoTimer();
            return prev;
          }
          const next = prev.undoTimeRemaining - 1;
          if (next <= 0) {
            clearUndoTimer();
            return prev;
          }
          return { status: "accepted", undoTimeRemaining: next };
        });
      }, 1000);
    }, 150);
  }, [doc, issue, updateState, clearUndoTimer]);

  const handleUndo = useCallback(() => {
    clearUndoTimer();
    if (changeIdRef.current) {
      doc.removeTrackedChange(changeIdRef.current);
      changeIdRef.current = null;
    }
    updateState({ status: "undoing" });
    setTimeout(() => updateState({ status: "idle" }), 150);
  }, [doc, updateState, clearUndoTimer]);

  const handleReject = useCallback(() => {
    updateState({ status: "rejecting" });
    setTimeout(() => updateState({ status: "rejected" }), 200);
  }, [updateState]);

  const handleMouseEnter = useCallback(() => {
    if (state.status === "idle") {
      const text = issue.originalText;
      const section = doc.getSections().find((s) => s.id === issue.sectionId);
      if (!section) return;

      const allParagraphs = [...section.paragraphs, ...section.subsections.flatMap((s) => s.paragraphs)];
      const paragraph = allParagraphs.find((p) => p.id === issue.paragraphId);
      if (!paragraph) return;

      const startOffset = paragraph.text.indexOf(text);
      if (startOffset !== -1) {
        doc.highlightRange(issue.sectionId, issue.paragraphId, startOffset, startOffset + text.length);
      }
    }
  }, [doc, issue, state.status]);

  const handleMouseLeave = useCallback(() => {
    doc.clearHighlight();
  }, [doc]);

  if (state.status === "rejected") {
    return null;
  }

  if (state.status === "accepted" || state.status === "accepting") {
    return (
      <div className="border-b border-gray-100 px-3 py-2.5 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-emerald-100">
              <Check className="size-3 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              Applied — {issue.title}
            </span>
          </div>
          {state.status === "accepted" && state.undoTimeRemaining > 0 && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              <Undo2 className="size-3" />
              Undo · {state.undoTimeRemaining}s
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-b border-gray-100 transition-all duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleAccept();
        if (e.key === "Escape") handleReject();
      }}
    >
      <div className="px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <RiskBadge level={issue.riskLevel} />
          <span className="text-xs font-semibold text-gray-900">{issue.title}</span>
        </div>

        <DiffPreview original={issue.originalText} proposed={issue.suggestedText} />

        <button
          onClick={() => setExplanationOpen(!explanationOpen)}
          className="mt-2 flex items-center gap-1 text-[11px] font-medium text-gray-500 transition-colors hover:text-gray-700"
        >
          <ChevronRight
            className={`size-3 transition-transform duration-150 ${explanationOpen ? "rotate-90" : ""}`}
          />
          Why this matters
        </button>

        {explanationOpen && (
          <p className="mt-1.5 pl-4 text-[12px] leading-relaxed text-gray-600">
            {issue.explanation}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2">
        <button
          onClick={handleAccept}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
        >
          <div className="flex size-4 items-center justify-center rounded-full bg-emerald-100">
            <Check className="size-2.5 text-emerald-600" />
          </div>
          Accept
        </button>
        <button
          onClick={handleReject}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
        >
          <div className="flex size-4 items-center justify-center rounded-full bg-red-100">
            <X className="size-2.5 text-red-600" />
          </div>
          Reject
        </button>
      </div>
    </div>
  );
}
