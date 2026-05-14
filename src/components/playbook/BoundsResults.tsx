import { Badge } from "@/components/ui/badge";
import type { PlaybookCheck } from "@/types/playbook";

export function BoundsResults({ checks }: { checks: PlaybookCheck[] }) {
  const pass = checks.filter((c) => c.status === "pass").length;
  const fail = checks.filter((c) => c.status === "fail").length;
  const warning = checks.filter((c) => c.status === "warning").length;

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2.5">
      <span className="text-xs font-medium text-gray-500">Bounds results</span>
      <div className="flex items-center gap-1.5">
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-700 border-emerald-200"
        >
          {pass} passed
        </Badge>
        {fail > 0 && (
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-700 border-red-200"
          >
            {fail} failed
          </Badge>
        )}
        {warning > 0 && (
          <Badge
            variant="secondary"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            {warning} warnings
          </Badge>
        )}
      </div>
    </div>
  );
}
