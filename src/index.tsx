import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { WordSimulator } from "./components/WordSimulator";
import { DocumentContextProvider } from "./providers/DocumentProvider";
import { MockDocumentProvider } from "./providers/MockProvider";
import "./globals.css";

const mockProvider = new MockDocumentProvider();

Office.onReady((info) => {
  const container = document.getElementById("root");
  if (!container) throw new Error("Root element not found");
  const root = createRoot(container);

  const isInsideWord = info.host === Office.HostType.Word;

  root.render(
    <React.StrictMode>
      <DocumentContextProvider value={mockProvider}>
        {isInsideWord ? (
          <App />
        ) : (
          <WordSimulator provider={mockProvider}>
            <App />
          </WordSimulator>
        )}
      </DocumentContextProvider>
    </React.StrictMode>,
  );
});
