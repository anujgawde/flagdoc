import { X } from "lucide-react";
import type { Prompt } from "@/types/composer";

export function PromptLibrary({
  prompts,
  onSelect,
  onClose,
}: {
  prompts: Prompt[];
  onSelect: (prompt: Prompt) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Prompt library</h3>
        <button
          onClick={onClose}
          className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onSelect(prompt)}
            className="flex w-full border-b border-gray-100 px-4 py-3 text-left text-xs text-gray-700 transition-colors hover:bg-gray-50"
          >
            {prompt.label}
          </button>
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-2">
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
