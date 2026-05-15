import { X, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusIcon } from "./StatusIcon";
import type { PlaybookCheck } from "@/types/playbook";

export function CheckDetail({
  check,
  onClose,
  onApply,
}: {
  check: PlaybookCheck;
  onClose: () => void;
  onApply: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-start gap-2 border-b border-gray-200 px-4 py-3">
        <StatusIcon status={check.status} className="mt-0.5 size-4" />
        <h3 className="flex-1 text-sm font-semibold leading-snug text-gray-900">
          {check.label}
        </h3>
        <button
          onClick={onClose}
          className="shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 px-4 py-3">
          <section className="flex flex-col gap-1.5">
            <h4 className="text-xs font-semibold text-gray-900">Issue</h4>
            <p className="text-xs leading-relaxed text-gray-600">
              {check.issue}
            </p>
          </section>

          <section className="flex flex-col gap-1.5">
            <h4 className="text-xs font-semibold text-gray-900">
              Suggested fix
            </h4>
            <p className="text-xs leading-relaxed text-gray-600">
              {check.suggestedFix}
            </p>
          </section>

          <div className="flex items-center gap-2">
            <button
              onClick={onApply}
              className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <Check className="size-3" />
              Apply
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <X className="size-3" />
            </button>
          </div>

          {check.reasoning && (
            <p className="text-xs leading-relaxed text-gray-500">
              {check.reasoning}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
