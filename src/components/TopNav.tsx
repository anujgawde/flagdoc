import { FileText } from "lucide-react";

export function TopNav({ documentTitle }: { documentTitle: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <FileText className="size-4 text-gray-900" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
            FlagDoc
          </span>
        </div>
        <span className="text-xs text-gray-400">{documentTitle}</span>
      </div>
    </header>
  );
}
