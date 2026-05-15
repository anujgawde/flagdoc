import type { OneLineSection } from "@/types/composer";

export function OneLineAnswer({
  sections,
}: {
  sections: OneLineSection[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold text-gray-900">One-Line Answer</h4>
      <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-3">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-1">
            <h5 className="text-xs font-semibold text-gray-900">
              {section.title}
            </h5>
            <p className="text-xs leading-relaxed text-gray-600">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
