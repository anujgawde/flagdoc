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
  const [editOnOrg, setEditOnOrg] = useState(false);

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
          <DialogDescription className="sr-only">
            Configure and run the selected playbook.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Edit on org</span>
            <button
              onClick={() => setEditOnOrg(!editOnOrg)}
              className={`relative h-5 w-9 rounded-full transition-colors ${
                editOnOrg ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform shadow-sm ${
                  editOnOrg ? "translate-x-4" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700">
              VendorCo Business Associate Agreement (BAA)
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-600">
              Name to share any context?
            </label>
            <Input
              value={analysisName}
              onChange={(e) => setAnalysisName(e.target.value)}
              placeholder=""
              className="text-xs"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Close
          </DialogClose>
          <Button
            onClick={handleRun}
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Run playbook
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
