import { useMemo } from "react";
import { diffWords } from "@/utils/diffWords";

interface DiffPreviewProps {
  original: string;
  proposed: string;
}

export function DiffPreview({ original, proposed }: DiffPreviewProps) {
  const segments = useMemo(() => diffWords(original, proposed), [original, proposed]);

  return (
    <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] leading-relaxed text-gray-700">
      <span className="select-text">
        &ldquo;
        {segments.map((seg, i) => {
          if (seg.type === "delete") {
            return (
              <span key={i} className="bg-red-100 text-red-700 line-through">
                {seg.text}
              </span>
            );
          }
          if (seg.type === "insert") {
            return (
              <span key={i} className="bg-emerald-100 text-emerald-700 underline decoration-emerald-400">
                {seg.text}
              </span>
            );
          }
          return <span key={i}>{seg.text}</span>;
        })}
        &rdquo;
      </span>
    </div>
  );
}
