import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { WordSimulator } from "./components/WordSimulator";
import "./globals.css";

Office.onReady((info) => {
  const container = document.getElementById("root");
  if (!container) throw new Error("Root element not found");
  const root = createRoot(container);

  const isInsideWord = info.host === Office.HostType.Word;

  root.render(
    <React.StrictMode>
      {isInsideWord ? (
        <App />
      ) : (
        <WordSimulator>
          <App />
        </WordSimulator>
      )}
    </React.StrictMode>,
  );
});
