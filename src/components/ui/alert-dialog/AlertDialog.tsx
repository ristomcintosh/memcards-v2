import { ReactNode } from "react"
import {
  AlertDialogBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogFooterBase,
  AlertDialogTitleBase,
  AlertDialogCancelBase,
  AlertDialogActionBase,
  AlertDialogPortalBase,
  AlertDialogDescriptionBase,
} from "./alert-dialog-base"

type AlertDialogProps = {
  title: ReactNode
  onConfirm: () => void
  onCancel: () => void
}

export function AlertDialog({ title, onConfirm, onCancel }: AlertDialogProps) {
  return (
    <AlertDialogBase defaultOpen onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogPortalBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <AlertDialogTitleBase>{title}</AlertDialogTitleBase>
            <AlertDialogDescriptionBase className="sr-only">
              This action cannot be undone.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase onClick={() => onCancel()}>
              Cancel
            </AlertDialogCancelBase>
            <AlertDialogActionBase onClick={() => onConfirm()}>
              Continue
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogPortalBase>
    </AlertDialogBase>
  )
}