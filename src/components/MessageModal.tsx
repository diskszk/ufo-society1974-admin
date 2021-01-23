import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createClearMessageAction } from '../store/LoadingStatusReducer';
import { CustomButton } from './UIKit';

type Props = {
  message: string;
};

const MessageModal: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();

  const handleClickCloseModal = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      dispatch(createClearMessageAction());
    },
    [dispatch]
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="spacing-div" />
        <div className="spacing-div" />
        <CustomButton label="閉じる" onClick={handleClickCloseModal} />
      </div>
    </div>
  );
};

export default MessageModal;
