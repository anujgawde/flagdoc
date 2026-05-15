import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PromptLibrary } from "./PromptLibrary";
import { RedlinesSection } from "./RedlinesSection";
import { OneLineAnswer } from "./OneLineAnswer";
import {
  prompts,
  mockConversation,
  mockRedlines,
  oneLineSections,
  redlineStats,
} from "@/data/composer-data";
import type { ChatMessage as ChatMessageType, RedlineChange } from "@/types/composer";

export function ComposerPanel() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [showPrompts, setShowPrompts] = useState(false);
  const [redlines, setRedlines] = useState<RedlineChange[]>(mockRedlines);
  const [showResults, setShowResults] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isIdle = messages.length === 0 && !showResults;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, showResults]);

  function handleSend(content: string) {
    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages(mockConversation);
      setShowResults(true);
    }, 800);
  }

  function handleSelectPrompt(prompt: { label: string }) {
    setShowPrompts(false);
    handleSend(prompt.label);
  }

  function handleAcceptRedline(id: string) {
    setRedlines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "accepted" as const } : r)),
    );
  }

  function handleRejectRedline(id: string) {
    setRedlines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)),
    );
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {showPrompts && (
        <PromptLibrary
          prompts={prompts}
          onSelect={handleSelectPrompt}
          onClose={() => setShowPrompts(false)}
        />
      )}

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3 px-3 py-3">
          {isIdle && (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-sm text-gray-500">Ready when you are</p>
              <button
                onClick={() => setShowPrompts(true)}
                className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Browse prompts
              </button>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {showResults && (
            <>
              <RedlinesSection
                redlines={redlines}
                stats={redlineStats}
                onAccept={handleAcceptRedline}
                onReject={handleRejectRedline}
              />
              <OneLineAnswer sections={oneLineSections} />
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <ChatInput
        onSend={handleSend}
        onOpenPrompts={() => setShowPrompts(true)}
      />
    </div>
  );
}
