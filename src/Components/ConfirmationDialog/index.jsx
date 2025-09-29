import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ConfirmationDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
  btnStyles,
  description,
  isLoading = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-2xl border-b border-gray-300 pb-2"}>
            {title}
          </DialogTitle>
          <DialogDescription className="mt-1">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            className="h-12 rounded-full"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            className={`h-12 rounded-full ${btnStyles}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "saving..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
