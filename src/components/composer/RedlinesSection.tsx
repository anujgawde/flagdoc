import { Check, X } from "lucide-react";
import type { RedlineChange } from "@/types/composer";

export function RedlinesSection({
  redlines,
  stats,
  onAccept,
  onReject,
}: {
  redlines: RedlineChange[];
  stats: { words: number; trackedChanges: number; comments: number };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const pending = redlines.filter((r) => r.status === "pending");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-900">Redlines</h4>
        <div className="flex items-center gap-2">
          <button
            onClick={() => pending.forEach((r) => onAccept(r.id))}
            className="rounded p-1 text-emerald-600 hover:bg-emerald-50"
            title="Accept all"
          >
            <Check className="size-3" />
          </button>
          <button
            onClick={() => pending.forEach((r) => onReject(r.id))}
            className="rounded p-1 text-red-500 hover:bg-red-50"
            title="Reject all"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
        {redlines.map((redline) => (
          <div key={redline.id} className="mb-2 last:mb-0">
            {redline.status === "rejected" ? (
              <span className="text-xs leading-relaxed text-gray-400 line-through">
                {redline.original}
              </span>
            ) : redline.status === "accepted" ? (
              <span className="text-xs leading-relaxed text-gray-700">
                {redline.revised}
              </span>
            ) : (
              <span className="text-xs leading-relaxed">
                <span className="text-red-600 line-through">
                  {redline.original}
                </span>{" "}
                <span className="text-blue-700 underline decoration-blue-300">
                  {redline.revised}
                </span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-[10px] text-gray-400">
        IP: {stats.words} words, {stats.trackedChanges} tracked changes,{" "}
        {stats.comments} comments
      </div>
    </div>
  );
}
