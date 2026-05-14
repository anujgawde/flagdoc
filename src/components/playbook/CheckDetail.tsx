"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
        <StatusIcon status={check.status} />
        <h3 className="flex-1 text-sm font-semibold text-gray-900 leading-snug">
          {check.label}
        </h3>
        <Button variant="ghost" size="icon-xs" onClick={onClose}>
          <X className="size-3.5" />
        </Button>
      </div>

      <div className="flex flex-col gap-4 px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Issue
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">{check.issue}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Suggested fix
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">
            {check.suggestedFix}
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200 px-4 py-3">
        <Button
          onClick={onApply}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
