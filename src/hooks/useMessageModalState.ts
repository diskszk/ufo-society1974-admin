import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageModalState } from "../lib/types";

const MESSAGE_MODAL_STATE = "messageModalState" as const;

const initialMessageModalState: MessageModalState = {
  isOpen: false,
  message: "",
};

export function useMessageModalState(): {
  isOpen: boolean;
  displayMessage: string;
  openMessageModalWithMessage: (message: string) => void;
  closeMessageModal: () => void;
} {
  const queryClient = useQueryClient();

  const messageModalData = useQuery<MessageModalState>([MESSAGE_MODAL_STATE], {
    enabled: false,
    initialData: initialMessageModalState,
  }).data;

  const { isOpen, message } = messageModalData;

  const openMessageModalWithMessage = (message: string): void => {
    queryClient.setQueryData<MessageModalState>([MESSAGE_MODAL_STATE], {
      isOpen: true,
      message,
    });
  };

  const closeMessageModal = (): void => {
    queryClient.setQueryData<MessageModalState>(
      [MESSAGE_MODAL_STATE],
      initialMessageModalState
    );
  };

  return {
    isOpen,
    displayMessage: message,
    openMessageModalWithMessage,
    closeMessageModal,
  };
}
