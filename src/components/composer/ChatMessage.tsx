import { User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/composer";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
          isUser
            ? "bg-gray-200 text-gray-600"
            : "bg-blue-600 text-white"
        }`}
      >
        {isUser ? <User className="size-3" /> : "R"}
      </div>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
          isUser
            ? "bg-gray-100 text-gray-900"
            : "bg-white text-gray-700 ring-1 ring-gray-200"
        }`}
      >
        <div className="mb-1 text-xs font-medium text-gray-500">
          {isUser ? "You" : "Rona Sulak..."}
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}
