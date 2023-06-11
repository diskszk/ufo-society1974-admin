import React, { useCallback } from "react";
import { Modal } from "./Modal";
import { useMessageModalState } from "../hooks/useMessageModalState";

const MessageModal: React.FC = () => {
  const { isOpen, displayMessage, closeMessageModal } = useMessageModalState();

  const handleClickCloseModal = useCallback(() => {
    closeMessageModal();
  }, [closeMessageModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      message={displayMessage}
      handleClickCloseModal={handleClickCloseModal}
    />
  );
};

export default MessageModal;
