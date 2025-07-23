import { useLocalization } from "../context/localization-context";

type ModalProps = {
  message: string;
  onClose: () => void;
  showButtons?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const Modal = ({
  message,
  onClose,
  showButtons = false,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: ModalProps) => {
  const { t } = useLocalization();

  return (
    <div className="modal-box">
      <div className="modal-header">{message}</div>
      {showButtons ? (
        <div className="flex gap-4">
          <button type="button" className="btn-primary" onClick={onConfirm}>
            {confirmText || t("modal.confirm")}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel || onClose}>
            {cancelText || t("modal.cancel")}
          </button>
        </div>
      ) : (
        <button type="button" className="btn-primary" onClick={onClose}>
          {t("modal.ok")}
        </button>
      )}
    </div>
  );
};

export default Modal;
