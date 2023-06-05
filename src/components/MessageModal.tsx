import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createClearMessageAction } from "../store/LoadingStatusReducer";
import { Modal } from "./Modal";

type Props = {
  message: string;
};

const MessageModal: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();

  const handleClickCloseModal = useCallback(() => {
    dispatch(createClearMessageAction());
  }, [dispatch]);

  return (
    <Modal message={message} handleClickCloseModal={handleClickCloseModal} />
  );
};

export default MessageModal;
