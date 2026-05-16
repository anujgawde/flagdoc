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
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Issue
            </h4>
            <p className="text-xs leading-relaxed text-gray-600">
              {check.issue}
            </p>
          </section>

          <section className="flex flex-col gap-1.5">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Suggested fix
            </h4>
            <div className="flex gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                R
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-medium text-gray-900">
                  Rona Sulak...
                </span>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  {check.suggestedFix}
                </p>
              </div>
            </div>
          </section>

          <div className="flex items-center gap-2">
            <button
              onClick={onApply}
              className="flex items-center gap-1.5 rounded-full p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50"
              title="Apply"
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="size-3.5 text-emerald-600" />
              </div>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-full p-1.5 text-red-600 transition-colors hover:bg-red-50"
              title="Reject"
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-red-100">
                <X className="size-3.5 text-red-600" />
              </div>
            </button>
          </div>

          {check.reasoning && (
            <section className="flex flex-col gap-1.5">
              <h4 className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Reasoning
              </h4>
              <p className="text-xs leading-relaxed text-gray-500">
                {check.reasoning}
              </p>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
