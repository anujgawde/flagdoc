export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Prompt {
  id: string;
  label: string;
}

export interface RedlineChange {
  id: string;
  original: string;
  revised: string;
  status: "pending" | "accepted" | "rejected";
}

export interface OneLineSection {
  title: string;
  content: string;
}
