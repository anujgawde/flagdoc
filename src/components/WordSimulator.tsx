import { baaDocument } from "@/data/baa-document";
import type { LegalDocument, DocumentSection } from "@/types/document";

function SectionContent({ section }: { section: DocumentSection }) {
  return (
    <div className="mb-6">
      <h2
        className={`mb-2 font-bold ${
          section.number ? "text-sm uppercase" : "text-xs font-semibold uppercase tracking-wide text-gray-500"
        }`}
      >
        {section.number ? `${section.number}. ${section.title}` : section.title}
      </h2>
      {section.paragraphs.map((p) => (
        <p key={p.id} className="mb-2 text-xs leading-relaxed text-gray-800">
          {renderParagraphWithFlags(p.text, p.flags)}
        </p>
      ))}
      {section.subsections.map((sub) => (
        <div key={sub.id} className="mb-2 pl-4">
          <span className="text-xs font-medium text-gray-600">
            {sub.label}{" "}
          </span>
          {sub.paragraphs.map((p) => (
            <p key={p.id} className="mb-1 text-xs leading-relaxed text-gray-800">
              {renderParagraphWithFlags(p.text, p.flags)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function renderParagraphWithFlags(
  text: string,
  flags: { startOffset: number; endOffset: number }[],
) {
  if (flags.length === 0) return text;

  const sorted = [...flags].sort((a, b) => a.startOffset - b.startOffset);
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  sorted.forEach((flag, i) => {
    if (flag.startOffset > cursor) {
      parts.push(text.slice(cursor, flag.startOffset));
    }
    parts.push(
      <mark
        key={i}
        className="rounded-sm bg-yellow-100 px-0.5"
      >
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

function DocumentArea({ document }: { document: LegalDocument }) {
  return (
    <div className="mx-auto max-w-2xl px-16 py-12">
      <h1 className="mb-1 text-center text-lg font-bold">
        Business Associate Agreement
      </h1>
      <p className="mb-8 text-center text-xs text-gray-500">
        {document.parties} &mdash; Effective {document.effectiveDate}
      </p>
      {document.sections.map((section) => (
        <SectionContent key={section.id} section={section} />
      ))}
    </div>
  );
}

const ribbonTabs = ["File", "Home", "Insert", "Draw", "Design", "Layout", "References", "Mailings", "Review", "View"];

export function WordSimulator({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      {/* Title bar */}
      <div className="flex h-8 shrink-0 items-center justify-between bg-white px-3 border-b border-gray-200">
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
          <span className="text-[10px] text-gray-400">Sona Sulakian</span>
        </div>
      </div>

      {/* Ribbon tabs */}
      <div className="flex h-7 shrink-0 items-end gap-0.5 bg-white px-2 border-b border-gray-300">
        {ribbonTabs.map((tab) => (
          <button
            key={tab}
            className={`px-2.5 pb-1 text-[11px] ${
              tab === "Home"
                ? "border-b-2 border-blue-600 font-medium text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon toolbar (simplified) */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50 px-3">
        <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-700">
          <option>Calibri</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[11px] text-gray-700">
          <option>11</option>
        </select>
        <div className="flex items-center gap-1 border-l border-gray-300 pl-3">
          <button className="rounded px-1.5 py-0.5 text-[11px] font-bold text-gray-600 hover:bg-gray-200">B</button>
          <button className="rounded px-1.5 py-0.5 text-[11px] italic text-gray-600 hover:bg-gray-200">I</button>
          <button className="rounded px-1.5 py-0.5 text-[11px] text-gray-600 underline hover:bg-gray-200">U</button>
        </div>
      </div>

      {/* Rulers */}
      <div className="flex h-5 shrink-0 items-center bg-white border-b border-gray-200">
        <div className="flex-1 px-16">
          <div className="h-px bg-gray-300" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Document area */}
        <div className="flex-1 overflow-y-auto bg-gray-200">
          <div className="mx-auto my-4 max-w-3xl bg-white shadow-sm min-h-[calc(100vh-200px)]">
            <DocumentArea document={baaDocument} />
          </div>
        </div>

        {/* Task pane divider */}
        <div className="w-px bg-gray-300" />

        {/* Task pane (the actual add-in) */}
        <div className="w-96 shrink-0 bg-white">
          {children}
        </div>
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
