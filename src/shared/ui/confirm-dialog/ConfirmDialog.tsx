import { Modal } from '../modal/Modal';
import { Button } from '../button/Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isConfirming = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="mt-2">
        <p className="text-sm text-slate-500">{message}</p>
      </div>
      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Button variant="secondary" onClick={onCancel} disabled={isConfirming} className="w-full sm:w-auto">
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isConfirming} className="w-full sm:w-auto">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
