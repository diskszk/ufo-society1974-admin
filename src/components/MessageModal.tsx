import React from 'react';
import { useDispatch } from 'react-redux';
import { clearMessageAction } from '../store/LoadingStatusReducer';
import { CustomButton } from './UIKit';

type Props = {
  message: string;
};

const MessageModal: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="spacing-div" />
        <div className="spacing-div" />
        <CustomButton
          label="閉じる"
          onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            dispatch(clearMessageAction())
          }
        />
      </div>
    </div>
  );
};

export default MessageModal;
