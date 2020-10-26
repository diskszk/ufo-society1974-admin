import React, { useState, useEffect } from 'react';

const ConfirmLyricModal = (props: { onClick: () => void }) => {
  return (
    <div>
      <p>確認用もーだる</p>
      <button onClick={props.onClick}></button>
    </div>

  );
}

export default ConfirmLyricModal;