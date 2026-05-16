import { useState, useEffect, useRef, useCallback } from "react";
import { baaDocument } from "@/data/baa-document";
import type { LegalDocument, DocumentSection, Paragraph } from "@/types/document";
import type { TrackedChange } from "@/types/analysis";
import type { MockDocumentProvider } from "@/providers/MockProvider";

interface HighlightState {
  paragraphId: string;
  startOffset: number;
  endOffset: number;
}

function renderParagraphText(
  text: string,
  flags: { startOffset: number; endOffset: number }[],
  highlight: HighlightState | null,
  paragraphId: string,
  trackedChanges: TrackedChange[],
) {
  const changeForParagraph = trackedChanges.find((tc) => tc.paragraphId === paragraphId);

  if (changeForParagraph) {
    const { originalText, newText } = changeForParagraph;
    const idx = text.indexOf(originalText);
    if (idx !== -1) {
      return (
        <>
          {text.slice(0, idx)}
          <del className="bg-red-50 text-red-600 line-through">{originalText}</del>
          <ins className="bg-blue-50 text-blue-700 underline decoration-blue-400">{newText}</ins>
          {text.slice(idx + originalText.length)}
        </>
      );
    }
  }

  const isHighlighted = highlight && highlight.paragraphId === paragraphId;

  if (isHighlighted) {
    const { startOffset, endOffset } = highlight;
    return (
      <>
        {renderWithFlags(text.slice(0, startOffset), flags, 0)}
        <span className="bg-yellow-100 transition-colors duration-200">
          {text.slice(startOffset, endOffset)}
        </span>
        {renderWithFlags(text.slice(endOffset), flags.map(f => ({
          startOffset: f.startOffset - endOffset,
          endOffset: f.endOffset - endOffset,
        })).filter(f => f.startOffset >= 0), 0)}
      </>
    );
  }

  return renderWithFlags(text, flags, 0);
}

function renderWithFlags(
  text: string,
  flags: { startOffset: number; endOffset: number }[],
  offset: number,
) {
  const relevant = flags
    .map((f) => ({ startOffset: f.startOffset - offset, endOffset: f.endOffset - offset }))
    .filter((f) => f.startOffset >= 0 && f.startOffset < text.length);

  if (relevant.length === 0) return text;

  const sorted = [...relevant].sort((a, b) => a.startOffset - b.startOffset);
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  sorted.forEach((flag, i) => {
    if (flag.startOffset > cursor) {
      parts.push(text.slice(cursor, flag.startOffset));
    }
    parts.push(
      <mark key={i} className="rounded-sm bg-pink-100 px-0.5 text-pink-900">
        {text.slice(flag.startOffset, flag.endOffset)}
      </mark>,
    );
    cursor = flag.endOffset;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}

function ParagraphView({
  paragraph,
  highlight,
  trackedChanges,
  className,
}: {
  paragraph: Paragraph;
  highlight: HighlightState | null;
  trackedChanges: TrackedChange[];
  className?: string;
}) {
  return (
    <p className={className}>
      {renderParagraphText(
        paragraph.text,
        paragraph.flags,
        highlight,
        paragraph.id,
        trackedChanges,
      )}
    </p>
  );
}

function SectionContent({
  section,
  highlight,
  trackedChanges,
}: {
  section: DocumentSection;
  highlight: HighlightState | null;
  trackedChanges: TrackedChange[];
}) {
  return (
    <div id={`doc-section-${section.id}`} className="mb-6">
      <h2
        className={`mb-2 font-bold ${
          section.number
            ? "text-sm uppercase"
            : "text-xs font-semibold uppercase tracking-wide text-gray-500"
        }`}
      >
        {section.number ? `${section.number}. ${section.title}` : section.title}
      </h2>
      {section.paragraphs.map((p) => (
        <ParagraphView
          key={p.id}
          paragraph={p}
          highlight={highlight}
          trackedChanges={trackedChanges}
          className="mb-2 text-xs leading-relaxed text-gray-800"
        />
      ))}
      {section.subsections.map((sub) => (
        <div key={sub.id} className="mb-2 pl-4">
          <span className="text-xs font-medium text-gray-600">{sub.label} </span>
          {sub.paragraphs.map((p) => (
            <ParagraphView
              key={p.id}
              paragraph={p}
              highlight={highlight}
              trackedChanges={trackedChanges}
              className="mb-1 inline text-xs leading-relaxed text-gray-800"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function DocumentArea({
  document,
  highlight,
  trackedChanges,
}: {
  document: LegalDocument;
  highlight: HighlightState | null;
  trackedChanges: TrackedChange[];
}) {
  return (
    <div className="mx-auto max-w-2xl px-16 py-12">
      <h1 className="mb-1 text-center text-lg font-bold">
        Business Associate Agreement
      </h1>
      <p className="mb-8 text-center text-xs text-gray-500">
        {document.parties} &mdash; Effective {document.effectiveDate}
      </p>
      {document.sections.map((section) => (
        <SectionContent
          key={section.id}
          section={section}
          highlight={highlight}
          trackedChanges={trackedChanges}
        />
      ))}
    </div>
  );
}

const ribbonTabs = [
  "File",
  "Home",
  "Insert",
  "Draw",
  "Design",
  "Layout",
  "References",
  "Mailings",
  "Review",
  "View",
];

export function WordSimulator({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider: MockDocumentProvider;
}) {
  const docRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<HighlightState | null>(null);
  const [trackedChanges, setTrackedChanges] = useState<TrackedChange[]>([]);

  useEffect(() => {
    const unsub = provider.subscribe((event) => {
      switch (event.type) {
        case "scroll": {
          const el = docRef.current?.querySelector(`#doc-section-${event.sectionId}`);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "highlight":
          setHighlight({
            paragraphId: event.paragraphId,
            startOffset: event.startOffset,
            endOffset: event.endOffset,
          });
          break;
        case "clearHighlight":
          setHighlight(null);
          break;
        case "applyChange":
          setTrackedChanges((prev) => [...prev, event.change]);
          break;
        case "removeChange":
          setTrackedChanges((prev) => prev.filter((c) => c.id !== event.changeId));
          break;
      }
    });
    return unsub;
  }, [provider]);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      {/* Title bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="size-3 rounded-full bg-red-400" />
            <div className="size-3 rounded-full bg-yellow-400" />
            <div className="size-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-4 text-xs text-gray-600">
            University Business Associate Agreement.docx
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded px-2 py-0.5 text-[10px] text-gray-500 hover:bg-gray-100">
            Comments
          </button>
          <button className="rounded px-2 py-0.5 text-[10px] text-gray-500 hover:bg-gray-100">
            Editing
          </button>
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-purple-600 text-[9px] font-semibold text-white">
              SS
            </div>
            <span className="text-[10px] text-gray-500">Sona Sulakian</span>
          </div>
        </div>
      </div>

      {/* Ribbon tabs */}
      <div className="flex h-7 shrink-0 items-end gap-0.5 border-b border-gray-300 bg-white px-2">
        {ribbonTabs.map((tab) => (
          <button
            key={tab}
            className={`px-2.5 pb-1 text-[11px] ${
              tab === "References"
                ? "border-b-2 border-blue-600 font-medium text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon toolbar */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50 px-3">
        <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-700">
          <option>Calibri</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[11px] text-gray-700">
          <option>11</option>
        </select>
        <div className="flex items-center gap-1 border-l border-gray-300 pl-3">
          <button className="rounded px-1.5 py-0.5 text-[11px] font-bold text-gray-600 hover:bg-gray-200">
            B
          </button>
          <button className="rounded px-1.5 py-0.5 text-[11px] italic text-gray-600 hover:bg-gray-200">
            I
          </button>
          <button className="rounded px-1.5 py-0.5 text-[11px] text-gray-600 underline hover:bg-gray-200">
            U
          </button>
        </div>
        <div className="flex items-center gap-1 border-l border-gray-300 pl-3">
          <button className="rounded px-1.5 py-0.5 text-[10px] text-gray-500 hover:bg-gray-200">
            AaBbCc
          </button>
          <button className="rounded px-1.5 py-0.5 text-[10px] text-gray-500 hover:bg-gray-200">
            AaBbCc
          </button>
        </div>
      </div>

      {/* Ruler */}
      <div className="flex h-5 shrink-0 items-center border-b border-gray-200 bg-white">
        <div className="flex-1 px-16">
          <div className="h-px bg-gray-300" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Document area */}
        <div ref={docRef} className="flex-1 overflow-y-auto bg-gray-200">
          <div className="mx-auto my-4 min-h-[calc(100vh-200px)] max-w-3xl bg-white shadow-sm">
            <DocumentArea
              document={baaDocument}
              highlight={highlight}
              trackedChanges={trackedChanges}
            />
          </div>
        </div>

        {/* Task pane divider */}
        <div className="w-px bg-gray-300" />

        {/* Task pane */}
        <div className="w-96 shrink-0 overflow-hidden bg-white">{children}</div>
      </div>

      {/* Status bar */}
      <div className="flex h-6 shrink-0 items-center justify-between border-t border-gray-300 bg-white px-3">
        <span className="text-[10px] text-gray-400">Page 1 of 4</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400">English (United States)</span>
          <span className="text-[10px] text-gray-400">Accessibility: Good</span>
        </div>
      </div>
    </div>
  );
}
