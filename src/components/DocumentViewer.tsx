"use client";

import { useEffect } from "react";
import type {
  LegalDocument,
  DocumentSection,
  Subsection,
  Paragraph,
} from "@/types/document";

function renderFlaggedText(paragraph: Paragraph, activeFlagId: string | null) {
  const { text, flags } = paragraph;
  if (flags.length === 0) return text;

  const sorted = [...flags].sort((a, b) => a.startOffset - b.startOffset);
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const f of sorted) {
    if (f.startOffset > cursor) {
      nodes.push(text.slice(cursor, f.startOffset));
    }
    const isActive = f.id === activeFlagId;
    nodes.push(
      <mark
        key={f.id}
        data-flag-id={f.id}
        title={f.label}
        className={`cursor-pointer px-0.5 transition-all ${
          isActive
            ? "bg-pink-300 ring-2 ring-blue-600"
            : "bg-pink-200/80"
        }`}
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

function ParagraphBlock({
  paragraph,
  activeFlagId,
}: {
  paragraph: Paragraph;
  activeFlagId: string | null;
}) {
  return (
    <p className="text-sm leading-7 text-gray-800">
      {renderFlaggedText(paragraph, activeFlagId)}
    </p>
  );
}

function SubsectionBlock({
  subsection,
  activeFlagId,
}: {
  subsection: Subsection;
  activeFlagId: string | null;
}) {
  return (
    <div className="flex gap-3 pl-8">
      <span className="shrink-0 text-sm leading-7 text-gray-800">
        {subsection.label}
      </span>
      <div className="flex flex-col gap-4">
        {subsection.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} paragraph={p} activeFlagId={activeFlagId} />
        ))}
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  activeFlagId,
}: {
  section: DocumentSection;
  activeFlagId: string | null;
}) {
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
        <ParagraphBlock key={p.id} paragraph={p} activeFlagId={activeFlagId} />
      ))}
      {section.subsections.map((sub) => (
        <SubsectionBlock key={sub.id} subsection={sub} activeFlagId={activeFlagId} />
      ))}
    </section>
  );
}

export function DocumentViewer({
  document,
  activeFlagId = null,
}: {
  document: LegalDocument;
  activeFlagId?: string | null;
}) {
  useEffect(() => {
    if (!activeFlagId) return;
    const el = window.document.querySelector(
      `[data-flag-id="${activeFlagId}"]`,
    );
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeFlagId]);

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
            <SectionBlock key={section.id} section={section} activeFlagId={activeFlagId} />
          ))}
        </div>
      </div>
    </div>
  );
}
