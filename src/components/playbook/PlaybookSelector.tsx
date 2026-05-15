
import { ChevronRight } from "lucide-react";
import type { Playbook } from "@/types/playbook";

export function PlaybookSelector({
  playbooks,
  onSelect,
}: {
  playbooks: Playbook[];
  onSelect: (playbook: Playbook) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Run a playbook</h2>
      </div>
      <ul className="flex flex-col">
        {playbooks.map((pb) => (
          <li key={pb.id}>
            <button
              onClick={() => onSelect(pb)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs text-gray-700 transition-colors hover:bg-gray-50"
            >
              {pb.name}
              <ChevronRight className="size-3.5 text-gray-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
