import { FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500">
        <FileText className="size-6" />
        <h1 className="text-lg font-medium">FlagDoc</h1>
      </div>
    </main>
  );
}
