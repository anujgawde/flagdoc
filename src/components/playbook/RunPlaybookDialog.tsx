
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Playbook } from "@/types/playbook";

export function RunPlaybookDialog({
  playbook,
  open,
  onOpenChange,
  onRun,
}: {
  playbook: Playbook | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRun: (playbookId: string, analysisName: string) => void;
}) {
  const [analysisName, setAnalysisName] = useState("");

  function handleRun() {
    if (!playbook) return;
    onRun(playbook.id, analysisName || playbook.name);
    setAnalysisName("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle>Run a playbook</DialogTitle>
          <DialogDescription>
            Select a document and name your analysis run.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Select a document:
            </label>
            <Select defaultValue="baa-001">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baa-001">
                  Business Associate Agreement (BAA)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Name of analysis to run:
            </label>
            <Input
              value={analysisName}
              onChange={(e) => setAnalysisName(e.target.value)}
              placeholder={playbook?.name ?? "Enter a name"}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Button
            onClick={handleRun}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Run playbook
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
