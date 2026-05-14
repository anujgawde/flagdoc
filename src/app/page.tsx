"use client";

import { useState, useCallback, useRef } from "react";
import { TopNav } from "@/components/TopNav";
import { DocumentViewer } from "@/components/DocumentViewer";
import { SidePanel, ResizeHandle } from "@/components/SidePanel";
import { baaDocument } from "@/data/baa-document";

const MIN_PANEL_WIDTH = 280;
const MAX_PANEL_WIDTH = 600;
const DEFAULT_PANEL_WIDTH = 340;

export default function Home() {
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [activeFlagId, setActiveFlagId] = useState<string | null>(null);
  const dragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    dragging.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newWidth = window.innerWidth - e.clientX;
      setPanelWidth(Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, newWidth)));
    };

    const handleMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <TopNav documentTitle={baaDocument.title} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <DocumentViewer document={baaDocument} activeFlagId={activeFlagId} />
        </main>
        <ResizeHandle onMouseDown={handleMouseDown} />
        <aside
          style={{ width: panelWidth }}
          className="shrink-0 bg-white"
        >
          <SidePanel onFlagSelect={setActiveFlagId} />
        </aside>
      </div>
    </div>
  );
}
