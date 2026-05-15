
import { StatusIcon } from "./StatusIcon";
import type { PlaybookCheck } from "@/types/playbook";

export function CheckItem({
  check,
  onClick,
}: {
  check: PlaybookCheck;
  onClick: () => void;
}) {
  const isClickable = check.status !== "pass";

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-xs transition-colors animate-in fade-in slide-in-from-bottom-1 duration-200 ${
        isClickable
          ? "cursor-pointer text-gray-900 hover:bg-gray-50"
          : "cursor-default text-gray-400"
      }`}
    >
      <StatusIcon status={check.status} className="size-3.5" />
      <span className="flex-1 leading-snug">{check.label}</span>
    </button>
  );
}
