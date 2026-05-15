import { useState } from "react";
import { BookOpen, MessageSquare, X } from "lucide-react";
import { PlaybookPanel } from "./components/playbook/PlaybookPanel";
import { ComposerPanel } from "./components/composer/ComposerPanel";

const tabs = [
  { id: "playbook" as const, label: "Playbook", icon: BookOpen },
  { id: "composer" as const, label: "Composer", icon: MessageSquare },
];

export function App() {
  const [activeTab, setActiveTab] = useState<"playbook" | "composer">("playbook");

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <span className="text-sm font-semibold text-gray-900">Pincites</span>
        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="size-4" />
        </button>
      </header>

      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {activeTab === "playbook" ? (
          <PlaybookPanel onFlagSelect={() => {}} />
        ) : (
          <ComposerPanel />
        )}
      </div>
    </div>
  );
}
