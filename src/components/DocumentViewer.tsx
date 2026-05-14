"use client";

import type {
  LegalDocument,
  DocumentSection,
  Subsection,
  Paragraph,
} from "@/types/document";

function renderFlaggedText(paragraph: Paragraph) {
  const { text, flags } = paragraph;
  if (flags.length === 0) return text;

  const sorted = [...flags].sort((a, b) => a.startOffset - b.startOffset);
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const f of sorted) {
    if (f.startOffset > cursor) {
      nodes.push(text.slice(cursor, f.startOffset));
    }
    nodes.push(
      <mark
        key={f.id}
        data-flag-id={f.id}
        title={f.label}
        className="cursor-pointer bg-pink-200/80 px-0.5"
      >
        {text.slice(f.startOffset, f.endOffset)}
      </mark>,
    );
    cursor = f.endOffset;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function ParagraphBlock({ paragraph }: { paragraph: Paragraph }) {
  return (
    <p className="text-sm leading-7 text-gray-800">
      {renderFlaggedText(paragraph)}
    </p>
  );
}

function SubsectionBlock({ subsection }: { subsection: Subsection }) {
  return (
    <div className="flex gap-3 pl-8">
      <span className="shrink-0 text-sm leading-7 text-gray-800">
        {subsection.label}
      </span>
      <div className="flex flex-col gap-4">
        {subsection.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} paragraph={p} />
        ))}
      </div>
    </div>
  );
}

function SectionBlock({ section }: { section: DocumentSection }) {
  const heading =
    section.number !== null
      ? `${section.number}. ${section.title}`
      : section.title;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
        {heading}
      </h2>
      {section.paragraphs.map((p) => (
        <ParagraphBlock key={p.id} paragraph={p} />
      ))}
      {section.subsections.map((sub) => (
        <SubsectionBlock key={sub.id} subsection={sub} />
      ))}
    </section>
  );
}

export function DocumentViewer({ document }: { document: LegalDocument }) {
  return (
    <div className="h-full bg-white px-20 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {document.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{document.parties}</p>
          <p className="mt-1 text-xs text-gray-400">
            Effective Date: {document.effectiveDate}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {document.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
