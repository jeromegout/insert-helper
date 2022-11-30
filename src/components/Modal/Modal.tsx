import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Modal.css";

interface ModalProps extends React.PropsWithChildren {
  trigger: JSX.Element;
  title: string;
  description?: string;
  onOk?: () => void;
  hasCancelButton?: boolean;
}

const Modal = ({ trigger, title, description, children, onOk, hasCancelButton }: ModalProps) => {
  const handleOk = () => {
    if (onOk) onOk();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div className="ModalIconWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="ModalIcon"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          {description && <Dialog.Description className="DialogDescription">{description}</Dialog.Description>}
          {children}
          <div style={{ display: "flex", marginTop: 25, gap: 10, justifyContent: "flex-end" }}>
            {hasCancelButton && (
              <Dialog.Close asChild>
                <button className="ModalButton ModalButtonSecondary">cancel</button>
              </Dialog.Close>
            )}
            <Dialog.Close asChild>
              <button className="ModalButton" onClick={(e) => handleOk()}>
                ok
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <FontAwesomeIcon focusable className="CloseIcon" aria-label="Close" icon={faCircleXmark} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
