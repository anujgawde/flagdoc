import { useState } from "react";
import { SendHorizontal, BookOpen } from "lucide-react";

export function ChatInput({
  onSend,
  onOpenPrompts,
}: {
  onSend: (message: string) => void;
  onOpenPrompts: () => void;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="border-t border-gray-200 px-3 py-2">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenPrompts}
          className="shrink-0 rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          title="Prompts"
        >
          <BookOpen className="size-3.5" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="shrink-0 rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
        >
          <SendHorizontal className="size-3.5" />
        </button>
      </form>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">Prompts</span>
      </div>
    </div>
  );
}
