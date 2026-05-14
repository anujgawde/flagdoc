export type FlagSeverity = "warning" | "critical";

export interface FlaggedSpan {
  id: string;
  startOffset: number;
  endOffset: number;
  severity: FlagSeverity;
  label: string;
}

export interface Paragraph {
  id: string;
  text: string;
  flags: FlaggedSpan[];
}

export interface Subsection {
  id: string;
  label: string;
  paragraphs: Paragraph[];
}

export interface DocumentSection {
  id: string;
  number: number | null;
  title: string;
  paragraphs: Paragraph[];
  subsections: Subsection[];
}

export interface LegalDocument {
  id: string;
  title: string;
  parties: string;
  effectiveDate: string;
  sections: DocumentSection[];
}
