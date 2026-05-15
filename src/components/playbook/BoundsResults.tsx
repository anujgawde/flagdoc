import type { PlaybookCheck } from "@/types/playbook";

export function BoundsResults({ checks }: { checks: PlaybookCheck[] }) {
  const pass = checks.filter((c) => c.status === "pass").length;
  const fail = checks.filter((c) => c.status === "fail").length;
  const warning = checks.filter((c) => c.status === "warning").length;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 px-4 py-2.5">
      <span className="text-xs text-gray-500">Bounds results</span>
      <div className="flex items-center gap-1.5">
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
          {pass} passed
        </span>
        {fail > 0 && (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
            {fail} failed
          </span>
        )}
        {warning > 0 && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
            {warning} warnings
          </span>
        )}
      </div>
    </div>
  );
}
