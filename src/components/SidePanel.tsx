"use client";

import { useState } from "react";
import { BookOpen, MessageSquare, GripVertical } from "lucide-react";

const tabs = [
  { id: "playbook" as const, label: "Playbook", icon: BookOpen },
  { id: "composer" as const, label: "Composer", icon: MessageSquare },
];

export function SidePanel() {
  const [activeTab, setActiveTab] = useState<"playbook" | "composer">("playbook");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-xs text-gray-400">
          {activeTab === "playbook"
            ? "Run a playbook to analyze this document"
            : "Ask a question about this document"}
        </p>
      </div>
    </div>
  );
}

export function ResizeHandle({
  onMouseDown,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="group flex w-1.5 cursor-col-resize items-center justify-center border-l border-gray-200 hover:border-blue-400 hover:bg-blue-50"
    >
      <GripVertical className="size-3 text-gray-300 opacity-0 group-hover:opacity-100" />
    </div>
  );
}
